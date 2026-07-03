import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { EmailReveal } from "@/components/email-reveal";
import { CaseFileCard } from "@/components/case-file-card";

type Tone = "live" | "pending" | "neutral";

const caseFiles: {
  caseLabel: string;
  href: string;
  image: string;
  imageAlt: string;
  illustration?: boolean;
  statLead: string;
  statRest: string;
  status: { tone: Tone; label: string };
  priority?: boolean;
}[] = [
  {
    caseLabel: "Case 01 · CRM + Ops",
    href: "/work/inspection-revenue-engine",
    image: "/work/n8n-overview.png",
    imageAlt:
      "Live production dashboard for the CRM and operations build: executions logged, zero failed.",
    statLead: "0 failed events",
    statRest: "across every audit of the live system.",
    status: { tone: "live", label: "Live in production" },
    priority: true,
  },
  {
    caseLabel: "Case 02 · Lead data",
    href: "/work/lead-data-engine",
    image: "/work/lead-data-engine-illustration.webp",
    imageAlt: "Illustration of the lead-data deliverable format.",
    illustration: true,
    statLead: "Graded 8/10",
    statRest: "on a paid pilot, then funded at $4,500.",
    status: { tone: "pending", label: "In build" },
  },
  {
    caseLabel: "Case 03 · AI implementation",
    href: "/work/ai-report-reviewer",
    image: "/work/ai-report-reviewer-illustration.webp",
    imageAlt: "Illustration of the AI review scorecard format.",
    illustration: true,
    statLead: "Holds",
    statRest: "where the client's DIY ChatGPT attempts drifted.",
    status: { tone: "live", label: "Running on his real reports" },
  },
];

const moreBuilds: {
  slug: string;
  title: string;
  line: string;
  liveUrl?: string;
  liveLabel?: string;
}[] = [
  {
    slug: "servicecalltracker",
    title: "ServiceCallTracker",
    line: "A real-time command center that pulls leads, jobs, revenue, and reviews onto one screen.",
    liveUrl: "https://servicecalltracker.com",
    liveLabel: "servicecalltracker.com",
  },
  {
    slug: "basisweb",
    title: "BasisWeb",
    line: "My agency platform and client gateway, with free contractor tools that rank in search.",
    liveUrl: "https://basisweb.net",
    liveLabel: "basisweb.net",
  },
  {
    slug: "hammock",
    title: "Hammock Property Inspections",
    line: "A marketing site for a Florida home inspector, handed off to run on his own account.",
    liveUrl: "https://hammockpropertyinspections.com",
    liveLabel: "hammockpropertyinspections.com",
  },
  {
    slug: "operations-command",
    title: "Operations Command Center",
    line: "Work-order intake and routing for restaurant maintenance across multiple locations.",
    liveUrl: "https://restaurun.basisweb.net",
    liveLabel: "restaurun.basisweb.net",
  },
  {
    slug: "warpspeed",
    title: "Warpspeed Bounties",
    line: "Head-to-head developer bounties shipped under pressure. Three wins, zero QA failures.",
  },
  {
    slug: "acc-scraper",
    title: "ACC Business Scraper",
    line: "A scraper that feeds brand-new Arizona businesses into cold outreach within a day of filing.",
  },
  {
    slug: "google-maps-scraper",
    title: "Google Maps Lead Scraper",
    line: "Targeted, filtered lead lists for local service businesses, straight from Maps.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="px-gutter pt-20 pb-section-y" data-testid="hero">
        <div className="mx-auto max-w-container">
          <h1
            className="exhibit-settle text-display text-ink max-w-[15ch]"
            style={{ animationDelay: "60ms" }}
          >
            I build <span className="mark-phrase">systems</span>, not slide
            decks.
          </h1>
          <p
            className="exhibit-settle mt-7 max-w-[60ch] text-body leading-relaxed text-ink-muted"
            style={{ animationDelay: "150ms" }}
            data-testid="hero-subhead"
          >
            I&apos;m Ethan Chacko. I build the operational systems service
            businesses run on. CRMs that actually get used, lead engines the
            client owns outright, and AI that still works a month after the demo.
            I&apos;m in Surprise, Arizona. Everything below is a real system I
            built, with real screenshots to prove it.
          </p>
          <div
            className="exhibit-settle mt-9"
            style={{ animationDelay: "240ms" }}
          >
            <Button href="#contact" data-testid="cta-email">
              Email me
            </Button>
          </div>
          <dl
            className="exhibit-settle mt-14 grid max-w-[640px] grid-cols-1 gap-6 border-t border-rule pt-8 sm:grid-cols-3"
            style={{ animationDelay: "320ms" }}
            data-testid="hero-facts"
          >
            {[
              ["Based in", "Surprise, AZ"],
              ["Works with", "Service businesses + agencies"],
              ["Replies", "Within 24 hours"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="mb-1 font-mono text-[0.7rem] uppercase tracking-widest text-ink-dim">
                  {label}
                </dt>
                <dd className="font-mono text-mono text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Receipts strip: the three case files */}
      <Section label="Case files" testId="work-section" id="work">
        <h2 className="text-h2 text-ink">Three systems, on the record.</h2>
        <p className="mt-3 max-w-[56ch] text-body leading-relaxed text-ink-muted">
          Every one of these is a real build. The cards say what is live, what is
          in build, and what I will not claim yet.
        </p>
        <div
          data-testid="receipts-strip"
          className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {caseFiles.map((cf, i) => (
            <div
              key={cf.href}
              className="exhibit-settle h-full"
              style={{ animationDelay: `${200 + i * 90}ms` }}
            >
              <CaseFileCard {...cf} />
            </div>
          ))}
        </div>
      </Section>

      {/* More builds ledger */}
      <Section label="More builds" testId="more-builds-section">
        <h2 className="text-h2 text-ink">More on file.</h2>
        <ul className="mt-8 border-t border-rule" data-testid="more-builds">
          {moreBuilds.map((b) => (
            <li key={b.slug} className="border-b border-rule">
              <div className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-baseline md:gap-8">
                <div>
                  <Link
                    href={`/work/${b.slug}`}
                    className="text-h3 text-ink underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-base hover:decoration-mark"
                  >
                    {b.title}
                  </Link>
                  <p className="mt-1.5 max-w-[60ch] text-small leading-relaxed text-ink-muted">
                    {b.line}
                  </p>
                </div>
                {b.liveUrl ? (
                  <a
                    href={b.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 font-mono text-mono text-ink-dim transition-colors duration-base hover:text-ink"
                  >
                    {b.liveLabel}
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                ) : (
                  <span className="font-mono text-mono uppercase tracking-widest text-ink-dim">
                    Tool
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Testimonial */}
      <Section label="Review" testId="testimonial-section">
        <figure className="max-w-[64ch]">
          <blockquote className="space-y-5">
            <p className="text-h3 font-normal leading-relaxed text-ink">
              &ldquo;I&apos;ve been in the software development industry for over
              30 years, and he is one of the most professional people I&apos;ve
              worked with. He is highly attentive, communicates clearly, and
              follows requirements exactly while still offering thoughtful input
              when appropriate.&rdquo;
            </p>
            <p className="text-body leading-relaxed text-ink-muted">
              &ldquo;He provided an extremely detailed and well-organized handoff
              document that clearly explains the entire setup. That level of
              thoroughness is rare.&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-7 font-mono text-mono uppercase tracking-widest text-ink-dim">
            Verified 5.0 Upwork review · 30-year software-industry veteran
          </figcaption>
        </figure>
      </Section>

      {/* About */}
      <Section label="About" testId="about-section" id="about">
        <div className="max-w-[62ch] space-y-5 text-body leading-relaxed text-ink">
          <p>
            I work solo out of Surprise, Arizona. No team, no account manager, no
            handoff between the person who sells you and the person who builds.
            You talk to me and I build it.
          </p>
          <p>
            My clients so far: a multi-inspector home inspection company, a
            25-year transportation veteran who tests his vendors harder than
            anyone I&apos;ve met, restaurant operators, and a handful of agencies
            who white-label my work. The common thread is that I&apos;d rather
            show you a running system than a proposal about one.
          </p>
        </div>
      </Section>

      {/* Contact */}
      <Section label="Contact" testId="contact-section" id="contact">
        <p className="mb-8 max-w-[54ch] text-h3 font-normal leading-snug text-ink">
          Email me and you get me, not a form and not an assistant. Tell me
          what&apos;s leaking or what you&apos;re trying to build. If it looks
          like a fit, the next step is a short phone call.
        </p>
        <EmailReveal />
        <div className="mt-8 flex flex-col gap-2 font-mono text-mono text-ink-muted">
          <span>Based in Surprise, AZ</span>
          <span>Replies within 24 hours</span>
        </div>
      </Section>
    </>
  );
}
