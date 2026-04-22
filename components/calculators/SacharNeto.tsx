'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, ResultBlock, fmt } from '@/components/ui/Primitives';

const TAX_BRACKETS = [
  { upTo: 7010, rate: 0.10 },
  { upTo: 10060, rate: 0.14 },
  { upTo: 16150, rate: 0.20 },
  { upTo: 22440, rate: 0.31 },
  { upTo: 46690, rate: 0.35 },
  { upTo: 60130, rate: 0.47 },
  { upTo: Infinity, rate: 0.50 },
];
const POINT = 247;
// National insurance approximate brackets for employee:
// up to 7,522 – 0.4% NI + 3.1% health = 3.5%
// above – 7% NI + 5% health = 12%
const NI_THRESHOLD = 7522;
const PENSION_RATE = 0.06; // typical employee pension contribution

function calcTax(s: number) {
  let t = 0, p = 0;
  for (const b of TAX_BRACKETS) {
    if (s > p) { t += (Math.min(s, b.upTo) - p) * b.rate; p = b.upTo; } else break;
  }
  return t;
}

export default function SacharNeto() {
  const [gross, setGross] = useState<number | ''>(15000);
  const [points, setPoints] = useState<number | ''>(2.25);
  const [pension, setPension] = useState<number | ''>(6);

  const G = Number(gross);
  const tax = Math.max(0, calcTax(G) - Number(points) * POINT);
  // National insurance + health
  const niLow = Math.min(G, NI_THRESHOLD) * 0.035;
  const niHigh = G > NI_THRESHOLD ? (G - NI_THRESHOLD) * 0.12 : 0;
  const ni = niLow + niHigh;
  const pensionAmt = G * (Number(pension) / 100);
  const net = G - tax - ni - pensionAmt;

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-3">
        <NumberInput label="שכר ברוטו" value={gross} onChange={setGross} prefix="₪" min={0} />
        <NumberInput label="נקודות זיכוי" value={points} onChange={setPoints} min={0} max={10} step={0.25} />
        <NumberInput label="הפרשה לפנסיה" value={pension} onChange={setPension} suffix="%" min={0} max={20} step={0.5} />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <ResultBlock label="שכר נטו" value={`₪ ${fmt(net, 0)}`} emphasis hint={`${fmt((net / G) * 100, 1)}% מהברוטו`} />
        <div className="space-y-2 rounded-xl border border-line bg-cream-100 p-5">
          <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">פירוט ניכויים</div>
          <Row label="מס הכנסה" v={tax} />
          <Row label="ביטוח לאומי + בריאות" v={ni} />
          <Row label="פנסיה (עובד)" v={pensionAmt} />
          <div className="!mt-3 border-t border-line pt-2">
            <Row label="סך ניכויים" v={tax + ni + pensionAmt} bold />
          </div>
        </div>
      </div>
      <p className="mt-6 text-xs text-ink-muted">
        החישוב מקורב ומבוסס על המדרגות המעודכנות. אינו כולל הטבות מס נוספות, קופ״ג, החזר הוצאות, נסיעות, פיצויים מתוך תלוש או חישובים מיוחדים.
      </p>
    </CalcCard>
  );
}

function Row({ label, v, bold }: { label: string; v: number; bold?: boolean }) {
  return (
    <div className={`flex justify-between text-sm ${bold ? 'font-semibold text-ink' : 'text-ink-soft'}`}>
      <span>{label}</span>
      <span className="num">₪ {fmt(v, 0)}</span>
    </div>
  );
}
