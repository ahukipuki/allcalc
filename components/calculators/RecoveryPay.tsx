'use client';

import { useState, useMemo } from 'react';
import { CalcCard, NumberInput, fmt, fmtCurrency } from '@/components/ui/Primitives';

// Update annually per publication by משרד העבודה (typically July)
const DAILY_RATE_ILS = 478; // rate for private sector, 2026
const DAILY_RATE_PUBLIC = 537; // public sector rate, 2026

// Days per year of recovery pay, by tenure
// ותק < 1 שנה = 0
// שנה 1 = 5 ימים
// שנים 2-3 = 6 ימים
// שנים 4-10 = 7 ימים (or 8 depending on agreement)
// שנים 11-15 = 8 ימים
// שנים 16-19 = 9 ימים
// שנה 20+ = 10 ימים
function daysPerYearByTenure(yearsOfService: number): number {
  if (yearsOfService < 1) return 0;
  if (yearsOfService === 1) return 5;
  if (yearsOfService <= 3) return 6;
  if (yearsOfService <= 10) return 7;
  if (yearsOfService <= 15) return 8;
  if (yearsOfService <= 19) return 9;
  return 10;
}

export default function RecoveryPay() {
  const [years, setYears] = useState<number | ''>(3);
  const [partTime, setPartTime] = useState<number | ''>(100);
  const [sector, setSector] = useState<'private' | 'public'>('private');

  const calc = useMemo(() => {
    const y = typeof years === 'number' ? years : 0;
    const pt = typeof partTime === 'number' ? partTime : 100;
    const days = daysPerYearByTenure(y);
    const rate = sector === 'public' ? DAILY_RATE_PUBLIC : DAILY_RATE_ILS;
    const fullAmount = days * rate;
    const proratedAmount = fullAmount * (pt / 100);
    return { days, rate, fullAmount, proratedAmount };
  }, [years, partTime, sector]);

  return (
    <CalcCard>
      <div className="grid gap-4 md:grid-cols-3">
        <NumberInput
          label="שנות ותק במקום העבודה"
          value={years}
          onChange={setYears}
          min={0}
          max={60}
          suffix="שנים"
          hint="ותק של לפחות שנה מלאה מזכה בדמי הבראה"
        />
        <NumberInput
          label="היקף משרה"
          value={partTime}
          onChange={setPartTime}
          min={0}
          max={100}
          suffix="%"
          hint="100% = משרה מלאה"
        />
        <div>
          <label className="label-base">מגזר</label>
          <div className="flex rounded-lg border border-line bg-cream-100 p-1">
            <button
              type="button"
              onClick={() => setSector('private')}
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                sector === 'private' ? 'bg-cream-50 text-ink shadow-soft' : 'text-ink-muted'
              }`}
            >
              פרטי
            </button>
            <button
              type="button"
              onClick={() => setSector('public')}
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                sector === 'public' ? 'bg-cream-50 text-ink shadow-soft' : 'text-ink-muted'
              }`}
            >
              ציבורי
            </button>
          </div>
        </div>
      </div>

      {calc.days === 0 ? (
        <div className="mt-6 rounded-xl border border-amber/30 bg-amber-wash/40 p-5">
          <div className="text-center text-ink-muted">
            לא זכאי/ת לדמי הבראה — נדרש ותק של שנה מלאה לפחות.
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-amber/30 bg-amber-wash/40 p-5">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-xs text-ink-muted">ימי הבראה לשנה</div>
              <div className="num text-3xl font-bold text-ink">{calc.days}</div>
            </div>
            <div>
              <div className="text-xs text-ink-muted">תעריף יומי</div>
              <div className="num text-2xl font-bold text-ink">{fmtCurrency(calc.rate)}</div>
            </div>
            <div>
              <div className="text-xs text-ink-muted">סכום שנתי</div>
              <div className="num text-3xl font-bold text-amber">{fmtCurrency(calc.proratedAmount)}</div>
              {calc.proratedAmount !== calc.fullAmount && (
                <div className="mt-1 text-xs text-ink-muted">
                  (משרה מלאה: {fmtCurrency(calc.fullAmount)})
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-lg border border-line bg-cream-100 p-4 text-xs leading-relaxed text-ink-muted">
        <strong className="text-ink">לתשומת לבך:</strong> המחשבון מציג הערכה על בסיס תעריף
        של {fmt(DAILY_RATE_ILS)} ש״ח ליום במגזר הפרטי (עדכון 2026).
        התעריף מתעדכן בדרך כלל ב-1 ביולי. לחישוב מחייב בדוק מול תלוש שכרך או משרד העבודה.
      </div>
    </CalcCard>
  );
}
