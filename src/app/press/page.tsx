import type { Metadata } from 'next';
import { Reveal } from '@/components/ui/Reveal';
import { business } from '@/content/business';
import { press, testimonials } from '@/content/story';

export const metadata: Metadata = {
  title: 'Press',
  description:
    'JeunJu in Eater NY, QNS.com, Eat the World NYC and the Asian American Federation’s Murray Hill Food Alley guide.',
};

export default function PressPage() {
  return (
    <>
      <header className="grain vignette relative bg-obsidian pb-24 pt-44">
        <div className="relative mx-auto max-w-shell gutter">
          <p className="font-mono text-micro uppercase text-accent">Press & praise</p>
          <h1 className="lit mt-6 max-w-3xl font-display text-display-lg text-fg">
            Written about, mostly for the noodles.
          </h1>
          <ul className="mt-14 flex flex-wrap gap-x-14 gap-y-7">
            {business.ratings.map((r) => (
              <li key={r.platform}>
                <p className="font-display text-3xl text-accent">{r.score}★</p>
                <p className="mt-2 font-mono text-micro uppercase text-fg-faint">
                  {r.platform} · {r.count}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section className="on-raised grain relative bg-bg py-section">
        <div className="relative mx-auto max-w-shell gutter">
          <h2 className="font-mono text-micro uppercase text-accent">Coverage</h2>
          <ul className="mt-10 divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {press.map((item, i) => (
              <Reveal as="li" key={item.outlet} index={i}>
                <article className="grid gap-3 py-8 md:grid-cols-[12rem_1fr] md:gap-10">
                  <div>
                    <p className="font-display text-2xl text-fg">{item.outlet}</p>
                    {item.date && (
                      <p className="mt-1.5 font-mono text-micro uppercase text-fg-faint">
                        {item.date}
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg leading-snug text-fg/85">{item.title}</h3>
                    <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-fg-muted">
                      {item.note}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="grain relative bg-obsidian py-section">
        <div className="relative mx-auto max-w-shell gutter">
          <h2 className="font-mono text-micro uppercase text-accent">From diners</h2>
          <ul className="mt-12 grid gap-7 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal as="li" key={t.attribution} index={i % 2}>
                <figure className="surface h-full rounded-sm p-8">
                  <blockquote className="font-display text-lg leading-relaxed text-fg/90">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex flex-wrap items-baseline justify-between gap-3 font-mono text-micro uppercase text-fg-faint">
                    <span>{t.attribution}</span>
                    <span>
                      {t.platform}
                      {t.date && ` · ${t.date}`}
                      {t.dish && ` · ${t.dish}`}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>

          <p className="mt-12 max-w-2xl text-xs leading-relaxed text-fg-faint">
            Reviews are paraphrased from public listings rather than quoted, and attributed to the
            platform they appeared on. Ratings shown above were current when this site was built.
          </p>
        </div>
      </section>
    </>
  );
}
