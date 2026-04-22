'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, fmt, niceFmt } from '@/components/ui/Primitives';

export default function MishvaaRivuit() {
  const [a, setA] = useState<number | ''>(1);
  const [b, setB] = useState<number | ''>(-5);
  const [c, setC] = useState<number | ''>(6);

  const A = Number(a), B = Number(b), C = Number(c);
  const disc = B * B - 4 * A * C;
  let sol = '';
  let x1 = '', x2 = '';
  if (A === 0) {
    sol = 'זו אינה משוואה ריבועית (a ≠ 0)';
  } else if (disc > 0) {
    x1 = niceFmt((-B + Math.sqrt(disc)) / (2 * A));
    x2 = niceFmt((-B - Math.sqrt(disc)) / (2 * A));
    sol = 'שני פתרונות ממשיים';
  } else if (disc === 0) {
    x1 = x2 = niceFmt(-B / (2 * A));
    sol = 'פתרון ממשי יחיד (כפול)';
  } else {
    const re = niceFmt(-B / (2 * A));
    const im = niceFmt(Math.sqrt(-disc) / (2 * A));
    x1 = `${re} + ${im}i`;
    x2 = `${re} − ${im}i`;
    sol = 'פתרונות מרוכבים';
  }

  return (
    <CalcCard>
      <p className="mb-4 text-center font-display text-2xl text-ink-soft">ax² + bx + c = 0</p>
      <div className="grid gap-5 md:grid-cols-3">
        <NumberInput label="a" value={a} onChange={setA} step={0.1} />
        <NumberInput label="b" value={b} onChange={setB} step={0.1} />
        <NumberInput label="c" value={c} onChange={setC} step={0.1} />
      </div>
      <div className="mt-8 space-y-3">
        <div className="rounded-xl border border-amber/30 bg-amber-wash/40 p-5">
          <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">{sol}</div>
          {A !== 0 && (
            <div className="mt-2 space-y-1 font-display text-xl text-amber-ink">
              <div>x₁ = <span className="num">{x1}</span></div>
              <div>x₂ = <span className="num">{x2}</span></div>
            </div>
          )}
        </div>
        <div className="text-sm text-ink-muted">
          דיסקרימיננטה: <span className="num font-medium text-ink">Δ = b² − 4ac = {niceFmt(disc)}</span>
        </div>
      </div>
    </CalcCard>
  );
}
