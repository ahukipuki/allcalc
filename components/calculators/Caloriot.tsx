'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, Select, ResultBlock, fmt } from '@/components/ui/Primitives';

const ACTIVITY = [
  { value: '1.2', label: 'יושבני — ללא פעילות' },
  { value: '1.375', label: 'פעילות קלה — 1-3 פעמים בשבוע' },
  { value: '1.55', label: 'פעילות בינונית — 3-5 פעמים' },
  { value: '1.725', label: 'פעיל מאוד — 6-7 פעמים' },
  { value: '1.9', label: 'אתלטי — פעילות עצימה יומית' },
] as const;

export default function Caloriot() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number | ''>(30);
  const [height, setHeight] = useState<number | ''>(170);
  const [weight, setWeight] = useState<number | ''>(70);
  const [activity, setActivity] = useState('1.55');

  const bmr =
    gender === 'male'
      ? 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5
      : 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161;

  const tdee = bmr * parseFloat(activity);

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
        <div className="md:col-span-2">
          <Select label="רמת פעילות" value={activity} onChange={setActivity} options={ACTIVITY} />
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <ResultBlock label="לירידה במשקל" value={`${fmt(tdee - 500, 0)} קק״ל`} hint="גירעון של 500 קק״ל ליום — כ־0.5 ק״ג בשבוע" />
        <ResultBlock label="שמירה על משקל" value={`${fmt(tdee, 0)} קק״ל`} emphasis />
        <ResultBlock label="לעלייה במסת שריר" value={`${fmt(tdee + 300, 0)} קק״ל`} hint="עודף של 300 קק״ל ליום" />
      </div>
      <div className="mt-8 rounded-lg border border-line bg-cream-100 p-4 text-sm leading-relaxed text-ink-muted">
        TDEE (סך הוצאת אנרגיה יומית) הוא סכום ה־BMR (חילוף חומרים במנוחה) בתוספת הקלוריות שנשרפות בפעילות יומית ובפעילות גופנית. זהו בסיס לבניית תפריט דיאטה או עלייה במסה.
      </div>
    </CalcCard>
  );
}
