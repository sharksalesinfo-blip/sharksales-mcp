'use server';

import { getSupabaseServerClient } from '../../../lib/supabase/server';

// Resolve the canonical site URL we want magic links to come back to.
// Priority: explicit env var (set in Vercel) → preview deploy URL → caller's origin.
// Without this, Supabase falls back to its dashboard "Site URL" — which
// defaults to http://localhost:3000 and bites you in production.
function resolveSiteUrl(callerOrigin) {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  const vercel = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/$/, '')}`;
  return (callerOrigin || '').replace(/\/$/, '');
}

export async function sendMagicLink({ email, origin }) {
  if (!email) return { error: 'Email required' };
  const site = resolveSiteUrl(origin);
  if (!site) return { error: 'Could not determine site URL' };
  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${site}/auth/callback` },
  });
  if (error) return { error: error.message };
  return { ok: true };
}

export async function signOut() {
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();
}
