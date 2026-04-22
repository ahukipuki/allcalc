'use client';
import { UnitConverter } from './UnitConverter';

export default function UnitLachatz() {
  return (
    <UnitConverter
      defaultFrom="bar"
      defaultTo="psi"
      defaultValue={2.2}
      units={[
        { key: 'pa', label: 'פסקל', factor: 1 },
        { key: 'kpa', label: 'קילו־פסקל', factor: 1000 },
        { key: 'bar', label: 'בר', factor: 100000 },
        { key: 'atm', label: 'אטמוספרה', factor: 101325 },
        { key: 'psi', label: 'PSI', factor: 6894.76 },
        { key: 'mmhg', label: 'מ״מ כספית', factor: 133.322 },
      ]}
      intro="המרה בין יחידות לחץ. הבסיס לחישוב הוא הפסקל (Pa). PSI נפוץ במדידת לחץ אוויר בצמיגים."
    />
  );
}
