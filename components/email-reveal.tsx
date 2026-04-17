"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EMAIL = "ethan@basisweb.net";
const MASKED = "ethan@\u2022\u2022\u2022\u2022\u2022\u2022\u2022.net";
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
        className="font-mono text-h2 text-fg cursor-pointer hover:text-signal transition-colors duration-base"
        aria-label={revealed ? EMAIL : "Click to reveal email address"}
      >
        {!revealed ? (
          <span>{MASKED}</span>
        ) : reducedMotion ? (
          <span>{EMAIL}</span>
        ) : (
          emailChars.map((char, i) => (
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
          ))
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
            className="absolute -top-8 left-0 font-mono text-mono text-signal uppercase tracking-widest"
          >
            COPIED
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
