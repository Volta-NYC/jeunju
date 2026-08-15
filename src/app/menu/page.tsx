import type { Metadata } from 'next';
import { MenuBrowser } from '@/components/menu/MenuBrowser';
import { menu, unconfirmedItems, allItems } from '@/content/menu';
import { business } from '@/content/business';

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'The full JeunJu menu — Jeonju-style soups, stews, hand-cut noodles and shared plates, with Korean names and prices.',
};

export default function MenuPage() {
  const priced = allItems.filter((i) => i.price !== null).length;

  return (
    <div className="grain relative min-h-screen bg-obsidian pb-section pt-36">
      <div className="relative mx-auto max-w-shell gutter">
        <header className="max-w-3xl pb-14">
          <p className="font-mono text-micro uppercase text-accent">
            {allItems.length} dishes · {menu.length} sections
          </p>
          <h1 className="lit mt-5 font-display text-display-lg text-fg">
            The menu
            <span lang="ko" className="ml-5 align-middle font-display text-[0.34em] text-fg/25">
              메뉴
            </span>
          </h1>
          <div className="gold-rule mt-8 w-40" />
          <p className="mt-8 text-lg leading-relaxed text-fg-muted">
            Jeollado home cooking: soups simmered long, noodles made by hand, and plates built to
            put in the middle of the table. Most mains arrive with four or more banchan, and refills
            are free.
          </p>
        </header>
      </div>

      <div className="gutter">
        <MenuBrowser categories={menu} />
      </div>

      <div className="mx-auto mt-28 max-w-shell gutter">
        <div className="grid gap-12 border-t border-white/[0.07] pt-12 md:grid-cols-2">
          {/*
            §3 recorded these on secondary aggregators only — possibly older, seasonal or
            off-menu. Listing them as "ask" is more useful than either dropping them or
            presenting them as current.
          */}
          <section>
            <h2 className="font-mono text-micro uppercase text-accent">Ask about</h2>
            <p className="mt-5 text-sm leading-relaxed text-fg-muted">
              These have been served here but are not on the standing menu — seasonal, or made on
              request. Ask when you sit down.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {unconfirmedItems.map((name) => (
                <li key={name} className="font-display text-lg text-fg/75">
                  {name}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-mono text-micro uppercase text-accent">Good to know</h2>
            <dl className="mt-5 space-y-3.5 text-sm leading-relaxed text-fg-muted">
              <div>
                <dt className="inline font-medium text-fg">Prices · </dt>
                <dd className="inline">
                  {priced} of {allItems.length} dishes have a listed price. Where we show “Ask us”,
                  the price varies or was not published — call and we will tell you.
                </dd>
              </div>
              <div>
                <dt className="inline font-medium text-fg">Spice and substitutions · </dt>
                <dd className="inline">Ask your server. Most dishes can be adjusted.</dd>
              </div>
              <div>
                <dt className="inline font-medium text-fg">Beer · </dt>
                <dd className="inline">Served. Ask what is open.</dd>
              </div>
              <div>
                <dt className="inline font-medium text-fg">Large orders · </dt>
                <dd className="inline">
                  Call {business.phone.display} — hotpots serve three to four.
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
