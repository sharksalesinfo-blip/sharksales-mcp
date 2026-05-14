'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { colors, fontSerif, fontSans } from '../../../../lib/theme';
import { MainImageUpload, GalleryUpload } from './ImageUpload';

const STATUSES = [
  { v: 'available', l: 'Available' },
  { v: 'sale_pending', l: 'Sale pending' },
  { v: 'sold', l: 'Sold' },
  { v: 'draft', l: 'Draft (hidden)' },
];
const CURRENCIES = ['USD', 'EUR', 'GBP', 'HKD', 'SGD', 'AUD'];

const inputStyle = {
  background: colors.surface, border: `1px solid ${colors.border}`,
  color: colors.text, padding: '12px 14px', fontFamily: fontSans, fontSize: 14,
  width: '100%', boxSizing: 'border-box',
};
const labelStyle = {
  fontFamily: fontSans, fontSize: 10, letterSpacing: '0.25em',
  color: colors.textDim, textTransform: 'uppercase', marginBottom: 8, display: 'block',
};

function Field({ label, name, type = 'text', defaultValue, required, error, step, placeholder }) {
  return (
    <div>
      <label style={labelStyle}>{label}{required && ' *'}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? ''}
        required={required}
        step={step}
        placeholder={placeholder}
        style={inputStyle}
      />
      {error && <div style={{ color: '#f99', fontFamily: fontSans, fontSize: 12, marginTop: 6 }}>{error}</div>}
    </div>
  );
}

export default function YachtForm({ action, initial, submitLabel = 'Save' }) {
  const [state, formAction, pending] = useActionState(action, { errors: {} });
  const errors = state?.errors ?? {};

  return (
    <form action={formAction}>
      {errors._form && (
        <div style={{
          background: 'rgba(255, 80, 80, 0.08)', border: '1px solid #c44',
          padding: 14, marginBottom: 20, fontFamily: fontSans, fontSize: 13, color: '#f99',
        }}>{errors._form}</div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
        <Field label="Name" name="name" required defaultValue={initial?.name} error={errors.name} placeholder="Gypsea" />
        <Field label="Slug (URL)" name="slug" defaultValue={initial?.slug} error={errors.slug} placeholder="auto from name" />
        <Field label="Builder" name="builder" defaultValue={initial?.builder} placeholder="Lagoon" />
        <Field label="Type" name="type" defaultValue={initial?.type} placeholder="Catamaran" />
        <Field label="Year" name="year" type="number" defaultValue={initial?.year} placeholder="2018" />
        <Field label="LOA (ft)" name="loa" type="number" step="0.1" defaultValue={initial?.loa} />
        <Field label="Beam (ft)" name="beam" type="number" step="0.1" defaultValue={initial?.beam} />
        <Field label="Cabins" name="cabins" type="number" defaultValue={initial?.cabins} />
        <Field label="Price" name="price" type="number" defaultValue={initial?.price} />
        <div>
          <label style={labelStyle}>Currency</label>
          <select name="currency" defaultValue={initial?.currency ?? 'USD'} style={inputStyle}>
            {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <Field label="Location" name="location" defaultValue={initial?.location} placeholder="Hong Kong" />
        <div>
          <label style={labelStyle}>Status</label>
          <select name="listing_status" defaultValue={initial?.listingStatus ?? 'available'} style={inputStyle}>
            {STATUSES.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}
          </select>
        </div>
        <Field label="Display order" name="display_order" type="number" defaultValue={initial?.display_order ?? 0} />
      </div>

      <div style={{ marginTop: 24 }}>
        <label style={labelStyle}>Description</label>
        <textarea
          name="description"
          rows={6}
          defaultValue={initial?.description ?? ''}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="Recent survey, refit history, included equipment…"
        />
      </div>

      <div style={{ marginTop: 32, paddingTop: 32, borderTop: `1px solid ${colors.border}`, display: 'grid', gap: 32 }}>
        <MainImageUpload initial={initial?.image} folder={initial?.slug ? `yachts/${initial.slug}` : 'yachts'} />
        <GalleryUpload initial={initial?.gallery ?? []} folder={initial?.slug ? `yachts/${initial.slug}` : 'yachts'} />
      </div>

      <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button
          type="submit"
          disabled={pending}
          style={{
            background: colors.accent, color: colors.bg, border: 'none',
            padding: '16px 32px', fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em',
            textTransform: 'uppercase', cursor: pending ? 'wait' : 'pointer',
            opacity: pending ? 0.6 : 1,
          }}
        >
          {pending ? 'Saving…' : submitLabel}
        </button>
        <Link href="/admin/yachts" style={{
          color: colors.textMuted, border: `1px solid ${colors.border}`,
          padding: '16px 32px', fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>Cancel</Link>
      </div>
    </form>
  );
}
