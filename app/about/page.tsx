import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, calculators, categories } from '@/lib/calculators';

export const metadata: Metadata = {
  title: 'אודות',
  description: `אודות ${SITE.name} — אתר המחשבונים הגדול בעברית. ${calculators.length} מחשבונים מותאמים לישראל, חינם וללא הרשמה.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <article className="container-prose py-12 md:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          אודות {SITE.name}
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink-soft">
          <p>
            {SITE.name} הוא מאגר מחשבונים חופשי בעברית — נבנה כדי לתת לדוברי עברית כלי חישוב
            יומיומי מדויק, נקי ומותאם לישראל, בלי פרסומות מעצבנות ובלי הרשמה.
          </p>
          <p>
            האתר מכיל <strong className="num">{calculators.length}</strong> מחשבונים המחולקים
            ל־<strong>{categories.length}</strong> קטגוריות — פיננסים, בריאות, מתמטיקה,
            תאריכים, המרות יחידות ומחשבונים כלליים. המחשבונים הפיננסיים מותאמים לחוקים
            ולשיעורים הנהוגים בישראל: מע״מ של 17%, מדרגות מס עדכניות, פיצויי פיטורים ועוד.
          </p>

          <h2 className="pt-4 font-display text-2xl font-bold text-ink">דיוק ועדכניות</h2>
          <p>
            הנוסחאות באתר מבוססות על מקורות רשמיים: פרסומי רשות המסים, בנק ישראל, משרד
            הבריאות וארגון הבריאות העולמי. אנו מעדכנים את הסכומים והמדרגות בתחילת כל שנת
            כספים. אם מצאת טעות, נשמח{' '}
            <Link href="/contact" className="text-amber underline">
              לשמוע ממך
            </Link>
            .
          </p>

          <h2 className="pt-4 font-display text-2xl font-bold text-ink">פרטיות מלאה</h2>
          <p>
            כל החישובים באתר מתבצעים אצלכם בדפדפן — הנתונים שאתם מזינים לא נשלחים לשרת ולא
            נשמרים בשום מקום. אתם יכולים להשתמש באתר בביטחון מלא, גם למספרים רגישים כמו שכר
            או סכומי הלוואה. למידע נוסף קראו את{' '}
            <Link href="/privacy" className="text-amber underline">
              מדיניות הפרטיות
            </Link>
            .
          </p>

          <h2 className="pt-4 font-display text-2xl font-bold text-ink">איך האתר מתממן</h2>
          <p>
            האתר ממומן באמצעות פרסומות Google AdSense בודדות, שאינן מפריעות לחוויית המשתמש.
            אין תוכן ממומן, אין קישורי שותפים בתוך החישובים, ואיננו מעניקים העדפה למפרסמים.
            החישובים אובייקטיביים ומבוססים נוסחאות מתמטיות בלבד.
          </p>

          <h2 className="pt-4 font-display text-2xl font-bold text-ink">כתב ויתור</h2>
          <p>
            המחשבונים נועדו למידע וחישוב כללי בלבד. הם אינם תחליף לייעוץ מקצועי — לצרכי
            קבלת החלטות פיננסיות, רפואיות או משפטיות יש להתייעץ עם איש מקצוע מוסמך. אנו
            משתדלים לשמור על דיוק גבוה, אך ייתכנו טעויות או שינויים ברגולציה שטרם עודכנו.
            השימוש באתר כפוף ל
            <Link href="/terms" className="text-amber underline">
              תנאי השימוש
            </Link>
            .
          </p>

          <h2 className="pt-4 font-display text-2xl font-bold text-ink">יצירת קשר</h2>
          <p>
            הצעות למחשבונים חדשים, דיווחים על שגיאות ופניות כלליות:{' '}
            <a href="mailto:ahukipuki@gmail.com" className="text-amber underline">
              ahukipuki@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </article>
  );
}
