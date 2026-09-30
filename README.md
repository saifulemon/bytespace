# ByteSpace

A pixel-faithful, statically generated recreation of the **ByteSpace** course-marketplace
design — nine screens built with the Next.js App Router, TypeScript and Tailwind CSS v4.

Every route is laid out to match the source Figma frames at a 1440px canvas (120px margins,
12-column grid), including the decorative artwork, gradients and hairline grid backdrops.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) — `app/` router under `src/` |
| UI | React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 via `@theme` tokens in `src/app/globals.css` |
| Lint | ESLint 9 + `eslint-config-next` |

## Screens

| Route | File |
|---|---|
| `/` | `src/app/page.tsx` |
| `/search` | `src/app/search/page.tsx` |
| `/course` | `src/app/course/page.tsx` |
| `/course/lessons` | `src/app/course/lessons/page.tsx` |
| `/course/reviews` | `src/app/course/reviews/page.tsx` |
| `/creator` | `src/app/creator/page.tsx` |
| `/login` | `src/app/login/page.tsx` |
| `/register` | `src/app/register/page.tsx` |
| 404 | `src/app/not-found.tsx` |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
npm run lint
```

All routes are fully static (`○ prerendered as static content`) — no database, API routes or
server actions.

## Project structure

```
src/
  app/                 routes + RootLayout + design tokens (globals.css)
  components/
    site.tsx           Container, Logo, Header, HeaderSlot, Footer, Button
    course.tsx         CourseShell (shared about/lessons/reviews layout), EnrollCard
    CourseCard.tsx     course thumbnail card (tight + loose variants)
    auth.tsx           AuthShell, Field, AuthButton, SocialRow (login/register)
    decor.tsx          GridBackdrop, GlowBlob, Ornament, Logoipsum
    forms.tsx          HeroSearchBar, NewsletterForm
    icons.tsx          all inline SVG icons
  data/site.ts         image map, avatars, courses, nav + footer links
  lib/cn.ts            class-name joiner
public/
  fonts/               Satoshi + Clash Display (self-hosted woff2)
  images/              Figma-exported artwork, thumbnails, avatars
```

## Design system

Tokens live in the `@theme` block of `src/app/globals.css` — change a token and the whole
site re-themes.

- **Colour** — `neutral-*` (greys), `primary-*` (electric blue `#003be2` / `#0445ff`),
  `secondary-*` (electric lime `#d4fb20` / `#cbfc01`), plus semantic `ink`, `body`, `muted`,
  `surface`, `hairline`.
- **Type** — headings `Poppins` SemiBold 120% line-height (`--font-heading`, loaded via
  `next/font/google`); body and labels `Satoshi` 160%/120% (`--font-body` / `--font-label`);
  logo `Clash Display` Bold (`--font-logo`). Satoshi and Clash Display are self-hosted from
  `public/fonts`.
- **Layout** — 1440px page container, 1200px content container, 120px margins, 40px gutters.
- **Radii** — card 24px, tile 16px, thumb 12px, pill 100px.

### Layout notes

- The site header is **fixed**: `Header` renders only a `fixed` bar at page root, and each
  blue hero renders `HeaderSlot` — a 120px spacer that preserves the layout the header used
  to occupy in flow. At the top of the page the bar is 120px and transparent; once you
  scroll it condenses to 80px with a frosted white background and dark text.
- Course pages share one shell (`CourseShell`) so the banner, tabs, enrolment card and
  footer stay identical across about/lessons/reviews.

## Assets

Images are exported from Figma with their node reference as the filename
(`public/images/<ref>_<size>.png`). Decorative ornaments ship pre-tinted as
`<name>-lime.png` / `<name>-white.png` and are picked by the `color` prop on `<Ornament>`.

## Environment

No environment variables are required to build or run the site.

`FIGMA_API_KEY` is only used by the optional Figma MCP configured in `opencode.json`
(`{env:FIGMA_API_KEY}`); never commit the key itself.

## QA tooling (local)

`.figma-ref/` holds the reference screenshots exported from Figma, and `.opencode/qa/`
holds the harness used to compare them against the build:

```bash
npm run build && npm run start -- -p 3111
node .opencode/qa/shoot.js '[["/","home",1440,1024,true], ...]'
python3 .opencode/qa/score.py          # mean abs pixel diff per route
```

Both directories are gitignored — they are working artifacts, not part of the site.
