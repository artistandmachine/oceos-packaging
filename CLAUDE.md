@AGENTS.md

# Website Templates: project context

A modular one-page site for Studio A&M clients to pick a style for each section. Built for Bion. Prefers casual, brief replies with real opinions; no filler.

## How it works
- Each section has a list of styles in `sections/registry.ts` (id + display name; the first is the default). `sections/index.tsx` maps each id to its component, and `<Picked section="…" />` in `app/page.tsx` renders the chosen one (keyed by id, so a switch remounts fresh).
- Picks live in `lib/styles.tsx` (React context) and in the address as `?nav=…&hero=…`, so a link sent to a client opens their picks. The static HTML renders the defaults, then switches on load.
- **Nav:** the last link of every nav style is `components/StyleDropdown.tsx` ("Style", label in site.json `styles.navLabel`), listing the nav styles.
- **Hero:** `components/StylePicker.tsx` is a floating glass bar, bottom middle, draggable by its grip within the screen (position isn't saved), shown only while `#hero` is on screen. Text flips cream over dark bands via `lib/useBandTheme.ts`. Glass look is the `glass` utility in `app/theme.css`.
- Every hero style must render a `<section id="hero">` (the picker watches it).

## Adding a style
1. Build it under `sections/<section>/<style>/` (an `index.tsx` exporting a no-props component that reads its copy from `@/lib/site`).
2. Add `{ id, name }` to `sections/registry.ts`.
3. Map the id to the component in `sections/index.tsx`.
New sections: add a key to the registry and the component map, a `<Picked section="…" />` in page.tsx, and a picker.

## Styles so far
- **Nav / OCEOS** (`sections/nav/oceos/Header.tsx`): from oceos-packaging-v2. Two fixed corners (OCEOS mark top left; Book a call, Menu, Style top right), full-screen menu overlay, recolours over dark bands. Book a call fades during the hero flight (`lib/heroChrome.ts`) and Menu lifts into its place.
- **Hero / OCEOS Flight** and **OCEOS Drift** (`sections/hero/oceos/Hero.tsx`): from oceos-packaging-v2. Pinned 370vh climb from a drone ocean video up through clouds to a cream veil. Drift swaps the video for a still drone photo that drifts toward the cursor (`hero.pan`; from the oceos `hero-genai` branch). Phones / reduced motion: still image, no pin. All numbers in `lib/tune.ts` (`tune.hero`).
- The OCEOS styles share the OCEOS preloader (`components/Preloader.tsx`, holds scroll until hero media loads via `lib/loaded.ts`), contact drawer, theme (cream/navy/forest/mist, Oranienbaum + Ballet + Montserrat) and copy. For now theme.css is OCEOS-only; per-style theming will be needed once a style with a different look lands.

## Where to change what
Bion vibe-codes (no Figma step), so every knob lives in one of three files. Keep it that way.

| Change | File |
|---|---|
| Words, links, image/video paths, picker labels | `data/site.json` |
| Colours, band modes, fonts, type sizes, glass | `app/theme.css` |
| Motion: hero flight ranges, drift, preloader timing, easing | `lib/tune.ts` |

Font faces load in `app/layout.tsx`. `app/globals.css` is plumbing. Never write the literal at-rule name "@theme" inside a CSS comment: Tailwind IntelliSense's preprocessor matches it and flags the file.

## Stack, repo, deploy
Next.js 16 static export, Tailwind v4 (CSS-only config), Framer Motion 11, Lenis, React 19. `npm run dev` on port 3002.
GitHub Pages project site under `/website-templates`: the deploy workflow sets `NEXT_PUBLIC_BASE_PATH`, `next.config.js` uses it as `basePath`, and `lib/site.ts` prefixes `/images|/videos|/brand` paths. Always import copy from `@/lib/site`, never the JSON. The site is set to noindex.
