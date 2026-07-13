import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { Section } from "@/components/section";
import { EmailReveal } from "@/components/email-reveal";
import { StackArchitecture } from "@/components/stack-architecture";
import { BuildShowcase } from "@/components/build-showcase";

export const metadata: Metadata = {
  title: "For Agencies",
  description:
    "The integration-heavy GHL, n8n, and custom builds most subcontractors won't take. A second pair of hands that ships production systems under your brand.",
  openGraph: {
    title: "For Agencies | Ethan Chacko",
    description:
      "The integration-heavy GHL, n8n, and custom builds most subcontractors won't take. A second pair of hands that ships under your brand.",
    url: "https://ethanchacko.com/for-agencies",
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
    title: "For Agencies | Ethan Chacko",
    description:
      "The integration-heavy GHL, n8n, and custom builds most subcontractors won't take. A second pair of hands that ships under your brand.",
    images: ["/opengraph-image"],
  },
};

type Stat = { value: string; label: string; signal?: boolean };

const stats: Stat[] = [
  { value: "0", label: "failed events, every audit", signal: true },
  { value: "0%", label: "failure rate", signal: true },
  { value: "318", label: "prod executions / snapshot" },
  { value: "0.7s", label: "average run time" },
];

type Row = {
  label: string;
  body: React.ReactNode;
};

const rows: Row[] = [
  {
    label: "SCOPE",
    body: "White-label contract dev for agencies. I ship production code against your spec, under your brand, on your timeline.",
  },
  {
    label: "OWNERSHIP",
    body: "No attribution required. Clean handoff. You own everything.",
  },
  {
    label: "TURNAROUND",
    body: "24-hour response on briefs. Build windows from 1 to 6 weeks depending on scope.",
  },
  {
    label: "PRICING",
    body: (
      <>
        Published up front, pinned to scope on the call. Audit / teardown
        $299&ndash;499 (credited toward a build). Setup-and-go from ~$2,500.
        Full integration $3,500&ndash;8,000, scoped. Monthly management
        $400&ndash;800.
        <br />
        <span className="text-ink-muted">
          For the right scope I&apos;ll put part of the fee on results, since I
          build the measurement in.
        </span>
      </>
    ),
  },
  {
    label: "STACK",
    body: (
      <span className="font-mono">
        Next.js &middot; TypeScript &middot; Python &middot; n8n &middot;
        GoHighLevel &middot; React Native
      </span>
    ),
  },
  {
    label: "COMMS",
    body: "Daily updates, weekly updates, or silent-until-shipped. Your call. US-based, real-time overlap with US hours.",
  },
  {
    label: "FIT",
    body: (
      <>
        Production builds, integrations, scrapers, dashboards, internal tools,
        API work.
        <br />
        <span className="text-ink-muted">
          Not a fit for: brand strategy, copywriting, visual design leadership.
        </span>
      </>
    ),
  },
];

type QA = { q: string; a: React.ReactNode };

const faq: QA[] = [
  {
    q: "Will you go around me to my client?",
    a: (
      <p>
        No. Your client is yours. I&apos;m invisible by default, the work ships
        under your brand, and all client-facing contact routes through you.
        Going around a partner ends the partner and the referrals, so it
        isn&apos;t in my interest either.
      </p>
    ),
  },
  {
    q: "What if it breaks after launch?",
    a: (
      <p>
        The integrations I build ship with automated failure alerting, so you
        hear about a failed event the moment it happens, not weeks later
        through missing leads. The build above has run its production
        executions with zero failed events at every audit. On a management
        retainer, incident response is part of the deal.
      </p>
    ),
  },
  {
    q: "Can you actually white-label, fully?",
    a: (
      <p>
        Yes. Your brand on everything, clean documentation, no visible seams,
        no trace of me unless you choose to introduce one. Start with one small
        paid build and judge the artifact before you route real client work my
        way.
      </p>
    ),
  },
  {
    q: "How do we start?",
    a: (
      <p>
        Email me a build you&apos;re stuck on, the integration with no native
        connector, the migration that keeps breaking, the automation nobody can
        figure out. I respond within 24 hours with whether it&apos;s a fit and
        how I&apos;d approach it.
      </p>
    ),
  },
];

export default function ForAgenciesPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-gutter py-section-y" data-testid="agencies-hero">
        <div className="mx-auto max-w-container">
          <SectionLabel boxed label="For agencies" className="mb-8" />
          <h1 className="text-h1 text-ink">
            A second pair of hands
            <br />
            that <span className="mark-phrase">ships</span> under your brand.
          </h1>
          <p className="mt-8 max-w-[58ch] font-serif text-body leading-relaxed text-ink-muted">
            The integration-heavy GoHighLevel, n8n, and custom builds most
            subcontractors won&apos;t take. The webhook plumbing with no native
            connector, the migrations that have to be right the first time, the
            attribution nobody can wire. I ship production systems that run,
            then hand them off clean.
          </p>
        </div>
      </section>

      {/* Proof */}
      <Section label="Proof" testId="agencies-proof">
        <h2 className="mb-6 text-h2 text-ink">One production build, still running.</h2>
        <p className="max-w-[64ch] font-serif text-body leading-relaxed text-ink-muted">
          A US home-inspection company needed their inspection software talking
          to GoHighLevel. No native connector exists. I built the bridge on
          self-hosted n8n and have run it in production since May 2026. The
          numbers below are measured off the live system. I speak to what it
          does and how reliably it runs, not to revenue, because the
          attribution layer is built and the live results are still ahead.
        </p>

        {/* Specifications */}
        <dl className="mt-10 grid grid-cols-2 border-l border-t border-rule sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              data-testid="proof-stat"
              className="border-b border-r border-rule px-5 py-6"
            >
              <dt className="font-mono text-h2 text-ink">
                {s.signal ? <span className="mark-phrase">{s.value}</span> : s.value}
              </dt>
              <dd className="mt-3 font-sans text-[0.66rem] font-semibold uppercase leading-snug tracking-[0.09em] text-ink-dim">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>

        {/* Screenshot, mounted as an exhibit */}
        <figure className="mt-12">
          <div className="relative overflow-hidden border border-rule bg-paper-elev">
            <div className="relative aspect-[16/9]">
              <Image
                src="/work/n8n-overview.png"
                alt="Live n8n production dashboard: 318 production executions, 0 failed, 0% failure rate, 0.7 second average run time, with the inspection-software-to-GoHighLevel integration workflows published."
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
          <figcaption className="mt-3 font-mono text-mono leading-snug text-ink-dim">
            Live n8n dashboard, June 2026. 318 prod executions, 0 failed, 0%
            failure rate, 0.7s avg.
          </figcaption>
        </figure>

        {/* Constraint story */}
        <div className="mt-12 max-w-[68ch] border-l-2 border-ink pl-6">
          <h3 className="mb-4 text-h3 text-ink">
            The build that proves judgment, not just competence.
          </h3>
          <p className="font-serif text-body leading-relaxed text-ink-muted">
            The original scope assumed a two-way sync. Discovery proved it was
            impossible: the inspection software is outbound-webhook-only, no
            inbound API, no write path. I put that in writing as a scope
            correction while there was still time to act on it, then
            re-architected around it. Forward enrichment on every booking, plus
            a one-time historical backfill of roughly 8,000 contacts and 6,500+
            opportunities, deduped. The client got a complete, continuously
            updated CRM and no fake sync pretending to work.
          </p>
          <p className="mt-6 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.09em] text-ink">
            The rule: impossible asks get caught at discovery, not at the
            deadline.
          </p>
        </div>

        {/* Full case study link */}
        <div className="mt-10">
          <Link
            href="/work/inspection-revenue-engine"
            className="inline-flex items-center gap-2 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.09em] text-ink transition-colors duration-base hover:text-mark-ink"
          >
            Read the full case study
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {/* Third-party review */}
        <div className="mt-12 max-w-[68ch] border-l-2 border-mark pl-6">
          <p className="font-serif text-body leading-relaxed text-ink">
            &ldquo;I&apos;ve been in the software development industry for over
            30 years, and he is one of the most professional people I&apos;ve
            worked with. He is highly attentive, communicates clearly, and
            follows requirements exactly while still offering thoughtful input
            when appropriate.&rdquo;
          </p>
          <p className="mt-4 font-serif text-body leading-relaxed text-ink-muted">
            &ldquo;He provided an extremely detailed and well-organized handoff
            document that clearly explains the entire setup. That level of
            thoroughness is rare.&rdquo;
          </p>
          <p className="mt-5 font-mono text-mono text-ink-dim">
            Verified 5.0 Upwork review, 30-year software-industry veteran
          </p>
        </div>
      </Section>

      {/* Workflow */}
      <Section label="Workflow" testId="agencies-workflow">
        <StackArchitecture />
      </Section>

      {/* What I build */}
      <Section label="What I build" testId="agencies-showcase">
        <h2 className="sr-only">What I build</h2>
        <BuildShowcase />
      </Section>

      {/* Terms sheet */}
      <Section label="Terms" testId="agencies-sheet">
        <dl className="border-t border-rule">
          {rows.map((row) => (
            <div
              key={row.label}
              data-testid="sheet-row"
              className="grid grid-cols-1 gap-3 border-b border-rule py-6 md:grid-cols-[180px_1fr] md:gap-10"
            >
              <dt
                data-testid="sheet-label"
                className="pt-[2px] font-sans text-[0.7rem] font-semibold uppercase tracking-[0.09em] text-ink-muted"
              >
                {row.label}
              </dt>
              <dd className="text-body leading-relaxed text-ink">{row.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* FAQ */}
      <Section label="Questions" testId="agencies-faq">
        <div className="max-w-[64ch]">
          <dl className="border-t border-rule">
            {faq.map(({ q, a }) => (
              <div
                key={q}
                data-testid="faq-item"
                className="border-b border-rule py-12"
              >
                <dt className="mb-6 font-sans text-[0.95rem] font-bold text-ink">
                  <span className="mr-2 text-ink-dim">Q.</span>
                  {q}
                </dt>
                <dd className="space-y-4 font-serif text-body leading-relaxed text-ink">
                  {a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* CTA */}
      <Section label="Contact" testId="agencies-cta">
        <EmailReveal />
      </Section>
    </>
  );
}
