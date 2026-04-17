export type ProjectStatus = "LIVE" | "SHIPPED";

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
  /**
   * Body sections in render order. Light writeups (the LIVE client
   * builds) only set context / stackDetailed / result. The three
   * internal SHIPPED projects carry the full post-mortem treatment.
   */
  context: string;
  constraints?: string;
  approach?: string;
  stackDetailed: string;
  result: string;
};

export const projects: Project[] = [
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
      "Next.js 14 \u00B7 TypeScript \u00B7 Tailwind \u00B7 shadcn/ui \u00B7 Supabase \u00B7 Twilio \u00B7 Resend \u00B7 Vercel",
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
      "Next.js 14 \u00B7 TypeScript \u00B7 Tailwind \u00B7 Framer Motion \u00B7 Vercel",
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
      "Next.js 14 \u00B7 TypeScript \u00B7 Tailwind \u00B7 Resend \u00B7 Supabase \u00B7 Cloudflare Turnstile \u00B7 Vercel",
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
      "Next.js \u00B7 TypeScript \u00B7 Tailwind \u00B7 Supabase \u00B7 n8n \u00B7 HouseCall Pro API \u00B7 Twilio",
    result:
      "First paying BasisWeb client. Operational system running real restaurant maintenance workflow across multiple locations. Work orders that previously required manual re-entry into two systems now flow in under 30 seconds from intake to technician.",
  },
  {
    slug: "warpspeed",
    title: "Warpspeed Bounties",
    description: "Head-to-head developer bounties, shipped under pressure.",
    status: "SHIPPED",
    stack: ["React Native", "TypeScript", "Expo", "Claude Code"],
    thumbnailUrl: "/work/warpspeed.webp",
    thumbnailLabel: "warpspeed / bounty-016",
    year: "2026",
    context:
      "Warpspeed is a platform where mobile and web developers compete head-to-head on spec'd bounties. Whoever ships clean code that passes the QA checklist first wins the payout. Everyone else goes home with nothing.\n\nI've won $1,320 across three bounties in this format: React Native calendar permissions ($330), an AI chat web portal ($330), and note-level biometric security ($660).",
    constraints:
      "The format punishes every inefficiency. No scope negotiation, no partial credit, no second chances if the QA checklist fails. The spec is the spec.\n\nTypical window from bounty drop to winning PR: 2 to 6 hours. Other developers are racing you in parallel.",
    approach:
      "I built a repeatable shipping workflow around Claude Code. For every bounty:\n\n1. Drop the bounty spec into BOUNTY_SPEC.md in the project root.\n2. Drop the QA checklist into QA_CHECKLIST.md.\n3. Point Claude Code at both files with instructions to work only against the spec, not add scope.\n4. Verify locally against the checklist before opening the PR.\n\nThe discipline is in not touching anything outside the spec. Bounties reward exact delivery. Over-engineering loses.",
    stackDetailed:
      "React Native \u00B7 TypeScript \u00B7 Expo \u00B7 iOS/Android biometric APIs \u00B7 WebSocket streaming \u00B7 Claude Code \u00B7 Anthropic SDK",
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
      "Playwright \u00B7 Node.js \u00B7 TypeScript \u00B7 Perplexity API \u00B7 Anthropic SDK \u00B7 Docker \u00B7 Hetzner VPS \u00B7 cron",
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
      "Playwright \u00B7 Python \u00B7 pandas \u00B7 asyncio \u00B7 proxy rotation \u00B7 CSV export",
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
