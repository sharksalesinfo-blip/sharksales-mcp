// Browser-side Supabase client (used inside 'use client' components).
// Reads the same env vars that the Vercel ↔ Supabase integration writes.

import { createBrowserClient } from '@supabase/ssr';

let cached;

export function getSupabaseBrowserClient() {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  cached = createBrowserClient(url, anon);
  return cached;
}
