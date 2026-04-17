import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/button";

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
    </>
  );
}
