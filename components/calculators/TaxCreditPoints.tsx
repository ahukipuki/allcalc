'use client';

import { useState, useMemo } from 'react';
import { CalcCard, NumberInput, fmt, fmtCurrency } from '@/components/ui/Primitives';

// נקודות זיכוי — רשות המסים 2026
// ערך נקודת זיכוי חודשית בש"ח (עדכון ינואר של כל שנה)
const POINT_VALUE_MONTHLY = 247;

// בסיס:
//   תושב ישראל: 2.25 נק'
//   אישה: +0.5 נק' (סה"כ 2.75)
// ילדים (בהתאם לגיל):
//   מתחת לגיל שנה בשנת הלידה (לאם): 1.5 נק' בשנה הראשונה, 2.5 נק' משנייה ואילך
//   גילאי 1-5: 2.5 נק' (לאם)
//   גילאי 6-12: 1 נק' (משותף)
//   גילאי 13-17: 0.5 נק' (לאם)
//   גילאי 18 (פעוט): 1 נק' בשנת גיל 18
// הורה יחיד: +1 נק'
// עולה חדש: מדורג — שנה 1-1.5 שנים: 3 נק', 1.5-3 שנים: 2 נק', 3-4.5 שנים: 1 נק'
// חייל משוחרר: נק' זיכוי במשך 36 חודשים לאחר שחרור (1/6 לחודש למי ששירת לפחות 23/22 חודשים)
// סיום תואר אקדמי: 1 נק' לשנה למשך שנה אחת (או עד 3 שנים לתואר שני/שלישי)

export default function TaxCreditPoints() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [isResident, setIsResident] = useState(true);
  const [singleParent, setSingleParent] = useState(false);
  const [childrenUnder1, setChildrenUnder1] = useState<number | ''>(0);
  const [children1to5, setChildren1to5] = useState<number | ''>(0);
  const [children6to12, setChildren6to12] = useState<number | ''>(0);
  const [children13to17, setChildren13to17] = useState<number | ''>(0);
  const [olim, setOlim] = useState<'none' | 'year1' | 'year2' | 'year3'>('none');
  const [discharged, setDischarged] = useState(false);
  const [dischargedMonths, setDischargedMonths] = useState<number | ''>(24);
  const [degree, setDegree] = useState<'none' | 'bachelor' | 'master' | 'phd' | 'professional'>('none');

  const calc = useMemo(() => {
    const parts: { label: string; points: number }[] = [];

    // Base
    if (isResident) {
      parts.push({ label: 'תושב ישראל', points: 2.25 });
    }
    if (gender === 'female') {
      parts.push({ label: 'אישה', points: 0.5 });
    }

    // Children
    const c0 = typeof childrenUnder1 === 'number' ? childrenUnder1 : 0;
    const c1 = typeof children1to5 === 'number' ? children1to5 : 0;
    const c2 = typeof children6to12 === 'number' ? children6to12 : 0;
    const c3 = typeof children13to17 === 'number' ? children13to17 : 0;

    if (gender === 'female') {
      // Mother's child credits (typically claimed by mother)
      if (c0 > 0) parts.push({ label: `ילדים עד גיל שנה (${c0})`, points: c0 * 1.5 });
      if (c1 > 0) parts.push({ label: `ילדים 1-5 (${c1})`, points: c1 * 2.5 });
      if (c2 > 0) parts.push({ label: `ילדים 6-12 (${c2})`, points: c2 * 1 });
      if (c3 > 0) parts.push({ label: `ילדים 13-17 (${c3})`, points: c3 * 0.5 });
    } else {
      // Father's child credits
      if (c0 > 0) parts.push({ label: `ילדים עד גיל שנה (${c0})`, points: c0 * 1.5 });
      if (c1 > 0) parts.push({ label: `ילדים 1-5 (${c1})`, points: c1 * 1 });
      if (c2 > 0) parts.push({ label: `ילדים 6-12 (${c2})`, points: c2 * 1 });
    }

    if (singleParent) {
      parts.push({ label: 'הורה יחיד', points: 1 });
    }

    // Immigrant (Olim Chadashim)
    if (olim === 'year1') parts.push({ label: 'עולה חדש (שנה 1 ומחצה ראשונה)', points: 3 });
    else if (olim === 'year2') parts.push({ label: 'עולה חדש (שנים 1.5-3)', points: 2 });
    else if (olim === 'year3') parts.push({ label: 'עולה חדש (שנים 3-4.5)', points: 1 });

    // Discharged soldier
    if (discharged) {
      const months = typeof dischargedMonths === 'number' ? dischargedMonths : 0;
      // 1/6 point per month of service, for 36 months post-discharge
      // Simplification: we just compute what's earned — not complex.
      const soldierPoints = Math.min(36, months) * (1 / 6);
      parts.push({ label: `חייל משוחרר (${months} חודשי שירות)`, points: soldierPoints });
    }

    // Academic degree (1 point for one year after graduation)
    if (degree === 'bachelor') parts.push({ label: 'תואר ראשון', points: 1 });
    else if (degree === 'master') parts.push({ label: 'תואר שני', points: 0.5 });
    else if (degree === 'phd') parts.push({ label: 'תואר שלישי', points: 0.5 });
    else if (degree === 'professional') parts.push({ label: 'לימודי מקצוע', points: 0.5 });

    const total = parts.reduce((s, p) => s + p.points, 0);
    const monthlyCredit = total * POINT_VALUE_MONTHLY;
    const annualCredit = monthlyCredit * 12;

    return { parts, total, monthlyCredit, annualCredit };
  }, [
    gender, isResident, singleParent,
    childrenUnder1, children1to5, children6to12, children13to17,
    olim, discharged, dischargedMonths, degree,
  ]);

  return (
    <CalcCard>
      <h3 className="mb-4 font-display text-lg font-bold text-ink">פרטים אישיים</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="label-base">מגדר</label>
          <div className="flex rounded-lg border border-line bg-cream-100 p-1">
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium ${
                gender === 'male' ? 'bg-cream-50 text-ink shadow-soft' : 'text-ink-muted'
              }`}
            >
              גבר
            </button>
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium ${
                gender === 'female' ? 'bg-cream-50 text-ink shadow-soft' : 'text-ink-muted'
              }`}
            >
              אישה
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isResident}
              onChange={(e) => setIsResident(e.target.checked)}
              className="h-4 w-4 rounded border-line accent-amber"
            />
            <span>תושב/ת ישראל</span>
          </label>
        </div>
        <div className="flex items-center">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={singleParent}
              onChange={(e) => setSingleParent(e.target.checked)}
              className="h-4 w-4 rounded border-line accent-amber"
            />
            <span>הורה יחיד</span>
          </label>
        </div>
      </div>

      <h3 className="mb-4 mt-8 font-display text-lg font-bold text-ink">
        ילדים
        {gender === 'male' && (
          <span className="mr-2 text-sm font-normal text-ink-muted">
            (רוב נקודות הילדים ניתנות לאם)
          </span>
        )}
      </h3>
      <div className="grid gap-4 md:grid-cols-4">
        <NumberInput
          label="עד גיל שנה"
          value={childrenUnder1}
          onChange={setChildrenUnder1}
          min={0}
          max={5}
          hint="1.5 נק' לכל ילד"
        />
        <NumberInput
          label="גילאי 1-5"
          value={children1to5}
          onChange={setChildren1to5}
          min={0}
          max={10}
          hint={gender === 'female' ? "2.5 נק' לאם" : "1 נק' לאב"}
        />
        <NumberInput
          label="גילאי 6-12"
          value={children6to12}
          onChange={setChildren6to12}
          min={0}
          max={10}
          hint="1 נק' לכל ילד"
        />
        <NumberInput
          label="גילאי 13-17"
          value={children13to17}
          onChange={setChildren13to17}
          min={0}
          max={10}
          hint={gender === 'female' ? "0.5 נק' לאם" : '-'}
        />
      </div>

      <h3 className="mb-4 mt-8 font-display text-lg font-bold text-ink">הטבות נוספות</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label-base">עולה חדש / תושב חוזר</label>
          <select
            value={olim}
            onChange={(e) => setOlim(e.target.value as any)}
            className="input-base w-full"
          >
            <option value="none">לא</option>
            <option value="year1">18 החודשים הראשונים (3 נק')</option>
            <option value="year2">שנים 1.5-3 (2 נק')</option>
            <option value="year3">שנים 3-4.5 (1 נק')</option>
          </select>
        </div>
        <div>
          <label className="label-base">סיום לימודים השנה</label>
          <select
            value={degree}
            onChange={(e) => setDegree(e.target.value as any)}
            className="input-base w-full"
          >
            <option value="none">לא</option>
            <option value="bachelor">תואר ראשון (1 נק')</option>
            <option value="master">תואר שני (0.5 נק')</option>
            <option value="phd">תואר שלישי (0.5 נק')</option>
            <option value="professional">לימודי מקצוע (0.5 נק')</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={discharged}
            onChange={(e) => setDischarged(e.target.checked)}
            className="h-4 w-4 rounded border-line accent-amber"
          />
          <span>חייל/ת משוחרר/ת ב-3 השנים האחרונות</span>
        </label>
        {discharged && (
          <div className="mt-3">
            <NumberInput
              label="חודשי שירות סדיר"
              value={dischargedMonths}
              onChange={setDischargedMonths}
              min={0}
              max={60}
              suffix="חודשים"
              hint="עד 36 חודשים מזכים בנקודות"
            />
          </div>
        )}
      </div>

      <div className="mt-8 rounded-xl border border-amber/30 bg-amber-wash/40 p-5">
        {calc.parts.length === 0 ? (
          <div className="text-center text-ink-muted">הזינו פרטים לחישוב</div>
        ) : (
          <>
            <div className="mb-4 text-xs font-medium uppercase tracking-wider text-ink-muted">
              פירוט נקודות זיכוי
            </div>
            <div className="space-y-1.5">
              {calc.parts.map((p, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-ink-soft">{p.label}</span>
                  <span className="num font-medium text-ink">{fmt(p.points, 2)} נק'</span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-4 border-t border-line pt-4 md:grid-cols-3">
              <div>
                <div className="text-xs text-ink-muted">סך נקודות</div>
                <div className="num text-3xl font-bold text-ink">{fmt(calc.total, 2)}</div>
              </div>
              <div>
                <div className="text-xs text-ink-muted">זיכוי חודשי</div>
                <div className="num text-2xl font-bold text-ink">{fmtCurrency(calc.monthlyCredit)}</div>
              </div>
              <div>
                <div className="text-xs text-ink-muted">זיכוי שנתי</div>
                <div className="num text-2xl font-bold text-amber-ink">{fmtCurrency(calc.annualCredit)}</div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 rounded-lg border border-line bg-cream-100 p-4 text-xs leading-relaxed text-ink-muted">
        <strong className="text-ink">הערה:</strong> ערך נקודת זיכוי חודשית ב-2026 הוא {fmtCurrency(POINT_VALUE_MONTHLY)}
        ומתעדכן בינואר. המחשבון מציג את המצב הנפוץ ביותר; יש נקודות זיכוי נוספות
        (תושבי יישובי ספר, בני זוג נפרדים, מזונות, ילדים עם מוגבלות ועוד) שלא נכללו.
        לחישוב מחייב פנו לרשות המסים. הורה יכול לבקש העברת נקודות בין בני זוג בטופס 101.
      </div>
    </CalcCard>
  );
}
