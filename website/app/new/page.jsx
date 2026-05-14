import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { colors, fontSerif, fontSans } from '../../lib/theme';
import { getBrands } from '../../lib/data';

export const metadata = { title: 'New Yachts — Asia Yacht Services' };

export default async function NewYachtsPage() {
  const brands = await getBrands();
  return (
    <div style={{ background: colors.bg, minHeight: '100vh' }}>
      <section className="section-pad-sm">
        <div className="container">
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>— Our brands</div>
          <h1 className="hero-h1-md" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.02em', maxWidth: 900 }}>
            New <span style={{ fontStyle: 'italic', color: colors.accent }}>yachts.</span>
          </h1>
          <p style={{ fontFamily: fontSans, fontSize: 'clamp(15px, 2vw, 17px)', color: colors.textMuted, lineHeight: 1.7, maxWidth: 700, marginTop: 32, fontWeight: 300 }}>
            Asia Yacht Services represents exceptional builders across sail, motor and electric propulsion. Each yard hand-picked for craftsmanship, ocean credentials and a builder culture that matches the people who own them.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 96px' }}>
        <div className="container">
          {brands.map((b, i) => (
            <Link key={b.slug} href={`/brands/${b.slug}`} className={`split-brand ${i % 2 === 1 ? 'rev' : ''}`} style={{
              display: 'grid',
              borderTop: `1px solid ${colors.border}`,
              borderBottom: i === brands.length - 1 ? `1px solid ${colors.border}` : 'none',
            }}>
              <div style={{ order: i % 2 === 0 ? 1 : 2, position: 'relative', height: 'clamp(280px, 50vw, 480px)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${b.hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              </div>
              <div style={{ order: i % 2 === 0 ? 2 : 1, padding: 'clamp(40px, 6vw, 64px) clamp(24px, 4vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: colors.bgAlt }}>
                <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.4em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>
                  Brand 0{i + 1} · {b.origin}
                </div>
                <h2 className="section-h2-lg" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.01em' }}>{b.name}</h2>
                <div style={{ fontFamily: fontSans, fontSize: 'clamp(14px, 2vw, 16px)', color: colors.accent, fontStyle: 'italic', marginTop: 12, fontWeight: 300 }}>{b.tagline}</div>
                <p style={{ fontFamily: fontSans, fontSize: 14, color: colors.textMuted, lineHeight: 1.8, marginTop: 24, fontWeight: 300 }}>{b.description}</p>
                <div style={{ display: 'flex', gap: 32, marginTop: 32, paddingTop: 24, borderTop: `1px solid ${colors.border}` }}>
                  <div>
                    <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Models</div>
                    <div style={{ fontFamily: fontSerif, fontSize: 28, color: colors.text, fontWeight: 300, marginTop: 4 }}>{b.models.length}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Heritage</div>
                    <div style={{ fontFamily: fontSerif, fontSize: 28, color: colors.text, fontWeight: 300, marginTop: 4 }}>Since {b.since}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 40, color: colors.accent, fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  Explore the range <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
