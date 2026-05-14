'use server';

import { getSupabaseServerClient } from '../../../lib/supabase/server';

export async function sendMagicLink({ email, origin }) {
  if (!email) return { error: 'Email required' };
  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${origin}/auth/callback` },
  });
  if (error) return { error: error.message };
  return { ok: true };
}

export async function signOut() {
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();
}
