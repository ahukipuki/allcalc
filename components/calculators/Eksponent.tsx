'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, ResultBlock, fmt, niceFmt } from '@/components/ui/Primitives';

export default function Eksponent() {
  const [base, setBase] = useState<number | ''>(2);
  const [exp, setExp] = useState<number | ''>(10);

  const result = Math.pow(Number(base), Number(exp));

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-2">
        <NumberInput label="בסיס" value={base} onChange={setBase} step={0.1} />
        <NumberInput label="מעריך" value={exp} onChange={setExp} step={0.1} />
      </div>
      <div className="mt-8">
        <ResultBlock
          label={`${base} בחזקת ${exp}`}
          value={isFinite(result) ? niceFmt(result) : '∞'}
          emphasis
        />
      </div>
      <div className="mt-4 text-center text-3xl font-display text-ink">
        {String(base)}<sup className="text-lg">{String(exp)}</sup> = <span className="num">{isFinite(result) ? niceFmt(result) : '∞'}</span>
      </div>
    </CalcCard>
  );
}
