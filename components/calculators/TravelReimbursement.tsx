'use client';

import { useState, useMemo } from 'react';
import { CalcCard, NumberInput, fmt, fmtCurrency } from '@/components/ui/Primitives';

// החזר נסיעות: צו הרחבה בדבר השתתפות המעסיק בהוצאות נסיעה לעבודה
// העובד זכאי להחזר הנמוך מבין:
//   א) עלות חופשי-חודשי של תחבורה ציבורית, מחולק בימי עבודה בחודש
//   ב) תקרה יומית לפי הצו (מתעדכן יולי)
// סכום מרבי לחודש = תעריף יומי × ימי עבודה בפועל

// Update annually (usually July) — daily cap as of 2026
const DAILY_CAP_ILS = 22.60;

export default function TravelReimbursement() {
  const [daysWorked, setDaysWorked] = useState<number | ''>(22);
  const [dailyTransportCost, setDailyTransportCost] = useState<number | ''>(25);
  const [hasMonthlyPass, setHasMonthlyPass] = useState(false);
  const [monthlyPassPrice, setMonthlyPassPrice] = useState<number | ''>(225);

  const calc = useMemo(() => {
    const days = typeof daysWorked === 'number' ? daysWorked : 0;
    const dailyCost = typeof dailyTransportCost === 'number' ? dailyTransportCost : 0;
    const passPrice = typeof monthlyPassPrice === 'number' ? monthlyPassPrice : 0;

    // Actual cost per day (round trip), capped at government cap
    const actualDaily = Math.min(dailyCost, DAILY_CAP_ILS);
    const cappedByGovernment = dailyCost > DAILY_CAP_ILS;

    // Via daily cap route
    const viaDaily = actualDaily * days;

    // Via monthly pass route (if user has one, employer pays the pass)
    const viaPass = hasMonthlyPass ? Math.min(passPrice, viaDaily) : viaDaily;

    // The employee is entitled to the cheaper of the two
    const entitled = hasMonthlyPass ? Math.min(viaDaily, passPrice) : viaDaily;

    return {
      actualDaily,
      cappedByGovernment,
      viaDaily,
      viaPass,
      entitled,
    };
  }, [daysWorked, dailyTransportCost, hasMonthlyPass, monthlyPassPrice]);

  return (
    <CalcCard>
      <div className="grid gap-4 md:grid-cols-2">
        <NumberInput
          label="ימי עבודה בפועל החודש"
          value={daysWorked}
          onChange={setDaysWorked}
          min={0}
          max={31}
          suffix="ימים"
        />
        <NumberInput
          label="עלות נסיעה הלוך ושוב ביום"
          value={dailyTransportCost}
          onChange={setDailyTransportCost}
          min={0}
          prefix="₪"
          hint="עלות יומית אוטובוס / רכבת"
        />
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={hasMonthlyPass}
            onChange={(e) => setHasMonthlyPass(e.target.checked)}
            className="h-4 w-4 rounded border-line accent-amber"
          />
          <span>יש לי חופשי-חודשי (כרטיס חודשי זול יותר)</span>
        </label>
        {hasMonthlyPass && (
          <div className="mt-3">
            <NumberInput
              label="עלות חופשי-חודשי"
              value={monthlyPassPrice}
              onChange={setMonthlyPassPrice}
              min={0}
              prefix="₪"
              hint="הכרטיס החודשי בפועל"
            />
          </div>
        )}
      </div>

      <div className="mt-6 rounded-xl border border-amber/30 bg-amber-wash/40 p-5">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="text-xs text-ink-muted">תעריף יומי מוכר</div>
            <div className="num text-2xl font-bold text-ink">{fmtCurrency(calc.actualDaily)}</div>
            {calc.cappedByGovernment && (
              <div className="mt-1 text-xs text-ink-muted">
                (הוגבל לתקרה של {fmtCurrency(DAILY_CAP_ILS)})
              </div>
            )}
          </div>
          <div>
            <div className="text-xs text-ink-muted">חישוב לפי ימים</div>
            <div className="num text-2xl font-bold text-ink">{fmtCurrency(calc.viaDaily)}</div>
            <div className="text-xs text-ink-muted">
              {fmtCurrency(calc.actualDaily)} × {fmt(typeof daysWorked === 'number' ? daysWorked : 0)} ימים
            </div>
          </div>
          <div>
            <div className="text-xs text-ink-muted">זכאות לחודש</div>
            <div className="num text-3xl font-bold text-amber-ink">{fmtCurrency(calc.entitled)}</div>
            {hasMonthlyPass && calc.viaPass < calc.viaDaily && (
              <div className="mt-1 text-xs text-ink-muted">
                (חופשי-חודשי זול יותר)
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-line bg-cream-100 p-4 text-xs leading-relaxed text-ink-muted">
        <strong className="text-ink">לפי צו הרחבה:</strong> עובד זכאי להשתתפות בהוצאות נסיעה לעבודה
        לפי הנמוך מבין: עלות חופשי-חודשי של תחבורה ציבורית, או תעריף יומי מוכר כפול ימי עבודה.
        התעריף היומי המרבי ל-2026 הוא {fmtCurrency(DAILY_CAP_ILS)} ומתעדכן בכל יולי.
        לעובדים שמגיעים ברכב פרטי — זכאים לנמוך מבין עלות התחבורה הציבורית או דמי הנסיעה בפועל.
      </div>
    </CalcCard>
  );
}
