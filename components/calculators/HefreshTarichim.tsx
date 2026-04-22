'use client';
import { useState } from 'react';
import { CalcCard, fmt, niceFmt } from '@/components/ui/Primitives';

export default function HefreshTarichim() {
  const [from, setFrom] = useState(() => new Date().toISOString().slice(0, 10));
  const [to, setTo] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 30);
    return d.toISOString().slice(0, 10);
  });

  const f = new Date(from), t = new Date(to);
  const ms = Math.abs(t.getTime() - f.getTime());
  const days = Math.floor(ms / 86400_000);
  const weeks = days / 7;

  // Years/months/days
  let early = f < t ? f : t;
  let late = f < t ? t : f;
  let years = late.getFullYear() - early.getFullYear();
  let months = late.getMonth() - early.getMonth();
  let rDays = late.getDate() - early.getDate();
  if (rDays < 0) {
    months -= 1;
    const prev = new Date(late.getFullYear(), late.getMonth(), 0);
    rDays += prev.getDate();
  }
  if (months < 0) { years -= 1; months += 12; }

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="label-base">מתאריך</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="input-base num" />
        </div>
        <div>
          <label className="label-base">עד תאריך</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="input-base num" />
        </div>
      </div>
      <div className="mt-8 rounded-2xl border border-amber/30 bg-amber-wash/40 p-6 text-center">
        <div className="display-num text-3xl font-bold text-amber-ink md:text-4xl">
          <span className="num">{years}</span> שנים, <span className="num">{months}</span> חודשים, <span className="num">{rDays}</span> ימים
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="סה״כ ימים" v={fmt(days, 0)} />
        <Stat label="סה״כ שבועות" v={niceFmt(weeks)} />
        <Stat label="סה״כ חודשים" v={fmt(years * 12 + months, 0)} />
      </div>
    </CalcCard>
  );
}
function Stat({ label, v }: { label: string; v: string }) {
  return <div className="rounded-xl border border-line bg-cream-100 p-4"><div className="text-xs font-medium uppercase tracking-wider text-ink-muted">{label}</div><div className="display-num mt-1 text-xl font-semibold text-ink">{v}</div></div>;
}
