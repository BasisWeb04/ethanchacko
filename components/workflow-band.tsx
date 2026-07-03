"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { DeviceFrame } from "./device-frame";

/*
  "Systems, not slide decks" made literal and near-wordless: his real booking
  workflow, framed as a canvas, drifting a bounded amount as the section crosses
  the viewport. Everything is transform/opacity inside an overflow-hidden band,
  so it never induces horizontal page scroll. Static under reduced motion.
*/
export function WorkflowBand() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [36, -36]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-rule px-gutter py-section-y"
    >
      <div className="mx-auto max-w-container">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-mono uppercase tracking-widest text-ink-dim">
            The wiring
          </span>
          <span className="border-l-2 border-mark bg-paper-elev px-3 py-1.5 font-mono text-[0.72rem] text-ink">
            One real workflow. Every node by hand.
          </span>
        </div>
        <div className="relative overflow-hidden rounded-xl">
          <motion.div style={{ x }} className="will-change-transform">
            <DeviceFrame
              chrome="canvas"
              src="/work/n8n-booking-crop.webp"
              alt="The Booking Created workflow in n8n: intake, dedup, collision handling, and opportunity creation, node by node."
              label="booking · n8n"
              aspect="aspect-[1670/315]"
              glow={false}
              light
              sizes="(min-width: 1024px) 1300px, 160vw"
              className="min-w-[112%]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
