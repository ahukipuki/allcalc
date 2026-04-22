'use client';
import { UnitConverter } from './UnitConverter';

export default function UnitMehirut() {
  return (
    <UnitConverter
      defaultFrom="kmh"
      defaultTo="mph"
      defaultValue={100}
      units={[
        { key: 'ms', label: 'מ׳/ש׳', factor: 1 },
        { key: 'kmh', label: 'קמ״ש', factor: 0.277778 },
        { key: 'mph', label: 'מייל/ש׳', factor: 0.44704 },
        { key: 'kn', label: 'קשר', factor: 0.514444 },
        { key: 'fts', label: 'רגל/ש׳', factor: 0.3048 },
      ]}
      intro="המרה בין יחידות מהירות. הבסיס לחישוב הוא מטר לשנייה. קשר (knot) משמש לרוב בימאות ובתעופה."
    />
  );
}
