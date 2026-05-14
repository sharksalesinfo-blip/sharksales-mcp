'use client';

import { useState } from 'react';
import { colors, fontSans } from '../../../lib/theme';

export default function YachtGallery({ images, type }) {
  const [active, setActive] = useState(0);
  return (
    <section style={{ background: colors.bg, padding: 'clamp(28px, 4vw, 48px) 0 0' }}>
      <div className="container">
        <div style={{ position: 'relative', height: 'clamp(280px, 50vw, 540px)', overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${images[active]})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 0.4s' }} />
          <div style={{ position: 'absolute', top: 24, left: 24, background: colors.accent, color: colors.bg, padding: '8px 16px', fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            {type}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${images.length}, 1fr)`, gap: 12 }}>
          {images.map((img, i) => (
            <div key={i} onClick={() => setActive(i)} style={{
              height: 'clamp(60px, 12vw, 120px)',
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer',
              border: active === i ? `2px solid ${colors.accent}` : '2px solid transparent',
              opacity: active === i ? 1 : 0.6,
              transition: 'opacity 0.2s',
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}
