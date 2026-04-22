import Link from 'next/link';
import { categories, SITE } from '@/lib/calculators';
import { SearchBar } from './SearchBar';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream-50/80 backdrop-blur-md">
      <div className="container-prose">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-cream-50 transition-transform group-hover:scale-105"
            >
              <span className="font-display text-xl font-bold leading-none">כ</span>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-xl font-bold tracking-tight text-ink lg:text-2xl">
                {SITE.name}
              </span>
              <span className="hidden text-xs text-ink-muted lg:block">
                {SITE.tagline}
              </span>
            </span>
          </Link>

          {/* Search (hidden on mobile, expanded view in mobile menu) */}
          <div className="hidden flex-1 max-w-md md:block">
            <SearchBar />
          </div>

          {/* Categories nav */}
          <nav className="hidden lg:block" aria-label="קטגוריות">
            <ul className="flex items-center gap-1">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-cream-200 hover:text-ink"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* Mobile search */}
        <div className="pb-3 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
