'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, ResultBlock, fmt } from '@/components/ui/Primitives';

export default function PitzuyeyPiturin() {
  const [salary, setSalary] = useState<number | ''>(15000);
  const [years, setYears] = useState<number | ''>(5);
  const [months, setMonths] = useState<number | ''>(0);

  const totalYears = Number(years) + Number(months) / 12;
  const compensation = Number(salary) * totalYears;

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-3">
        <NumberInput label="שכר חודשי אחרון (קובע)" value={salary} onChange={setSalary} prefix="₪" min={0} hint="ברוטו" />
        <NumberInput label="ותק (שנים)" value={years} onChange={setYears} min={0} max={50} />
        <NumberInput label="ותק נוסף (חודשים)" value={months} onChange={setMonths} min={0} max={11} />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <ResultBlock label="פיצויי פיטורים" value={`₪ ${fmt(compensation, 0)}`} emphasis hint="משכורת × שנות ותק" />
        <ResultBlock label="פטור ממס (עד תקרה)" value={`₪ ${fmt(Math.min(compensation, totalYears * 13310), 0)}`} hint="פטור עד תקרה של ₪13,310 לשנה" />
      </div>
      <div className="mt-8 rounded-lg border border-line bg-cream-100 p-4 text-sm leading-relaxed text-ink-muted">
        לפי חוק פיצויי פיטורים, עובד שפוטר זכאי לפיצויים בגובה משכורת אחרונה כפול שנות הותק (כולל חלקי שנה יחסית). אם הופרשו פיצויים לקופת גמל לאורך שנות העבודה, הפיצויים מהקופה מקזזים את החובה של המעסיק.
      </div>
    </CalcCard>
  );
}
