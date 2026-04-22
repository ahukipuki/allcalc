'use client';

import { useState, useMemo } from 'react';
import { CalcCard, NumberInput, fmt } from '@/components/ui/Primitives';

// חוק חופשה שנתית, תשי״א-1951 + תיקון 2016
// ימי חופשה לפי ותק (עובד חודשי במשרה מלאה, 5 ימי עבודה בשבוע)
// שנה 1-5: 12 ימי עבודה (16 ימי קלנדר)
// שנה 6: 14 ימי עבודה (18)
// שנה 7: 15 ימי עבודה (21)
// שנה 8: 16 ימי עבודה (22)
// שנה 9: 17 ימי עבודה (23)
// שנה 10-13: 20 ימי עבודה (24)
// שנה 14+: 23 ימי עבודה (28)
function workDaysByTenure(years: number): number {
  if (years < 1) return 12; // first year pro-rata, but base is same
  if (years <= 5) return 12;
  if (years === 6) return 14;
  if (years === 7) return 15;
  if (years === 8) return 16;
  if (years === 9) return 17;
  if (years <= 13) return 20;
  return 23;
}

// Calendar days (for 6-day workweek historically, but also used for pro-rata)
function calendarDaysByTenure(years: number): number {
  const wd = workDaysByTenure(years);
  if (wd === 12) return 16;
  if (wd === 14) return 18;
  if (wd === 15) return 21;
  if (wd === 16) return 22;
  if (wd === 17) return 23;
  if (wd === 20) return 24;
  return 28;
}

export default function AnnualLeave() {
  const [years, setYears] = useState<number | ''>(3);
  const [weeklyDays, setWeeklyDays] = useState<5 | 6>(5);
  const [partTime, setPartTime] = useState<number | ''>(100);

  const calc = useMemo(() => {
    const y = typeof years === 'number' ? years : 0;
    const pt = typeof partTime === 'number' ? partTime : 100;

    const workDaysFull = workDaysByTenure(y);
    const calendarDaysFull = calendarDaysByTenure(y);
    const days = weeklyDays === 5 ? workDaysFull : calendarDaysFull;
    const prorated = days * (pt / 100);

    return { workDaysFull, calendarDaysFull, days, prorated };
  }, [years, weeklyDays, partTime]);

  return (
    <CalcCard>
      <div className="grid gap-4 md:grid-cols-3">
        <NumberInput
          label="שנות ותק"
          value={years}
          onChange={setYears}
          min={0}
          max={60}
          suffix="שנים"
          hint="ותק צובר זכאות גבוהה יותר"
        />
        <div>
          <label className="label-base">שבוע עבודה</label>
          <div className="flex rounded-lg border border-line bg-cream-100 p-1">
            <button
              type="button"
              onClick={() => setWeeklyDays(5)}
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                weeklyDays === 5 ? 'bg-cream-50 text-ink shadow-soft' : 'text-ink-muted'
              }`}
            >
              5 ימים
            </button>
            <button
              type="button"
              onClick={() => setWeeklyDays(6)}
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                weeklyDays === 6 ? 'bg-cream-50 text-ink shadow-soft' : 'text-ink-muted'
              }`}
            >
              6 ימים
            </button>
          </div>
        </div>
        <NumberInput
          label="היקף משרה"
          value={partTime}
          onChange={setPartTime}
          min={0}
          max={100}
          suffix="%"
        />
      </div>

      <div className="mt-6 rounded-xl border border-amber/30 bg-amber-wash/40 p-5">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="text-xs text-ink-muted">ימי חופשה לשנה</div>
            <div className="num text-4xl font-bold text-amber">{fmt(calc.prorated, 1)}</div>
            <div className="mt-1 text-xs text-ink-muted">
              ({fmt(calc.days)} ימים למשרה מלאה)
            </div>
          </div>
          <div>
            <div className="text-xs text-ink-muted">צבירה חודשית</div>
            <div className="num text-2xl font-bold text-ink">
              {fmt(calc.prorated / 12, 2)} ימים לחודש
            </div>
            <div className="mt-2 text-xs text-ink-muted">
              לפי חוק חופשה שנתית, תשי״א-1951
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-line bg-cream-100 p-4 text-xs leading-relaxed text-ink-muted">
        <strong className="text-ink">הערה:</strong> הסכם קיבוצי או חוזה אישי יכולים להעניק
        ימי חופשה נוספים מעבר למינימום שבחוק. ודא מול תלוש השכר או ההסכם שלך.
      </div>
    </CalcCard>
  );
}
