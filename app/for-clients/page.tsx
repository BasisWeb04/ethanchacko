import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { EmailReveal } from "@/components/email-reveal";
import { ProcessTimeline } from "@/components/process-timeline";
import { BuildShowcase } from "@/components/build-showcase";

export const metadata: Metadata = {
  title: "For Brands",
  description: "One developer. Full ownership. Systems that run after I'm gone.",
  openGraph: {
    title: "For Brands | Ethan Chacko",
    description:
      "One developer. Full ownership. Systems that run after I'm gone.",
    url: "https://ethanchacko.com/for-clients",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ethan Chacko, Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "For Brands | Ethan Chacko",
    description:
      "One developer. Full ownership. Systems that run after I'm gone.",
    images: ["/opengraph-image"],
  },
};

type QA = {
  q: string;
  a: React.ReactNode;
};

const faq: QA[] = [
  {
    q: "What do I actually get?",
    a: (
      <>
        <p>
          One developer owns the whole build. You get code that still works in
          two years, a single point of contact instead of a project manager
          forwarding emails, and a clean handoff you can maintain or extend.
        </p>
        <p>
          No rotating cast of juniors. No surprise scope. No team of five
          billing you for eight.
        </p>
      </>
    ),
  },
  {
    q: "How long does this take?",
    a: (
      <p>
        Scoped projects run 2 to 8 weeks on a fixed price. Retainers run
        ongoing at an hourly rate with a 10 hour per week minimum. A rescue
        job on an inherited codebase gets scoped after I read the code.
      </p>
    ),
  },
  {
    q: "What if I already have a team?",
    a: (
      <p>
        Then you probably don&apos;t need me. Hire a single dev when the work
        is specific, the team is small, and you want one person who knows
        every line. If you already have three developers and a PM, bring in
        another agency. You&apos;ll get faster, noisier output. I&apos;m built
        for the opposite problem.
      </p>
    ),
  },
  {
    q: "Is this a fit for my project?",
    a: (
      <>
        <p>
          It&apos;s a fit if you&apos;re a service business, SaaS founder, or
          ops team with something specific that needs building. If you care
          about code that still runs two years from now. If you want one point
          of contact.
        </p>
        <p>
          It&apos;s not a fit if you need a design team, brand strategy, or
          marketing. If you want a rotating cast of juniors at agency margins.
          If you don&apos;t know what you want built yet. In the last case,
          hire a product consultant before you hire a developer.
        </p>
      </>
    ),
  },
  {
    q: "What gets built most often?",
    a: (
      <p>
        Custom dashboards. Lead platforms. Internal tools. Scrapers and
        automation. API integrations. Full-stack web apps. Mobile apps in
        React Native.
      </p>
    ),
  },
  {
    q: "How do we start?",
    a: (
      <p>
        Email me with what you need. I respond within 24 hours with whether
        it&apos;s a fit and a rough scope.
      </p>
    ),
  },
];

export default function ForClientsPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-gutter py-section-y" data-testid="clients-hero">
        <div className="mx-auto max-w-container">
          <SectionLabel label="FOR BRANDS" className="mb-8" />
          <h1 className="text-h1 text-fg leading-tight">
            One developer. Full ownership.
            <br />
            Systems that{" "}
            <span className="font-serif italic text-signal">run</span>{" "}
            after I&apos;m gone.
          </h1>
        </div>
      </section>

      {/* Process timeline */}
      <section
        className="px-gutter pb-section-y border-t border-border"
        data-testid="clients-process"
      >
        <div className="mx-auto max-w-container pt-section-y">
          <SectionLabel label="PROCESS" className="mb-12" />
          <ProcessTimeline />
        </div>
      </section>

      {/* What I build */}
      <section
        className="px-gutter pb-section-y border-t border-border"
        data-testid="clients-showcase"
      >
        <div className="mx-auto max-w-container pt-section-y">
          <SectionLabel label="WHAT I BUILD" className="mb-12" />
          <h2 className="sr-only">What I build</h2>
          <BuildShowcase />
        </div>
      </section>

      {/* FAQ */}
      <section className="px-gutter pb-section-y" data-testid="clients-faq">
        <div className="mx-auto max-w-[72ch]">
          <dl className="border-t border-border">
            {faq.map(({ q, a }) => (
              <div
                key={q}
                data-testid="faq-item"
                className="border-b border-border py-14"
              >
                <dt
                  data-testid="faq-question"
                  className="font-mono text-mono uppercase tracking-widest text-signal mb-6"
                >
                  <span className="text-signal-dim">Q.</span>
                  <span className="ml-3">{q}</span>
                </dt>
                <dd className="text-body text-fg leading-relaxed space-y-4 max-w-[60ch]">
                  {a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-gutter py-section-y border-t border-border"
        data-testid="clients-cta"
      >
        <div className="mx-auto max-w-container">
          <EmailReveal />
        </div>
      </section>
    </>
  );
}
