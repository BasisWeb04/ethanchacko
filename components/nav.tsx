"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#work", label: "Case studies" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onWork = pathname?.startsWith("/work");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/85 backdrop-blur-md border-b border-rule">
      <div className="mx-auto max-w-container px-gutter">
        <div className="flex items-center justify-between h-16">
          {/* Wordmark */}
          <Link
            href="/"
            aria-label="Ethan Chacko, home"
            className="font-serif text-lg font-semibold text-ink tracking-tight"
          >
            Ethan Chacko
          </Link>

          {/* Center nav: desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = link.href === "/#work" && onWork;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link font-mono text-mono uppercase tracking-widest text-ink-muted hover:text-ink transition-colors duration-base ${
                    active ? "nav-link--active text-ink" : ""
                  }`}
                  data-testid="nav-link"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-ink-muted hover:text-ink transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-rule bg-paper">
          <div className="px-gutter py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-mono uppercase tracking-widest text-ink-muted hover:text-ink transition-colors duration-base"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
