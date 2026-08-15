import type { Metadata } from 'next';
import Link from 'next/link';
import { Photo } from '@/components/media/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { business } from '@/content/business';
import { story, foundingYearNote } from '@/content/story';

export const metadata: Metadata = {
  title: 'Story',
  description:
    'Eunhae Bae came from Jeonju and opened the kitchen. Her daughter Sophia Cho runs it now — same recipes, same staff.',
};

export default function StoryPage() {
  return (
    <>
      <header className="grain vignette relative bg-obsidian pb-28 pt-44">
        <div className="relative mx-auto max-w-shell gutter">
          <p className="font-mono text-micro uppercase text-accent">
            {business.people.founder.name} → {business.people.owner.name}
          </p>
          <h1 className="lit mt-6 max-w-4xl font-display text-display-lg text-fg">
            A restaurant named after a city, run by a family from it.
          </h1>
          <div className="gold-rule mt-10 w-52" />
        </div>
      </header>

      {/* Chapters. Alternating sides so the eye crosses the page rather than running
          straight down one column. */}
      <div className="on-raised grain relative bg-bg py-section">
        <div className="relative mx-auto max-w-shell gutter">
          {story.map((chapter, i) => (
            <Reveal
              as="section"
              key={chapter.id}
              index={0}
              className={`grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-24 ${
                i % 2 === 1 ? '[&>*:first-child]:lg:order-2' : ''
              }`}
            >
              <div className="relative">
                <Photo
                  id={chapter.image}
                  alt={chapter.heading}
                  className="aspect-[5/4] w-full rounded-sm ring-1 ring-white/10"
                  sizes="(max-width: 1024px) 90vw, 44vw"
                />
              </div>

              <div>
                <p className="font-mono text-micro uppercase text-accent">{chapter.eyebrow}</p>
                <h2 className="mt-5 font-display text-display-sm text-fg">{chapter.heading}</h2>
                <div className="mt-7 space-y-4 text-lg leading-relaxed text-fg-muted">
                  {chapter.body.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/*
        §7.2 — sources conflict on the founding year and we have not resolved it. Saying
        so plainly is both honest and a better story than a number we cannot stand behind.
      */}
      <section className="grain relative overflow-hidden bg-obsidian-deep py-section">
        <div
          aria-hidden
          className="animate-glow pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgb(var(--gold)) 0%, transparent 65%)' }}
        />
        <div className="relative mx-auto max-w-3xl gutter text-center">
          <Reveal>
            <p className="font-mono text-micro uppercase text-accent">The awning</p>
            <h2 className="lit mt-6 font-display text-display-md text-fg">
              {foundingYearNote.heading}
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-fg-muted">
              {foundingYearNote.body}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="on-raised grain relative bg-bg py-section">
        <div className="relative mx-auto max-w-shell gutter">
          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                h: 'Asian-owned, women-owned',
                p: 'Both, per the restaurant’s own listing. It has been in one family the whole time.',
              },
              {
                h: 'Around thirty seats',
                p: 'A small room. Reviewers reach for “cosy”, “homey” and, more than once, “like a grandmother’s kitchen”.',
              },
              {
                h: 'In the Food Alley',
                p: `Murray Hill’s 먹자골목, the Korean corridor that grew east from Main Street in the 2000s. Near the ${business.transit.station}.`,
              },
            ].map((card, i) => (
              <Reveal key={card.h} index={i}>
                <div className="h-full border-t border-white/15 pt-7">
                  <h3 className="font-display text-2xl text-fg">{card.h}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-fg-muted">{card.p}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-20 flex flex-wrap gap-3">
            <Link
              href="/menu"
              className="rounded-full bg-accent px-8 py-4 font-mono text-label uppercase text-obsidian transition-colors duration-500 hover:bg-gold-bright"
            >
              See the menu
            </Link>
            <Link
              href="/visit"
              className="rounded-full border border-white/15 px-8 py-4 font-mono text-label uppercase text-fg transition-colors duration-500 hover:border-accent hover:text-accent"
            >
              Come in
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
