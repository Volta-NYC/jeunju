import type { MenuCategory, MenuItem } from './types';

/**
 * The menu, normalised from §3 of the research report.
 *
 * Prices come from the Google Business Profile listing cross-checked against DoorDash,
 * which matched on every overlapping item. Where §3 recorded "price NOT FOUND", `price`
 * is `null` and the UI prints "Ask us" rather than inventing a number.
 *
 * Not modelled, because the research could not retrieve it: spice levels, protein swaps
 * and portion-size upcharges. §3 notes these are hidden until checkout on delivery apps
 * and should be pulled from the live ordering flow before launch.
 */

export const menu: MenuCategory[] = [
  {
    slug: 'mains',
    name: 'Mains',
    nameKo: '식사류',
    blurb: 'Full plates built around rice, most arriving with four or more banchan.',
    items: [
      {
        slug: 'stir-fried-pork-lettuce',
        name: 'Stir-Fried Pork with Lettuce',
        nameKo: '쌈밥정식',
        romanized: 'Ssambap jeongsik',
        price: 17.99,
        description:
          'Marinated pork belly, stir-fried and served with lettuce for wrapping, alongside a soybean-paste stew.',
        image: 'ssambap',
        tags: ['banchan-included'],
        serves: null,
      },
      {
        slug: 'spicy-braised-chicken-stew',
        name: 'Spicy Braised Chicken Stew',
        nameKo: '닭도리탕',
        romanized: 'Dakdoritang',
        price: 17.99,
        description: 'Chicken braised with potatoes and vegetables in a spicy sauce.',
        image: 'dakdoritang',
        tags: ['spicy'],
        serves: null,
        internalNote:
          'Reviews flagged chicken tenderness more than once (§5). Keep copy plain — do not oversell.',
      },
      {
        slug: 'la-galbi-doenjang-combo',
        name: 'LA Galbi & Soybean Paste Stew',
        nameKo: 'LA갈비 + 된장찌개 세트',
        romanized: 'LA galbi set',
        price: 24.99,
        description: 'Grilled LA-style beef short rib with a soybean-paste stew.',
        image: 'la-galbi',
        tags: ['banchan-included'],
        serves: null,
      },
      {
        slug: 'bulgogi',
        name: 'Bulgogi',
        nameKo: '불고기',
        romanized: 'Bulgogi',
        price: 17.99,
        description: 'Sweet-savoury marinated beef, pan-fried.',
        image: 'bulgogi',
        tags: ['banchan-included'],
        serves: null,
      },
      {
        slug: 'bibimbap',
        name: 'Bibimbap',
        nameKo: '비빔밥',
        romanized: 'Bibimbap',
        price: 14.99,
        description:
          'Rice with mixed vegetables and Korean chili sauce — the dish Jeonju is best known for.',
        image: 'bibimbap',
        tags: [],
        serves: null,
      },
      {
        slug: 'grilled-mackerel',
        name: 'Grilled Mackerel & Soybean Paste Stew',
        nameKo: '고등어구이 + 된장찌개',
        romanized: 'Godeungeo-gui',
        price: null,
        description: null,
        image: 'godeungeo',
        tags: ['seafood'],
        serves: null,
      },
      {
        slug: 'grilled-hairtail',
        name: 'Grilled Hairtail & Soybean Paste Soup',
        nameKo: '갈치구이 + 된장찌개',
        romanized: 'Galchi-gui',
        price: 17.99,
        description: null,
        image: 'galchi',
        tags: ['seafood'],
        serves: null,
      },
      {
        slug: 'grilled-croaker',
        name: 'Grilled Croaker & Soybean Paste Stew',
        nameKo: '조기구이 + 된장찌개',
        romanized: 'Jogi-gui',
        price: null,
        description: null,
        image: 'jogi',
        tags: ['seafood'],
        serves: null,
      },
      {
        slug: 'grilled-whole-squid',
        name: 'Grilled Whole Squid & Soybean Paste Stew',
        nameKo: '통오징어구이 + 된장찌개',
        romanized: 'Tong-ojingeo-gui',
        price: 26.99,
        description: null,
        image: 'ojingeo',
        tags: ['seafood'],
        serves: null,
      },
    ],
  },

  {
    slug: 'soups-and-stews',
    name: 'Soups & Stews',
    nameKo: '찌개 및 탕류',
    blurb: 'The heart of Jeollado cooking, and the reason most regulars come back.',
    items: [
      {
        slug: 'gamjatang',
        name: 'Pork Bone Stew',
        nameKo: '감자탕',
        romanized: 'Gamjatang',
        price: 16.99,
        description:
          'Pork spine simmered with napa cabbage from the family garden, potatoes, shiitake, bean sprouts and wild sesame seeds. The kitchen uses enough sesame to make the broth sweeter and less red than most — filling without sitting heavy.',
        image: 'gamjatang',
        tags: ['signature', 'spicy', 'hearty'],
        serves: null,
      },
      {
        slug: 'kimchi-jjigae',
        name: 'Kimchi Stew',
        nameKo: '김치찌개',
        romanized: 'Kimchi-jjigae',
        price: 14.99,
        description: 'The most-ordered dish among regulars, made with house kimchi.',
        image: 'kimchi-jjigae',
        tags: ['signature', 'spicy'],
        serves: null,
      },
      {
        slug: 'samgyetang',
        name: 'Ginseng Chicken Soup',
        nameKo: '삼계탕',
        romanized: 'Samgyetang',
        price: 19.99,
        description:
          'A whole young chicken stuffed with rice, ginseng, garlic and jujube. Traditionally eaten on the hottest days of summer — 이열치열, fight fire with fire.',
        image: 'samgyetang',
        tags: [],
        serves: null,
      },
      {
        slug: 'spicy-beef-soup',
        name: 'Spicy Beef Soup',
        nameKo: '따로국밥',
        romanized: 'Ttaro-gukbap',
        price: 14.99,
        description: 'Rice served alongside rather than in the bowl.',
        image: 'ttaro-gukbap',
        tags: ['spicy'],
        serves: null,
      },
      {
        slug: 'bean-sprout-soup',
        name: 'Bean Sprout Soup',
        nameKo: '콩나물국밥',
        romanized: 'Kongnamul-gukbap',
        price: 14.99,
        description:
          'Spicy, served with kimchi, and lightly salted on purpose so you can season it to taste. A Jeonju speciality and a long-standing hangover remedy.',
        image: 'kongnamul-gukbap',
        tags: ['signature', 'spicy'],
        serves: null,
      },
      {
        slug: 'hangover-soup',
        name: 'Hangover Soup',
        nameKo: '우거지해장국',
        romanized: 'Ugeoji-haejangguk',
        price: 14.99,
        description: null,
        image: 'haejangguk',
        tags: [],
        serves: null,
      },
      {
        slug: 'soft-tofu-seafood',
        name: 'Soft Tofu Soup with Seafood',
        nameKo: '해물순두부',
        romanized: 'Haemul-sundubu',
        price: 14.99,
        description: null,
        image: 'haemul-sundubu',
        tags: ['spicy', 'seafood'],
        serves: null,
      },
      {
        slug: 'galbitang',
        name: 'Beef Short Rib Soup',
        nameKo: '갈비탕',
        romanized: 'Galbitang',
        price: 19.99,
        description: 'Short rib simmered long enough to fall off the bone.',
        image: 'galbitang',
        tags: ['banchan-included', 'hearty'],
        serves: null,
      },
      {
        slug: 'budae-jjigae',
        name: 'Army Stew',
        nameKo: '부대찌개',
        romanized: 'Budae-jjigae',
        price: 14.99,
        description: 'House kimchi with pork belly, ham and sausage.',
        image: 'budae-jjigae',
        tags: ['spicy', 'shareable'],
        serves: null,
      },
    ],
  },

  {
    slug: 'jeunju-specials',
    name: 'JeunJu Specials',
    nameKo: '전주 스페셜 메뉴',
    blurb: 'Larger plates meant for a table to share, and the dishes the kitchen is proudest of.',
    items: [
      {
        slug: 'gul-bossam',
        name: 'Roasted Pork Belly with Oysters',
        nameKo: '굴보쌈',
        romanized: 'Gul-bossam',
        price: 37.99,
        description:
          'Served with fresh raw oysters, peppers, garlic, radish, cabbage and dipping sauce.',
        image: 'gul-bossam',
        tags: ['shareable', 'seafood'],
        serves: null,
      },
      {
        slug: 'kimchi-jeyuk',
        name: 'Stir-Fried Pork with Kimchi',
        nameKo: '김치제육볶음',
        romanized: 'Kimchi-jeyuk-bokkeum',
        price: 27.99,
        description: 'Served with a side of tofu.',
        image: 'kimchi-jeyuk',
        tags: ['spicy', 'shareable'],
        serves: null,
      },
      {
        slug: 'spicy-braised-pork-back-bone',
        name: 'Spicy Braised Pork Back Bone',
        nameKo: '매운등뼈찜',
        romanized: 'Maeun-deungppyeo-jjim',
        price: 27.99,
        description: null,
        image: 'maeun-deungppyeo',
        tags: ['spicy', 'shareable', 'hearty'],
        serves: null,
      },
      {
        slug: 'spicy-marinated-pork-belly',
        name: 'Spicy Marinated Pork Belly',
        nameKo: '양념대패삼겹구이',
        romanized: 'Yangnyeom-daepae-samgyeop-gui',
        price: 27.99,
        description: 'Thin-sliced and stir-fried.',
        image: 'daepae-samgyeop',
        tags: ['spicy', 'shareable'],
        serves: null,
      },
      {
        slug: 'pork-belly-octopus-bulgogi',
        name: 'Pork Belly & Octopus Bulgogi',
        nameKo: '쭈삼불고기',
        romanized: 'Jjusam-bulgogi',
        price: 27.99,
        description: null,
        image: 'jjusam-bulgogi',
        tags: ['spicy', 'shareable', 'seafood'],
        serves: null,
      },
      {
        slug: 'grilled-beef-tripe',
        name: 'Grilled Beef Tripe',
        nameKo: '소막창구이',
        romanized: 'So-makchang-gui',
        price: 29.99,
        description: null,
        image: 'makchang',
        tags: ['shareable'],
        serves: null,
      },
      {
        slug: 'oyster-pancake',
        name: 'Oyster Pancake',
        nameKo: '굴전',
        romanized: 'Gul-jeon',
        price: 21.99,
        description: null,
        image: 'gul-jeon',
        tags: ['seafood'],
        serves: null,
      },
      {
        slug: 'braised-chicken-feet',
        name: 'Braised Chicken Feet',
        nameKo: '뼈있는닭발',
        romanized: 'Ppyeo-inneun-dakbal',
        price: null,
        description: 'On the bone.',
        image: 'dakbal',
        tags: ['spicy'],
        serves: null,
      },
      {
        slug: 'korean-hotpot',
        name: 'Korean Hotpot',
        nameKo: '전골',
        romanized: 'Jeongol',
        price: null,
        description: 'Choice of main ingredient.',
        image: 'jeongol',
        tags: ['shareable'],
        serves: 'Serves 3–4',
        internalNote:
          'Menu-World lists a possibly-related "Gamja Jeongol" at $42.00 for three. Not confirmed as the same item — check the current menu (§3).',
      },
      {
        slug: 'sour-kimchi-hotpot',
        name: 'Sour Kimchi Hotpot',
        nameKo: '묵은지전골',
        romanized: 'Mugeunji-jeongol',
        price: null,
        description: 'Choice of main ingredient.',
        image: 'mugeunji-jeongol',
        tags: ['spicy', 'shareable'],
        serves: 'Serves 3–4',
      },
    ],
  },

  {
    slug: 'noodles',
    name: 'Noodles',
    nameKo: '국수류',
    blurb: 'Made by hand. Along with the gamjatang, this is what the reviews keep returning to.',
    items: [
      {
        slug: 'kalguksu',
        name: 'Knife-Cut Noodle Soup',
        nameKo: '칼국수',
        romanized: 'Kalguksu',
        price: null,
        description:
          'Noodles rolled and cut by hand, in broth. Named in more review sources than any other dish on the menu.',
        image: 'kalguksu',
        tags: ['signature'],
        serves: null,
      },
      {
        slug: 'sujebi',
        name: 'Hand-Torn Noodle Soup',
        nameKo: '수제비',
        romanized: 'Sujebi',
        price: null,
        description: 'Dough torn by hand into the broth, piece by piece. Choice of main ingredient.',
        image: 'sujebi',
        tags: ['signature'],
        serves: null,
      },
      {
        slug: 'jjolmyeon',
        name: 'Spicy Chewy Noodles',
        nameKo: '쫄면',
        romanized: 'Jjolmyeon',
        price: 14.99,
        description: null,
        image: 'jjolmyeon',
        tags: ['spicy'],
        serves: null,
      },
    ],
  },

  {
    slug: 'appetizers',
    name: 'To Start',
    nameKo: '곁들임 메뉴',
    blurb: 'Pancakes and dumplings for the middle of the table.',
    items: [
      {
        slug: 'seafood-scallion-pancake',
        name: 'Seafood Scallion Pancake',
        nameKo: '해물파전',
        romanized: 'Haemul-pajeon',
        price: 17.99,
        description: null,
        image: 'haemul-pajeon',
        tags: ['seafood', 'shareable'],
        serves: null,
      },
      {
        slug: 'kimchi-pancake',
        name: 'Kimchi Pancake',
        nameKo: '김치전',
        romanized: 'Kimchi-jeon',
        price: 15.99,
        description: null,
        image: 'kimchi-jeon',
        tags: ['spicy', 'shareable', 'hearty'],
        serves: null,
      },
      {
        slug: 'steamed-dumplings',
        name: 'Steamed Dumplings',
        nameKo: '찐만두',
        romanized: 'Jjin-mandu',
        price: 13.99,
        description: 'Pork and vegetable. Eight pieces.',
        image: 'jjin-mandu',
        tags: ['shareable'],
        serves: null,
      },
      {
        slug: 'fried-dumplings',
        name: 'Fried Dumplings',
        nameKo: '군만두',
        romanized: 'Gun-mandu',
        price: 12.99,
        description: 'Pork and vegetable. Eight pieces.',
        image: 'gun-mandu',
        tags: ['shareable'],
        serves: null,
      },
      {
        slug: 'egg-omelet',
        name: 'Korean Egg Omelet',
        nameKo: '계란말이',
        romanized: 'Gyeran-mari',
        price: null,
        description: null,
        image: 'gyeran-mari',
        tags: ['shareable'],
        serves: null,
      },
    ],
  },

  {
    slug: 'drinks',
    name: 'Drinks',
    nameKo: '음료',
    blurb: 'Beer is served. Ask about what is open today.',
    items: (
      [
        ['coke', 'Coke'],
        ['sprite', 'Sprite'],
        ['sunkist', 'Sunkist'],
        ['bottled-water', 'Bottled Water'],
        ['brisk-iced-tea', 'Brisk Iced Tea'],
      ] as const
    ).map(
      ([slug, name]): MenuItem => ({
        slug,
        name,
        nameKo: null,
        romanized: null,
        price: 2.0,
        description: null,
        image: null,
        tags: [],
        serves: null,
      }),
    ),
  },

  {
    slug: 'extras',
    name: 'Extras',
    nameKo: '추가메뉴',
    blurb: 'Banchan refills are complimentary — just ask.',
    items: [
      {
        slug: 'white-rice',
        name: 'White Rice',
        nameKo: '공기밥',
        romanized: 'Gongi-bap',
        price: 2.0,
        description: 'One bowl, steamed.',
        image: null,
        tags: [],
        serves: null,
      },
    ],
  },
];

/**
 * §3 recorded these on secondary aggregators only. They may be older, seasonal or
 * off-menu, so they are listed as "ask us" rather than presented as the standing menu.
 */
export const unconfirmedItems = [
  'Fishcake Sujebi',
  'Anchovy Sujebi',
  'Soft Tofu Kalguksu',
  'Sesame Kalguksu',
  'Bibim Guksu',
  'Tteokbokki',
  'Bossam',
];

export const allItems: MenuItem[] = menu.flatMap((c) => c.items);

export const signatureItems: MenuItem[] = allItems.filter((i) => i.tags.includes('signature'));

export function findItem(slug: string): { item: MenuItem; category: MenuCategory } | null {
  for (const category of menu) {
    const item = category.items.find((i) => i.slug === slug);
    if (item) return { item, category };
  }
  return null;
}

/** Lowest listed price on the menu, used for the "from $X" line. Ignores drinks/extras. */
export const priceFloor = Math.min(
  ...menu
    .filter((c) => !['drinks', 'extras'].includes(c.slug))
    .flatMap((c) => c.items)
    .map((i) => i.price)
    .filter((p): p is number => p !== null),
);
