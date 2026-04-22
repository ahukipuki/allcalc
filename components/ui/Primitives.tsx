'use client';

import { useState, useEffect, ReactNode } from 'react';

// Format Hebrew number with separators
export function fmt(n: number, decimals = 2): string {
  if (!isFinite(n)) return '—';
  return n.toLocaleString('he-IL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

// "Nice" formatter — picks precision by magnitude and uses he-IL thousands
// separator. Replacement for the old `fmt(n, N).replace(/\.?0+$/, '')` pattern,
// which incorrectly stripped trailing zeros from integers (e.g. 500 -> 5).
export function niceFmt(n: number, maxDecimals?: number): string {
  if (!isFinite(n)) return '—';
  if (n === 0) return '0';
  const abs = Math.abs(n);
  let decimals = maxDecimals;
  if (decimals === undefined) {
    if (abs >= 1000) decimals = 2;
    else if (abs >= 100) decimals = 3;
    else if (abs >= 1) decimals = 4;
    else if (abs >= 0.01) decimals = 6;
    else decimals = 8;
  }
  return n.toLocaleString('he-IL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function fmtCurrency(n: number, currency = '₪'): string {
  if (!isFinite(n)) return '—';
  return `${currency} ${fmt(n, 0)}`;
}

// ---- NumberInput ----
interface NumberInputProps {
  label: string;
  value: number | '';
  onChange: (v: number | '') => void;
  suffix?: string;
  prefix?: string;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
  placeholder?: string;
}

export function NumberInput({
  label,
  value,
  onChange,
  suffix,
  prefix,
  min,
  max,
  step,
  hint,
  placeholder,
}: NumberInputProps) {
  return (
    <div>
      <label className="label-base">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink-muted">
            {prefix}
          </span>
        )}
        <input
          type="text"
          inputMode="decimal"
          className={`input-base ${prefix ? 'pe-10' : ''} ${suffix ? 'ps-12' : ''}`}
          value={value === '' ? '' : value}
          placeholder={placeholder}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^\d.\-]/g, '');
            if (raw === '' || raw === '-') return onChange('');
            const n = parseFloat(raw);
            if (isNaN(n)) return;
            if (min !== undefined && n < min) return onChange(min);
            if (max !== undefined && n > max) return onChange(max);
            onChange(n);
          }}
        />
        {suffix && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-ink-muted">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="mt-1.5 text-xs text-ink-muted">{hint}</p>}
    </div>
  );
}

// ---- Select ----
interface SelectProps<T extends string> {
  label?: string;
  value: T;
  onChange: (v: T) => void;
  options: readonly { value: T; label: string }[];
}

export function Select<T extends string>({ label, value, onChange, options }: SelectProps<T>) {
  return (
    <div>
      {label && <label className="label-base">{label}</label>}
      <select
        className="input-base appearance-none bg-[length:14px] bg-[left_1rem_center] bg-no-repeat pe-4 ps-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='%2371717A' d='M8 11.5 3 6h10z'/></svg>\")",
        }}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ---- ResultBlock — the big result display ----
interface ResultBlockProps {
  label: string;
  value: string | ReactNode;
  hint?: string;
  emphasis?: boolean;
}

export function ResultBlock({ label, value, hint, emphasis = false }: ResultBlockProps) {
  return (
    <div
      className={`rounded-xl p-5 transition-colors ${
        emphasis
          ? 'border border-amber/30 bg-amber-wash/40'
          : 'border border-line bg-cream-100'
      }`}
    >
      <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">
        {label}
      </div>
      <div className={`display-num mt-2 text-2xl font-bold md:text-3xl ${emphasis ? 'text-amber-ink' : 'text-ink'}`}>
        {value}
      </div>
      {hint && <div className="mt-1 text-xs text-ink-muted">{hint}</div>}
    </div>
  );
}

// ---- Card layout for the form area ----
export function CalcCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-cream-50 p-6 shadow-soft md:p-8">
      {children}
    </div>
  );
}

// ---- Tabs ----
interface TabsProps {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}
export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="mb-6 inline-flex rounded-lg border border-line bg-cream-100 p-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
            active === t.id
              ? 'bg-cream-50 text-ink shadow-soft'
              : 'text-ink-muted hover:text-ink'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// Hook to debounce client-only mounting (avoid hydration issues for inputs)
export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}
