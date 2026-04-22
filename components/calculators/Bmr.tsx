'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, Select, ResultBlock, fmt } from '@/components/ui/Primitives';

export default function Bmr() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number | ''>(30);
  const [height, setHeight] = useState<number | ''>(170);
  const [weight, setWeight] = useState<number | ''>(70);

  const bmr =
    gender === 'male'
      ? 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5
      : 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161;

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
        <NumberInput label="גיל" value={age} onChange={setAge} suffix="שנים" min={10} max={120} />
        <NumberInput label="גובה" value={height} onChange={setHeight} suffix="ס״מ" min={50} max={250} />
        <NumberInput label="משקל" value={weight} onChange={setWeight} suffix="ק״ג" min={10} max={300} />
      </div>
      <div className="mt-8">
        <ResultBlock
          label="BMR — קצב חילוף חומרים בסיסי"
          value={`${fmt(bmr, 0)} קק״ל / יום`}
          emphasis
          hint="כמה קלוריות הגוף שורף במנוחה מוחלטת"
        />
      </div>
      <div className="mt-8 rounded-lg border border-line bg-cream-100 p-4 text-sm leading-relaxed text-ink-muted">
        החישוב מבוסס על נוסחת Mifflin־St Jeor — הנוסחה המדויקת ביותר לחישוב BMR לפי הוועדה האמריקאית לתזונה. לצריכה יומית מלאה (TDEE) הכפילו את ה־BMR במקדם פעילות — השתמשו במחשבון קלוריות יומיות.
      </div>
    </CalcCard>
  );
}
