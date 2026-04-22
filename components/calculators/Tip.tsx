'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, ResultBlock, fmt } from '@/components/ui/Primitives';

export default function Tip() {
  const [bill, setBill] = useState<number | ''>(200);
  const [tipPct, setTipPct] = useState<number | ''>(12);
  const [people, setPeople] = useState<number | ''>(2);

  const B = Number(bill), T = Number(tipPct) / 100, P = Number(people);
  const tip = B * T;
  const total = B + tip;
  const perPerson = P > 0 ? total / P : 0;

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-3">
        <NumberInput label="סכום החשבון" value={bill} onChange={setBill} prefix="₪" min={0} />
        <NumberInput label="אחוז טיפ" value={tipPct} onChange={setTipPct} suffix="%" min={0} max={100} hint="בישראל מקובל 10%–15%" />
        <NumberInput label="מספר סועדים" value={people} onChange={setPeople} min={1} max={50} />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <ResultBlock label="סכום הטיפ" value={`₪ ${fmt(tip, 2)}`} />
        <ResultBlock label="סך הכל לתשלום" value={`₪ ${fmt(total, 2)}`} emphasis />
        <ResultBlock label="לכל סועד" value={`₪ ${fmt(perPerson, 2)}`} hint={`${P} סועדים`} />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {[10, 12, 15, 18, 20].map((p) => (
          <button
            key={p}
            onClick={() => setTipPct(p)}
            className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
              tipPct === p
                ? 'border-amber bg-amber-wash text-amber-ink'
                : 'border-line bg-cream-100 text-ink-soft hover:bg-cream-200'
            }`}
          >
            {p}%
          </button>
        ))}
      </div>
    </CalcCard>
  );
}
