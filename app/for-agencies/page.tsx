import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { EmailReveal } from "@/components/email-reveal";
import { StackArchitecture } from "@/components/stack-architecture";
import { BuildShowcase } from "@/components/build-showcase";

export const metadata: Metadata = {
  title: "For Agencies",
  description: "A second pair of hands that ships under your brand.",
  openGraph: {
    title: "For Agencies | Ethan Chacko",
    description: "A second pair of hands that ships under your brand.",
    url: "https://ethanchacko.com/for-agencies",
  },
  twitter: {
    title: "For Agencies | Ethan Chacko",
    description: "A second pair of hands that ships under your brand.",
  },
};

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
    label: "STACK",
    body: (
      <span className="font-mono">
        Next.js &middot; TypeScript &middot; React Native &middot; Python &middot; n8n
      </span>
    ),
  },
  {
    label: "COMMS",
    body: "Daily updates, weekly updates, or silent-until-shipped. Your call.",
  },
  {
    label: "FIT",
    body: (
      <>
        Production builds, integrations, scrapers, dashboards, internal tools,
        API work.
        <br />
        <span className="text-fg-muted">
          Not a fit for: brand strategy, copywriting, visual design leadership.
        </span>
      </>
    ),
  },
];

export default function ForAgenciesPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-gutter py-section-y" data-testid="agencies-hero">
        <div className="mx-auto max-w-container">
          <SectionLabel label="FOR AGENCIES" className="mb-8" />
          <h1 className="text-h1 text-fg">
            A second pair of hands
            <br />
            that{" "}
            <span className="font-serif italic text-signal">ships</span>{" "}
            under your brand.
          </h1>
        </div>
      </section>

      {/* Workflow */}
      <section
        className="px-gutter pb-section-y border-t border-border"
        data-testid="agencies-workflow"
      >
        <div className="mx-auto max-w-container pt-section-y">
          <SectionLabel label="WORKFLOW" className="mb-12" />
          <StackArchitecture />
        </div>
      </section>

      {/* What I build */}
      <section
        className="px-gutter pb-section-y border-t border-border"
        data-testid="agencies-showcase"
      >
        <div className="mx-auto max-w-container pt-section-y">
          <SectionLabel label="WHAT I BUILD" className="mb-12" />
          <h2 className="sr-only">What I build</h2>
          <BuildShowcase />
        </div>
      </section>

      {/* Contract sheet */}
      <section className="px-gutter pb-section-y" data-testid="agencies-sheet">
        <div className="mx-auto max-w-container">
          <dl className="border-t border-border">
            {rows.map((row) => (
              <div
                key={row.label}
                data-testid="sheet-row"
                className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-10 border-b border-border py-6"
              >
                <dt
                  data-testid="sheet-label"
                  className="font-mono text-mono uppercase tracking-widest text-fg-muted pt-[2px]"
                >
                  <span className="text-fg-dim">/</span>
                  <span className="ml-2">{row.label}</span>
                </dt>
                <dd className="text-body text-fg leading-relaxed">
                  {row.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-gutter py-section-y border-t border-border"
        data-testid="agencies-cta"
      >
        <div className="mx-auto max-w-container">
          <EmailReveal />
        </div>
      </section>
    </>
  );
}
