"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { HudChip } from "./hud-chip";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/for-agencies", label: "For Agencies" },
  { href: "/for-clients", label: "For Clients" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-container px-gutter">
        <div className="flex items-center justify-between h-16">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-sans text-lg font-bold text-fg tracking-tight"
          >
            EC
          </Link>

          {/* Center nav: desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-mono uppercase text-fg-muted hover:text-fg transition-colors duration-base"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: HUD chip + mobile toggle */}
          <div className="flex items-center gap-4">
            <HudChip />
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-fg-muted hover:text-fg transition-colors"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-bg">
          <div className="px-gutter py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-mono uppercase text-fg-muted hover:text-fg transition-colors duration-base"
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
