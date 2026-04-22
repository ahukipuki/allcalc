'use client';
import { useState } from 'react';
import { CalcCard, fmt } from '@/components/ui/Primitives';

interface Row { id: number; name: string; grade: string; weight: string; }

export default function TziyunMemutza() {
  const [rows, setRows] = useState<Row[]>([
    { id: 1, name: 'מתמטיקה', grade: '85', weight: '5' },
    { id: 2, name: 'אנגלית', grade: '92', weight: '4' },
    { id: 3, name: 'היסטוריה', grade: '78', weight: '2' },
  ]);

  const sumW = rows.reduce((s, r) => s + (parseFloat(r.weight) || 0), 0);
  const sumGW = rows.reduce((s, r) => s + (parseFloat(r.grade) || 0) * (parseFloat(r.weight) || 0), 0);
  const avg = sumW > 0 ? sumGW / sumW : 0;

  function update(i: number, patch: Partial<Row>) {
    setRows((rs) => rs.map((r, idx) => idx === i ? { ...r, ...patch } : r));
  }
  function add() { setRows((rs) => [...rs, { id: Date.now(), name: '', grade: '', weight: '1' }]); }
  function remove(i: number) { setRows((rs) => rs.filter((_, idx) => idx !== i)); }

  return (
    <CalcCard>
      <div className="space-y-2">
        <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_auto] gap-2 text-xs font-medium text-ink-muted">
          <div>שם המקצוע</div><div>ציון</div><div>יחידות / נ״ז</div><div></div>
        </div>
        {rows.map((r, i) => (
          <div key={r.id} className="grid gap-2 md:grid-cols-[2fr_1fr_1fr_auto]">
            <input value={r.name} onChange={(e) => update(i, { name: e.target.value })} placeholder="מקצוע" className="input-base" />
            <input inputMode="decimal" value={r.grade} onChange={(e) => update(i, { grade: e.target.value.replace(/[^\d.]/g, '') })} placeholder="ציון" className="input-base num" />
            <input inputMode="decimal" value={r.weight} onChange={(e) => update(i, { weight: e.target.value.replace(/[^\d.]/g, '') })} placeholder="משקל" className="input-base num" />
            {rows.length > 1 && <button onClick={() => remove(i)} className="rounded-md border border-line bg-cream-50 px-3 text-sm text-ink-muted hover:text-red-700">×</button>}
          </div>
        ))}
      </div>
      <button onClick={add} className="btn-ghost mt-3">+ הוסף מקצוע</button>
      <div className="mt-8 rounded-2xl border border-amber/30 bg-amber-wash/40 p-6 text-center">
        <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">ממוצע משוקלל</div>
        <div className="display-num mt-2 text-5xl font-bold text-amber-ink">{fmt(avg, 2)}</div>
      </div>
    </CalcCard>
  );
}
