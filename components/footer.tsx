import { ArrowUpRight } from "lucide-react";
import { CommandPaletteTrigger } from "./command-palette";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-container px-gutter py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-mono text-fg-muted">
          <a
            href="mailto:ethan@basisweb.net"
            className="hover:text-fg transition-colors duration-base"
          >
            ethan@basisweb.net
          </a>

          <div className="flex items-center gap-5">
            <a
              href="https://www.upwork.com/freelancers/ethanchacko"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-fg transition-colors duration-base"
            >
              Upwork
              <ArrowUpRight size={14} />
            </a>
            <CommandPaletteTrigger />
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1">
            <span>&copy; 2026 Ethan Chacko</span>
            <span>Phoenix, AZ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
