'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, ResultBlock, fmt, niceFmt } from '@/components/ui/Primitives';

export default function Yachas() {
  const [a, setA] = useState<number | ''>(3);
  const [b, setB] = useState<number | ''>(4);
  const [c, setC] = useState<number | ''>(12);

  const A = Number(a), B = Number(b), C = Number(c);
  const d = A === 0 ? 0 : (B * C) / A;

  return (
    <CalcCard>
      <p className="mb-4 text-sm text-ink-muted">פתרון פרופורציה: A/B = C/D — מה הערך של D?</p>
      <div className="grid gap-5 md:grid-cols-3">
        <NumberInput label="A" value={a} onChange={setA} />
        <NumberInput label="B" value={b} onChange={setB} />
        <NumberInput label="C" value={c} onChange={setC} />
      </div>
      <div className="mt-8">
        <ResultBlock label="D =" value={niceFmt(d)} emphasis hint={`${A} × D = ${B} × ${C}`} />
      </div>
    </CalcCard>
  );
}
