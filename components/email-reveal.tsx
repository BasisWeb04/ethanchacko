"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EMAIL = "ethan@basisweb.net";
const MASKED = "ethan@•••••••.net";
const STAGGER_MS = 25;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function EmailReveal() {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const handleClick = useCallback(async () => {
    if (revealed) return;
    setRevealed(true);
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [revealed]);

  const emailChars = EMAIL.split("");

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        data-testid="email-reveal"
        className="group inline-flex cursor-pointer items-center gap-3 border border-ink bg-paper-elev px-4 py-3 font-mono text-h3 text-ink transition-colors duration-base hover:border-mark-ink"
      >
        <span
          aria-hidden="true"
          className="field-label border-rule-strong text-ink-dim"
        >
          Email
        </span>
        <span className="sr-only">
          {revealed
            ? `Email address ${EMAIL}`
            : `Reveal email address ${MASKED}`}
        </span>
        {!revealed ? (
          <span aria-hidden="true">{MASKED}</span>
        ) : reducedMotion ? (
          <span aria-hidden="true">{EMAIL}</span>
        ) : (
          <span aria-hidden="true">
            {emailChars.map((char, i) => (
              <motion.span
                key={`${i}-${char}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * (STAGGER_MS / 1000),
                  duration: 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        )}
      </button>

      <AnimatePresence>
        {copied && (
          <motion.span
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            data-testid="copied-toast"
            className="absolute -top-7 left-0 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.09em] text-ink-muted"
          >
            Copied
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
