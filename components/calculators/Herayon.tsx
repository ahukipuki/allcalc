'use client';
import { useState } from 'react';
import { CalcCard, ResultBlock, fmt } from '@/components/ui/Primitives';

export default function Herayon() {
  const [lmp, setLmp] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 70);
    return d.toISOString().slice(0, 10);
  });

  const lmpDate = new Date(lmp);
  const due = new Date(lmpDate.getTime() + 280 * 86400_000); // 40 weeks
  const today = new Date();
  today.setHours(0,0,0,0);
  const daysElapsed = Math.floor((today.getTime() - lmpDate.getTime()) / 86400_000);
  const week = Math.floor(daysElapsed / 7);
  const day = daysElapsed % 7;
  const daysUntilDue = Math.floor((due.getTime() - today.getTime()) / 86400_000);
  const trimester = week < 14 ? 1 : week < 28 ? 2 : 3;

  return (
    <CalcCard>
      <div>
        <label className="label-base">תאריך תחילת הווסת האחרונה</label>
        <input
          type="date"
          value={lmp}
          onChange={(e) => setLmp(e.target.value)}
          className="input-base num"
          max={new Date().toISOString().slice(0, 10)}
        />
      </div>
      {daysElapsed > 0 && daysElapsed < 300 && (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <ResultBlock
            label="שבוע הריון"
            value={`${week} + ${day}`}
            emphasis
            hint="שבוע + ימים"
          />
          <ResultBlock label="טרימסטר" value={`${trimester}`} hint={trimester === 1 ? 'ראשון' : trimester === 2 ? 'שני' : 'שלישי'} />
          <ResultBlock label="תאריך לידה משוער" value={due.toLocaleDateString('he-IL')} hint={`עוד ${daysUntilDue} ימים`} />
        </div>
      )}
      <div className="mt-8 rounded-lg border border-line bg-cream-100 p-4 text-sm leading-relaxed text-ink-muted">
        תאריך הלידה המשוער מחושב לפי כלל Naegele — תאריך הווסת האחרונה + 280 ימים (40 שבועות). שימו לב שרק כ־5% מהלידות מתרחשות בדיוק בתאריך המשוער; הטווח הנורמלי הוא בין שבוע 37 לשבוע 42.
      </div>
    </CalcCard>
  );
}
