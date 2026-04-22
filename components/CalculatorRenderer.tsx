'use client';

import dynamic from 'next/dynamic';

const loading = () => (
  <div className="h-96 animate-pulse rounded-2xl border border-line bg-cream-100" />
);

// Each calculator is dynamically imported so the bundle for any individual page is small.
const components: Record<string, React.ComponentType> = {
  // Finance
  mashkanta: dynamic(() => import('./calculators/Mashkanta').then((m) => m.default), { loading }),
  halvaa: dynamic(() => import('./calculators/Halvaa').then((m) => m.default), { loading }),
  'ribit-deribit': dynamic(() => import('./calculators/RibitDeribit').then((m) => m.default), { loading }),
  maam: dynamic(() => import('./calculators/Maam').then((m) => m.default), { loading }),
  tip: dynamic(() => import('./calculators/Tip').then((m) => m.default), { loading }),
  hisachon: dynamic(() => import('./calculators/Hisachon').then((m) => m.default), { loading }),
  pikadon: dynamic(() => import('./calculators/Pikadon').then((m) => m.default), { loading }),
  teshuah: dynamic(() => import('./calculators/Teshuah').then((m) => m.default), { loading }),
  'mas-hachnasa': dynamic(() => import('./calculators/MasHachnasa').then((m) => m.default), { loading }),
  'sachar-neto': dynamic(() => import('./calculators/SacharNeto').then((m) => m.default), { loading }),
  'pitzuyey-piturin': dynamic(() => import('./calculators/PitzuyeyPiturin').then((m) => m.default), { loading }),
  'mas-rechisha': dynamic(() => import('./calculators/MasRechisha').then((m) => m.default), { loading }),
  // Health
  bmi: dynamic(() => import('./calculators/Bmi').then((m) => m.default), { loading }),
  bmr: dynamic(() => import('./calculators/Bmr').then((m) => m.default), { loading }),
  caloriot: dynamic(() => import('./calculators/Caloriot').then((m) => m.default), { loading }),
  'mishkal-ideali': dynamic(() => import('./calculators/MishkalIdeali').then((m) => m.default), { loading }),
  'achuz-shuman': dynamic(() => import('./calculators/AchuzShuman').then((m) => m.default), { loading }),
  'shtiyat-mayim': dynamic(() => import('./calculators/ShtiyatMayim').then((m) => m.default), { loading }),
  herayon: dynamic(() => import('./calculators/Herayon').then((m) => m.default), { loading }),
  biyutz: dynamic(() => import('./calculators/Biyutz').then((m) => m.default), { loading }),
  dofek: dynamic(() => import('./calculators/Dofek').then((m) => m.default), { loading }),
  macro: dynamic(() => import('./calculators/Macro').then((m) => m.default), { loading }),
  // Math
  achuzim: dynamic(() => import('./calculators/Achuzim').then((m) => m.default), { loading }),
  shvarim: dynamic(() => import('./calculators/Shvarim').then((m) => m.default), { loading }),
  memutza: dynamic(() => import('./calculators/Memutza').then((m) => m.default), { loading }),
  yachas: dynamic(() => import('./calculators/Yachas').then((m) => m.default), { loading }),
  meshulash: dynamic(() => import('./calculators/Meshulash').then((m) => m.default), { loading }),
  shetach: dynamic(() => import('./calculators/Shetach').then((m) => m.default), { loading }),
  nefach: dynamic(() => import('./calculators/Nefach').then((m) => m.default), { loading }),
  eksponent: dynamic(() => import('./calculators/Eksponent').then((m) => m.default), { loading }),
  lograitm: dynamic(() => import('./calculators/Lograitm').then((m) => m.default), { loading }),
  'mishvaa-rivuit': dynamic(() => import('./calculators/MishvaaRivuit').then((m) => m.default), { loading }),
  // Dates
  gil: dynamic(() => import('./calculators/Gil').then((m) => m.default), { loading }),
  'hefresh-tarichim': dynamic(() => import('./calculators/HefreshTarichim').then((m) => m.default), { loading }),
  'yemei-avoda': dynamic(() => import('./calculators/YemeiAvoda').then((m) => m.default), { loading }),
  'shaot-avoda': dynamic(() => import('./calculators/ShaotAvoda').then((m) => m.default), { loading }),
  'sefirah-leachor': dynamic(() => import('./calculators/SefirahLeachor').then((m) => m.default), { loading }),
  'yom-bashavua': dynamic(() => import('./calculators/YomBashavua').then((m) => m.default), { loading }),
  // Conversions — all share UnitConverter
  orech: dynamic(() => import('./calculators/UnitOrech').then((m) => m.default), { loading }),
  mishkal: dynamic(() => import('./calculators/UnitMishkal').then((m) => m.default), { loading }),
  temperatura: dynamic(() => import('./calculators/UnitTemperatura').then((m) => m.default), { loading }),
  'nefach-conv': dynamic(() => import('./calculators/UnitNefach').then((m) => m.default), { loading }),
  mehirut: dynamic(() => import('./calculators/UnitMehirut').then((m) => m.default), { loading }),
  'shetach-conv': dynamic(() => import('./calculators/UnitShetach').then((m) => m.default), { loading }),
  lachatz: dynamic(() => import('./calculators/UnitLachatz').then((m) => m.default), { loading }),
  enrgia: dynamic(() => import('./calculators/UnitEnrgia').then((m) => m.default), { loading }),
  // Other
  'machshev-ragil': dynamic(() => import('./calculators/MachshevRagil').then((m) => m.default), { loading }),
  'machshev-madai': dynamic(() => import('./calculators/MachshevMadai').then((m) => m.default), { loading }),
  delek: dynamic(() => import('./calculators/Delek').then((m) => m.default), { loading }),
  'tziyun-memutza': dynamic(() => import('./calculators/TziyunMemutza').then((m) => m.default), { loading }),
  'mispar-ekrai': dynamic(() => import('./calculators/MisparEkrai').then((m) => m.default), { loading }),
};

export function CalculatorRenderer({ slug }: { slug: string }) {
  const Comp = components[slug];
  if (!Comp) {
    return (
      <div className="rounded-2xl border border-line bg-cream-100 p-8 text-center text-ink-muted">
        מחשבון זה בבנייה — חזרו בקרוב.
      </div>
    );
  }
  return <Comp />;
}
