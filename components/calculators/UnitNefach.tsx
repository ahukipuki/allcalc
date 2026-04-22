'use client';
import { UnitConverter } from './UnitConverter';

export default function UnitNefach() {
  return (
    <UnitConverter
      defaultFrom="l"
      defaultTo="ml"
      defaultValue={1}
      units={[
        { key: 'ml', label: 'מ״ל', factor: 0.001 },
        { key: 'l', label: 'ליטר', factor: 1 },
        { key: 'm3', label: 'מ״ק', factor: 1000 },
        { key: 'tsp', label: 'כפית', factor: 0.00492892 },
        { key: 'tbsp', label: 'כף', factor: 0.0147868 },
        { key: 'cup', label: 'כוס', factor: 0.24 },
        { key: 'pt', label: 'פינט', factor: 0.473176 },
        { key: 'gal', label: 'גלון', factor: 3.78541 },
      ]}
      intro="המרה בין יחידות נפח לבישול ולמדידה כללית. הבסיס לחישוב הוא הליטר. כוס מטבח ישראלית = 240 מ״ל."
    />
  );
}
