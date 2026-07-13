"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import type { Callout } from "@/content/projects";

const MAX_LENS = 176; // px diameter cap
const ZOOM = 2;

/*
  The inspection loupe: the site's signature interaction. Hovering a Tier-1
  exhibit summons a circular magnifier that follows the cursor and shows the
  real pixels at up to 2x (capped to native resolution so nothing blurs), with a
  hairline azure ring and a mono readout. It performs the thesis: look closer,
  it is real.

  Performance: the lens is a single element positioned entirely through DOM refs
  inside a rAF, so pointer moves never trigger a React re-render (that was the
  source of lag). Mouse = pure hover-follow (no click behavior, so clicking never
  hijacks the lens). Touch = press-and-hold. Keyboard = focus + Enter toggles a
  centered zoom. Disabled on Tier-2 illustrations.
*/
export function ExhibitImage({
  src,
  alt,
  aspect = "aspect-[16/10]",
  priority = false,
  // Serve native-width source on desktop so the loupe has real pixels to
  // magnify. Mobile stays at 100vw, keeping the phone-first payload small.
  sizes = "(min-width: 1024px) 1920px, 100vw",
  objectPosition = "top",
  illustration = false,
  pinned = [],
}: {
  src: string;
  alt: string;
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  objectPosition?: string;
  illustration?: boolean;
  pinned?: Callout[];
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const naturalW = useRef(0);
  const raf = useRef(0);
  const last = useRef({ x: 0, y: 0 });
  const pinnedKb = useRef(false);
  const activeTouch = useRef(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loupeOn = !illustration;

  // Position the lens for a pointer at (clientX, clientY). All DOM writes, no
  // React state, so this stays smooth at pointer-event frequency.
  const place = useCallback((clientX: number, clientY: number) => {
    const box = boxRef.current;
    const lens = lensRef.current;
    if (!box || !lens) return;
    const r = box.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;

    const px = Math.max(0, Math.min(clientX - r.left, r.width));
    const py = Math.max(0, Math.min(clientY - r.top, r.height));

    const d = Math.max(
      64,
      Math.min(MAX_LENS, Math.floor(r.width * 0.6), Math.floor(r.height * 0.92))
    );
    const maxZoom = naturalW.current ? naturalW.current / r.width : ZOOM;
    const z = Math.max(1, Math.min(ZOOM, maxZoom || ZOOM));

    const cx = Math.max(d / 2, Math.min(px, r.width - d / 2));
    const cy = Math.max(d / 2, Math.min(py, r.height - d / 2));

    lens.style.width = `${d}px`;
    lens.style.height = `${d}px`;
    lens.style.transform = `translate3d(${cx - d / 2}px, ${cy - d / 2}px, 0)`;
    lens.style.backgroundSize = `${r.width * z}px ${r.height * z}px`;
    lens.style.backgroundPosition = `${-(cx * z - d / 2)}px ${-(cy * z - d / 2)}px`;
    lens.style.opacity = "1";
    if (readoutRef.current) {
      readoutRef.current.textContent = `${z.toFixed(1)}x · real capture`;
    }
  }, []);

  const schedule = useCallback(
    (clientX: number, clientY: number) => {
      last.current = { x: clientX, y: clientY };
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        place(last.current.x, last.current.y);
      });
    },
    [place]
  );

  const hide = useCallback(() => {
    if (lensRef.current) lensRef.current.style.opacity = "0";
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!loupeOn) return;
      schedule(e.clientX, e.clientY);
    },
    [loupeOn, schedule]
  );

  const onMouseLeave = useCallback(() => {
    if (!pinnedKb.current) hide();
  }, [hide]);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!loupeOn) return;
      const t = e.touches[0];
      const { clientX, clientY } = t;
      holdTimer.current = setTimeout(() => {
        activeTouch.current = true;
        place(clientX, clientY);
      }, 160);
    },
    [loupeOn, place]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!loupeOn) return;
      if (activeTouch.current) {
        e.preventDefault(); // scroll is locked only once the loupe is live
        const t = e.touches[0];
        schedule(t.clientX, t.clientY);
      }
    },
    [loupeOn, schedule]
  );

  const endTouch = useCallback(() => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    activeTouch.current = false;
    hide();
  }, [hide]);

  // Keyboard / no-hover path: Enter or Space toggles a centered fixed zoom.
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!loupeOn) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const box = boxRef.current;
        if (!box) return;
        if (pinnedKb.current) {
          pinnedKb.current = false;
          hide();
        } else {
          pinnedKb.current = true;
          const r = box.getBoundingClientRect();
          place(r.left + r.width / 2, r.top + r.height / 2);
        }
      } else if (e.key === "Escape" && pinnedKb.current) {
        pinnedKb.current = false;
        hide();
      }
    },
    [loupeOn, place, hide]
  );

  return (
    <div
      ref={boxRef}
      className={`relative ${aspect} ${loupeOn ? "cursor-crosshair" : ""}`}
      style={loupeOn ? { touchAction: "pan-y" } : undefined}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchStart={loupeOn ? onTouchStart : undefined}
      onTouchMove={loupeOn ? onTouchMove : undefined}
      onTouchEnd={loupeOn ? endTouch : undefined}
      onTouchCancel={loupeOn ? endTouch : undefined}
      onKeyDown={loupeOn ? onKeyDown : undefined}
      role={loupeOn ? "button" : undefined}
      tabIndex={loupeOn ? 0 : undefined}
      aria-label={loupeOn ? `Magnify exhibit: ${alt}` : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={(e) => {
          naturalW.current = e.currentTarget.naturalWidth;
        }}
        className="object-cover"
        style={{ objectPosition }}
      />

      {illustration && (
        <span className="absolute left-2 top-2 bg-ink/85 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-paper">
          Illustration
        </span>
      )}

      {pinned.map((c) => (
        <span
          key={c.n}
          aria-hidden="true"
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
          className="stamp-press pointer-events-none absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[color:var(--on-mark)] bg-mark font-mono text-[11px] font-semibold text-[color:var(--on-mark)]"
        >
          {c.n}
        </span>
      ))}

      {loupeOn && (
        <div
          ref={lensRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-20 overflow-hidden rounded-full ring-2 ring-mark"
          style={{
            opacity: 0,
            width: 0,
            height: 0,
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            boxShadow: "0 6px 22px -4px rgba(0,0,0,0.65)",
            willChange: "transform",
            transition: "opacity 120ms ease-out",
          }}
        >
          <span
            ref={readoutRef}
            className="absolute inset-x-0 bottom-0 py-0.5 text-center font-mono text-[0.6rem] tracking-[0.04em]"
            style={{ backgroundColor: "rgba(6,14,24,0.92)", color: "#f4f4f2" }}
          />
        </div>
      )}
    </div>
  );
}
