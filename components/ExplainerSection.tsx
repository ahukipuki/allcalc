import Link from 'next/link';
import { explainers } from '@/lib/explainers';
import { calculators } from '@/lib/calculators';

export function ExplainerSection({ slug }: { slug: string }) {
  const exp = explainers[slug];
  if (!exp) return null;

  // FAQ JSON-LD — Google uses this to build "People also ask" snippets
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: exp.sections.map((s) => ({
      '@type': 'Question',
      name: s.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: s.a,
      },
    })),
  };

  return (
    <section className="mx-auto mt-12 max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <div className="border-t border-line pt-10">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
          {exp.title}
        </h2>
        <div className="mt-6 space-y-6">
          {exp.sections.map((s, i) => (
            <div key={i}>
              <h3 className="font-display text-lg font-bold text-ink md:text-xl">{s.q}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{s.a}</p>
            </div>
          ))}
        </div>

        {exp.relatedSlugs.length > 0 && (
          <div className="mt-8 rounded-xl border border-line bg-cream-100 p-5">
            <div className="mb-3 text-xs font-medium uppercase tracking-wider text-ink-muted">
              מחשבונים קשורים
            </div>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {exp.relatedSlugs.map((r) => {
                const calc = calculators.find((c) => c.slug === r.slug);
                if (!calc) return null;
                return (
                  <li key={r.slug}>
                    <Link
                      href={`/${calc.category}/${r.slug}`}
                      className="text-amber underline-offset-2 hover:underline"
                    >
                      {r.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
