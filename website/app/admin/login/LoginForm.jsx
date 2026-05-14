'use client';

import { useState, useTransition } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { colors, fontSans } from '../../../lib/theme';
import { sendMagicLink } from './actions';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [pending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState(null);
  const router = useRouter();

  function onSubmit(e) {
    e.preventDefault();
    setErrorMsg(null);
    startTransition(async () => {
      const result = await sendMagicLink({
        email,
        origin: window.location.origin,
      });
      if (result?.error) setErrorMsg(result.error);
      else router.push('/admin/login?sent=1');
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.25em', color: colors.textDim, textTransform: 'uppercase', marginBottom: 10 }}>
        Email
      </div>
      <input
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@asiayachtservices.com"
        style={{ background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text, padding: '14px 16px', fontFamily: fontSans, fontSize: 14, width: '100%', boxSizing: 'border-box' }}
      />
      {errorMsg && (
        <div style={{ fontFamily: fontSans, fontSize: 12, color: '#f99', marginTop: 12 }}>{errorMsg}</div>
      )}
      <button
        type="submit"
        disabled={pending || !email}
        style={{
          marginTop: 24, width: '100%',
          background: colors.accent, color: colors.bg, border: 'none',
          padding: '16px 24px', fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em',
          textTransform: 'uppercase', cursor: pending ? 'wait' : 'pointer',
          opacity: pending ? 0.6 : 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
        }}
      >
        {pending ? 'Sending…' : <>Send magic link <ArrowRight size={14} /></>}
      </button>
    </form>
  );
}
