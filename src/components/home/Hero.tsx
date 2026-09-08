import { business } from '@/content/business';
import { Photo } from '@/components/media/Photo';

/**
 * The 한상 (hansang) hero — a Korean set table.
 *
 * The grammar is still one large dish among many small ones, which is the thing every
 * review source agrees on: the banchan keeps coming. But it is built as a mosaic of full
 * photographs rather than circular crops on a ring — floating circles at varying sizes
 * over a radial glow read as planets in orbit, not as a table.
 *
 * The whole load sequence is CSS keyframes with per-element delays, so it costs no
 * JavaScript and is skipped entirely under prefers-reduced-motion.
 */

/**
 * The small dishes, in the order they settle onto the table.
 * `area` is the CSS grid placement inside the 3x3 mosaic.
 */
const ORIGINAL_PHOTOS = [
  {
    id: 'atmos-banchan',
    alt: 'A spread of Korean side dishes',
    area: '1 / 3 / 2 / 4',
    delay: 900,
  },
  {
    id: 'kimchi-jeon',
    alt: 'Kimchi pancake',
    area: '2 / 3 / 3 / 4',
    delay: 1040,
  },
  {
    id: 'jjin-mandu',
    alt: 'Steamed dumplings',
    area: '3 / 1 / 4 / 2',
    delay: 1180,
  },
];

const REPLACEMENT_PHOTOS = [
  {
    src: '/restaurant-photos/JeunJu_Bibimbap_400x533.jpg',
    alt: 'Bibimbap',
    area: '3 / 2 / 4 / 3',
    delay: 1320,
  },
  {
    src: '/restaurant-photos/JeunJu_BossamPorkPlatterTable_400x300.jpg',
    alt: 'Bossam pork platter with Korean side dishes',
    area: '3 / 3 / 4 / 4',
    delay: 1460,
  },
];

export function Hero() {
  return (
    <section className="grain vignette relative overflow-hidden bg-obsidian pb-28 pt-32 sm:pt-36 lg:pb-36">
      {/*
        One lamp over one table. Kept wide and low-contrast — a tight radial behind round
        images is exactly what made the old composition read as a sun with planets.
      */}
      <div
        aria-hidden
        className="animate-glow pointer-events-none absolute left-1/2 top-1/2 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl lg:left-[70%]"
        style={{ background: 'radial-gradient(circle, rgb(var(--gold)) 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto grid max-w-shell items-center gap-16 gutter lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
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
            Jeunju
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
            <a
              href={business.delivery.ubereats.url}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full bg-accent px-8 py-4 font-mono text-label uppercase text-obsidian transition-colors duration-500 hover:bg-gold-bright"
            >
              Online order
            </a>
            <a
              href={business.phone.href}
              className="rounded-full border border-white/15 px-8 py-4 font-mono text-label uppercase text-fg transition-colors duration-500 hover:border-accent hover:text-accent"
            >
              {business.phone.display}
            </a>
          </div>

          <dl
            className="animate-rise mt-14 grid grid-cols-2 gap-x-3 gap-y-4 border-t border-white/10 pt-8 sm:gap-x-6"
            style={{ animationDelay: '780ms' }}
          >
            {[
              ['4.7★', '1,200+ Google reviews'],
              ['4+', 'banchan with most mains'],
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

        {/*
          ---- the table ----
          A 3x3 mosaic: the main dish holds the top-left 2x2, the banchan fill the
          remaining cells. Same one-large-among-many idea, laid out as a table rather
          than as an orbit.
        */}
        <div className="relative mx-auto grid w-full max-w-[30rem] grid-cols-3 grid-rows-3 gap-2.5 sm:max-w-[34rem] sm:gap-3">
          <div
            className="animate-settle overflow-hidden rounded-sm ring-1 ring-white/10"
            style={{ gridArea: '1 / 1 / 3 / 3', animationDelay: '420ms' }}
          >
            <img
              src="/restaurant-photos/JeunJu_KoreanFoodSpread_2880x2304.jpg"
              alt="A spread of JeunJu Korean dishes"
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>

          {ORIGINAL_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              className="animate-settle aspect-square overflow-hidden rounded-sm ring-1 ring-white/10"
              style={{ gridArea: photo.area, animationDelay: `${photo.delay}ms` }}
            >
              <Photo id={photo.id} alt={photo.alt} priority className="h-full w-full" sizes="18vw" />
            </div>
          ))}

          {REPLACEMENT_PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="animate-settle aspect-square overflow-hidden rounded-sm ring-1 ring-white/10"
              style={{ gridArea: photo.area, animationDelay: `${photo.delay}ms` }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
