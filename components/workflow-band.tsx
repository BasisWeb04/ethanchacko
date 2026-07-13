"use client";

import { useRef } from "react";
import Image from "next/image";

/*
  The wiring foldout. His real booking workflow, mounted like a schematic you
  unroll and pan by hand: native horizontal overflow scroll with a grab cursor,
  plus pointer drag-to-pan. No scroll-jack transform, no fake chrome. The canvas
  is rendered wider than the viewport so there is something to pan across.
*/
export function WorkflowBand() {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft };
    el.classList.add("cursor-grabbing");
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el || !drag.current.down) return;
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };

  const endDrag = () => {
    const el = scroller.current;
    drag.current.down = false;
    el?.classList.remove("cursor-grabbing");
  };

  return (
    <section className="border-t border-rule px-gutter py-section-y">
      <div className="mx-auto max-w-container">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <span className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.09em] text-ink-muted">
            The wiring
          </span>
          <span className="border-l-2 border-mark bg-paper-elev px-3 py-1.5 font-mono text-[0.72rem] text-ink">
            One real workflow. Every node by hand.
          </span>
        </div>

        <figure>
          <div className="relative border border-rule bg-paper-elev p-2 sm:p-3">
            <span aria-hidden="true">
              <span className="absolute left-1 top-1 h-2.5 w-2.5 border-l border-t border-rule-strong" />
              <span className="absolute right-1 top-1 h-2.5 w-2.5 border-r border-t border-rule-strong" />
              <span className="absolute bottom-1 left-1 h-2.5 w-2.5 border-b border-l border-rule-strong" />
              <span className="absolute bottom-1 right-1 h-2.5 w-2.5 border-b border-r border-rule-strong" />
            </span>
            <div
              ref={scroller}
              tabIndex={0}
              aria-label="Booking workflow canvas. Drag or scroll to pan."
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerLeave={endDrag}
              className="cursor-grab overflow-x-auto border border-rule bg-paper [scrollbar-width:thin]"
            >
              <Image
                src="/work/n8n-booking-crop.webp"
                alt="The Booking Created workflow in n8n: intake, dedup, collision handling, and opportunity creation, node by node."
                width={1670}
                height={315}
                sizes="1670px"
                draggable={false}
                className="h-[210px] w-auto max-w-none select-none sm:h-[300px]"
              />
            </div>
          </div>
          <figcaption className="mt-3 font-mono text-mono leading-snug text-ink-dim">
            Booking Created, one of three production event workflows. Drag to pan
            the canvas.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
