import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/button";
import { WorkCard, Project } from "@/components/work-card";
import { EmailReveal } from "@/components/email-reveal";

const projects: Project[] = [
  {
    slug: "servicecalltracker",
    title: "ServiceCallTracker",
    description: "Real-time command center for service businesses.",
    status: "LIVE",
    stack: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Twilio"],
    liveUrl: "https://servicecalltracker.com",
    thumbnailUrl: "/work/servicecalltracker.webp",
    thumbnailLabel: "servicecalltracker.com",
  },
  {
    slug: "basisweb",
    title: "BasisWeb",
    description: "Agency platform and client gateway.",
    status: "LIVE",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    liveUrl: "https://basisweb.net",
    thumbnailUrl: "/work/basisweb.webp",
    thumbnailLabel: "basisweb.net",
  },
  {
    slug: "hammock",
    title: "Hammock Property Inspections",
    description: "Marketing site for a Florida Space Coast home inspector.",
    status: "LIVE",
    stack: ["Next.js", "TypeScript", "Tailwind", "Resend", "Supabase"],
    liveUrl: "https://hammockpropertyinspections.com",
    thumbnailUrl: "/work/hammock.webp",
    thumbnailLabel: "hammockpropertyinspections.com",
  },
  {
    slug: "operations-command",
    title: "Operations Command Center",
    description: "Work-order intake and routing for restaurant maintenance.",
    status: "LIVE",
    stack: ["Next.js", "TypeScript", "Supabase", "n8n", "Twilio"],
    liveUrl: "https://restaurun.basisweb.net",
    thumbnailUrl: "/work/operations-command.webp",
    thumbnailLabel: "restaurun.basisweb.net",
  },
  {
    slug: "warpspeed",
    title: "Warpspeed Bounties",
    description: "Head-to-head developer bounties, shipped under pressure.",
    status: "SHIPPED",
    stack: ["React Native", "TypeScript", "Expo", "Claude Code"],
    thumbnailUrl: "/work/warpspeed.webp",
    thumbnailLabel: "warpspeed / bounty-016",
  },
  {
    slug: "acc-scraper",
    title: "ACC Business Scraper",
    description: "Automated LLC filing scraper for cold outreach.",
    status: "SHIPPED",
    stack: ["Playwright", "Node.js", "TypeScript", "Perplexity API"],
    thumbnailUrl: "/work/acc-scraper.webp",
    thumbnailLabel: "acc watcher / maricopa",
  },
  {
    slug: "google-maps-scraper",
    title: "Google Maps Lead Scraper",
    description: "Targeted lead scraper for local service businesses.",
    status: "SHIPPED",
    stack: ["Playwright", "Python", "pandas", "asyncio"],
    thumbnailUrl: "/work/google-maps-scraper.webp",
    thumbnailLabel: "gmaps / phx hvac",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="px-gutter py-section-y" data-testid="hero">
        <div className="mx-auto max-w-container">
          <SectionLabel number="00" label="MANIFESTO" className="mb-8" />
          <h1 className="text-display text-fg">
            I build systems,
            <br />
            <span className="font-serif italic text-signal">
              not slide decks.
            </span>
          </h1>
          <p
            className="mt-6 text-lg text-fg-muted max-w-[48ch]"
            data-testid="hero-subhead"
          >
            Full-stack developer out of Phoenix. I ship software for agencies
            and businesses who need something built, not pitched.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/for-agencies" data-testid="cta-agencies">
              For Agencies &rarr;
            </Button>
            <Button href="/for-clients" data-testid="cta-brands">
              For Brands &rarr;
            </Button>
          </div>
        </div>
      </section>

      {/* Work grid */}
      <section
        id="work"
        className="px-gutter py-section-y"
        data-testid="work-section"
      >
        <div className="mx-auto max-w-container">
          <SectionLabel number="01" label="SELECTED WORK" className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <WorkCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section
        className="px-gutter py-section-y"
        data-testid="stack-section"
      >
        <div className="mx-auto max-w-container">
          <SectionLabel number="02" label="STACK" className="mb-10" />
          <p className="font-mono text-h2 text-fg leading-relaxed">
            Next.js &middot; TypeScript &middot; Tailwind &middot; shadcn/ui
            <br />
            Supabase &middot; n8n &middot; Python &middot; Playwright
            <br />
            Twilio &middot; Resend &middot; Vercel &middot; Claude API
          </p>
        </div>
      </section>

      {/* Contact */}
      <section
        className="px-gutter py-section-y"
        data-testid="contact-section"
      >
        <div className="mx-auto max-w-container">
          <SectionLabel number="03" label="CONTACT" className="mb-10" />
          <p className="text-h2 text-fg mb-8">
            Available for agency subcontracting
            <br />
            and direct client work.
          </p>
          <EmailReveal />
          <div className="mt-8 flex flex-col gap-2 font-mono text-mono text-fg-muted">
            <span>Currently in: Phoenix, AZ</span>
            <span>Response time: within 24 hours</span>
          </div>
        </div>
      </section>
    </>
  );
}
