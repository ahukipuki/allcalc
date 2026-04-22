'use client';
import { useState, useEffect, useCallback } from 'react';
import { CalcCard } from '@/components/ui/Primitives';

export default function MachshevRagil() {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [resetOnNext, setResetOnNext] = useState(false);

  const inputDigit = useCallback((d: string) => {
    if (resetOnNext) { setDisplay(d); setResetOnNext(false); return; }
    setDisplay((s) => (s === '0' ? d : s + d));
  }, [resetOnNext]);

  const inputDot = useCallback(() => {
    if (resetOnNext) { setDisplay('0.'); setResetOnNext(false); return; }
    setDisplay((s) => (s.includes('.') ? s : s + '.'));
  }, [resetOnNext]);

  const clear = useCallback(() => { setDisplay('0'); setPrev(null); setOp(null); }, []);

  const calculate = useCallback((a: number, b: number, o: string): number => {
    if (o === '+') return a + b; if (o === '−') return a - b;
    if (o === '×') return a * b; if (o === '÷') return b === 0 ? NaN : a / b;
    if (o === '%') return (a * b) / 100;
    return b;
  }, []);

  const perform = useCallback((o: string) => {
    const cur = parseFloat(display);
    if (prev !== null && op && !resetOnNext) {
      const res = calculate(prev, cur, op);
      setDisplay(String(res));
      setPrev(res);
    } else {
      setPrev(cur);
    }
    setOp(o);
    setResetOnNext(true);
  }, [display, prev, op, resetOnNext, calculate]);

  const equals = useCallback(() => {
    const cur = parseFloat(display);
    if (prev !== null && op) {
      setDisplay(String(calculate(prev, cur, op)));
      setPrev(null); setOp(null); setResetOnNext(true);
    }
  }, [display, prev, op, calculate]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (/[0-9]/.test(e.key)) inputDigit(e.key);
      else if (e.key === '.') inputDot();
      else if (e.key === '+') perform('+');
      else if (e.key === '-') perform('−');
      else if (e.key === '*') perform('×');
      else if (e.key === '/') { e.preventDefault(); perform('÷'); }
      else if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); equals(); }
      else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') clear();
      else if (e.key === 'Backspace') setDisplay((s) => s.length > 1 ? s.slice(0, -1) : '0');
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [inputDigit, inputDot, perform, equals, clear]);

  const Btn = ({ children, onClick, variant }: any) => (
    <button
      onClick={onClick}
      className={`num rounded-xl p-4 text-xl font-semibold transition-all active:scale-95 ${
        variant === 'op' ? 'bg-amber text-cream-50 hover:bg-amber-ink' :
        variant === 'eq' ? 'bg-ink text-cream-50 hover:bg-ink-soft' :
        variant === 'clear' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
        'bg-cream-100 text-ink hover:bg-cream-200'
      }`}
    >{children}</button>
  );

  return (
    <CalcCard>
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-line bg-ink p-6 text-left">
          <div className="text-xs text-ink-faint">{prev !== null && op ? `${prev} ${op}` : ''}</div>
          <div className="mt-1 overflow-x-auto text-right num text-5xl font-display font-bold text-cream-50">{display}</div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          <Btn variant="clear" onClick={clear}>C</Btn>
          <Btn onClick={() => setDisplay((s) => s.startsWith('-') ? s.slice(1) : '-' + s)}>±</Btn>
          <Btn onClick={() => perform('%')}>%</Btn>
          <Btn variant="op" onClick={() => perform('÷')}>÷</Btn>

          <Btn onClick={() => inputDigit('7')}>7</Btn>
          <Btn onClick={() => inputDigit('8')}>8</Btn>
          <Btn onClick={() => inputDigit('9')}>9</Btn>
          <Btn variant="op" onClick={() => perform('×')}>×</Btn>

          <Btn onClick={() => inputDigit('4')}>4</Btn>
          <Btn onClick={() => inputDigit('5')}>5</Btn>
          <Btn onClick={() => inputDigit('6')}>6</Btn>
          <Btn variant="op" onClick={() => perform('−')}>−</Btn>

          <Btn onClick={() => inputDigit('1')}>1</Btn>
          <Btn onClick={() => inputDigit('2')}>2</Btn>
          <Btn onClick={() => inputDigit('3')}>3</Btn>
          <Btn variant="op" onClick={() => perform('+')}>+</Btn>

          <div className="col-span-2"><Btn onClick={() => inputDigit('0')}>0</Btn></div>
          <Btn onClick={inputDot}>.</Btn>
          <Btn variant="eq" onClick={equals}>=</Btn>
        </div>
        <p className="mt-4 text-center text-xs text-ink-muted">תמיכה במקלדת: מספרים, + − × ÷, Enter, Esc</p>
      </div>
    </CalcCard>
  );
}
