"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DeviceFrame } from "./device-frame";

const EASE = [0.16, 1, 0.3, 1] as const;

/*
  The one bold moment. His real production dashboard, framed, with an azure line
  drawing from a floating note to the real "0 failed" cell on load. The note text
  and the cell it points at are the actual pixels in n8n-overview.png; nothing is
  invented. Reduced motion renders the final state statically; below lg the
  connector is dropped for a plain caption.
*/
export function HeroDevice() {
  const reduced = useReducedMotion() ?? false;
  const t = (delay: number, duration = 0.6) =>
    reduced ? { duration: 0 } : { duration, delay, ease: EASE };

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={t(0.15, 0.7)}
    >
      <DeviceFrame
        chrome="browser"
        src="/work/n8n-overview.png"
        alt="Live n8n production dashboard: 318 executions logged, 0 failed, 0% failure rate, 0.7s average run time."
        label="automation · production"
        aspect="aspect-[16/9]"
        objectPosition="top"
        light
        priority
        sizes="(min-width: 1024px) 620px, 100vw"
      >
        <div className="hidden lg:block">
          <motion.div
            className="absolute bottom-[6%] left-[5%] max-w-[15rem] border-l-2 border-mark bg-paper/80 px-3 py-2 backdrop-blur-sm"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.6, 0.5)}
          >
            <p className="font-mono text-[0.72rem] leading-snug text-ink">
              <span className="text-mark">0 failed events.</span> Every audit,
              since day one.
            </p>
          </motion.div>
        </div>
      </DeviceFrame>

      <p className="mt-3 font-mono text-[0.72rem] leading-snug text-ink-muted lg:hidden">
        <span className="text-mark">0 failed events</span> across every audit,
        on the live dashboard above.
      </p>
    </motion.div>
  );
}
