'use client';
import { useState } from 'react';
import { CalcCard, fmt, niceFmt } from '@/components/ui/Primitives';

export default function Memutza() {
  const [input, setInput] = useState('5, 8, 12, 3, 7, 10, 5, 9');

  const nums = input
    .split(/[,\s\n]+/)
    .map((s) => parseFloat(s))
    .filter((n) => !isNaN(n));

  const n = nums.length;
  const sum = nums.reduce((a, b) => a + b, 0);
  const mean = n ? sum / n : 0;
  const sorted = [...nums].sort((a, b) => a - b);
  const median = n === 0 ? 0 : n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;

  const freq: Record<number, number> = {};
  nums.forEach((x) => (freq[x] = (freq[x] || 0) + 1));
  const maxF = Math.max(...Object.values(freq), 0);
  const modes = Object.entries(freq).filter(([, f]) => f === maxF).map(([v]) => v);

  const variance = n ? nums.reduce((a, b) => a + (b - mean) ** 2, 0) / n : 0;
  const stddev = Math.sqrt(variance);
  const range = n ? sorted[n - 1] - sorted[0] : 0;

  return (
    <CalcCard>
      <label className="label-base">הזן מספרים מופרדים בפסיק או רווח</label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input-base num min-h-[100px] resize-none"
        rows={3}
      />
      <div className="mt-2 text-xs text-ink-muted">{n} ערכים</div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label="ממוצע" value={niceFmt(mean)} emphasis />
        <Stat label="חציון" value={niceFmt(median)} />
        <Stat label="שכיח" value={maxF > 1 && modes.length <= 3 ? modes.join(', ') : '—'} />
        <Stat label="סכום" value={niceFmt(sum)} />
        <Stat label="סטיית תקן" value={niceFmt(stddev)} />
        <Stat label="טווח" value={niceFmt(range)} />
      </div>
    </CalcCard>
  );
}

function Stat({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${emphasis ? 'border-amber/30 bg-amber-wash/40' : 'border-line bg-cream-100'}`}>
      <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">{label}</div>
      <div className={`display-num mt-1 text-xl font-bold ${emphasis ? 'text-amber-ink' : 'text-ink'}`}>{value}</div>
    </div>
  );
}
