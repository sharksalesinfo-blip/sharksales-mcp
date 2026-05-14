-- ============================================================================
-- Asia Yacht Services — initial schema
-- Run this entire file once in the Supabase SQL Editor.
-- Safe to re-run: uses IF NOT EXISTS / OR REPLACE / ON CONFLICT throughout.
-- ============================================================================

-- ---------- Extensions ----------
create extension if not exists "uuid-ossp";

-- ---------- Helper to keep updated_at fresh ----------
create or replace function set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- profiles (mirror of auth.users with role) ----------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  role text not null default 'broker' check (role in ('admin', 'broker')),
  created_at timestamptz not null default now()
);

-- Auto-create a profile row whenever a new auth.user is inserted.
create or replace function handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Role-check helpers usable in RLS policies.
create or replace function is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function is_broker_or_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'broker'));
$$;

-- ---------- brands ----------
create table if not exists brands (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  tagline text,
  description text,
  origin text,
  since text,
  hero_url text,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists brands_updated_at on brands;
create trigger brands_updated_at before update on brands
  for each row execute function set_updated_at();

-- ---------- models (belong to a brand) ----------
create table if not exists models (
  id uuid primary key default uuid_generate_v4(),
  brand_id uuid not null references brands(id) on delete cascade,
  slug text not null,
  name text not null,
  loa text,
  beam text,
  cabins int,
  price_from text,
  status text,
  image_url text,
  description text,
  specs jsonb not null default '{}'::jsonb,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (brand_id, slug)
);
drop trigger if exists models_updated_at on models;
create trigger models_updated_at before update on models
  for each row execute function set_updated_at();

-- ---------- yachts (pre-owned listings) ----------
create table if not exists yachts (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  builder text,
  type text,
  year int,
  loa numeric,
  beam numeric,
  cabins int,
  price numeric,
  currency text not null default 'USD',
  location text,
  image_url text,
  gallery text[] not null default '{}',
  description text,
  specs jsonb not null default '{}'::jsonb,
  listing_status text not null default 'available'
    check (listing_status in ('available', 'sale_pending', 'sold', 'draft')),
  display_order int not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists yachts_updated_at on yachts;
create trigger yachts_updated_at before update on yachts
  for each row execute function set_updated_at();

-- ---------- settings (single row global config) ----------
create table if not exists settings (
  id int primary key default 1 check (id = 1),
  hero_title text,
  hero_subtitle text,
  contact_email text,
  contact_phone text,
  contact_address text,
  social_facebook text,
  social_instagram text,
  social_linkedin text,
  updated_at timestamptz not null default now()
);
drop trigger if exists settings_updated_at on settings;
create trigger settings_updated_at before update on settings
  for each row execute function set_updated_at();

insert into settings (id) values (1) on conflict (id) do nothing;

-- ============================================================================
-- Row Level Security
-- ============================================================================

alter table profiles enable row level security;
alter table brands   enable row level security;
alter table models   enable row level security;
alter table yachts   enable row level security;
alter table settings enable row level security;

-- profiles: each user reads own row; admin reads/writes all.
drop policy if exists profiles_self_read on profiles;
create policy profiles_self_read on profiles for select
  using (auth.uid() = id or is_admin());

drop policy if exists profiles_admin_write on profiles;
create policy profiles_admin_write on profiles for all
  using (is_admin()) with check (is_admin());

-- brands: public read; admin write.
drop policy if exists brands_public_read on brands;
create policy brands_public_read on brands for select using (true);

drop policy if exists brands_admin_write on brands;
create policy brands_admin_write on brands for all
  using (is_admin()) with check (is_admin());

-- models: public read; admin OR broker write.
drop policy if exists models_public_read on models;
create policy models_public_read on models for select using (true);

drop policy if exists models_staff_write on models;
create policy models_staff_write on models for all
  using (is_broker_or_admin()) with check (is_broker_or_admin());

-- yachts: public read except drafts; admin OR broker write.
drop policy if exists yachts_public_read on yachts;
create policy yachts_public_read on yachts for select
  using (listing_status <> 'draft' or is_broker_or_admin());

drop policy if exists yachts_staff_write on yachts;
create policy yachts_staff_write on yachts for all
  using (is_broker_or_admin()) with check (is_broker_or_admin());

-- settings: public read; admin write.
drop policy if exists settings_public_read on settings;
create policy settings_public_read on settings for select using (true);

drop policy if exists settings_admin_write on settings;
create policy settings_admin_write on settings for all
  using (is_admin()) with check (is_admin());

-- ============================================================================
-- Storage bucket for yacht / brand / model images
-- ============================================================================

insert into storage.buckets (id, name, public)
values ('yacht-images', 'yacht-images', true)
on conflict (id) do nothing;

drop policy if exists yacht_images_public_read on storage.objects;
create policy yacht_images_public_read on storage.objects for select
  using (bucket_id = 'yacht-images');

drop policy if exists yacht_images_staff_write on storage.objects;
create policy yacht_images_staff_write on storage.objects for insert
  to authenticated
  with check (bucket_id = 'yacht-images' and is_broker_or_admin());

drop policy if exists yacht_images_staff_update on storage.objects;
create policy yacht_images_staff_update on storage.objects for update
  to authenticated
  using (bucket_id = 'yacht-images' and is_broker_or_admin());

drop policy if exists yacht_images_staff_delete on storage.objects;
create policy yacht_images_staff_delete on storage.objects for delete
  to authenticated
  using (bucket_id = 'yacht-images' and is_broker_or_admin());

-- ============================================================================
-- Seed: copy of the current hardcoded content from lib/data.js
-- Re-runnable thanks to ON CONFLICT on slug.
-- ============================================================================

-- Brands
insert into brands (slug, name, tagline, description, origin, since, hero_url, display_order) values
  ('seawind',  'Seawind Catamarans', 'Performance cruising catamarans built for serious sailors',
   'Seawind catamarans are designed for ocean-crossing capability with the comfort and sailing performance that experienced cruisers demand. Each hull is hand-built in Ho Chi Minh City under the supervision of Australian engineers.',
   'Vietnam', '1982',
   'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=2400&q=85&auto=format&fit=crop', 1),
  ('kingship', 'Kingship Marine', 'Custom long-range motor yachts engineered in Asia',
   'Kingship build semi-displacement and full-displacement motor yachts from 24 to 50 metres. The shipyard is renowned for owner-led customisation and Northern European build standards delivered at competitive Asian pricing.',
   'China', '2002',
   'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1800&q=85&auto=format&fit=crop', 2),
  ('aquabolt', 'Aquabolt', 'Electric tenders & dayboats — silent, clean, instant',
   'Aquabolt builds fully-electric tenders and dayboats for the Asia-Pacific market. Zero emissions, near-silent operation and instant torque make them the next-generation choice for marinas and private estates.',
   'Hong Kong', '2021',
   'https://images.unsplash.com/photo-1542736667-069246bdbc6d?w=1600&q=85&auto=format&fit=crop', 3),
  ('contest',  'Contest Yachts', 'Dutch-built bluewater sailing yachts since 1959',
   'Contest Yachts has built more than 800 ocean-capable yachts from its yard in Medemblik. The combination of conduction-bonded composite construction and tailored interior design has made Contest the choice of discerning long-distance cruisers.',
   'Netherlands', '1959',
   'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=85&auto=format&fit=crop', 4)
on conflict (slug) do update set
  name = excluded.name,
  tagline = excluded.tagline,
  description = excluded.description,
  origin = excluded.origin,
  since = excluded.since,
  hero_url = excluded.hero_url,
  display_order = excluded.display_order;

-- Models
insert into models (brand_id, slug, name, loa, beam, cabins, price_from, status, image_url, display_order)
select b.id, m.slug, m.name, m.loa, m.beam, m.cabins, m.price_from, m.status, m.image_url, m.display_order
from (values
  ('seawind',  'sw-1170', 'Seawind 1170',          '38''5"',  '21''6"', 3, 'USD 520,000',   'In production',  'https://images.unsplash.com/photo-1599582909646-2ee21c0b5b2c?w=1400&q=85&auto=format&fit=crop', 1),
  ('seawind',  'sw-1260', 'Seawind 1260',          '41''4"',  '23''0"', 4, 'USD 680,000',   'Available 2026', 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1400&q=85&auto=format&fit=crop', 2),
  ('seawind',  'sw-1370', 'Seawind 1370',          '44''9"',  '24''8"', 4, 'USD 950,000',   'Flagship',       'https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=1200&q=85&auto=format&fit=crop', 3),
  ('kingship', 'ks-90',   'Kingship 90 Explorer',  '90''',    '22''',   4, 'On request',    'Custom build',   'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1800&q=85&auto=format&fit=crop', 1),
  ('aquabolt', 'ab-23',   'Aquabolt 23',           '23''',    '8''2"',  0, 'USD 145,000',   'In stock',       'https://images.unsplash.com/photo-1542736667-069246bdbc6d?w=1600&q=85&auto=format&fit=crop', 1),
  ('contest',  'ct-49',   'Contest 49CS',          '49''',    '14''9"', 3, 'EUR 1,250,000', 'Build slot 2027','https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=1200&q=85&auto=format&fit=crop', 1),
  ('contest',  'ct-55',   'Contest 55CS',          '55''',    '16''1"', 3, 'EUR 1,890,000', 'Build slot 2027','https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=1400&q=85&auto=format&fit=crop', 2)
) as m(brand_slug, slug, name, loa, beam, cabins, price_from, status, image_url, display_order)
join brands b on b.slug = m.brand_slug
on conflict (brand_id, slug) do update set
  name = excluded.name, loa = excluded.loa, beam = excluded.beam, cabins = excluded.cabins,
  price_from = excluded.price_from, status = excluded.status, image_url = excluded.image_url,
  display_order = excluded.display_order;

-- Yachts (pre-owned)
insert into yachts (slug, name, builder, type, year, loa, beam, cabins, price, currency, location, image_url, display_order) values
  ('gypsea',       'Gypsea',       'Lagoon',   'Catamaran',     2012, 52, 15, 3,  390000,  'USD', 'Hong Kong', 'https://images.unsplash.com/photo-1540946485063-a4d3d1e0e3ce?w=1200&q=85&auto=format&fit=crop', 1),
  ('silverlining', 'Silverlining', 'Oyster',   'Sailing Yacht', 2015, 62, 17, 4, 1450000,  'USD', 'Phuket',    'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=1200&q=85&auto=format&fit=crop', 2),
  ('onyx',         'Onyx II',      'X-Yachts', 'Sailing Yacht', 2021, 43, 13, 3,  720000,  'EUR', 'Hong Kong', 'https://images.unsplash.com/photo-1500627964684-141351970a7f?w=1200&q=85&auto=format&fit=crop', 3),
  ('swish',        'Swish',        'J/Boats',  'Performance',   2018, 42, 12, 2,  385000,  'USD', 'Subic Bay', 'https://images.unsplash.com/photo-1540946485063-a4d3d1e0e3ce?w=1200&q=85&auto=format&fit=crop', 4),
  ('catspace',     'Catspace',     'Bali',     'Catamaran',     2020, 40, 22, 4,  525000,  'USD', 'Hong Kong', 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=85&auto=format&fit=crop', 5),
  ('windrush',     'Windrush',     'Seawind',  'Catamaran',     2013, 38, 21, 3,  295000,  'USD', 'Hong Kong', 'https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=1200&q=85&auto=format&fit=crop', 6),
  ('juggerknot',   'Juggerknot',   'J/Boats',  'Performance',   2016, 36, 11, 2,  245000,  'USD', 'Hong Kong', 'https://images.unsplash.com/photo-1542736667-069246bdbc6d?w=1200&q=85&auto=format&fit=crop', 7),
  ('kallima',      'Kallima',      'Swan',     'Sailing Yacht', 2002, 82, 19, 3, 2750000,  'EUR', 'West Med',  'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=85&auto=format&fit=crop', 8),
  ('dufour41',     'Sea Whisper',  'Dufour',   'Sailing Yacht', 2023, 41, 13, 3,  415000,  'EUR', 'Singapore', 'https://images.unsplash.com/photo-1502780402662-acc01917738e?w=1200&q=85&auto=format&fit=crop', 9)
on conflict (slug) do update set
  name = excluded.name, builder = excluded.builder, type = excluded.type, year = excluded.year,
  loa = excluded.loa, beam = excluded.beam, cabins = excluded.cabins, price = excluded.price,
  currency = excluded.currency, location = excluded.location, image_url = excluded.image_url,
  display_order = excluded.display_order;

-- ============================================================================
-- BOOTSTRAP: promote your first signed-up user to admin.
-- AFTER you sign up via the /admin login (magic link), uncomment and run:
--
--   update profiles set role = 'admin' where email = 'YOUR_EMAIL_HERE';
--
-- That user can then promote others via the admin UI.
-- ============================================================================
