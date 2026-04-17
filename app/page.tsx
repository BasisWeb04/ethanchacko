import { SectionLabel } from "@/components/section-label";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { WorkGrid } from "@/components/work-grid";
import { EmailReveal } from "@/components/email-reveal";
import { HeroSerifReveal } from "@/components/hero-reveal";

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
            <HeroSerifReveal>not slide decks.</HeroSerifReveal>
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
          <div
            data-testid="hero-metadata"
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-[640px] pt-8 border-t border-border"
          >
            <div>
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-dim mb-1">
                BASED IN
              </div>
              <div className="font-mono text-mono text-fg">Phoenix, AZ</div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-dim mb-1">
                AVAILABLE FOR
              </div>
              <div className="font-mono text-mono text-fg">
                Subcontracting + direct
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-dim mb-1">
                RESPONDING
              </div>
              <div className="font-mono text-mono text-fg">Within 24 hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* Work grid */}
      <Section number="01" label="SELECTED WORK" testId="work-section">
        <h2 id="work" className="sr-only scroll-mt-24">
          Selected work
        </h2>
        <WorkGrid />
      </Section>

      {/* Stack */}
      <Section number="02" label="STACK" testId="stack-section">
        <h2 className="sr-only">Stack</h2>
        <p className="font-mono text-h2 text-fg leading-relaxed">
          Next.js &middot; TypeScript &middot; Tailwind &middot; shadcn/ui
          <br />
          Supabase &middot; n8n &middot; Python &middot; Playwright
          <br />
          Twilio &middot; Resend &middot; Vercel &middot; Claude API
        </p>
      </Section>

      {/* Contact */}
      <Section number="03" label="CONTACT" testId="contact-section">
        <h2 className="sr-only">Contact</h2>
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
      </Section>
    </>
  );
}
