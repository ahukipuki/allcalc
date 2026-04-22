'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, ResultBlock, fmt } from '@/components/ui/Primitives';

export default function Bmi() {
  const [height, setHeight] = useState<number | ''>(170);
  const [weight, setWeight] = useState<number | ''>(70);

  const H = Number(height) / 100;
  const W = Number(weight);
  const bmi = H > 0 ? W / (H * H) : 0;

  let cat = '', color = '#71717A';
  if (bmi > 0 && bmi < 18.5) { cat = 'תת־משקל'; color = '#0EA5E9'; }
  else if (bmi < 25) { cat = 'משקל תקין'; color = '#15803D'; }
  else if (bmi < 30) { cat = 'עודף משקל'; color = '#D97706'; }
  else if (bmi < 35) { cat = 'השמנה דרגה 1'; color = '#DC2626'; }
  else if (bmi < 40) { cat = 'השמנה דרגה 2'; color = '#991B1B'; }
  else if (bmi >= 40) { cat = 'השמנה חולנית'; color = '#7F1D1D'; }

  // Position on scale (15..45)
  const pct = bmi > 0 ? Math.min(100, Math.max(0, ((bmi - 15) / 30) * 100)) : 0;

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-2">
        <NumberInput label="גובה" value={height} onChange={setHeight} suffix="ס״מ" min={50} max={250} />
        <NumberInput label="משקל" value={weight} onChange={setWeight} suffix="ק״ג" min={10} max={300} />
      </div>

      {bmi > 0 && (
        <div className="mt-8">
          <div className="grid gap-4 md:grid-cols-2">
            <ResultBlock label="BMI שלך" value={fmt(bmi, 1)} emphasis hint="ק״ג / מ׳²" />
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: color + '15', border: `1px solid ${color}40` }}
            >
              <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">קטגוריה</div>
              <div className="mt-2 font-display text-2xl font-bold" style={{ color }}>{cat}</div>
            </div>
          </div>

          {/* BMI scale visualization */}
          <div className="mt-8">
            <div className="relative h-3 overflow-hidden rounded-full bg-cream-200">
              <div className="flex h-full">
                <div style={{ width: '11.67%', background: '#0EA5E9' }} />
                <div style={{ width: '21.67%', background: '#15803D' }} />
                <div style={{ width: '16.67%', background: '#D97706' }} />
                <div style={{ width: '16.67%', background: '#DC2626' }} />
                <div style={{ width: '16.67%', background: '#991B1B' }} />
                <div style={{ width: '16.67%', background: '#7F1D1D' }} />
              </div>
              <div
                className="absolute top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-ink shadow-lift"
                style={{ right: `${pct}%` }}
                aria-hidden
              />
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-ink-muted num">
              <span>15</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>35</span>
              <span>40</span>
              <span>45</span>
            </div>
          </div>
        </div>
      )}
      <div className="mt-8 rounded-lg border border-line bg-cream-100 p-4 text-sm leading-relaxed text-ink-muted">
        מדד מסת הגוף (BMI) מחושב לפי הנוסחה: משקל בק״ג חלקי גובה במטר בריבוע. המדד הוא כלי סקר כללי ואינו לוקח בחשבון הרכב גוף (שריר מול שומן), מגדר וגיל. ספורטאים ואנשים מבוגרים עשויים לקבל תוצאה לא מדויקת.
      </div>
    </CalcCard>
  );
}
