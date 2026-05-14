'use client';

import { useMemo, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { colors, fontSans } from '../../lib/theme';
import YachtCard from '../../components/YachtCard';

export default function YachtsBrowser({ yachts }) {
  const [type, setType] = useState('All');
  const [minLen, setMinLen] = useState(0);
  const [maxLen, setMaxLen] = useState(100);
  const [minYear, setMinYear] = useState(2000);
  const [maxPrice, setMaxPrice] = useState(3000000);
  const [sort, setSort] = useState('newest');

  const types = ['All', ...Array.from(new Set(yachts.map((y) => y.type)))];

  const filtered = useMemo(() => {
    let list = yachts.filter((y) =>
      (type === 'All' || y.type === type) &&
      y.loa >= minLen && y.loa <= maxLen &&
      y.year >= minYear &&
      y.price <= maxPrice
    );
    if (sort === 'newest') list = [...list].sort((a, b) => b.year - a.year);
    if (sort === 'priceAsc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'priceDesc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'lengthDesc') list = [...list].sort((a, b) => b.loa - a.loa);
    return list;
  }, [yachts, type, minLen, maxLen, minYear, maxPrice, sort]);

  const filterLabel = { fontFamily: fontSans, fontSize: 10, letterSpacing: '0.25em', color: colors.textDim, textTransform: 'uppercase', marginBottom: 12, display: 'block' };
  const inputStyle = { background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text, padding: '10px 14px', fontFamily: fontSans, fontSize: 13, width: '100%', boxSizing: 'border-box' };

  return (
    <section style={{ padding: '0 0 96px' }}>
      <div className="container split-filter">
        <aside style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, paddingBottom: 16, borderBottom: `1px solid ${colors.border}` }}>
            <SlidersHorizontal size={14} color={colors.accent} />
            <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.text, textTransform: 'uppercase' }}>Refine</div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={filterLabel}>Type</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {types.map((t) => (
                <button key={t} onClick={() => setType(t)} style={{
                  background: 'none', border: 'none', textAlign: 'left',
                  color: type === t ? colors.accent : colors.textMuted,
                  fontFamily: fontSans, fontSize: 13, padding: '6px 0', cursor: 'pointer',
                  borderLeft: `2px solid ${type === t ? colors.accent : 'transparent'}`,
                  paddingLeft: 12,
                }}>{t}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={filterLabel}>Length (ft) — {minLen} to {maxLen}</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="number" value={minLen} onChange={(e) => setMinLen(+e.target.value)} style={inputStyle} placeholder="Min" />
              <input type="number" value={maxLen} onChange={(e) => setMaxLen(+e.target.value)} style={inputStyle} placeholder="Max" />
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={filterLabel}>Year from</label>
            <input type="number" value={minYear} onChange={(e) => setMinYear(+e.target.value)} style={inputStyle} />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={filterLabel}>Max price — {maxPrice.toLocaleString()}</label>
            <input type="range" min="100000" max="3000000" step="50000" value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} style={{ width: '100%', accentColor: colors.accent }} />
          </div>

          <button onClick={() => { setType('All'); setMinLen(0); setMaxLen(100); setMinYear(2000); setMaxPrice(3000000); }} style={{
            background: 'transparent', color: colors.textMuted, border: `1px solid ${colors.border}`,
            padding: '12px 20px', fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em',
            textTransform: 'uppercase', cursor: 'pointer', width: '100%',
          }}>Reset filters</button>
        </aside>

        <main>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, paddingBottom: 16, borderBottom: `1px solid ${colors.border}`, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ fontFamily: fontSans, fontSize: 13, color: colors.textMuted }}>
              <span style={{ color: colors.accent, fontSize: 15 }}>{filtered.length}</span> yachts available
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ ...inputStyle, width: 'auto', cursor: 'pointer' }}>
              <option value="newest">Newest first</option>
              <option value="priceAsc">Price: low to high</option>
              <option value="priceDesc">Price: high to low</option>
              <option value="lengthDesc">Length: longest first</option>
            </select>
          </div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: colors.textMuted, fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontStyle: 'italic' }}>
              No yachts match these criteria. Try widening the search.
            </div>
          ) : (
            <div className="grid-2">
              {filtered.map((y) => <YachtCard key={y.slug} yacht={y} />)}
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
