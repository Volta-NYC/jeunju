import Link from 'next/link';
import { business } from '@/content/business';

/**
 * Footer. Contact stays minimal per the reference direction, but the hours carry their
 * uncertainty honestly rather than printing a range the research could not settle.
 *
 * This is the one place 청 celadon and 적 jujube appear — the two obangsaek colours held
 * back from the rest of the site, kept for the maker's seal.
 */
export function Footer() {
  const { address, phone, hours, social } = business;

  return (
    <footer className="grain relative border-t border-white/[0.07] bg-obsidian-deep pb-14 pt-section text-fg">
      <div className="relative mx-auto max-w-shell gutter">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10">
          {/* wordmark + seal */}
          <div>
            <div className="flex items-start gap-5">
              <div>
                <p className="font-display text-4xl leading-none tracking-tight">JeunJu</p>
                <p lang="ko" className="mt-3 font-display text-lg text-fg/30">
                  전주식당
                </p>
              </div>
              {/* A seal, the way a Korean maker's mark sits on ceramics. */}
              <span
                lang="ko"
                aria-hidden
                className="vertical-ko mt-1 rounded-sm bg-jujube px-1.5 py-2 font-display text-sm tracking-widest text-ivory"
              >
                전주
              </span>
            </div>
            <p className="mt-7 max-w-xs text-sm leading-relaxed text-fg-faint">
              {business.cuisine}. Family-run,{' '}
              {business.attributes.identity.join(' and ').toLowerCase()}.
            </p>
          </div>

          {/* find us */}
          <div>
            <h2 className="font-mono text-micro uppercase text-accent">Find us</h2>
            <address className="mt-6 space-y-1 not-italic text-sm leading-relaxed text-fg-muted">
              <p>{address.street}</p>
              <p>
                {address.city}, {address.state} {address.zip}
              </p>
            </address>
            <a
              href={phone.href}
              className="mt-5 inline-block font-mono text-sm text-fg transition-colors duration-500 hover:text-accent"
            >
              {phone.display}
            </a>
            <p className="mt-5 text-xs leading-relaxed text-fg-faint">
              Near the {business.transit.station}.
            </p>
          </div>

          {/* hours */}
          <div>
            <h2 className="font-mono text-micro uppercase text-accent">Hours</h2>
            <p className="mt-6 font-mono text-sm text-fg-muted">
              {hours.value.days}
              <br />
              {hours.value.open} – {hours.value.close}
            </p>
            {/*
              §7.3: three conflicting ranges were found across Google, DoorDash and an
              older Yelp cache. Until the owner confirms, the site says so.
            */}
            <p className="mt-4 text-xs leading-relaxed text-fg-faint">
              Hours can change with the season —{' '}
              <a
                href={phone.href}
                className="underline underline-offset-2 transition-colors hover:text-accent"
              >
                call to confirm
              </a>{' '}
              before you travel.
            </p>

            <div className="mt-7 flex gap-5">
              {[social.instagram, social.facebook].map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-micro uppercase text-fg-faint transition-colors duration-500 hover:text-accent"
                >
                  {s.url.includes('instagram') ? 'Instagram' : 'Facebook'}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="rule my-12" />

        <div className="flex flex-col gap-4 text-xs text-fg-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.fullName}
          </p>
          <div className="flex flex-wrap gap-x-7 gap-y-2">
            <Link href="/menu" className="transition-colors hover:text-fg">
              Menu
            </Link>
            <Link href="/visit" className="transition-colors hover:text-fg">
              Visit
            </Link>
            <Link href="/credits" className="transition-colors hover:text-fg">
              Photo credits
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
