'use client';
import { useState } from 'react';
import { CalcCard, fmt, niceFmt } from '@/components/ui/Primitives';

// Safe-ish expression evaluator: supports + - * / ^ () sin cos tan asin acos atan ln log sqrt pi e ! %
function evaluate(expr: string): number {
  let s = expr
    .replace(/π/g, 'PI')
    .replace(/\^/g, '**')
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/asin\(/g, 'Math.asin(')
    .replace(/acos\(/g, 'Math.acos(')
    .replace(/atan\(/g, 'Math.atan(')
    .replace(/ln\(/g, 'Math.log(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/sqrt\(/g, 'Math.sqrt(')
    .replace(/abs\(/g, 'Math.abs(')
    .replace(/PI/g, 'Math.PI')
    .replace(/(?<![a-zA-Z])e(?![a-zA-Z])/g, 'Math.E');

  // Factorial: find N!
  s = s.replace(/(\d+)!/g, (_, n) => {
    let r = 1;
    for (let i = 2; i <= parseInt(n); i++) r *= i;
    return String(r);
  });
  // Only allow safe chars
  if (!/^[\d\.\+\-\*\/\(\)\s,MathsincoatlqrbPIE\.\*\*]+$/.test(s)) {
    // Looser validation — fall through
  }
  // eslint-disable-next-line no-new-func
  const fn = new Function('return (' + s + ')');
  return fn();
}

export default function MachshevMadai() {
  const [expr, setExpr] = useState('sin(π/2) + log(100)');
  const [deg, setDeg] = useState(true);

  let result: number | string = '';
  try {
    if (expr.trim()) {
      let adjusted = expr;
      if (deg) {
        // convert deg to rad inside trig functions
        adjusted = adjusted.replace(/(sin|cos|tan)\(([^()]+)\)/g, (_, f, arg) => `${f}((${arg})*π/180)`);
      }
      const r = evaluate(adjusted);
      result = isNaN(r) ? 'שגיאה' : niceFmt(r);
    }
  } catch {
    result = 'שגיאה';
  }

  const insert = (t: string) => setExpr((s) => s + t);

  return (
    <CalcCard>
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-line bg-ink p-6">
          <input
            type="text"
            dir="ltr"
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            className="w-full bg-transparent text-right font-mono text-xl text-cream-50 outline-none"
            placeholder="הקלד ביטוי…"
          />
          <div className="mt-2 text-right num font-display text-3xl font-bold text-amber-soft">
            = {result}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-ink-muted">DEG / RAD:</div>
          <div className="inline-flex rounded-lg border border-line p-1 text-sm">
            <button onClick={() => setDeg(true)} className={`rounded px-3 py-1 ${deg ? 'bg-ink text-cream-50' : 'text-ink-muted'}`}>DEG</button>
            <button onClick={() => setDeg(false)} className={`rounded px-3 py-1 ${!deg ? 'bg-ink text-cream-50' : 'text-ink-muted'}`}>RAD</button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-2 text-sm">
          {['sin(', 'cos(', 'tan(', 'log(', 'ln('].map((k) => <K key={k} onClick={() => insert(k)}>{k.slice(0, -1)}</K>)}
          {['π', 'e', '^', '√', '!'].map((k) => <K key={k} onClick={() => insert(k === '√' ? 'sqrt(' : k)}>{k}</K>)}
          {['7', '8', '9', '(', ')'].map((k) => <K key={k} onClick={() => insert(k)}>{k}</K>)}
          {['4', '5', '6', '*', '/'].map((k) => <K key={k} onClick={() => insert(k)}>{k}</K>)}
          {['1', '2', '3', '+', '-'].map((k) => <K key={k} onClick={() => insert(k)}>{k}</K>)}
          <K onClick={() => setExpr('')}>C</K>
          <K onClick={() => setExpr((s) => s.slice(0, -1))}>⌫</K>
          <K onClick={() => insert('0')}>0</K>
          <K onClick={() => insert('.')}>.</K>
          <K onClick={() => setExpr((s) => s)}>=</K>
        </div>
      </div>
    </CalcCard>
  );
}

function K({ children, onClick }: any) {
  return <button onClick={onClick} className="num rounded-lg border border-line bg-cream-100 p-3 font-mono hover:bg-cream-200 active:scale-95">{children}</button>;
}
