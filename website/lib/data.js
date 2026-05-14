// Data access layer.
// Reads from Supabase if env vars are configured, otherwise falls back to
// a small built-in dataset so local dev + the build step still work without
// secrets. Mapping snake_case columns to the camelCase shape page components
// already expect lets us swap data sources without touching pages.

import { getSupabaseAnonClient } from './supabase/anon';

// ---------- Built-in fallback (same Unsplash refs as before) ----------
const u = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85&auto=format&fit=crop`;

export const IMG = {
  heroSeawind: u('1567899378494-47b22a2ae96a', 2400),
  superyacht: u('1605281317010-fe5ffe798166', 1800),
  preOwned: u('1569949381669-ecf31ae8e613', 1600),
  charter: u('1473445730015-841f29a9490b', 1600),
  cruise: u('1542736667-069246bdbc6d', 1600),
  swan82: u('1605281317010-fe5ffe798166', 1200),
};

const FALLBACK_BRANDS = [
  {
    slug: 'seawind', name: 'Seawind Catamarans',
    tagline: 'Performance cruising catamarans built for serious sailors',
    description: 'Seawind catamarans are designed for ocean-crossing capability...',
    origin: 'Vietnam', since: '1982', hero: IMG.heroSeawind,
    models: [
      { slug: 'sw-1170', name: 'Seawind 1170', loa: '38\'5"', beam: '21\'6"', cabins: 3, image: u('1599582909646-2ee21c0b5b2c', 1400), priceFrom: 'USD 520,000', status: 'In production' },
    ],
  },
];
const FALLBACK_YACHTS = [
  { slug: 'gypsea', name: 'Gypsea', builder: 'Lagoon', type: 'Catamaran', year: 2012, loa: 52, beam: 15, cabins: 3, price: 390000, currency: 'USD', location: 'Hong Kong', image: u('1540946485063-a4d3d1e0e3ce', 1200) },
];

// ---------- Mappers: DB row → page shape ----------
function mapBrand(row, models = []) {
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    origin: row.origin,
    since: row.since,
    hero: row.hero_url,
    models: models.map(mapModel),
  };
}

function mapModel(row) {
  return {
    slug: row.slug,
    name: row.name,
    loa: row.loa,
    beam: row.beam,
    cabins: row.cabins,
    priceFrom: row.price_from,
    status: row.status,
    image: row.image_url,
    description: row.description,
    specs: row.specs ?? {},
  };
}

function mapYacht(row) {
  return {
    slug: row.slug,
    name: row.name,
    builder: row.builder,
    type: row.type,
    year: row.year,
    loa: Number(row.loa),
    beam: Number(row.beam),
    cabins: row.cabins,
    price: Number(row.price),
    currency: row.currency,
    location: row.location,
    image: row.image_url,
    gallery: row.gallery ?? [],
    description: row.description,
    specs: row.specs ?? {},
    listingStatus: row.listing_status,
  };
}

// ---------- Public API ----------
export async function getBrands() {
  const sb = getSupabaseAnonClient();
  if (!sb) return FALLBACK_BRANDS;
  const { data: brands, error: e1 } = await sb
    .from('brands').select('*').order('display_order', { ascending: true });
  if (e1) { console.error('getBrands:', e1.message); return FALLBACK_BRANDS; }
  const { data: models, error: e2 } = await sb
    .from('models').select('*').order('display_order', { ascending: true });
  if (e2) { console.error('getBrands models:', e2.message); }
  return (brands ?? []).map((b) =>
    mapBrand(b, (models ?? []).filter((m) => m.brand_id === b.id)),
  );
}

export async function getBrand(slug) {
  const sb = getSupabaseAnonClient();
  if (!sb) return FALLBACK_BRANDS.find((b) => b.slug === slug) ?? null;
  const { data: brand, error: e1 } = await sb
    .from('brands').select('*').eq('slug', slug).maybeSingle();
  if (e1 || !brand) { if (e1) console.error('getBrand:', e1.message); return null; }
  const { data: models } = await sb
    .from('models').select('*').eq('brand_id', brand.id)
    .order('display_order', { ascending: true });
  return mapBrand(brand, models ?? []);
}

export async function getModel(brandSlug, modelSlug) {
  const brand = await getBrand(brandSlug);
  if (!brand) return null;
  const model = brand.models.find((m) => m.slug === modelSlug);
  return model ? { brand, model } : null;
}

export async function getYachts() {
  const sb = getSupabaseAnonClient();
  if (!sb) return FALLBACK_YACHTS;
  const { data, error } = await sb
    .from('yachts').select('*')
    .neq('listing_status', 'draft')
    .order('display_order', { ascending: true });
  if (error) { console.error('getYachts:', error.message); return FALLBACK_YACHTS; }
  return (data ?? []).map(mapYacht);
}

export async function getYacht(slug) {
  const sb = getSupabaseAnonClient();
  if (!sb) return FALLBACK_YACHTS.find((y) => y.slug === slug) ?? null;
  const { data, error } = await sb
    .from('yachts').select('*').eq('slug', slug).maybeSingle();
  if (error || !data) { if (error) console.error('getYacht:', error.message); return null; }
  return mapYacht(data);
}
