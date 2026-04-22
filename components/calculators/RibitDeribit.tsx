'use client';
import { useState, useMemo } from 'react';
import { CalcCard, NumberInput, ResultBlock, fmt } from '@/components/ui/Primitives';

export default function RibitDeribit() {
  const [principal, setPrincipal] = useState<number | ''>(10000);
  const [monthly, setMonthly] = useState<number | ''>(500);
  const [years, setYears] = useState<number | ''>(20);
  const [rate, setRate] = useState<number | ''>(7);

  const r = useMemo(() => {
    const P = Number(principal), C = Number(monthly), Y = Number(years);
    const i = Number(rate) / 100 / 12;
    const n = Y * 12;
    if (!Y) return null;
    const fvP = P * Math.pow(1 + i, n);
    const fvC = i === 0 ? C * n : C * ((Math.pow(1 + i, n) - 1) / i);
    const total = fvP + fvC;
    const contributed = P + C * n;
    return { total, contributed, profit: total - contributed };
  }, [principal, monthly, years, rate]);

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-2">
        <NumberInput label="סכום התחלתי" value={principal} onChange={setPrincipal} prefix="₪" min={0} />
        <NumberInput label="הפקדה חודשית" value={monthly} onChange={setMonthly} prefix="₪" min={0} />
        <NumberInput label="תקופה" value={years} onChange={setYears} suffix="שנים" min={1} max={60} />
        <NumberInput label="ריבית שנתית ממוצעת" value={rate} onChange={setRate} suffix="%" min={-10} max={50} step={0.1} />
      </div>
      {r && (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <ResultBlock label="סכום סופי" value={`₪ ${fmt(r.total, 0)}`} emphasis />
          <ResultBlock label="סך הפקדות" value={`₪ ${fmt(r.contributed, 0)}`} />
          <ResultBlock label="רווח מריבית" value={`₪ ${fmt(r.profit, 0)}`} hint="כוח הריבית הדריבית" />
        </div>
      )}
      <div className="mt-8 rounded-lg border border-line bg-cream-100 p-4 text-sm leading-relaxed text-ink-muted">
        ריבית דריבית היא &ldquo;ריבית על ריבית&rdquo; — בכל תקופה הריבית מצטרפת לקרן ובתקופה הבאה גם היא צוברת ריבית. זוהי אחת התופעות החשובות בעולם ההשקעות לטווח ארוך.
      </div>
    </CalcCard>
  );
}
