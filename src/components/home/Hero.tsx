import Link from 'next/link';
import { Photo } from '@/components/media/Photo';
import { business } from '@/content/business';

/**
 * The 한상 (hansang) hero — a Korean set table, seen from above.
 *
 * One large bowl anchors the composition and small round banchan dishes settle in around
 * it on load, staggered, the way dishes actually land on a table. This is the site's
 * signature: the layout grammar is the table itself, and it restates the one thing every
 * review source agrees on — that the small dishes keep coming.
 *
 * The whole sequence is CSS keyframes with per-element delays, so it costs no JavaScript
 * and is skipped entirely under prefers-reduced-motion.
 */

/**
 * Small dishes, set around the main bowl on a ring.
 *
 * Positions are percentages of the square container, so the arrangement scales intact at
 * every breakpoint. They sit on a radius of ~38% from centre — far enough out that none
 * of them ever crowds the 52%-wide bowl at the middle, which is what a set table
 * actually looks like from above.
 */
const BANCHAN = [
  { id: 'atmos-banchan', alt: 'A spread of Korean side dishes', top: '5%', left: '59%', delay: 900 },
  { id: 'kimchi-jeon', alt: 'Kimchi pancake', top: '44%', left: '76%', delay: 1080 },
  { id: 'gyeran-mari', alt: 'Rolled Korean egg omelet', top: '77%', left: '49%', delay: 1260 },
  { id: 'jjin-mandu', alt: 'Steamed dumplings', top: '61%', left: '7%', delay: 1440 },
  { id: 'atmos-table', alt: 'A set Korean table', top: '15%', left: '9%', delay: 1620 },
];

/** Diameter of every small dish, as a percentage of the container. */
const DISH_SIZE = '22%';

export function Hero() {
  return (
    <section className="grain vignette relative overflow-hidden bg-obsidian pb-28 pt-32 sm:pt-36 lg:pb-36">
      {/*
        One lamp over one table. On a ground this dark the light pool is most of the
        atmosphere, so it breathes rather than sitting still.
      */}
      <div
        aria-hidden
        className="animate-glow pointer-events-none absolute left-1/2 top-[40%] h-[52rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl lg:left-[68%]"
        style={{ background: 'radial-gradient(circle, rgb(var(--gold)) 0%, transparent 66%)' }}
      />

      <div className="relative mx-auto grid max-w-shell items-center gap-16 gutter lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
        {/* ---- the word ---- */}
        <div className="relative z-10">
          <p
            className="animate-rise font-mono text-micro uppercase text-accent"
            style={{ animationDelay: '200ms' }}
          >
            Flushing · Murray Hill · Queens
          </p>

          <h1
            className="animate-rise lit mt-7 font-display text-display-lg text-fg"
            style={{ animationDelay: '340ms' }}
          >
            Jeonju
            <span className="block text-accent">home cooking</span>
            <span
              lang="ko"
              className="mt-4 block font-display text-display-sm font-normal text-fg/30"
            >
              전주식당
            </span>
          </h1>

          <p
            className="animate-rise mt-9 max-w-md text-balance text-lg leading-relaxed text-fg-muted"
            style={{ animationDelay: '500ms' }}
          >
            {business.promise}
          </p>

          <div
            className="animate-rise mt-11 flex flex-wrap items-center gap-3"
            style={{ animationDelay: '640ms' }}
          >
            <Link
              href="/menu"
              className="rounded-full bg-accent px-8 py-4 font-mono text-label uppercase text-obsidian transition-colors duration-500 hover:bg-gold-bright"
            >
              See the menu
            </Link>
            <a
              href={business.phone.href}
              className="rounded-full border border-white/15 px-8 py-4 font-mono text-label uppercase text-fg transition-colors duration-500 hover:border-accent hover:text-accent"
            >
              {business.phone.display}
            </a>
          </div>

          <dl
            className="animate-rise mt-14 grid grid-cols-3 gap-x-3 gap-y-4 border-t border-white/10 pt-8 sm:gap-x-6"
            style={{ animationDelay: '780ms' }}
          >
            {[
              ['4.7★', '1,200+ Google reviews'],
              ['4+', 'banchan with most mains'],
              ['Free', 'refills, always'],
            ].map(([stat, label]) => (
              <div key={label}>
                <dt className="font-display text-2xl leading-none text-fg">{stat}</dt>
                <dd className="mt-2 font-mono text-micro uppercase leading-relaxed text-fg-faint">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---- the table ---- */}
        <div className="relative mx-auto aspect-square w-full max-w-[26rem] sm:max-w-[30rem]">
          {/* the table — a 소반, the round low table this food is served on */}
          <div
            aria-hidden
            className="animate-settle absolute inset-[3%] rounded-full border border-white/[0.06] bg-white/[0.015]"
            style={{ animationDelay: '400ms' }}
          />

          {/*
            The main bowl. Placed with top/left percentages rather than a centring
            translate — the settle keyframes animate `transform`, which would override a
            Tailwind -translate-x-1/2 and leave the bowl off-centre.
          */}
          <div
            className="animate-settle dish absolute left-[24%] top-[24%] aspect-square w-[52%]"
            style={{ animationDelay: '620ms' }}
          >
            <Photo
              id="hero-stew"
              alt="A bubbling pot of kimchi stew"
              priority
              className="h-full w-full"
              sizes="(max-width: 1024px) 60vw, 30vw"
            />
          </div>

          {/* steam, rising off the bowl — the one purely atmospheric flourish */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[26%] -translate-x-1/2 motion-reduce:hidden"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="animate-steam absolute block h-16 w-[2px] rounded-full bg-gradient-to-t from-transparent via-ivory/30 to-transparent"
                style={{ left: `${i * 18 - 18}px`, animationDelay: `${i * 1.6}s` }}
              />
            ))}
          </div>

          {/* the small dishes */}
          {BANCHAN.map((dish) => (
            <div
              key={dish.id}
              className="animate-settle dish absolute aspect-square"
              style={{
                top: dish.top,
                left: dish.left,
                width: DISH_SIZE,
                animationDelay: `${dish.delay}ms`,
              }}
            >
              {/* Eager: these sit in the hero, so lazy-loading them would show the blur
                  placeholder during the settle animation. */}
              <Photo id={dish.id} alt={dish.alt} priority className="h-full w-full" sizes="20vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
