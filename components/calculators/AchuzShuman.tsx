'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, Select, ResultBlock, fmt } from '@/components/ui/Primitives';

export default function AchuzShuman() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState<number | ''>(170);
  const [waist, setWaist] = useState<number | ''>(85);
  const [neck, setNeck] = useState<number | ''>(38);
  const [hip, setHip] = useState<number | ''>(95);

  const H = Number(height);
  let bf = 0;
  if (gender === 'male') {
    bf = 86.01 * Math.log10(Number(waist) - Number(neck)) - 70.041 * Math.log10(H) + 36.76;
  } else {
    bf = 163.205 * Math.log10(Number(waist) + Number(hip) - Number(neck)) - 97.684 * Math.log10(H) - 78.387;
  }

  let cat = '';
  if (gender === 'male') {
    if (bf < 6) cat = 'שומן חיוני בלבד';
    else if (bf < 14) cat = 'אתלטי';
    else if (bf < 18) cat = 'כשיר';
    else if (bf < 25) cat = 'ממוצע';
    else cat = 'עודף שומן';
  } else {
    if (bf < 14) cat = 'שומן חיוני בלבד';
    else if (bf < 21) cat = 'אתלטי';
    else if (bf < 25) cat = 'כשיר';
    else if (bf < 32) cat = 'ממוצע';
    else cat = 'עודף שומן';
  }

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-2">
        <Select
          label="מין"
          value={gender}
          onChange={setGender}
          options={[
            { value: 'male', label: 'גבר' },
            { value: 'female', label: 'אישה' },
          ]}
        />
        <NumberInput label="גובה" value={height} onChange={setHeight} suffix="ס״מ" min={120} max={230} />
        <NumberInput label="היקף מותניים" value={waist} onChange={setWaist} suffix="ס״מ" min={40} max={200} hint="מדידה בגובה הטבור" />
        <NumberInput label="היקף צוואר" value={neck} onChange={setNeck} suffix="ס״מ" min={20} max={80} hint="מתחת לגרון" />
        {gender === 'female' && (
          <NumberInput label="היקף ירכיים" value={hip} onChange={setHip} suffix="ס״מ" min={50} max={200} />
        )}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <ResultBlock label="אחוז שומן" value={`${fmt(Math.max(0, bf), 1)}%`} emphasis />
        <ResultBlock label="קטגוריה" value={cat} />
      </div>
      <div className="mt-8 rounded-lg border border-line bg-cream-100 p-4 text-sm leading-relaxed text-ink-muted">
        החישוב מבוסס על שיטת חיל הים האמריקני (US Navy Method) — שיטה לא־פולשנית המבוססת על היקפים. דיוק: ±3-4%. לדיוק גבוה יותר נדרשת בדיקת DEXA או טבילה הידרוסטטית.
      </div>
    </CalcCard>
  );
}
