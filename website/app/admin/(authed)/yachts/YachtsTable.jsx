'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, ExternalLink } from 'lucide-react';
import { colors, fontSans, fontSerif } from '../../../../lib/theme';
import { deleteYacht, setYachtStatus } from './actions';

const STATUS_OPTIONS = [
  { v: 'available', l: 'Available', c: '#7fd396' },
  { v: 'sale_pending', l: 'Pending', c: '#d4b88a' },
  { v: 'sold', l: 'Sold', c: '#9ba3b0' },
  { v: 'draft', l: 'Draft', c: '#6b7280' },
];

function StatusDot({ status }) {
  const s = STATUS_OPTIONS.find((o) => o.v === status) ?? STATUS_OPTIONS[0];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontFamily: fontSans, fontSize: 11, letterSpacing: '0.1em',
      color: colors.text, textTransform: 'uppercase',
    }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.c, display: 'inline-block' }} />
      {s.l}
    </span>
  );
}

export default function YachtsTable({ yachts }) {
  const [pending, startTransition] = useTransition();
  const [busySlug, setBusySlug] = useState(null);
  const router = useRouter();

  if (!yachts.length) {
    return (
      <div style={{ background: colors.bgAlt, border: `1px solid ${colors.border}`, padding: 48, textAlign: 'center' }}>
        <div style={{ fontFamily: fontSerif, fontSize: 22, color: colors.textMuted, fontStyle: 'italic', marginBottom: 16 }}>
          No listings yet.
        </div>
        <Link href="/admin/yachts/new" style={{ color: colors.accent, fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Create the first one →
        </Link>
      </div>
    );
  }

  function onStatusChange(slug, status) {
    setBusySlug(slug);
    startTransition(async () => {
      try { await setYachtStatus(slug, status); router.refresh(); }
      finally { setBusySlug(null); }
    });
  }

  function onDelete(slug, name) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setBusySlug(slug);
    startTransition(async () => {
      try { await deleteYacht(slug); router.refresh(); }
      finally { setBusySlug(null); }
    });
  }

  return (
    <div style={{ background: colors.bgAlt, border: `1px solid ${colors.border}` }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720, fontFamily: fontSans, fontSize: 13 }}>
          <thead>
            <tr style={{ background: colors.surface, color: colors.textDim, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              <th style={th}>Yacht</th>
              <th style={th}>Builder · Year</th>
              <th style={th}>Price</th>
              <th style={th}>Location</th>
              <th style={th}>Status</th>
              <th style={{ ...th, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {yachts.map((y) => (
              <tr key={y.slug} style={{ borderTop: `1px solid ${colors.border}`, opacity: busySlug === y.slug ? 0.5 : 1 }}>
                <td style={td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {y.image_url ? (
                      <img src={y.image_url} alt="" style={{ width: 64, height: 44, objectFit: 'cover', display: 'block' }} />
                    ) : (
                      <div style={{ width: 64, height: 44, background: colors.surface, border: `1px dashed ${colors.border}` }} />
                    )}
                    <div>
                      <div style={{ fontFamily: fontSerif, fontSize: 16, color: colors.text }}>{y.name}</div>
                      <div style={{ fontSize: 11, color: colors.textDim, letterSpacing: '0.1em' }}>{y.type}</div>
                    </div>
                  </div>
                </td>
                <td style={td}>{y.builder} · {y.year}</td>
                <td style={td}>{y.currency} {Number(y.price ?? 0).toLocaleString()}</td>
                <td style={td}>{y.location}</td>
                <td style={td}>
                  <select
                    value={y.listing_status}
                    onChange={(e) => onStatusChange(y.slug, e.target.value)}
                    disabled={pending}
                    style={{
                      background: colors.surface, border: `1px solid ${colors.border}`,
                      color: colors.text, padding: '8px 10px', fontFamily: fontSans, fontSize: 12,
                    }}
                  >
                    {STATUS_OPTIONS.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
                  </select>
                </td>
                <td style={{ ...td, textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <Link href={`/pre-owned/${y.slug}`} target="_blank" title="View public" style={iconBtn}><ExternalLink size={14} /></Link>
                  <Link href={`/admin/yachts/${y.slug}/edit`} title="Edit" style={iconBtn}><Pencil size={14} /></Link>
                  <button onClick={() => onDelete(y.slug, y.name)} disabled={pending} title="Delete" style={{ ...iconBtn, cursor: pending ? 'wait' : 'pointer', color: '#e88' }}>
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th = { textAlign: 'left', padding: '14px 16px', fontWeight: 400 };
const td = { padding: '14px 16px', color: colors.text };
const iconBtn = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  width: 32, height: 32, marginLeft: 6, color: colors.textMuted,
  border: `1px solid ${colors.border}`, background: 'transparent',
};
