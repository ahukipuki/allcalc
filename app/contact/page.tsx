import type { Metadata } from 'next';
import { SITE } from '@/lib/calculators';

export const metadata: Metadata = {
  title: 'צור קשר',
  description: `צור קשר עם ${SITE.name} — הצעות, תיקונים ובקשות למחשבונים חדשים.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="container-prose py-12 md:py-20">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">צרו קשר</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          מצאתם שגיאה? חסר לכם מחשבון? יש לכם הצעה לשיפור?
          <br />
          נשמח לשמוע.
        </p>
        <a
          href="mailto:ahukipuki@gmail.com"
          className="btn-primary mt-8 inline-flex"
        >
          ahukipuki@gmail.com
        </a>
        <p className="mt-6 text-sm text-ink-muted">בקשות למחשבונים חדשים מטופלות בסבב — עדיפות ניתנת למחשבונים פופולריים.</p>
      </div>
    </div>
  );
}
