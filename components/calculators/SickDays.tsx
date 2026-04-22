'use client';

import { useState, useMemo } from 'react';
import { CalcCard, NumberInput, fmt, fmtCurrency } from '@/components/ui/Primitives';

// חוק דמי מחלה, התשל"ו-1976
// צבירה: 1.5 ימים לחודש (18 ימים בשנה)
// מקסימום צבירה: 90 ימים
// תשלום:
//   יום 1 - ללא תשלום
//   ימים 2-3 - 50% מהשכר
//   יום 4 ואילך - 100% מהשכר
const DAYS_PER_MONTH = 1.5;
const DAYS_PER_YEAR = 18;
const MAX_ACCUMULATION = 90;

export default function SickDays() {
  const [months, setMonths] = useState<number | ''>(12);
  const [used, setUsed] = useState<number | ''>(0);
  const [dailyWage, setDailyWage] = useState<number | ''>(500);
  const [sickDays, setSickDays] = useState<number | ''>(5);

  const calc = useMemo(() => {
    const m = typeof months === 'number' ? months : 0;
    const u = typeof used === 'number' ? used : 0;

    const accumulated = Math.min(m * DAYS_PER_MONTH, MAX_ACCUMULATION);
    const balance = Math.max(0, accumulated - u);

    // Payment calculation for a sick leave period
    const d = typeof sickDays === 'number' ? sickDays : 0;
    const w = typeof dailyWage === 'number' ? dailyWage : 0;
    let payment = 0;
    let breakdown: { days: number; pct: number; amount: number }[] = [];
    if (d >= 1) {
      breakdown.push({ days: 1, pct: 0, amount: 0 }); // day 1 unpaid
    }
    if (d >= 2) {
      const halfDays = Math.min(d - 1, 2);
      const halfAmount = halfDays * w * 0.5;
      breakdown.push({ days: halfDays, pct: 50, amount: halfAmount });
      payment += halfAmount;
    }
    if (d >= 4) {
      const fullDays = d - 3;
      const fullAmount = fullDays * w;
      breakdown.push({ days: fullDays, pct: 100, amount: fullAmount });
      payment += fullAmount;
    }

    return { accumulated, balance, payment, breakdown };
  }, [months, used, dailyWage, sickDays]);

  return (
    <CalcCard>
      <h3 className="mb-3 font-display text-lg font-bold text-ink">יתרת ימי מחלה</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <NumberInput
          label="חודשי עבודה"
          value={months}
          onChange={setMonths}
          min={0}
          max={600}
          suffix="חודשים"
          hint="סה״כ חודשי עבודה במקום העבודה"
        />
        <NumberInput
          label="ימי מחלה שנוצלו"
          value={used}
          onChange={setUsed}
          min={0}
          suffix="ימים"
        />
      </div>
      <div className="mt-6 rounded-xl border border-amber/30 bg-amber-wash/40 p-5">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="text-xs text-ink-muted">ימים שנצברו</div>
            <div className="num text-3xl font-bold text-ink">{fmt(calc.accumulated, 1)}</div>
            {calc.accumulated === MAX_ACCUMULATION && (
              <div className="mt-1 text-xs text-ink-muted">(הגעת לתקרת הצבירה המקסימלית)</div>
            )}
          </div>
          <div>
            <div className="text-xs text-ink-muted">יתרה זמינה</div>
            <div className="num text-3xl font-bold text-amber">{fmt(calc.balance, 1)}</div>
            <div className="mt-1 text-xs text-ink-muted">ימים זמינים למימוש</div>
          </div>
        </div>
      </div>

      <h3 className="mb-3 mt-8 font-display text-lg font-bold text-ink">
        חישוב תשלום למחלה
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <NumberInput
          label="ימי מחלה"
          value={sickDays}
          onChange={setSickDays}
          min={0}
          max={90}
          suffix="ימים"
          hint="אורך התקופה"
        />
        <NumberInput
          label="שכר יומי"
          value={dailyWage}
          onChange={setDailyWage}
          min={0}
          prefix="₪"
          hint="שכר יומי ברוטו"
        />
      </div>
      <div className="mt-6 rounded-xl border border-amber/30 bg-amber-wash/40 p-5">
        <div className="grid gap-6 md:grid-cols-3">
          {calc.breakdown.map((b, i) => (
            <div key={i}>
              <div className="text-xs text-ink-muted">
                {b.pct === 0 && 'יום ראשון'}
                {b.pct === 50 && `ימים 2-${b.days + 1}`}
                {b.pct === 100 && `ימים 4+`}
                {' '}({b.pct}%)
              </div>
              <div className="num text-lg font-bold text-ink">{fmtCurrency(b.amount)}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 border-t border-line pt-4">
          <div className="text-xs text-ink-muted">סך תשלום דמי מחלה</div>
          <div className="num text-3xl font-bold text-amber">{fmtCurrency(calc.payment)}</div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-line bg-cream-100 p-4 text-xs leading-relaxed text-ink-muted">
        <strong className="text-ink">לפי חוק:</strong> צבירה של 1.5 ימים לחודש עד תקרה של 90
        ימים. יום ראשון למחלה ללא תשלום, ימים 2-3 בשיעור 50%, ומיום 4 במלוא השכר. הסכם
        קיבוצי יכול לשפר את התנאים.
      </div>
    </CalcCard>
  );
}
