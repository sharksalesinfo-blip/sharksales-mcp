'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { colors, fontSans } from '../../lib/theme';

function Field({ label, ...rest }) {
  return (
    <div>
      <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.25em', color: colors.textDim, textTransform: 'uppercase', marginBottom: 10 }}>{label}</div>
      <input {...rest} style={{ background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text, padding: '14px 16px', fontFamily: fontSans, fontSize: 14, width: '100%', boxSizing: 'border-box' }} />
    </div>
  );
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div>
        <div style={{ background: colors.bgAlt, border: `1px solid ${colors.border}`, padding: 'clamp(40px, 6vw, 64px)', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px, 4vw, 36px)', color: colors.accent, fontWeight: 300, marginBottom: 16 }}>Thank you.</div>
          <p style={{ fontFamily: fontSans, fontSize: 15, color: colors.textMuted, lineHeight: 1.7, fontWeight: 300 }}>Your message has reached us. Karen or Bart will be in touch personally within 24 hours.</p>
          <button onClick={() => setSubmitted(false)} style={{ background: 'transparent', color: colors.accent, border: `1px solid ${colors.accent}`, padding: '12px 28px', fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', marginTop: 32 }}>Send another</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <Field label="First name" placeholder="Bart" />
        <Field label="Last name" placeholder="Kimman" />
      </div>
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <Field label="Email" placeholder="you@domain.com" type="email" />
        <Field label="Phone" placeholder="+852 ..." />
      </div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.25em', color: colors.textDim, textTransform: 'uppercase', marginBottom: 10 }}>Interest</div>
        <select style={{ background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text, padding: '14px 16px', fontFamily: fontSans, fontSize: 14, width: '100%', boxSizing: 'border-box' }}>
          <option>New yacht — sailing</option>
          <option>New yacht — motor</option>
          <option>Pre-owned brokerage</option>
          <option>Charter</option>
          <option>Yacht management</option>
          <option>Selling my yacht</option>
        </select>
      </div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.25em', color: colors.textDim, textTransform: 'uppercase', marginBottom: 10 }}>Message</div>
        <textarea rows={6} placeholder="Tell us about your project..." style={{ background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text, padding: 16, fontFamily: fontSans, fontSize: 14, width: '100%', boxSizing: 'border-box', resize: 'vertical' }} />
      </div>
      <button onClick={() => setSubmitted(true)} style={{ background: colors.accent, color: colors.bg, border: 'none', padding: '18px 36px', fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
        Send enquiry <ArrowRight size={14} />
      </button>
      <p style={{ fontFamily: fontSans, fontSize: 11, color: colors.textDim, marginTop: 24, lineHeight: 1.7, maxWidth: 480 }}>
        Your data stays with us. We do not share with third parties. By submitting you accept our privacy policy.
      </p>
    </div>
  );
}
