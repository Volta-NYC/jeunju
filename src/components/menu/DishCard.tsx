import { Photo } from '@/components/media/Photo';
import type { MenuItem } from '@/content/types';
import { cn } from '@/lib/cn';

/** Prints a price, or an honest stand-in where the research found none. */
export function Price({ value, className }: { value: number | null; className?: string }) {
  if (value === null) {
    return (
      <span
        className={cn('font-mono text-sm text-fg-faint', className)}
        title="Ask us — price varies"
      >
        Ask us
      </span>
    );
  }
  return (
    <span className={cn('font-mono text-sm tabular-nums text-accent', className)}>
      ${value.toFixed(2)}
    </span>
  );
}

const TAG_LABEL: Partial<Record<MenuItem['tags'][number], string>> = {
  signature: 'Signature',
  spicy: 'Spicy',
  seafood: 'Seafood',
  shareable: 'To share',
  'banchan-included': '4+ banchan',
  hearty: 'Very filling',
};

export function DishTags({ tags }: { tags: MenuItem['tags'] }) {
  const shown = tags.filter((t) => TAG_LABEL[t]);
  if (!shown.length) return null;

  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {shown.map((tag) => (
        <li
          key={tag}
          className={cn(
            'rounded-full border px-2.5 py-0.5 font-mono text-micro uppercase',
            tag === 'signature'
              ? 'border-accent/40 text-accent'
              : 'border-white/10 text-fg-faint',
          )}
        >
          {TAG_LABEL[tag]}
        </li>
      ))}
    </ul>
  );
}

/**
 * A dish, presented at banchan scale — round image, name in both scripts, price.
 * Used in grids where the photograph is doing the persuading.
 *
 * Full height plus `mt-auto` on the price keeps prices on one baseline across a row,
 * even where a dish name wraps to two lines.
 */
export function DishCard({ item, index = 0 }: { item: MenuItem; index?: number }) {
  return (
    <article className="group flex h-full flex-col text-center">
      <div className="dish relative mx-auto aspect-square w-full transition-transform duration-1000 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
        <Photo
          id={item.image}
          alt={item.name}
          className="h-full w-full"
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
          fallbackLabel={item.nameKo ?? item.name}
        />
      </div>

      <h3 className="mt-6 font-display text-xl leading-snug text-fg">{item.name}</h3>
      {item.nameKo && (
        <p lang="ko" className="mt-1.5 font-display text-sm text-fg-faint">
          {item.nameKo}
        </p>
      )}
      <p className="mt-auto pt-3">
        <Price value={item.price} />
      </p>
      <span className="sr-only">{index}</span>
    </article>
  );
}

/**
 * A dish as a menu line — the reading format. Name, Korean name, description and price
 * on one row with a leader rule, the way a printed menu sets it.
 */
export function DishRow({ item }: { item: MenuItem }) {
  return (
    <article className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 py-6">
      <div className="col-span-3 sm:col-span-1 sm:col-start-1">
        <h3 className="font-display text-xl leading-snug text-fg">{item.name}</h3>
        {item.nameKo && (
          <p lang="ko" className="mt-1 font-display text-sm text-fg-faint">
            {item.nameKo}
            {item.romanized && <span className="ml-2 font-body not-italic">{item.romanized}</span>}
          </p>
        )}
      </div>

      {/* leader rule — hidden on mobile where it would fight the wrapped text */}
      <div
        aria-hidden
        className="col-start-2 hidden h-px translate-y-[-0.35em] bg-white/[0.09] sm:block"
      />

      <div className="col-span-3 mt-1 sm:col-span-1 sm:col-start-3 sm:mt-0 sm:text-right">
        <Price value={item.price} />
        {item.serves && (
          <p className="font-mono text-micro uppercase text-fg-faint sm:mt-1">{item.serves}</p>
        )}
      </div>

      {(item.description || item.tags.length > 0) && (
        <div className="col-span-3 mt-2 max-w-prose">
          {item.description && (
            <p className="text-sm leading-relaxed text-fg-muted">{item.description}</p>
          )}
          <DishTags tags={item.tags} />
        </div>
      )}
    </article>
  );
}
