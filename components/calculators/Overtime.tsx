'use client';

import { useState, useMemo } from 'react';
import { CalcCard, NumberInput, fmt, fmtCurrency } from '@/components/ui/Primitives';

// חוק שעות עבודה ומנוחה, תשי"א-1951
// שעות נוספות ביום רגיל:
//   2 השעות הראשונות - 125%
//   מעבר לכך - 150%
// שעות נוספות ביום מנוחה (שבת/חג):
//   כל השעות - לפחות 150%
//   החל מהשעה ה-9 - 175%
const REGULAR_DAY_BASE_HOURS = 8;
const REST_DAY_REGULAR_HOURS = 8; // שכר 150% עד שעה 8

export default function Overtime() {
  const [hourlyWage, setHourlyWage] = useState<number | ''>(50);
  const [totalHours, setTotalHours] = useState<number | ''>(10);
  const [dayType, setDayType] = useState<'regular' | 'rest'>('regular');

  const calc = useMemo(() => {
    const wage = typeof hourlyWage === 'number' ? hourlyWage : 0;
    const hours = typeof totalHours === 'number' ? totalHours : 0;

    const breakdown: { label: string; hours: number; rate: number; pay: number }[] = [];

    if (dayType === 'regular') {
      // Regular day: first 8 hours = 100%, next 2 = 125%, rest = 150%
      const regular = Math.min(hours, REGULAR_DAY_BASE_HOURS);
      const overtime125 = Math.max(0, Math.min(hours - REGULAR_DAY_BASE_HOURS, 2));
      const overtime150 = Math.max(0, hours - REGULAR_DAY_BASE_HOURS - 2);

      if (regular > 0) {
        breakdown.push({ label: 'שעות רגילות (100%)', hours: regular, rate: 1.0, pay: regular * wage });
      }
      if (overtime125 > 0) {
        breakdown.push({ label: '2 שעות ראשונות (125%)', hours: overtime125, rate: 1.25, pay: overtime125 * wage * 1.25 });
      }
      if (overtime150 > 0) {
        breakdown.push({ label: 'שעות נוספות (150%)', hours: overtime150, rate: 1.5, pay: overtime150 * wage * 1.5 });
      }
    } else {
      // Rest day (שבת/חג): first 8 hours = 150%, beyond = 175%
      const rest150 = Math.min(hours, REST_DAY_REGULAR_HOURS);
      const rest175 = Math.max(0, hours - REST_DAY_REGULAR_HOURS);

      if (rest150 > 0) {
        breakdown.push({ label: 'שעות ביום מנוחה (150%)', hours: rest150, rate: 1.5, pay: rest150 * wage * 1.5 });
      }
      if (rest175 > 0) {
        breakdown.push({ label: 'מעל 8 שעות ביום מנוחה (175%)', hours: rest175, rate: 1.75, pay: rest175 * wage * 1.75 });
      }
    }

    const total = breakdown.reduce((s, b) => s + b.pay, 0);
    const overtimeOnly = breakdown
      .filter((b) => b.rate > 1.0)
      .reduce((s, b) => s + b.pay, 0);

    return { breakdown, total, overtimeOnly };
  }, [hourlyWage, totalHours, dayType]);

  return (
    <CalcCard>
      <div className="grid gap-4 md:grid-cols-3">
        <NumberInput
          label="שכר שעתי ברוטו"
          value={hourlyWage}
          onChange={setHourlyWage}
          min={0}
          prefix="₪"
          hint="שכר בסיס לשעה, לפני תוספות"
        />
        <NumberInput
          label="סך שעות עבודה ביום"
          value={totalHours}
          onChange={setTotalHours}
          min={0}
          max={24}
          suffix="שעות"
          hint="כולל שעות רגילות ונוספות"
        />
        <div>
          <label className="label-base">סוג יום</label>
          <div className="flex rounded-lg border border-line bg-cream-100 p-1">
            <button
              type="button"
              onClick={() => setDayType('regular')}
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                dayType === 'regular' ? 'bg-cream-50 text-ink shadow-soft' : 'text-ink-muted'
              }`}
            >
              יום רגיל
            </button>
            <button
              type="button"
              onClick={() => setDayType('rest')}
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                dayType === 'rest' ? 'bg-cream-50 text-ink shadow-soft' : 'text-ink-muted'
              }`}
            >
              שבת / חג
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-amber/30 bg-amber-wash/40 p-5">
        {calc.breakdown.length === 0 ? (
          <div className="text-center text-ink-muted">הזינו שכר ושעות לחישוב</div>
        ) : (
          <>
            <div className="mb-4 text-xs font-medium uppercase tracking-wider text-ink-muted">
              פירוט
            </div>
            <div className="space-y-2">
              {calc.breakdown.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg bg-cream-50/60 px-3 py-2 text-sm"
                >
                  <span className="text-ink-soft">{b.label}</span>
                  <span className="flex items-center gap-4">
                    <span className="text-ink-muted">{fmt(b.hours, 2)} שעות</span>
                    <span className="num font-bold text-ink">{fmtCurrency(b.pay)}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-line pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-xs text-ink-muted">תוספת עבור שעות נוספות בלבד</div>
                  <div className="num text-2xl font-bold text-ink">{fmtCurrency(calc.overtimeOnly)}</div>
                </div>
                <div>
                  <div className="text-xs text-ink-muted">סך תשלום ברוטו ליום</div>
                  <div className="num text-3xl font-bold text-amber-ink">{fmtCurrency(calc.total)}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 rounded-lg border border-line bg-cream-100 p-4 text-xs leading-relaxed text-ink-muted">
        <strong className="text-ink">לפי חוק שעות עבודה ומנוחה, תשי״א-1951:</strong> 2 שעות נוספות
        ראשונות ביום רגיל — 125% מהשכר הרגיל. מעבר לכך — 150%. ביום מנוחה שבועית (שבת) או חג,
        כל שעה מזכה לפחות ב-150%, ומהשעה ה-9 ואילך 175%. הסכם קיבוצי יכול לשפר את התנאים.
      </div>
    </CalcCard>
  );
}
