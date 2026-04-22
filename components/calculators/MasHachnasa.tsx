'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, ResultBlock, fmt } from '@/components/ui/Primitives';

// Israeli monthly tax brackets (approximate 2026 figures — update as needed)
// Source: Tax Authority publications
const BRACKETS = [
  { upTo: 7010, rate: 0.10 },
  { upTo: 10060, rate: 0.14 },
  { upTo: 16150, rate: 0.20 },
  { upTo: 22440, rate: 0.31 },
  { upTo: 46690, rate: 0.35 },
  { upTo: 60130, rate: 0.47 },
  { upTo: Infinity, rate: 0.50 },
];
const POINT_VALUE = 247; // ₪ per credit point per month (approximate)

export default function MasHachnasa() {
  const [salary, setSalary] = useState<number | ''>(15000);
  const [points, setPoints] = useState<number | ''>(2.25);

  const S = Number(salary);
  let tax = 0;
  let prev = 0;
  for (const b of BRACKETS) {
    if (S > prev) {
      const slice = Math.min(S, b.upTo) - prev;
      tax += slice * b.rate;
      prev = b.upTo;
    } else break;
  }
  const credit = Number(points) * POINT_VALUE;
  const taxAfter = Math.max(0, tax - credit);
  const effective = S > 0 ? (taxAfter / S) * 100 : 0;

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-2">
        <NumberInput label="שכר ברוטו חודשי" value={salary} onChange={setSalary} prefix="₪" min={0} />
        <NumberInput label="נקודות זיכוי" value={points} onChange={setPoints} min={0} max={10} step={0.25} hint="גבר רווק: 2.25 | אישה רווקה: 2.75" />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <ResultBlock label="מס לפני זיכויים" value={`₪ ${fmt(tax, 0)}`} />
        <ResultBlock label="זיכוי בגין נק׳ זיכוי" value={`₪ ${fmt(credit, 0)}`} hint={`${points} × ₪${POINT_VALUE}`} />
        <ResultBlock label="מס הכנסה לתשלום" value={`₪ ${fmt(taxAfter, 0)}`} emphasis hint={`שיעור אפקטיבי: ${fmt(effective, 1)}%`} />
      </div>
      <div className="mt-8 overflow-hidden rounded-xl border border-line">
        <table className="w-full text-sm">
          <thead className="bg-cream-100 text-ink-muted">
            <tr>
              <th className="px-4 py-2 text-right font-medium">עד הכנסה חודשית</th>
              <th className="px-4 py-2 text-right font-medium">שיעור מס</th>
            </tr>
          </thead>
          <tbody>
            {BRACKETS.map((b, i) => (
              <tr key={i} className="border-t border-line bg-cream-50">
                <td className="num px-4 py-2">{b.upTo === Infinity ? 'מעל ₪60,130' : `₪ ${fmt(b.upTo, 0)}`}</td>
                <td className="num px-4 py-2 font-medium">{Math.round(b.rate * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-ink-muted">
        מדרגות המס מתעדכנות מעת לעת. הסכומים והנוסחאות מבוססים על פרסומי רשות המסים. החישוב אינו כולל ביטוח לאומי, מס בריאות וזיכויים נוספים.
      </p>
    </CalcCard>
  );
}
