'use client';

import { useState, useMemo } from 'react';
import { CalcCard, NumberInput, fmt, fmtCurrency } from '@/components/ui/Primitives';

// Update annually (usually April). Source: משרד העבודה
const MONTHLY_FULL_TIME = 6245; // שכר מינימום חודשי (2026)
const HOURS_PER_MONTH_STANDARD = 182; // שעות חודשיות לפי חוק (42 שעות שבוע × 4.33)

// Youth minimum wage (percentage of adult minimum)
const YOUTH_RATES = {
  under16: 0.7,   // 70% — עד גיל 16
  age16_17: 0.75, // 75% — 16-17
  age17_18: 0.83, // 83% — 17-18
  adult: 1.0,     // 18+
};

export default function MinimumWage() {
  const [hours, setHours] = useState<number | ''>(182);
  const [age, setAge] = useState<'under16' | 'age16_17' | 'age17_18' | 'adult'>('adult');

  const calc = useMemo(() => {
    const h = typeof hours === 'number' ? hours : HOURS_PER_MONTH_STANDARD;
    const rate = YOUTH_RATES[age];
    const monthlyAdult = MONTHLY_FULL_TIME;
    const monthly = monthlyAdult * rate;
    const hourlyStandard = monthlyAdult / HOURS_PER_MONTH_STANDARD;
    const hourly = hourlyStandard * rate;
    const daily = hourly * 8; // typical 8-hour day
    const proratedMonthly = hourly * h;
    return { monthly, hourly, daily, proratedMonthly, rate };
  }, [hours, age]);

  return (
    <CalcCard>
      <div className="mb-6 rounded-xl bg-ink p-6 text-cream-50">
        <div className="text-sm font-medium text-cream-300">שכר המינימום בישראל (2026)</div>
        <div className="num mt-2 text-5xl font-bold">{fmtCurrency(MONTHLY_FULL_TIME)}</div>
        <div className="mt-1 text-sm text-cream-300">לחודש, משרה מלאה, מגיל 18</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label-base">גיל העובד</label>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value as any)}
            className="input-base w-full"
          >
            <option value="adult">18+ (בוגר)</option>
            <option value="age17_18">17-18 (83%)</option>
            <option value="age16_17">16-17 (75%)</option>
            <option value="under16">עד 16 (70%)</option>
          </select>
        </div>
        <NumberInput
          label="שעות עבודה בחודש"
          value={hours}
          onChange={setHours}
          min={0}
          max={300}
          suffix="שעות"
          hint={`${HOURS_PER_MONTH_STANDARD} שעות = משרה מלאה`}
        />
      </div>

      <div className="mt-6 rounded-xl border border-amber/30 bg-amber-wash/40 p-5">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="text-xs text-ink-muted">שעתי</div>
            <div className="num text-2xl font-bold text-ink">{fmtCurrency(calc.hourly)}</div>
            <div className="text-xs text-ink-muted">לשעה</div>
          </div>
          <div>
            <div className="text-xs text-ink-muted">יומי</div>
            <div className="num text-2xl font-bold text-ink">{fmtCurrency(calc.daily)}</div>
            <div className="text-xs text-ink-muted">ל-8 שעות</div>
          </div>
          <div>
            <div className="text-xs text-ink-muted">חודשי</div>
            <div className="num text-2xl font-bold text-ink">{fmtCurrency(calc.monthly)}</div>
            <div className="text-xs text-ink-muted">משרה מלאה</div>
          </div>
        </div>
        {calc.rate < 1 && (
          <div className="mt-5 border-t border-line pt-4 text-sm text-ink-soft">
            <strong>הערה:</strong> עבור נוער, השכר הוא {fmt(calc.rate * 100)}% מהשכר הבוגר.
          </div>
        )}
        <div className="mt-5 border-t border-line pt-4">
          <div className="text-xs text-ink-muted">
            שכר מינימום עבור {fmt(typeof hours === 'number' ? hours : 0)} שעות בחודש
          </div>
          <div className="num text-3xl font-bold text-amber">
            {fmtCurrency(calc.proratedMonthly)}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-line bg-cream-100 p-4 text-xs leading-relaxed text-ink-muted">
        <strong className="text-ink">הערה:</strong> שכר המינימום מתעדכן בדרך כלל ב-1 באפריל
        של כל שנה. בישראל חלה גם הגבלה על שכר שעתי ({fmt(MONTHLY_FULL_TIME / HOURS_PER_MONTH_STANDARD, 2)} ש״ח/שעה כרגע).
        מעביד שמשלם פחות — מפר חוק ישירות.
      </div>
    </CalcCard>
  );
}
