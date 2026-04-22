'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, Select, ResultBlock, fmt, niceFmt } from '@/components/ui/Primitives';

type S = 'cube' | 'box' | 'cylinder' | 'sphere' | 'cone' | 'pyramid';

export default function Nefach() {
  const [shape, setShape] = useState<S>('box');
  const [a, setA] = useState<number | ''>(5);
  const [b, setB] = useState<number | ''>(4);
  const [c, setC] = useState<number | ''>(3);

  const A = Number(a), B = Number(b), C = Number(c);
  let v = 0, formula = '';
  if (shape === 'cube') { v = A ** 3; formula = 'a³'; }
  if (shape === 'box') { v = A * B * C; formula = 'a × b × c'; }
  if (shape === 'cylinder') { v = Math.PI * A * A * B; formula = 'π × r² × h'; }
  if (shape === 'sphere') { v = (4 / 3) * Math.PI * A ** 3; formula = '(4/3) × π × r³'; }
  if (shape === 'cone') { v = (1 / 3) * Math.PI * A * A * B; formula = '(1/3) × π × r² × h'; }
  if (shape === 'pyramid') { v = (A * B * C) / 3; formula = '(a × b × h) ÷ 3'; }

  const fields: Record<S, { l: string; val: number | ''; set: any }[]> = {
    cube: [{ l: 'צלע a', val: a, set: setA }],
    box: [{ l: 'אורך', val: a, set: setA }, { l: 'רוחב', val: b, set: setB }, { l: 'גובה', val: c, set: setC }],
    cylinder: [{ l: 'רדיוס r', val: a, set: setA }, { l: 'גובה h', val: b, set: setB }],
    sphere: [{ l: 'רדיוס r', val: a, set: setA }],
    cone: [{ l: 'רדיוס בסיס r', val: a, set: setA }, { l: 'גובה h', val: b, set: setB }],
    pyramid: [{ l: 'אורך בסיס', val: a, set: setA }, { l: 'רוחב בסיס', val: b, set: setB }, { l: 'גובה h', val: c, set: setC }],
  };

  return (
    <CalcCard>
      <Select
        label="גוף"
        value={shape}
        onChange={(x) => setShape(x as S)}
        options={[
          { value: 'cube', label: 'קובייה' },
          { value: 'box', label: 'תיבה' },
          { value: 'cylinder', label: 'גליל' },
          { value: 'sphere', label: 'כדור' },
          { value: 'cone', label: 'חרוט' },
          { value: 'pyramid', label: 'פירמידה' },
        ]}
      />
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {fields[shape].map((f, i) => <NumberInput key={i} label={f.l} value={f.val} onChange={f.set} min={0} step={0.1} />)}
      </div>
      <div className="mt-8">
        <ResultBlock label="נפח" value={niceFmt(v)} emphasis hint={formula} />
      </div>
    </CalcCard>
  );
}
