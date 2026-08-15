import type { Fact } from './types';

/**
 * Core business identity and contact data.
 *
 * Address and phone were identical across every source checked, so they are published
 * plainly. Hours and founding year were NOT — see `hours` and `founded` below.
 */

export const business = {
  /**
   * §7.5 of the research: "Jeunju", "JeunJu" and "Jeun Ju" are all in active use with no
   * consistent form. Google and most aggregators lean "JeunJu Korean Restaurant", so the
   * site standardises on that — one spelling, everywhere.
   */
  name: 'JeunJu',
  fullName: 'JeunJu Korean Restaurant',
  nameKo: '전주식당',
  /** Second registered Korean name found on the Google Business Profile. */
  altNameKo: '전주할매칼국수',
  tagline: 'Jeonju home cooking in Murray Hill',

  /** Facebook page tagline, paraphrased. Heritage is the core promise. */
  promise:
    "Homestyle recipes from Jeonju — South Korea's culinary capital — cooked the way one family has always cooked them.",

  cuisine: 'Korean · Jeollado (Jeonju) home cooking',

  address: {
    street: '40-11 150th St',
    city: 'Flushing',
    state: 'NY',
    zip: '11354',
    neighborhood: 'Murray Hill',
    borough: 'Queens',
    full: '40-11 150th St, Flushing, NY 11354',
    /** Consistent across every source checked. */
    confidence: 'confirmed' as const,
  },

  phone: {
    display: '(718) 939-0434',
    href: 'tel:+17189390434',
    confidence: 'confirmed' as const,
  },

  /** §2: no email address was found anywhere. Do not invent one. */
  email: null,

  /**
   * §2 + §7.3 — three different ranges were found. The site therefore shows the
   * most-corroborated range but labels it as worth confirming, and puts the phone number
   * next to it. Do not delete the flag without a direct answer from the owner.
   */
  hours: {
    value: { open: '7:00 AM', close: '10:00 PM', days: 'Seven days a week' },
    confidence: 'conflicting' as const,
    source: 'Google Business Profile and most current Yelp snapshots',
    note:
      'DoorDash lists 10:00 AM–9:40 PM and an older Yelp cache lists 10:00 AM–10:00 PM. ' +
      'Confirm with Sophia Cho before removing the "call to confirm" affordance.',
  } satisfies Fact<{ open: string; close: string; days: string }>,

  /**
   * §7.2 — "since 1999" (Facebook, aggregators, QNS.com) vs. "Since 1985" painted on the
   * awning (per a 2017 press visit). Unresolved, so the site never prints a founding
   * year as a headline number. The story page tells both, as a story.
   */
  founded: {
    value: null,
    confidence: 'conflicting' as const,
    source: 'Facebook/aggregators say 1999; the awning reads "Since 1985"',
    note:
      'Ask the owner what 1985 refers to — possibly her mother\'s cooking background or an ' +
      'earlier establishment. Until then, publish no founding year as fact.',
  } satisfies Fact<number | null>,

  people: {
    owner: { name: 'Sophia Cho', role: 'Owner' },
    founder: { name: 'Eunhae Bae', role: 'Founder and original head chef' },
  },

  /** Google Business Profile attributes. */
  attributes: {
    identity: ['Asian-owned', 'Women-owned'],
    service: ['Dine-in', 'Takeout', 'Delivery'],
    /**
     * Google attributes say reservations are accepted, but no booking platform exists
     * (§7). The site says "call to reserve" rather than shipping a fake booking form.
     */
    reservations: { accepted: true, platform: null },
    accessibility: [
      'Wheelchair-accessible entrance',
      'Wheelchair-accessible seating',
      'Wheelchair-accessible parking',
    ],
    parking: ['Free street parking', 'Paid street parking'],
    atmosphere: 'Casual',
    alcohol: ['Beer'],
  },

  /** §2 — one reviewer's estimate. Presented as approximate. */
  seats: { value: 30, confidence: 'single-source' as const },

  social: {
    instagram: { handle: '@jeunju_restaurant_nyc', url: 'https://www.instagram.com/jeunju_restaurant_nyc/' },
    facebook: { handle: 'jeunjurestaurant', url: 'https://www.facebook.com/jeunjurestaurant' },
  },

  delivery: {
    doordash: { name: 'DoorDash', note: 'DashPass eligible', url: null },
    /** §0 — presence confirmed via an aggregator, but no direct store page was retrieved. */
    ubereats: { name: 'Uber Eats', note: 'Presence indicated; link unconfirmed', url: null },
  },

  ratings: [
    { platform: 'Google', score: 4.7, count: '1,200+' },
    { platform: 'Yelp', score: 4.3, count: '58–83' },
    { platform: 'DoorDash', score: 4.5, count: '10+' },
  ],

  transit: {
    landmark: 'Murray Hill Food Alley (먹자골목)',
    station: 'Murray Hill LIRR (Port Washington branch)',
  },
} as const;

/**
 * §7.1 — three domains surfaced and it is unclear which, if any, the business controls.
 * No canonical URL is published until that is resolved.
 */
export const SITE_URL = 'https://example.com';
