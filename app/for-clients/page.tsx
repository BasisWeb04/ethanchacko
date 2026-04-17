import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { EmailReveal } from "@/components/email-reveal";

export const metadata: Metadata = {
  title: "For Brands / Ethan Chacko",
  description:
    "One developer, full ownership. Custom builds for founders, service businesses, and ops teams.",
};

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

      {/* Body */}
      <section className="px-gutter pb-section-y">
        <div className="mx-auto max-w-container space-y-16">
          <p className="text-body text-fg-muted max-w-[56ch] text-lg leading-relaxed">
            Most agencies will sell you a team of five and bill you for eight.
            I&apos;m one person who builds the whole thing, knows every line of
            your code, and hands it off clean.
          </p>

          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="font-mono text-mono uppercase tracking-widest text-fg-dim mb-4">
                BEST FIT IF
              </p>
              <ul className="space-y-3 text-body text-fg leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-fg-dim">&middot;</span>
                  <span>
                    You&apos;re a service business, SaaS founder, or ops team
                    with something specific that needs building
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-fg-dim">&middot;</span>
                  <span>You care about code that still works in two years</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-fg-dim">&middot;</span>
                  <span>
                    You want one point of contact, not a project manager
                    forwarding emails
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-mono uppercase tracking-widest text-fg-dim mb-4">
                NOT A FIT IF
              </p>
              <ul className="space-y-3 text-body text-fg-muted leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-fg-dim">&middot;</span>
                  <span>
                    You need a design team, brand strategy, or marketing
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-fg-dim">&middot;</span>
                  <span>
                    You want a rotating cast of juniors at agency margins
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-fg-dim">&middot;</span>
                  <span>
                    You don&apos;t know what you want built yet (go hire a
                    product consultant first)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What gets built */}
      <section
        className="px-gutter py-section-y border-t border-border"
        data-testid="clients-built"
      >
        <div className="mx-auto max-w-container">
          <SectionLabel label="WHAT GETS BUILT" className="mb-8" />
          <p className="font-mono text-h2 text-fg leading-relaxed">
            Custom dashboards &middot; Lead platforms &middot; Internal tools
            <br />
            Scrapers &amp; automation &middot; API integrations
            <br />
            Full-stack web apps &middot; Mobile (React Native)
          </p>
        </div>
      </section>

      {/* Engagement options */}
      <section
        className="px-gutter py-section-y border-t border-border"
        data-testid="clients-engagement"
      >
        <div className="mx-auto max-w-container grid gap-10 md:grid-cols-3">
          <div>
            <SectionLabel label="BUILD" className="mb-4" />
            <p className="text-body text-fg leading-relaxed">
              Scoped project, fixed price, 2-8 week timelines.
            </p>
          </div>
          <div>
            <SectionLabel label="RETAINER" className="mb-4" />
            <p className="text-body text-fg leading-relaxed">
              Ongoing dev work, hourly, minimum 10hr/week.
            </p>
          </div>
          <div>
            <SectionLabel label="RESCUE" className="mb-4" />
            <p className="text-body text-fg leading-relaxed">
              Inherited code that&apos;s on fire. I&apos;ve fixed worse.
            </p>
          </div>
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
