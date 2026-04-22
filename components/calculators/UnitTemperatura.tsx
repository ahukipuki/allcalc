'use client';
import { UnitConverter } from './UnitConverter';

export default function UnitTemperatura() {
  return (
    <UnitConverter
      defaultFrom="c"
      defaultTo="f"
      defaultValue={20}
      units={[
        { key: 'c', label: '°C', toBase: (v) => v, fromBase: (v) => v },
        { key: 'f', label: '°F', toBase: (v) => (v - 32) * 5/9, fromBase: (v) => v * 9/5 + 32 },
        { key: 'k', label: 'K', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
      ]}
      intro="המרה בין צלזיוס, פרנהייט וקלווין. הבסיס לחישוב הוא צלזיוס. שימו לב: ההמרות אינן יחסיות אלא דורשות נוסחה (לא ניתן פשוט להכפיל)."
    />
  );
}
