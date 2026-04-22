'use client';
import { useState } from 'react';
import { CalcCard, Select, fmt } from '@/components/ui/Primitives';

export default function YemeiAvoda() {
  const [from, setFrom] = useState(() => new Date().toISOString().slice(0, 10));
  const [to, setTo] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 30);
    return d.toISOString().slice(0, 10);
  });
  const [week, setWeek] = useState<'sun_thu' | 'sun_fri' | 'mon_fri'>('sun_thu');

  const f = new Date(from), t = new Date(to);
  let workDays = 0, offDays = 0;
  if (!isNaN(f.getTime()) && !isNaN(t.getTime()) && f <= t) {
    const cursor = new Date(f);
    while (cursor <= t) {
      const day = cursor.getDay(); // 0=Sun..6=Sat
      let isWork = false;
      if (week === 'sun_thu') isWork = day >= 0 && day <= 4; // 5-day
      if (week === 'sun_fri') isWork = day !== 6; // 6-day
      if (week === 'mon_fri') isWork = day >= 1 && day <= 5;
      isWork ? workDays++ : offDays++;
      cursor.setDate(cursor.getDate() + 1);
    }
  }
  const total = workDays + offDays;

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label className="label-base">מתאריך</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="input-base num" />
        </div>
        <div>
          <label className="label-base">עד תאריך</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="input-base num" />
        </div>
        <Select
          label="שבוע עבודה"
          value={week}
          onChange={setWeek}
          options={[
            { value: 'sun_thu', label: 'ראשון–חמישי (5 ימים)' },
            { value: 'sun_fri', label: 'ראשון–שישי (6 ימים)' },
            { value: 'mon_fri', label: 'שני–שישי (חו״ל)' },
          ]}
        />
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Stat label="ימי עבודה" v={fmt(workDays, 0)} emphasis />
        <Stat label="ימי מנוחה" v={fmt(offDays, 0)} />
        <Stat label="סה״כ ימים" v={fmt(total, 0)} />
      </div>
      <p className="mt-4 text-xs text-ink-muted">החישוב לא לוקח בחשבון חגים — יש להפחית ידנית ימי חופשה אם רלוונטי.</p>
    </CalcCard>
  );
}
function Stat({ label, v, emphasis }: { label: string; v: string; emphasis?: boolean }) {
  return <div className={`rounded-xl border p-4 ${emphasis ? 'border-amber/30 bg-amber-wash/40' : 'border-line bg-cream-100'}`}><div className="text-xs font-medium uppercase tracking-wider text-ink-muted">{label}</div><div className={`display-num mt-1 text-xl font-bold ${emphasis ? 'text-amber-ink' : 'text-ink'}`}>{v}</div></div>;
}
