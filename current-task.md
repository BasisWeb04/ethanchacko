Phase 3: split audience pages + real thumbnails.

---

Task 1: Capture real screenshots of live sites.

Create scripts/capture-screenshots.ts using Playwright.

For each live site:
- servicecalltracker.com -> /public/work/servicecalltracker.webp
- basisweb.net -> /public/work/basisweb.webp
- The Hammock Property Inspections client site -> /public/work/hammock.webp
  (ask me for the URL before running, I'll provide)
- restaurun.basisweb.net -> /public/work/operations-command.webp

Settings:
- Viewport: 1440x900
- deviceScaleFactor: 2 for retina
- Wait for network idle + 1500ms for animations to settle
- Capture full viewport (not full page scroll)
- Export as webp, quality 85

For the three SHIPPED projects without live sites, create placeholder
assets that DON'T look like placeholders:
- /public/work/warpspeed.webp: generate a terminal-style screenshot
  showing a BOUNTY_SPEC.md file with code, using an actual terminal
  mockup component rendered to an image
- /public/work/acc-scraper.webp: a mock dashboard showing the scraper
  output (business names, filing dates, enrichment status)
- /public/work/google-maps-scraper.webp: a mock CSV/table view of
  scraped leads

For these three, render the mock UIs in a Next.js route like
/internal/mock/warpspeed, then Playwright screenshot that route at
1440x900. This gives real product-looking images, not gray boxes.

Update work cards in app/page.tsx to use real thumbnails from
/public/work/.

Add a browser chrome bar to each thumbnail in the WorkCard component:
- Top 24px of thumbnail is a browser chrome strip
- --bg-elev background, 1px --border bottom
- Three traffic light dots on the left in --fg-dim
- Optional URL string centered in mono small, truncated
- Actual screenshot fills the rest of the thumbnail area

---

Task 2: /for-agencies page.

Build per spec 5.2. Use the same section-label + content pattern as
homepage. Route must work: clicking FOR AGENCIES button on homepage
hero should navigate here cleanly.

---

Task 3: /for-clients page.

Build per spec 5.3. Same pattern as /for-agencies.

---

Task 4: Playwright QA.

Extend tests to cover:
- All 7 work cards have real image src loading from /public/work/
- No 404s on any image
- /for-agencies route returns 200 and contains "second pair of hands"
- /for-clients route returns 200 and contains "One developer"
- Nav links from homepage to both routes work
- Browser chrome bar renders on every work card (traffic lights present)

---

Rules:
- No em dashes
- Exact copy from spec sections 5.2 and 5.3
- Commit after each task
- Use Context7 MCP if verifying Playwright screenshot APIs
- Use Playwright MCP to actually run the capture and the tests
- Do NOT restructure the homepage. Do NOT change the work grid layout.
  Just swap placeholder thumbnails for real ones and add browser
  chrome. Structural review comes after Phase 5.

Stop after Task 4 passes tests. Report results + screenshot the
updated homepage.