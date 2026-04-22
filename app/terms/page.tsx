import type { Metadata } from 'next';
import { SITE } from '@/lib/calculators';

export const metadata: Metadata = {
  title: 'תנאי שימוש',
  description: `תנאי השימוש של ${SITE.name}.`,
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <article className="container-prose py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          תנאי שימוש
        </h1>
        <p className="mt-4 text-sm text-ink-muted">עודכן לאחרונה: אפריל 2026</p>

        <div className="mt-10 space-y-6 leading-relaxed text-ink-soft">
          <p>
            השימוש באתר {SITE.name} ({SITE.domain}) מהווה הסכמה לתנאים המפורטים להלן. אם
            אינך מסכים, אנא הימנע משימוש באתר.
          </p>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">1. תיאור השירות</h2>
            <p className="mt-3">
              האתר מספק מחשבונים ומידע בחינם למטרות אישיות בלבד. המחשבונים נועדו לסייע
              באומדן ובהבנה כללית של מושגים פיננסיים, בריאותיים, מתמטיים ועוד.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">2. אין לראות במידע ייעוץ מקצועי</h2>
            <p className="mt-3">
              המידע והחישובים באתר הם להמחשה בלבד ואינם מהווים תחליף לייעוץ מקצועי. למשל:
            </p>
            <ul className="mr-6 mt-3 list-disc space-y-1">
              <li>
                מחשבוני משכנתא, שכר, מס ופיננסים — אינם מהווים ייעוץ פיננסי. התייעץ עם רואה
                חשבון, יועץ פנסיוני או בנקאי.
              </li>
              <li>
                מחשבוני בריאות (BMI, קלוריות, הריון, ביוץ) — אינם מהווים ייעוץ רפואי.
                התייעץ עם רופא.
              </li>
              <li>
                חישובי מסים — מדרגות ותקנות מתעדכנות. ודא פרטים מול רשות המסים או יועץ מס.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">3. דיוק המחשבונים</h2>
            <p className="mt-3">
              אנו משתדלים לשמור על דיוק החישובים והנוסחאות, אך איננו יכולים להבטיח שכל
              התוצאות מדויקות או עדכניות בכל עת. במידה ומצאת שגיאה, אנא דווח לנו.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">4. הגבלת אחריות</h2>
            <p className="mt-3">
              השימוש באתר הוא באחריותך המלאה. {SITE.name} ומפעיליו אינם אחראים לכל נזק
              ישיר או עקיף שייגרם כתוצאה משימוש באתר או מהסתמכות על המידע המוצג בו.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">5. קניין רוחני</h2>
            <p className="mt-3">
              התוכן, העיצוב והקוד של האתר שייכים ל־{SITE.name}. אסור להעתיק, לשכפל או
              להפיץ תכנים מן האתר ללא אישור בכתב, למעט קישורים פנימיים ושימוש אישי.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">6. פרסומות</h2>
            <p className="mt-3">
              האתר עשוי להציג פרסומות של צדדים שלישיים. איננו אחראים לתוכן המוצגים
              בפרסומות אלו או לפעילות של המפרסמים.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">7. שינויים</h2>
            <p className="mt-3">
              אנו שומרים על הזכות לשנות את תנאי השימוש ואת תוכן האתר בכל עת. שינויים יפורסמו
              בעמוד זה.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">8. דין ושיפוט</h2>
            <p className="mt-3">
              על השימוש באתר חלים דיני מדינת ישראל. סמכות השיפוט הבלעדית נתונה לבתי המשפט
              המוסמכים במחוז תל אביב.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">9. יצירת קשר</h2>
            <p className="mt-3">
              לשאלות בנוגע לתנאי השימוש:{' '}
              <a href="mailto:ahukipuki@gmail.com" className="text-amber underline">
                ahukipuki@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
