'use client';
import { UnitConverter } from './UnitConverter';

export default function UnitOrech() {
  return (
    <UnitConverter
      defaultFrom="m"
      defaultTo="cm"
      defaultValue={1}
      units={[
        { key: 'mm', label: 'מ״מ', factor: 0.001 },
        { key: 'cm', label: 'ס״מ', factor: 0.01 },
        { key: 'm', label: 'מטר', factor: 1 },
        { key: 'km', label: 'ק״מ', factor: 1000 },
        { key: 'in', label: 'אינץ׳', factor: 0.0254 },
        { key: 'ft', label: 'רגל', factor: 0.3048 },
        { key: 'yd', label: 'יארד', factor: 0.9144 },
        { key: 'mi', label: 'מייל', factor: 1609.344 },
      ]}
      intro="המרה בין יחידות אורך מטריות ויחידות אימפריאליות. הבסיס לחישוב הוא המטר. הנוסחאות מבוססות על תקני SI הבינלאומיים."
    />
  );
}
