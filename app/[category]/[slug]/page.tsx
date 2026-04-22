import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  calculators,
  getCalculator,
  getCategory,
  getRelatedCalculators,
  SITE,
} from '@/lib/calculators';
import { CalculatorRenderer } from '@/components/CalculatorRenderer';
import { ExplainerSection } from '@/components/ExplainerSection';
import { AdSlot } from '@/components/AdSlot';
import { AD_SLOTS } from '@/lib/adsense-config';

export async function generateStaticParams() {
  return calculators.map((c) => ({ category: c.category, slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Promise<Metadata> {
  const calc = getCalculator(params.slug);
  if (!calc) return {};
  return {
    title: calc.title,
    description: calc.description,
    keywords: calc.keywords,
    alternates: { canonical: `/${calc.category}/${calc.slug}` },
    openGraph: {
      title: `${calc.title} — ${SITE.name}`,
      description: calc.description,
      url: `${SITE.url}/${calc.category}/${calc.slug}`,
      type: 'website',
    },
  };
}

export default function CalcPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const calc = getCalculator(params.slug);
  const cat = getCategory(params.category);
  if (!calc || !cat || calc.category !== params.category) notFound();

  const related = getRelatedCalculators(calc);

  // JSON-LD for SEO — WebApplication + BreadcrumbList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: calc.title,
        description: calc.description,
        url: `${SITE.url}/${calc.category}/${calc.slug}`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        inLanguage: 'he-IL',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'ILS' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'בית', item: SITE.url },
          {
            '@type': 'ListItem',
            position: 2,
            name: cat.name,
            item: `${SITE.url}/${cat.slug}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: calc.title,
            item: `${SITE.url}/${calc.category}/${calc.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-line bg-cream-100">
        <nav className="container-prose py-3 text-sm" aria-label="פירורי לחם">
          <ol className="flex flex-wrap items-center gap-2 text-ink-muted">
            <li>
              <Link href="/" className="hover:text-amber">בית</Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link href={`/${cat.slug}`} className="hover:text-amber">
                {cat.name}
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="font-medium text-ink">{calc.shortTitle}</li>
          </ol>
        </nav>
      </div>

      {/* Title */}
      <section className="border-b border-line bg-cream-50">
        <div className="container-prose py-10 md:py-14">
          <div className="mx-auto max-w-4xl">
            <p className="mb-2 text-sm font-medium text-amber">{cat.name}</p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
              {calc.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft">
              {calc.description}
            </p>
          </div>
        </div>
      </section>

      {/* The actual calculator */}
      <section className="container-prose py-10 md:py-14">
        <div className="mx-auto max-w-4xl">
          <CalculatorRenderer slug={calc.slug} />

          {/* Ad slot: below calculator, above SEO content */}
          <AdSlot slot={AD_SLOTS.belowCalculator} />

          {/* SEO explainer (if one exists for this calculator) */}
          <ExplainerSection slug={calc.slug} />
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-cream-100">
          <div className="container-prose py-12">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-display text-2xl font-bold text-ink">
                מחשבונים נוספים בקטגוריה {cat.name}
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/${r.category}/${r.slug}`}
                    className="card card-hover group flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink group-hover:text-amber">
                        {r.title}
                      </h3>
                      <p className="mt-1 line-clamp-1 text-sm text-ink-muted">
                        {r.description}
                      </p>
                    </div>
                    <svg
                      className="h-5 w-5 shrink-0 text-ink-faint transition-all group-hover:-translate-x-1 group-hover:text-amber"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
