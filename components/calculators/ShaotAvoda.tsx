'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, fmt } from '@/components/ui/Primitives';

interface Entry { id: number; start: string; end: string; break: number; }

export default function ShaotAvoda() {
  const [entries, setEntries] = useState<Entry[]>([
    { id: 1, start: '08:00', end: '17:00', break: 30 },
  ]);
  const [rate, setRate] = useState<number | ''>(50);

  function diff(e: Entry) {
    const [h1, m1] = e.start.split(':').map(Number);
    const [h2, m2] = e.end.split(':').map(Number);
    let mins = (h2 * 60 + m2) - (h1 * 60 + m1) - e.break;
    if (mins < 0) mins += 24 * 60; // crosses midnight
    return mins / 60;
  }

  const totalHours = entries.reduce((s, e) => s + diff(e), 0);
  // Israeli overtime: after 8.6h per day is 125%, after 10.6h is 150% (simplified daily view)
  const regular = Math.min(totalHours, entries.length * 8.6);
  const overtime125 = Math.max(0, Math.min(totalHours - entries.length * 8.6, entries.length * 2));
  const overtime150 = Math.max(0, totalHours - entries.length * 10.6);
  const pay = regular * Number(rate) + overtime125 * Number(rate) * 1.25 + overtime150 * Number(rate) * 1.5;

  function update(i: number, patch: Partial<Entry>) {
    setEntries((es) => es.map((e, idx) => idx === i ? { ...e, ...patch } : e));
  }
  function add() { setEntries((es) => [...es, { id: Date.now(), start: '09:00', end: '17:00', break: 30 }]); }
  function remove(i: number) { setEntries((es) => es.filter((_, idx) => idx !== i)); }

  return (
    <CalcCard>
      <div className="space-y-3">
        {entries.map((e, i) => (
          <div key={e.id} className="flex flex-wrap items-end gap-3 rounded-xl border border-line bg-cream-100 p-3">
            <div className="flex-1 min-w-[100px]">
              <label className="label-base">התחלה</label>
              <input type="time" value={e.start} onChange={(ev) => update(i, { start: ev.target.value })} className="input-base num" />
            </div>
            <div className="flex-1 min-w-[100px]">
              <label className="label-base">סיום</label>
              <input type="time" value={e.end} onChange={(ev) => update(i, { end: ev.target.value })} className="input-base num" />
            </div>
            <div className="flex-1 min-w-[100px]">
              <label className="label-base">הפסקה (דק׳)</label>
              <input type="number" value={e.break} onChange={(ev) => update(i, { break: parseInt(ev.target.value) || 0 })} className="input-base num" />
            </div>
            <div className="min-w-[80px]">
              <div className="label-base">סה״כ</div>
              <div className="num py-3 font-semibold text-ink">{fmt(diff(e), 2)}ש׳</div>
            </div>
            {entries.length > 1 && (
              <button onClick={() => remove(i)} className="rounded-md border border-line bg-cream-50 px-3 py-2 text-sm text-ink-muted hover:text-red-700">הסר</button>
            )}
          </div>
        ))}
      </div>
      <button onClick={add} className="btn-ghost mt-3">+ הוסף יום</button>
      <div className="mt-6">
        <NumberInput label="שכר לשעה (רגיל)" value={rate} onChange={setRate} prefix="₪" min={0} />
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="סה״כ שעות" v={`${fmt(totalHours, 2)} ש׳`} emphasis />
        <Stat label="רגילות" v={`${fmt(regular, 2)} ש׳`} />
        <Stat label="נוספות 125%" v={`${fmt(overtime125, 2)} ש׳`} />
        <Stat label="נוספות 150%" v={`${fmt(overtime150, 2)} ש׳`} />
        <div className="sm:col-span-2 lg:col-span-4">
          <Stat label="שכר משוער" v={`₪ ${fmt(pay, 0)}`} emphasis />
        </div>
      </div>
    </CalcCard>
  );
}
function Stat({ label, v, emphasis }: { label: string; v: string; emphasis?: boolean }) {
  return <div className={`rounded-xl border p-4 ${emphasis ? 'border-amber/30 bg-amber-wash/40' : 'border-line bg-cream-100'}`}><div className="text-xs font-medium uppercase tracking-wider text-ink-muted">{label}</div><div className={`display-num mt-1 text-lg font-bold ${emphasis ? 'text-amber-ink' : 'text-ink'}`}>{v}</div></div>;
}
