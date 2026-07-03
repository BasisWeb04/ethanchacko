import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-container px-gutter py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between font-mono text-mono text-ink-muted">
          <div className="flex flex-col gap-3">
            <a
              href="mailto:ethan@basisweb.net"
              className="text-ink hover:text-ink-muted transition-colors duration-base"
            >
              ethan@basisweb.net
            </a>
            <a
              href="https://www.upwork.com/freelancers/ethanchacko"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-ink transition-colors duration-base"
            >
              Upwork profile
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <Link
              href="/for-agencies"
              className="hover:text-ink transition-colors duration-base"
            >
              For agencies: white-label work
            </Link>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <span className="text-ink">Surprise, AZ</span>
            <span className="text-ink-dim">Phoenix West Valley</span>
            <span className="text-ink-dim">&copy; 2026 Ethan Chacko</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
