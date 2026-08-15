/**
 * Generates PHOTO-NEEDS.txt — the shot list for replacing every placeholder photograph
 * on the site with JeunJu's own.
 *
 * Generated rather than hand-written so it cannot drift from the actual menu: add a dish
 * to src/content/menu.ts, re-run this, and the shot list updates.
 *
 * Usage: node scripts/photo-needs.mjs
 */
import { writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

/** Reads the menu without a TS toolchain: parse the fields we need straight from source. */
async function readMenu() {
  const src = await readFile(path.join(ROOT, 'src', 'content', 'menu.ts'), 'utf8');
  const items = [];
  const blocks = src.split(/\n\s*\{\s*\n\s*slug:/).slice(1);

  for (const block of blocks) {
    const pick = (key) => block.match(new RegExp(`${key}:\\s*'([^']*)'`))?.[1] ?? null;
    const slug = block.match(/^\s*'([^']+)'/)?.[1];
    if (!slug) continue;
    items.push({
      slug,
      name: pick('name'),
      nameKo: pick('nameKo'),
      image: pick('image'),
      signature: /tags:\s*\[[^\]]*'signature'/.test(block),
    });
  }
  return items;
}

const ATMOSPHERE = [
  ['The awning', 'The exterior awning with the founder\'s photograph and the painted year. This is the most distinctive branding the restaurant has and there is currently no usable photograph of it. Shoot it straight-on in daylight and again at dusk with the sign lit.'],
  ['Sophia Cho', 'A portrait of the owner, in the dining room or the kitchen. Natural light, unposed. The story page is built around her and currently runs without a photograph of her.'],
  ['Eunhae Bae', 'Any archival photograph of the founder — a print of the awning photo, or a family photo from the early years. A scan is fine.'],
  ['The dining room', 'Wide shot of the room with tables set. Shoot when it is full, or at least half-set, not empty.'],
  ['A full table', 'Overhead shot of one complete meal: a main, the rice, and every banchan that comes with it, on the real table. THIS IS THE MOST IMPORTANT SHOT — the whole homepage is built around the set table and the free-refill promise.'],
  ['Banchan close-up', 'The small dishes alone, overhead, tightly framed. Several variations if the banchan rotates.'],
  ['Hands making noodles', 'Kalguksu being rolled and cut, or sujebi being torn into the pot. The hand-work is what the reviews single out and there is no photograph of it anywhere.'],
  ['The kitchen', 'A working shot — steam, pots on the range. Does not need to be tidy.'],
  ['The street', '150th Street outside, showing the Food Alley context.'],
];

async function main() {
  const items = await readMenu();
  const withPhoto = items.filter((i) => i.image);
  const withoutPhoto = items.filter((i) => !i.image);

  const line = (n = 78) => '-'.repeat(n);
  const out = [];

  out.push('PHOTO SHOT LIST — JeunJu Korean Restaurant website');
  out.push(`Generated ${new Date().toISOString().slice(0, 10)} by scripts/photo-needs.mjs`);
  out.push(line('='.length === 1 ? 78 : 78).replace(/-/g, '='));
  out.push('');
  out.push('WHY THIS FILE EXISTS');
  out.push('');
  out.push('The research material this site was built from contained no photography at all —');
  out.push('no logo, no food photos, no interior shots. Every photograph currently on the');
  out.push('site is an openly-licensed stand-in from Wikimedia Commons showing the *type* of');
  out.push('dish, not JeunJu\'s own food. They are credited at /credits.');
  out.push('');
  out.push('They are good enough to launch behind, and wrong to keep. Replace them with the');
  out.push('shots below and the site becomes genuinely the restaurant\'s own.');
  out.push('');
  out.push('HOW TO REPLACE A PHOTO');
  out.push('');
  out.push('  1. Name the file after the id in the "id" column below, e.g. gamjatang.jpg');
  out.push('  2. Drop it in .media-cache/replacements/');
  out.push('  3. Run: node scripts/harvest-media.mjs');
  out.push('     (local replacements are picked up ahead of anything downloaded)');
  out.push('  4. Delete the corresponding entry from /credits once nothing sourced remains.');
  out.push('');
  out.push('SHOOTING NOTES');
  out.push('');
  out.push('  · Overhead (flat-lay) for anything in a bowl. These are soups and stews — a');
  out.push('    three-quarter angle hides the contents, which is the whole point of the dish.');
  out.push('  · Natural light, no flash, no coloured gels. The site sits on a true obsidian');
  out.push('    ground with a champagne-gold accent, so warm-toned photographs glow on it and');
  out.push('    anything shot cool or grey goes flat.');
  out.push('  · Dark, uncluttered backgrounds photograph best here — the design lets food sit');
  out.push('    in a pool of light, and a bright busy background fights that.');
  out.push('  · Shoot on the restaurant\'s real tableware and real tables. Do not style with');
  out.push('    props the restaurant does not own.');
  out.push('  · Landscape or square. Portrait crops get cropped anyway.');
  out.push('  · Minimum 1600px on the long edge. Straight out of a recent phone is fine.');
  out.push('  · Include the banchan wherever it comes with the dish. It is the selling point.');
  out.push('');
  out.push('');
  out.push('PRIORITY 1 — ATMOSPHERE AND PEOPLE');
  out.push(line());
  out.push('None of these exist in any form. They matter more than the dish photos, because');
  out.push('a stand-in dish photo is merely generic — a missing owner portrait is a hole.');
  out.push('');
  for (const [name, note] of ATMOSPHERE) {
    out.push(`  [ ] ${name}`);
    for (const chunk of note.match(/.{1,72}(\s|$)/g) ?? []) out.push(`        ${chunk.trim()}`);
    out.push('');
  }

  out.push('');
  out.push('PRIORITY 2 — SIGNATURE DISHES');
  out.push(line());
  out.push('The dishes review sources name most often. Shoot these first and shoot them well;');
  out.push('they carry the homepage.');
  out.push('');
  for (const item of withPhoto.filter((i) => i.signature)) {
    out.push(`  [ ] ${item.name}  ${item.nameKo ?? ''}`.trimEnd());
    out.push(`        id: ${item.image}`);
  }

  out.push('');
  out.push('');
  out.push('PRIORITY 3 — REMAINING MENU');
  out.push(line());
  out.push(`${withPhoto.filter((i) => !i.signature).length} dishes currently on a stand-in photograph.`);
  out.push('');
  for (const item of withPhoto.filter((i) => !i.signature)) {
    out.push(`  [ ] ${item.name}  ${item.nameKo ?? ''}`.trimEnd());
    out.push(`        id: ${item.image}`);
  }

  if (withoutPhoto.length) {
    out.push('');
    out.push('');
    out.push('NO PHOTOGRAPH AT ALL');
    out.push(line());
    out.push('These render as a typographic card. A photo would be an upgrade, not a fix.');
    out.push('');
    for (const item of withoutPhoto) {
      out.push(`  [ ] ${item.name}  ${item.nameKo ?? ''}`.trimEnd());
    }
  }

  out.push('');
  out.push('');
  out.push('SEPARATELY — THINGS TO CONFIRM WITH SOPHIA CHO');
  out.push(line());
  out.push('These are unresolved in the research and the site currently works around each');
  out.push('one. Each is a one-question fix.');
  out.push('');
  out.push('  [ ] OPENING HOURS. Google says 7:00 AM-10:00 PM, DoorDash says 10:00 AM-9:40 PM,');
  out.push('      an older Yelp cache says 10:00 AM-10:00 PM. The site currently shows the');
  out.push('      Google range next to a "call to confirm" note, and publishes no hours to');
  out.push('      search engines at all. Fix in src/content/business.ts -> hours.');
  out.push('');
  out.push('  [ ] FOUNDING YEAR. The awning says 1985; Facebook and the listings say 1999.');
  out.push('      The story page currently tells this as a story rather than picking one.');
  out.push('      Ask what 1985 refers to. Fix in src/content/business.ts -> founded.');
  out.push('');
  out.push('  [ ] DOMAIN. Three surfaced: jeunjukoreanfood.com (live, blocked to crawlers),');
  out.push('      jeunjurestaurant.com (parked/for sale), jeunjuauthentichome.com (an auto-');
  out.push('      generated Google mirror). Ask which she actually owns before launch.');
  out.push('      Fix in src/content/business.ts -> SITE_URL.');
  out.push('');
  out.push('  [ ] NAME SPELLING. "Jeunju", "JeunJu" and "Jeun Ju" are all in use. The site');
  out.push('      standardises on "JeunJu Korean Restaurant". Confirm she is happy with it.');
  out.push('');
  out.push('  [ ] MISSING PRICES. 8 dishes have no published price and show "Ask us":');
  out.push('      grilled mackerel, grilled croaker, chicken feet, both hotpots, kalguksu,');
  out.push('      sujebi, egg omelet. Kalguksu and sujebi are the two most-praised dishes on');
  out.push('      the menu and should not be launched priceless.');
  out.push('');
  out.push('  [ ] MODIFIERS. Spice levels, protein swaps and portion upcharges could not be');
  out.push('      retrieved — delivery apps hide them until checkout. Pull from the live');
  out.push('      ordering flow.');
  out.push('');
  out.push('  [ ] OFF-MENU / SEASONAL ITEMS. The site lists these under "Ask about" on the');
  out.push('      menu page: fishcake sujebi, anchovy sujebi, soft tofu kalguksu, sesame');
  out.push('      kalguksu, bibim guksu, tteokbokki, bossam. Confirm which are current.');
  out.push('');
  out.push('  [ ] EMAIL ADDRESS. None was found anywhere. The site has no contact form and');
  out.push('      points everything at the phone number as a result.');
  out.push('');
  out.push('  [ ] DOORDASH / UBER EATS LINKS. Presence is confirmed but no direct storefront');
  out.push('      URLs were captured, so the site names the apps without linking out.');
  out.push('');
  out.push('  [ ] HEALTH GRADE. Deliberately not published — no official NYC DOHMH grade was');
  out.push('      confirmed. Do not add one without the Health Department\'s own lookup.');
  out.push('');

  await writeFile(path.join(ROOT, 'PHOTO-NEEDS.txt'), out.join('\n'));
  console.log(
    `PHOTO-NEEDS.txt written — ${ATMOSPHERE.length} atmosphere shots, ${withPhoto.length} dishes.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
