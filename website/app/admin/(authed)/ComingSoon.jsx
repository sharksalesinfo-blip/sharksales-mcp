import { colors, fontSerif, fontSans } from '../../../lib/theme';

export default function ComingSoon({ title, note }) {
  return (
    <div>
      <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 12 }}>
        — {title}
      </div>
      <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(32px, 5vw, 48px)', color: colors.text, fontWeight: 300, margin: 0, marginBottom: 16, letterSpacing: '-0.01em' }}>
        Coming <span style={{ fontStyle: 'italic', color: colors.accent }}>soon.</span>
      </h1>
      <p style={{ fontFamily: fontSans, fontSize: 14, color: colors.textMuted, maxWidth: 560, lineHeight: 1.7 }}>
        {note}
      </p>
    </div>
  );
}
