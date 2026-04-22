/** @type {import('next').NextConfig} */

// Slug redirects: old (Hebrew transliteration) → new (English).
// These run at the edge via Next's redirect engine (301 permanent).
// Any external link, bookmark, or previously-indexed URL keeps working.
const SLUG_REDIRECTS = [
  // Category redirects
  { source: '/finansi', destination: '/finance' },
  { source: '/finansi/:slug*', destination: '/finance/:slug*' },
  { source: '/breut', destination: '/health' },
  { source: '/breut/:slug*', destination: '/health/:slug*' },
  { source: '/matematika', destination: '/math' },
  { source: '/matematika/:slug*', destination: '/math/:slug*' },
  { source: '/tarichim', destination: '/date' },
  { source: '/tarichim/:slug*', destination: '/date/:slug*' },
  { source: '/hamarot', destination: '/conversion' },
  { source: '/hamarot/:slug*', destination: '/conversion/:slug*' },
  { source: '/shonot', destination: '/misc' },
  { source: '/shonot/:slug*', destination: '/misc/:slug*' },
];

// Calculator-slug redirects — these work regardless of which category prefix was used
// (the category redirects above run first; these catch any specific /new-cat/old-slug edge cases)
const CALC_REDIRECT_MAP = {
  // finance
  mashkanta: 'mortgage',
  halvaa: 'loan',
  'ribit-deribit': 'compound-interest',
  maam: 'vat',
  hisachon: 'savings',
  pikadon: 'deposit',
  teshuah: 'roi',
  'mas-hachnasa': 'income-tax',
  'sachar-neto': 'net-salary',
  'pitzuyey-piturin': 'severance',
  'mas-rechisha': 'purchase-tax',
  // health
  caloriot: 'calories',
  'mishkal-ideali': 'ideal-weight',
  'achuz-shuman': 'body-fat',
  'shtiyat-mayim': 'water-intake',
  herayon: 'pregnancy',
  biyutz: 'ovulation',
  dofek: 'heart-rate',
  macro: 'macros',
  // math
  achuzim: 'percentage',
  shvarim: 'fractions',
  memutza: 'average',
  yachas: 'ratio',
  meshulash: 'triangle',
  shetach: 'area',
  nefach: 'volume',
  eksponent: 'exponent',
  lograitm: 'logarithm',
  'mishvaa-rivuit': 'quadratic',
  // date
  gil: 'age',
  'hefresh-tarichim': 'date-diff',
  'yemei-avoda': 'workdays',
  'shaot-avoda': 'work-hours',
  'sefirah-leachor': 'countdown',
  'yom-bashavua': 'day-of-week',
  // conversion
  orech: 'length',
  mishkal: 'weight',
  temperatura: 'temperature',
  'nefach-conv': 'volume-conversion',
  mehirut: 'speed',
  'shetach-conv': 'area-conversion',
  lachatz: 'pressure',
  enrgia: 'energy',
  // misc
  'machshev-ragil': 'calculator',
  'machshev-madai': 'scientific-calculator',
  delek: 'fuel-cost',
  'tziyun-memutza': 'grade-average',
  'mispar-ekrai': 'random-number',
};

// Build per-calc redirects: any new-category path with an old slug → same category with new slug
const CALC_REDIRECTS = [];
for (const [oldSlug, newSlug] of Object.entries(CALC_REDIRECT_MAP)) {
  for (const cat of ['finance', 'health', 'math', 'date', 'conversion', 'misc']) {
    CALC_REDIRECTS.push({
      source: `/${cat}/${oldSlug}`,
      destination: `/${cat}/${newSlug}`,
    });
  }
}

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  output: 'standalone',

  async redirects() {
    return [
      ...SLUG_REDIRECTS.map((r) => ({ ...r, permanent: true })),
      ...CALC_REDIRECTS.map((r) => ({ ...r, permanent: true })),
    ];
  },
};

module.exports = nextConfig;
