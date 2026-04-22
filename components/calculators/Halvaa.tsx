'use client';
import { useState, useMemo } from 'react';
import { CalcCard, NumberInput, ResultBlock, fmt } from '@/components/ui/Primitives';

export default function Halvaa() {
  const [amount, setAmount] = useState<number | ''>(50000);
  const [months, setMonths] = useState<number | ''>(60);
  const [rate, setRate] = useState<number | ''>(7);

  const r = useMemo(() => {
    const P = Number(amount), n = Number(months), i = Number(rate) / 100 / 12;
    if (!P || !n) return null;
    const m = i === 0 ? P / n : (P * i) / (1 - Math.pow(1 + i, -n));
    return { monthly: m, total: m * n, interest: m * n - P };
  }, [amount, months, rate]);

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-3">
        <NumberInput label="סכום ההלוואה" value={amount} onChange={setAmount} prefix="₪" min={0} />
        <NumberInput label="מספר תשלומים" value={months} onChange={setMonths} suffix="חודשים" min={1} max={360} />
        <NumberInput label="ריבית שנתית" value={rate} onChange={setRate} suffix="%" min={0} max={50} step={0.1} />
      </div>
      {r && (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <ResultBlock label="תשלום חודשי" value={`₪ ${fmt(r.monthly, 0)}`} emphasis />
          <ResultBlock label="סך הריבית" value={`₪ ${fmt(r.interest, 0)}`} />
          <ResultBlock label="עלות כוללת" value={`₪ ${fmt(r.total, 0)}`} />
        </div>
      )}
      <div className="mt-8 rounded-lg border border-line bg-cream-100 p-4 text-sm leading-relaxed text-ink-muted">
        החישוב מבוסס על ריבית קבועה ולוח שפיצר (תשלום חודשי קבוע). שימו לב לעמלות נוספות שבנקים גובים על הלוואה (עמלת פתיחת תיק, ביטוחים) שאינן כלולות כאן.
      </div>
    </CalcCard>
  );
}
