Phase 5: command palette, final polish, full QA audit, push to
GitHub. This is the shipping phase. After this, the site goes live.

Prerequisite: Phases 1-4.6 all passing. If any prior Playwright test
is red, STOP and fix first.

---

Task 1: Command palette (CMD+K).

Install cmdk: npm install cmdk

Create components/command-palette.tsx as a client component.

Trigger: CMD+K on macOS, CTRL+K on Windows/Linux. Works from any page.

UI:
- Modal centered on screen
- Backdrop: backdrop-blur-sm with rgba(5,5,5,0.8) overlay
- Container: --bg-elev background, 1px --border-strong, max-width
  560px, max-height 60vh
- Top: search input, no label, placeholder "Type a command or
  search...", mono font, no border, 16px padding
- Below input: 1px --border horizontal line
- Below line: scrollable list of command groups

Command groups and items:

WORK
- Go to ServiceCallTracker case study (navigates to /work/servicecalltracker)
- Go to BasisWeb case study (/work/basisweb)
- Go to Hammock case study (/work/hammock)
- Go to Operations Command Center case study (/work/operations-command)
- Go to Warpspeed Bounties case study (/work/warpspeed)
- Go to ACC Scraper case study (/work/acc-scraper)
- Go to Google Maps Scraper case study (/work/google-maps-scraper)

PAGES
- Home (/)
- For Agencies (/for-agencies)
- For Clients (/for-clients)

CONTACT
- Copy email address (copies ethan@basisweb.net to clipboard, shows
  toast "COPIED" for 2 seconds)
- Open Upwork profile (opens Upwork URL in new tab)
- Email directly (opens mailto:ethan@basisweb.net)

Behavior:
- CMD+K / CTRL+K toggles open/closed
- Escape closes
- Arrow up/down navigates items
- Enter executes selected item
- Typing filters items across all groups
- Clicking outside modal closes it
- Selected item: --signal left border (3px), --bg-elev (slightly
  lighter), --fg text
- Unselected items: --fg-muted text, hover brightens to --fg

Footer inside modal:
- 1px --border top line
- Mono small text showing key hints:
  "↑↓ navigate   ↵ select   esc close"

Animation:
- Modal fade-in: opacity 0 to 1 + scale 0.98 to 1, 180ms --ease-out
- Backdrop fade: opacity 0 to 1, 180ms
- prefers-reduced-motion: no scale, instant opacity swap

Mount: add <CommandPalette /> to root layout so it's available
everywhere.

Add visual hint in footer of site: small mono "⌘K" button or label
that opens the palette when clicked. Positions next to the Upwork
link in the footer. Hover: --signal color.

---

Task 2: OG image + favicon + metadata.

Create /app/opengraph-image.tsx using Next.js 14 ImageResponse API.

Design: 1200x630, --bg background, large display text centered:
"I build systems, not slide decks." with italic serif on "not slide
decks" in --signal color. Small mono text bottom-left: "ethanchacko.com".
Small mono text bottom-right: "PHX / FULL-STACK".

Create favicon.ico at multiple sizes:
- Design: "EC" monogram in Geist Sans 700, white on --bg, square with
  rounded corners at 4px radius
- Generate at 16x16, 32x32, 48x48, 180x180 (apple-touch-icon)

Update root layout metadata:
- title template: "%s | Ethan Chacko"
- default title: "Ethan Chacko, Full-Stack Developer"
- description: "Full-stack developer out of Phoenix. I ship software
  for agencies and businesses who need something built, not pitched."
- openGraph title, description, images, url, siteName
- twitter card: summary_large_image, title, description, images

Per-page metadata:
- /for-agencies: "For Agencies | Ethan Chacko" with description "A
  second pair of hands that ships under your brand."
- /for-clients: "For Brands | Ethan Chacko" with description "One
  developer. Full ownership. Systems that run after I'm gone."
- /work/[slug]: dynamic title "[Project Name] | Ethan Chacko" with
  project tagline as description

---

Task 3: 404 page.

Create app/not-found.tsx.

Design: match site aesthetic, not a generic Next.js error page.

Layout:
- Same layout wrapper as site (nav + footer)
- Centered content
- Section label: / 404
- Display text: "This route isn't wired."
- Subhead in --fg-muted: "Either the URL is off or I haven't shipped
  this yet. Head back home or hit me up if something's broken."
- Two ghost buttons: "GO HOME" (links /) and "EMAIL ME"
  (mailto:ethan@basisweb.net)

---

Task 4: Accessibility audit and fixes.

Run manual audit:
- Tab through every page. Every interactive element must be reachable
  and have a visible focus state (--signal 1px outline, 2px offset).
- Every image has alt text. Decorative thumbnails get alt="" not
  missing alt.
- Every button has an accessible name (aria-label where needed).
- Color contrast: --fg on --bg must be 7:1+, --fg-muted on --bg must
  be 4.5:1+. Test with axe DevTools or Lighthouse.
- prefers-reduced-motion respected on every animation in the app.
- Email reveal has aria-live="polite" for the COPIED toast.
- Command palette trap focus inside modal when open, return focus to
  trigger on close.
- Skip link at top of every page: "Skip to main content" linking to
  #main. Visually hidden until focused.

Fix every issue found.

---

Task 5: Performance audit.

Run Lighthouse on homepage, /for-agencies, /for-clients, and one
case study page. Target scores:
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

Common fixes if below target:
- Use next/image for all raster images (webp already, but needs
  next/image wrapper for lazy loading + responsive sizing)
- Preload Geist Sans + Geist Mono with next/font
- Ensure images have explicit width/height to prevent CLS
- Remove any render-blocking scripts
- Ensure OG image generates statically, not at request time

Report before/after scores for each page.

---

Task 6: Full cross-page QA audit.

Create tests/audit.spec.ts that runs a complete smoke test across
every route:

For each route in [/, /for-agencies, /for-clients, all 7
/work/[slug] routes, a deliberately bad slug to test 404]:

- Returns correct status code
- Has title tag
- Has meta description
- Has OG image reference
- Has no console errors during load
- Has no failed network requests (except deliberate 404 test)
- Nav renders with HUD chip
- Footer renders with email + Upwork link
- Skip link present

Cross-page checks:
- CMD+K opens command palette from every route
- Command palette "Home" command navigates correctly from every route
- Email reveal on homepage copies to clipboard correctly
- All 7 work cards on homepage link to correct case study slugs
- All 4 LIVE work cards have external link buttons that open in new tab

Viewport tests at 390x844 (mobile), 768x1024 (tablet), 1440x900 (desktop):
- HUD chip collapses correctly at mobile
- Work grid reflows (3 col -> 2 col -> 1 col)
- Process timeline switches horizontal to vertical at mobile breakpoint
- Stack architecture stacks columns at mobile breakpoint
- Build showcase tabs remain tappable at mobile

---

Task 7: GitHub push.

Prerequisites before pushing:
- All Playwright tests passing (Phase 2, 3, 4, 4.5, 4.6, Phase 5 audit)
- Lighthouse scores meet targets
- Accessibility audit clean
- No console errors on any page
- README.md written (see below)

Create README.md at repo root:

---
# ethanchacko.com

Personal portfolio for Ethan Chacko. Full-stack developer based in
Phoenix, AZ.

## Stack

Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion,
cmdk, Playwright. Deployed on Vercel.

## Development

    npm install
    npm run dev

Opens at http://localhost:3000.

## Testing

    npm run test           # Playwright full suite
    npm run test:ui        # Playwright UI mode

## Deployment

Auto-deployed to production on push to main via Vercel.

## Structure

    app/                Next.js routes
    components/         Reusable UI components
    content/            Typed content layer (work projects)
    public/             Static assets (fonts, images, OG)
    scripts/            Build-time scripts (screenshot capture)
    tests/              Playwright test specs

## Contact

ethan@basisweb.net
---

Commit all pending work with message "phase 5: command palette,
polish, audit, ship".

Push to GitHub:
- Create new public repo github.com/BasisWeb04/ethanchacko if it
  doesn't already exist
- Push master branch
- Paste the repo URL when done so the user can share it

---

Rules:
- No em dashes in code, copy, or comments
- Commit after each numbered task
- Use Context7 MCP for cmdk patterns, Next.js 14 metadata API,
  Next.js 14 ImageResponse API, next/font preloading
- Use Playwright MCP to run audits
- If a test fails, fix the implementation, not the test
- Do NOT deploy to Vercel yet. User will connect domain and deploy
  after reviewing the GitHub repo.

Stop after Task 7 with the repo URL. Paste:
- Final Playwright results (all suites)
- Final Lighthouse scores (all audited pages)
- GitHub repo URL
- Any known issues or TODOs for post-launch