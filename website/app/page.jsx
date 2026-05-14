import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { colors, fontSerif, fontSans } from '../lib/theme';
import { getBrands, getYachts, IMG } from '../lib/data';
import YachtCard from '../components/YachtCard';

export default async function HomePage() {
  const [brands, yachts] = await Promise.all([getBrands(), getYachts()]);
  const featured = yachts.slice(0, 3);

  return (
    <div>
      <section style={{ position: 'relative', height: '88vh', minHeight: 540, maxHeight: 900, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMG.heroSeawind})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,14,20,0.4) 0%, rgba(10,14,20,0.2) 50%, rgba(10,14,20,0.85) 100%)' }} />
        <div className="container hero-pad" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.4em', color: colors.accent, marginBottom: 24, textTransform: 'uppercase' }}>
            Yacht professionals · Asia Pacific
          </div>
          <h1 className="hero-h1" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0, maxWidth: 900, letterSpacing: '-0.02em' }}>
            The art of <span style={{ fontStyle: 'italic', color: colors.accent }}>blue water</span><br />ownership.
          </h1>
          <p style={{ fontFamily: fontSans, fontSize: 'clamp(15px, 2vw, 17px)', color: colors.textMuted, lineHeight: 1.6, maxWidth: 540, marginTop: 32, fontWeight: 300 }}>
            Two decades representing the world's most considered yacht builders across Hong Kong, Thailand and the Asia-Pacific.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
            <Link href="/new" style={{ background: colors.accent, color: colors.bg, padding: '16px 32px', fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10 }}>
              Discover new yachts <ArrowRight size={14} />
            </Link>
            <Link href="/pre-owned" style={{ color: colors.text, border: `1px solid ${colors.text}`, padding: '16px 32px', fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Browse brokerage
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: colors.bg, borderBottom: `1px solid ${colors.border}` }}>
        <div className="container split">
          <div>
            <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 24 }}>— The house</div>
            <h2 className="section-h2" style={{ fontFamily: fontSerif, lineHeight: 1.1, color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.01em' }}>
              Deliver excellence,<br /><span style={{ fontStyle: 'italic', color: colors.accent }}>anywhere in Asia.</span>
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: fontSans, fontSize: 'clamp(14px, 1.8vw, 16px)', lineHeight: 1.8, color: colors.textMuted, fontWeight: 300 }}>
              Our pedigree brand selection reflects a passion for inshore and offshore sailing. A sailing yacht, first and foremost, should perform — sensitive to sail trim, seaworthy, a platform to enjoy with friends and family. From small one-design racers to serious offshore cruisers and bespoke superyachts, our expertise covers the full spectrum.
            </p>
            <div className="stat-grid" style={{ marginTop: 48 }}>
              {[
                { n: '20+', l: 'Years in market' },
                { n: `${brands.length}`, l: 'Exclusive brands' },
                { n: '300+', l: 'Yachts sold' },
                { n: '30+', l: 'Charter fleet' },
              ].map((s) => (
                <div key={s.l}>
                  <div style={{ fontFamily: fontSerif, fontSize: 'clamp(32px, 4vw, 44px)', color: colors.accent, fontWeight: 300, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.15em', color: colors.textDim, textTransform: 'uppercase', marginTop: 8 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: colors.bgAlt }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, gap: 24, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>— Our brands</div>
              <h2 className="section-h2" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.01em' }}>
                Exclusively <span style={{ fontStyle: 'italic', color: colors.accent }}>represented.</span>
              </h2>
            </div>
            <Link href="/new" style={{ color: colors.text, fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}>
              All brands <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid-2">
            {brands.map((b) => (
              <Link key={b.slug} href={`/brands/${b.slug}`} style={{ position: 'relative', height: 'clamp(320px, 50vw, 420px)', overflow: 'hidden', display: 'block', background: colors.surface }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${b.hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,14,20,0.1) 30%, rgba(10,14,20,0.9) 100%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(20px, 4vw, 32px)' }}>
                  <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.4em', color: colors.accent, textTransform: 'uppercase', marginBottom: 12 }}>{b.origin} · Since {b.since}</div>
                  <div style={{ fontFamily: fontSerif, fontSize: 'clamp(24px, 4vw, 34px)', color: colors.text, fontWeight: 400, letterSpacing: '0.02em' }}>{b.name}</div>
                  <div style={{ fontFamily: fontSans, fontSize: 'clamp(13px, 1.6vw, 14px)', color: colors.textMuted, marginTop: 8, fontWeight: 300 }}>{b.tagline}</div>
                  <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em', color: colors.accent, textTransform: 'uppercase', marginTop: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                    Discover the range <ArrowUpRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: colors.bg }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, gap: 24, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>— Featured brokerage</div>
              <h2 className="section-h2" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0 }}>
                Curated <span style={{ fontStyle: 'italic', color: colors.accent }}>listings.</span>
              </h2>
            </div>
            <Link href="/pre-owned" style={{ color: colors.text, fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}>
              All pre-owned <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid-3">
            {featured.map((y) => <YachtCard key={y.slug} yacht={y} />)}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: colors.bgAlt, borderTop: `1px solid ${colors.border}` }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>— Beyond the sale</div>
            <h2 className="section-h2" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0 }}>
              A complete <span style={{ fontStyle: 'italic', color: colors.accent }}>yacht ecosystem.</span>
            </h2>
          </div>
          <div className="services-grid">
            {[
              { t: 'Brokerage', d: 'Selling a yacht is a niche craft. Our brokerage team has placed vessels with owners across four continents.' },
              { t: 'Ownership Management', d: 'Comprehensive yacht management — insurance, refits, crew, concierge. We handle every aspect of running your yacht.' },
              { t: 'Marketing Services', d: 'A complete marketing ecosystem designed for the yacht industry in Asia. Brand identity through to digital advertising.' },
            ].map((s, i) => (
              <div key={s.t} style={{ padding: 'clamp(32px, 4vw, 48px) clamp(24px, 3vw, 40px)' }}>
                <div style={{ fontFamily: fontSerif, fontSize: 'clamp(40px, 6vw, 56px)', color: colors.accent, fontWeight: 300, lineHeight: 1, marginBottom: 24 }}>0{i + 1}</div>
                <div style={{ fontFamily: fontSerif, fontSize: 'clamp(22px, 3vw, 26px)', color: colors.text, fontWeight: 400, marginBottom: 16 }}>{s.t}</div>
                <p style={{ fontFamily: fontSans, fontSize: 14, color: colors.textMuted, lineHeight: 1.8, fontWeight: 300 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
