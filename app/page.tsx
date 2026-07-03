import {
  MapPin,
  User,
  Users,
  Clock,
  Code2,
  Database,
  LayoutDashboard,
  Table2,
  Utensils,
  Bot,
  Quote,
} from "lucide-react";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { EmailReveal } from "@/components/email-reveal";
import { StatusDot } from "@/components/status-dot";
import { GridBackground } from "@/components/grid-background";
import { TiltHeadline } from "@/components/tilt-headline";
import { HeroDevice } from "@/components/hero-device";
import { WorkflowBand } from "@/components/workflow-band";
import { ShippedMarquee } from "@/components/shipped-marquee";
import { CaseFileCard } from "@/components/case-file-card";

type Tone = "live" | "pending" | "neutral";
type IconType = React.ElementType;

const caseFiles: {
  caseLabel: string;
  href: string;
  image: string;
  imageAlt: string;
  icon: IconType;
  illustration?: boolean;
  light?: boolean;
  statLead: string;
  statRest: string;
  status: { tone: Tone; label: string };
  priority?: boolean;
}[] = [
  {
    caseLabel: "Case 01 · CRM + Ops",
    href: "/work/inspection-revenue-engine",
    image: "/work/n8n-overview.png",
    imageAlt: "Live production dashboard: executions logged, zero failed.",
    icon: Database,
    light: true,
    statLead: "0 failed events",
    statRest: "across every audit.",
    status: { tone: "live", label: "Live in production" },
    priority: true,
  },
  {
    caseLabel: "Case 02 · Lead data",
    href: "/work/lead-data-engine",
    image: "/work/lead-data-engine-illustration.webp",
    imageAlt: "Illustration of the lead-data deliverable format.",
    icon: Table2,
    illustration: true,
    statLead: "Graded 8/10",
    statRest: "on a paid pilot, then funded at $4,500.",
    status: { tone: "pending", label: "In build" },
  },
  {
    caseLabel: "Case 03 · AI",
    href: "/work/ai-report-reviewer",
    image: "/work/ai-report-reviewer-illustration.webp",
    imageAlt: "Illustration of the AI review scorecard format.",
    icon: Bot,
    illustration: true,
    statLead: "Holds",
    statRest: "where the client's DIY ChatGPT drifted.",
    status: { tone: "live", label: "Running on his real reports" },
  },
];

function Chip({
  icon: Icon,
  children,
}: {
  icon: IconType;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-rule px-3 py-1 font-mono text-[0.72rem] text-ink-muted">
      <Icon size={12} className="text-mark" />
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        id="top"
        className="relative overflow-hidden px-gutter pt-16 pb-section-y"
        data-testid="hero"
      >
        <GridBackground />
        <div className="mx-auto flex min-h-[82vh] max-w-container items-center">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,43%)_minmax(0,57%)] lg:gap-14">
            <div>
              <span className="inline-flex items-center rounded-full border border-rule bg-paper-elev/50 px-3 py-1">
                <StatusDot tone="live" label="status: live · production" />
              </span>
              <TiltHeadline
                wrapperClassName="mt-6"
                className="max-w-[14ch] text-display text-ink"
                delayMs={60}
              />
              <p
                className="exhibit-settle mt-6 max-w-[46ch] text-body leading-relaxed text-ink-muted"
                style={{ animationDelay: "150ms" }}
                data-testid="hero-subhead"
              >
                The CRMs, lead engines, and AI that service businesses actually
                run on. Every claim below is a real screenshot.
              </p>
              <div
                className="exhibit-settle mt-8 flex flex-wrap items-center gap-3"
                style={{ animationDelay: "240ms" }}
                data-testid="hero-facts"
              >
                <Button href="#contact" data-testid="cta-email">
                  Email me
                </Button>
                <Chip icon={MapPin}>Surprise, AZ</Chip>
                <Chip icon={User}>Solo build</Chip>
                <Chip icon={Clock}>Replies &lt; 24h</Chip>
              </div>
            </div>
            <HeroDevice />
          </div>
        </div>
      </section>

      {/* Case files */}
      <Section label="Case files" testId="work-section" id="work">
        <h2 className="text-h2 text-ink">Three systems, on the record.</h2>
        <p className="mt-2 font-mono text-mono uppercase tracking-widest text-ink-dim">
          What is live · what is in build · what I will not claim yet
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

      {/* Workflow band */}
      <WorkflowBand />

      {/* Honesty beat */}
      <section className="border-t border-rule px-gutter py-section-y">
        <div className="mx-auto max-w-container text-center">
          <div className="mx-auto mb-6 h-px w-16 bg-mark" />
          <p className="mx-auto max-w-[34ch] font-mono text-h3 leading-snug text-ink">
            Every number here is real, or it isn&apos;t here yet.
          </p>
        </div>
      </section>

      {/* Shipped marquee */}
      <section
        className="border-t border-rule py-section-y"
        data-testid="more-builds-section"
      >
        <div className="mx-auto mb-9 max-w-container px-gutter">
          <h2 className="text-h2 text-ink">More on file.</h2>
          <p className="mt-2 font-mono text-mono uppercase tracking-widest text-ink-dim">
            Shipped builds and tools · click to open
          </p>
        </div>
        <ShippedMarquee />
      </section>

      {/* Review */}
      <Section label="Review" testId="testimonial-section">
        <figure className="relative max-w-[62ch]">
          <Quote
            className="absolute -left-1 -top-3 text-mark/40"
            size={46}
            aria-hidden="true"
          />
          <blockquote className="relative pt-6">
            <p className="text-h2 font-normal leading-snug text-ink">
              I&apos;ve been in the software development industry for over 30
              years, and he is one of the most professional people I&apos;ve
              worked with.
            </p>
          </blockquote>
          <p className="mt-5 text-body leading-relaxed text-ink-dim">
            &ldquo;He provided an extremely detailed and well-organized handoff
            document. That level of thoroughness is rare.&rdquo;
          </p>
          <figcaption className="mt-6 font-mono text-mono uppercase tracking-widest text-ink-dim">
            Verified 5.0 Upwork review · 30-year software-industry veteran
          </figcaption>
        </figure>
      </Section>

      {/* About */}
      <Section label="About" testId="about-section" id="about">
        <p className="max-w-[60ch] text-body leading-relaxed text-ink">
          I work solo out of Surprise, Arizona. No team, no account manager, no
          handoff between the person who sells you and the person who builds.
          You talk to me, I build it, and I&apos;d rather show you a running
          system than a proposal about one.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Chip icon={User}>Solo full-stack builder</Chip>
          <Chip icon={Code2}>Next.js · React · TypeScript</Chip>
          <Chip icon={Bot}>AI &amp; LLM automation</Chip>
          <Chip icon={LayoutDashboard}>Dashboards &amp; internal tools</Chip>
        </div>

        <div className="mt-10">
          <p className="font-mono text-mono uppercase tracking-widest text-ink-dim">
            Built for
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Chip icon={Database}>Multi-inspector inspection co</Chip>
            <Chip icon={Table2}>25-year transportation vet</Chip>
            <Chip icon={Utensils}>Restaurant operators</Chip>
            <Chip icon={Users}>White-label agencies</Chip>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section label="Contact" testId="contact-section" id="contact">
        <div className="relative overflow-hidden rounded-2xl border border-rule-strong bg-paper-elev/40 px-6 py-10 sm:px-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 80% at 15% 0%, rgba(46,155,255,0.10), transparent 60%)",
            }}
          />
          <p className="mb-8 max-w-[52ch] text-h3 font-normal leading-snug text-ink">
            Email me and you get me, not a form or an assistant. Tell me
            what&apos;s leaking or what you want built, and if it&apos;s a fit
            the next step is a short call.
          </p>
          <EmailReveal />
          <div className="mt-8 flex flex-col gap-2 font-mono text-mono text-ink-muted">
            <span>Based in Surprise, AZ</span>
            <span>Replies within 24 hours</span>
          </div>
        </div>
      </Section>
    </>
  );
}
