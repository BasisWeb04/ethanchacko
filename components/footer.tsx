"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const onAgencies = pathname === "/for-agencies";

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-container px-gutter py-10">
        <div className="flex flex-col gap-6 font-mono text-mono text-ink-muted sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3">
            <a
              href="mailto:ethan@basisweb.net"
              className="text-ink transition-colors duration-base hover:text-ink-muted"
            >
              ethan@basisweb.net
            </a>
            <a
              href="https://www.upwork.com/freelancers/ethanchacko"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors duration-base hover:text-ink"
            >
              Upwork profile
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/ethan-basisweb/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors duration-base hover:text-ink"
            >
              LinkedIn
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            {onAgencies ? (
              <Link
                href="/"
                className="transition-colors duration-base hover:text-ink"
              >
                Back to the main site
              </Link>
            ) : (
              <Link
                href="/for-agencies"
                className="transition-colors duration-base hover:text-ink"
              >
                For agencies: white-label work
              </Link>
            )}
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
