'use client';
import { UnitConverter } from './UnitConverter';

export default function UnitEnrgia() {
  return (
    <UnitConverter
      defaultFrom="kcal"
      defaultTo="kj"
      defaultValue={100}
      units={[
        { key: 'j', label: 'ג׳אול', factor: 1 },
        { key: 'kj', label: 'קילו־ג׳אול', factor: 1000 },
        { key: 'cal', label: 'קלוריה', factor: 4.184 },
        { key: 'kcal', label: 'קילו־קלוריה', factor: 4184 },
        { key: 'wh', label: 'וואט־שעה', factor: 3600 },
        { key: 'kwh', label: 'קוט״ש', factor: 3_600_000 },
        { key: 'btu', label: 'BTU', factor: 1055.06 },
      ]}
      intro="המרה בין יחידות אנרגיה. הבסיס לחישוב הוא הג׳אול. קלוריות תזונה הן בעצם קילו־קלוריות (1 קלוריה תזונה = 4,184 ג׳אול)."
    />
  );
}
