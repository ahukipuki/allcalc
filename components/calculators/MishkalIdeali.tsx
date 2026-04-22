'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, Select, fmt } from '@/components/ui/Primitives';

export default function MishkalIdeali() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState<number | ''>(170);

  const hIn = Number(height) / 2.54; // cm to inches
  const over60 = Math.max(0, hIn - 60);
  const isMale = gender === 'male';

  const devine = isMale ? 50 + 2.3 * over60 : 45.5 + 2.3 * over60;
  const robinson = isMale ? 52 + 1.9 * over60 : 49 + 1.7 * over60;
  const miller = isMale ? 56.2 + 1.41 * over60 : 53.1 + 1.36 * over60;
  const hamwi = isMale ? 48 + 2.7 * over60 : 45.5 + 2.2 * over60;

  const avg = (devine + robinson + miller + hamwi) / 4;

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
      </div>

      <div className="mt-8">
        <div className="rounded-xl border border-amber/30 bg-amber-wash/40 p-5">
          <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">ממוצע נוסחאות</div>
          <div className="display-num mt-2 text-3xl font-bold text-amber-ink">{fmt(avg, 1)} ק״ג</div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Row name="נוסחת Devine (1974)" v={devine} />
          <Row name="נוסחת Robinson (1983)" v={robinson} />
          <Row name="נוסחת Miller (1983)" v={miller} />
          <Row name="נוסחת Hamwi (1964)" v={hamwi} />
        </div>
      </div>
      <div className="mt-8 rounded-lg border border-line bg-cream-100 p-4 text-sm leading-relaxed text-ink-muted">
        אין &ldquo;משקל אידיאלי&rdquo; אחד — מספר נוסחאות רפואיות שונות נותנות תוצאות שונות. המשקל האידיאלי מהווה אמצעי הערכה כללי ולא תחליף להתייעצות עם רופא או דיאטן.
      </div>
    </CalcCard>
  );
}

function Row({ name, v }: { name: string; v: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-line bg-cream-50 px-4 py-3">
      <span className="text-sm text-ink-soft">{name}</span>
      <span className="num font-display text-lg font-semibold text-ink">{fmt(v, 1)} ק״ג</span>
    </div>
  );
}
