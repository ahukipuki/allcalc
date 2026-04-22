'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, ResultBlock, Tabs, fmt, niceFmt } from '@/components/ui/Primitives';

export default function Achuzim() {
  const [mode, setMode] = useState('of');
  const [a, setA] = useState<number | ''>(20);
  const [b, setB] = useState<number | ''>(150);

  const A = Number(a), B = Number(b);
  let result = 0, label = '', formula = '';
  if (mode === 'of') {
    result = (A / 100) * B;
    label = `${A}% מתוך ${B}`;
    formula = `(${A} ÷ 100) × ${B}`;
  } else if (mode === 'is') {
    result = B === 0 ? 0 : (A / B) * 100;
    label = `${A} זה כמה אחוזים מ־${B}`;
    formula = `${A} ÷ ${B} × 100`;
  } else if (mode === 'change') {
    result = A === 0 ? 0 : ((B - A) / A) * 100;
    label = `שינוי מ־${A} ל־${B}`;
    formula = `(${B} − ${A}) ÷ ${A} × 100`;
  } else {
    result = A * (1 + B / 100);
    label = `${A} בתוספת ${B}%`;
    formula = `${A} × (1 + ${B}/100)`;
  }

  return (
    <CalcCard>
      <Tabs
        active={mode}
        onChange={setMode}
        tabs={[
          { id: 'of', label: 'X% מ־Y' },
          { id: 'is', label: 'X הוא כמה % מ־Y' },
          { id: 'change', label: 'שינוי באחוזים' },
          { id: 'add', label: 'הוספה' },
        ]}
      />
      <div className="grid gap-5 md:grid-cols-2">
        <NumberInput
          label={mode === 'of' ? 'אחוז' : mode === 'is' ? 'מספר ראשון' : mode === 'change' ? 'ערך מקורי' : 'מספר'}
          value={a}
          onChange={setA}
          suffix={mode === 'of' ? '%' : undefined}
        />
        <NumberInput
          label={mode === 'of' ? 'מספר' : mode === 'is' ? 'מתוך' : mode === 'change' ? 'ערך חדש' : 'אחוז להוספה'}
          value={b}
          onChange={setB}
          suffix={mode === 'add' ? '%' : undefined}
        />
      </div>
      <div className="mt-8">
        <ResultBlock
          label={label}
          value={`${niceFmt(result)}${mode === 'is' || mode === 'change' ? '%' : ''}`}
          emphasis
          hint={formula}
        />
      </div>
    </CalcCard>
  );
}
