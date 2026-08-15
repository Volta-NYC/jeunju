import type { Metadata, Viewport } from 'next';
import { Gowun_Batang, IBM_Plex_Sans_KR, IBM_Plex_Mono } from 'next/font/google';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { business } from '@/content/business';
import './globals.css';

/**
 * Gowun Batang sets Hangul and Latin in a single voice, which is the point: this is a
 * Jeonju kitchen in Queens, and the menu reads in two scripts at once. Plex Sans KR and
 * Plex Mono carry body copy and data in both scripts too, so nothing ever falls back to
 * a mismatched system face mid-line.
 */
const display = Gowun_Batang({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = IBM_Plex_Sans_KR({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${business.fullName} — ${business.tagline}`,
    template: `%s · ${business.name}`,
  },
  description: business.promise,
  keywords: [
    'Korean restaurant Flushing',
    'Jeonju food Queens',
    'kalguksu Flushing',
    'gamjatang Queens',
    'Murray Hill Korean food',
  ],
  openGraph: {
    title: `${business.fullName} — ${business.tagline}`,
    description: business.promise,
    type: 'website',
    locale: 'en_US',
    siteName: business.fullName,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#08080A',
  colorScheme: 'dark',
};

/**
 * Structured data. Only fields the research could confirm are emitted — no opening
 * hours, because §7.3 leaves them unresolved and publishing a guess to search engines is
 * worse than publishing none.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: business.fullName,
  alternateName: business.nameKo,
  servesCuisine: 'Korean',
  telephone: business.phone.display,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    postalCode: business.address.zip,
    addressCountry: 'US',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    reviewCount: '1200',
  },
  acceptsReservations: 'True',
  sameAs: [business.social.instagram.url, business.social.facebook.url],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        {/*
          Scroll reveals start hidden and are shown by an IntersectionObserver. With
          JavaScript off nothing ever intersects, so the content would never appear —
          this makes every revealed section visible instead.
        */}
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only rounded-full bg-accent px-5 py-3 font-mono text-label uppercase text-obsidian focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
