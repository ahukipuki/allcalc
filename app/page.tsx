import Link from 'next/link';
import {
  categories,
  calculators,
  getPopularCalculators,
  getCategoryCalculators,
  SITE,
} from '@/lib/calculators';

export default function HomePage() {
  const popular = getPopularCalculators();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="paper-grain absolute inset-0 opacity-60" aria-hidden />
        <div className="container-prose relative py-16 md:py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-cream-50 px-3 py-1 text-xs font-medium text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />
              {calculators.length}+ מחשבונים בעברית
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl">
              מחשבונים שבאמת
              <br />
              <span className="relative inline-block">
                עובדים בעברית
                <svg
                  className="absolute -bottom-2 right-0 w-full text-amber"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 8 Q 75 2, 150 6 T 298 4"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
              משכנתא, בריאות, מתמטיקה, תאריכים והמרות — כל המחשבונים שאתם צריכים, מותאמים לישראל. חינם, מדויק ובלי הרשמה.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="#popular" className="btn-primary">
                לקטגוריות
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m9 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/finansi/mashkanta" className="btn-ghost">
                מחשבון משכנתא
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4 border-t border-line pt-10 text-center">
            <div>
              <div className="display-num text-3xl font-bold text-ink md:text-4xl">
                {calculators.length}+
              </div>
              <div className="mt-1 text-xs text-ink-muted md:text-sm">מחשבונים</div>
            </div>
            <div className="border-x border-line">
              <div className="display-num text-3xl font-bold text-ink md:text-4xl">
                {categories.length}
              </div>
              <div className="mt-1 text-xs text-ink-muted md:text-sm">קטגוריות</div>
            </div>
            <div>
              <div className="display-num text-3xl font-bold text-ink md:text-4xl">100%</div>
              <div className="mt-1 text-xs text-ink-muted md:text-sm">חינם וללא הרשמה</div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR */}
      <section id="popular" className="container-prose py-16 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-amber">
              הפופולריים ביותר
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              אלה שכולם מחפשים
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.category}/${c.slug}`}
              className="card card-hover group flex flex-col"
            >
              <div className="mb-3 flex items-start justify-between">
                <span className="rounded-md bg-cream-200 px-2 py-0.5 text-[11px] font-medium text-ink-muted">
                  {categories.find((cat) => cat.slug === c.category)?.name}
                </span>
                <svg
                  className="h-4 w-4 text-ink-faint transition-all group-hover:-translate-x-1 group-hover:text-amber"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-ink">{c.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-prose pb-20">
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-amber">
            כל המחשבונים
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            עיינו לפי קטגוריה
          </h2>
        </div>

        <div className="space-y-12">
          {categories.map((cat) => {
            const items = getCategoryCalculators(cat.slug);
            return (
              <div key={cat.slug}>
                <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-lg font-display text-2xl"
                      style={{ backgroundColor: cat.accent + '15', color: cat.accent }}
                      aria-hidden
                    >
                      {cat.icon}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-ink">
                        <Link href={`/${cat.slug}`} className="hover:text-amber">
                          {cat.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-ink-muted">{cat.tagline}</p>
                    </div>
                  </div>
                  <Link
                    href={`/${cat.slug}`}
                    className="hidden text-sm font-medium text-ink-soft hover:text-amber sm:block"
                  >
                    כל ה{cat.name} ←
                  </Link>
                </div>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
                  {items.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/${c.category}/${c.slug}`}
                        className="group flex items-center justify-between gap-2 rounded-md py-1.5 text-ink-soft transition-colors hover:text-amber"
                      >
                        <span className="text-sm">{c.shortTitle}</span>
                        <span className="text-ink-faint opacity-0 transition-opacity group-hover:opacity-100">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
