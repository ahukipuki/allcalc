'use client';
import { useState, useEffect } from 'react';
import { CalcCard } from '@/components/ui/Primitives';

export default function SefirahLeachor() {
  const [target, setTarget] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().slice(0, 10);
  });
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const goal = new Date(target + 'T00:00:00');
  const diff = goal.getTime() - now.getTime();
  const passed = diff <= 0;

  const d = Math.abs(Math.floor(diff / 86400_000));
  const h = Math.abs(Math.floor((diff / 3600_000) % 24));
  const m = Math.abs(Math.floor((diff / 60000) % 60));
  const s = Math.abs(Math.floor((diff / 1000) % 60));

  return (
    <CalcCard>
      <div>
        <label className="label-base">תאריך יעד</label>
        <input type="date" value={target} onChange={(e) => setTarget(e.target.value)} className="input-base num" />
      </div>
      <div className="mt-8 rounded-2xl border border-amber/30 bg-amber-wash/40 p-8 text-center">
        <div className="mb-4 text-xs font-medium uppercase tracking-wider text-ink-muted">
          {passed ? 'עבר מאז:' : 'נותר עד:'}
        </div>
        <div className="grid grid-cols-4 gap-3">
          <Seg v={d} label="ימים" />
          <Seg v={h} label="שעות" />
          <Seg v={m} label="דקות" />
          <Seg v={s} label="שניות" />
        </div>
      </div>
    </CalcCard>
  );
}

function Seg({ v, label }: { v: number; label: string }) {
  return (
    <div className="rounded-xl bg-cream-50 p-3 shadow-soft">
      <div className="display-num text-4xl font-bold text-ink md:text-5xl">{String(v).padStart(2, '0')}</div>
      <div className="mt-1 text-xs text-ink-muted">{label}</div>
    </div>
  );
}
