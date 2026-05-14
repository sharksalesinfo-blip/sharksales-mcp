import Link from 'next/link';
import { notFound } from 'next/navigation';
import { colors, fontSerif, fontSans } from '../../../lib/theme';
import { getYacht, getYachts, IMG } from '../../../lib/data';
import YachtGallery from './YachtGallery';
import { MapPin, Calendar, Ruler, Phone, Mail } from 'lucide-react';

export async function generateStaticParams() {
  const yachts = await getYachts();
  return yachts.map((y) => ({ slug: y.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const yacht = await getYacht(slug);
  return { title: yacht ? `${yacht.name} — ${yacht.builder} ${yacht.year} — Asia Yacht Services` : 'Yacht not found' };
}

export default async function YachtDetailPage({ params }) {
  const { slug } = await params;
  const y = await getYacht(slug);
  if (!y) notFound();

  const gallery = [y.image, IMG.cruise, IMG.heroSeawind, IMG.swan82];

  return (
    <div style={{ background: colors.bg }}>
      <div style={{ padding: '20px 0', borderBottom: `1px solid ${colors.border}`, background: colors.bgAlt }}>
        <div className="container" style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.textDim }}>
          <Link href="/pre-owned">Pre-Owned</Link> / <span style={{ color: colors.accent }}>{y.name}</span>
        </div>
      </div>

      <YachtGallery images={gallery} type={y.type} />

      <section style={{ background: colors.bg, padding: '64px 0' }}>
        <div className="container split-form">
          <div>
            <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 12 }}>{y.builder} · {y.year}</div>
            <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(40px, 8vw, 78px)', color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>{y.name}</h1>
            <div className="yacht-meta" style={{ marginTop: 32, fontFamily: fontSans, fontSize: 14, color: colors.textMuted }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><MapPin size={14} color={colors.accent} /> {y.location}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Calendar size={14} color={colors.accent} /> Built {y.year}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Ruler size={14} color={colors.accent} /> {y.loa}ft LOA</div>
            </div>

            <div style={{ marginTop: 48, paddingTop: 48, borderTop: `1px solid ${colors.border}` }}>
              <h2 style={{ fontFamily: fontSerif, fontSize: 'clamp(26px, 3.5vw, 32px)', color: colors.text, fontWeight: 300, margin: 0, marginBottom: 16 }}>The yacht</h2>
              <p style={{ fontFamily: fontSans, fontSize: 15, color: colors.textMuted, lineHeight: 1.9, fontWeight: 300 }}>
                {y.name} is a {y.year} {y.builder} {y.type.toLowerCase()} maintained to exceptional standard by her current ownership. Recently surveyed and presented in turn-key condition, she offers immediate sailing across the {y.location} cruising grounds and beyond. Three-cabin layout, full electronics refit in 2023, new sails 2024. Inspection by appointment.
              </p>
              <p style={{ fontFamily: fontSans, fontSize: 15, color: colors.textMuted, lineHeight: 1.9, fontWeight: 300, marginTop: 16 }}>
                A rare opportunity to acquire one of the cleanest examples currently available on the Asia-Pacific market. Owner is motivated by an upgrade to a larger platform — sensible offers will be considered.
              </p>
            </div>

            <div style={{ marginTop: 48, paddingTop: 48, borderTop: `1px solid ${colors.border}` }}>
              <h2 style={{ fontFamily: fontSerif, fontSize: 'clamp(26px, 3.5vw, 32px)', color: colors.text, fontWeight: 300, margin: 0, marginBottom: 32 }}>Specifications</h2>
              <div className="specs-grid">
                {[
                  ['Builder', y.builder], ['Model year', y.year],
                  ['Length overall', `${y.loa} ft`], ['Beam', `${y.beam} ft`],
                  ['Hull type', y.type], ['Cabins', y.cabins],
                  ['Location', y.location], ['Flag', 'Hong Kong'],
                  ['Engines', '2 × Volvo D2-75'], ['Hours', '1,840'],
                  ['Fuel', 'Diesel'], ['VAT status', 'Paid'],
                ].map(([k, v], i) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: `1px solid ${colors.border}`, paddingRight: i % 2 === 0 ? 24 : 0, paddingLeft: i % 2 === 1 ? 24 : 0, borderLeft: i % 2 === 1 ? `1px solid ${colors.border}` : 'none' }}>
                    <div style={{ fontFamily: fontSans, fontSize: 12, color: colors.textDim, fontWeight: 300, letterSpacing: '0.05em' }}>{k}</div>
                    <div style={{ fontFamily: fontSans, fontSize: 13, color: colors.text }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside>
            <div style={{ background: colors.bgAlt, border: `1px solid ${colors.border}`, padding: 'clamp(24px, 3vw, 36px)' }}>
              <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Asking price</div>
              <div style={{ fontFamily: fontSerif, fontSize: 'clamp(32px, 4vw, 42px)', color: colors.accent, fontWeight: 400, marginTop: 8, letterSpacing: '-0.01em' }}>
                {y.currency} {y.price.toLocaleString()}
              </div>
              <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${colors.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: colors.accent, color: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fontSerif, fontSize: 22, fontWeight: 400 }}>KB</div>
                  <div>
                    <div style={{ fontFamily: fontSerif, fontSize: 18, color: colors.text, fontWeight: 400 }}>Karen Ball</div>
                    <div style={{ fontFamily: fontSans, fontSize: 11, color: colors.textMuted, letterSpacing: '0.1em' }}>Sales Director</div>
                  </div>
                </div>
                <Link href="/contact" style={{ display: 'block', background: colors.accent, color: colors.bg, padding: '14px 0', fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', textAlign: 'center', width: '100%', marginBottom: 10 }}>
                  Request information
                </Link>
              </div>
              <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${colors.border}`, fontFamily: fontSans, fontSize: 12, color: colors.textMuted, lineHeight: 1.7 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}><Phone size={12} color={colors.accent} /> +852 9304 6341</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Mail size={12} color={colors.accent} /> karen@asiayachtservices.com</div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
