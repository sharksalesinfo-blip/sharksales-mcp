import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseServerClient } from '../../../lib/supabase/server';
import { colors, fontSerif, fontSans } from '../../../lib/theme';
import SignOutButton from '../SignOutButton';

// Everything inside (authed) requires a signed-in user with a profile.
// /admin/login lives outside this group so it stays accessible.
export default async function AdminAuthedLayout({ children }) {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const { data: profile } = await supabase
    .from('profiles').select('*').eq('id', user.id).maybeSingle();

  const isAdmin = profile?.role === 'admin';

  const navLinks = [
    { label: 'Dashboard', href: '/admin', adminOnly: false },
    { label: 'Yachts',    href: '/admin/yachts', adminOnly: false },
    { label: 'Models',    href: '/admin/models', adminOnly: false },
    { label: 'Brands',    href: '/admin/brands', adminOnly: true },
    { label: 'Settings',  href: '/admin/settings', adminOnly: true },
    { label: 'Users',     href: '/admin/users', adminOnly: true },
  ].filter((item) => !item.adminOnly || isAdmin);

  return (
    <div style={{ minHeight: '100vh', background: colors.bg, color: colors.text }}>
      <header style={{
        borderBottom: `1px solid ${colors.border}`, background: colors.bgAlt,
        padding: '16px 0', position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <Link href="/admin" style={{ display: 'block' }}>
            <div style={{ fontFamily: fontSerif, fontSize: 18, fontWeight: 400 }}>
              Asia Yacht <span style={{ fontStyle: 'italic', color: colors.accent }}>Admin</span>
            </div>
            <div style={{ fontFamily: fontSans, fontSize: 9, color: colors.textDim, letterSpacing: '0.3em', marginTop: 2, textTransform: 'uppercase' }}>
              {profile?.email ?? user.email} · {profile?.role ?? 'no role'}
            </div>
          </Link>
          <nav style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} style={{
                fontFamily: fontSans, fontSize: 11, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: colors.text,
              }}>{l.label}</Link>
            ))}
            <SignOutButton />
          </nav>
        </div>
      </header>
      <main className="container" style={{ padding: '40px 48px 96px' }}>
        {children}
      </main>
    </div>
  );
}
