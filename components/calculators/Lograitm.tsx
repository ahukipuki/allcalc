'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, fmt, niceFmt } from '@/components/ui/Primitives';

export default function Lograitm() {
  const [num, setNum] = useState<number | ''>(1000);
  const [base, setBase] = useState<number | ''>(10);

  const N = Number(num), B = Number(base);
  const result = N > 0 && B > 0 && B !== 1 ? Math.log(N) / Math.log(B) : NaN;
  const ln = N > 0 ? Math.log(N) : NaN;
  const log10 = N > 0 ? Math.log10(N) : NaN;
  const log2 = N > 0 ? Math.log2(N) : NaN;

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-2">
        <NumberInput label="המספר (x)" value={num} onChange={setNum} min={0.000001} step={1} />
        <NumberInput label="בסיס (b)" value={base} onChange={setBase} min={0.01} step={1} />
      </div>
      <div className="mt-6 rounded-xl border border-amber/30 bg-amber-wash/40 p-5 text-center">
        <div className="font-display text-2xl text-amber-ink">
          log<sub className="num text-base">{base}</sub>({num}) = <span className="num">{isNaN(result) ? '—' : niceFmt(result)}</span>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Box label="ln (טבעי)" v={ln} />
        <Box label="log₁₀" v={log10} />
        <Box label="log₂" v={log2} />
      </div>
    </CalcCard>
  );
}
function Box({ label, v }: { label: string; v: number }) {
  return (
    <div className="rounded-xl border border-line bg-cream-100 p-4">
      <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">{label}</div>
      <div className="display-num mt-1 text-lg font-semibold text-ink">{isNaN(v) ? '—' : niceFmt(v)}</div>
    </div>
  );
}
