import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/button";

export const metadata = {
  title: "Not found",
  description: "That route isn't wired up.",
};

export default function NotFound() {
  return (
    <section
      className="px-gutter py-section-y min-h-[70vh] flex items-center"
      data-testid="not-found"
    >
      <div className="mx-auto max-w-container w-full">
        <SectionLabel label="404" className="mb-8" />
        <h1 className="text-h1 text-ink mb-6">This route isn&apos;t wired.</h1>
        <p className="text-body text-ink-muted max-w-[52ch] mb-10 leading-relaxed">
          Either the URL is off or I haven&apos;t shipped this yet. Head back
          home, or email me if something looks broken.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href="/" data-testid="not-found-home">
            Go home
          </Button>
          <a
            href="mailto:ethan@basisweb.net"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-ink text-ink font-sans text-[0.95rem] hover:bg-ink hover:text-paper transition-colors duration-base"
            data-testid="not-found-email"
          >
            Email me
          </a>
        </div>
      </div>
    </section>
  );
}
