"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function WorkGridReveal({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion() ?? false;
  const animate = !reduced;
  const show = animate ? inView : true;

  return (
    <motion.div
      ref={ref}
      initial={animate ? { opacity: 0, y: 16 } : false}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.5,
        delay: animate ? (index % 3) * 0.08 : 0,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
