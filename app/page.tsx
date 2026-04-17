import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/button";
import { WorkCard } from "@/components/work-card";
import { WorkGridReveal } from "@/components/work-grid-reveal";
import { EmailReveal } from "@/components/email-reveal";
import { projects } from "@/content/projects";

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
          <h2 className="sr-only">Selected work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <WorkGridReveal key={project.slug} index={i}>
                <WorkCard project={project} priority={i < 3} />
              </WorkGridReveal>
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
          <h2 className="sr-only">Stack</h2>
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
        </div>
      </section>
    </>
  );
}
