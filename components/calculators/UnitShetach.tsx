'use client';
import { UnitConverter } from './UnitConverter';

export default function UnitShetach() {
  return (
    <UnitConverter
      defaultFrom="m2"
      defaultTo="ft2"
      defaultValue={100}
      units={[
        { key: 'cm2', label: 'סמ״ר', factor: 0.0001 },
        { key: 'm2', label: 'מ״ר', factor: 1 },
        { key: 'km2', label: 'קמ״ר', factor: 1_000_000 },
        { key: 'dunam', label: 'דונם', factor: 1000 },
        { key: 'hectare', label: 'הקטר', factor: 10000 },
        { key: 'acre', label: 'אקר', factor: 4046.86 },
        { key: 'ft2', label: 'רגל ²', factor: 0.092903 },
      ]}
      intro="המרה בין יחידות שטח. הבסיס לחישוב הוא המטר הרבוע. דונם הוא יחידת השטח המקובלת בישראל לקרקעות (1 דונם = 1,000 מ״ר)."
    />
  );
}
