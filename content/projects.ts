export type ProjectStatus = "LIVE" | "SHIPPED";

export type Tone = "live" | "pending" | "neutral";

export type Callout = {
  n: number;
  note: string;
  x?: number;
  y?: number;
};

export type Exhibit = {
  src: string;
  alt: string;
  caption: string;
  callouts?: Callout[];
  illustration?: boolean;
  aspect?: string;
};

export type LedgerRow = {
  tone: Tone;
  status: string;
  item: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  status: ProjectStatus;
  stack: string[];
  thumbnailUrl: string;
  thumbnailLabel: string;
  liveUrl?: string;
  year: string;

  /** Eyebrow above the title on the case-study page. */
  eyebrow?: string;
  /** Header status stamp; falls back to a value derived from `status`. */
  headerStatus?: { tone: Tone; label: string };

  /**
   * Legacy prose body (light builds). Rich case studies use `sections` instead.
   */
  context: string;
  constraints?: string;
  approach?: string;

  /** Custom-heading prose sections for the three flagship case studies. */
  sections?: { heading: string; body: string }[];

  stackDetailed: string;
  /** Optional closing result prose. */
  result?: string;

  /** Optional metrics band, rendered under the header. */
  stats?: { value: string; label: string; signal?: boolean }[];

  /** A single annotated exhibit shown as the cover, under the header. */
  cover?: Exhibit;
  /** Additional annotated exhibits shown in the body. */
  exhibits?: Exhibit[];

  /** The straight-status ledger. */
  ledger?: { title?: string; rows: LedgerRow[]; note?: string };
};

export const projects: Project[] = [
  {
    slug: "inspection-revenue-engine",
    title: "Inspection Revenue Engine",
    description:
      "Production GoHighLevel and n8n system for a multi-inspector home-inspection company.",
    status: "LIVE",
    eyebrow: "Case study · CRM + operations",
    headerStatus: { tone: "live", label: "Live in production" },
    stack: ["GoHighLevel", "n8n", "Python", "Supabase", "Spectora"],
    thumbnailUrl: "/work/n8n-overview.png",
    thumbnailLabel: "n8n / production bridge",
    year: "2026",
    context:
      "A multi-inspector US home-inspection company ran everything on its inspection software, Spectora, with no CRM underneath. Years of client and agent history sat locked in one tool. No marketing attribution, lead generation by hand, follow-up by memory. Real revenue and real customers, and a history they couldn't market from or report on.\n\nI built the production system around it. A GoHighLevel CRM from scratch, a custom integration bridging Spectora into it over self-hosted n8n, a full historical migration of their book of business, and a marketing-to-revenue attribution layer. It's run in production since May 2026 and carries every real booking, report-delivery, and payment event the business runs.",
    constraints:
      "The original scope assumed a two-way sync, data flowing back into the inspection software. Deep discovery killed that assumption. The platform is outbound-webhook-only, with no inbound API and no programmatic write path of any kind. The direction we'd promised was impossible.\n\nMost builders either quote that two-way sync and miss at the deadline, or quietly drop it and hope nobody notices. I put the correction in writing as an explicit scope change while there was still time to act on it, then re-architected around the real constraint.\n\nThe data had to migrate clean on top of that. Years of records, with duplicate contacts and phone-number collisions that GoHighLevel rejects at the server. A migration that loses relationship history is worse than no migration.",
    approach:
      "Instead of a fake sync, I built forward-direction enrichment. When a booking fires, the bridge looks the agent up in GoHighLevel and creates or updates the contact, and a one-time historical backfill runs through the platform's CSV export path. The client got a complete, continuously updated CRM and no pretend two-way sync.\n\nThe integration runs on self-hosted n8n on a hardened Linux VPS. Three production event workflows, booking created, report delivered, and payment completed, route every inspection across a 50-service catalog. Every inbound event dedupes against a composite-keyed Postgres ledger, so vendor retry storms can't double-write the CRM. Phone-number collisions get caught, retried without the colliding field, and tagged for human review instead of failing silently. A separate workflow polls hourly and emails me the moment any event fails.\n\nThe attribution layer ties a marketing touch to the booking it eventually drives. Per-event QR codes feed a tagged capture form and a structured nurture sequence, and the booking webhook traces that touch back months later.",
    stackDetailed:
      "GoHighLevel · Spectora (Advanced-tier webhooks) · n8n (self-hosted) · Python · Supabase / Postgres · Resend · Next.js · hardened Linux VPS behind Caddy with auto-TLS",
    result:
      "Live in production since May 2026, carrying the business's real booking, report-delivery, and payment events. Real revenue data, not test traffic. A point-in-time read from the live n8n dashboard showed 318 production executions, 0 failed, a 0% failure rate, and a 0.7-second average run time. The residential pipeline alone holds 5,840 opportunities.\n\nThe historical migration moved roughly 8,000 contacts and 6,500-plus opportunities with clean deduplication and zero lost relationship history. The engagement is ongoing. The lifecycle-automation milestone is live, and a custom team-operations dashboard runs behind auth on the client's own subdomain.",
    stats: [
      { value: "0", label: "failed events, every audit", signal: true },
      { value: "May 2026", label: "in production since" },
      { value: "318", label: "production executions" },
      { value: "0.7s", label: "avg run time" },
      { value: "~8,000", label: "contacts migrated" },
      { value: "6,500+", label: "opportunities migrated" },
    ],
    cover: {
      src: "/work/n8n-overview.png",
      alt: "Live n8n production dashboard: 318 production executions, 0 failed, 0% failure rate, 0.7 second average run time, with the Spectora-to-GoHighLevel event workflows published.",
      aspect: "aspect-[16/9]",
      caption:
        "The live n8n dashboard, June 2026. These are the real numbers the stats above are read from.",
      callouts: [
        {
          n: 1,
          x: 24,
          y: 15,
          note: "Every production run is logged here. Zero failed, at a 0 percent failure rate.",
        },
        {
          n: 2,
          x: 28,
          y: 48,
          note: "Three event workflows: every booking, report, and payment writes into the CRM automatically.",
        },
        {
          n: 3,
          x: 26,
          y: 77,
          note: "A separate alerting workflow emails me the moment any event fails.",
        },
      ],
    },
    exhibits: [
      {
        src: "/work/n8n-booking-crop.webp",
        alt: "The Booking Created workflow canvas in n8n, showing the intake, dedup, collision-handling, and opportunity-creation nodes.",
        aspect: "aspect-[1670/315]",
        caption:
          "Booking Created, one of three production event workflows. It routes every inspection across a 50-service catalog with dedup, retries, and idempotency.",
        callouts: [
          {
            n: 1,
            note: "Every booking enters on the left and dedupes against a keyed ledger, so vendor retries never double-write the CRM.",
          },
          {
            n: 2,
            note: "Phone-number collisions get caught, retried without the colliding field, and tagged for review instead of failing silently.",
          },
          {
            n: 3,
            note: "On the right the booking becomes an opportunity in the CRM, stamped with the agent who sent it.",
          },
        ],
      },
      {
        src: "/work/n8n-alerting-crop.webp",
        alt: "The failure-alerting workflow canvas in n8n: a scheduled poll, a real-error filter, and an email step.",
        aspect: "aspect-[1380/345]",
        caption:
          "The failure-alerting workflow. It polls hourly, filters for real errors, and emails me the moment a production event fails.",
        callouts: [
          { n: 1, note: "A schedule kicks it off every hour." },
          {
            n: 2,
            note: "It filters for real failures, not routine noise.",
          },
          {
            n: 3,
            note: "Then it emails me the moment a production event actually fails.",
          },
        ],
      },
    ],
    ledger: {
      rows: [
        { tone: "live", status: "Live", item: "Spectora to GoHighLevel data bridge" },
        { tone: "live", status: "Live", item: "One-time historical backfill" },
        { tone: "live", status: "Live", item: "Agent and CE nurture intake" },
        { tone: "live", status: "Live", item: "Weekly automated health audit" },
        { tone: "live", status: "Live", item: "Lifecycle automations" },
        {
          tone: "live",
          status: "Live",
          item: "Team operations dashboard, behind auth",
        },
      ],
      note: "Revenue results are the client's private data. I publish capability, not his numbers.",
    },
  },
  {
    slug: "lead-data-engine",
    title: "The Graded Pilot",
    description:
      "A lead-data engine funded by a 25-year industry veteran after he graded a paid pilot against his own answer key.",
    status: "SHIPPED",
    eyebrow: "Case study · Data + lead generation",
    headerStatus: { tone: "pending", label: "In build" },
    stack: ["Python", "Enrichment", "Verification", "Scoring"],
    thumbnailUrl: "/work/lead-data-engine-illustration.webp",
    thumbnailLabel: "lead data / graded pilot",
    year: "2026",
    context: "",
    sections: [
      {
        heading: "Context",
        body: "My client has spent 25 years in transportation and buys data for a living. Vendors have burned him with stale lists, so he keeps a master answer key of contacts he already knows are correct and grades every vendor's sample against it. He told me straight up the test exists to catch fakers.\n\nHe didn't hire me off a pitch. He paid me $300 for a small calibration batch in his exact template and graded it.",
      },
      {
        heading: "The pilot",
        body: "I scored 8 out of 10, and his notes on the misses became the spec for the build. Three things in that pilot mattered more than the score. My freshness check caught one of his own confirmed contacts who had quietly changed jobs. One miss was mine, a too-strict filter benching a valid contact, and I said so instead of arguing the edge case. And he had assumed I was scraping LinkedIn. I wasn't, and I told him, even though the wrong assumption was working in my favor.",
      },
      {
        heading: "The build",
        body: "He funded a $4,500 engine that sources, enriches, verifies, and scores, delivered in his template. He owns the code outright. I charge for the build and optional maintenance; his raw data costs pass through at cost, where he can see them, never blended into my fee.",
      },
    ],
    stackDetailed:
      "Python · sourcing and enrichment pipeline · verification and freshness checks · scoring · delivered in the client's own Excel template",
    stats: [
      { value: "8/10", label: "graded pilot", signal: true },
      { value: "$300", label: "paid calibration" },
      { value: "$4,500", label: "funded build" },
      { value: "100%", label: "code ownership, his" },
    ],
    exhibits: [
      {
        src: "/work/lead-data-engine-illustration.webp",
        alt: "Illustration of the lead-data deliverable format: real column headers over generic, redacted sample rows.",
        illustration: true,
        aspect: "aspect-[16/10]",
        caption:
          "Illustration of the deliverable format. The columns and layout are real; the sample rows are generic placeholder, not client data.",
      },
    ],
    ledger: {
      rows: [
        {
          tone: "live",
          status: "Delivered",
          item: "Paid calibration pilot, graded 8 out of 10 in his template",
        },
        {
          tone: "pending",
          status: "In build",
          item: "The $4,500 owned-code sourcing and scoring engine",
        },
      ],
      note: "No delivered results are claimed yet. When the engine ships and he has graded the output, the real numbers go here. Not before.",
    },
  },
  {
    slug: "ai-report-reviewer",
    title: "The AI That Held",
    description:
      "An AI report-review engine that holds up on a business owner's real reports where his own DIY chatbot attempts drifted.",
    status: "LIVE",
    eyebrow: "Case study · AI implementation",
    headerStatus: { tone: "live", label: "Running on his real reports" },
    stack: ["AI implementation", "Standards grounding", "Structured output"],
    thumbnailUrl: "/work/ai-report-reviewer-illustration.webp",
    thumbnailLabel: "ai review / scorecard",
    year: "2026",
    context: "",
    cover: {
      src: "/work/ai-report-reviewer-illustration.webp",
      alt: "Illustration of the AI review scorecard format: generic inspection sections with pass and flag markers over placeholder findings.",
      illustration: true,
      aspect: "aspect-[16/10]",
      caption:
        "Illustration of the review scorecard format. The layout is real; the section findings are placeholder text, not a real report.",
    },
    sections: [
      {
        heading: "Context",
        body: "A home inspection company owner had already tried building this himself. Hundreds of hours into ChatGPT and Gemini versions, all of them drifting. The rules got lost somewhere in one long chat and the model started improvising. That is how bolt-on AI usually ends, and it is why he came to me instead of trying a third chatbot.",
      },
      {
        heading: "The build",
        body: "I built the v1 engine. It reads his real inspection reports end to end and returns the review in his own scorecard format, the layout he used to fill in by hand at night. His standards are the grounding, so it flags things the way he does, not the way a generic chatbot would.",
      },
      {
        heading: "Why it holds",
        body: "The model was never his problem. In my build the rules live outside it. Each check hands the AI only the slice of his standards that one question needs, so it cannot lose the plot the way a chat window does. A prompt is not a system. The machinery around the model is what makes AI dependable inside a real business.",
      },
      {
        heading: "The number I will not publish yet",
        body: "I could quote an accuracy number today and it would look great. It would also be close to meaningless. The reports I have are the ones he already corrected, and testing on those flatters the engine. I won't publish an accuracy number until it's measured against reports the way his inspectors first submitted them. When a vendor hands you a suspiciously clean number, ask what they tested it on.",
      },
    ],
    stackDetailed:
      "AI implementation · the client's own standards wired in as grounding · per-check retrieval · structured scorecard output",
    ledger: {
      rows: [
        {
          tone: "live",
          status: "Running",
          item: "The v1 engine, end to end on his real reports",
        },
        {
          tone: "pending",
          status: "Being proven",
          item: "Catch rate, measured the honest way",
        },
      ],
      note: "No accuracy number gets published until it is measured against reports the way inspectors first submitted them. Not before.",
    },
  },
  {
    slug: "servicecalltracker",
    title: "ServiceCallTracker",
    description: "Real-time command center for service businesses.",
    status: "LIVE",
    stack: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Twilio"],
    thumbnailUrl: "/work/servicecalltracker.webp",
    thumbnailLabel: "servicecalltracker.com",
    liveUrl: "https://servicecalltracker.com",
    year: "2026",
    context:
      "Flagship product out of BasisWeb. Real-time dashboard for Phoenix service businesses. Tracks leads, jobs, revenue, and reviews from one screen.",
    stackDetailed:
      "Next.js 14 · TypeScript · Tailwind · shadcn/ui · Supabase · Twilio · Resend · Vercel",
    result:
      "Feature-complete and launch-ready. 20+ pages, 119 components, 10-page interactive demo dashboard, 5 industry landing pages. 40 Playwright tests passing, zero build warnings. Full funnel from homepage through solutions wizard to lead capture to Calendly booking.",
  },
  {
    slug: "basisweb",
    title: "BasisWeb",
    description: "Agency platform and client gateway.",
    status: "LIVE",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    thumbnailUrl: "/work/basisweb.webp",
    thumbnailLabel: "basisweb.net",
    liveUrl: "https://basisweb.net",
    year: "2026",
    context:
      "Agency platform and client gateway for BasisWeb. Scroll-pinned portfolio with device-framed screenshots, numbered capability cards with click-to-flip 3D interaction, bottom sticky pill navbar, free contractor tools.",
    stackDetailed:
      "Next.js 14 · TypeScript · Tailwind · Framer Motion · Vercel",
    result:
      "Serves as both portfolio and lead capture for the agency. Four free calculator tools embedded as value-add for contractors, ranking in organic search for 'hvac pricing calculator' and adjacent queries.",
  },
  {
    slug: "hammock",
    title: "Hammock Property Inspections",
    description: "Marketing site for a Florida Space Coast home inspector.",
    status: "LIVE",
    stack: ["Next.js", "TypeScript", "Tailwind", "Resend", "Supabase"],
    thumbnailUrl: "/work/hammock.webp",
    thumbnailLabel: "hammockpropertyinspections.com",
    liveUrl: "https://hammockpropertyinspections.com",
    year: "2026",
    context:
      "Client build for Hammock Property Inspections, a Florida Space Coast home inspector. Clean 5-page marketing site with booking form backend, mobile-optimized, deployed to the client's own Vercel account via guided screen-share handoff.",
    stackDetailed:
      "Next.js 14 · TypeScript · Tailwind · Resend · Supabase · Cloudflare Turnstile · Vercel",
    result:
      "Delivered in two milestones. Client owns deployment, repo, and all infrastructure. First paying external client build end to end. Navy / warm neutral / muted teal palette locked in during discovery, Merriweather and Inter for a print-meets-web aesthetic.",
  },
  {
    slug: "operations-command",
    title: "Operations Command Center",
    description: "Work-order intake and routing for restaurant maintenance.",
    status: "LIVE",
    stack: ["Next.js", "TypeScript", "Supabase", "n8n", "Twilio"],
    thumbnailUrl: "/work/operations-command.webp",
    thumbnailLabel: "ops.basisweb.net",
    liveUrl: "https://restaurun.basisweb.net",
    year: "2026",
    context:
      "Centralized work-order intake and routing for multi-location restaurant maintenance operations. Replaced a ServiceNow and ServiceChannel workflow with a purpose-built command center. Automated work orders flow from intake through dispatch to HouseCall Pro via n8n.",
    stackDetailed:
      "Next.js · TypeScript · Tailwind · Supabase · n8n · HouseCall Pro API · Twilio",
    result:
      "First paying BasisWeb client. Operational system running real restaurant maintenance workflow across multiple locations. Work orders that previously required manual re-entry into two systems now flow in under 30 seconds from intake to technician.",
  },
  {
    slug: "warpspeed",
    title: "Warpspeed Bounties",
    description: "Head-to-head developer bounties, shipped under pressure.",
    status: "SHIPPED",
    stack: ["React Native", "TypeScript", "Expo", "Anthropic SDK"],
    thumbnailUrl: "/work/warpspeed.webp",
    thumbnailLabel: "warpspeed / bounty-016",
    year: "2026",
    context:
      "Warpspeed is a platform where mobile and web developers compete head-to-head on spec'd bounties. Whoever ships clean code that passes the QA checklist first wins the payout. Everyone else goes home with nothing.\n\nI've won $1,320 across three bounties in this format: React Native calendar permissions ($330), an AI chat web portal ($330), and note-level biometric security ($660).",
    constraints:
      "The format punishes every inefficiency. No scope negotiation, no partial credit, no second chances if the QA checklist fails. The spec is the spec.\n\nTypical window from bounty drop to winning PR: 2 to 6 hours. Other developers are racing you in parallel.",
    approach:
      "I treat the spec as the whole contract. Before I write a line, the bounty spec and the QA checklist go into the repo as the two documents everything gets measured against, and nothing I ship is allowed to drift outside them.\n\nThen I work straight down the checklist and verify every item locally before the PR goes up. The discipline is in not touching anything outside the spec. Bounties reward exact delivery, and over-engineering loses.",
    stackDetailed:
      "React Native · TypeScript · Expo · iOS/Android biometric APIs · WebSocket streaming · Anthropic SDK",
    result:
      "Three wins, three payouts, zero QA failures on first submission. Established the workflow as a reliable cash-generation mechanism alongside longer-term client builds.",
  },
  {
    slug: "acc-scraper",
    title: "ACC Business Scraper",
    description: "Automated LLC filing scraper for cold outreach.",
    status: "SHIPPED",
    stack: ["Playwright", "Node.js", "TypeScript", "Perplexity API"],
    thumbnailUrl: "/work/acc-scraper.webp",
    thumbnailLabel: "acc watcher / maricopa",
    year: "2026",
    context:
      "The Arizona Corporation Commission publishes every new LLC filing in the state. That's a live feed of people who just started a business and don't yet have a website, an accountant, or a real operation.\n\nIt's a gold mine for cold outreach if you can get to the data first.\n\nIn January 2026 the ACC replaced its old eCorp portal with a new system at arizonabusinesscenter.azcc.gov. The old scrapers in the wild stopped working. I built a new one.",
    constraints:
      "No public API. Everything is rendered client-side and requires interaction to reach the filings list.\n\nRate limiting on the portal punishes aggressive scraping.\n\nFilings include LLCs that are formed for legal structure but have no operating business behind them. Those are noise.\n\nContact data is not in the filings. You get a business name, an agent, and an address.",
    approach:
      "Built a Playwright scraper that runs on a schedule, hits the portal during low-traffic windows, pulls new Articles of Organization filed in Maricopa County within the last 24 hours, and deduplicates against a local seen-ids.json.\n\nEnrichment pipeline runs after scraping. Each new business goes to Perplexity with a prompt designed to find a website, a phone number, and an owner name. Perplexity's web grounding beats every structured data vendor I tested for brand-new businesses that don't have a web presence yet.\n\nScored leads and custom call openers get generated by Claude, pulling from the business name and any enrichment context. Output is a CSV ready to drop into a dialer or into cold email sequencer.",
    stackDetailed:
      "Playwright · Node.js · TypeScript · Perplexity API · Anthropic SDK · Docker · Hetzner VPS · cron",
    result:
      "Self-sustaining lead pipeline that feeds new Arizona businesses into cold outreach within 24 hours of them existing on paper. Runs unattended on a Hetzner VPS.",
  },
  {
    slug: "google-maps-scraper",
    title: "Google Maps Lead Scraper",
    description: "Targeted lead scraper for local service businesses.",
    status: "SHIPPED",
    stack: ["Playwright", "Python", "pandas", "asyncio"],
    thumbnailUrl: "/work/google-maps-scraper.webp",
    thumbnailLabel: "gmaps / phx hvac",
    year: "2026",
    context:
      "Outbound sales for local service businesses needs targeted lists. HVAC contractors in Phoenix with 20-300 Google reviews. Medspas in Scottsdale open more than three years. Plumbers in Mesa with a website but no blog.\n\nApollo, Outscraper, and the other structured-data vendors charge per lead and miss half the long tail. Google Maps has all of it, for free, if you can get it out.",
    constraints:
      "Google Maps rate-limits aggressive scraping and will serve stale or sparse results if you look like a bot.\n\nMaps results are paginated and lazy-loaded, which breaks naive scrapers.\n\nResults include chain locations, duplicates, and closed businesses that need filtering.\n\nPhone numbers and websites are behind a second click per result.",
    approach:
      "Playwright-driven with human-like scroll, randomized delays, and session rotation. Each search query (category + geography) triggers an exhaustive scroll to the end of results, then a per-result detail pull for phone, website, review count, and rating.\n\nDeduplication runs on normalized business name plus address. Filters strip chains (based on a known-chains list) and closed/temporarily-closed results.\n\nOutput is a structured CSV with business name, owner name where available, phone, website, review count, star rating, and address. Drops straight into Apollo for email enrichment or into a dialer for cold calls.",
    stackDetailed:
      "Playwright · Python · pandas · asyncio · proxy rotation · CSV export",
    result:
      "Built the initial lead list for BasisWeb cold outreach. 51 verified Phoenix-metro HVAC and plumbing leads in the first batch, feeding the cold email and call pipelines that followed.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacent(slug: string): {
  prev?: Project;
  next?: Project;
} {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return {
    prev: i > 0 ? projects[i - 1] : undefined,
    next: i < projects.length - 1 ? projects[i + 1] : undefined,
  };
}
