import { colors, fontSerif, fontSans } from '../../../../../lib/theme';
import YachtForm from '../YachtForm';
import { createYacht } from '../actions';

export default function NewYachtPage() {
  return (
    <div>
      <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 12 }}>— New listing</div>
      <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(28px, 4vw, 40px)', color: colors.text, fontWeight: 300, margin: 0, marginBottom: 32 }}>
        Add a <span style={{ fontStyle: 'italic', color: colors.accent }}>yacht.</span>
      </h1>
      <YachtForm action={createYacht} submitLabel="Create listing" />
    </div>
  );
}
