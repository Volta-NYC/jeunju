import type { Metadata } from 'next';
import { Photo } from '@/components/media/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { business } from '@/content/business';

export const metadata: Metadata = {
  title: 'Visit',
  description:
    'JeunJu Korean Restaurant, 40-11 150th St, Flushing NY 11354. Dine in, take out, or call (718) 939-0434.',
};

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${business.fullName}, ${business.address.full}`,
)}`;

export default function VisitPage() {
  const { address, phone, hours, attributes } = business;

  return (
    <>
      <header className="grain vignette relative bg-obsidian pb-24 pt-44">
        <div className="relative mx-auto max-w-shell gutter">
          <p className="font-mono text-micro uppercase text-accent">
            {address.neighborhood} · {address.borough}
          </p>
          <h1 className="lit mt-6 font-display text-display-lg text-fg">
            {address.street}
            <span className="block text-accent">
              {address.city}, {address.state} {address.zip}
            </span>
          </h1>

          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href={phone.href}
              className="rounded-full bg-accent px-8 py-4 font-mono text-label uppercase text-obsidian transition-colors duration-500 hover:bg-gold-bright"
            >
              Call {phone.display}
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full border border-white/15 px-8 py-4 font-mono text-label uppercase text-fg transition-colors duration-500 hover:border-accent hover:text-accent"
            >
              Open in Maps
            </a>
          </div>
        </div>
      </header>

      <section className="on-raised grain relative bg-bg py-section">
        <div className="relative mx-auto max-w-shell gutter">
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
            {/* ---- hours ---- */}
            <Reveal>
              <h2 className="font-mono text-micro uppercase text-accent">Hours</h2>
              <p className="mt-6 font-display text-display-sm text-fg">
                {hours.value.open} – {hours.value.close}
              </p>
              <p className="mt-3 text-lg text-fg-muted">{hours.value.days}</p>

              {/*
                §7.3 — Google, DoorDash and an older Yelp cache each list a different
                range. Rather than pick one silently, the page tells you to call.
              */}
              <div className="surface mt-7 rounded-sm p-6">
                <p className="text-sm leading-relaxed text-fg-muted">
                  Listings disagree about closing time, and hours shift with the season. If you are
                  travelling for this, please{' '}
                  <a
                    href={phone.href}
                    className="text-fg underline underline-offset-2 transition-colors hover:text-accent"
                  >
                    call first
                  </a>
                  .
                </p>
              </div>

              <h2 className="mt-14 font-mono text-micro uppercase text-accent">Reservations</h2>
              <p className="mt-5 text-lg leading-relaxed text-fg-muted">
                Taken by phone. There is no booking site — it is a thirty-seat room, and calling
                works better.
              </p>
            </Reveal>

            {/* ---- practical ---- */}
            <Reveal index={1}>
              <dl className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {[
                  ['Service', attributes.service.join(' · ')],
                  ['Parking', attributes.parking.join(' · ')],
                  ['Accessibility', attributes.accessibility.join(' · ')],
                  ['Atmosphere', `${attributes.atmosphere} · around ${business.seats.value} seats`],
                  ['Drinks', 'Beer, soft drinks'],
                  ['Nearest station', business.transit.station],
                ].map(([term, detail]) => (
                  <div key={term} className="grid gap-1 py-6 sm:grid-cols-[9rem_1fr] sm:gap-4">
                    <dt className="font-mono text-micro uppercase text-accent">{term}</dt>
                    <dd className="text-sm leading-relaxed text-fg-muted">{detail}</dd>
                  </div>
                ))}
              </dl>

              <h2 className="mt-14 font-mono text-micro uppercase text-accent">Delivery</h2>
              <p className="mt-5 text-sm leading-relaxed text-fg-muted">
                Available on DoorDash, which lists the restaurant as DashPass eligible. Search
                “{business.fullName}” in the app — or call and order takeout directly.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* A photograph of the neighbourhood's food rather than a map tile — no external
          embed, so the page stays fast and does not phone home to a map provider. */}
      <section className="relative">
        <Photo
          id="atmos-banchan"
          alt="A spread of Korean side dishes"
          className="h-[24rem] w-full sm:h-[34rem]"
          sizes="100vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/45 to-obsidian/20"
        />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-shell gutter pb-14">
          <p lang="ko" className="font-display text-3xl text-fg">
            먹자골목
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-muted">
            Murray Hill Food Alley — the Korean corridor that grew east from Flushing’s Main Street
            in the 2000s. We are on the 150th Street end of it.
          </p>
        </div>
      </section>
    </>
  );
}
