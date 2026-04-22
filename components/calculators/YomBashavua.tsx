'use client';
import { useState } from 'react';
import { CalcCard } from '@/components/ui/Primitives';

const DAYS = ['יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'יום שישי', 'שבת'];

export default function YomBashavua() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const d = new Date(date + 'T12:00:00');
  const dow = isNaN(d.getTime()) ? -1 : d.getDay();
  const dayName = dow >= 0 ? DAYS[dow] : '—';
  const formatted = isNaN(d.getTime()) ? '' : d.toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <CalcCard>
      <div>
        <label className="label-base">בחר תאריך</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-base num" />
      </div>
      {dow >= 0 && (
        <div className="mt-8 rounded-2xl border border-amber/30 bg-amber-wash/40 p-8 text-center">
          <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">{formatted}</div>
          <div className="display-num mt-3 text-5xl font-bold text-amber-ink md:text-6xl">{dayName}</div>
        </div>
      )}
    </CalcCard>
  );
}
