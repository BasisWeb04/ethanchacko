import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { EmailReveal } from "@/components/email-reveal";

export const metadata: Metadata = {
  title: "For Agencies / Ethan Chacko",
  description:
    "White-label subcontracting for agencies who need production code delivered on deadline.",
};

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

      {/* Body */}
      <section className="px-gutter pb-section-y">
        <div className="mx-auto max-w-container grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <p className="text-body text-fg-muted max-w-[52ch] leading-relaxed">
            I work white-label with agencies who need production code delivered
            on deadline. No attribution required, no client contact unless you
            want it, no surprises.
          </p>
          <div>
            <p className="font-mono text-mono uppercase tracking-widest text-fg-dim mb-4">
              WHAT YOU GET
            </p>
            <ul className="space-y-3 text-body text-fg">
              <li className="flex gap-3">
                <span className="text-fg-dim">&middot;</span>
                <span>Senior full-stack output at contractor rates</span>
              </li>
              <li className="flex gap-3">
                <span className="text-fg-dim">&middot;</span>
                <span>Ship discipline (I don&apos;t get stuck)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-fg-dim">&middot;</span>
                <span>
                  Stack fluency across Next, React Native, Python, n8n
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-fg-dim">&middot;</span>
                <span>Clean handoffs with docs your team can own</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        className="px-gutter py-section-y border-t border-border"
        data-testid="agencies-how"
      >
        <div className="mx-auto max-w-container grid gap-10 md:grid-cols-3">
          <div>
            <SectionLabel number="01" label="BRIEF" className="mb-4" />
            <p className="text-body text-fg leading-relaxed">
              You send scope and deadline.
              <br />
              I confirm within 24 hours whether I can ship it.
            </p>
          </div>
          <div>
            <SectionLabel number="02" label="BUILD" className="mb-4" />
            <p className="text-body text-fg leading-relaxed">
              I work against your spec under NDA.
              <br />
              Daily updates if you want them, silent if you don&apos;t.
            </p>
          </div>
          <div>
            <SectionLabel number="03" label="HANDOFF" className="mb-4" />
            <p className="text-body text-fg leading-relaxed">
              Clean repo, docs, deployment notes.
              <br />
              You own everything.
            </p>
          </div>
        </div>
      </section>

      {/* Rate */}
      <section className="px-gutter py-section-y border-t border-border">
        <div className="mx-auto max-w-container">
          <SectionLabel label="RATE" className="mb-6" />
          <p className="text-h2 text-fg max-w-[36ch] leading-tight">
            Starts at $65/hr. Fixed-price on scoped builds.
            <br />
            Priority slots for repeat agencies.
          </p>
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
