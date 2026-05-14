'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { colors, fontSans } from '../../lib/theme';
import { signOut } from './login/actions';

export default function SignOutButton() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  function onClick() {
    startTransition(async () => {
      await signOut();
      router.push('/admin/login');
      router.refresh();
    });
  }
  return (
    <button
      onClick={onClick}
      disabled={pending}
      style={{
        background: 'transparent', color: colors.textMuted,
        border: `1px solid ${colors.border}`, padding: '8px 14px',
        fontFamily: fontSans, fontSize: 10, letterSpacing: '0.2em',
        textTransform: 'uppercase', cursor: pending ? 'wait' : 'pointer',
      }}
    >
      {pending ? '…' : 'Sign out'}
    </button>
  );
}
