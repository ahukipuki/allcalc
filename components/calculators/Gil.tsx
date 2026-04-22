'use client';
import { useState, useEffect } from 'react';
import { CalcCard, fmt } from '@/components/ui/Primitives';

export default function Gil() {
  const [dob, setDob] = useState('1990-01-01');
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const birth = new Date(dob);
  const valid = !isNaN(birth.getTime()) && birth < now;

  let years = 0, months = 0, days = 0;
  if (valid) {
    years = now.getFullYear() - birth.getFullYear();
    months = now.getMonth() - birth.getMonth();
    days = now.getDate() - birth.getDate();
    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) { years -= 1; months += 12; }
  }

  const totalMs = valid ? now.getTime() - birth.getTime() : 0;
  const totalDays = Math.floor(totalMs / 86400_000);
  const totalHours = Math.floor(totalMs / 3600_000);
  const totalMinutes = Math.floor(totalMs / 60000);
  const totalSeconds = Math.floor(totalMs / 1000);

  // Next birthday
  let nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBday < now) nextBday = new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate());
  const daysToBday = Math.ceil((nextBday.getTime() - now.getTime()) / 86400_000);

  return (
    <CalcCard>
      <div>
        <label className="label-base">תאריך לידה</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="input-base num"
          max={new Date().toISOString().slice(0, 10)}
        />
      </div>

      {valid && (
        <>
          <div className="mt-8 rounded-2xl border border-amber/30 bg-amber-wash/40 p-6 text-center">
            <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">הגיל שלך</div>
            <div className="display-num mt-3 text-4xl font-bold text-amber-ink md:text-5xl">
              <span className="num">{years}</span> שנים, <span className="num">{months}</span> חודשים ו־<span className="num">{days}</span> ימים
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Tick label="בחודשים" v={fmt(years * 12 + months, 0)} />
            <Tick label="בימים" v={fmt(totalDays, 0)} />
            <Tick label="בשעות" v={fmt(totalHours, 0)} />
            <Tick label="בדקות" v={fmt(totalMinutes, 0)} />
            <Tick label="בשניות" v={fmt(totalSeconds, 0)} mono />
            <Tick label="יום הולדת הבא" v={`בעוד ${daysToBday} ימים`} />
          </div>
        </>
      )}
    </CalcCard>
  );
}

function Tick({ label, v, mono }: { label: string; v: string; mono?: boolean }) {
  return (
    <div className="rounded-xl border border-line bg-cream-100 p-4">
      <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">{label}</div>
      <div className={`mt-1 font-semibold text-ink ${mono ? 'font-mono text-sm' : 'font-display text-xl'}`}>{v}</div>
    </div>
  );
}
