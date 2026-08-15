/**
 * Content schema for the JeunJu site.
 *
 * Everything here is normalised from `raw messy data/info.md`. Two rules hold
 * throughout:
 *
 * 1. Nothing is invented. A fact the research could not establish is `null`, not a
 *    plausible guess.
 * 2. Facts the research found *in conflict* carry a `confidence` marker so the UI can
 *    present them honestly (or withhold them) rather than silently picking a winner.
 */

/** How well-established a piece of business data is, per the research report. */
export type Confidence =
  /** Same value across every source checked. Safe to publish. */
  | 'confirmed'
  /** Sources disagree. Must not be published as fact without the owner confirming. */
  | 'conflicting'
  /** Single source, or a source of unclear reliability. */
  | 'single-source';

export interface Fact<T> {
  value: T;
  confidence: Confidence;
  /** Where this came from, for the maintainer. */
  source: string;
  /** Present when `confidence` is not 'confirmed': what still needs resolving. */
  note?: string;
}

export interface MenuItem {
  slug: string;
  /** English name as listed. */
  name: string;
  /** Korean name (Hangul) where the source recorded one. */
  nameKo: string | null;
  /** Romanised name, when the dish is commonly known by it (kalguksu, gamjatang…). */
  romanized: string | null;
  /** USD, or `null` where the research explicitly found no price. */
  price: number | null;
  description: string | null;
  /** Key into the media manifest; `null` where we have no photograph. */
  image: string | null;
  tags: MenuTag[];
  /** Serving note, e.g. 'Serves 3–4'. */
  serves: string | null;
  /** Shown to the maintainer only — never rendered as customer-facing copy. */
  internalNote?: string;
}

export type MenuTag =
  /** Sources consistently name this as a most-recommended dish. */
  | 'signature'
  | 'spicy'
  | 'vegetarian-option'
  | 'seafood'
  | 'shareable'
  /** Comes with 4+ complimentary banchan per the source listing. */
  | 'banchan-included'
  /** Reviews flagged this as very filling — worth setting expectations on. */
  | 'hearty';

export interface MenuCategory {
  slug: string;
  name: string;
  nameKo: string;
  /** One line of context for the category. Written for this site, not scraped. */
  blurb: string;
  items: MenuItem[];
}

export interface Testimonial {
  quote: string;
  attribution: string;
  platform: string;
  date: string | null;
  /** Dish the reviewer singled out, if any. */
  dish: string | null;
}

export interface PressMention {
  outlet: string;
  title: string;
  date: string;
  note: string;
}

export interface StoryChapter {
  id: string;
  eyebrow: string;
  heading: string;
  body: string[];
  image: string | null;
}
