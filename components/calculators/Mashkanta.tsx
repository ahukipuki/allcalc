'use client';

import { useState, useMemo } from 'react';
import { CalcCard, NumberInput, ResultBlock, fmt } from '@/components/ui/Primitives';

export default function Mashkanta() {
  const [principal, setPrincipal] = useState<number | ''>(1500000);
  const [years, setYears] = useState<number | ''>(25);
  const [rate, setRate] = useState<number | ''>(4.5);
  const [showTable, setShowTable] = useState(false);

  const result = useMemo(() => {
    const P = Number(principal);
    const n = Number(years) * 12;
    const r = Number(rate) / 100 / 12;
    if (!P || !n || r < 0) return null;
    const monthly = r === 0 ? P / n : (P * r) / (1 - Math.pow(1 + r, -n));
    const total = monthly * n;
    const interest = total - P;

    // Build amortization (yearly summary to keep table manageable)
    const schedule: { year: number; principal: number; interest: number; balance: number }[] = [];
    let balance = P;
    for (let y = 1; y <= Number(years); y++) {
      let yPrincipal = 0;
      let yInterest = 0;
      for (let m = 0; m < 12; m++) {
        const i = balance * r;
        const p = monthly - i;
        yInterest += i;
        yPrincipal += p;
        balance -= p;
      }
      schedule.push({ year: y, principal: yPrincipal, interest: yInterest, balance: Math.max(0, balance) });
    }

    return { monthly, total, interest, schedule };
  }, [principal, years, rate]);

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-3">
        <NumberInput
          label="סכום המשכנתא"
          value={principal}
          onChange={setPrincipal}
          prefix="₪"
          min={0}
        />
        <NumberInput
          label="תקופה"
          value={years}
          onChange={setYears}
          suffix="שנים"
          min={1}
          max={40}
        />
        <NumberInput
          label="ריבית שנתית"
          value={rate}
          onChange={setRate}
          suffix="%"
          min={0}
          max={20}
          step={0.1}
        />
      </div>

      {result && (
        <div className="mt-8">
          <div className="grid gap-4 md:grid-cols-3">
            <ResultBlock
              label="החזר חודשי"
              value={`₪ ${fmt(result.monthly, 0)}`}
              emphasis
            />
            <ResultBlock label="סך תשלומי ריבית" value={`₪ ${fmt(result.interest, 0)}`} />
            <ResultBlock label="סך החזר כולל" value={`₪ ${fmt(result.total, 0)}`} />
          </div>

          <div className="mt-6">
            <button
              onClick={() => setShowTable(!showTable)}
              className="text-sm font-medium text-amber hover:text-amber-ink"
            >
              {showTable ? 'הסתר' : 'הצג'} טבלת סילוקין שנתית ←
            </button>
            {showTable && (
              <div className="mt-4 overflow-hidden rounded-xl border border-line">
                <table className="w-full text-sm">
                  <thead className="bg-cream-100 text-ink-muted">
                    <tr>
                      <th className="px-4 py-2 text-right font-medium">שנה</th>
                      <th className="px-4 py-2 text-right font-medium">קרן</th>
                      <th className="px-4 py-2 text-right font-medium">ריבית</th>
                      <th className="px-4 py-2 text-right font-medium">יתרה</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.map((row) => (
                      <tr key={row.year} className="border-t border-line bg-cream-50">
                        <td className="num px-4 py-2 font-medium">{row.year}</td>
                        <td className="num px-4 py-2 text-ink-soft">₪ {fmt(row.principal, 0)}</td>
                        <td className="num px-4 py-2 text-ink-soft">₪ {fmt(row.interest, 0)}</td>
                        <td className="num px-4 py-2 text-ink-soft">₪ {fmt(row.balance, 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 rounded-lg border border-line bg-cream-100 p-4 text-sm leading-relaxed text-ink-muted">
        <strong className="text-ink-soft">איך מחושבת המשכנתא?</strong> הנוסחה היא הלוואה בריבית קבועה לא צמודה (לוח שפיצר):
        כל חודש משלמים סכום קבוע שכולל קרן וריבית. בתחילת התקופה רוב התשלום הוא ריבית, ובסוף — רוב התשלום הוא קרן. החישוב להמחשה בלבד; ריבית בפועל בבנק עשויה להיות שונה.
      </div>
    </CalcCard>
  );
}
