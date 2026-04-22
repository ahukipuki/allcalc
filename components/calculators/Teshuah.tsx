'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, ResultBlock, fmt } from '@/components/ui/Primitives';

export default function Teshuah() {
  const [invested, setInvested] = useState<number | ''>(10000);
  const [final, setFinal] = useState<number | ''>(15000);
  const [years, setYears] = useState<number | ''>(3);

  const I = Number(invested), F = Number(final), Y = Number(years);
  const profit = F - I;
  const roi = I > 0 ? (profit / I) * 100 : 0;
  const annualized = I > 0 && Y > 0 ? (Math.pow(F / I, 1 / Y) - 1) * 100 : 0;

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-3">
        <NumberInput label="סכום השקעה" value={invested} onChange={setInvested} prefix="₪" min={0} />
        <NumberInput label="ערך נוכחי" value={final} onChange={setFinal} prefix="₪" min={0} />
        <NumberInput label="תקופת ההשקעה" value={years} onChange={setYears} suffix="שנים" min={0.1} step={0.5} />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <ResultBlock label="רווח נטו" value={`₪ ${fmt(profit, 0)}`} />
        <ResultBlock label="תשואה כוללת" value={`${fmt(roi, 2)}%`} emphasis />
        <ResultBlock label="תשואה שנתית ממוצעת" value={`${fmt(annualized, 2)}%`} hint="CAGR" />
      </div>
      <div className="mt-8 rounded-lg border border-line bg-cream-100 p-4 text-sm leading-relaxed text-ink-muted">
        תשואה שנתית ממוצעת (CAGR) מחושבת לפי הנוסחה (V_סופי / V_התחלתי)^(1/שנים) − 1, ומשקפת את שיעור הצמיחה השנתי הקבוע שהיה מביא לאותה תוצאה.
      </div>
    </CalcCard>
  );
}
