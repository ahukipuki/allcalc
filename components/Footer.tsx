import Link from 'next/link';
import { categories, SITE } from '@/lib/calculators';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-cream-100">
      <div className="container-prose py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-cream-50">
                <span className="font-display text-xl font-bold leading-none">כ</span>
              </span>
              <span className="font-display text-xl font-bold tracking-tight text-ink">
                {SITE.name}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              מאגר מחשבונים חופשי בעברית. כל המחשבונים מותאמים לישראל ומחושבים אצלך בדפדפן — ללא שמירת נתונים.
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">
              קטגוריות
            </h3>
            <ul className="grid grid-cols-2 gap-y-2 text-sm">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className="text-ink-soft transition-colors hover:text-amber"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">
              כללי
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-ink-soft hover:text-amber">
                  אודות
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-ink-soft hover:text-amber">
                  מדיניות פרטיות
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ink-soft hover:text-amber">
                  צור קשר
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-ink-muted md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {SITE.name}. כל הזכויות שמורות.
          </p>
          <p className="num text-ink-faint">
            המידע באתר נועד למטרות מידע בלבד ואינו תחליף לייעוץ מקצועי.
          </p>
        </div>
      </div>
    </footer>
  );
}
