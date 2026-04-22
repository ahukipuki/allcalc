'use client';

import { useState, useMemo, useEffect } from 'react';
import { CalcCard, Tabs } from '@/components/ui/Primitives';

const HEBREW_MONTHS = [
  'תשרי', 'חשון', 'כסלו', 'טבת', 'שבט',
  'אדר', 'אדר א׳', 'אדר ב׳',
  'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול',
];

// Gematria: number → Hebrew letters (just the hundreds+tens+ones, no thousand marker)
// A Hebrew year like 5786 is written just as "תשפ״ו" — the millennium ("ה") is implicit.
function toGematria(n: number): string {
  if (n <= 0) return String(n);
  const rem = n % 1000;
  return insertGershayim(gematriaSmall(rem));
}

function gematriaSmall(n: number): string {
  if (n === 0) return '';
  const hundreds = Math.floor(n / 100);
  const remainder = n % 100;

  const hundredsLetters = ['', 'ק', 'ר', 'ש', 'ת', 'תק', 'תר', 'תש', 'תת', 'תתק'];
  let out = hundredsLetters[hundreds] || '';

  // Special forms: 15 = טו (not יה), 16 = טז (not יו), to avoid divine name combinations
  if (remainder === 15) return out + 'טו';
  if (remainder === 16) return out + 'טז';

  const tens = Math.floor(remainder / 10);
  const ones = remainder % 10;
  const tensLetters = ['', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'];
  const onesLetters = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'];
  out += tensLetters[tens] + onesLetters[ones];
  return out;
}

function insertGershayim(s: string): string {
  if (s.length === 0) return s;
  if (s.length === 1) return s + '׳';
  return s.slice(0, -1) + '״' + s.slice(-1);
}

// ---- Hebrew letters → number (parse gematria) ----
const LETTER_VALUES: Record<string, number> = {
  א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9,
  י: 10, כ: 20, ך: 20, ל: 30, מ: 40, ם: 40, נ: 50, ן: 50,
  ס: 60, ע: 70, פ: 80, ף: 80, צ: 90, ץ: 90,
  ק: 100, ר: 200, ש: 300, ת: 400,
};

function fromGematria(s: string): number {
  const trimmed = s.trim();
  if (!trimmed) return 0;
  const clean = trimmed.replace(/[׳״'"]/g, '');
  if (!clean) return 0;
  let total = 0;
  // If starts with "ה׳" (or "ה'") — this is the thousands marker for 5000
  const startsWith5K = /^ה[׳״'"]/.test(trimmed);
  let startIdx = 0;
  if (startsWith5K) {
    total += 5000;
    startIdx = 1;
  }
  for (let i = startIdx; i < clean.length; i++) {
    const ch = clean[i];
    if (LETTER_VALUES[ch] !== undefined) {
      total += LETTER_VALUES[ch];
    }
  }
  // If no explicit "ה׳" marker and result is small, assume 5xxx
  if (!startsWith5K && total > 0 && total < 1000) {
    total += 5000;
  }
  return total;
}

function gregorianToHebrew(date: Date): {
  year: number;
  monthName: string;
  day: number;
  yearHebrew: string;
  dayHebrew: string;
  full: string;
} {
  const fmt = new Intl.DateTimeFormat('he-u-ca-hebrew', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const parts = fmt.formatToParts(date);
  let year = 0;
  let monthName = '';
  let day = 0;
  for (const p of parts) {
    if (p.type === 'year') year = parseInt(p.value, 10);
    else if (p.type === 'month') monthName = p.value.replace(/^ב/, '');
    else if (p.type === 'day') day = parseInt(p.value, 10);
  }
  const yearHebrew = toGematria(year);
  const dayHebrew = toGematria(day);
  return {
    year,
    monthName,
    day,
    yearHebrew,
    dayHebrew,
    full: `${dayHebrew} ${monthName} ${yearHebrew}`,
  };
}

// Normalize Adar variations between what the user picked and what Intl returns.
//
// Rules:
//   - Exact match always wins.
//   - In a non-leap year, Intl returns plain "אדר". If user picked "אדר א׳" or "אדר ב׳"
//     (e.g. dropdown remembered an old value), treat both as matching "אדר" — there's
//     only one Adar that year.
//   - In a leap year, Intl returns "אדר א׳" or "אדר ב׳". If user picked plain "אדר"
//     (ambiguous), we map it to אדר ב׳ — the "real" Adar where Purim/birthdays fall.
//   - Do NOT cross-match "אדר א׳" ↔ "אדר ב׳" in leap years — they're different months.
function monthsMatch(userPick: string, intlReturned: string): boolean {
  const a = userPick.trim();
  const b = intlReturned.trim();
  if (a === b) return true;

  // Non-leap year: Intl = "אדר". User may have picked any Adar variant.
  if (b === 'אדר' && (a === 'אדר א׳' || a === 'אדר ב׳')) return true;

  // Leap year: user picked plain "אדר" (ambiguous) → map to אדר ב׳.
  if (a === 'אדר' && b === 'אדר ב׳') return true;

  return false;
}

function hebrewToGregorian(year: number, monthName: string, day: number): Date | null {
  if (!year || !monthName || !day) return null;
  const fmt = new Intl.DateTimeFormat('he-u-ca-hebrew', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  // Hebrew year Y spans roughly Sep of (Y-3761) through Sep of (Y-3760).
  // Start at June of (Y-3761) to be safely before Rosh Hashana, then search
  // ~500 days forward to cover the entire Hebrew year (regular or leap).
  const start = new Date(year - 3761, 5, 1); // June 1 of (Y-3761)
  for (let offset = 0; offset <= 500; offset++) {
    const d = new Date(start);
    d.setDate(d.getDate() + offset);
    const parts = fmt.formatToParts(d);
    const y = parseInt((parts.find((p) => p.type === 'year') || { value: '0' }).value, 10);
    const mRaw = (parts.find((p) => p.type === 'month') || { value: '' }).value;
    const m = mRaw.replace(/^ב/, '').trim();
    const dd = parseInt((parts.find((p) => p.type === 'day') || { value: '0' }).value, 10);
    if (y === year && dd === day && monthsMatch(monthName, m)) {
      return d;
    }
  }
  return null;
}

function gregorianLabel(d: Date): string {
  return d.toLocaleDateString('he-IL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function HebrewDate() {
  const [mode, setMode] = useState<'gh' | 'hg'>('gh');

  // Initial state: today. `useState(() => ...)` runs on the client only,
  // so it uses the real "today" when the user lands on the page (not the build-time date).
  const initial = () => {
    const t = new Date();
    const iso = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
    const heb = gregorianToHebrew(t);
    return { iso, heb };
  };
  const [gDate, setGDate] = useState(() => initial().iso);
  const [hYearText, setHYearText] = useState(() => initial().heb.yearHebrew);
  const [hMonth, setHMonth] = useState(() => initial().heb.monthName);
  const [hDay, setHDay] = useState<number | ''>(() => initial().heb.day);

  // Extra safety: refresh to today once on mount. This guarantees that
  // cached HTML from a previous day doesn't display yesterday's date.
  useEffect(() => {
    const { iso, heb } = initial();
    setGDate(iso);
    setHYearText(heb.yearHebrew);
    setHMonth(heb.monthName);
    setHDay(heb.day);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hYearNumber = useMemo(() => {
    const trimmed = hYearText.trim();
    if (/^\d+$/.test(trimmed)) {
      const n = parseInt(trimmed, 10);
      return n > 0 && n < 1000 ? n + 5000 : n;
    }
    return fromGematria(trimmed);
  }, [hYearText]);

  // Detect leap year via Intl by checking if אדר ב׳ exists
  const isLeapYear = useMemo(() => {
    if (!hYearNumber) return false;
    const fmt = new Intl.DateTimeFormat('he-u-ca-hebrew', { year: 'numeric', month: 'long', day: 'numeric' });
    const start = new Date(hYearNumber - 3761, 5, 1); // June 1 of (Y-3761)
    for (let offset = 0; offset <= 500; offset++) {
      const d = new Date(start);
      d.setDate(d.getDate() + offset);
      const parts = fmt.formatToParts(d);
      const y = parseInt((parts.find((p) => p.type === 'year') || { value: '0' }).value, 10);
      const m = (parts.find((p) => p.type === 'month') || { value: '' }).value.replace(/^ב/, '').trim();
      if (y === hYearNumber && m === 'אדר ב׳') return true;
    }
    return false;
  }, [hYearNumber]);

  // Filter month list: leap years get אדר א׳/ב׳, non-leap years get plain אדר
  const availableMonths = useMemo(() => {
    const baseOrder = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט'];
    const adar = isLeapYear ? ['אדר א׳', 'אדר ב׳'] : ['אדר'];
    const rest = ['ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
    return [...baseOrder, ...adar, ...rest];
  }, [isLeapYear]);

  // Keep the month selection valid when the year changes
  useEffect(() => {
    if (!availableMonths.includes(hMonth)) {
      // If user was on one of the Adar variants and year changed, map to the right one
      if (['אדר', 'אדר א׳', 'אדר ב׳'].includes(hMonth)) {
        setHMonth(isLeapYear ? 'אדר ב׳' : 'אדר');
      } else {
        setHMonth(availableMonths[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableMonths]);

  const ghResult = useMemo(() => {
    const parts = gDate.split('-');
    if (parts.length !== 3) return null;
    const [y, m, d] = parts.map(Number);
    if (!y || !m || !d) return null;
    const date = new Date(y, m - 1, d);
    if (isNaN(date.getTime())) return null;
    return { date, heb: gregorianToHebrew(date) };
  }, [gDate]);

  const hgResult = useMemo(() => {
    if (!hYearNumber || !hMonth || typeof hDay !== 'number') return null;
    const g = hebrewToGregorian(hYearNumber, hMonth, hDay);
    return g ? { date: g, label: gregorianLabel(g) } : null;
  }, [hYearNumber, hMonth, hDay]);

  return (
    <CalcCard>
      <Tabs
        active={mode}
        onChange={(v) => setMode(v as any)}
        tabs={[
          { id: 'gh', label: 'לועזי → עברי' },
          { id: 'hg', label: 'עברי → לועזי' },
        ]}
      />

      {mode === 'gh' && (
        <>
          <div className="mt-6">
            <label className="label-base">תאריך לועזי</label>
            <input
              type="date"
              value={gDate}
              onChange={(e) => setGDate(e.target.value)}
              className="input-base w-full"
            />
          </div>
          {ghResult && (
            <div className="mt-6 rounded-xl border border-amber/30 bg-amber-wash/40 p-5">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="text-xs text-ink-muted">תאריך לועזי</div>
                  <div className="mt-1 text-xl font-bold text-ink">{gregorianLabel(ghResult.date)}</div>
                </div>
                <div>
                  <div className="text-xs text-ink-muted">תאריך עברי</div>
                  <div className="mt-1 text-2xl font-bold text-amber-ink">{ghResult.heb.full}</div>
                  <div className="mt-1 text-sm text-ink-muted">
                    {ghResult.heb.day} {ghResult.heb.monthName} {ghResult.heb.year}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {mode === 'hg' && (
        <>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div>
              <label className="label-base">יום</label>
              <input
                type="number"
                value={hDay}
                onChange={(e) =>
                  setHDay(e.target.value === '' ? '' : parseInt(e.target.value))
                }
                min={1}
                max={30}
                className="input-base w-full"
              />
            </div>
            <div>
              <label className="label-base">חודש עברי</label>
              <select
                value={hMonth}
                onChange={(e) => setHMonth(e.target.value)}
                className="input-base w-full"
              >
                {availableMonths.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-base">שנה עברית</label>
              <input
                type="text"
                value={hYearText}
                onChange={(e) => setHYearText(e.target.value)}
                placeholder="תשפ״ו"
                className="input-base w-full"
                dir="rtl"
              />
              <div className="mt-1 text-xs text-ink-muted">
                {hYearNumber > 0 ? `= ${hYearNumber}` : 'הקלד אותיות עבריות או מספר'}
              </div>
            </div>
          </div>

          {hgResult ? (
            <div className="mt-6 rounded-xl border border-amber/30 bg-amber-wash/40 p-5">
              <div className="text-xs text-ink-muted">תאריך לועזי</div>
              <div className="mt-1 text-2xl font-bold text-amber-ink">{hgResult.label}</div>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-line bg-cream-100 p-5 text-center text-sm text-ink-muted">
              לא נמצא תאריך לועזי מתאים. ודא שהחודש והיום תקינים עבור השנה שהוזנה.
            </div>
          )}
        </>
      )}

      <div className="mt-6 rounded-lg border border-line bg-cream-100 p-4 text-xs leading-relaxed text-ink-muted">
        המרת התאריכים מבוססת על לוח השנה העברי התקני המובנה בדפדפן. בשנים מעוברות (7
        פעמים בכל מחזור של 19 שנה) חודש &ldquo;אדר&rdquo; מוחלף ב&ldquo;אדר א׳&rdquo;
        ו&ldquo;אדר ב׳&rdquo;. ניתן להזין שנה כגימטריה (תשפ&rdquo;ו) או כמספר (5786).
      </div>
    </CalcCard>
  );
}
