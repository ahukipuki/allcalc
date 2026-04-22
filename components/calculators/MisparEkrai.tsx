'use client';
import { useState } from 'react';
import { CalcCard, NumberInput } from '@/components/ui/Primitives';

export default function MisparEkrai() {
  const [min, setMin] = useState<number | ''>(1);
  const [max, setMax] = useState<number | ''>(100);
  const [result, setResult] = useState<number | null>(null);
  const [count, setCount] = useState<number | ''>(1);
  const [history, setHistory] = useState<number[]>([]);

  function generate() {
    const lo = Number(min), hi = Number(max), n = Math.max(1, Number(count));
    const arr: number[] = [];
    for (let i = 0; i < n; i++) {
      arr.push(Math.floor(Math.random() * (hi - lo + 1)) + lo);
    }
    setResult(arr[0]);
    setHistory(arr);
  }

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-3">
        <NumberInput label="ממספר" value={min} onChange={setMin} />
        <NumberInput label="עד מספר" value={max} onChange={setMax} />
        <NumberInput label="כמה מספרים" value={count} onChange={setCount} min={1} max={100} />
      </div>
      <div className="mt-6 text-center">
        <button onClick={generate} className="btn-primary">
          ✨ הגרל
        </button>
      </div>
      {result !== null && (
        <div className="mt-8 rounded-2xl border border-amber/30 bg-amber-wash/40 p-8 text-center">
          <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">תוצאה</div>
          {history.length === 1 ? (
            <div className="display-num mt-3 text-7xl font-bold text-amber-ink">{result}</div>
          ) : (
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {history.map((n, i) => (
                <span key={i} className="display-num rounded-lg bg-cream-50 px-4 py-2 text-2xl font-bold text-amber-ink">{n}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </CalcCard>
  );
}
