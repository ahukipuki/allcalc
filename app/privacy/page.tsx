import type { Metadata } from 'next';
import { SITE } from '@/lib/calculators';

export const metadata: Metadata = {
  title: 'מדיניות פרטיות',
  description: `מדיניות הפרטיות של ${SITE.name}.`,
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <article className="container-prose py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          מדיניות פרטיות
        </h1>
        <p className="mt-4 text-sm text-ink-muted">עודכן לאחרונה: אפריל 2026</p>

        <div className="mt-10 space-y-6 leading-relaxed text-ink-soft">
          <p>
            אנו ב־{SITE.name} ({SITE.domain}) מתייחסים לפרטיות שלך ברצינות. מסמך זה מסביר אילו
            נתונים נאספים, כיצד הם משמשים, ואילו זכויות יש לך ביחס אליהם.
          </p>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">1. איזה מידע אנו אוספים</h2>
            <p className="mt-3">
              <strong>מחשבונים:</strong> כל החישובים שאתה מבצע באתר רצים מקומית בדפדפן שלך.
              הנתונים שאתה מזין (סכומים, גיל, מידות וכו&rsquo;) אינם נשלחים לשרת שלנו ואינם נשמרים
              אצלנו.
            </p>
            <p className="mt-3">
              <strong>מידע טכני:</strong> כמו כל אתר אינטרנט, אנחנו מקבלים מידע טכני בסיסי
              בעת הגלישה: כתובת IP (בחלקה), סוג הדפדפן, מערכת ההפעלה, והעמוד ממנו הגעת.
              המידע משמש למעקב סטטיסטי על התעבורה ואבחון בעיות.
            </p>
            <p className="mt-3">
              <strong>עוגיות (Cookies):</strong> האתר משתמש במספר מצומצם של עוגיות לצרכי
              תפעול האתר, סטטיסטיקה ופרסום מותאם.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">2. שירותי צד שלישי</h2>
            <p className="mt-3">אנו משתמשים בשירותים הבאים:</p>
            <ul className="mr-6 mt-3 list-disc space-y-2">
              <li>
                <strong>Cloudflare</strong> — רשת אספקת תוכן ושירותי אבטחה.{' '}
                <a href="https://www.cloudflare.com/privacypolicy/" className="text-amber underline" target="_blank" rel="noopener noreferrer">
                  מדיניות הפרטיות של Cloudflare
                </a>
                .
              </li>
              <li>
                <strong>Google Fonts</strong> — טעינת גופנים. בקשות הגופנים יכולות לחשוף
                כתובת IP לגוגל.
              </li>
              <li>
                <strong>Google AdSense</strong> (בקרוב) — הצגת פרסומות. גוגל עשויה להציג
                פרסומות מותאמות אישית בהתבסס על ביקוריך הקודמים. תוכל לבטל פרסומות מותאמות
                אישית{' '}
                <a href="https://adssettings.google.com/" className="text-amber underline" target="_blank" rel="noopener noreferrer">
                  בהגדרות המודעות של גוגל
                </a>
                . מידע נוסף ב
                <a href="https://policies.google.com/technologies/ads" className="text-amber underline" target="_blank" rel="noopener noreferrer">
                  מדיניות הפרסום של גוגל
                </a>
                .
              </li>
              <li>
                <strong>שירותי אנליטיקה</strong> — מדידת תעבורה וסטטיסטיקת שימוש (Google
                Analytics ו/או Cloudflare Analytics).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">3. שימוש במידע</h2>
            <p className="mt-3">אנו משתמשים במידע הנאסף ל:</p>
            <ul className="mr-6 mt-3 list-disc space-y-1">
              <li>אבחון בעיות טכניות ושיפור חוויית המשתמש</li>
              <li>הצגת תוכן ופרסומות רלוונטיות</li>
              <li>מעקב סטטיסטי על פופולריות של מחשבונים ודפים</li>
              <li>אבטחת האתר מפני שימוש לרעה</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">4. שיתוף מידע</h2>
            <p className="mt-3">
              איננו מוכרים או משכירים מידע אישי לצדדים שלישיים. מידע נמסר לנותני שירות
              (כמפורט לעיל) במינימום הנדרש לצורך הפעלת האתר, או אם נדרש על פי חוק.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">5. אבטחת מידע</h2>
            <p className="mt-3">
              כל התקשורת עם האתר מוצפנת ב־HTTPS. כיוון שהחישובים מתבצעים בדפדפן ולא נשמרים
              בשרת, החשיפה של נתוני משתמש היא מינימלית.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">6. זכויותיך</h2>
            <p className="mt-3">
              לפי חוק הגנת הפרטיות, התשמ&quot;א-1981, יש לך זכות לעיין במידע שנשמר עליך
              ולבקש לתקנו. לבקשות, פנה אלינו בדף{' '}
              <a href="/contact" className="text-amber underline">
                צור קשר
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">7. ילדים</h2>
            <p className="mt-3">
              האתר אינו מיועד במיוחד לילדים מתחת לגיל 13 ואיננו אוספים ביודעין מידע אישי
              מילדים. אם אתה הורה וסבור שילדך מסר מידע — פנה אלינו ונפעל להסרתו.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">8. שינויים במדיניות</h2>
            <p className="mt-3">
              אנו עשויים לעדכן מסמך זה מעת לעת. עדכונים משמעותיים יפורסמו בעמוד הבית. המשך
              השימוש באתר לאחר עדכון מהווה הסכמה למדיניות המעודכנת.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink">9. יצירת קשר</h2>
            <p className="mt-3">
              לשאלות בנושאי פרטיות פנה אל{' '}
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
