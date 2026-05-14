// Anonymous Supabase client for build-time / public reads.
// No cookies, no session — RLS policies apply (public read tables are fine).

import { createClient } from '@supabase/supabase-js';

let cached;

export function getSupabaseAnonClient() {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  cached = createClient(url, anon, { auth: { persistSession: false } });
  return cached;
}
