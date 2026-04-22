'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, Select, ResultBlock, fmt, niceFmt } from '@/components/ui/Primitives';

type Shape = 'square' | 'rectangle' | 'circle' | 'triangle' | 'trapezoid' | 'parallelogram';

export default function Shetach() {
  const [shape, setShape] = useState<Shape>('rectangle');
  const [a, setA] = useState<number | ''>(5);
  const [b, setB] = useState<number | ''>(8);
  const [c, setC] = useState<number | ''>(6);

  const A = Number(a), B = Number(b), C = Number(c);
  let area = 0, perimeter = 0, formula = '';

  if (shape === 'square') { area = A * A; perimeter = 4 * A; formula = 'a²'; }
  if (shape === 'rectangle') { area = A * B; perimeter = 2 * (A + B); formula = 'a × b'; }
  if (shape === 'circle') { area = Math.PI * A * A; perimeter = 2 * Math.PI * A; formula = 'π × r²'; }
  if (shape === 'triangle') { area = (A * B) / 2; perimeter = 0; formula = '(בסיס × גובה) ÷ 2'; }
  if (shape === 'trapezoid') { area = ((A + B) / 2) * C; perimeter = 0; formula = '((a + b) ÷ 2) × גובה'; }
  if (shape === 'parallelogram') { area = A * B; perimeter = 0; formula = 'בסיס × גובה'; }

  const fields: { [K in Shape]: { label: string; val: number | ''; set: any }[] } = {
    square: [{ label: 'צלע a', val: a, set: setA }],
    rectangle: [{ label: 'אורך', val: a, set: setA }, { label: 'רוחב', val: b, set: setB }],
    circle: [{ label: 'רדיוס r', val: a, set: setA }],
    triangle: [{ label: 'בסיס', val: a, set: setA }, { label: 'גובה', val: b, set: setB }],
    trapezoid: [{ label: 'בסיס a', val: a, set: setA }, { label: 'בסיס b', val: b, set: setB }, { label: 'גובה', val: c, set: setC }],
    parallelogram: [{ label: 'בסיס', val: a, set: setA }, { label: 'גובה', val: b, set: setB }],
  };

  return (
    <CalcCard>
      <Select
        label="צורה"
        value={shape}
        onChange={(v) => setShape(v as Shape)}
        options={[
          { value: 'square', label: 'ריבוע' },
          { value: 'rectangle', label: 'מלבן' },
          { value: 'circle', label: 'מעגל' },
          { value: 'triangle', label: 'משולש' },
          { value: 'trapezoid', label: 'טרפז' },
          { value: 'parallelogram', label: 'מקבילית' },
        ]}
      />
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {fields[shape].map((f, i) => (
          <NumberInput key={i} label={f.label} value={f.val} onChange={f.set} min={0} step={0.1} />
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <ResultBlock label="שטח" value={niceFmt(area)} emphasis hint={formula} />
        {perimeter > 0 && <ResultBlock label={shape === 'circle' ? 'היקף (עיגול)' : 'היקף'} value={niceFmt(perimeter)} />}
      </div>
    </CalcCard>
  );
}
