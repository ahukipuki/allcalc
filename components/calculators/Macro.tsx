'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, Select, fmt } from '@/components/ui/Primitives';

const GOALS = {
  cut: { p: 0.4, c: 0.35, f: 0.25, label: 'ירידה במשקל' },
  maintain: { p: 0.3, c: 0.4, f: 0.3, label: 'שמירה' },
  bulk: { p: 0.3, c: 0.5, f: 0.2, label: 'עלייה במסה' },
};

export default function Macro() {
  const [calories, setCalories] = useState<number | ''>(2200);
  const [goal, setGoal] = useState<keyof typeof GOALS>('maintain');

  const g = GOALS[goal];
  const C = Number(calories);
  const pG = (C * g.p) / 4;
  const cG = (C * g.c) / 4;
  const fG = (C * g.f) / 9;

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-2">
        <NumberInput label="קלוריות יומיות" value={calories} onChange={setCalories} suffix="קק״ל" min={500} max={6000} />
        <Select
          label="מטרה"
          value={goal}
          onChange={setGoal}
          options={Object.entries(GOALS).map(([k, v]) => ({ value: k as keyof typeof GOALS, label: v.label }))}
        />
      </div>

      {/* Donut-style visualization with a progress bar */}
      <div className="mt-8">
        <div className="overflow-hidden rounded-full border border-line bg-cream-100">
          <div className="flex h-4">
            <div style={{ width: `${g.p * 100}%`, background: '#B45309' }} />
            <div style={{ width: `${g.c * 100}%`, background: '#0F766E' }} />
            <div style={{ width: `${g.f * 100}%`, background: '#1E3A8A' }} />
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <MacroBox label="חלבון" grams={pG} pct={g.p * 100} color="#B45309" />
          <MacroBox label="פחמימות" grams={cG} pct={g.c * 100} color="#0F766E" />
          <MacroBox label="שומן" grams={fG} pct={g.f * 100} color="#1E3A8A" />
        </div>
      </div>
      <div className="mt-8 rounded-lg border border-line bg-cream-100 p-4 text-sm leading-relaxed text-ink-muted">
        חישוב קלוריות לגרם: חלבון ופחמימות 4 קק״ל/גרם, שומן 9 קק״ל/גרם. החלוקה משתנה לפי מטרה. בתזונה לירידה במשקל מומלץ חלבון גבוה יותר לשמירה על מסת שריר.
      </div>
    </CalcCard>
  );
}

function MacroBox({ label, grams, pct, color }: { label: string; grams: number; pct: number; color: string }) {
  return (
    <div className="rounded-xl border border-line bg-cream-50 p-4">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full" style={{ background: color }} />
        <span className="text-sm font-medium text-ink-soft">{label}</span>
      </div>
      <div className="display-num mt-2 text-2xl font-bold text-ink">{fmt(grams, 0)} גרם</div>
      <div className="text-xs text-ink-muted">{fmt(pct, 0)}% מהקלוריות</div>
    </div>
  );
}
