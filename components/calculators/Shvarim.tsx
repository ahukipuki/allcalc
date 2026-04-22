'use client';
import { useState } from 'react';
import { CalcCard, Select, fmt, niceFmt } from '@/components/ui/Primitives';

function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}
function simplify(n: number, d: number): [number, number] {
  if (d === 0) return [NaN, 0];
  const g = gcd(n, d) || 1;
  const sign = d < 0 ? -1 : 1;
  return [(n / g) * sign, Math.abs(d / g)];
}

export default function Shvarim() {
  const [a, setA] = useState('1');
  const [b, setB] = useState('2');
  const [c, setC] = useState('1');
  const [d, setD] = useState('3');
  const [op, setOp] = useState<'+' | '−' | '×' | '÷'>('+');

  const A = parseInt(a) || 0, B = parseInt(b) || 1;
  const C = parseInt(c) || 0, D = parseInt(d) || 1;
  let resN = 0, resD = 1;
  if (op === '+') { resN = A * D + C * B; resD = B * D; }
  if (op === '−') { resN = A * D - C * B; resD = B * D; }
  if (op === '×') { resN = A * C; resD = B * D; }
  if (op === '÷') { resN = A * D; resD = B * C; }
  const [sn, sd] = simplify(resN, resD);
  const decimal = sd ? sn / sd : NaN;

  return (
    <CalcCard>
      <div className="flex flex-col items-center gap-4">
        <Fraction num={a} den={b} onNum={setA} onDen={setB} />
        <Select
          value={op}
          onChange={(v) => setOp(v as any)}
          options={[
            { value: '+', label: '+  חיבור' },
            { value: '−', label: '−  חיסור' },
            { value: '×', label: '×  כפל' },
            { value: '÷', label: '÷  חילוק' },
          ]}
        />
        <Fraction num={c} den={d} onNum={setC} onDen={setD} />
        <div className="mt-6 text-4xl font-display text-ink-muted">=</div>
        <div className="rounded-xl border border-amber/30 bg-amber-wash/40 px-8 py-6 text-center">
          {isNaN(sn) ? (
            <div className="font-display text-3xl font-bold text-amber-ink">לא מוגדר</div>
          ) : (
            <>
              <div className="flex flex-col items-center leading-none">
                <span className="display-num text-4xl font-bold text-amber-ink">{sn}</span>
                <span className="my-1 h-0.5 w-16 bg-amber-ink" />
                <span className="display-num text-4xl font-bold text-amber-ink">{sd}</span>
              </div>
              <div className="mt-3 text-xs text-ink-muted">≈ {niceFmt(decimal)}</div>
            </>
          )}
        </div>
      </div>
    </CalcCard>
  );
}

function Fraction({ num, den, onNum, onDen }: { num: string; den: string; onNum: (s: string) => void; onDen: (s: string) => void }) {
  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        inputMode="numeric"
        value={num}
        onChange={(e) => onNum(e.target.value.replace(/[^\d\-]/g, ''))}
        className="input-base num w-24 text-center text-2xl"
      />
      <span className="my-1 h-0.5 w-20 bg-ink" />
      <input
        type="text"
        inputMode="numeric"
        value={den}
        onChange={(e) => onDen(e.target.value.replace(/[^\d\-]/g, ''))}
        className="input-base num w-24 text-center text-2xl"
      />
    </div>
  );
}
