import {
  Users,
  Code2,
  Database,
  Table2,
  Utensils,
  Terminal,
  Workflow,
  Sparkles,
} from "lucide-react";
import { Section } from "@/components/section";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/button";
import { EmailReveal } from "@/components/email-reveal";
import { AnnotatedExhibit } from "@/components/annotated-exhibit";
import { WorkflowBand } from "@/components/workflow-band";
import { ShippedMarquee } from "@/components/shipped-marquee";
import { CaseFileCard } from "@/components/case-file-card";
import { TiltPlane } from "@/components/tilt-plane";
import { getProject } from "@/content/projects";

type Tone = "live" | "pending" | "neutral";
type IconType = React.ElementType;

const caseFiles: {
  label: string;
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
    label: "CRM + operations",
    href: "/work/inspection-revenue-engine",
    image: "/work/n8n-overview.png",
    imageAlt: "Live production dashboard: executions logged, zero failed.",
    statLead: "0 failed events",
    statRest: "across every audit.",
    status: { tone: "live", label: "Live in production" },
    priority: true,
  },
  {
    label: "Lead data",
    href: "/work/lead-data-engine",
    image: "/work/lead-data-engine-dashboard.png",
    imageAlt:
      "A recorded run of the lead engine, identifiers redacted: 31 discovered, 4 delivered.",
    statLead: "Graded 8/10",
    statRest: "on a paid pilot, then funded at $4,500.",
    status: { tone: "pending", label: "In build" },
  },
  {
    label: "AI implementation",
    href: "/work/ai-report-reviewer",
    image: "/work/ai-report-reviewer-dashboard.png",
    imageAlt:
      "The AI reviewer on a real inspection, client name redacted: 136 photos auto-sorted.",
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
  const flagship = getProject("inspection-revenue-engine");
  const exhibitA = flagship?.cover;

  return (
    <>
      {/* Hero: the artifact. A first-person lede, then Exhibit A at scale. */}
      <section id="top" className="px-gutter pt-16 pb-section-y" data-testid="hero">
        <div className="mx-auto max-w-container">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,42%)_minmax(0,58%)] lg:gap-14">
            <div className="exhibit-settle">
              <SectionLabel boxed label="On the record" className="mb-6" />
              <TiltPlane
                hitClassName="-m-2 p-2"
                perspective={520}
                maxDeg={16}
                liftZ={48}
              >
                <p
                  className="max-w-[28ch] font-sans text-[clamp(1.55rem,3.1vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.018em] text-ink"
                  data-testid="hero-lede"
                >
                  Every booking one inspection company takes now writes itself
                  into their CRM.{" "}
                  <span className="mark-phrase">Zero failed events</span> across
                  every audit. I build systems like that, and this page is the
                  proof.
                </p>
              </TiltPlane>
              <p
                className="mt-6 font-mono text-mono text-ink-muted"
                data-testid="hero-facts"
              >
                Surprise, AZ · solo · replies inside 24 hours
              </p>
              <div className="mt-8">
                <Button href="#contact" variant="primary" data-testid="cta-email">
                  Email me
                </Button>
              </div>
            </div>

            {exhibitA && (
              <div
                className="exhibit-settle"
                style={{ animationDelay: "120ms" }}
              >
                <AnnotatedExhibit
                  src={exhibitA.src}
                  alt={exhibitA.alt}
                  aspect={exhibitA.aspect ?? "aspect-[16/9]"}
                  callouts={exhibitA.callouts}
                  priority
                  letter="A"
                  label="Live dashboard · June 2026"
                  stamp={{ tone: "live", label: "Live in production" }}
                  caption="The live n8n dashboard, June 2026. Real production numbers, not test traffic. Hover to inspect."
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Case files */}
      <Section label="Case files" testId="work-section" id="work">
        <h2 className="text-h2 text-ink">Three systems, on the record.</h2>
        <p className="mt-2 text-small text-ink-muted">
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
              style={{ animationDelay: `${120 + i * 80}ms` }}
            >
              <CaseFileCard {...cf} />
            </div>
          ))}
        </div>
      </Section>

      {/* The wiring foldout */}
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
        <figure className="max-w-[62ch]">
          <div className="border-l-2 border-mark pl-6">
            <blockquote>
              <p className="font-serif text-[1.5rem] font-normal leading-snug text-ink sm:text-[1.9rem]">
                I&apos;ve been in the software development industry for over 30
                years, and he is one of the most professional people I&apos;ve
                worked with.
              </p>
            </blockquote>
            <p className="mt-5 font-serif text-body leading-relaxed text-ink-muted">
              &ldquo;He provided an extremely detailed and well-organized handoff
              document. That level of thoroughness is rare.&rdquo;
            </p>
          </div>
          <figcaption className="mt-6 font-mono text-mono text-ink-dim">
            Verified 5.0 Upwork review · 30-year software-industry veteran
          </figcaption>
        </figure>
      </Section>

      {/* About */}
      <Section label="About" testId="about-section" id="about">
        <p className="max-w-[60ch] font-serif text-body leading-relaxed text-ink">
          I work solo out of Surprise, Arizona. No team, no account manager, no
          handoff between the person who sells you and the person who builds. You
          talk to me, I build it, and I&apos;d rather show you a running system
          than a proposal about one.
        </p>
        <p className="mt-5 max-w-[60ch] font-serif text-body leading-relaxed text-ink-muted">
          The path here wasn&apos;t a bootcamp. I started with Java in AP
          Computer Science, then taught myself the rest one layer at a time:
          Python first, then TypeScript, Next.js, and Tailwind for the web side.
          College took me lower down the stack, into how operating systems
          actually run on both Windows and Ubuntu, and into networking. That is
          what turned me from someone who writes apps into someone who wires up
          whole systems. From there came n8n for automation, MySQL and Supabase
          for the data underneath, and now LLMs and AI to move faster than one
          person usually can.
        </p>

        <div className="mt-8">
          <p className="font-mono text-mono uppercase tracking-widest text-ink-dim">
            The stack
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Chip icon={Code2}>TypeScript · Next.js · Tailwind</Chip>
            <Chip icon={Terminal}>Linux · Windows · networking</Chip>
            <Chip icon={Workflow}>n8n automation</Chip>
            <Chip icon={Database}>MySQL · Supabase</Chip>
            <Chip icon={Sparkles}>LLMs &amp; AI</Chip>
          </div>
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
        <div className="border border-rule bg-paper-elev px-6 py-10 sm:px-10">
          <p className="mb-8 max-w-[52ch] font-serif text-h3 font-normal leading-snug text-ink">
            Email me and you get me, not a form or an assistant. Tell me
            what&apos;s leaking or what you want built, and if it&apos;s a fit the
            next step is a short call.
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
