# ethanchacko.com — Design Spec & Build Plan

Personal portfolio for Ethan Chacko. Target: agency subcontracting commissions and direct client freelance work. Positioning: full-stack developer from Phoenix who ships software, not slide decks.

---

## 1. Mission

One site. Two audiences. Zero fluff.

When a hiring manager at a freelance agency or a founder looking for a dev lands on this site, they should know within 10 seconds that this guy is serious, technical, and ships. The site's job is to close people who already found you. Not to drive traffic.

---

## 2. Audience & Positioning

**Primary goal:** book subcontracted commissions through agencies and direct brand clients.

**Audience split:**
- **Agencies** hiring a contract dev to slot into their team under their brand
- **Direct brands/clients** looking for one dev to own the whole build

**Position:** engineering cockpit meets confident manifesto. Technical credibility first, personality second, never the reverse.

**What this site is NOT:**
- A blog
- A content platform
- A lead-gen funnel (BasisWeb does that)
- A place for aspirational fluff

---

## 3. Design System

### Color tokens

```
--bg: #050505            /* deeper than BasisWeb's 0a0a0a, distinct */
--bg-elev: #0C0C0C       /* cards, elevated surfaces */
--fg: #EDEDED            /* primary text */
--fg-muted: #8A8A8A      /* secondary text, labels */
--fg-dim: #4A4A4A        /* tertiary, metadata */
--border: #1A1A1A        /* hairlines */
--border-strong: #2A2A2A /* hover states */
--signal: #FFB000        /* terminal amber, single accent */
--signal-dim: #8A5F00    /* hover, pressed */
--live: #22C55E          /* live status dot only */
```

**Rules:**
- Signal amber is used sparingly. Hover states, active nav, the HUD status chip, one accent in the hero, case study result callouts. Never fill-color for buttons, never for body text.
- Green is reserved for the LIVE status dot. Nowhere else.
- No gradients anywhere. No shadows on surfaces. Borders and hairlines only.

### Typography

```
--font-sans: 'Geist Sans', system-ui, sans-serif
--font-mono: 'Geist Mono', ui-monospace, monospace
--font-serif: 'Instrument Serif', Georgia, serif  /* italic only, manifesto accents */
```

**Type scale:**
```
--text-display: clamp(3.5rem, 9vw, 8rem)    /* hero manifesto */
--text-h1: clamp(2.5rem, 5vw, 4.5rem)       /* page titles */
--text-h2: clamp(1.75rem, 3vw, 2.5rem)      /* section headers */
--text-h3: 1.5rem                            /* card titles */
--text-body: 1rem                            /* paragraphs */
--text-small: 0.875rem                       /* captions */
--text-mono: 0.8125rem                       /* HUD, metadata */
```

**Weights:**
- Geist Sans: 400 (body), 500 (UI), 700 (display)
- Geist Mono: 400 (metadata, code)
- Instrument Serif: 400 italic only

**Letter spacing:**
- Display: -0.03em (tight)
- Body: 0 (default)
- Mono uppercase labels: 0.08em (wide)

### Spacing & layout

```
--container-max: 1280px
--gutter: clamp(1.5rem, 4vw, 4rem)
--section-y: clamp(4rem, 10vw, 8rem)
```

12-column grid, 24px gutter. Content caps at 1280px. Sections breathe with 4-8rem vertical space.

### Motion

```
--ease-out: cubic-bezier(0.16, 1, 0.3, 1)
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)
--dur-fast: 180ms
--dur-base: 280ms
--dur-slow: 520ms
```

All motion respects `prefers-reduced-motion: reduce`. Disable animations, keep layout.

### Core components

**HUD Chip** (persistent top-right, all pages)
```
PHX / UTC-7 / 14:32:07 / STATUS: AVAILABLE
```
Geist Mono, 13px, `--fg-muted`, status dot in `--signal`. Updates live every second. Mobile collapses to just `PHX / AVAILABLE` dot.

**Command Palette (⌘K)**
Backdrop blur, center modal, `--bg-elev` background, `--border-strong` ring. Keyboard navigable. Items: jump to work, switch audience view (agencies/clients), copy email, open Upwork, view source. Uses `cmdk` library.

**Work Card**
`--bg-elev` surface, 1px `--border`, rounded-md. Thumbnail at top (16:10). Below: status dot + label (LIVE pulsing / SHIPPED static), title in Geist Sans 500, tech stack badges in mono small. Hover: border goes to `--border-strong`, status dot scales, thumbnail subtle parallax.

**Status Dot**
- LIVE: `--live`, 8px, pulse animation (scale 1→1.4 over 1.8s, opacity 1→0.4)
- SHIPPED: `--signal`, 8px, static

**Button**
Ghost only. Transparent bg, 1px `--border`, `--fg` text. Hover: `--border-strong`. Active: `--signal` border, `--signal` text. No filled buttons anywhere.

**Link**
Underline from `--fg-dim`, thickness 1px, offset 4px. Hover: underline becomes `--signal`, color stays `--fg`.

**Section Label**
```
/ 01  WORK
```
Geist Mono, uppercase, `--fg-muted`, tracked wide. Appears before every major section.

---

## 4. Information Architecture

### Routes

```
/                           homepage, universal landing
/for-agencies               agency-specific pitch page
/for-clients                direct-brand pitch page
/work                       full work index (optional, could be homepage anchor)
/work/servicecalltracker    case study
/work/basisweb              case study
/work/hammock               case study
/work/operations-command    case study
/work/warpspeed             case study (internal work)
/work/acc-scraper           case study (internal work)
/work/google-maps-scraper   case study (internal work)
```

### Navigation

**Top nav (all pages):**
- Left: `EC` wordmark (Geist Sans 700, links home)
- Center: `Work` / `For Agencies` / `For Clients`
- Right: HUD chip

**Mobile:** hamburger that reveals same items stacked. HUD chip stays visible.

**Footer (all pages):**
```
ethan@basisweb.net          Upwork →          © 2026 Ethan Chacko
                                              Phoenix, AZ
```
Geist Mono, `--fg-muted`. Email is `mailto:`. Upwork opens in new tab.

---

## 5. Page Specs

### 5.1 Homepage ( / )

**Above fold — Hero**

```
/ 00  MANIFESTO

I build systems,
not slide decks.

Full-stack developer out of Phoenix. I ship
software for agencies and businesses who need
something built, not pitched.
```

- First line: Geist Sans 700, display size, `--fg`
- Second line: same, but `not slide decks` rendered in Instrument Serif italic + `--signal` color
- Subhead: Geist Sans 400, 1.125rem, `--fg-muted`, max-width 48ch
- No hero image. Typography carries the whole fold.
- Bottom of fold: two ghost buttons side by side, `FOR AGENCIES →` and `FOR BRANDS →`

**Section 02 — Work**

```
/ 02  SELECTED WORK
```

3-column grid of work cards (collapses to 2 then 1). Order:
1. ServiceCallTracker (LIVE)
2. BasisWeb (LIVE)
3. Hammock Property Inspections (LIVE)
4. Operations Command Center (LIVE)
5. Warpspeed Bounties (SHIPPED)
6. ACC Business Scraper (SHIPPED)
7. Google Maps Lead Scraper (SHIPPED)

Each card links to `/work/[slug]`. Live cards additionally get an external arrow on the thumbnail corner that goes direct to the live site.

**Section 03 — Stack**

```
/ 03  STACK

Next.js · TypeScript · Tailwind · shadcn/ui
Supabase · n8n · Python · Playwright
Twilio · Resend · Vercel · Claude API
```

Mono, large, just a text list. No logos. No icons. Confidence comes from not needing to flex.

**Section 04 — Contact**

```
/ 04  CONTACT

Available for agency subcontracting
and direct client work.

ethan@basisweb.net

Currently in: Phoenix, AZ
Response time: within 24 hours
```

Email renders with reveal interaction. Initial state: `ethan@•••••••.net`. Click: characters flip in sequence to reveal full address, then copies to clipboard with a small `COPIED` toast.

### 5.2 /for-agencies

**Hero**

```
/ FOR AGENCIES

A second pair of hands
that ships under your brand.
```

Italic `ships` in serif + amber.

**Body**

```
I work white-label with agencies who need
production code delivered on deadline. No
attribution required, no client contact unless
you want it, no surprises.

What you get:
· Senior full-stack output at contractor rates
· Ship discipline (I don't get stuck)
· Stack fluency across Next, React Native, Python, n8n
· Clean handoffs with docs your team can own
```

**How it works** (3-step, numbered, mono labels)

```
/ 01  BRIEF
You send scope and deadline.
I confirm within 24 hours whether I can ship it.

/ 02  BUILD
I work against your spec under NDA.
Daily updates if you want them, silent if you don't.

/ 03  HANDOFF
Clean repo, docs, deployment notes.
You own everything.
```

**CTA**

```
ethan@basisweb.net
```

### 5.3 /for-clients

**Hero**

```
/ FOR BRANDS

One developer. Full ownership.
Systems that run after I'm gone.
```

Italic `run` in serif + amber.

**Body**

Warmer, more explanatory than agencies page. Slower pace.

```
Most agencies will sell you a team of five and
bill you for eight. I'm one person who builds
the whole thing, knows every line of your code,
and hands it off clean.

Best fit if:
· You're a service business, SaaS founder, or ops team
  with something specific that needs building
· You care about code that still works in two years
· You want one point of contact, not a project manager
  forwarding emails

Not a fit if:
· You need a design team, brand strategy, or marketing
· You want a rotating cast of juniors at agency margins
· You don't know what you want built yet (go hire a
  product consultant first)
```

**What gets built**

```
Custom dashboards · Lead platforms · Internal tools
Scrapers & automation · API integrations
Full-stack web apps · Mobile (React Native)
```

**Engagement options**

```
/ BUILD
Scoped project, fixed price, 2-8 week timelines.

/ RETAINER
Ongoing dev work, hourly, minimum 10hr/week.

/ RESCUE
Inherited code that's on fire. I've fixed worse.
```

**CTA**

```
ethan@basisweb.net
```

### 5.4 /work/[slug] — Case Study Template

**Header**

```
/ WORK / SERVICECALLTRACKER

ServiceCallTracker
Real-time command center for service businesses.

[VISIT LIVE →]   [VIEW REPO →]   /  2026
```

Status + year + stack badges in mono row beneath title.

**Sections (all case studies follow this structure):**

```
/ CONTEXT
[What was the problem / who was it for]

/ CONSTRAINTS
[What made it hard. Budget, deadline, tech, domain]

/ APPROACH
[How I decided to build it. Key architectural choices]

/ STACK
[Exact tools, libraries, infrastructure]

/ RESULT
[What shipped. Metrics if available. Screenshots]
```

**Footer of case study:**

```
← PREVIOUS WORK                    NEXT WORK →
```

---

## 6. Case Study Content (drafts)

Live-site cases (SCT, BasisWeb, Hammock, OCC) get light writeups since the actual product is one click away. The three internal projects carry the technical credibility load and get full post-mortem treatment.

### 6.1 Warpspeed Bounties

```
/ CONTEXT

Warpspeed is a platform where mobile and web developers
compete head-to-head on spec'd bounties. Whoever ships
clean code that passes the QA checklist first wins the
payout. Everyone else goes home with nothing.

I've won $1,320 across three bounties in this format:
React Native calendar permissions ($330), an AI chat
web portal ($330), and note-level biometric security
($660).

/ CONSTRAINTS

The format punishes every inefficiency. No scope
negotiation, no partial credit, no second chances if
the QA checklist fails. The spec is the spec.

Typical window from bounty drop to winning PR: 2 to 6
hours. Other developers are racing you in parallel.

/ APPROACH

I built a repeatable shipping workflow around Claude
Code. For every bounty:

1. Drop the bounty spec into BOUNTY_SPEC.md in the
   project root.
2. Drop the QA checklist into QA_CHECKLIST.md.
3. Point Claude Code at both files with instructions
   to work only against the spec, not add scope.
4. Verify locally against the checklist before opening
   the PR.

The discipline is in not touching anything outside the
spec. Bounties reward exact delivery. Over-engineering
loses.

/ STACK

React Native · TypeScript · Expo · iOS/Android biometric
APIs · WebSocket streaming · Claude Code · Anthropic SDK

/ RESULT

Three wins, three payouts, zero QA failures on first
submission. Established the workflow as a reliable
cash-generation mechanism alongside longer-term client
builds.
```

### 6.2 ACC Business Scraper

```
/ CONTEXT

The Arizona Corporation Commission publishes every new
LLC filing in the state. That's a live feed of people
who just started a business and don't yet have a
website, an accountant, or a real operation.

It's a gold mine for cold outreach if you can get to
the data first.

In January 2026 the ACC replaced its old eCorp portal
with a new system at arizonabusinesscenter.azcc.gov.
The old scrapers in the wild stopped working. I built
a new one.

/ CONSTRAINTS

- No public API. Everything is rendered client-side
  and requires interaction to reach the filings list.
- Rate limiting on the portal punishes aggressive
  scraping.
- Filings include LLCs that are formed for legal
  structure but have no operating business behind them.
  Those are noise.
- Contact data is not in the filings. You get a
  business name, an agent, and an address.

/ APPROACH

Built a Playwright scraper that runs on a schedule,
hits the portal during low-traffic windows, pulls new
Articles of Organization filed in Maricopa County
within the last 24 hours, and deduplicates against a
local seen-ids.json.

Enrichment pipeline runs after scraping. Each new
business goes to Perplexity with a prompt designed to
find a website, a phone number, and an owner name.
Perplexity's web grounding beats every structured
data vendor I tested for brand-new businesses that
don't have a web presence yet.

Scored leads and custom call openers get generated by
Claude, pulling from the business name and any
enrichment context. Output is a CSV ready to drop
into a dialer or into cold email sequencer.

/ STACK

Playwright · Node.js · TypeScript · Perplexity API ·
Anthropic SDK · Docker · Hetzner VPS · cron

/ RESULT

Self-sustaining lead pipeline that feeds new Arizona
businesses into cold outreach within 24 hours of them
existing on paper. Runs unattended on a Hetzner VPS.
```

### 6.3 Google Maps Lead Scraper

```
/ CONTEXT

Outbound sales for local service businesses needs
targeted lists. HVAC contractors in Phoenix with
20-300 Google reviews. Medspas in Scottsdale open
more than three years. Plumbers in Mesa with a
website but no blog.

Apollo, Outscraper, and the other structured-data
vendors charge per lead and miss half the long tail.
Google Maps has all of it, for free, if you can get
it out.

/ CONSTRAINTS

- Google Maps rate-limits aggressive scraping and
  will serve stale or sparse results if you look like
  a bot.
- Maps results are paginated and lazy-loaded, which
  breaks naive scrapers.
- Results include chain locations, duplicates, and
  closed businesses that need filtering.
- Phone numbers and websites are behind a second
  click per result.

/ APPROACH

Playwright-driven with human-like scroll, randomized
delays, and session rotation. Each search query
(category + geography) triggers an exhaustive scroll
to the end of results, then a per-result detail pull
for phone, website, review count, and rating.

Deduplication runs on normalized business name plus
address. Filters strip chains (based on a known-chains
list) and closed/temporarily-closed results.

Output is a structured CSV with business name, owner
name where available, phone, website, review count,
star rating, and address. Drops straight into Apollo
for email enrichment or into a dialer for cold calls.

/ STACK

Playwright · Python · pandas · asyncio · proxy
rotation · CSV export

/ RESULT

Built the initial lead list for BasisWeb cold outreach.
51 verified Phoenix-metro HVAC and plumbing leads in
the first batch, feeding the cold email and call
pipelines that followed.
```

### 6.4 ServiceCallTracker (light writeup)

```
/ CONTEXT
Flagship product out of BasisWeb. Real-time dashboard
for Phoenix service businesses. Tracks leads, jobs,
revenue, and reviews from one screen.

/ STACK
Next.js 14 · TypeScript · Tailwind · shadcn/ui ·
Supabase · Twilio · Resend · Vercel

/ RESULT
Feature-complete and launch-ready. 20+ pages, 119
components, full funnel from homepage through
solutions wizard to lead capture. 10-page interactive
demo dashboard. 40/40 Playwright tests passing.

[VISIT LIVE →]
```

### 6.5 BasisWeb (light writeup)

```
/ CONTEXT
Agency platform and client gateway. Scroll-pinned
portfolio with device-framed screenshots, numbered
capability stack, free contractor tools.

/ STACK
Next.js 14 · TypeScript · Tailwind · Framer Motion ·
Vercel

/ RESULT
The agency face of everything I build. Serves as both
portfolio and lead capture for the business side.

[VISIT LIVE →]
```

### 6.6 Hammock Property Inspections (light writeup)

```
/ CONTEXT
Client build for a Florida Space Coast home inspector.
Clean 5-page marketing site with form backend for
booking requests.

/ STACK
Next.js 14 · TypeScript · Tailwind · Resend ·
Supabase · Cloudflare Turnstile · Vercel

/ RESULT
Delivered and deployed to the client's own Vercel
account. First paying external client build end-to-end.

[VISIT LIVE →]
```

### 6.7 Operations Command Center (light writeup)

```
/ CONTEXT
Centralized work-order intake and routing for
multi-location restaurant maintenance operations.
Replaced a ServiceNow/ServiceChannel workflow with a
purpose-built tool.

/ STACK
Next.js · TypeScript · Tailwind · Supabase · n8n ·
HouseCall Pro API · Twilio

/ RESULT
First paying BasisWeb client. Operational system
running real restaurant maintenance workflow.

[VISIT LIVE →]
```

---

## 7. Voice Guide

**Rules:**
- No em dashes. Use colons, semicolons, or just break the sentence.
- No AI tells. No "leveraging," "seamless," "robust," "comprehensive," "innovative," "cutting-edge."
- Short sentences. Verbs up front.
- Confident without hype. If it shipped, say it shipped. If it didn't, don't say it did.
- Specifics over adjectives. "51 verified leads" beats "many leads."

**Good:**
> I ship software for agencies and businesses who need something built, not pitched.

**Bad:**
> I leverage cutting-edge technology to deliver seamless, comprehensive solutions for forward-thinking clients.

**Good:**
> Three wins, three payouts, zero QA failures.

**Bad:**
> Successfully delivered multiple winning submissions across the platform.

---

## 8. Distinctive Features (build scope)

Approved list:

1. **Persistent HUD chip** (top-right, all pages)
2. **Command palette (⌘K)** via `cmdk`
3. **Work cards with live status dots** (pulsing green for LIVE, static amber for SHIPPED)
4. **Case study pages as engineering post-mortems** with CONTEXT/CONSTRAINTS/APPROACH/STACK/RESULT structure
5. **Agencies vs Clients pages differentiated by temperature** (pacing and density, not color)
6. **Contact as reveal** (email obscures and flips in on click, auto-copies)

---

## 9. Tech Stack

```
Framework: Next.js 14 (App Router)
Language: TypeScript (strict)
Styling: Tailwind CSS + CSS variables for tokens
UI primitives: shadcn/ui
Animation: Framer Motion (scoped, sparingly)
Command palette: cmdk
Fonts: next/font with Geist Sans, Geist Mono, Instrument Serif
Icons: lucide-react (used minimally)
Deploy: Vercel
Analytics: Vercel Analytics (no cookies, no consent banner needed)
Repo: github.com/BasisWeb04/ethanchacko (or similar)
Domain: ethanchacko.com
```

---

## 10. Build Order

Phase 1 — Foundation
1. Next.js scaffold, Tailwind config, token setup, font loading
2. Layout with persistent HUD chip and footer
3. Core components: Button, Link, SectionLabel, StatusDot

Phase 2 — Homepage
4. Hero with manifesto typography
5. Work grid with 7 cards (placeholder thumbnails for now)
6. Stack section
7. Contact reveal interaction

Phase 3 — Split pages
8. /for-agencies full page
9. /for-clients full page

Phase 4 — Work detail
10. Dynamic route scaffold at /work/[slug]
11. Case study page template
12. Populate 7 case studies (content from Section 6)

Phase 5 — Polish
13. Command palette wired up
14. Live status dot animation
15. Scroll reveal for work grid (subtle, not flashy)
16. Favicon, OG image, meta
17. Playwright smoke tests on all routes

Phase 6 — Ship
18. Domain connect on Vercel
19. Email forwarding on ethanchacko.com (optional, can point to basisweb.net)
20. Post-launch: verify on mobile, slow 3G, and reduced-motion

---

## 11. Claude Code Kickoff Prompt

Drop this into CURRENT-TASK.md in the project root after scaffolding the Next.js project.

```
Build ethanchacko.com, a personal portfolio site. Full spec
is in ./ethanchacko-spec.md. Read it before writing any code.

Phase 1 only for this session:
- Next.js 14 App Router scaffold with TypeScript strict mode
- Tailwind config with all color tokens, font tokens, spacing
  tokens from spec Section 3
- next/font loading Geist Sans, Geist Mono, Instrument Serif
- Root layout with persistent HUD chip (top-right) and footer
- Core components in /components: Button, Link, SectionLabel,
  StatusDot

Rules:
- No fallback implementations. If something needs a package,
  install it.
- No placeholder copy. Use exact copy from the spec.
- No em dashes anywhere in copy or comments.
- Respect prefers-reduced-motion on every animation.
- Use Context7 MCP if you need to verify Next.js 14 App Router
  or shadcn/ui patterns.
- Commit after each numbered subtask with a clear message.

Stop after Phase 1. Do not start homepage build. I'll review
the foundation first.
```

---

## 12. Risks & Honest Notes

**Risk: case studies get written thin.** The Warpspeed, ACC, and Google Maps case studies are doing most of the technical credibility lifting. Drafts in Section 6 are starting points. Tighten them with specific metrics where you have them (bounty payouts confirmed, lead count confirmed, uptime numbers if tracked).

**Risk: the two-audience split reads as hedging.** Commit to both pages fully. If the agencies page is great and the clients page is a ghost town, delete the clients page and own the agency pitch.

**Risk: aesthetic dates fast.** Terminal/cockpit aesthetic is peaking in 2026. The IA and case studies are evergreen, but plan a visual refresh in 12-18 months. That's fine.

**Risk: availability chip lying.** If HUD shows AVAILABLE but you're actually booked out three weeks, that's a trust hit on first contact. Either keep it accurate or change it to a static `PHX / UTC-7 / 14:32:07` without the status word.

**What this site cannot do:** drive traffic. It closes, it doesn't find. Your Upwork grind and cold outreach is still where pipeline comes from.

---

*Spec version 1.0. Updated 2026-04-16.*
