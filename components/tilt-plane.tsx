"use client";

import { useEffect, useRef } from "react";

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/*
  A block that tilts in 3D toward the cursor. Motion is driven by a lerp loop
  (not a CSS transition), so it follows the pointer AND eases back home smoothly
  the whole way, never snapping. The pivot is the block's own box, so it responds
  across its full width. The tilt is user-initiated micro-motion (it only moves
  while the pointer moves over it), so it runs regardless of reduced-motion.

  liftZ pushes the plane toward the viewer while pointed at (translateZ). On a
  solid card the tilt reads through edge foreshortening, but transparent text has
  no edges to catch it, so the forward lift is what makes the depth read: under
  perspective, closer means bigger, so the content visibly rises as it leans.

  Wrap any content: the children ride on the tilting plane, keeping their own
  classes and data attributes intact.
*/
export function TiltPlane({
  children,
  className = "",
  wrapperClassName = "",
  perspective = 760,
  maxDeg = 12,
  ease = 0.12,
  liftZ = 0,
  hitClassName = "",
}: {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  perspective?: number;
  maxDeg?: number;
  ease?: number;
  liftZ?: number;
  hitClassName?: string;
}) {
  const hit = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const s = useRef({
    rx: 0,
    ry: 0,
    z: 0,
    trx: 0,
    try_: 0,
    tz: 0,
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
    st.rx += (st.trx - st.rx) * ease;
    st.ry += (st.try_ - st.ry) * ease;
    st.z += (st.tz - st.z) * ease;
    const settled =
      Math.abs(st.trx - st.rx) < 0.02 &&
      Math.abs(st.try_ - st.ry) < 0.02 &&
      Math.abs(st.tz - st.z) < 0.05;
    if (settled && !st.hovering) {
      st.rx = st.trx;
      st.ry = st.try_;
      st.z = st.tz;
      if (plane.current) {
        plane.current.style.transform =
          st.trx === 0 && st.try_ === 0 && st.tz === 0
            ? ""
            : `translateZ(${st.tz}px) rotateX(${st.trx}deg) rotateY(${st.try_}deg)`;
      }
      st.raf = 0;
      return;
    }
    if (plane.current) {
      plane.current.style.transform = `translateZ(${st.z.toFixed(
        2
      )}px) rotateX(${st.rx.toFixed(3)}deg) rotateY(${st.ry.toFixed(3)}deg)`;
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
    st.try_ = clamp(px, -1, 1) * maxDeg;
    st.trx = clamp(-py, -1, 1) * maxDeg;
    st.tz = liftZ;
    st.hovering = true;
    ensure();
  };

  const onLeave = () => {
    s.current.trx = 0;
    s.current.try_ = 0;
    s.current.tz = 0;
    s.current.hovering = false;
    ensure();
  };

  return (
    <div className={wrapperClassName} style={{ perspective: `${perspective}px` }}>
      <div
        ref={hit}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={hitClassName}
      >
        <div
          ref={plane}
          className={className}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
