"use client";

import { useEffect, useRef } from "react";

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const MAX_DEG = 12;
const EASE = 0.12;

/*
  The hero headline as a 3D plane that tilts toward the cursor. Motion is driven
  by a lerp loop (not a CSS transition), so it follows AND returns home smoothly
  the whole way, never snapping. The pivot is the text's own box, so it responds
  across the entire line. Reduced motion leaves it flat and still.
*/
export function TiltHeadline({
  className = "",
  wrapperClassName = "",
  delayMs = 60,
}: {
  className?: string;
  wrapperClassName?: string;
  delayMs?: number;
}) {
  const hit = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLHeadingElement>(null);
  const s = useRef({
    rx: 0,
    ry: 0,
    trx: 0,
    try_: 0,
    raf: 0,
    hovering: false,
  });

  useEffect(() => {
    return () => {
      if (s.current.raf) cancelAnimationFrame(s.current.raf);
    };
  }, []);

  const tick = () => {
    const st = s.current;
    st.rx += (st.trx - st.rx) * EASE;
    st.ry += (st.try_ - st.ry) * EASE;
    const settled =
      Math.abs(st.trx - st.rx) < 0.02 && Math.abs(st.try_ - st.ry) < 0.02;
    if (settled && !st.hovering) {
      st.rx = st.trx;
      st.ry = st.try_;
      if (plane.current) {
        plane.current.style.transform =
          st.trx === 0 && st.try_ === 0
            ? ""
            : `rotateX(${st.trx}deg) rotateY(${st.try_}deg)`;
      }
      st.raf = 0;
      return;
    }
    if (plane.current) {
      plane.current.style.transform = `rotateX(${st.rx.toFixed(
        3
      )}deg) rotateY(${st.ry.toFixed(3)}deg)`;
    }
    st.raf = requestAnimationFrame(tick);
  };

  const ensure = () => {
    if (!s.current.raf) s.current.raf = requestAnimationFrame(tick);
  };

  const onMove = (e: React.MouseEvent) => {
    const st = s.current;
    if (!hit.current) return;
    const r = hit.current.getBoundingClientRect();
    const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    st.try_ = clamp(px, -1, 1) * MAX_DEG;
    st.trx = clamp(-py, -1, 1) * MAX_DEG;
    st.hovering = true;
    ensure();
  };

  const onLeave = () => {
    s.current.trx = 0;
    s.current.try_ = 0;
    s.current.hovering = false;
    ensure();
  };

  return (
    <div className={wrapperClassName}>
      <div
        ref={hit}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="exhibit-settle inline-block -m-4 p-4"
        style={{ perspective: "760px", animationDelay: `${delayMs}ms` }}
      >
        <h1
          ref={plane}
          className={className}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          data-testid="hero-headline"
        >
          I build <span className="mark-phrase">systems</span>, not slide decks.
        </h1>
      </div>
    </div>
  );
}
