"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#work", label: "Case files" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onWork = pathname?.startsWith("/work");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-rule bg-paper">
      <div className="mx-auto max-w-container px-gutter">
        <div className="flex h-16 items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            aria-label="Ethan Chacko, home"
            className="font-sans text-lg font-extrabold tracking-tight text-ink"
          >
            Ethan Chacko
          </Link>

          {/* Masthead links: desktop */}
          <div className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => {
              const active = link.href === "/#work" && onWork;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link font-sans text-[0.72rem] font-semibold uppercase tracking-[0.09em] text-ink-muted transition-colors duration-base hover:text-ink ${
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
            className="text-ink-muted transition-colors hover:text-ink md:hidden"
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
        <div id="mobile-menu" className="border-t border-rule bg-paper md:hidden">
          <div className="flex flex-col gap-4 px-gutter py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-sans text-[0.8rem] font-semibold uppercase tracking-[0.09em] text-ink-muted transition-colors duration-base hover:text-ink"
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
