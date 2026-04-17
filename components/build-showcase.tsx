"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Category = {
  tab: string;
  title: string;
  description: string;
  examples: string[];
  thumbnail: string;
  thumbnailAlt: string;
};

const categories: Category[] = [
  {
    tab: "DASHBOARDS",
    title: "Dashboards",
    description:
      "Real-time command centers that pull data from every channel into one screen. Built around how the business actually runs, not a template.",
    examples: ["ServiceCallTracker", "Operations Command Center"],
    thumbnail: "/work/servicecalltracker.webp",
    thumbnailAlt: "ServiceCallTracker dashboard preview",
  },
  {
    tab: "AUTOMATION",
    title: "Automation",
    description:
      "Workflows that run without anyone watching. n8n, webhooks, scheduled jobs, email sequences, review requests.",
    examples: ["BasisWeb workflows", "Client review automation"],
    thumbnail: "/work/basisweb.webp",
    thumbnailAlt: "BasisWeb preview",
  },
  {
    tab: "SCRAPERS",
    title: "Scrapers",
    description:
      "Custom data extraction where vendors charge too much or don't cover the long tail. Playwright, proxy rotation, enrichment pipelines.",
    examples: ["ACC Business Scraper", "Google Maps Lead Scraper"],
    thumbnail: "/work/acc-scraper.webp",
    thumbnailAlt: "ACC Business Scraper preview",
  },
  {
    tab: "WEB APPS",
    title: "Web Apps",
    description:
      "Full-stack builds from marketing sites through complex SaaS. Next.js, TypeScript, Supabase, Vercel. Deployed to your own infrastructure.",
    examples: ["Hammock Property Inspections", "ServiceCallTracker"],
    thumbnail: "/work/hammock.webp",
    thumbnailAlt: "Hammock Property Inspections preview",
  },
  {
    tab: "INTERNAL TOOLS",
    title: "Internal Tools",
    description:
      "Admin panels, data tools, and workflows your team uses every day. Built to match how your ops actually work, not generic CRM templates.",
    examples: ["Operations Command Center", "ACC Scraper dashboard"],
    thumbnail: "/work/warpspeed.webp",
    thumbnailAlt: "Warpspeed bounty editor preview",
  },
];

const AUTO_ADVANCE_MS = 5000;
const EASE = [0.16, 1, 0.3, 1] as const;

export function BuildShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const reducedMotion = useReducedMotion() ?? false;
  const autoAdvance = !reducedMotion;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!autoAdvance || paused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % categories.length);
    }, AUTO_ADVANCE_MS);
    intervalRef.current = id;
    return () => clearInterval(id);
  }, [autoAdvance, paused, cycle]);

  const handleTabClick = useCallback((i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  }, []);

  const handleMouseEnter = useCallback(() => setPaused(true), []);
  const handleMouseLeave = useCallback(() => setPaused(false), []);
  const handleFocus = useCallback(() => setPaused(true), []);
  const handleBlur = useCallback(() => setPaused(false), []);

  const current = categories[active];

  return (
    <div
      data-testid="build-showcase"
      data-active-index={active}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
    >
      {/* Tabs */}
      <div
        role="tablist"
        className="flex flex-wrap gap-x-8 gap-y-3 border-b border-border pb-4 mb-8"
      >
        {categories.map((cat, i) => {
          const isActive = i === active;
          return (
            <button
              key={cat.tab}
              role="tab"
              type="button"
              aria-selected={isActive}
              data-testid="showcase-tab"
              data-tab={cat.tab}
              data-active={isActive ? "true" : "false"}
              onClick={() => handleTabClick(i)}
              className={`relative pb-2 font-mono text-mono uppercase tracking-widest transition-colors duration-base motion-reduce:transition-none ${
                isActive ? "text-signal" : "text-fg-muted hover:text-fg"
              }`}
            >
              <span>{cat.tab}</span>
              <span
                data-testid="showcase-tab-underline"
                className={`tab-underline pointer-events-none absolute left-0 right-0 bottom-0 h-px bg-signal ${
                  isActive ? "tab-underline--active" : ""
                }`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div
        data-testid="showcase-card"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`img-${active}`}
            initial={reducedMotion ? false : { opacity: 0, x: 8 }}
            animate={reducedMotion ? undefined : { opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.22, ease: EASE }}
            className="relative aspect-[16/10] rounded-md overflow-hidden border border-border bg-bg-elev"
          >
            <Image
              src={current.thumbnail}
              alt={current.thumbnailAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-top"
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`body-${active}`}
            initial={reducedMotion ? false : { opacity: 0, x: 8 }}
            animate={reducedMotion ? undefined : { opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.22, ease: EASE }}
          >
            <h3
              data-testid="showcase-title"
              className="text-h3 text-fg mb-4"
            >
              {current.title}
            </h3>
            <p className="text-body text-fg-muted leading-relaxed max-w-[52ch] mb-6">
              {current.description}
            </p>
            <ul className="space-y-2">
              {current.examples.map((ex) => (
                <li
                  key={ex}
                  className="font-mono text-mono text-fg-dim uppercase tracking-widest"
                >
                  <span className="text-signal mr-2">&middot;</span>
                  {ex}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
