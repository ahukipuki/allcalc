'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, ResultBlock, Tabs, fmt } from '@/components/ui/Primitives';

// Approximate brackets — single residential apartment vs additional apartment
// Single residence brackets (2026 ranges, indexed)
const SINGLE = [
  { upTo: 1978745, rate: 0 },
  { upTo: 2347040, rate: 0.035 },
  { upTo: 6055070, rate: 0.05 },
  { upTo: 20183565, rate: 0.08 },
  { upTo: Infinity, rate: 0.10 },
];
// Additional apartment brackets (investment / second home)
const ADDITIONAL = [
  { upTo: 6055070, rate: 0.08 },
  { upTo: Infinity, rate: 0.10 },
];

function calc(price: number, brackets: typeof SINGLE) {
  let tax = 0, prev = 0;
  for (const b of brackets) {
    if (price > prev) { tax += (Math.min(price, b.upTo) - prev) * b.rate; prev = b.upTo; } else break;
  }
  return tax;
}

export default function MasRechisha() {
  const [type, setType] = useState('single');
  const [price, setPrice] = useState<number | ''>(2500000);

  const P = Number(price);
  const tax = calc(P, type === 'single' ? SINGLE : ADDITIONAL);
  const effective = P > 0 ? (tax / P) * 100 : 0;

  return (
    <CalcCard>
      <Tabs
        active={type}
        onChange={setType}
        tabs={[
          { id: 'single', label: 'דירה יחידה' },
          { id: 'additional', label: 'דירה נוספת' },
        ]}
      />
      <NumberInput label="מחיר הדירה" value={price} onChange={setPrice} prefix="₪" min={0} />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <ResultBlock label="מס רכישה" value={`₪ ${fmt(tax, 0)}`} emphasis hint={`${fmt(effective, 2)}% מהמחיר`} />
        <ResultBlock label="עלות כוללת" value={`₪ ${fmt(P + tax, 0)}`} />
      </div>
      <div className="mt-8 overflow-hidden rounded-xl border border-line">
        <table className="w-full text-sm">
          <thead className="bg-cream-100 text-ink-muted">
            <tr><th className="px-4 py-2 text-right font-medium">מדרגה</th><th className="px-4 py-2 text-right font-medium">שיעור מס</th></tr>
          </thead>
          <tbody>
            {(type === 'single' ? SINGLE : ADDITIONAL).map((b, i) => (
              <tr key={i} className="border-t border-line bg-cream-50">
                <td className="num px-4 py-2">{b.upTo === Infinity ? 'מעל המדרגה' : `עד ₪ ${fmt(b.upTo, 0)}`}</td>
                <td className="num px-4 py-2 font-medium">{(b.rate * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-ink-muted">
        מדרגות מס הרכישה מתעדכנות מדי שנה לפי הצמדה. הסכומים הם בגדר אומדן ולא מהווים ייעוץ מס. ייתכנו זכאויות והנחות (עולה חדש, נכה וכו׳).
      </p>
    </CalcCard>
  );
}
