import Link from 'next/link';
import { Hero } from '@/components/home/Hero';
import { Photo } from '@/components/media/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DishCard } from '@/components/menu/DishCard';
import { business } from '@/content/business';
import { findItem, priceFloor } from '@/content/menu';
import { banchanFact, press, testimonials } from '@/content/story';

/**
 * Home.
 *
 * Sequence: the table (hero) → what the kitchen is known for → the banchan fact, which
 * is the one thing every source agrees on → the family → what people say → how to get
 * there. Sections alternate between the base obsidian ground and one tier up, so the
 * page reads as depth rather than as a stack of differently-coloured slabs.
 */

/** The dishes the research named most often across review sources. */
const KNOWN_FOR = ['gamjatang', 'kalguksu', 'sujebi', 'kimchi-jjigae', 'bean-sprout-soup', 'bibimbap']
  .map((slug) => findItem(slug)?.item)
  .filter((i): i is NonNullable<typeof i> => Boolean(i));

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ---------- known for ---------- */}
      <section className="on-raised grain relative bg-bg py-section">
        <div className="relative mx-auto max-w-shell gutter">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal>
              <SectionHeading
                eyebrow="What people order"
                heading="Known for the slow things"
                headingKo="대표 메뉴"
                intro="Soups simmered long, noodles made by hand. The dishes below are the ones review after review keeps naming."
              />
            </Reveal>
            <Reveal index={1}>
              <Link
                href="/menu"
                className="rounded-full border border-white/15 px-7 py-3.5 font-mono text-label uppercase text-fg transition-colors duration-500 hover:border-accent hover:text-accent"
              >
                Full menu · from ${priceFloor.toFixed(2)}
              </Link>
            </Reveal>
          </div>

          <ul className="mt-20 grid grid-cols-2 gap-x-8 gap-y-16 sm:grid-cols-3 lg:grid-cols-6">
            {KNOWN_FOR.map((item, i) => (
              <Reveal as="li" key={item.slug} index={i}>
                <DishCard item={item} index={i} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- the banchan fact ---------- */}
      <section className="grain vignette relative overflow-hidden bg-obsidian py-section">
        <div
          aria-hidden
          className="animate-glow pointer-events-none absolute -right-40 top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgb(var(--gold)) 0%, transparent 65%)' }}
        />
        <div className="relative mx-auto grid max-w-shell items-center gap-16 gutter lg:grid-cols-2">
          <Reveal>
            <p className="font-mono text-micro uppercase text-accent">The table</p>
            <p className="lit mt-6 font-display text-display-lg leading-[0.98] text-fg">
              {banchanFact.headline}
            </p>
            <div className="gold-rule mt-8 w-40" />
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-fg-muted">{banchanFact.body}</p>
            <p lang="ko" className="mt-9 font-display text-2xl text-accent">
              반찬은 얼마든지
            </p>
          </Reveal>

          {/* Small dishes, staggered — the fact restated as form. */}
          <Reveal index={1}>
            <div className="grid grid-cols-3 gap-5 sm:gap-7">
              {['atmos-banchan', 'kimchi-jeon', 'gyeran-mari', 'jjin-mandu', 'atmos-table', 'gun-mandu'].map(
                (id, i) => (
                  <div
                    key={id}
                    className="dish aspect-square"
                    style={{ transform: i % 2 ? 'translateY(1.5rem)' : undefined }}
                  >
                    <Photo id={id} alt="" className="h-full w-full" sizes="25vw" />
                  </div>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- the family ---------- */}
      <section className="on-raised grain relative bg-bg py-section">
        <div className="relative mx-auto grid max-w-shell items-center gap-16 gutter lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="relative">
              <Photo
                id="atmos-jeonju"
                alt="Jeonju, South Korea"
                className="aspect-[4/5] w-full rounded-sm ring-1 ring-white/10"
                sizes="(max-width: 1024px) 90vw, 40vw"
              />
              {/* A small dish overlapping the frame — the table motif, once. */}
              <div className="dish absolute -bottom-10 -right-8 aspect-square w-32 sm:w-44">
                <Photo id="kalguksu" alt="Hand-cut noodle soup" className="h-full w-full" sizes="20vw" />
              </div>
            </div>
          </Reveal>

          <Reveal index={1}>
            <SectionHeading
              eyebrow="Mother and daughter"
              heading="One family, one region"
              headingKo="전주 사람"
            />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-fg-muted">
              <p>
                {business.people.founder.name} came from Jeonju and opened the kitchen on 150th
                Street. Her daughter, {business.people.owner.name}, runs it now — with the same
                recipes, and with kitchen staff who have been here since the beginning.
              </p>
              <p>
                Jeonju is where bibimbap comes from and where Korea keeps its reputation for home
                cooking. That is the cooking here: stews and hand-made noodles, not a grill.
              </p>
            </div>
            <Link
              href="/story"
              className="group mt-10 inline-flex items-center gap-3 font-mono text-label uppercase text-accent"
            >
              Read the story
              <span
                aria-hidden
                className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-2"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- what people say ---------- */}
      <section className="grain relative bg-obsidian py-section">
        <div className="relative mx-auto max-w-shell gutter">
          <Reveal>
            <SectionHeading
              eyebrow="4.7 stars, 1,200+ reviews"
              heading="What people say"
              headingKo="후기"
              align="center"
            />
          </Reveal>

          <ul className="mt-20 columns-1 gap-7 md:columns-2 lg:columns-3">
            {testimonials.slice(0, 6).map((t, i) => (
              <Reveal as="li" key={t.attribution} index={i} className="mb-7 break-inside-avoid">
                <figure className="surface rounded-sm p-8">
                  <blockquote className="font-display text-lg leading-relaxed text-fg/90">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-baseline justify-between gap-3 font-mono text-micro uppercase text-fg-faint">
                    <span>{t.attribution}</span>
                    <span>
                      {t.platform}
                      {t.date && ` · ${t.date}`}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-6 text-center">
            <p className="text-xs text-fg-faint">
              Reviews are paraphrased from public listings, not quoted.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- press ---------- */}
      <section className="border-y border-white/[0.07] bg-obsidian-deep py-20">
        <div className="mx-auto max-w-shell gutter">
          <Reveal>
            <p className="text-center font-mono text-micro uppercase text-fg-faint">
              Written about in
            </p>
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {press.map((p) => (
                <li key={p.outlet} className="font-display text-xl text-fg/45">
                  {p.outlet}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------- visit ---------- */}
      <section className="grain relative bg-obsidian py-section">
        <div className="relative mx-auto max-w-shell gutter">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <SectionHeading eyebrow="Come in" heading="40-11 150th Street" headingKo="오시는 길" />
              <p className="mt-7 max-w-md text-lg leading-relaxed text-fg-muted">
                A small room in the Murray Hill Food Alley, a short walk from the{' '}
                {business.transit.station}. Around {business.seats.value} seats. Reservations are
                taken by phone.
              </p>

              <div className="mt-11 flex flex-wrap gap-3">
                <a
                  href={business.phone.href}
                  className="rounded-full bg-accent px-8 py-4 font-mono text-label uppercase text-obsidian transition-colors duration-500 hover:bg-gold-bright"
                >
                  Call {business.phone.display}
                </a>
                <Link
                  href="/visit"
                  className="rounded-full border border-white/15 px-8 py-4 font-mono text-label uppercase text-fg transition-colors duration-500 hover:border-accent hover:text-accent"
                >
                  Directions & hours
                </Link>
              </div>
            </Reveal>

            <Reveal index={1}>
              <dl className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {[
                  ['Address', business.address.full],
                  [
                    'Hours',
                    `${business.hours.value.open} – ${business.hours.value.close}, ${business.hours.value.days.toLowerCase()}`,
                  ],
                  ['Service', business.attributes.service.join(' · ')],
                  ['Parking', business.attributes.parking.join(' · ')],
                  ['Access', 'Wheelchair-accessible entrance, seating and parking'],
                ].map(([term, detail]) => (
                  <div key={term} className="grid grid-cols-[7rem_1fr] gap-4 py-5">
                    <dt className="font-mono text-micro uppercase text-accent">{term}</dt>
                    <dd className="text-sm leading-relaxed text-fg-muted">{detail}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-xs text-fg-faint">
                Hours vary by listing —{' '}
                <a
                  href={business.phone.href}
                  className="underline underline-offset-2 transition-colors hover:text-accent"
                >
                  call to confirm
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
