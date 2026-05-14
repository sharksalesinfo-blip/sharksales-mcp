import Link from 'next/link';
import { Ruler, Users, MapPin, ArrowUpRight } from 'lucide-react';
import { colors, fontSerif, fontSans } from '../lib/theme';

export default function YachtCard({ yacht }) {
  return (
    <Link href={`/pre-owned/${yacht.slug}`} style={{ display: 'block', background: colors.surface }}>
      <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${yacht.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(10,14,20,0.85)', color: colors.accent, padding: '6px 12px', fontFamily: fontSans, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          {yacht.type}
        </div>
      </div>
      <div style={{ padding: '24px 24px 28px' }}>
        <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.3em', color: colors.textDim, textTransform: 'uppercase', marginBottom: 8 }}>
          {yacht.builder} · {yacht.year}
        </div>
        <div style={{ fontFamily: fontSerif, fontSize: 26, color: colors.text, fontWeight: 400, marginBottom: 16 }}>{yacht.name}</div>
        <div style={{ display: 'flex', gap: 20, fontFamily: fontSans, fontSize: 12, color: colors.textMuted, marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${colors.border}` }}>
          <div><Ruler size={12} style={{ verticalAlign: -1, marginRight: 4 }} /> {yacht.loa}ft</div>
          <div><Users size={12} style={{ verticalAlign: -1, marginRight: 4 }} /> {yacht.cabins} cabins</div>
          <div><MapPin size={12} style={{ verticalAlign: -1, marginRight: 4 }} /> {yacht.location}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Asking</div>
            <div style={{ fontFamily: fontSerif, fontSize: 22, color: colors.accent, fontWeight: 400 }}>
              {yacht.currency} {yacht.price.toLocaleString()}
            </div>
          </div>
          <ArrowUpRight size={20} color={colors.text} />
        </div>
      </div>
    </Link>
  );
}
