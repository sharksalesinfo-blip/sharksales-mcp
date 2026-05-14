import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { colors, fontSerif, fontSans } from '../../../lib/theme';
import { getBrand, getBrands } from '../../../lib/data';

export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const brand = await getBrand(slug);
  return { title: brand ? `${brand.name} — Asia Yacht Services` : 'Brand not found' };
}

export default async function BrandPage({ params }) {
  const { slug } = await params;
  const brand = await getBrand(slug);
  if (!brand) notFound();

  return (
    <div style={{ background: colors.bg }}>
      <div style={{ padding: '20px 0', borderBottom: `1px solid ${colors.border}`, background: colors.bgAlt }}>
        <div className="container" style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.textDim }}>
          <Link href="/">Home</Link> / <Link href="/new">New Yachts</Link> / <span style={{ color: colors.accent }}>{brand.name}</span>
        </div>
      </div>

      <section style={{ position: 'relative', height: 'clamp(420px, 70vh, 700px)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${brand.hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,14,20,0.3) 0%, rgba(10,14,20,0.85) 100%)' }} />
        <div className="container hero-pad" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.4em', color: colors.accent, marginBottom: 24, textTransform: 'uppercase' }}>
            {brand.origin} · Built since {brand.since}
          </div>
          <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(48px, 9vw, 96px)', color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.03em', lineHeight: 1 }}>
            {brand.name}
          </h1>
          <p style={{ fontFamily: fontSerif, fontSize: 'clamp(18px, 2.5vw, 24px)', color: colors.accent, fontStyle: 'italic', marginTop: 24, fontWeight: 300, maxWidth: 700 }}>
            {brand.tagline}
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: colors.bg, borderBottom: `1px solid ${colors.border}` }}>
        <div className="container split">
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase' }}>— About the yard</div>
          <p style={{ fontFamily: fontSerif, fontSize: 'clamp(18px, 2.5vw, 22px)', color: colors.text, lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
            {brand.description}
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: colors.bgAlt }}>
        <div className="container">
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>— The range</div>
            <h2 className="section-h2-lg" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.01em' }}>
              The <span style={{ fontStyle: 'italic', color: colors.accent }}>{brand.name.split(' ')[0]}</span> fleet.
            </h2>
          </div>
          <div style={{ display: 'grid', gap: 32 }}>
            {brand.models.map((m, i) => (
              <Link key={m.slug} href={`/brands/${brand.slug}/${m.slug}`} className="split-model" style={{ display: 'grid', background: colors.surface }}>
                <div style={{ height: 'clamp(280px, 45vw, 400px)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${m.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div style={{ position: 'absolute', top: 24, left: 24, background: colors.accent, color: colors.bg, padding: '6px 14px', fontFamily: fontSans, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    {m.status}
                  </div>
                </div>
                <div style={{ padding: 'clamp(28px, 4vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 12 }}>Model 0{i + 1}</div>
                  <h3 className="model-h3" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 400, margin: 0, letterSpacing: '-0.01em' }}>{m.name}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 32, paddingTop: 32, borderTop: `1px solid ${colors.border}` }}>
                    <div>
                      <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.2em', textTransform: 'uppercase' }}>LOA</div>
                      <div style={{ fontFamily: fontSerif, fontSize: 'clamp(20px, 2.5vw, 24px)', color: colors.text, fontWeight: 300, marginTop: 4 }}>{m.loa}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Beam</div>
                      <div style={{ fontFamily: fontSerif, fontSize: 'clamp(20px, 2.5vw, 24px)', color: colors.text, fontWeight: 300, marginTop: 4 }}>{m.beam}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Cabins</div>
                      <div style={{ fontFamily: fontSerif, fontSize: 'clamp(20px, 2.5vw, 24px)', color: colors.text, fontWeight: 300, marginTop: 4 }}>{m.cabins || '—'}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                    <div>
                      <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.2em', textTransform: 'uppercase' }}>From</div>
                      <div style={{ fontFamily: fontSerif, fontSize: 22, color: colors.accent, fontWeight: 400, marginTop: 4 }}>{m.priceFrom}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: colors.text, fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                      Discover <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
