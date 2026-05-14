import { colors, fontSerif, fontSans } from '../../lib/theme';
import { Phone, Mail } from 'lucide-react';
import ContactForm from './ContactForm';

export const metadata = { title: 'Contact — Asia Yacht Services' };

export default function ContactPage() {
  return (
    <div style={{ background: colors.bg, minHeight: '100vh' }}>
      <section className="section-pad-sm">
        <div className="container">
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>— Get in touch</div>
          <h1 className="hero-h1" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.02em', maxWidth: 900 }}>
            Come <span style={{ fontStyle: 'italic', color: colors.accent }}>aboard.</span>
          </h1>
          <p style={{ fontFamily: fontSans, fontSize: 'clamp(15px, 2vw, 17px)', color: colors.textMuted, lineHeight: 1.7, maxWidth: 600, marginTop: 32, fontWeight: 300 }}>
            Our brokers in Hong Kong, Phuket and Singapore respond within 24 hours. Tell us what you're looking for — every conversation starts privately.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 96px' }}>
        <div className="container split-form">
          <ContactForm />

          <aside>
            <div style={{ background: colors.bgAlt, border: `1px solid ${colors.border}`, padding: 'clamp(24px, 3vw, 36px)', marginBottom: 24 }}>
              <div style={{ fontFamily: fontSerif, fontSize: 24, color: colors.text, fontWeight: 400, marginBottom: 24 }}>Hong Kong — Head Office</div>
              <div style={{ fontFamily: fontSans, fontSize: 14, color: colors.textMuted, lineHeight: 1.9, fontWeight: 300 }}>
                21F, Hing Yip Commercial Centre<br />
                272-284 Des Voeux Road Central<br />
                Hong Kong SAR
              </div>
              <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${colors.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, fontFamily: fontSans, fontSize: 14, color: colors.text }}>
                  <Phone size={14} color={colors.accent} /> +852 9304 6341
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: fontSans, fontSize: 14, color: colors.text }}>
                  <Mail size={14} color={colors.accent} /> hello@asiayachtservices.com
                </div>
              </div>
            </div>

            <div style={{ background: colors.bgAlt, border: `1px solid ${colors.border}`, padding: 'clamp(24px, 3vw, 36px)', marginBottom: 24 }}>
              <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.25em', color: colors.textDim, textTransform: 'uppercase', marginBottom: 10 }}>Other offices</div>
              <div style={{ fontFamily: fontSans, fontSize: 14, color: colors.text, lineHeight: 2, fontWeight: 300 }}>
                Phuket, Thailand<br />
                Singapore<br />
                Subic Bay, Philippines
              </div>
            </div>

            <div style={{ background: colors.bgAlt, border: `1px solid ${colors.border}`, padding: 'clamp(24px, 3vw, 36px)' }}>
              <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.25em', color: colors.textDim, textTransform: 'uppercase', marginBottom: 16 }}>Office hours</div>
              <div style={{ fontFamily: fontSans, fontSize: 14, color: colors.text, lineHeight: 2, fontWeight: 300 }}>
                Mon — Fri · 09:00 — 18:00 HKT<br />
                Saturday · By appointment<br />
                Sunday · Closed
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
