'use client';
import { useState } from 'react';
import { CalcCard, NumberInput, ResultBlock, fmt } from '@/components/ui/Primitives';

export default function Hisachon() {
  const [goal, setGoal] = useState<number | ''>(100000);
  const [years, setYears] = useState<number | ''>(5);
  const [rate, setRate] = useState<number | ''>(4);
  const [start, setStart] = useState<number | ''>(0);

  const G = Number(goal), Y = Number(years), S = Number(start);
  const i = Number(rate) / 100 / 12;
  const n = Y * 12;
  // FV = S*(1+i)^n + C*((1+i)^n - 1)/i  →  solve for C
  const fvStart = S * Math.pow(1 + i, n);
  const remaining = G - fvStart;
  let monthly = 0;
  if (i === 0) monthly = remaining / n;
  else monthly = (remaining * i) / (Math.pow(1 + i, n) - 1);

  return (
    <CalcCard>
      <div className="grid gap-5 md:grid-cols-2">
        <NumberInput label="יעד החיסכון" value={goal} onChange={setGoal} prefix="₪" min={0} />
        <NumberInput label="סכום התחלתי" value={start} onChange={setStart} prefix="₪" min={0} />
        <NumberInput label="תקופה" value={years} onChange={setYears} suffix="שנים" min={1} max={50} />
        <NumberInput label="ריבית שנתית ממוצעת" value={rate} onChange={setRate} suffix="%" min={0} max={30} step={0.1} />
      </div>
      <div className="mt-8">
        <ResultBlock
          label="כמה צריך להפקיד בכל חודש"
          value={monthly > 0 ? `₪ ${fmt(monthly, 0)}` : 'יעד הושג'}
          emphasis
          hint={monthly > 0 ? `כדי להגיע ל־₪${fmt(G, 0)} בעוד ${Y} שנים` : 'הסכום ההתחלתי כבר עולה על היעד'}
        />
      </div>
    </CalcCard>
  );
}
