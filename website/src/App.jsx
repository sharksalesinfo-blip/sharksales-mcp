import React, { useState, useMemo } from 'react';
import { ChevronRight, MapPin, Phone, Mail, Instagram, Facebook, Linkedin, Search, SlidersHorizontal, ArrowRight, ArrowUpRight, Anchor, Ruler, Users, Calendar, Gauge, Sailboat, X, Menu } from 'lucide-react';

// ============ DATA ============
// Unsplash photo IDs — direct CDN URLs die altijd laden zonder CORS issues.
// Helper bouwt de gewenste resolutie automatisch.
const u = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=85&auto=format&fit=crop`;

const IMG = {
  // Hero & overzichtsbeelden
  heroSeawind:     u('1567899378494-47b22a2ae96a', 2400), // catamaran van bovenaf
  superyacht:      u('1605281317010-fe5ffe798166', 1800), // motoryacht
  preOwned:        u('1569949381669-ecf31ae8e613', 1600), // sailing yacht
  charter:         u('1473445730015-841f29a9490b', 1600), // sailing zonsondergang
  cruise:          u('1542736667-069246bdbc6d', 1600),    // boot op water

  // Used yacht listings
  gypsea:          u('1540946485063-a4d3d1e0e3ce', 1200), // catamaran tropisch
  silverlining:    u('1569949381669-ecf31ae8e613', 1200),
  onyx:            u('1500627964684-141351970a7f', 1200), // sailing performance
  swish:           u('1540946485063-a4d3d1e0e3ce', 1200),
  bali:            u('1567899378494-47b22a2ae96a', 1200),
  windrush:        u('1473445730015-841f29a9490b', 1200),
  juggerknot:      u('1542736667-069246bdbc6d', 1200),
  swan82:          u('1605281317010-fe5ffe798166', 1200),
  dufour:          u('1502780402662-acc01917738e', 1200),

  // Brand models
  seawind1170:     u('1599582909646-2ee21c0b5b2c', 1400),
  sw1160:          u('1567899378494-47b22a2ae96a', 1400),
  grandSoleil:     u('1542856391-010fb87dcfed', 1400),
};

const NEW_BRANDS = [
  {
    id: 'seawind',
    name: 'Seawind Catamarans',
    tagline: 'Performance cruising catamarans built for serious sailors',
    hero: IMG.heroSeawind,
    logo: 'SEAWIND',
    origin: 'Vietnam',
    since: '1982',
    description: 'Seawind catamarans are designed for ocean-crossing capability with the comfort and sailing performance that experienced cruisers demand. Each hull is hand-built in Ho Chi Minh City under the supervision of Australian engineers.',
    models: [
      { id: 'sw-1170', name: 'Seawind 1170', loa: '38\'5"', beam: '21\'6"', cabins: 3, image: IMG.seawind1170, priceFrom: 'USD 520,000', status: 'In production' },
      { id: 'sw-1260', name: 'Seawind 1260', loa: '41\'4"', beam: '23\'0"', cabins: 4, image: IMG.sw1160, priceFrom: 'USD 680,000', status: 'Available 2026' },
      { id: 'sw-1370', name: 'Seawind 1370', loa: '44\'9"', beam: '24\'8"', cabins: 4, image: IMG.windrush, priceFrom: 'USD 950,000', status: 'Flagship' },
    ]
  },
  {
    id: 'kingship',
    name: 'Kingship Marine',
    tagline: 'Custom long-range motor yachts engineered in Asia',
    hero: IMG.superyacht,
    logo: 'KINGSHIP',
    origin: 'China',
    since: '2002',
    description: 'Kingship build semi-displacement and full-displacement motor yachts from 24 to 50 metres. The shipyard is renowned for owner-led customisation and Northern European build standards delivered at competitive Asian pricing.',
    models: [
      { id: 'ks-90', name: 'Kingship 90 Explorer', loa: '90\'', beam: '22\'', cabins: 4, image: IMG.superyacht, priceFrom: 'On request', status: 'Custom build' },
    ]
  },
  {
    id: 'aquabolt',
    name: 'Aquabolt',
    tagline: 'Electric tenders & dayboats — silent, clean, instant',
    hero: IMG.cruise,
    logo: 'AQUABOLT',
    origin: 'Hong Kong',
    since: '2021',
    description: 'Aquabolt builds fully-electric tenders and dayboats for the Asia-Pacific market. Zero emissions, near-silent operation and instant torque make them the next-generation choice for marinas and private estates.',
    models: [
      { id: 'ab-23', name: 'Aquabolt 23', loa: '23\'', beam: '8\'2"', cabins: 0, image: IMG.cruise, priceFrom: 'USD 145,000', status: 'In stock' },
    ]
  },
  {
    id: 'contest',
    name: 'Contest Yachts',
    tagline: 'Dutch-built bluewater sailing yachts since 1959',
    hero: IMG.swan82,
    logo: 'CONTEST',
    origin: 'Netherlands',
    since: '1959',
    description: 'Contest Yachts has built more than 800 ocean-capable yachts from its yard in Medemblik. The combination of conduction-bonded composite construction and tailored interior design has made Contest the choice of discerning long-distance cruisers.',
    models: [
      { id: 'ct-49', name: 'Contest 49CS', loa: '49\'', beam: '14\'9"', cabins: 3, image: IMG.silverlining, priceFrom: 'EUR 1,250,000', status: 'Build slot 2027' },
      { id: 'ct-55', name: 'Contest 55CS', loa: '55\'', beam: '16\'1"', cabins: 3, image: IMG.grandSoleil, priceFrom: 'EUR 1,890,000', status: 'Build slot 2027' },
    ]
  },
];

const USED_YACHTS = [
  { id: 'gypsea', name: 'Gypsea', builder: 'Lagoon', type: 'Catamaran', year: 2012, loa: 52, beam: 15, cabins: 3, price: 390000, currency: 'USD', location: 'Hong Kong', image: IMG.gypsea },
  { id: 'silverlining', name: 'Silverlining', builder: 'Oyster', type: 'Sailing Yacht', year: 2015, loa: 62, beam: 17, cabins: 4, price: 1450000, currency: 'USD', location: 'Phuket', image: IMG.silverlining },
  { id: 'onyx', name: 'Onyx II', builder: 'X-Yachts', type: 'Sailing Yacht', year: 2021, loa: 43, beam: 13, cabins: 3, price: 720000, currency: 'EUR', location: 'Hong Kong', image: IMG.onyx },
  { id: 'swish', name: 'Swish', builder: 'J/Boats', type: 'Performance', year: 2018, loa: 42, beam: 12, cabins: 2, price: 385000, currency: 'USD', location: 'Subic Bay', image: IMG.swish },
  { id: 'catspace', name: 'Catspace', builder: 'Bali', type: 'Catamaran', year: 2020, loa: 40, beam: 22, cabins: 4, price: 525000, currency: 'USD', location: 'Hong Kong', image: IMG.bali },
  { id: 'windrush', name: 'Windrush', builder: 'Seawind', type: 'Catamaran', year: 2013, loa: 38, beam: 21, cabins: 3, price: 295000, currency: 'USD', location: 'Hong Kong', image: IMG.windrush },
  { id: 'juggerknot', name: 'Juggerknot', builder: 'J/Boats', type: 'Performance', year: 2016, loa: 36, beam: 11, cabins: 2, price: 245000, currency: 'USD', location: 'Hong Kong', image: IMG.juggerknot },
  { id: 'kallima', name: 'Kallima', builder: 'Swan', type: 'Sailing Yacht', year: 2002, loa: 82, beam: 19, cabins: 3, price: 2750000, currency: 'EUR', location: 'West Med', image: IMG.swan82 },
  { id: 'dufour41', name: 'Sea Whisper', builder: 'Dufour', type: 'Sailing Yacht', year: 2023, loa: 41, beam: 13, cabins: 3, price: 415000, currency: 'EUR', location: 'Singapore', image: IMG.dufour },
];

// ============ STYLES ============
const colors = {
  bg: '#0a0e14',
  bgAlt: '#11161e',
  surface: '#161c26',
  border: '#222a36',
  text: '#f5f3ef',
  textMuted: '#9ba3b0',
  textDim: '#6b7280',
  accent: '#d4b88a', // brushed gold
  accentDark: '#a8916b',
};

const fontSerif = '"Cormorant Garamond", "Playfair Display", Georgia, serif';
const fontSans = '"Inter", "Helvetica Neue", system-ui, sans-serif';

// ============ NAV ============
function Nav({ page, setPage, setBrand, setYacht }) {
  const [open, setOpen] = useState(false);
  const go = (p) => { setPage(p); setOpen(false); window.scrollTo(0,0); };
  const navItem = (label, target) => (
    <button
      onClick={() => go(target)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: page === target ? colors.accent : colors.text,
        fontFamily: fontSans, fontSize: 12, letterSpacing: '0.18em',
        textTransform: 'uppercase', padding: '8px 0', fontWeight: 400,
        transition: 'color 0.2s',
      }}
    >{label}</button>
  );
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(10, 14, 20, 0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${colors.border}`,
      padding: '20px 0',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => go('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
          <div style={{ fontFamily: fontSerif, fontSize: 'clamp(18px, 3vw, 22px)', color: colors.text, letterSpacing: '0.02em', fontWeight: 400 }}>
            Asia Yacht <span style={{ fontStyle: 'italic', color: colors.accent }}>Services</span>
          </div>
          <div style={{ fontFamily: fontSans, fontSize: 9, color: colors.textDim, letterSpacing: '0.3em', marginTop: 2 }}>HONG KONG · SINCE 2004</div>
        </button>

        {/* Desktop nav */}
        <div className="nav-desktop">
          {navItem('Home', 'home')}
          {navItem('New Yachts', 'new')}
          {navItem('Pre-Owned', 'used')}
          {navItem('Charters', 'home')}
          {navItem('Contact', 'contact')}
          <button
            onClick={() => go('contact')}
            style={{
              background: 'transparent', color: colors.accent,
              border: `1px solid ${colors.accent}`, padding: '10px 22px',
              fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em',
              textTransform: 'uppercase', cursor: 'pointer',
            }}
          >Enquire</button>
        </div>

        {/* Mobile toggle */}
        <button className="nav-mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: colors.bg, borderTop: `1px solid ${colors.border}`,
          borderBottom: `1px solid ${colors.border}`,
          padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {[['Home','home'],['New Yachts','new'],['Pre-Owned','used'],['Charters','home'],['Contact','contact']].map(([label, t]) => (
            <button key={label} onClick={() => go(t)} style={{
              background: 'none', border: 'none', textAlign: 'left',
              color: page === t ? colors.accent : colors.text,
              fontFamily: fontSans, fontSize: 14, letterSpacing: '0.18em',
              textTransform: 'uppercase', padding: '14px 0', cursor: 'pointer',
              borderBottom: `1px solid ${colors.border}`,
            }}>{label}</button>
          ))}
          <button onClick={() => go('contact')} style={{
            background: colors.accent, color: colors.bg, border: 'none',
            padding: '14px 0', fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em',
            textTransform: 'uppercase', cursor: 'pointer', marginTop: 16,
          }}>Enquire</button>
        </div>
      )}
    </nav>
  );
}

// ============ FOOTER ============
function Footer({ setPage }) {
  return (
    <footer style={{ background: colors.bgAlt, borderTop: `1px solid ${colors.border}`, padding: '64px 0 32px', color: colors.textMuted }}>
      <div className="container footer-grid">
        <div>
          <div style={{ fontFamily: fontSerif, fontSize: 26, color: colors.text, marginBottom: 16 }}>
            Asia Yacht <span style={{ fontStyle: 'italic', color: colors.accent }}>Services</span>
          </div>
          <p style={{ fontFamily: fontSans, fontSize: 13, lineHeight: 1.7, maxWidth: 360 }}>
            Yacht professionals since 2004. Exclusive dealer for premium brands across the Asia-Pacific region. From bluewater cruisers to bespoke superyachts.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <div key={i} style={{ width: 36, height: 36, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Icon size={14} color={colors.textMuted} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.text, marginBottom: 20 }}>Explore</div>
          {['Home', 'New Yachts', 'Pre-Owned', 'Contact'].map((l, i) => {
            const targets = ['home', 'new', 'used', 'contact'];
            return (
              <div key={l} onClick={() => { setPage(targets[i]); window.scrollTo(0,0); }} style={{ fontFamily: fontSans, fontSize: 13, padding: '6px 0', cursor: 'pointer' }}>{l}</div>
            );
          })}
        </div>
        <div>
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.text, marginBottom: 20 }}>Brands</div>
          {NEW_BRANDS.map(b => (
            <div key={b.id} style={{ fontFamily: fontSans, fontSize: 13, padding: '6px 0' }}>{b.name}</div>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.text, marginBottom: 20 }}>Contact</div>
          <div style={{ fontFamily: fontSans, fontSize: 13, lineHeight: 1.8 }}>
            21F, Hing Yip Commercial Centre<br />
            272-284 Des Voeux Road Central<br />
            Hong Kong SAR<br /><br />
            <span style={{ color: colors.accent }}>+852 9304 6341</span><br />
            hello@asiayachtservices.com
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontFamily: fontSans, fontSize: 11, color: colors.textDim, letterSpacing: '0.1em' }}>
        <div>© 2026 Asia Yacht Services Ltd. All rights reserved.</div>
        <div>Privacy · Terms · Cookies</div>
      </div>
    </footer>
  );
}

// ============ HOME ============
function Home({ setPage, setBrand, setYachtId }) {
  return (
    <div>
      {/* HERO */}
      <section style={{ position: 'relative', height: '88vh', minHeight: 540, maxHeight: 900, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${IMG.heroSeawind})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,14,20,0.4) 0%, rgba(10,14,20,0.2) 50%, rgba(10,14,20,0.85) 100%)' }} />
        <div className="container hero-pad" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.4em', color: colors.accent, marginBottom: 24, textTransform: 'uppercase' }}>
            Yacht professionals · Asia Pacific
          </div>
          <h1 className="hero-h1" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0, maxWidth: 900, letterSpacing: '-0.02em' }}>
            The art of <span style={{ fontStyle: 'italic', color: colors.accent }}>blue water</span><br />ownership.
          </h1>
          <p style={{ fontFamily: fontSans, fontSize: 'clamp(15px, 2vw, 17px)', color: colors.textMuted, lineHeight: 1.6, maxWidth: 540, marginTop: 32, fontWeight: 300 }}>
            Two decades representing the world's most considered yacht builders across Hong Kong, Thailand and the Asia-Pacific.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap' }}>
            <button onClick={() => { setPage('new'); window.scrollTo(0,0); }} style={{ background: colors.accent, color: colors.bg, border: 'none', padding: '16px 32px', fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
              Discover new yachts <ArrowRight size={14} />
            </button>
            <button onClick={() => { setPage('used'); window.scrollTo(0,0); }} style={{ background: 'transparent', color: colors.text, border: `1px solid ${colors.text}`, padding: '16px 32px', fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Browse brokerage
            </button>
          </div>
        </div>
      </section>

      {/* INTRO STATS */}
      <section className="section-pad" style={{ background: colors.bg, borderBottom: `1px solid ${colors.border}` }}>
        <div className="container split">
          <div>
            <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 24 }}>
              — The house
            </div>
            <h2 className="section-h2" style={{ fontFamily: fontSerif, lineHeight: 1.1, color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.01em' }}>
              Deliver excellence,<br /><span style={{ fontStyle: 'italic', color: colors.accent }}>anywhere in Asia.</span>
            </h2>
          </div>
          <div>
            <p style={{ fontFamily: fontSans, fontSize: 'clamp(14px, 1.8vw, 16px)', lineHeight: 1.8, color: colors.textMuted, fontWeight: 300 }}>
              Our pedigree brand selection reflects a passion for inshore and offshore sailing. A sailing yacht, first and foremost, should perform — sensitive to sail trim, seaworthy, a platform to enjoy with friends and family. From small one-design racers to serious offshore cruisers and bespoke superyachts, our expertise covers the full spectrum.
            </p>
            <div className="stat-grid" style={{ marginTop: 48 }}>
              {[
                { n: '20+', l: 'Years in market' },
                { n: '4', l: 'Exclusive brands' },
                { n: '300+', l: 'Yachts sold' },
                { n: '30+', l: 'Charter fleet' },
              ].map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily: fontSerif, fontSize: 'clamp(32px, 4vw, 44px)', color: colors.accent, fontWeight: 300, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.15em', color: colors.textDim, textTransform: 'uppercase', marginTop: 8 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BRAND SHOWCASE */}
      <section className="section-pad" style={{ background: colors.bgAlt }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, gap: 24, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>— Our brands</div>
              <h2 className="section-h2" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.01em' }}>
                Exclusively <span style={{ fontStyle: 'italic', color: colors.accent }}>represented.</span>
              </h2>
            </div>
            <button onClick={() => { setPage('new'); window.scrollTo(0,0); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.text, fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}>
              All brands <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid-2">
            {NEW_BRANDS.map(b => (
              <div key={b.id} onClick={() => { setBrand(b.id); setPage('brand'); window.scrollTo(0,0); }}
                style={{ position: 'relative', height: 'clamp(320px, 50vw, 420px)', overflow: 'hidden', cursor: 'pointer', background: colors.surface }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${b.hero})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.6s' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,14,20,0.1) 30%, rgba(10,14,20,0.9) 100%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(20px, 4vw, 32px)' }}>
                  <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.4em', color: colors.accent, textTransform: 'uppercase', marginBottom: 12 }}>{b.origin} · Since {b.since}</div>
                  <div style={{ fontFamily: fontSerif, fontSize: 'clamp(24px, 4vw, 34px)', color: colors.text, fontWeight: 400, letterSpacing: '0.02em' }}>{b.name}</div>
                  <div style={{ fontFamily: fontSans, fontSize: 'clamp(13px, 1.6vw, 14px)', color: colors.textMuted, marginTop: 8, fontWeight: 300 }}>{b.tagline}</div>
                  <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em', color: colors.accent, textTransform: 'uppercase', marginTop: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                    Discover the range <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="section-pad" style={{ background: colors.bg }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, gap: 24, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>— Featured brokerage</div>
              <h2 className="section-h2" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0 }}>
                Curated <span style={{ fontStyle: 'italic', color: colors.accent }}>listings.</span>
              </h2>
            </div>
            <button onClick={() => { setPage('used'); window.scrollTo(0,0); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.text, fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 }}>
              All pre-owned <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid-3">
            {USED_YACHTS.slice(0,3).map(y => <YachtCard key={y.id} y={y} onClick={() => { setYachtId(y.id); setPage('yacht'); window.scrollTo(0,0); }} />)}
          </div>
        </div>
      </section>

      {/* SERVICES BLOCK */}
      <section className="section-pad" style={{ background: colors.bgAlt, borderTop: `1px solid ${colors.border}` }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>— Beyond the sale</div>
            <h2 className="section-h2" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0 }}>
              A complete <span style={{ fontStyle: 'italic', color: colors.accent }}>yacht ecosystem.</span>
            </h2>
          </div>
          <div className="services-grid">
            {[
              { t: 'Brokerage', d: 'Selling a yacht is a niche craft. Our brokerage team has placed vessels with owners across four continents.' },
              { t: 'Ownership Management', d: 'Comprehensive yacht management — insurance, refits, crew, concierge. We handle every aspect of running your yacht.' },
              { t: 'Marketing Services', d: 'A complete marketing ecosystem designed for the yacht industry in Asia. Brand identity through to digital advertising.' },
            ].map((s, i) => (
              <div key={s.t} style={{ padding: 'clamp(32px, 4vw, 48px) clamp(24px, 3vw, 40px)' }}>
                <div style={{ fontFamily: fontSerif, fontSize: 'clamp(40px, 6vw, 56px)', color: colors.accent, fontWeight: 300, lineHeight: 1, marginBottom: 24 }}>0{i+1}</div>
                <div style={{ fontFamily: fontSerif, fontSize: 'clamp(22px, 3vw, 26px)', color: colors.text, fontWeight: 400, marginBottom: 16 }}>{s.t}</div>
                <p style={{ fontFamily: fontSans, fontSize: 14, color: colors.textMuted, lineHeight: 1.8, fontWeight: 300 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ============ YACHT CARD ============
function YachtCard({ y, onClick }) {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer', background: colors.surface, transition: 'transform 0.3s' }}>
      <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${y.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(10,14,20,0.85)', color: colors.accent, padding: '6px 12px', fontFamily: fontSans, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          {y.type}
        </div>
      </div>
      <div style={{ padding: '24px 24px 28px' }}>
        <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.3em', color: colors.textDim, textTransform: 'uppercase', marginBottom: 8 }}>{y.builder} · {y.year}</div>
        <div style={{ fontFamily: fontSerif, fontSize: 26, color: colors.text, fontWeight: 400, marginBottom: 16 }}>{y.name}</div>
        <div style={{ display: 'flex', gap: 20, fontFamily: fontSans, fontSize: 12, color: colors.textMuted, marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${colors.border}` }}>
          <div><Ruler size={12} style={{ verticalAlign: -1, marginRight: 4 }} /> {y.loa}ft</div>
          <div><Users size={12} style={{ verticalAlign: -1, marginRight: 4 }} /> {y.cabins} cabins</div>
          <div><MapPin size={12} style={{ verticalAlign: -1, marginRight: 4 }} /> {y.location}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Asking</div>
            <div style={{ fontFamily: fontSerif, fontSize: 22, color: colors.accent, fontWeight: 400 }}>{y.currency} {y.price.toLocaleString()}</div>
          </div>
          <ArrowUpRight size={20} color={colors.text} />
        </div>
      </div>
    </div>
  );
}

// ============ NEW YACHTS OVERVIEW ============
function NewYachts({ setPage, setBrand }) {
  return (
    <div style={{ background: colors.bg, minHeight: '100vh' }}>
      <section className="section-pad-sm">
        <div className="container">
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>— Our brands</div>
          <h1 className="hero-h1-md" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.02em', maxWidth: 900 }}>
            New <span style={{ fontStyle: 'italic', color: colors.accent }}>yachts.</span>
          </h1>
          <p style={{ fontFamily: fontSans, fontSize: 'clamp(15px, 2vw, 17px)', color: colors.textMuted, lineHeight: 1.7, maxWidth: 700, marginTop: 32, fontWeight: 300 }}>
            Asia Yacht Services represents four exceptional builders across sail, motor and electric propulsion. Each yard hand-picked for craftsmanship, ocean credentials and a builder culture that matches the people who own them.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 96px' }}>
        <div className="container">
          {NEW_BRANDS.map((b, i) => (
            <div key={b.id}
              onClick={() => { setBrand(b.id); setPage('brand'); window.scrollTo(0,0); }}
              className={`split-brand ${i % 2 === 1 ? 'rev' : ''}`}
              style={{
                cursor: 'pointer',
                borderTop: `1px solid ${colors.border}`,
                borderBottom: i === NEW_BRANDS.length - 1 ? `1px solid ${colors.border}` : 'none',
              }}>
              <div style={{ order: i % 2 === 0 ? 1 : 2, position: 'relative', height: 'clamp(280px, 50vw, 480px)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${b.hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              </div>
              <div style={{ order: i % 2 === 0 ? 2 : 1, padding: 'clamp(40px, 6vw, 64px) clamp(24px, 4vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: colors.bgAlt }}>
                <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.4em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>
                  Brand 0{i+1} · {b.origin}
                </div>
                <h2 className="section-h2-lg" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.01em' }}>{b.name}</h2>
                <div style={{ fontFamily: fontSans, fontSize: 'clamp(14px, 2vw, 16px)', color: colors.accent, fontStyle: 'italic', marginTop: 12, fontWeight: 300 }}>{b.tagline}</div>
                <p style={{ fontFamily: fontSans, fontSize: 14, color: colors.textMuted, lineHeight: 1.8, marginTop: 24, fontWeight: 300 }}>{b.description}</p>
                <div style={{ display: 'flex', gap: 32, marginTop: 32, paddingTop: 24, borderTop: `1px solid ${colors.border}` }}>
                  <div>
                    <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Models</div>
                    <div style={{ fontFamily: fontSerif, fontSize: 28, color: colors.text, fontWeight: 300, marginTop: 4 }}>{b.models.length}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Heritage</div>
                    <div style={{ fontFamily: fontSerif, fontSize: 28, color: colors.text, fontWeight: 300, marginTop: 4 }}>Since {b.since}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 40, color: colors.accent, fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  Explore the range <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ============ BRAND PAGE (Seawind etc) ============
function BrandPage({ brandId, setPage, setModelId }) {
  const brand = NEW_BRANDS.find(b => b.id === brandId) || NEW_BRANDS[0];
  return (
    <div style={{ background: colors.bg }}>
      {/* Breadcrumb */}
      <div style={{ padding: '20px 0', borderBottom: `1px solid ${colors.border}`, background: colors.bgAlt }}>
        <div className="container" style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.textDim }}>
          <span onClick={() => { setPage('home'); window.scrollTo(0,0); }} style={{ cursor: 'pointer' }}>Home</span> / <span onClick={() => { setPage('new'); window.scrollTo(0,0); }} style={{ cursor: 'pointer' }}>New Yachts</span> / <span style={{ color: colors.accent }}>{brand.name}</span>
        </div>
      </div>

      {/* Brand hero */}
      <section style={{ position: 'relative', height: 'clamp(420px, 70vh, 700px)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${brand.hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,14,20,0.3) 0%, rgba(10,14,20,0.85) 100%)' }} />
        <div className="container hero-pad" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.4em', color: colors.accent, marginBottom: 24, textTransform: 'uppercase' }}>
            {brand.origin} · Built since {brand.since}
          </div>
          <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(48px, 9vw, 96px)', color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.03em', lineHeight: 1 }}>
            {brand.name}
          </h1>
          <p style={{ fontFamily: fontSerif, fontSize: 'clamp(18px, 2.5vw, 24px)', color: colors.accent, fontStyle: 'italic', marginTop: 24, fontWeight: 300, maxWidth: 700 }}>
            {brand.tagline}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-pad" style={{ background: colors.bg, borderBottom: `1px solid ${colors.border}` }}>
        <div className="container split">
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase' }}>
            — About the yard
          </div>
          <p style={{ fontFamily: fontSerif, fontSize: 'clamp(18px, 2.5vw, 22px)', color: colors.text, lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
            {brand.description}
          </p>
        </div>
      </section>

      {/* Models */}
      <section className="section-pad" style={{ background: colors.bgAlt }}>
        <div className="container">
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>— The range</div>
            <h2 className="section-h2-lg" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.01em' }}>
              The <span style={{ fontStyle: 'italic', color: colors.accent }}>{brand.name.split(' ')[0]}</span> fleet.
            </h2>
          </div>
          <div style={{ display: 'grid', gap: 32 }}>
            {brand.models.map((m, i) => (
              <div key={m.id}
                onClick={() => { setModelId(m.id); setPage('model'); window.scrollTo(0,0); }}
                className="split-model"
                style={{ cursor: 'pointer', background: colors.surface }}>
                <div style={{ height: 'clamp(280px, 45vw, 400px)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${m.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div style={{ position: 'absolute', top: 24, left: 24, background: colors.accent, color: colors.bg, padding: '6px 14px', fontFamily: fontSans, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    {m.status}
                  </div>
                </div>
                <div style={{ padding: 'clamp(28px, 4vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 12 }}>Model 0{i+1}</div>
                  <h3 className="model-h3" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 400, margin: 0, letterSpacing: '-0.01em' }}>{m.name}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 32, paddingTop: 32, borderTop: `1px solid ${colors.border}` }}>
                    <div>
                      <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.2em', textTransform: 'uppercase' }}>LOA</div>
                      <div style={{ fontFamily: fontSerif, fontSize: 'clamp(20px, 2.5vw, 24px)', color: colors.text, fontWeight: 300, marginTop: 4 }}>{m.loa}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Beam</div>
                      <div style={{ fontFamily: fontSerif, fontSize: 'clamp(20px, 2.5vw, 24px)', color: colors.text, fontWeight: 300, marginTop: 4 }}>{m.beam}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Cabins</div>
                      <div style={{ fontFamily: fontSerif, fontSize: 'clamp(20px, 2.5vw, 24px)', color: colors.text, fontWeight: 300, marginTop: 4 }}>{m.cabins || '—'}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                    <div>
                      <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.2em', textTransform: 'uppercase' }}>From</div>
                      <div style={{ fontFamily: fontSerif, fontSize: 22, color: colors.accent, fontWeight: 400, marginTop: 4 }}>{m.priceFrom}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: colors.text, fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                      Discover <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ============ MODEL DETAIL PAGE ============
function ModelDetail({ brandId, modelId, setPage }) {
  const brand = NEW_BRANDS.find(b => b.id === brandId) || NEW_BRANDS[0];
  const model = brand.models.find(m => m.id === modelId) || brand.models[0];
  return (
    <div style={{ background: colors.bg }}>
      <div style={{ padding: '20px 0', borderBottom: `1px solid ${colors.border}`, background: colors.bgAlt }}>
        <div className="container" style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.textDim }}>
          <span onClick={() => { setPage('new'); window.scrollTo(0,0); }} style={{ cursor: 'pointer' }}>New Yachts</span> / <span onClick={() => { setPage('brand'); window.scrollTo(0,0); }} style={{ cursor: 'pointer' }}>{brand.name}</span> / <span style={{ color: colors.accent }}>{model.name}</span>
        </div>
      </div>

      <section style={{ position: 'relative', height: 'clamp(440px, 78vh, 800px)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${model.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,14,20,0.2) 0%, rgba(10,14,20,0.4) 60%, rgba(10,14,20,0.95) 100%)' }} />
        <div className="container hero-pad" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 64 }}>
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.4em', color: colors.accent, textTransform: 'uppercase', marginBottom: 24 }}>
            {brand.name} · {model.status}
          </div>
          <h1 className="hero-h1-xl" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.03em', lineHeight: 1 }}>
            {model.name}
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 24, marginTop: 48 }}>
            {[
              { l: 'Length overall', v: model.loa },
              { l: 'Beam', v: model.beam },
              { l: 'Cabins', v: model.cabins || '—' },
              { l: 'Starting price', v: model.priceFrom },
            ].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{s.l}</div>
                <div style={{ fontFamily: fontSerif, fontSize: 'clamp(20px, 2.6vw, 28px)', color: colors.text, fontWeight: 300, marginTop: 6 }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: colors.bg, borderBottom: `1px solid ${colors.border}` }}>
        <div className="container split">
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase' }}>— Overview</div>
          <div>
            <p style={{ fontFamily: fontSerif, fontSize: 'clamp(18px, 2.5vw, 24px)', color: colors.text, lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
              The {model.name} represents the latest evolution of {brand.name.split(' ')[0]}'s design philosophy — performance, comfort and ocean credentials in equal measure. Designed for couples and families who intend to sail beyond the horizon.
            </p>
            <p style={{ fontFamily: fontSans, fontSize: 15, color: colors.textMuted, lineHeight: 1.8, fontWeight: 300, marginTop: 32 }}>
              Hand-built to ISO Category A ocean rating, with a hull form refined through CFD analysis and tank testing. The interior is configurable across owner's-version and charter layouts, with bespoke joinery options available throughout.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: colors.bgAlt }}>
        <div className="container">
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>— Specifications</div>
          <h2 className="section-h2" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0, marginBottom: 48 }}>
            Built for <span style={{ fontStyle: 'italic', color: colors.accent }}>passage.</span>
          </h2>
          <div className="specs-grid" style={{ borderTop: `1px solid ${colors.border}` }}>
            {[
              ['Length overall', model.loa],
              ['Length waterline', '38\'2"'],
              ['Beam', model.beam],
              ['Draft', '4\'7"'],
              ['Displacement', '17,200 lbs'],
              ['Sail area', '950 sq ft'],
              ['Engine', 'Twin Yanmar 45hp'],
              ['Fuel capacity', '160 gal'],
              ['Water capacity', '140 gal'],
              ['Cabins', model.cabins || '—'],
              ['Berths', model.cabins ? model.cabins * 2 : '—'],
              ['Heads', model.cabins ? Math.max(2, model.cabins - 1) : '—'],
            ].map(([k, v], i) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${colors.border}`, borderLeft: i % 2 === 1 ? `1px solid ${colors.border}` : 'none' }}>
                <div style={{ fontFamily: fontSans, fontSize: 13, color: colors.textMuted, fontWeight: 300 }}>{k}</div>
                <div style={{ fontFamily: fontSans, fontSize: 14, color: colors.text, fontWeight: 400 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: colors.bg, textAlign: 'center', borderTop: `1px solid ${colors.border}` }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>— Next step</div>
          <h2 className="section-h2" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0 }}>
            Request a <span style={{ fontStyle: 'italic', color: colors.accent }}>private viewing.</span>
          </h2>
          <p style={{ fontFamily: fontSans, fontSize: 15, color: colors.textMuted, lineHeight: 1.8, marginTop: 24, fontWeight: 300 }}>
            Our brokers in Hong Kong, Phuket and Singapore can arrange dockside inspection, sea trial or a virtual walk-through within 48 hours.
          </p>
          <button onClick={() => { setPage('contact'); window.scrollTo(0,0); }} style={{ background: colors.accent, color: colors.bg, border: 'none', padding: '16px 36px', fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', marginTop: 40 }}>
            Speak with a broker
          </button>
        </div>
      </section>
    </div>
  );
}

// ============ USED YACHTS LIST WITH FILTERS ============
function UsedYachts({ setPage, setYachtId }) {
  const [type, setType] = useState('All');
  const [minLen, setMinLen] = useState(0);
  const [maxLen, setMaxLen] = useState(100);
  const [minYear, setMinYear] = useState(2000);
  const [maxPrice, setMaxPrice] = useState(3000000);
  const [sort, setSort] = useState('newest');

  const types = ['All', ...Array.from(new Set(USED_YACHTS.map(y => y.type)))];

  const filtered = useMemo(() => {
    let list = USED_YACHTS.filter(y =>
      (type === 'All' || y.type === type) &&
      y.loa >= minLen && y.loa <= maxLen &&
      y.year >= minYear &&
      y.price <= maxPrice
    );
    if (sort === 'newest') list = list.sort((a,b) => b.year - a.year);
    if (sort === 'priceAsc') list = list.sort((a,b) => a.price - b.price);
    if (sort === 'priceDesc') list = list.sort((a,b) => b.price - a.price);
    if (sort === 'lengthDesc') list = list.sort((a,b) => b.loa - a.loa);
    return list;
  }, [type, minLen, maxLen, minYear, maxPrice, sort]);

  const filterLabel = { fontFamily: fontSans, fontSize: 10, letterSpacing: '0.25em', color: colors.textDim, textTransform: 'uppercase', marginBottom: 12, display: 'block' };
  const inputStyle = { background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text, padding: '10px 14px', fontFamily: fontSans, fontSize: 13, width: '100%', boxSizing: 'border-box' };

  return (
    <div style={{ background: colors.bg, minHeight: '100vh' }}>
      <section className="section-pad-sm">
        <div className="container">
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>— Brokerage</div>
          <h1 className="hero-h1-md" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.02em' }}>
            Pre-owned <span style={{ fontStyle: 'italic', color: colors.accent }}>yachts.</span>
          </h1>
          <p style={{ fontFamily: fontSans, fontSize: 'clamp(15px, 2vw, 17px)', color: colors.textMuted, lineHeight: 1.7, maxWidth: 700, marginTop: 24, fontWeight: 300 }}>
            A curated selection of vessels from our brokerage desk. Every yacht inspected, every history verified.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 96px' }}>
        <div className="container split-filter">
          {/* Filters */}
          <aside style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, paddingBottom: 16, borderBottom: `1px solid ${colors.border}` }}>
              <SlidersHorizontal size={14} color={colors.accent} />
              <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.text, textTransform: 'uppercase' }}>Refine</div>
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={filterLabel}>Type</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {types.map(t => (
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
                <input type="number" value={minLen} onChange={e => setMinLen(+e.target.value)} style={inputStyle} placeholder="Min" />
                <input type="number" value={maxLen} onChange={e => setMaxLen(+e.target.value)} style={inputStyle} placeholder="Max" />
              </div>
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={filterLabel}>Year from</label>
              <input type="number" value={minYear} onChange={e => setMinYear(+e.target.value)} style={inputStyle} />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={filterLabel}>Max price — {maxPrice.toLocaleString()}</label>
              <input type="range" min="100000" max="3000000" step="50000" value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} style={{ width: '100%', accentColor: colors.accent }} />
            </div>

            <button onClick={() => { setType('All'); setMinLen(0); setMaxLen(100); setMinYear(2000); setMaxPrice(3000000); }} style={{
              background: 'transparent', color: colors.textMuted, border: `1px solid ${colors.border}`,
              padding: '12px 20px', fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em',
              textTransform: 'uppercase', cursor: 'pointer', width: '100%',
            }}>Reset filters</button>
          </aside>

          {/* Results */}
          <main>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, paddingBottom: 16, borderBottom: `1px solid ${colors.border}`, flexWrap: 'wrap', gap: 12 }}>
              <div style={{ fontFamily: fontSans, fontSize: 13, color: colors.textMuted }}>
                <span style={{ color: colors.accent, fontSize: 15 }}>{filtered.length}</span> yachts available
              </div>
              <select value={sort} onChange={e => setSort(e.target.value)} style={{ ...inputStyle, width: 'auto', cursor: 'pointer' }}>
                <option value="newest">Newest first</option>
                <option value="priceAsc">Price: low to high</option>
                <option value="priceDesc">Price: high to low</option>
                <option value="lengthDesc">Length: longest first</option>
              </select>
            </div>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 20px', color: colors.textMuted, fontFamily: fontSerif, fontSize: 22, fontStyle: 'italic' }}>
                No yachts match these criteria. Try widening the search.
              </div>
            ) : (
              <div className="grid-2">
                {filtered.map(y => <YachtCard key={y.id} y={y} onClick={() => { setYachtId(y.id); setPage('yacht'); window.scrollTo(0,0); }} />)}
              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  );
}

// ============ YACHT DETAIL ============
function YachtDetail({ yachtId, setPage }) {
  const y = USED_YACHTS.find(x => x.id === yachtId) || USED_YACHTS[0];
  const [activeImg, setActiveImg] = useState(0);
  const gallery = [y.image, IMG.cruise, IMG.heroSeawind, IMG.swan82];

  return (
    <div style={{ background: colors.bg }}>
      <div style={{ padding: '20px 0', borderBottom: `1px solid ${colors.border}`, background: colors.bgAlt }}>
        <div className="container" style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.textDim }}>
          <span onClick={() => { setPage('used'); window.scrollTo(0,0); }} style={{ cursor: 'pointer' }}>Pre-Owned</span> / <span style={{ color: colors.accent }}>{y.name}</span>
        </div>
      </div>

      <section style={{ background: colors.bg, padding: 'clamp(28px, 4vw, 48px) 0 0' }}>
        <div className="container">
          <div style={{ position: 'relative', height: 'clamp(280px, 50vw, 540px)', overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${gallery[activeImg]})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 0.4s' }} />
            <div style={{ position: 'absolute', top: 24, left: 24, background: colors.accent, color: colors.bg, padding: '8px 16px', fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              {y.type}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {gallery.map((img, i) => (
              <div key={i} onClick={() => setActiveImg(i)} style={{ height: 'clamp(60px, 12vw, 120px)', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer', border: activeImg === i ? `2px solid ${colors.accent}` : `2px solid transparent`, opacity: activeImg === i ? 1 : 0.6, transition: 'opacity 0.2s' }} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: colors.bg, padding: '64px 0' }}>
        <div className="container split-form">
          <div>
            <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 12 }}>{y.builder} · {y.year}</div>
            <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(40px, 8vw, 78px)', color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>{y.name}</h1>
            <div className="yacht-meta" style={{ marginTop: 32, fontFamily: fontSans, fontSize: 14, color: colors.textMuted }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><MapPin size={14} color={colors.accent} /> {y.location}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Calendar size={14} color={colors.accent} /> Built {y.year}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Ruler size={14} color={colors.accent} /> {y.loa}ft LOA</div>
            </div>

            <div style={{ marginTop: 48, paddingTop: 48, borderTop: `1px solid ${colors.border}` }}>
              <h2 style={{ fontFamily: fontSerif, fontSize: 'clamp(26px, 3.5vw, 32px)', color: colors.text, fontWeight: 300, margin: 0, marginBottom: 16 }}>The yacht</h2>
              <p style={{ fontFamily: fontSans, fontSize: 15, color: colors.textMuted, lineHeight: 1.9, fontWeight: 300 }}>
                {y.name} is a {y.year} {y.builder} {y.type.toLowerCase()} maintained to exceptional standard by her current ownership. Recently surveyed and presented in turn-key condition, she offers immediate sailing across the {y.location} cruising grounds and beyond. Three-cabin layout, full electronics refit in 2023, new sails 2024. Inspection by appointment.
              </p>
              <p style={{ fontFamily: fontSans, fontSize: 15, color: colors.textMuted, lineHeight: 1.9, fontWeight: 300, marginTop: 16 }}>
                A rare opportunity to acquire one of the cleanest examples currently available on the Asia-Pacific market. Owner is motivated by an upgrade to a larger platform — sensible offers will be considered.
              </p>
            </div>

            <div style={{ marginTop: 48, paddingTop: 48, borderTop: `1px solid ${colors.border}` }}>
              <h2 style={{ fontFamily: fontSerif, fontSize: 'clamp(26px, 3.5vw, 32px)', color: colors.text, fontWeight: 300, margin: 0, marginBottom: 32 }}>Specifications</h2>
              <div className="specs-grid">
                {[
                  ['Builder', y.builder], ['Model year', y.year],
                  ['Length overall', `${y.loa} ft`], ['Beam', `${y.beam} ft`],
                  ['Hull type', y.type], ['Cabins', y.cabins],
                  ['Location', y.location], ['Flag', 'Hong Kong'],
                  ['Engines', '2 × Volvo D2-75'], ['Hours', '1,840'],
                  ['Fuel', 'Diesel'], ['VAT status', 'Paid'],
                ].map(([k,v], i) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: `1px solid ${colors.border}`, paddingRight: i % 2 === 0 ? 24 : 0, paddingLeft: i % 2 === 1 ? 24 : 0, borderLeft: i % 2 === 1 ? `1px solid ${colors.border}` : 'none' }}>
                    <div style={{ fontFamily: fontSans, fontSize: 12, color: colors.textDim, fontWeight: 300, letterSpacing: '0.05em' }}>{k}</div>
                    <div style={{ fontFamily: fontSans, fontSize: 13, color: colors.text }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky sidebar (op mobiel onder content) */}
          <aside>
            <div style={{ background: colors.bgAlt, border: `1px solid ${colors.border}`, padding: 'clamp(24px, 3vw, 36px)' }}>
              <div style={{ fontFamily: fontSans, fontSize: 10, color: colors.textDim, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Asking price</div>
              <div style={{ fontFamily: fontSerif, fontSize: 'clamp(32px, 4vw, 42px)', color: colors.accent, fontWeight: 400, marginTop: 8, letterSpacing: '-0.01em' }}>
                {y.currency} {y.price.toLocaleString()}
              </div>
              <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${colors.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: colors.accent, color: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fontSerif, fontSize: 22, fontWeight: 400 }}>KB</div>
                  <div>
                    <div style={{ fontFamily: fontSerif, fontSize: 18, color: colors.text, fontWeight: 400 }}>Karen Ball</div>
                    <div style={{ fontFamily: fontSans, fontSize: 11, color: colors.textMuted, letterSpacing: '0.1em' }}>Sales Director</div>
                  </div>
                </div>
                <button onClick={() => { setPage('contact'); window.scrollTo(0,0); }} style={{ background: colors.accent, color: colors.bg, border: 'none', padding: '14px 0', fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', width: '100%', marginBottom: 10 }}>
                  Request information
                </button>
                <button style={{ background: 'transparent', color: colors.text, border: `1px solid ${colors.border}`, padding: '14px 0', fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', width: '100%', marginBottom: 10 }}>
                  Schedule viewing
                </button>
                <button style={{ background: 'transparent', color: colors.textMuted, border: `1px solid ${colors.border}`, padding: '14px 0', fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', width: '100%' }}>
                  Download brochure
                </button>
              </div>
              <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${colors.border}`, fontFamily: fontSans, fontSize: 12, color: colors.textMuted, lineHeight: 1.7 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}><Phone size={12} color={colors.accent} /> +852 9304 6341</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Mail size={12} color={colors.accent} /> karen@asiayachtservices.com</div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

// ============ CONTACT ============
function Contact() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div style={{ background: colors.bg, minHeight: '100vh' }}>
      <section className="section-pad-sm">
        <div className="container">
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 16 }}>— Get in touch</div>
          <h1 className="hero-h1" style={{ fontFamily: fontSerif, color: colors.text, fontWeight: 300, margin: 0, letterSpacing: '-0.02em', maxWidth: 900 }}>
            Come <span style={{ fontStyle: 'italic', color: colors.accent }}>aboard.</span>
          </h1>
          <p style={{ fontFamily: fontSans, fontSize: 'clamp(15px, 2vw, 17px)', color: colors.textMuted, lineHeight: 1.7, maxWidth: 600, marginTop: 32, fontWeight: 300 }}>
            Our brokers in Hong Kong, Phuket and Singapore respond within 24 hours. Tell us what you're looking for — every conversation starts privately.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 96px' }}>
        <div className="container split-form">
          {/* Form */}
          <div>
            {submitted ? (
              <div style={{ background: colors.bgAlt, border: `1px solid ${colors.border}`, padding: 'clamp(40px, 6vw, 64px)', textAlign: 'center' }}>
                <div style={{ fontFamily: fontSerif, fontSize: 'clamp(28px, 4vw, 36px)', color: colors.accent, fontWeight: 300, marginBottom: 16 }}>Thank you.</div>
                <p style={{ fontFamily: fontSans, fontSize: 15, color: colors.textMuted, lineHeight: 1.7, fontWeight: 300 }}>Your message has reached us. Karen or Bart will be in touch personally within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} style={{ background: 'transparent', color: colors.accent, border: `1px solid ${colors.accent}`, padding: '12px 28px', fontFamily: fontSans, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', marginTop: 32 }}>Send another</button>
              </div>
            ) : (
              <div>
                <div className="grid-2" style={{ marginBottom: 24 }}>
                  <FormField label="First name" placeholder="Bart" />
                  <FormField label="Last name" placeholder="Kimman" />
                </div>
                <div className="grid-2" style={{ marginBottom: 24 }}>
                  <FormField label="Email" placeholder="you@domain.com" type="email" />
                  <FormField label="Phone" placeholder="+852 ..." />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.25em', color: colors.textDim, textTransform: 'uppercase', marginBottom: 10 }}>Interest</div>
                  <select style={{ background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text, padding: '14px 16px', fontFamily: fontSans, fontSize: 14, width: '100%', boxSizing: 'border-box' }}>
                    <option>New yacht — sailing</option>
                    <option>New yacht — motor</option>
                    <option>Pre-owned brokerage</option>
                    <option>Charter</option>
                    <option>Yacht management</option>
                    <option>Selling my yacht</option>
                  </select>
                </div>
                <div style={{ marginBottom: 32 }}>
                  <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.25em', color: colors.textDim, textTransform: 'uppercase', marginBottom: 10 }}>Message</div>
                  <textarea rows={6} placeholder="Tell us about your project..." style={{ background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text, padding: 16, fontFamily: fontSans, fontSize: 14, width: '100%', boxSizing: 'border-box', resize: 'vertical' }} />
                </div>
                <button onClick={() => setSubmitted(true)} style={{ background: colors.accent, color: colors.bg, border: 'none', padding: '18px 36px', fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                  Send enquiry <ArrowRight size={14} />
                </button>
                <p style={{ fontFamily: fontSans, fontSize: 11, color: colors.textDim, marginTop: 24, lineHeight: 1.7, maxWidth: 480 }}>
                  Your data stays with us. We do not share with third parties. By submitting you accept our privacy policy.
                </p>
              </div>
            )}
          </div>

          {/* Contact info */}
          <aside>
            <div style={{ background: colors.bgAlt, border: `1px solid ${colors.border}`, padding: 'clamp(24px, 3vw, 36px)', marginBottom: 24 }}>
              <div style={{ fontFamily: fontSerif, fontSize: 24, color: colors.text, fontWeight: 400, marginBottom: 24 }}>Hong Kong — Head Office</div>
              <div style={{ fontFamily: fontSans, fontSize: 14, color: colors.textMuted, lineHeight: 1.9, fontWeight: 300 }}>
                21F, Hing Yip Commercial Centre<br />
                272-284 Des Voeux Road Central<br />
                Hong Kong SAR
              </div>
              <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${colors.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, fontFamily: fontSans, fontSize: 14, color: colors.text }}>
                  <Phone size={14} color={colors.accent} /> +852 9304 6341
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: fontSans, fontSize: 14, color: colors.text }}>
                  <Mail size={14} color={colors.accent} /> hello@asiayachtservices.com
                </div>
              </div>
            </div>

            <div style={{ background: colors.bgAlt, border: `1px solid ${colors.border}`, padding: 'clamp(24px, 3vw, 36px)', marginBottom: 24 }}>
              <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.25em', color: colors.textDim, textTransform: 'uppercase', marginBottom: 10 }}>Other offices</div>
              <div style={{ fontFamily: fontSans, fontSize: 14, color: colors.text, lineHeight: 2, fontWeight: 300 }}>
                Phuket, Thailand<br />
                Singapore<br />
                Subic Bay, Philippines
              </div>
            </div>

            <div style={{ background: colors.bgAlt, border: `1px solid ${colors.border}`, padding: 'clamp(24px, 3vw, 36px)' }}>
              <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.25em', color: colors.textDim, textTransform: 'uppercase', marginBottom: 16 }}>Office hours</div>
              <div style={{ fontFamily: fontSans, fontSize: 14, color: colors.text, lineHeight: 2, fontWeight: 300 }}>
                Mon — Fri · 09:00 — 18:00 HKT<br />
                Saturday · By appointment<br />
                Sunday · Closed
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function FormField({ label, placeholder, type='text' }) {
  return (
    <div>
      <div style={{ fontFamily: fontSans, fontSize: 10, letterSpacing: '0.25em', color: colors.textDim, textTransform: 'uppercase', marginBottom: 10 }}>{label}</div>
      <input type={type} placeholder={placeholder} style={{ background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text, padding: '14px 16px', fontFamily: fontSans, fontSize: 14, width: '100%', boxSizing: 'border-box' }} />
    </div>
  );
}

// ============ ROOT ============
export default function App() {
  const [page, setPage] = useState('home');
  const [brand, setBrand] = useState('seawind');
  const [modelId, setModelId] = useState('sw-1170');
  const [yachtId, setYachtId] = useState('gypsea');

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', color: colors.text, fontFamily: fontSans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        body, html { margin: 0; padding: 0; background: ${colors.bg}; }
        button:hover { opacity: 0.92; }
        select { appearance: none; background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23d4b88a' d='M6 8L0 0h12z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px !important; }
        input::placeholder, textarea::placeholder { color: ${colors.textDim}; }
        input:focus, textarea:focus, select:focus { outline: none; border-color: ${colors.accent}; }

        /* ===== Responsive helpers ===== */
        .container { max-width: 1400px; margin: 0 auto; padding: 0 48px; }
        .section-pad { padding: 96px 48px; }
        .section-pad-sm { padding: 96px 48px 64px; }
        .grid-2, .grid-3, .grid-4 { display: grid; gap: 24px; }
        .grid-2 { grid-template-columns: repeat(2, 1fr); }
        .grid-3 { grid-template-columns: repeat(3, 1fr); }
        .grid-4 { grid-template-columns: repeat(4, 1fr); }
        .split { display: grid; grid-template-columns: 1fr 2fr; gap: 80px; align-items: center; }
        .split-rev { display: grid; grid-template-columns: 2fr 1fr; gap: 64px; }
        .split-form { display: grid; grid-template-columns: 1.4fr 1fr; gap: 80px; }
        .split-filter { display: grid; grid-template-columns: 280px 1fr; gap: 48px; }
        .split-brand { display: grid; grid-template-columns: 1.4fr 1fr; gap: 0; }
        .split-brand.rev { grid-template-columns: 1fr 1.4fr; }
        .split-model { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        .hero-pad { padding: 0 48px; padding-bottom: 80px; }
        .hero-h1 { font-size: clamp(44px, 8vw, 84px); line-height: 1.02; }
        .hero-h1-xl { font-size: clamp(48px, 10vw, 110px); }
        .hero-h1-md { font-size: clamp(40px, 7vw, 78px); }
        .section-h2 { font-size: clamp(32px, 5vw, 46px); }
        .section-h2-lg { font-size: clamp(36px, 6vw, 54px); }
        .model-h3 { font-size: clamp(28px, 4.5vw, 42px); }
        .nav-desktop { display: flex; gap: 36px; align-items: center; }
        .nav-mobile-toggle { display: none; background: none; border: none; color: ${colors.text}; cursor: pointer; }
        .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
        .services-grid > div + div { border-left: 1px solid ${colors.border}; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
        .specs-grid { display: grid; grid-template-columns: repeat(2, 1fr); }
        .yacht-meta { display: flex; gap: 24px; align-items: center; flex-wrap: wrap; }

        /* ===== Tablet (≤960px) ===== */
        @media (max-width: 960px) {
          .container, .hero-pad { padding-left: 32px; padding-right: 32px; }
          .section-pad { padding: 72px 32px; }
          .section-pad-sm { padding: 72px 32px 48px; }
          .grid-3, .grid-4 { grid-template-columns: repeat(2, 1fr); }
          .split, .split-rev, .split-form, .split-filter { grid-template-columns: 1fr; gap: 40px; }
          .split-brand, .split-brand.rev, .split-model { grid-template-columns: 1fr; }
          .stat-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; }
          .services-grid { grid-template-columns: 1fr; }
          .services-grid > div + div { border-left: none; border-top: 1px solid ${colors.border}; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
        }

        /* ===== Mobile (≤640px) ===== */
        @media (max-width: 640px) {
          .container, .hero-pad { padding-left: 20px; padding-right: 20px; }
          .section-pad { padding: 56px 20px; }
          .section-pad-sm { padding: 56px 20px 40px; }
          .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; gap: 20px; }
          .stat-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
          .footer-grid { grid-template-columns: 1fr; gap: 40px; }
          .specs-grid { grid-template-columns: 1fr; }
          .nav-desktop { display: none; }
          .nav-mobile-toggle { display: block; }
          .hero-pad { padding-bottom: 48px !important; }
          .yacht-meta { gap: 12px; font-size: 12px; }
        }
      `}</style>
      <Nav page={page} setPage={setPage} setBrand={setBrand} setYacht={setYachtId} />
      {page === 'home' && <Home setPage={setPage} setBrand={setBrand} setYachtId={setYachtId} />}
      {page === 'new' && <NewYachts setPage={setPage} setBrand={setBrand} />}
      {page === 'brand' && <BrandPage brandId={brand} setPage={setPage} setModelId={setModelId} />}
      {page === 'model' && <ModelDetail brandId={brand} modelId={modelId} setPage={setPage} />}
      {page === 'used' && <UsedYachts setPage={setPage} setYachtId={setYachtId} />}
      {page === 'yacht' && <YachtDetail yachtId={yachtId} setPage={setPage} />}
      {page === 'contact' && <Contact />}
      <Footer setPage={setPage} />
    </div>
  );
}
