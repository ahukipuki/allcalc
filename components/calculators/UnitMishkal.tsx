'use client';
import { UnitConverter } from './UnitConverter';

export default function UnitMishkal() {
  return (
    <UnitConverter
      defaultFrom="kg"
      defaultTo="lb"
      defaultValue={1}
      units={[
        { key: 'mg', label: 'מ״ג', factor: 0.000001 },
        { key: 'g', label: 'גרם', factor: 0.001 },
        { key: 'kg', label: 'ק״ג', factor: 1 },
        { key: 'ton', label: 'טון', factor: 1000 },
        { key: 'oz', label: 'אונקיה', factor: 0.0283495 },
        { key: 'lb', label: 'ליברה', factor: 0.453592 },
        { key: 'st', label: 'סטון', factor: 6.35029 },
      ]}
      intro="המרה בין יחידות משקל מטריות ואימפריאליות. הבסיס לחישוב הוא הקילוגרם."
    />
  );
}
