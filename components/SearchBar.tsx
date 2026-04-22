'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { calculators, getCategory } from '@/lib/calculators';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return calculators
      .filter((c) =>
        [c.title, c.shortTitle, ...c.keywords].some((s) => s.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter' && results[highlight]) {
      window.location.href = `/${results[highlight].category}/${results[highlight].slug}`;
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <svg
          className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          inputMode="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setHighlight(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="חפש מחשבון…"
          className="w-full rounded-lg border border-line bg-cream-100 py-2 pe-10 ps-4 text-sm text-ink placeholder:text-ink-muted focus:border-amber focus:bg-cream-50 focus:outline-none focus:ring-4 focus:ring-amber-wash"
          aria-label="חיפוש מחשבון"
          aria-expanded={open && results.length > 0}
          role="combobox"
          aria-controls="search-results"
        />
      </div>

      {open && results.length > 0 && (
        <div
          id="search-results"
          role="listbox"
          className="absolute inset-x-0 top-full z-50 mt-2 max-h-96 overflow-auto rounded-xl border border-line bg-cream-50 p-2 shadow-lift"
        >
          {results.map((c, i) => {
            const cat = getCategory(c.category);
            return (
              <Link
                key={c.slug}
                href={`/${c.category}/${c.slug}`}
                onClick={() => setOpen(false)}
                role="option"
                aria-selected={i === highlight}
                className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                  i === highlight ? 'bg-cream-200' : 'hover:bg-cream-100'
                }`}
              >
                <div>
                  <div className="font-medium text-ink">{c.title}</div>
                  <div className="text-xs text-ink-muted">{cat?.name}</div>
                </div>
                <span className="text-xs text-ink-faint">↵</span>
              </Link>
            );
          })}
        </div>
      )}

      {open && query.trim() && results.length === 0 && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 rounded-xl border border-line bg-cream-50 p-4 text-sm text-ink-muted shadow-lift">
          לא נמצאו תוצאות עבור &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
