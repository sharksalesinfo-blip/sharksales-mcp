'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Menu } from 'lucide-react';
import { colors, fontSerif, fontSans } from '../lib/theme';

const ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'New Yachts', href: '/new' },
  { label: 'Pre-Owned', href: '/pre-owned' },
  { label: 'Charters', href: '/' },
  { label: 'Contact', href: '/contact' },
];

function isActive(pathname, href) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(10, 14, 20, 0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${colors.border}`,
      padding: '20px 0',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" onClick={() => setOpen(false)} style={{ textAlign: 'left' }}>
          <div style={{ fontFamily: fontSerif, fontSize: 'clamp(18px, 3vw, 22px)', color: colors.text, letterSpacing: '0.02em', fontWeight: 400 }}>
            Asia Yacht <span style={{ fontStyle: 'italic', color: colors.accent }}>Services</span>
          </div>
          <div style={{ fontFamily: fontSans, fontSize: 9, color: colors.textDim, letterSpacing: '0.3em', marginTop: 2 }}>HONG KONG · SINCE 2004</div>
        </Link>

        <div className="nav-desktop">
          {ITEMS.map(({ label, href }) => (
            <Link key={label} href={href} style={{
              color: isActive(pathname, href) ? colors.accent : colors.text,
              fontFamily: fontSans, fontSize: 12, letterSpacing: '0.18em',
              textTransform: 'uppercase', padding: '8px 0', fontWeight: 400,
            }}>{label}</Link>
          ))}
          <Link href="/contact" style={{
            color: colors.accent,
            border: `1px solid ${colors.accent}`, padding: '10px 22px',
            fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>Enquire</Link>
        </div>

        <button className="nav-mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: colors.bg, borderTop: `1px solid ${colors.border}`,
          borderBottom: `1px solid ${colors.border}`,
          padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {ITEMS.map(({ label, href }) => (
            <Link key={label} href={href} onClick={() => setOpen(false)} style={{
              color: isActive(pathname, href) ? colors.accent : colors.text,
              fontFamily: fontSans, fontSize: 14, letterSpacing: '0.18em',
              textTransform: 'uppercase', padding: '14px 0',
              borderBottom: `1px solid ${colors.border}`,
            }}>{label}</Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} style={{
            background: colors.accent, color: colors.bg,
            padding: '14px 0', fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em',
            textTransform: 'uppercase', marginTop: 16, textAlign: 'center',
          }}>Enquire</Link>
        </div>
      )}
    </nav>
  );
}
