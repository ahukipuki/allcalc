'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, Select, ResultBlock, fmt } from '@/components/ui/Primitives';

export default function ShtiyatMayim() {
  const [weight, setWeight] = useState<number | ''>(70);
  const [activity, setActivity] = useState('moderate');
  const [climate, setClimate] = useState('normal');

  const base = Number(weight) * 35; // mL per kg
  const actMul = activity === 'low' ? 0.9 : activity === 'moderate' ? 1 : activity === 'high' ? 1.15 : 1.3;
  const climMul = climate === 'hot' ? 1.15 : 1;
  const totalMl = base * actMul * climMul;
  const totalL = totalMl / 1000;
  const cups = totalMl / 250;

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-3">
        <NumberInput label="משקל" value={weight} onChange={setWeight} suffix="ק״ג" min={10} max={300} />
        <Select
          label="פעילות גופנית"
          value={activity}
          onChange={setActivity}
          options={[
            { value: 'low', label: 'נמוכה' },
            { value: 'moderate', label: 'בינונית' },
            { value: 'high', label: 'גבוהה' },
            { value: 'athlete', label: 'אתלטי' },
          ]}
        />
        <Select
          label="אקלים"
          value={climate}
          onChange={setClimate}
          options={[
            { value: 'normal', label: 'ממוזג' },
            { value: 'hot', label: 'חם (קיץ ישראלי)' },
          ]}
        />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <ResultBlock label="כמות מומלצת ליום" value={`${fmt(totalL, 2)} ליטר`} emphasis hint={`${fmt(totalMl, 0)} מ״ל`} />
        <ResultBlock label="בכוסות (250 מ״ל)" value={`${fmt(cups, 1)} כוסות`} />
      </div>
      <div className="mt-8 rounded-lg border border-line bg-cream-100 p-4 text-sm leading-relaxed text-ink-muted">
        ההמלצה הכללית היא כ־35 מ״ל מים לכל ק״ג משקל. בקיץ ישראלי או בפעילות גופנית הכמות עולה. שימו לב שצריכת המים כוללת גם מים ממזון (פירות וירקות).
      </div>
    </CalcCard>
  );
}
