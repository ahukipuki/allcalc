'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, ResultBlock, fmt } from '@/components/ui/Primitives';

export default function Delek() {
  const [km, setKm] = useState<number | ''>(500);
  const [consumption, setConsumption] = useState<number | ''>(14);
  const [price, setPrice] = useState<number | ''>(7.2);

  const liters = Number(km) / Number(consumption);
  const cost = liters * Number(price);
  const perKm = Number(km) > 0 ? cost / Number(km) : 0;

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-3">
        <NumberInput label="מרחק הנסיעה" value={km} onChange={setKm} suffix="ק״מ" min={0} />
        <NumberInput label="צריכת דלק" value={consumption} onChange={setConsumption} suffix="ק״מ/ל׳" min={0.1} hint="ק״מ לכל ליטר" />
        <NumberInput label="מחיר ליטר" value={price} onChange={setPrice} prefix="₪" min={0} step={0.01} hint="מחיר דלק עדכני בישראל" />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <ResultBlock label="ליטרים שיידרשו" value={`${fmt(liters, 2)} ל׳`} />
        <ResultBlock label="עלות הנסיעה" value={`₪ ${fmt(cost, 2)}`} emphasis />
        <ResultBlock label="עלות לק״מ" value={`₪ ${fmt(perKm, 2)}`} />
      </div>
    </CalcCard>
  );
}
