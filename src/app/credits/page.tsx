import type { Metadata } from 'next';
import { allCredits, mediaNote } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Photo credits',
  description: 'Attribution and licensing for the photography used on this site.',
  robots: { index: false, follow: true },
};

/**
 * Attribution page.
 *
 * Not optional: several of the photographs are CC BY-SA, which requires crediting the
 * author and naming the licence. It is also the honest place to state that these are
 * stand-in photographs of the dishes, not photographs taken at this restaurant.
 */
export default function CreditsPage() {
  const credits = allCredits();

  return (
    <div className="grain relative min-h-screen bg-obsidian pb-section pt-44">
      <div className="relative mx-auto max-w-4xl gutter">
        <p className="font-mono text-micro uppercase text-accent">Attribution</p>
        <h1 className="lit mt-5 font-display text-display-md text-fg">Photo credits</h1>

        <div className="surface mt-10 rounded-sm p-7">
          <p className="text-sm leading-relaxed text-fg-muted">{mediaNote}</p>
        </div>

        {credits.length === 0 ? (
          // Reached once every placeholder has been replaced by the restaurant's own work.
          <p className="mt-10 max-w-measure leading-relaxed text-fg-muted">
            Every photograph on this site is the restaurant’s own. Nothing here requires
            third-party attribution.
          </p>
        ) : (
          <p className="mt-10 max-w-measure leading-relaxed text-fg-muted">
            The {credits.length} photographs below come from Wikimedia Commons under the licences
            listed. Each is reused here under its licence terms, with the author credited.
          </p>
        )}

        <ul className="mt-14 divide-y divide-white/[0.07] border-y border-white/[0.07] empty:hidden empty:border-0">
          {credits.map((credit) => (
            <li key={credit.file} className="grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:gap-10">
              <div>
                <a
                  href={credit.pageUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-fg underline underline-offset-2 transition-colors hover:text-accent"
                >
                  {credit.file.replace(/^File:/, '')}
                </a>
                <p className="mt-1.5 text-xs text-fg-faint">{credit.author}</p>
              </div>
              <p className="font-mono text-micro uppercase text-fg-faint sm:text-right">
                {credit.licenseUrl ? (
                  <a
                    href={credit.licenseUrl}
                    target="_blank"
                    rel="noreferrer noopener license"
                    className="underline underline-offset-2 transition-colors hover:text-accent"
                  >
                    {credit.license}
                  </a>
                ) : (
                  credit.license
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
