// Data access layer.
// Today: returns hardcoded data so the site keeps working with no DB.
// Later: each function flips to a Supabase query (same signature).

const u = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85&auto=format&fit=crop`;

export const IMG = {
  heroSeawind: u('1567899378494-47b22a2ae96a', 2400),
  superyacht: u('1605281317010-fe5ffe798166', 1800),
  preOwned: u('1569949381669-ecf31ae8e613', 1600),
  charter: u('1473445730015-841f29a9490b', 1600),
  cruise: u('1542736667-069246bdbc6d', 1600),
  gypsea: u('1540946485063-a4d3d1e0e3ce', 1200),
  silverlining: u('1569949381669-ecf31ae8e613', 1200),
  onyx: u('1500627964684-141351970a7f', 1200),
  swish: u('1540946485063-a4d3d1e0e3ce', 1200),
  bali: u('1567899378494-47b22a2ae96a', 1200),
  windrush: u('1473445730015-841f29a9490b', 1200),
  juggerknot: u('1542736667-069246bdbc6d', 1200),
  swan82: u('1605281317010-fe5ffe798166', 1200),
  dufour: u('1502780402662-acc01917738e', 1200),
  seawind1170: u('1599582909646-2ee21c0b5b2c', 1400),
  sw1160: u('1567899378494-47b22a2ae96a', 1400),
  grandSoleil: u('1542856391-010fb87dcfed', 1400),
};

const BRANDS = [
  {
    slug: 'seawind',
    name: 'Seawind Catamarans',
    tagline: 'Performance cruising catamarans built for serious sailors',
    hero: IMG.heroSeawind,
    origin: 'Vietnam',
    since: '1982',
    description:
      'Seawind catamarans are designed for ocean-crossing capability with the comfort and sailing performance that experienced cruisers demand. Each hull is hand-built in Ho Chi Minh City under the supervision of Australian engineers.',
    models: [
      { slug: 'sw-1170', name: 'Seawind 1170', loa: '38\'5"', beam: '21\'6"', cabins: 3, image: IMG.seawind1170, priceFrom: 'USD 520,000', status: 'In production' },
      { slug: 'sw-1260', name: 'Seawind 1260', loa: '41\'4"', beam: '23\'0"', cabins: 4, image: IMG.sw1160, priceFrom: 'USD 680,000', status: 'Available 2026' },
      { slug: 'sw-1370', name: 'Seawind 1370', loa: '44\'9"', beam: '24\'8"', cabins: 4, image: IMG.windrush, priceFrom: 'USD 950,000', status: 'Flagship' },
    ],
  },
  {
    slug: 'kingship',
    name: 'Kingship Marine',
    tagline: 'Custom long-range motor yachts engineered in Asia',
    hero: IMG.superyacht,
    origin: 'China',
    since: '2002',
    description:
      'Kingship build semi-displacement and full-displacement motor yachts from 24 to 50 metres. The shipyard is renowned for owner-led customisation and Northern European build standards delivered at competitive Asian pricing.',
    models: [
      { slug: 'ks-90', name: 'Kingship 90 Explorer', loa: '90\'', beam: '22\'', cabins: 4, image: IMG.superyacht, priceFrom: 'On request', status: 'Custom build' },
    ],
  },
  {
    slug: 'aquabolt',
    name: 'Aquabolt',
    tagline: 'Electric tenders & dayboats — silent, clean, instant',
    hero: IMG.cruise,
    origin: 'Hong Kong',
    since: '2021',
    description:
      'Aquabolt builds fully-electric tenders and dayboats for the Asia-Pacific market. Zero emissions, near-silent operation and instant torque make them the next-generation choice for marinas and private estates.',
    models: [
      { slug: 'ab-23', name: 'Aquabolt 23', loa: '23\'', beam: '8\'2"', cabins: 0, image: IMG.cruise, priceFrom: 'USD 145,000', status: 'In stock' },
    ],
  },
  {
    slug: 'contest',
    name: 'Contest Yachts',
    tagline: 'Dutch-built bluewater sailing yachts since 1959',
    hero: IMG.swan82,
    origin: 'Netherlands',
    since: '1959',
    description:
      'Contest Yachts has built more than 800 ocean-capable yachts from its yard in Medemblik. The combination of conduction-bonded composite construction and tailored interior design has made Contest the choice of discerning long-distance cruisers.',
    models: [
      { slug: 'ct-49', name: 'Contest 49CS', loa: '49\'', beam: '14\'9"', cabins: 3, image: IMG.silverlining, priceFrom: 'EUR 1,250,000', status: 'Build slot 2027' },
      { slug: 'ct-55', name: 'Contest 55CS', loa: '55\'', beam: '16\'1"', cabins: 3, image: IMG.grandSoleil, priceFrom: 'EUR 1,890,000', status: 'Build slot 2027' },
    ],
  },
];

const YACHTS = [
  { slug: 'gypsea', name: 'Gypsea', builder: 'Lagoon', type: 'Catamaran', year: 2012, loa: 52, beam: 15, cabins: 3, price: 390000, currency: 'USD', location: 'Hong Kong', image: IMG.gypsea },
  { slug: 'silverlining', name: 'Silverlining', builder: 'Oyster', type: 'Sailing Yacht', year: 2015, loa: 62, beam: 17, cabins: 4, price: 1450000, currency: 'USD', location: 'Phuket', image: IMG.silverlining },
  { slug: 'onyx', name: 'Onyx II', builder: 'X-Yachts', type: 'Sailing Yacht', year: 2021, loa: 43, beam: 13, cabins: 3, price: 720000, currency: 'EUR', location: 'Hong Kong', image: IMG.onyx },
  { slug: 'swish', name: 'Swish', builder: 'J/Boats', type: 'Performance', year: 2018, loa: 42, beam: 12, cabins: 2, price: 385000, currency: 'USD', location: 'Subic Bay', image: IMG.swish },
  { slug: 'catspace', name: 'Catspace', builder: 'Bali', type: 'Catamaran', year: 2020, loa: 40, beam: 22, cabins: 4, price: 525000, currency: 'USD', location: 'Hong Kong', image: IMG.bali },
  { slug: 'windrush', name: 'Windrush', builder: 'Seawind', type: 'Catamaran', year: 2013, loa: 38, beam: 21, cabins: 3, price: 295000, currency: 'USD', location: 'Hong Kong', image: IMG.windrush },
  { slug: 'juggerknot', name: 'Juggerknot', builder: 'J/Boats', type: 'Performance', year: 2016, loa: 36, beam: 11, cabins: 2, price: 245000, currency: 'USD', location: 'Hong Kong', image: IMG.juggerknot },
  { slug: 'kallima', name: 'Kallima', builder: 'Swan', type: 'Sailing Yacht', year: 2002, loa: 82, beam: 19, cabins: 3, price: 2750000, currency: 'EUR', location: 'West Med', image: IMG.swan82 },
  { slug: 'dufour41', name: 'Sea Whisper', builder: 'Dufour', type: 'Sailing Yacht', year: 2023, loa: 41, beam: 13, cabins: 3, price: 415000, currency: 'EUR', location: 'Singapore', image: IMG.dufour },
];

export async function getBrands() {
  return BRANDS;
}

export async function getBrand(slug) {
  return BRANDS.find((b) => b.slug === slug) ?? null;
}

export async function getModel(brandSlug, modelSlug) {
  const brand = await getBrand(brandSlug);
  if (!brand) return null;
  const model = brand.models.find((m) => m.slug === modelSlug);
  return model ? { brand, model } : null;
}

export async function getYachts() {
  return YACHTS;
}

export async function getYacht(slug) {
  return YACHTS.find((y) => y.slug === slug) ?? null;
}
