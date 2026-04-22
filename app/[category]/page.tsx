import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  categories,
  getCategory,
  getCategoryCalculators,
  SITE,
} from '@/lib/calculators';

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const cat = getCategory(params.category);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
    keywords: [cat.name, `מחשבונים ${cat.name}`, ...getCategoryCalculators(cat.slug).map((c) => c.title)],
    alternates: { canonical: `/${cat.slug}` },
    openGraph: {
      title: `${cat.name} — ${SITE.name}`,
      description: cat.description,
      url: `${SITE.url}/${cat.slug}`,
    },
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = getCategory(params.category);
  if (!cat) notFound();

  const items = getCategoryCalculators(cat.slug);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-line bg-cream-100">
        <nav className="container-prose py-3 text-sm" aria-label="פירורי לחם">
          <ol className="flex items-center gap-2 text-ink-muted">
            <li>
              <Link href="/" className="hover:text-amber">בית</Link>
            </li>
            <li aria-hidden>›</li>
            <li className="font-medium text-ink">{cat.name}</li>
          </ol>
        </nav>
      </div>

      {/* Header */}
      <section className="border-b border-line">
        <div className="container-prose py-12 md:py-16">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <span
              className="grid h-16 w-16 place-items-center rounded-2xl font-display text-4xl"
              style={{ backgroundColor: cat.accent + '15', color: cat.accent }}
              aria-hidden
            >
              {cat.icon}
            </span>
            <div>
              <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
                מחשבוני {cat.name}
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-ink-soft">{cat.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of calculators */}
      <section className="container-prose py-12 md:py-16">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.category}/${c.slug}`}
              className="card card-hover group"
            >
              <div className="mb-3 flex items-start justify-between">
                <h3 className="font-display text-xl font-bold text-ink group-hover:text-amber">
                  {c.title}
                </h3>
                <svg
                  className="mt-1 h-4 w-4 shrink-0 text-ink-faint transition-all group-hover:-translate-x-1 group-hover:text-amber"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-sm leading-relaxed text-ink-muted">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
