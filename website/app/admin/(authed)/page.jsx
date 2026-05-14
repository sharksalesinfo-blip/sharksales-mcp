import Link from 'next/link';
import { getSupabaseServerClient } from '../../../lib/supabase/server';
import { colors, fontSerif, fontSans } from '../../../lib/theme';

export default async function AdminDashboard() {
  const supabase = await getSupabaseServerClient();

  const { count: brandCount } = await supabase.from('brands').select('*', { count: 'exact', head: true });
  const { count: modelCount } = await supabase.from('models').select('*', { count: 'exact', head: true });
  const { count: yachtCount } = await supabase.from('yachts').select('*', { count: 'exact', head: true });

  const tiles = [
    { label: 'Brands', count: brandCount ?? 0, href: '/admin/brands' },
    { label: 'Models', count: modelCount ?? 0, href: '/admin/models' },
    { label: 'Yachts', count: yachtCount ?? 0, href: '/admin/yachts' },
  ];

  return (
    <div>
      <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 12 }}>
        — Dashboard
      </div>
      <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(32px, 5vw, 48px)', color: colors.text, fontWeight: 300, margin: 0, marginBottom: 32, letterSpacing: '-0.01em' }}>
        Welcome <span style={{ fontStyle: 'italic', color: colors.accent }}>aboard.</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 48 }}>
        {tiles.map((t) => (
          <Link key={t.label} href={t.href} style={{
            display: 'block', background: colors.bgAlt, border: `1px solid ${colors.border}`,
            padding: 24,
          }}>
            <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.25em', textTransform: 'uppercase' }}>{t.label}</div>
            <div style={{ fontFamily: fontSerif, fontSize: 40, color: colors.accent, fontWeight: 300, lineHeight: 1, marginTop: 8 }}>
              {t.count}
            </div>
          </Link>
        ))}
      </div>

      <div style={{ fontFamily: fontSans, fontSize: 13, color: colors.textMuted, lineHeight: 1.7 }}>
        CRUD UI for each section is being built. Yachts is next — click the tile to preview.
      </div>
    </div>
  );
}
