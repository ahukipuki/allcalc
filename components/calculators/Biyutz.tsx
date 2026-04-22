'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, ResultBlock } from '@/components/ui/Primitives';

export default function Biyutz() {
  const [lastPeriod, setLastPeriod] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() - 5); return d.toISOString().slice(0, 10);
  });
  const [cycle, setCycle] = useState<number | ''>(28);

  const start = new Date(lastPeriod);
  const ovulation = new Date(start.getTime() + (Number(cycle) - 14) * 86400_000);
  const fertileStart = new Date(ovulation.getTime() - 5 * 86400_000);
  const fertileEnd = new Date(ovulation.getTime() + 1 * 86400_000);
  const nextPeriod = new Date(start.getTime() + Number(cycle) * 86400_000);
  const f = (d: Date) => d.toLocaleDateString('he-IL');

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="label-base">יום ראשון של הווסת האחרונה</label>
          <input
            type="date"
            value={lastPeriod}
            onChange={(e) => setLastPeriod(e.target.value)}
            className="input-base num"
          />
        </div>
        <NumberInput label="אורך המחזור" value={cycle} onChange={setCycle} suffix="ימים" min={20} max={45} hint="בדרך כלל 26-32 ימים" />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <ResultBlock label="יום הביוץ המשוער" value={f(ovulation)} emphasis />
        <ResultBlock label="חלון פוריות" value={`${f(fertileStart)} — ${f(fertileEnd)}`} hint="הסיכוי להרות הכי גבוה" />
        <ResultBlock label="תחילת המחזור הבא" value={f(nextPeriod)} />
      </div>
      <div className="mt-8 rounded-lg border border-line bg-cream-100 p-4 text-sm leading-relaxed text-ink-muted">
        הביוץ מתרחש בדרך כלל כ־14 ימים לפני תחילת המחזור הבא. חלון הפוריות נמשך כ־6 ימים — 5 ימים לפני הביוץ ויום אחד אחריו. החישוב מהווה הערכה סטטיסטית ואינו תחליף למעקב רפואי.
      </div>
    </CalcCard>
  );
}
