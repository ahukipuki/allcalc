'use client';

import { useState, useMemo } from 'react';
import { CalcCard, NumberInput, fmt, fmtCurrency } from '@/components/ui/Primitives';

// מחשבון דמי לידה — לפי חוק הביטוח הלאומי
// תקופת אכשרה:
//   10 מתוך 14 חודשים (או 15 מתוך 22) → 105 ימים מלאים
//   6 מתוך 14 חודשים → 56 ימים במחצית
//   פחות מכך → אין זכאות
//
// סכום דמי הלידה ליום = שכר ממוצע יומי בתקופת הבסיס
// שכר ממוצע יומי = (שכר 3 חודשים אחרונים ÷ 90) — או 6 חודשים ÷ 180, הגבוה
// תקרת דמי לידה יומיים: 1,752.33 ₪ (עדכון 2026)

const MAX_DAILY_PAY_ILS = 1752.33;
const FULL_DAYS = 105;
const HALF_DAYS = 56;

export default function MaternityPay() {
  const [avgMonthlySalary, setAvgMonthlySalary] = useState<number | ''>(12000);
  const [contributionMonths, setContributionMonths] = useState<number | ''>(14);
  const [contributionWindow, setContributionWindow] = useState<14 | 22>(14);

  const calc = useMemo(() => {
    const salary = typeof avgMonthlySalary === 'number' ? avgMonthlySalary : 0;
    const months = typeof contributionMonths === 'number' ? contributionMonths : 0;

    // Eligibility
    let eligibility: 'full' | 'half' | 'none' = 'none';
    let days = 0;
    if (contributionWindow === 14) {
      if (months >= 10) { eligibility = 'full'; days = FULL_DAYS; }
      else if (months >= 6) { eligibility = 'half'; days = HALF_DAYS; }
    } else {
      // 22 month window
      if (months >= 15) { eligibility = 'full'; days = FULL_DAYS; }
      else if (months >= 9) { eligibility = 'half'; days = HALF_DAYS; } // approximate half via equivalent ratio
    }

    // Daily rate: monthly / 30, capped at ceiling
    const rawDaily = salary / 30;
    const cappedDaily = Math.min(rawDaily, MAX_DAILY_PAY_ILS);
    const cappedByCeiling = rawDaily > MAX_DAILY_PAY_ILS;

    const totalPay = cappedDaily * days;

    return {
      eligibility,
      days,
      rawDaily,
      cappedDaily,
      cappedByCeiling,
      totalPay,
    };
  }, [avgMonthlySalary, contributionMonths, contributionWindow]);

  return (
    <CalcCard>
      <div className="grid gap-4 md:grid-cols-3">
        <NumberInput
          label="שכר חודשי ממוצע"
          value={avgMonthlySalary}
          onChange={setAvgMonthlySalary}
          min={0}
          prefix="₪"
          hint="לפני לידה (3-6 חודשים)"
        />
        <div>
          <label className="label-base">חלון תקופת אכשרה</label>
          <div className="flex rounded-lg border border-line bg-cream-100 p-1">
            <button
              type="button"
              onClick={() => setContributionWindow(14)}
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                contributionWindow === 14 ? 'bg-cream-50 text-ink shadow-soft' : 'text-ink-muted'
              }`}
            >
              14 חודשים
            </button>
            <button
              type="button"
              onClick={() => setContributionWindow(22)}
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                contributionWindow === 22 ? 'bg-cream-50 text-ink shadow-soft' : 'text-ink-muted'
              }`}
            >
              22 חודשים
            </button>
          </div>
        </div>
        <NumberInput
          label="חודשים ששולמו עליהם דמי ביטוח"
          value={contributionMonths}
          onChange={setContributionMonths}
          min={0}
          max={contributionWindow}
          suffix="חודשים"
          hint={`מתוך ${contributionWindow} האחרונים`}
        />
      </div>

      <div className="mt-6 rounded-xl border border-amber/30 bg-amber-wash/40 p-5">
        {calc.eligibility === 'none' ? (
          <div className="text-center">
            <div className="text-sm text-ink-muted">לא עומדת בתקופת האכשרה הנדרשת</div>
            <div className="mt-2 text-sm text-ink-soft">
              נדרשים {contributionWindow === 14 ? '10' : '15'} חודשי ביטוח לזכאות מלאה,
              או לפחות 6 חודשים מתוך 14 לזכאות חלקית (56 יום במחצית התעריף).
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="text-xs text-ink-muted">זכאות</div>
                <div className="text-lg font-bold text-ink">
                  {calc.eligibility === 'full' ? 'מלאה (105 יום)' : 'חלקית (56 יום)'}
                </div>
              </div>
              <div>
                <div className="text-xs text-ink-muted">דמי לידה ליום</div>
                <div className="num text-2xl font-bold text-ink">{fmtCurrency(calc.cappedDaily)}</div>
                {calc.cappedByCeiling && (
                  <div className="mt-1 text-xs text-ink-muted">
                    (מוגבל לתקרת {fmtCurrency(MAX_DAILY_PAY_ILS)})
                  </div>
                )}
              </div>
              <div>
                <div className="text-xs text-ink-muted">סך דמי לידה</div>
                <div className="num text-3xl font-bold text-amber-ink">{fmtCurrency(calc.totalPay)}</div>
                {calc.eligibility === 'half' && (
                  <div className="mt-1 text-xs text-ink-muted">(מחצית מהתעריף)</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 rounded-lg border border-line bg-cream-100 p-4 text-xs leading-relaxed text-ink-muted">
        <strong className="text-ink">חשוב:</strong> המחשבון מציג הערכה על סמך הנוסחה הבסיסית של הביטוח
        הלאומי. הזכאות וסכום התשלום המדויק נקבעים על ידי פקיד תביעות ותלויים בנתונים נוספים
        (הכנסה בפועל, שינויי שכר, עבודה כעצמאית ועוד). לחישוב מחייב, השתמשו במחשבון
        ביטוח לאומי או בקשו יעוץ. התקרה היומית ({fmtCurrency(MAX_DAILY_PAY_ILS)}) מתעדכנת בינואר של כל שנה.
      </div>
    </CalcCard>
  );
}
