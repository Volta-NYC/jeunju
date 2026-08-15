'use client';

import { useMemo, useState } from 'react';
import { DishRow } from './DishCard';
import { Photo } from '@/components/media/Photo';
import type { MenuCategory, MenuTag } from '@/content/types';
import { cn } from '@/lib/cn';

/**
 * The menu, with search and filtering.
 *
 * Filtering happens client-side over an already-loaded dataset — the whole menu is a few
 * dozen items, so shipping it once and filtering in memory is faster and simpler than any
 * request-per-keystroke arrangement.
 *
 * Search matches English name, Hangul and romanisation together, because people look for
 * this food under all three.
 */

const FILTERS: Array<{ tag: MenuTag; label: string }> = [
  { tag: 'signature', label: 'Signature' },
  { tag: 'spicy', label: 'Spicy' },
  { tag: 'seafood', label: 'Seafood' },
  { tag: 'shareable', label: 'To share' },
  { tag: 'banchan-included', label: '4+ banchan' },
];

export function MenuBrowser({ categories }: { categories: MenuCategory[] }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<MenuTag | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    return categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          if (active && !item.tags.includes(active)) return false;
          if (!q) return true;
          return [item.name, item.nameKo, item.romanized, item.description]
            .filter(Boolean)
            .some((field) => field!.toLowerCase().includes(q));
        }),
      }))
      .filter((category) => category.items.length > 0);
  }, [categories, query, active]);

  const total = results.reduce((n, c) => n + c.items.length, 0);
  const filtering = Boolean(query.trim() || active);

  return (
    <div>
      {/* ---- controls ---- */}
      <div className="sticky top-[4.75rem] z-30 -mx-gutter border-y border-white/[0.07] bg-obsidian/85 px-gutter py-5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-shell flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative flex-1 lg:max-w-xs">
            <span className="sr-only">Search the menu</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search — kalguksu, 칼국수, noodles"
              className="w-full rounded-full border border-white/15 bg-white/[0.03] py-2.5 pl-11 pr-4 text-sm text-fg placeholder:text-fg-faint focus:border-accent/60 focus:outline-none focus-visible:outline-none"
            />
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-faint"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <circle cx="9" cy="9" r="6" />
              <path d="m13.5 13.5 3.5 3.5" strokeLinecap="round" />
            </svg>
          </label>

          <ul className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const on = active === f.tag;
              return (
                <li key={f.tag}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(on ? null : f.tag)}
                    className={cn(
                      'rounded-full border px-4 py-1.5 font-mono text-micro uppercase transition-colors duration-300',
                      on
                        ? 'border-accent bg-accent text-obsidian'
                        : 'border-white/15 text-fg-muted hover:border-white/35 hover:text-fg',
                    )}
                  >
                    {f.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {filtering && (
          <p
            className="mx-auto mt-4 max-w-shell font-mono text-micro uppercase text-fg-faint"
            role="status"
          >
            {total} {total === 1 ? 'dish' : 'dishes'}
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setActive(null);
              }}
              className="ml-3 underline underline-offset-2 transition-colors hover:text-accent"
            >
              Clear
            </button>
          </p>
        )}
      </div>

      {/* ---- results ---- */}
      {total === 0 ? (
        <div className="py-28 text-center">
          <p className="font-display text-2xl text-fg">Nothing matches that.</p>
          <p className="mt-3 text-sm text-fg-muted">
            Try a shorter word — or ask when you get here. The kitchen makes off-menu dishes on
            request.
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-shell">
          {results.map((category) => (
            <section key={category.slug} id={category.slug} className="scroll-mt-44 pt-20">
              <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-white/15 pb-5">
                <h2 className="font-display text-display-sm text-fg">
                  {category.name}
                  <span
                    lang="ko"
                    className="ml-4 align-middle font-display text-[0.42em] text-fg/30"
                  >
                    {category.nameKo}
                  </span>
                </h2>
                <p className="max-w-md text-sm text-fg-muted">{category.blurb}</p>
              </header>

              <div className="grid gap-x-16 lg:grid-cols-[1fr_auto]">
                <div className="divide-y divide-white/[0.07]">
                  {category.items.map((item) => (
                    <DishRow key={item.slug} item={item} />
                  ))}
                </div>

                {/* One photograph per category, held beside the list rather than repeated
                    per row — the list is for reading, the photo is for wanting. */}
                {category.items[0]?.image && (
                  <aside className="hidden w-72 pt-10 lg:block">
                    <div className="sticky top-64">
                      <div className="dish aspect-square w-full">
                        <Photo
                          id={category.items[0].image}
                          alt={category.items[0].name}
                          className="h-full w-full"
                          sizes="18rem"
                        />
                      </div>
                      <p className="mt-5 text-center font-mono text-micro uppercase text-fg-faint">
                        {category.items[0].name}
                      </p>
                    </div>
                  </aside>
                )}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
