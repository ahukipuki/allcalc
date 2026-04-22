import type { Metadata } from 'next';
import { SITE } from '@/lib/calculators';

export const metadata: Metadata = {
  title: 'מדיניות פרטיות',
  description: `מדיניות הפרטיות של ${SITE.name}. החישובים נעשים בדפדפן, ללא שמירת מידע.`,
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="container-prose py-12 md:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">מדיניות פרטיות</h1>
        <div className="mt-8 space-y-5 leading-relaxed text-ink-soft">
          <p>האתר {SITE.name} מכבד את פרטיות המשתמשים. להלן עיקרי המדיניות:</p>

          <h2 className="pt-4 font-display text-xl font-bold text-ink">1. נתוני קלט במחשבונים</h2>
          <p>הנתונים שאתם מזינים במחשבונים (משקל, גובה, סכומי כסף וכו׳) מעובדים אך ורק בדפדפן שלכם ולא נשלחים או נשמרים בשרת שלנו.</p>

          <h2 className="pt-4 font-display text-xl font-bold text-ink">2. Cookies ואנליטיקה</h2>
          <p>אנו עשויים להשתמש בשירות אנליטיקה לצורך הבנת השימוש באתר (כמו Plausible / Google Analytics). אם נבצע זאת — נוודא שהשירות אינו אוסף מידע אישי מזהה.</p>

          <h2 className="pt-4 font-display text-xl font-bold text-ink">3. פרסום</h2>
          <p>אם יתווסף פרסום לאתר, הוא יהיה מסומן בבירור, ושותפי הפרסום עשויים לעשות שימוש ב־cookies. תוכלו לנהל הגדרות אלו בהגדרות הדפדפן שלכם.</p>

          <h2 className="pt-4 font-display text-xl font-bold text-ink">4. יצירת קשר</h2>
          <p>לשאלות בנוגע לפרטיות ניתן לפנות דרך דף &ldquo;צור קשר&rdquo;.</p>
        </div>
      </div>
    </div>
  );
}
