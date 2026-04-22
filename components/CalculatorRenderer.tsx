'use client';

import dynamic from 'next/dynamic';

const loading = () => (
  <div className="h-96 animate-pulse rounded-2xl border border-line bg-cream-100" />
);

// Maps URL slug → React component. Component file names haven't changed —
// only the slug keys did (e.g. 'mashkanta' → 'mortgage').
const components: Record<string, React.ComponentType> = {
  // Finance
  mortgage: dynamic(() => import('./calculators/Mashkanta').then((m) => m.default), { loading }),
  loan: dynamic(() => import('./calculators/Halvaa').then((m) => m.default), { loading }),
  'compound-interest': dynamic(() => import('./calculators/RibitDeribit').then((m) => m.default), { loading }),
  vat: dynamic(() => import('./calculators/Maam').then((m) => m.default), { loading }),
  tip: dynamic(() => import('./calculators/Tip').then((m) => m.default), { loading }),
  savings: dynamic(() => import('./calculators/Hisachon').then((m) => m.default), { loading }),
  deposit: dynamic(() => import('./calculators/Pikadon').then((m) => m.default), { loading }),
  roi: dynamic(() => import('./calculators/Teshuah').then((m) => m.default), { loading }),
  'income-tax': dynamic(() => import('./calculators/MasHachnasa').then((m) => m.default), { loading }),
  'net-salary': dynamic(() => import('./calculators/SacharNeto').then((m) => m.default), { loading }),
  severance: dynamic(() => import('./calculators/PitzuyeyPiturin').then((m) => m.default), { loading }),
  'purchase-tax': dynamic(() => import('./calculators/MasRechisha').then((m) => m.default), { loading }),
  'recovery-pay': dynamic(() => import('./calculators/RecoveryPay').then((m) => m.default), { loading }),
  'annual-leave': dynamic(() => import('./calculators/AnnualLeave').then((m) => m.default), { loading }),
  'sick-days': dynamic(() => import('./calculators/SickDays').then((m) => m.default), { loading }),
  'minimum-wage': dynamic(() => import('./calculators/MinimumWage').then((m) => m.default), { loading }),
  // Health
  bmi: dynamic(() => import('./calculators/Bmi').then((m) => m.default), { loading }),
  bmr: dynamic(() => import('./calculators/Bmr').then((m) => m.default), { loading }),
  calories: dynamic(() => import('./calculators/Caloriot').then((m) => m.default), { loading }),
  'ideal-weight': dynamic(() => import('./calculators/MishkalIdeali').then((m) => m.default), { loading }),
  'body-fat': dynamic(() => import('./calculators/AchuzShuman').then((m) => m.default), { loading }),
  'water-intake': dynamic(() => import('./calculators/ShtiyatMayim').then((m) => m.default), { loading }),
  pregnancy: dynamic(() => import('./calculators/Herayon').then((m) => m.default), { loading }),
  ovulation: dynamic(() => import('./calculators/Biyutz').then((m) => m.default), { loading }),
  'heart-rate': dynamic(() => import('./calculators/Dofek').then((m) => m.default), { loading }),
  macros: dynamic(() => import('./calculators/Macro').then((m) => m.default), { loading }),
  // Math
  percentage: dynamic(() => import('./calculators/Achuzim').then((m) => m.default), { loading }),
  fractions: dynamic(() => import('./calculators/Shvarim').then((m) => m.default), { loading }),
  average: dynamic(() => import('./calculators/Memutza').then((m) => m.default), { loading }),
  ratio: dynamic(() => import('./calculators/Yachas').then((m) => m.default), { loading }),
  triangle: dynamic(() => import('./calculators/Meshulash').then((m) => m.default), { loading }),
  area: dynamic(() => import('./calculators/Shetach').then((m) => m.default), { loading }),
  volume: dynamic(() => import('./calculators/Nefach').then((m) => m.default), { loading }),
  exponent: dynamic(() => import('./calculators/Eksponent').then((m) => m.default), { loading }),
  logarithm: dynamic(() => import('./calculators/Lograitm').then((m) => m.default), { loading }),
  quadratic: dynamic(() => import('./calculators/MishvaaRivuit').then((m) => m.default), { loading }),
  // Date
  age: dynamic(() => import('./calculators/Gil').then((m) => m.default), { loading }),
  'date-diff': dynamic(() => import('./calculators/HefreshTarichim').then((m) => m.default), { loading }),
  workdays: dynamic(() => import('./calculators/YemeiAvoda').then((m) => m.default), { loading }),
  'work-hours': dynamic(() => import('./calculators/ShaotAvoda').then((m) => m.default), { loading }),
  countdown: dynamic(() => import('./calculators/SefirahLeachor').then((m) => m.default), { loading }),
  'hebrew-date': dynamic(() => import('./calculators/HebrewDate').then((m) => m.default), { loading }),
  // Conversion
  length: dynamic(() => import('./calculators/UnitOrech').then((m) => m.default), { loading }),
  weight: dynamic(() => import('./calculators/UnitMishkal').then((m) => m.default), { loading }),
  temperature: dynamic(() => import('./calculators/UnitTemperatura').then((m) => m.default), { loading }),
  'volume-conversion': dynamic(() => import('./calculators/UnitNefach').then((m) => m.default), { loading }),
  speed: dynamic(() => import('./calculators/UnitMehirut').then((m) => m.default), { loading }),
  'area-conversion': dynamic(() => import('./calculators/UnitShetach').then((m) => m.default), { loading }),
  pressure: dynamic(() => import('./calculators/UnitLachatz').then((m) => m.default), { loading }),
  energy: dynamic(() => import('./calculators/UnitEnrgia').then((m) => m.default), { loading }),
  // Misc
  calculator: dynamic(() => import('./calculators/MachshevRagil').then((m) => m.default), { loading }),
  'scientific-calculator': dynamic(() => import('./calculators/MachshevMadai').then((m) => m.default), { loading }),
  'fuel-cost': dynamic(() => import('./calculators/Delek').then((m) => m.default), { loading }),
  'grade-average': dynamic(() => import('./calculators/TziyunMemutza').then((m) => m.default), { loading }),
  'random-number': dynamic(() => import('./calculators/MisparEkrai').then((m) => m.default), { loading }),
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
