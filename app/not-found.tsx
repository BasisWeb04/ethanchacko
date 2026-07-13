import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/button";

export const metadata = {
  title: "Not found",
  description: "That route isn't on file.",
};

export default function NotFound() {
  return (
    <section
      className="flex min-h-[70vh] items-center px-gutter py-section-y"
      data-testid="not-found"
    >
      <div className="mx-auto w-full max-w-container">
        <SectionLabel boxed label="404 · not on file" className="mb-8" />
        <h1 className="mb-6 text-h1 text-ink">This page is not on file.</h1>
        <p className="mb-10 max-w-[52ch] font-serif text-body leading-relaxed text-ink-muted">
          Either the URL is off or I haven&apos;t shipped this yet. Head back
          home, or email me if something looks broken.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href="/" variant="primary" data-testid="not-found-home">
            Go home
          </Button>
          <a
            href="mailto:ethan@basisweb.net"
            className="inline-flex items-center justify-center gap-2 border border-ink px-5 py-2.5 font-sans text-[0.9rem] font-semibold text-ink transition-colors duration-base hover:border-mark hover:bg-mark hover:text-[color:var(--on-mark)]"
            data-testid="not-found-email"
          >
            Email me
          </a>
        </div>
      </div>
    </section>
  );
}
