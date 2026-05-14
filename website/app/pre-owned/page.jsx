import { colors, fontSerif, fontSans } from '../../lib/theme';
import { getYachts } from '../../lib/data';
import YachtsBrowser from './YachtsBrowser';

export const metadata = { title: 'Pre-Owned Yachts — Asia Yacht Services' };

export default async function PreOwnedPage() {
  const yachts = await getYachts();
  return (
    <div style={{ background: colors.bg, minHeight: '100vh' }}>
      <section className="section-pad-sm">
        <div className="container">
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>— Brokerage</div>
          <h1 className="hero-h1-md" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.02em' }}>
            Pre-owned <span style={{ fontStyle: 'italic', color: colors.accent }}>yachts.</span>
          </h1>
          <p style={{ fontFamily: fontSans, fontSize: 'clamp(15px, 2vw, 17px)', color: colors.textMuted, lineHeight: 1.7, maxWidth: 700, marginTop: 24, fontWeight: 300 }}>
            A curated selection of vessels from our brokerage desk. Every yacht inspected, every history verified.
          </p>
        </div>
      </section>

      <YachtsBrowser yachts={yachts} />
    </div>
  );
}
