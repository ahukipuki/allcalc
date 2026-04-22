'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, fmt } from '@/components/ui/Primitives';

const ZONES = [
  { name: 'אזור 1 — חימום', min: 0.5, max: 0.6, desc: 'התאוששות קלה', color: '#0EA5E9' },
  { name: 'אזור 2 — שריפת שומנים', min: 0.6, max: 0.7, desc: 'אימון שריפת שומן ארוך', color: '#14B8A6' },
  { name: 'אזור 3 — אירובי', min: 0.7, max: 0.8, desc: 'שיפור סיבולת לב־ריאה', color: '#15803D' },
  { name: 'אזור 4 — אנאירובי', min: 0.8, max: 0.9, desc: 'שיפור ביצועים', color: '#D97706' },
  { name: 'אזור 5 — מקסימלי', min: 0.9, max: 1.0, desc: 'עצימות גבוהה מאוד — זמן קצר', color: '#DC2626' },
];

export default function Dofek() {
  const [age, setAge] = useState<number | ''>(30);
  const maxHr = 220 - Number(age);

  return (
    <CalcCard>
      <NumberInput label="גיל" value={age} onChange={setAge} suffix="שנים" min={10} max={100} />
      <div className="mt-6 rounded-xl border border-amber/30 bg-amber-wash/40 p-5">
        <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">דופק מקסימלי</div>
        <div className="display-num mt-2 text-3xl font-bold text-amber-ink">{maxHr} פעימות/דקה</div>
        <div className="mt-1 text-xs text-ink-muted">לפי נוסחת 220 − גיל</div>
      </div>

      <div className="mt-6 space-y-2">
        {ZONES.map((z) => (
          <div
            key={z.name}
            className="flex items-center justify-between rounded-lg border border-line bg-cream-50 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-1.5 rounded-full" style={{ background: z.color }} />
              <div>
                <div className="font-medium text-ink">{z.name}</div>
                <div className="text-xs text-ink-muted">{z.desc}</div>
              </div>
            </div>
            <div className="num text-sm font-medium text-ink-soft">
              {fmt(maxHr * z.min, 0)}–{fmt(maxHr * z.max, 0)} פעימות
            </div>
          </div>
        ))}
      </div>
    </CalcCard>
  );
}
