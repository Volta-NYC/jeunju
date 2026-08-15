# JeunJu Korean Restaurant

A replacement website for JeunJu Korean Restaurant (전주식당), 40-11 150th St, Flushing NY.
Next.js · React · TypeScript · Tailwind.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm run typecheck
```

## Where the content lives

Everything customer-facing comes from `src/content/`. There is no CMS and no runtime data
fetching — the whole site builds to static HTML.

| File | Holds |
|---|---|
| `business.ts` | Identity, address, phone, hours, attributes, ratings, socials |
| `menu.ts` | 42 dishes across 7 categories, with Korean names and prices |
| `story.ts` | Story chapters, testimonials, press mentions |
| `types.ts` | The schema, including the `Confidence` marker described below |
| `media-manifest.json` | Generated. Do not edit by hand — see below |

To change a price, edit `menu.ts`. To change the hours, edit `business.ts`. Nothing else
needs touching.

## The honesty rules this codebase follows

The site was built from a research report (`raw messy data/info.md`) that compiled public
listings, press and reviews. That report was explicit about what it could and could not
establish, and the code preserves the distinction rather than flattening it.

**Nothing is invented.** Where the research found no price, `price` is `null` and the menu
prints "Ask us". Where it found no email address, there is no email address and no contact
form — everything points at the phone number.

**Conflicts are surfaced, not resolved silently.** Three sources give three different sets
of opening hours, so the site shows the best-corroborated range beside a "call to confirm"
link, and publishes *no* `openingHours` in its structured data. Two sources give two
different founding years, so the story page tells that as a story instead of picking one.
These carry `confidence: 'conflicting'` in `business.ts` with a note on what to ask.

**Review text is paraphrased, never quoted,** and always attributed to its platform.

`PHOTO-NEEDS.txt` lists every one of these open questions at the bottom, as a checklist to
take to the owner.

## Media pipeline

The source material contained **no images at all** — no logo, no food photography, nothing.
So there was nothing of the restaurant's to download and localise.

`scripts/harvest-media.mjs` instead pulls openly-licensed photographs of the *dishes* from
Wikimedia Commons, records full attribution, deduplicates shared source files, and encodes
everything to local AVIF + WebP at three widths with a blurred placeholder. Output goes to
`public/media/` and `src/content/media-manifest.json`.

```bash
npm run media          # re-harvest and re-encode
npm run photo-needs    # regenerate PHOTO-NEEDS.txt from the current menu
```

Nothing on the built site requests anything from an external host. Attribution is at
`/credits`, which is required — several photographs are CC BY-SA.

**These are placeholders.** They show the right dish, not this restaurant's dish.
`PHOTO-NEEDS.txt` is the shot list to replace them. To retire one:

```bash
cp gamjatang.jpg .media-cache/replacements/gamjatang.jpg
npm run media          # local files win over anything downloadable
```

The manifest then marks that asset `ownPhotography: true`, drops its attribution, and
`/credits` shrinks by one.

## Design system

Tokens live in `src/app/globals.css` as RGB triplets, mapped to Tailwind in
`tailwind.config.ts`.

The palette derives from **오방색 (obangsaek)**, the five Korean cardinal colours, but
disciplined down to the two that carry the whole site: **흑 as true obsidian** — the black
of 먹 ink and 흑칠 black lacquerware — and **황 as champagne gold**. 백 is the ivory the
type is set in. 청 celadon and 적 jujube survive in one place only: the footer seal.

One accent, one ground. A second competing accent is what makes a page look cheap, so the
gold does all the work and everything else is a tier of black.

Grounds run in **four tiers of depth** rather than two opposing surfaces:

| Token | Use |
|---|---|
| `obsidian-deep` | Beneath everything — footer, the press strip |
| `obsidian` | The page ground |
| `obsidian-raised` | Lifted sections, via `.on-raised` |
| `obsidian-elevated` | Cards and insets |

Adding `.on-raised` to a section lifts it one tier **without inverting anything** — the
whole site is one dark room, so the eye reads depth instead of alternating pages. Use the
semantic classes (`bg-bg`, `text-fg`, `text-fg-muted`, `border-edge`, `text-accent`) so a
component adapts to whatever tier it lands in; the literal names (`bg-obsidian`,
`text-ivory`, `bg-gold`) are for the few places that must not follow the tier.

Three component classes carry most of the polish:

- `.surface` — a top-lit gradient plus a hairline that is brighter at the top edge, so
  cards read as objects catching light rather than as holes cut in the black.
- `.dish` — the circular ceramic mask, with an inner rim highlight.
- `.grain` / `.vignette` / `.lit` — film grain so large black fills read as a material
  rather than dead pixels; a gradient that seals one tier into the next; and a faint
  bloom behind large display type.

Type: **Gowun Batang** sets display in Hangul and Latin with one voice, which is the brand
thesis — a Jeonju kitchen in Queens, reading in two scripts at once. IBM Plex Sans KR and
Plex Mono carry body copy and data in both scripts.

The layout grammar is the **한상 (hansang)**, the Korean set table: one large bowl among
many small round dishes. Hence circular masks (`.dish`) for anything at banchan scale
against rectangular frames for mains, and the homepage hero, which is a table seen from
above with the dishes settling into place on load.

A note on adding opacity modifiers: Tailwind only generates them for values in its
opacity scale (**multiples of 5**). `bg-obsidian/92` silently produces *no rule at all*
and the element renders transparent. Prefer `/90`, or an arbitrary value like
`bg-white/[0.07]`.

## Motion

The hero load sequence is pure CSS keyframes with staggered delays — no JavaScript.
Scroll reveals use `<Reveal>`, one `IntersectionObserver` per element, disconnected on
first intersection. `prefers-reduced-motion` is checked in JS before any observer is
created, so reduced-motion users have no animation scheduled at all, not merely suppressed.

Note for anyone editing the hero: the `settle` keyframes animate `transform`, so an element
using them cannot also be centred with a Tailwind `-translate-x-1/2` — the animation wins.
Position with percentages instead.

## Routes

`/` · `/menu` · `/story` · `/press` · `/visit` · `/credits`

All static. There is no booking route because no booking platform exists for this business;
reservations are taken by phone and the site says so.
