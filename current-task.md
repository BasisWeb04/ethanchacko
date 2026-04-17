Phase 2: homepage + nav fix. Spec sections 5.1 and 7.

---

Task 0: nav hover underline

Current nav items (WORK / FOR AGENCIES / FOR CLIENTS) have no hover
underline. Add one.

- 1px underline in --signal color
- 4px underline-offset (matches StyledLink treatment)
- Slides in from left on hover, draws to 100% width over 220ms with
  --ease-out
- On unhover, slides back out to the left (same duration, same easing)
- Active route (when we have them): underline persists at 100% width,
  no animation on page load
- prefers-reduced-motion: no slide, just opacity 0 to 1 on hover

Implement via a pseudo-element (::after) with transform: scaleX(0) and
transform-origin: left, not via animating width (width animations jank).

---

Task 1: Hero (/ 00 MANIFESTO)

- Exact copy from spec 5.1: "I build systems, / not slide decks."
- "not slide decks" in Instrument Serif italic + --signal color
- Subhead in --fg-muted, max-width 48ch
- Two ghost buttons below: FOR AGENCIES → and FOR BRANDS →
  (both use existing Button component, internal links to /for-agencies
  and /for-clients)

---

Task 2: Work grid (/ 02 SELECTED WORK)

- WorkCard component in components/work-card.tsx
- Props: slug, title, description, status ('LIVE' | 'SHIPPED'), stack[],
  thumbnailUrl, liveUrl (optional)
- 3-col grid desktop, 2-col tablet, 1-col mobile
- Hover: border goes --border to --border-strong, status dot scales 1.15
- Live cards: external arrow top-right corner of thumbnail, links to
  liveUrl. stopPropagation so it doesn't trigger the card link.
- Card body links to /work/[slug]
- Thumbnails: use solid --bg-elev with project slug text centered in
  mono as placeholder. Real screenshots come in Phase 5.
- Seed data as const array in app/page.tsx for now, move to content
  layer in Phase 4
- All seven projects from spec 5.1, in spec order

---

Task 3: Stack section (/ 03 STACK)

- Mono text block, no logos, no icons
- Exact copy from spec 5.1

---

Task 4: Contact section (/ 04 CONTACT)

- Copy from spec 5.1
- EmailReveal component in components/email-reveal.tsx
- Initial render: ethan@•••••••.net in mono
- Click: characters flip in sequence with 25ms stagger, reveals full
  address, copies to clipboard, shows COPIED toast for 2s
- Use framer-motion for the char stagger
- prefers-reduced-motion: skip animation, reveal and copy instantly,
  still show toast

---

Task 5: Playwright QA

Use the Playwright MCP to run the site locally and verify Phase 2
shipped correctly.

Create tests/phase2.spec.ts with these checks:

- test('hero renders with correct copy')
  - expect h1 contains "I build systems,"
  - expect span with class indicating serif italic contains
    "not slide decks"
  - expect subhead text matches spec exactly

- test('hero CTAs link correctly')
  - "FOR AGENCIES" button has href="/for-agencies"
  - "FOR BRANDS" button has href="/for-clients"

- test('work grid has exactly 7 cards')
  - count of [data-testid="work-card"] is 7

- test('status dot distribution')
  - count of [data-status="LIVE"] is 4 (SCT, BasisWeb, Hammock, OCC)
  - count of [data-status="SHIPPED"] is 3 (Warpspeed, ACC, Maps)

- test('live cards have external link arrow')
  - LIVE cards have an [data-testid="external-link"] with href
    matching liveUrl
  - SHIPPED cards do not have this element

- test('stack section contains all 12 tools')
  - stack section text includes each of: Next.js, TypeScript, Tailwind,
    shadcn/ui, Supabase, n8n, Python, Playwright, Twilio, Resend,
    Vercel, Claude API

- test('nav hover underline')
  - hover WORK nav item, assert pseudo-element transform is scaleX(1)
    after 250ms

- test('email reveal initial state')
  - element contains text "ethan@•••••••.net"

- test('email reveal click behavior')
  - click email element
  - wait 500ms
  - element now contains "ethan@basisweb.net"
  - clipboard content (via page.evaluate navigator.clipboard.readText)
    is "ethan@basisweb.net"
  - toast with text "COPIED" is visible

- test('prefers-reduced-motion disables animations')
  - set page.emulateMedia({ reducedMotion: 'reduce' })
  - reload
  - click email element
  - email reveals within 50ms (not staggered)

Run all tests. If any fail, fix the implementation, not the test.
Report which tests pass and which fail before I review.

---

Rules:

- No em dashes anywhere
- Exact copy from spec, no paraphrasing
- Use Context7 MCP if verifying framer-motion, cmdk, or Next.js 14
  App Router patterns
- Commit after each numbered task
- Do not wire up /work/[slug], /for-agencies, or /for-clients pages
  yet. Buttons and cards should link but the routes will 404 until
  later phases. That's fine.

Stop after Task 5. Screenshot the homepage top to bottom and paste
the Playwright results. I'll review before Phase 3.