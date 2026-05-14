import Link from 'next/link';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { colors, fontSerif, fontSans } from '../lib/theme';

export default function Footer({ brands }) {
  return (
    <footer style={{ background: colors.bgAlt, borderTop: `1px solid ${colors.border}`, padding: '64px 0 32px', color: colors.textMuted }}>
      <div className="container footer-grid">
        <div>
          <div style={{ fontFamily: fontSerif, fontSize: 26, color: colors.text, marginBottom: 16 }}>
            Asia Yacht <span style={{ fontStyle: 'italic', color: colors.accent }}>Services</span>
          </div>
          <p style={{ fontFamily: fontSans, fontSize: 13, lineHeight: 1.7, maxWidth: 360 }}>
            Yacht professionals since 2004. Exclusive dealer for premium brands across the Asia-Pacific region. From bluewater cruisers to bespoke superyachts.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <div key={i} style={{ width: 36, height: 36, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={14} color={colors.textMuted} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.text, marginBottom: 20 }}>Explore</div>
          {[
            ['Home', '/'],
            ['New Yachts', '/new'],
            ['Pre-Owned', '/pre-owned'],
            ['Contact', '/contact'],
          ].map(([l, href]) => (
            <Link key={l} href={href} style={{ display: 'block', fontFamily: fontSans, fontSize: 13, padding: '6px 0' }}>{l}</Link>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.text, marginBottom: 20 }}>Brands</div>
          {brands.map((b) => (
            <Link key={b.slug} href={`/brands/${b.slug}`} style={{ display: 'block', fontFamily: fontSans, fontSize: 13, padding: '6px 0' }}>{b.name}</Link>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.text, marginBottom: 20 }}>Contact</div>
          <div style={{ fontFamily: fontSans, fontSize: 13, lineHeight: 1.8 }}>
            21F, Hing Yip Commercial Centre<br />
            272-284 Des Voeux Road Central<br />
            Hong Kong SAR<br /><br />
            <span style={{ color: colors.accent }}>+852 9304 6341</span><br />
            hello@asiayachtservices.com
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontFamily: fontSans, fontSize: 11, color: colors.textDim, letterSpacing: '0.1em' }}>
        <div>© {new Date().getFullYear()} Asia Yacht Services Ltd. All rights reserved.</div>
        <div>Privacy · Terms · Cookies</div>
      </div>
    </footer>
  );
}
