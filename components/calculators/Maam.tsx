'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, ResultBlock, Tabs, fmt } from '@/components/ui/Primitives';

const RATE = 17; // Israel VAT %

export default function Maam() {
  const [mode, setMode] = useState('add');
  const [amount, setAmount] = useState<number | ''>(1000);
  const [rate, setRate] = useState<number | ''>(RATE);

  const A = Number(amount);
  const R = Number(rate) / 100;
  let preMaam = 0, vat = 0, withMaam = 0;

  if (mode === 'add') {
    preMaam = A;
    vat = A * R;
    withMaam = A + vat;
  } else {
    withMaam = A;
    preMaam = A / (1 + R);
    vat = A - preMaam;
  }

  return (
    <CalcCard>
      <Tabs
        active={mode}
        onChange={setMode}
        tabs={[
          { id: 'add', label: 'הוספת מע״מ למחיר' },
          { id: 'extract', label: 'הפחתת מע״מ ממחיר' },
        ]}
      />
      <div className="grid gap-5 md:grid-cols-2">
        <NumberInput
          label={mode === 'add' ? 'סכום לפני מע״מ' : 'סכום כולל מע״מ'}
          value={amount}
          onChange={setAmount}
          prefix="₪"
          min={0}
        />
        <NumberInput label="שיעור מע״מ" value={rate} onChange={setRate} suffix="%" min={0} max={50} step={0.5} hint="שיעור המע״מ בישראל הוא 17%" />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <ResultBlock label="לפני מע״מ" value={`₪ ${fmt(preMaam, 2)}`} />
        <ResultBlock label="מע״מ" value={`₪ ${fmt(vat, 2)}`} emphasis />
        <ResultBlock label="כולל מע״מ" value={`₪ ${fmt(withMaam, 2)}`} />
      </div>
      <div className="mt-8 rounded-lg border border-line bg-cream-100 p-4 text-sm leading-relaxed text-ink-muted">
        מס ערך מוסף (מע״מ) הוא מס עקיף שמוטל על מרבית המוצרים והשירותים בישראל. השיעור הסטנדרטי כיום הוא 17%. שירותים מסוימים פטורים (כמו פירות וירקות טריים), ועסקאות מסוימות מחויבות בשיעור 0%.
      </div>
    </CalcCard>
  );
}
