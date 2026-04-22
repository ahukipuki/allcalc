'use client';

import { useState, useMemo } from 'react';
import { CalcCard, Tabs } from '@/components/ui/Primitives';

// Hebrew month names as returned by Intl (no ב prefix when standalone)
const HEBREW_MONTHS_ORDERED = [
  'תשרי', 'חשון', 'כסלו', 'טבת', 'שבט',
  'אדר', 'אדר א׳', 'אדר ב׳',
  'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול',
];

function gregorianToHebrew(date: Date): {
  year: number;
  monthName: string;
  day: number;
  full: string;
} {
  const fmt = new Intl.DateTimeFormat('he-u-ca-hebrew', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const parts = fmt.formatToParts(date);
  // Hebrew number format: "י׳ באייר ה׳תשפ״ו" — we want to remove the "ב" prefix from month
  let year = '';
  let monthName = '';
  let day = '';
  for (const p of parts) {
    if (p.type === 'year') year = p.value;
    else if (p.type === 'month') monthName = p.value.replace(/^ב/, '');
    else if (p.type === 'day') day = p.value;
  }
  const full = fmt.format(date);
  // Convert gematria year to arabic by brute-force searching
  const yearNum = parseGematria(year);
  const dayNum = parseInt(day, 10);
  return {
    year: yearNum,
    monthName,
    day: dayNum,
    full,
  };
}

// Parse Hebrew year string like "ה׳תשפ״ו" back to a number
function parseGematria(s: string): number {
  const letters: Record<string, number> = {
    א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9,
    י: 10, כ: 20, ך: 20, ל: 30, מ: 40, ם: 40, נ: 50, ן: 50,
    ס: 60, ע: 70, פ: 80, ף: 80, צ: 90, ץ: 90, ק: 100, ר: 200, ש: 300, ת: 400,
  };
  let total = 0;
  let thousands = 0;
  const clean = s.replace(/[׳״'"]/g, '');
  for (const ch of clean) {
    if (letters[ch] !== undefined) {
      total += letters[ch];
    }
  }
  // If year starts with ה (5000), it's actually ה'תשפ"ו means 5786
  if (clean.startsWith('ה')) {
    // First letter is thousands
    total += 5000 - letters['ה'];
  }
  return total;
}

function hebrewToGregorian(year: number, monthName: string, day: number): Date | null {
  // Normalize the user's month input to match what Intl returns
  const normMonth = monthName.trim();
  const fmt = new Intl.DateTimeFormat('he-u-ca-hebrew', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  // Hebrew year Y ≈ Gregorian year Y-3761 to Y-3760
  const approxGreg = year - 3761;
  const start = new Date(approxGreg, 0, 1);
  for (let offset = -10; offset <= 400; offset++) {
    const d = new Date(start);
    d.setDate(d.getDate() + offset);
    const parts = fmt.formatToParts(d);
    const y = parseGematria((parts.find((p) => p.type === 'year') || { value: '' }).value);
    let m = (parts.find((p) => p.type === 'month') || { value: '' }).value.replace(/^ב/, '');
    const dd = parseInt((parts.find((p) => p.type === 'day') || { value: '0' }).value, 10);
    if (y === year && dd === day && (m === normMonth || m.includes(normMonth) || normMonth.includes(m))) {
      return d;
    }
  }
  return null;
}

function gregorianYMD(d: Date): string {
  return d.toLocaleDateString('he-IL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function HebrewDate() {
  const [mode, setMode] = useState<'gh' | 'hg'>('gh');
  const today = new Date();

  // Gregorian → Hebrew state
  const [gDate, setGDate] = useState(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  );

  // Hebrew → Gregorian state
  const [hYear, setHYear] = useState<number | ''>(5786);
  const [hMonth, setHMonth] = useState<string>('תשרי');
  const [hDay, setHDay] = useState<number | ''>(1);

  const ghResult = useMemo(() => {
    const parts = gDate.split('-');
    if (parts.length !== 3) return null;
    const [y, m, d] = parts.map(Number);
    if (!y || !m || !d) return null;
    const date = new Date(y, m - 1, d);
    if (isNaN(date.getTime())) return null;
    const heb = gregorianToHebrew(date);
    return { date, heb };
  }, [gDate]);

  const hgResult = useMemo(() => {
    if (typeof hYear !== 'number' || typeof hDay !== 'number' || !hMonth) return null;
    const g = hebrewToGregorian(hYear, hMonth, hDay);
    if (!g) return null;
    return { date: g, gregorianText: gregorianYMD(g) };
  }, [hYear, hMonth, hDay]);

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
                  <div className="text-xl font-bold text-ink">{gregorianYMD(ghResult.date)}</div>
                </div>
                <div>
                  <div className="text-xs text-ink-muted">תאריך עברי</div>
                  <div className="text-xl font-bold text-amber">{ghResult.heb.full}</div>
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
                onChange={(e) => setHDay(e.target.value === '' ? '' : parseInt(e.target.value))}
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
                {HEBREW_MONTHS_ORDERED.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-base">שנה עברית</label>
              <input
                type="number"
                value={hYear}
                onChange={(e) => setHYear(e.target.value === '' ? '' : parseInt(e.target.value))}
                min={5000}
                max={6000}
                className="input-base w-full"
              />
            </div>
          </div>
          {hgResult ? (
            <div className="mt-6 rounded-xl border border-amber/30 bg-amber-wash/40 p-5">
              <div>
                <div className="text-xs text-ink-muted">תאריך לועזי</div>
                <div className="text-2xl font-bold text-amber">{hgResult.gregorianText}</div>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-amber/30 bg-amber-wash/40 p-5">
              <div className="text-center text-ink-muted">
                לא נמצא תאריך לועזי מתאים. ודא שהקלט תקין (חודש קיים בשנה המבוקשת).
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-6 rounded-lg border border-line bg-cream-100 p-4 text-xs leading-relaxed text-ink-muted">
        המרת תאריכים מבוססת על לוח השנה העברי התקני המוטבע בדפדפן. חודש &ldquo;אדר&rdquo;
        מחולק ל&ldquo;אדר א׳&rdquo; ו&ldquo;אדר ב׳&rdquo; בשנים מעוברות (7 פעמים בכל מחזור של 19 שנה).
      </div>
    </CalcCard>
  );
}
