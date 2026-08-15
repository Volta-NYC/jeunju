import type { PressMention, StoryChapter, Testimonial } from './types';

/**
 * The story, press and reviews.
 *
 * Review text is paraphrased, never quoted verbatim — §5 of the research report kept to
 * that practice deliberately and this file continues it. Each testimonial keeps its
 * platform attribution so nothing reads as anonymous marketing copy.
 */

export const story: StoryChapter[] = [
  {
    id: 'jeonju',
    eyebrow: 'The name',
    heading: 'A city, not a family name',
    body: [
      'Jeonju sits in the southwest of South Korea and is widely held to be the country’s culinary capital — the place bibimbap comes from, and the region whose home cooking, Jeollado cooking, is built on soups, stews and noodles rather than the grill.',
      'The restaurant is named after it directly. That is the whole thesis: not Korean food broadly, but one region’s cooking, made the way one family from there makes it.',
    ],
    image: 'atmos-jeonju',
  },
  {
    id: 'eunhae',
    eyebrow: 'The founder',
    heading: 'Eunhae Bae',
    body: [
      'Eunhae Bae came from Jeonju and opened the kitchen on 150th Street. She was the original head chef, and the recipes on the menu today are hers.',
      'Her photograph is still on the awning outside, with a year painted underneath it. Regulars have walked past it for decades.',
    ],
    image: 'atmos-onggi',
  },
  {
    id: 'sophia',
    eyebrow: 'The kitchen today',
    heading: 'Sophia Cho',
    body: [
      'Sophia Cho, Eunhae’s daughter, took the restaurant over from her mother and runs it now. She kept on the kitchen staff who had been there from the beginning, and has kept to her mother’s approach rather than modernising away from it.',
      'Homecoming NYC, which held a community Lunar New Year dinner here in 2025, described what she has built as a haven for people who love traditional Korean food in Queens.',
    ],
    image: 'atmos-table',
  },
  {
    id: 'garden',
    eyebrow: 'How it is cooked',
    heading: 'From scratch, and from the garden',
    body: [
      'The kitchen makes its components from scratch and grows vegetables for the restaurant in the family garden — the napa cabbage in the gamjatang comes from there.',
      'The noodles are made by hand: kalguksu rolled and cut, sujebi torn piece by piece into the broth. Both take time that a busy kitchen could easily save. Neither has been dropped.',
    ],
    image: 'kalguksu',
  },
];

/**
 * §7.2: sources conflict on the founding year. Rather than pick one, the story page says
 * so plainly — which is both honest and more interesting than a number.
 */
export const foundingYearNote = {
  heading: 'Since 1985. Or 1999.',
  body:
    'The awning says 1985. Facebook, and most listings, say the restaurant has been at this address since 1999. Both have been true in print for years and we have not tried to resolve it here. If you ask Sophia in person, you will get the real answer — which is more than a website can offer.',
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'The best classic homestyle Korean food she had found in the area, and a meal that was deeply satisfying.',
    attribution: 'Alicia L.',
    platform: 'Yelp',
    date: 'April 2025',
    dish: null,
  },
  {
    quote:
      'A repeat visitor: warm and welcoming staff, banchan that tastes traditional, and generous portions at reasonable prices. The all-Korean menu, she noted, should not put anyone off.',
    attribution: 'Anne Theresa P.',
    platform: 'Google',
    date: null,
    dish: null,
  },
  {
    quote:
      'Staff offered him an apron so the soup would not splash his shirt. He singled out the perilla-seed kalguksu.',
    attribution: 'Khoi Pham',
    platform: 'Google',
    date: null,
    dish: 'Kalguksu',
  },
  {
    quote:
      'Food that felt homey and lighter than the competition, with notably tender beef in the spicy beef soup and a seafood pancake big enough to share.',
    attribution: 'monicaa',
    platform: 'Google',
    date: null,
    dish: 'Spicy beef soup',
  },
  {
    quote:
      'The bean sprout soup, with poached egg, seaweed and a marinated shrimp sauce — low in salt by default, so you season it yourself.',
    attribution: 'Julie Ko',
    platform: 'Customer review',
    date: null,
    dish: 'Bean sprout soup',
  },
  {
    quote:
      'Shared the seafood pancake and the seafood udon; called the banchan solid and the room cosy and homey.',
    attribution: 'Serena X.',
    platform: 'Yelp',
    date: 'May 2025',
    dish: 'Seafood pancake',
  },
  {
    quote:
      'Hearty homestyle comfort food — the group enjoyed every dish they ordered.',
    attribution: 'Yunong Shi',
    platform: 'Google',
    date: null,
    dish: null,
  },
  {
    quote:
      'Their all-time favourite Korean restaurant in New York, and still good value. They picked out the cold spicy noodles as properly balanced: light, a little sweet, spicy, tangy.',
    attribution: 'Anonymous',
    platform: 'Postcard.inc',
    date: null,
    dish: 'Bibim guksu',
  },
];

export const press: PressMention[] = [
  {
    outlet: 'Eater NY',
    title: '19 Standout Korean Restaurants in Murray Hill, Koreatown, Queens',
    date: 'October 2023',
    note: 'Profiled Sophia Cho taking over the restaurant her mother started. Photography by Caroline Shin.',
  },
  {
    outlet: 'QNS.com',
    title: 'Lunar New Year Family Dinner',
    date: 'February 2025',
    note: 'Covered the community dinner hosted at JeunJu, where tteokguk was served as a one-off.',
  },
  {
    outlet: 'Homecoming NYC',
    title: 'Lunar New Year with JeunJu',
    date: '2025',
    note: 'Ran the dinner in partnership with the Asian American Federation, and published a profile of Sophia and the restaurant.',
  },
  {
    outlet: 'Eat the World NYC',
    title: 'Restaurant feature',
    date: 'May 2017',
    note: 'A full visit writeup, and the first record of the sesame technique behind the gamjatang broth.',
  },
  {
    outlet: 'coolstuff.nyc',
    title: 'Murray Hill Food Alley guide',
    date: 'October 2023',
    note: 'Called out specifically for the kalguksu and sujebi.',
  },
  {
    outlet: 'Asian American Federation',
    title: 'Murray Hill Food Alley map and guide',
    date: null as unknown as string,
    note: 'Included in the community map, listed under Korean cuisine, Jeollado region.',
  },
];

/** The one thing every review source agrees on. Used as the site's recurring motif. */
export const banchanFact = {
  headline: 'Refills are free.',
  body:
    'Across Yelp, Google, DoorDash and the press, the single most repeated thing anyone says about this restaurant is that the banchan keeps coming and nobody charges for it. Most mains arrive with four or more.',
};
