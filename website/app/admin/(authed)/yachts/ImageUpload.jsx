'use client';

import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { colors, fontSans } from '../../../../lib/theme';
import { getSupabaseBrowserClient } from '../../../../lib/supabase/browser';
import { slugify } from '../../../../lib/slug';

// Uploads a single file to the yacht-images bucket and returns its public URL.
async function uploadOne(file, folder) {
  const supabase = getSupabaseBrowserClient();
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = `${folder}/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, '')) || 'image'}.${ext}`;
  const { error } = await supabase.storage
    .from('yacht-images')
    .upload(path, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from('yacht-images').getPublicUrl(path);
  return data.publicUrl;
}

export function MainImageUpload({ name = 'image_url', initial, folder = 'yachts' }) {
  const [url, setUrl] = useState(initial ?? '');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const inputRef = useRef(null);

  async function onPick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setErr(null);
    try {
      const u = await uploadOne(file, folder);
      setUrl(u);
    } catch (e) { setErr(e.message); }
    setBusy(false);
  }

  return (
    <div>
      <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.25em', color: colors.textDim, textTransform: 'uppercase', marginBottom: 10 }}>
        Main image
      </div>
      <input type="hidden" name={name} value={url} />
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {url ? (
          <div style={{ position: 'relative' }}>
            <img src={url} alt="" style={{ width: 160, height: 110, objectFit: 'cover', display: 'block', border: `1px solid ${colors.border}` }} />
            <button type="button" onClick={() => setUrl('')} style={{
              position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.8)',
              border: 'none', color: colors.text, padding: 4, cursor: 'pointer', display: 'flex',
            }} aria-label="Remove"><X size={14} /></button>
          </div>
        ) : (
          <div style={{ width: 160, height: 110, background: colors.surface, border: `1px dashed ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fontSans, fontSize: 11, color: colors.textDim, letterSpacing: '0.1em' }}>
            No image
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button type="button" onClick={() => inputRef.current?.click()} disabled={busy} style={{
            background: 'transparent', color: colors.text, border: `1px solid ${colors.accent}`,
            padding: '10px 16px', fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em',
            textTransform: 'uppercase', cursor: busy ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <Upload size={12} /> {busy ? 'Uploading…' : (url ? 'Replace' : 'Upload')}
          </button>
          <input
            ref={inputRef} type="file" accept="image/*"
            onChange={onPick} style={{ display: 'none' }}
          />
          <div style={{ fontFamily: fontSans, fontSize: 11, color: colors.textDim }}>
            JPG / PNG / WebP, ≤10MB
          </div>
        </div>
      </div>
      {err && <div style={{ marginTop: 8, fontFamily: fontSans, fontSize: 12, color: '#f99' }}>{err}</div>}
    </div>
  );
}

export function GalleryUpload({ name = 'gallery', initial = [], folder = 'yachts' }) {
  const [items, setItems] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const inputRef = useRef(null);

  async function onPick(e) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setBusy(true); setErr(null);
    try {
      const uploaded = [];
      for (const f of files) uploaded.push(await uploadOne(f, folder));
      setItems((prev) => [...prev, ...uploaded]);
    } catch (e) { setErr(e.message); }
    setBusy(false);
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div>
      <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.25em', color: colors.textDim, textTransform: 'uppercase', marginBottom: 10 }}>
        Gallery
      </div>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8, marginBottom: 12 }}>
        {items.map((u, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <img src={u} alt="" style={{ width: '100%', height: 80, objectFit: 'cover', display: 'block', border: `1px solid ${colors.border}` }} />
            <button type="button" onClick={() => setItems(items.filter((_, j) => j !== i))} style={{
              position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.8)',
              border: 'none', color: colors.text, padding: 4, cursor: 'pointer', display: 'flex',
            }} aria-label="Remove"><X size={12} /></button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => inputRef.current?.click()} disabled={busy} style={{
        background: 'transparent', color: colors.text, border: `1px solid ${colors.border}`,
        padding: '10px 16px', fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em',
        textTransform: 'uppercase', cursor: busy ? 'wait' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
      }}>
        <Upload size={12} /> {busy ? 'Uploading…' : 'Add images'}
      </button>
      <input ref={inputRef} type="file" accept="image/*" multiple onChange={onPick} style={{ display: 'none' }} />
      {err && <div style={{ marginTop: 8, fontFamily: fontSans, fontSize: 12, color: '#f99' }}>{err}</div>}
    </div>
  );
}
