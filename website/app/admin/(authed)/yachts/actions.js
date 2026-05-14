'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getSupabaseServerClient } from '../../../../lib/supabase/server';
import { slugify } from '../../../../lib/slug';

const YACHT_STATUSES = ['available', 'sale_pending', 'sold', 'draft'];

// Build a typed row from a FormData payload. Returns { row, errors }.
function parseForm(formData) {
  const errors = {};
  const get = (k) => {
    const v = formData.get(k);
    return v == null ? '' : String(v).trim();
  };
  const num = (v) => (v === '' || v == null ? null : Number(v));

  const name = get('name');
  if (!name) errors.name = 'Required';

  let slug = get('slug') || slugify(name);
  if (!slug) errors.slug = 'Required';

  const listingStatus = get('listing_status') || 'available';
  if (!YACHT_STATUSES.includes(listingStatus)) errors.listing_status = 'Invalid';

  const row = {
    slug,
    name,
    builder: get('builder') || null,
    type: get('type') || null,
    year: num(get('year')),
    loa: num(get('loa')),
    beam: num(get('beam')),
    cabins: num(get('cabins')),
    price: num(get('price')),
    currency: (get('currency') || 'USD').toUpperCase(),
    location: get('location') || null,
    description: get('description') || null,
    image_url: get('image_url') || null,
    listing_status: listingStatus,
    display_order: num(get('display_order')) ?? 0,
  };

  // Gallery is sent as a JSON string from the ImageUpload component.
  const galleryRaw = get('gallery');
  if (galleryRaw) {
    try {
      const parsed = JSON.parse(galleryRaw);
      if (Array.isArray(parsed)) row.gallery = parsed.filter((u) => typeof u === 'string');
    } catch {
      // Ignore malformed gallery; keep DB default.
    }
  }

  return { row, errors };
}

async function requireStaff() {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not signed in');
  const { data: profile } = await supabase
    .from('profiles').select('role').eq('id', user.id).maybeSingle();
  if (!profile || !['admin', 'broker'].includes(profile.role)) {
    throw new Error('Not authorised');
  }
  return { supabase, user, role: profile.role };
}

export async function createYacht(_prev, formData) {
  const { row, errors } = parseForm(formData);
  if (Object.keys(errors).length) return { errors };
  const { supabase, user } = await requireStaff();
  const { data, error } = await supabase
    .from('yachts')
    .insert({ ...row, created_by: user.id })
    .select('slug').maybeSingle();
  if (error) return { errors: { _form: error.message } };
  revalidatePath('/admin/yachts');
  revalidatePath('/pre-owned');
  revalidatePath(`/pre-owned/${data.slug}`);
  redirect('/admin/yachts');
}

export async function updateYacht(slug, _prev, formData) {
  const { row, errors } = parseForm(formData);
  if (Object.keys(errors).length) return { errors };
  const { supabase } = await requireStaff();
  const { error } = await supabase.from('yachts').update(row).eq('slug', slug);
  if (error) return { errors: { _form: error.message } };
  revalidatePath('/admin/yachts');
  revalidatePath('/pre-owned');
  revalidatePath(`/pre-owned/${slug}`);
  if (row.slug !== slug) revalidatePath(`/pre-owned/${row.slug}`);
  redirect('/admin/yachts');
}

export async function deleteYacht(slug) {
  const { supabase } = await requireStaff();
  const { error } = await supabase.from('yachts').delete().eq('slug', slug);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/yachts');
  revalidatePath('/pre-owned');
}

export async function setYachtStatus(slug, status) {
  if (!YACHT_STATUSES.includes(status)) throw new Error('Invalid status');
  const { supabase } = await requireStaff();
  const { error } = await supabase.from('yachts').update({ listing_status: status }).eq('slug', slug);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/yachts');
  revalidatePath('/pre-owned');
}
