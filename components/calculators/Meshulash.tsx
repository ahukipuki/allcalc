'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, fmt, niceFmt } from '@/components/ui/Primitives';

export default function Meshulash() {
  const [a, setA] = useState<number | ''>(3);
  const [b, setB] = useState<number | ''>(4);
  const [c, setC] = useState<number | ''>(5);

  const A = Number(a), B = Number(b), C = Number(c);
  const valid = A + B > C && A + C > B && B + C > A;

  // Heron's formula for area
  const s = (A + B + C) / 2;
  const area = valid ? Math.sqrt(s * (s - A) * (s - B) * (s - C)) : 0;
  const perimeter = A + B + C;

  // Angles via law of cosines
  const angA = valid ? (Math.acos((B * B + C * C - A * A) / (2 * B * C)) * 180) / Math.PI : 0;
  const angB = valid ? (Math.acos((A * A + C * C - B * B) / (2 * A * C)) * 180) / Math.PI : 0;
  const angC = valid ? 180 - angA - angB : 0;

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-3">
        <NumberInput label="צלע a" value={a} onChange={setA} min={0} step={0.1} />
        <NumberInput label="צלע b" value={b} onChange={setB} min={0} step={0.1} />
        <NumberInput label="צלע c" value={c} onChange={setC} min={0} step={0.1} />
      </div>
      {!valid ? (
        <div className="mt-8 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          הצלעות לא יוצרות משולש (סכום שתי צלעות חייב להיות גדול מהשלישית).
        </div>
      ) : (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="שטח" v={niceFmt(area)} emphasis />
          <Stat label="היקף" v={niceFmt(perimeter)} />
          <Stat label="זווית A" v={`${fmt(angA, 2)}°`} />
          <Stat label="זווית B" v={`${fmt(angB, 2)}°`} />
          <Stat label="זווית C" v={`${fmt(angC, 2)}°`} />
          <Stat label="סכום זוויות" v="180°" />
        </div>
      )}
      <div className="mt-8 rounded-lg border border-line bg-cream-100 p-4 text-sm leading-relaxed text-ink-muted">
        השטח מחושב לפי נוסחת הרון: √(s(s−a)(s−b)(s−c)) כאשר s הוא חצי ההיקף. הזוויות מחושבות לפי משפט הקוסינוסים.
      </div>
    </CalcCard>
  );
}

function Stat({ label, v, emphasis }: { label: string; v: string; emphasis?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${emphasis ? 'border-amber/30 bg-amber-wash/40' : 'border-line bg-cream-100'}`}>
      <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">{label}</div>
      <div className={`display-num mt-1 text-xl font-bold ${emphasis ? 'text-amber-ink' : 'text-ink'}`}>{v}</div>
    </div>
  );
}
