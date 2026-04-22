'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, ResultBlock, fmt } from '@/components/ui/Primitives';

export default function Pikadon() {
  const [amount, setAmount] = useState<number | ''>(50000);
  const [months, setMonths] = useState<number | ''>(12);
  const [rate, setRate] = useState<number | ''>(4);

  const A = Number(amount), n = Number(months);
  const i = Number(rate) / 100;
  const total = A * Math.pow(1 + i, n / 12);
  const profit = total - A;

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-3">
        <NumberInput label="סכום הפיקדון" value={amount} onChange={setAmount} prefix="₪" min={0} />
        <NumberInput label="תקופה" value={months} onChange={setMonths} suffix="חודשים" min={1} max={120} />
        <NumberInput label="ריבית שנתית" value={rate} onChange={setRate} suffix="%" min={0} max={20} step={0.05} />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <ResultBlock label="סכום פדיון" value={`₪ ${fmt(total, 2)}`} emphasis />
        <ResultBlock label="ריבית שנצברה" value={`₪ ${fmt(profit, 2)}`} />
        <ResultBlock label="תשואה כוללת" value={`${fmt((profit / A) * 100, 2)}%`} />
      </div>
      <div className="mt-8 rounded-lg border border-line bg-cream-100 p-4 text-sm leading-relaxed text-ink-muted">
        החישוב מבוסס על ריבית מצטברת. שימו לב שעל הרווחים מפיקדון בנקאי בישראל יש מס רווחי הון של 25% (לא נכלל בחישוב).
      </div>
    </CalcCard>
  );
}
