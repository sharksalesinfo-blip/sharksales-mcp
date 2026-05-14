import { redirect } from 'next/navigation';
import { colors, fontSerif, fontSans } from '../../../lib/theme';
import { getSupabaseServerClient } from '../../../lib/supabase/server';
import LoginForm from './LoginForm';

export const metadata = { title: 'Admin login — Asia Yacht Services' };

export default async function AdminLoginPage({ searchParams }) {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect('/admin');

  const params = await searchParams;
  const error = params?.error;
  const sent = params?.sent;

  return (
    <div style={{ minHeight: '100vh', background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 440, background: colors.bgAlt, border: `1px solid ${colors.border}`, padding: 'clamp(32px, 5vw, 48px)' }}>
        <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.4em', color: colors.accent, textTransform: 'uppercase', marginBottom: 12 }}>
          Admin
        </div>
        <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(28px, 4vw, 38px)', color: colors.text, fontWeight: 300, margin: 0, marginBottom: 8 }}>
          Sign <span style={{ fontStyle: 'italic', color: colors.accent }}>in.</span>
        </h1>
        <p style={{ fontFamily: fontSans, fontSize: 14, color: colors.textMuted, lineHeight: 1.6, marginBottom: 32, fontWeight: 300 }}>
          Enter your email — we'll send a one-time sign-in link. No password needed.
        </p>

        {sent && (
          <div style={{ background: 'rgba(212, 184, 138, 0.08)', border: `1px solid ${colors.accent}`, padding: 16, marginBottom: 24, fontFamily: fontSans, fontSize: 13, color: colors.text, lineHeight: 1.6 }}>
            Check your inbox — we sent a sign-in link. The link expires in 1 hour.
          </div>
        )}
        {error && (
          <div style={{ background: 'rgba(255, 80, 80, 0.08)', border: '1px solid #c44', padding: 16, marginBottom: 24, fontFamily: fontSans, fontSize: 13, color: '#f99', lineHeight: 1.6 }}>
            That link didn't work. Try requesting a new one.
          </div>
        )}

        <LoginForm />
      </div>
    </div>
  );
}
