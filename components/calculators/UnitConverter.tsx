'use client';

import { useState } from 'react';
import { CalcCard } from '@/components/ui/Primitives';

export interface Unit {
  key: string;
  label: string;
  factor?: number;
  toBase?: (v: number) => number;
  fromBase?: (v: number) => number;
}

interface Props {
  units: Unit[];
  defaultFrom: string;
  defaultTo: string;
  defaultValue?: number;
  intro?: string;
}

// Smart formatter: picks reasonable precision by magnitude, uses he-IL thousands
// separator, and only strips trailing zeros within the decimal portion.
function niceFmt(n: number): string {
  if (!isFinite(n)) return '—';
  if (n === 0) return '0';
  const abs = Math.abs(n);
  let decimals = 4;
  if (abs >= 1000) decimals = 2;
  else if (abs >= 100) decimals = 3;
  else if (abs >= 1) decimals = 4;
  else if (abs >= 0.01) decimals = 6;
  else decimals = 8;
  const rounded = Number(n.toFixed(decimals));
  const [i, d] = rounded.toString().split('.');
  const intPart = parseInt(i, 10).toLocaleString('he-IL');
  return d ? `${intPart}.${d}` : intPart;
}

export function UnitConverter({ units, defaultFrom, defaultTo, defaultValue = 1, intro }: Props) {
  const [value, setValue] = useState<string>(String(defaultValue));
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);

  const cleaned = value.replace(/[^\d.,\-]/g, '');
  const normalized =
    cleaned.includes(',') && !cleaned.includes('.')
      ? cleaned.replace(',', '.')
      : cleaned.replace(/,/g, '');
  const num = parseFloat(normalized);
  const fromU = units.find((u) => u.key === from)!;
  const toU = units.find((u) => u.key === to)!;

  const base = !isNaN(num)
    ? fromU.toBase ? fromU.toBase(num) : num * (fromU.factor ?? 1)
    : NaN;
  const result = !isNaN(base)
    ? toU.fromBase ? toU.fromBase(base) : base / (toU.factor ?? 1)
    : NaN;

  return (
    <CalcCard>
      <div className="grid items-end gap-4 md:grid-cols-[1fr_auto_1fr]">
        <div>
          <label className="label-base">מ־</label>
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="decimal"
              value={value}
              onChange={(e) => setValue(e.target.value.replace(/[^\d.\-]/g, ''))}
              className="input-base flex-1"
            />
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="input-base w-32"
            >
              {units.map((u) => (
                <option key={u.key} value={u.key}>{u.label}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={() => { setFrom(to); setTo(from); }}
          className="mb-1 grid h-11 w-11 place-items-center rounded-lg border border-line bg-cream-100 text-ink-muted transition-colors hover:bg-cream-200 hover:text-amber"
          title="החלף יחידות"
          aria-label="החלף יחידות"
        >
          ⇌
        </button>
        <div>
          <label className="label-base">ל־</label>
          <div className="flex gap-2">
            <div className="input-base flex-1 bg-cream-100">
              <span className="num">{niceFmt(result)}</span>
            </div>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="input-base w-32"
            >
              {units.map((u) => (
                <option key={u.key} value={u.key}>{u.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {!isNaN(num) && (
        <div className="mt-8">
          <div className="mb-3 text-sm font-medium text-ink-soft">המרה לכל היחידות:</div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {units.map((u) => {
              const v = u.fromBase ? u.fromBase(base) : base / (u.factor ?? 1);
              return (
                <div key={u.key} className="rounded-lg border border-line bg-cream-100 px-3 py-2">
                  <div className="text-xs text-ink-muted">{u.label}</div>
                  <div className="num text-sm font-medium text-ink">{niceFmt(v)}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {intro && (
        <div className="mt-8 rounded-lg border border-line bg-cream-100 p-4 text-sm leading-relaxed text-ink-muted">
          {intro}
        </div>
      )}
    </CalcCard>
  );
}
