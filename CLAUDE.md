@AGENTS.md

# ByteSpace

Pixel-faithful static recreation of a Figma course-marketplace design (9 screens).
Next.js 16 App Router under `src/`, React 19, TypeScript, Tailwind CSS v4.

## Commands

```bash
npm run lint                 # eslint
npm run build                # must stay clean
npm run start -- -p 3111     # local preview used by the QA harness
```

All 9 routes are statically prerendered. Route heights are part of the spec and must not
change: `/` 6377, `/search` 3853, `/course` 2717, `/course/lessons` 2883,
`/course/reviews` 3449, `/creator` 2136, `/login` 1024, `/register` 1024, 404 1485 (at
1440px wide). Check them after any layout change:

```bash
node .opencode/qa/shoot.js '[["/","home",1440,1024,true],["/search","search",1440,1024,true],["/course","course",1440,1024,true],["/course/lessons","lessons",1440,1024,true],["/course/reviews","reviews",1440,1024,true],["/creator","creator",1440,1024,true],["/login","login",1440,1024,true],["/register","register",1440,1024,true],["/404","notfound",1440,1024,true]]'
python3 .opencode/qa/score.py     # per-route mean abs pixel diff vs .figma-ref/
```

`.opencode/` and `.figma-ref/` are gitignored local tooling. **`shoot.js` deliberately walks
the page first** — lazy-loaded `next/image`s must finish before the screenshot, and it forces
`scrollY` back to 0 or the sticky header is captured in its stuck state.

## Non-obvious rules

- **`cn()` in `src/lib/cn.ts` is plain concatenation — there is no `tailwind-merge`.** A later
  conflicting class does *not* win. Emit exactly one of any conflicting utility per element.
- **Figma `strokeAlign: INSIDE` strokes do not consume layout space.** To match a stroked
  box in CSS, use `border` **and** reduce padding by 1px (`p-[40px]` → `p-[39px]`).
- **Figma rounds line-height to whole pixels:** `round(fontSize × ratio)` (72→86, 44→53,
  36→43, 18/160%→29, 16/160%→26, …). Always use a px `leading-[…]`, never a percentage —
  `leading-[160%]` will drift.
- **`right-0` inside `Container` is x=1440, not 1320** — absolute positioning resolves against
  the padding box, and `Container` has 120px padding at `lg`.
- **Fixed-px grid widths need `min-[1440px]:`, not `lg:`** — `lg:` applies at 1024px where a
  1200px-wide grid inside a 1200px container would overflow.
- **No `vh`, `h-screen` or `min-h-screen` anywhere.** Section heights are explicit px so
  screenshots are deterministic; don't introduce viewport-relative units.
- **Don't put `<Header />` back inside a hero.** Every blue hero is
  `relative isolate overflow-hidden` — an `isolate` stacking context would trap the fixed
  header and later siblings could paint over it. `Header` renders only the `fixed` bar at page
  root; the hero renders `<HeaderSlot />` (a 120px spacer) to keep the flow height.
- **The header's stuck state must not apply at `scrollY === 0`** (that is what the
  screenshots capture). It toggles at `window.scrollY > 8`.

## Responsive

The Figma file only defines the 1440px layout, so everything below 1440 is derived.
**Nothing may change the 1440px rendering** — every responsive rule is expressed with a
variant that either does not match at 1440 (`max-md:`, `max-[1099px]:`) or resolves to the
same value (`min-[1440px]:`). Re-run the pixel score after any responsive edit.

```bash
# no horizontal overflow + no clipped text, 9 routes x 12 widths (320..1440)
node .opencode/qa/responsive.js '[["/","home"],["/search","search"],["/course","course"],["/course/lessons","lessons"],["/course/reviews","reviews"],["/creator","creator"],["/login","login"],["/register","register"],["/404","notfound"]]' '[320,360,390,414,480,640,768,834,1024,1100,1280,1440]'
```

Rules that came out of that audit:

- **Design-fixed widths use `min-[1440px]:`, not `lg:`/`xl:`.** `lg:` fires at 1024px where a
  1198/1200/1283px-wide block inside the padded container is clipped by the hero's
  `overflow-hidden`. The footer, the course body/aside, the creator hero and both growth
  rows were all switched. Below 1440 those blocks fall back to `w-full`.
- **The course enrolment aside only appears at `min-[1440px]:`.** Between 1024 and 1439 the
  725px body + 412px aside do not fit side by side; the inline `<EnrollCard />` (below the
  content) covers that range instead.
- **Absolute collages stack below `md`** — the growth photos/badges/ornaments are
  `max-md:static` (plus `order-first` on the photo) inside a `max-md:flex-col` wrapper, and
  the decorative `Ornament`s go `max-md:hidden`.
- **Right-side hero ornaments are anchored with `right`, not `left`** (`right: -161` etc.) so
  they bleed off the right edge at every width. The values are computed as
  `1440 - (left + width)` and are byte-identical at 1440.
- **Sections that wrap must use `min-h-`, not `h-`** (`Partners` was `h-[202px]` and its
  logos spilled 41px past the grey band at 360px).
- **Use `hidden` + an inverse variant for breakpoint-gated decor.** `flex … max-[1099px]:hidden`
  is backwards — it shows the element *above* the breakpoint. Correct is `hidden … max-[1099px]:flex`.
- **The header has a mobile menu below `md`** (`MenuIcon`/`CloseIcon`, panel `#mobile-menu`).
  The desktop nav is `hidden md:flex`, so without it 320–767px has no navigation at all.
  It closes on link click, `Escape`, and when the viewport crosses 768px.

## Components worth knowing

- `src/components/site.tsx` — `Container`, `Logo` (`dark`, `wordmark`), `Header`
  (sticky + mobile menu), `HeaderSlot`, `Footer`, `Button`. It is a `"use client"` file
  because of the scroll listener.
- `CourseShell` (`course.tsx`) gives about/lessons/reviews an identical banner, tab row,
  enrolment card and footer; pass `bodyWidthClass` (`min-[1440px]:w-[725px]` default,
  `min-[1440px]:w-[723px]` for lessons/reviews) and `bodyPbClass`.
- `CourseCard` has two variants: **tight** (home grid, search, creator) and **loose**
  (auth aside, home growth section). The meta-pill row and the badge overlay are
  **intentionally not rendered** — they do not appear in the design reference.
- `AuthShell` renders `<Logo wordmark={false} />`: the wordmark's Figma text node has an empty
  fill, so it is invisible in the design.
- `data/site.ts` is the single source for images, avatars, courses and nav/footer links.

## Artwork

- Ornament files are pre-tinted: `<ref>-lime.png` / `<ref>-white.png`; the `<Ornament>`
  `color` prop derives the filename. Default is `white`.
- The white instances of `e3b55902` are horizontally flipped — the flip is baked into
  `e3b55902_387x387-white.png`.
- The hero's lime ring (`Ellipse 7`) is a stroke, not a fill: `border-[320px] border-secondary-500`
  on a `rounded-full` box, clipped by the hero's `overflow-hidden`.
- Figma mask groups tint artwork with a SOLID-fill rectangle at `blendMode: HARD_LIGHT`
  (`#d4fb20` lime, `#f5f5f6` grey).

## Known limitations (don't "fix")

- Headings use Google's Poppins; the design uses `Poppins-SemiBold`. Glyphs differ slightly
  (~1% wider, digits ~4% taller). There is no local fix.
- Reference screenshots in `.figma-ref/` are 720px wide upscaled ×2, so text has an
  irreducible blur floor. Tiny text can vanish above the diff threshold in the reference —
  that is a reference artifact, not a bug in the build.
- A handful of one-off `letterSpacing`/`wordSpacing` corrections exist on individual
  strings (404 `h1`, growth `&`, course `h1`). Apply more only when a measured, single-cause
  drift is visible, and re-score to confirm — per-string tracking hacks are whack-a-mole.

## Git workflow

All work goes on the **`saiful`** branch, then ships to `main` via a PR that is merged
immediately. Do this for every change:

```bash
# 1. make sure we're on saiful and it's current with main
git checkout saiful && git pull

# 2. commit your work
git add -A && git commit -m "<message>"

# 3. push
git push

# 4. open the PR (saiful -> main)
gh pr create --base main --head saiful --title "<title>" --body "<what/why>"

# 5. merge it
gh pr merge --merge

# 6. resync saiful to main so the next change starts clean
git checkout main && git pull
git branch -f saiful main && git push origin saiful
git checkout saiful
```

Never commit directly to `main`.

## Housekeeping

- `AGENTS.md` is rewritten by `next dev`; keep it committed with your changes.
- Never write secrets into the repo. The Figma PAT belongs in the shell environment and is
  referenced as `{env:FIGMA_API_KEY}` in `opencode.json`.
