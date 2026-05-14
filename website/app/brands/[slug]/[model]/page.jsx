import Link from 'next/link';
import { notFound } from 'next/navigation';
import { colors, fontSerif, fontSans } from '../../../../lib/theme';
import { getBrands, getModel } from '../../../../lib/data';

export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.flatMap((b) => b.models.map((m) => ({ slug: b.slug, model: m.slug })));
}

export async function generateMetadata({ params }) {
  const { slug, model: modelSlug } = await params;
  const result = await getModel(slug, modelSlug);
  return { title: result ? `${result.model.name} — Asia Yacht Services` : 'Model not found' };
}

export default async function ModelDetailPage({ params }) {
  const { slug, model: modelSlug } = await params;
  const result = await getModel(slug, modelSlug);
  if (!result) notFound();
  const { brand, model } = result;

  return (
    <div style={{ background: colors.bg }}>
      <div style={{ padding: '20px 0', borderBottom: `1px solid ${colors.border}`, background: colors.bgAlt }}>
        <div className="container" style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.textDim }}>
          <Link href="/new">New Yachts</Link> / <Link href={`/brands/${brand.slug}`}>{brand.name}</Link> / <span style={{ color: colors.accent }}>{model.name}</span>
        </div>
      </div>

      <section style={{ position: 'relative', height: 'clamp(440px, 78vh, 800px)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${model.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,14,20,0.2) 0%, rgba(10,14,20,0.4) 60%, rgba(10,14,20,0.95) 100%)' }} />
        <div className="container hero-pad" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 64 }}>
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.4em', color: colors.accent, textTransform: 'uppercase', marginBottom: 24 }}>
            {brand.name} · {model.status}
          </div>
          <h1 className="hero-h1-xl" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.03em', lineHeight: 1 }}>
            {model.name}
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 24, marginTop: 48 }}>
            {[
              { l: 'Length overall', v: model.loa },
              { l: 'Beam', v: model.beam },
              { l: 'Cabins', v: model.cabins || '—' },
              { l: 'Starting price', v: model.priceFrom },
            ].map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{s.l}</div>
                <div style={{ fontFamily: fontSerif, fontSize: 'clamp(20px, 2.6vw, 28px)', color: colors.text, fontWeight: 300, marginTop: 6 }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: colors.bg, borderBottom: `1px solid ${colors.border}` }}>
        <div className="container split">
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase' }}>— Overview</div>
          <div>
            <p style={{ fontFamily: fontSerif, fontSize: 'clamp(18px, 2.5vw, 24px)', color: colors.text, lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
              The {model.name} represents the latest evolution of {brand.name.split(' ')[0]}'s design philosophy — performance, comfort and ocean credentials in equal measure. Designed for couples and families who intend to sail beyond the horizon.
            </p>
            <p style={{ fontFamily: fontSans, fontSize: 15, color: colors.textMuted, lineHeight: 1.8, fontWeight: 300, marginTop: 32 }}>
              Hand-built to ISO Category A ocean rating, with a hull form refined through CFD analysis and tank testing. The interior is configurable across owner's-version and charter layouts, with bespoke joinery options available throughout.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: colors.bgAlt }}>
        <div className="container">
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>— Specifications</div>
          <h2 className="section-h2" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0, marginBottom: 48 }}>
            Built for <span style={{ fontStyle: 'italic', color: colors.accent }}>passage.</span>
          </h2>
          <div className="specs-grid" style={{ borderTop: `1px solid ${colors.border}` }}>
            {[
              ['Length overall', model.loa],
              ['Length waterline', '38\'2"'],
              ['Beam', model.beam],
              ['Draft', '4\'7"'],
              ['Displacement', '17,200 lbs'],
              ['Sail area', '950 sq ft'],
              ['Engine', 'Twin Yanmar 45hp'],
              ['Fuel capacity', '160 gal'],
              ['Water capacity', '140 gal'],
              ['Cabins', model.cabins || '—'],
              ['Berths', model.cabins ? model.cabins * 2 : '—'],
              ['Heads', model.cabins ? Math.max(2, model.cabins - 1) : '—'],
            ].map(([k, v], i) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${colors.border}`, borderLeft: i % 2 === 1 ? `1px solid ${colors.border}` : 'none' }}>
                <div style={{ fontFamily: fontSans, fontSize: 13, color: colors.textMuted, fontWeight: 300 }}>{k}</div>
                <div style={{ fontFamily: fontSans, fontSize: 14, color: colors.text, fontWeight: 400 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: colors.bg, textAlign: 'center', borderTop: `1px solid ${colors.border}` }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>— Next step</div>
          <h2 className="section-h2" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0 }}>
            Request a <span style={{ fontStyle: 'italic', color: colors.accent }}>private viewing.</span>
          </h2>
          <p style={{ fontFamily: fontSans, fontSize: 15, color: colors.textMuted, lineHeight: 1.8, marginTop: 24, fontWeight: 300 }}>
            Our brokers in Hong Kong, Phuket and Singapore can arrange dockside inspection, sea trial or a virtual walk-through within 48 hours.
          </p>
          <Link href="/contact" style={{ display: 'inline-block', background: colors.accent, color: colors.bg, padding: '16px 36px', fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 40 }}>
            Speak with a broker
          </Link>
        </div>
      </section>
    </div>
  );
}
