Phase 4.5: bug fix + split page redesign. Small phase, ship fast.

---

Task 1: Fix section numbering on homepage.

Homepage currently jumps from / 00 MANIFESTO to / 02 SELECTED WORK.
Missing / 01. Correct sequence should be:

/ 00  MANIFESTO
/ 01  SELECTED WORK
/ 02  STACK
/ 03  CONTACT

Check app/page.tsx and fix the SectionLabel numbers. Verify all four
render in order.

---

Task 2: Remove rate section from /for-agencies.

Delete the entire / RATE block per spec 5.2. Do not replace with
anything. The page ends at the / 03 HANDOFF step now.

Update spec file ethanchacko-spec.md section 5.2 to remove the rate
block so it stays in sync.

---

Task 3: Rebuild /for-agencies as a contract-sheet layout.

Same content, different structure. Think work-order form, not blog
post.

Hero stays the same.

Body becomes a mono-labeled table layout:

/ SCOPE
  [terse 1-2 sentence answer about what white-label subcontracting means]

/ OWNERSHIP
  No attribution required. Clean handoff. You own everything.

/ TURNAROUND
  24-hour response on briefs. Build windows from 1-6 weeks depending
  on scope.

/ STACK
  Next.js · TypeScript · React Native · Python · n8n

/ COMMS
  Daily updates, weekly updates, or silent-until-shipped. Your call.

/ FIT
  Production builds, integrations, scrapers, dashboards, internal
  tools, API work. Not a fit for: brand strategy, copywriting, visual
  design leadership.

Each label renders in the left gutter as mono uppercase, answer takes
the right 8-10 cols. Hairline --border between each row.

Remove the three-step BRIEF/BUILD/HANDOFF process section. The
table-row format replaces it.

CTA at bottom stays: ethan@basisweb.net

---

Task 4: Rebuild /for-clients as FAQ.

Same content converted to Q&A format.

Hero stays the same.

Body becomes a series of Q&A blocks:

Q: What do I actually get?
A: [1-2 paragraphs, warm tone, specific. Based on existing spec copy
   about full ownership and single point of contact.]

Q: How long does this take?
A: [Specific ranges. Scoped builds 2-8 weeks, retainers ongoing.]

Q: What if I already have a team?
A: [When to hire a single dev vs agency. Honest answer.]

Q: Is this a fit for my project?
A: [The "Best fit if / Not a fit if" content from spec 5.3, reworked
   into paragraph form.]

Q: What gets built most often?
A: [Custom dashboards, lead platforms, internal tools, scrapers,
   full-stack web apps, React Native mobile.]

Q: How do we start?
A: [Email me with what you need. I respond within 24 hours with
   whether it's a fit and a rough scope.]

Each Q in mono + --signal, each A in Geist Sans body, --fg. More
vertical breathing room than /for-agencies. Hairline --border between
each Q&A pair.

Remove the BUILD/RETAINER/RESCUE engagement blocks. The FAQ format
replaces them.

CTA at bottom stays: ethan@basisweb.net

---

Task 5: Playwright QA.

Update tests:

- Homepage has SectionLabels with numbers 00, 01, 02, 03 in order.
- /for-agencies does NOT contain the text "Starts at $65/hr" or "/ RATE"
- /for-agencies contains labels: SCOPE, OWNERSHIP, TURNAROUND, STACK,
  COMMS, FIT
- /for-clients contains at least 5 Q&A pairs
- /for-clients contains "What do I actually get?" and "How long does
  this take?"
- All previous tests still pass.

---

Rules:
- No em dashes
- No rate number mentioned anywhere on the site
- Commit after each task
- Do NOT touch work grid, case studies, or homepage hero
- Use Context7 MCP only if you need Next.js patterns

Stop after Task 5. Paste test results and wait for review.