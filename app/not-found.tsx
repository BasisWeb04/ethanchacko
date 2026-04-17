import Link from "next/link";
import { SectionLabel } from "@/components/section-label";

export const metadata = {
  title: "Not Found",
  description: "That route isn't wired up.",
};

const buttonClass =
  "inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-fg font-mono text-mono uppercase tracking-widest hover:border-border-strong active:border-signal active:text-signal focus-visible:border-signal focus-visible:outline-none transition-colors duration-base";

export default function NotFound() {
  return (
    <section
      className="px-gutter py-section-y min-h-[70vh] flex items-center"
      data-testid="not-found"
    >
      <div className="mx-auto max-w-container w-full">
        <SectionLabel label="404" className="mb-8" />
        <h1 className="text-h1 text-fg mb-6">This route isn&apos;t wired.</h1>
        <p className="text-body text-fg-muted max-w-[52ch] mb-10 leading-relaxed">
          Either the URL is off or I haven&apos;t shipped this yet. Head back
          home or hit me up if something&apos;s broken.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className={buttonClass}
            data-testid="not-found-home"
          >
            GO HOME
          </Link>
          <a
            href="mailto:ethan@basisweb.net"
            className={buttonClass}
            data-testid="not-found-email"
          >
            EMAIL ME
          </a>
        </div>
      </div>
    </section>
  );
}
