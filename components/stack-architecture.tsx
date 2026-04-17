"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const leftCol = ["Brief", "Designs", "Comms"];
const middleCol = ["Spec parsing", "Claude Code build", "Playwright QA", "Daily updates"];
const rightCol = ["PR to your repo", "Deploy notes", "Clean docs"];

const ROW_HEIGHT = 44;
const ROW_GAP = 12;
const EASE = [0.16, 1, 0.3, 1] as const;

export function StackArchitecture() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "-10% 0px" });
  const reducedMotion = useReducedMotion() ?? false;
  const animate = !reducedMotion;
  const show = animate ? inView : true;

  return (
    <motion.div
      ref={rootRef}
      data-testid="stack-architecture"
      className="w-full"
      initial={animate ? { opacity: 0 } : false}
      animate={show ? { opacity: 1 } : undefined}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {/* Desktop: 3 columns with horizontal arrows between */}
      <div
        className="hidden lg:grid items-start"
        style={{
          gridTemplateColumns: "minmax(0,1fr) 56px minmax(0,1fr) 56px minmax(0,1fr)",
          columnGap: "0",
        }}
      >
        {/* Header row */}
        <ColumnHeader title="YOUR AGENCY" style={{ gridColumn: 1, gridRow: 1 }} />
        <div style={{ gridColumn: 2, gridRow: 1 }} />
        <ColumnHeader
          title="ETHAN"
          overline="CONTRACT DEV"
          style={{ gridColumn: 3, gridRow: 1 }}
        />
        <div style={{ gridColumn: 4, gridRow: 1 }} />
        <ColumnHeader title="YOUR STACK" style={{ gridColumn: 5, gridRow: 1 }} />

        {/* Left column rows */}
        {leftCol.map((item, i) => (
          <Row
            key={`l-${i}`}
            label={item}
            style={{ gridColumn: 1, gridRow: 2 + i }}
          />
        ))}

        {/* Left -> Middle arrows (3) */}
        {[0, 1, 2].map((i) => (
          <ArrowCell
            key={`lm-${i}`}
            direction="right"
            style={{ gridColumn: 2, gridRow: 2 + i }}
          />
        ))}

        {/* Middle column rows (highlighted) */}
        {middleCol.map((item, i) => (
          <Row
            key={`m-${i}`}
            label={item}
            highlight
            style={{ gridColumn: 3, gridRow: 2 + i }}
          />
        ))}

        {/* Middle -> Right arrows (3; last middle row has no arrow out) */}
        {[0, 1, 2].map((i) => (
          <ArrowCell
            key={`mr-${i}`}
            direction="right"
            style={{ gridColumn: 4, gridRow: 2 + i }}
          />
        ))}

        {/* Right column rows */}
        {rightCol.map((item, i) => (
          <Row
            key={`r-${i}`}
            label={item}
            style={{ gridColumn: 5, gridRow: 2 + i }}
          />
        ))}
      </div>

      {/* Tablet/mobile: stacked columns with down arrows between */}
      <div className="lg:hidden flex flex-col items-stretch gap-6">
        <div>
          <ColumnHeader title="YOUR AGENCY" />
          <div
            className="mt-4 flex flex-col"
            style={{ gap: `${ROW_GAP}px` }}
          >
            {leftCol.map((item, i) => (
              <Row key={`l-${i}`} label={item} />
            ))}
          </div>
        </div>
        <DownArrowBand count={3} />
        <div>
          <ColumnHeader title="ETHAN" overline="CONTRACT DEV" />
          <div
            className="mt-4 flex flex-col"
            style={{ gap: `${ROW_GAP}px` }}
          >
            {middleCol.map((item, i) => (
              <Row key={`m-${i}`} label={item} highlight />
            ))}
          </div>
        </div>
        <DownArrowBand count={3} />
        <div>
          <ColumnHeader title="YOUR STACK" />
          <div
            className="mt-4 flex flex-col"
            style={{ gap: `${ROW_GAP}px` }}
          >
            {rightCol.map((item, i) => (
              <Row key={`r-${i}`} label={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Caption */}
      <p
        data-testid="stack-caption"
        className="mt-12 text-center font-mono text-mono uppercase tracking-widest text-signal"
      >
        NO ATTRIBUTION REQUIRED. YOUR CLIENT NEVER KNOWS I EXIST.
      </p>
    </motion.div>
  );
}

function ColumnHeader({
  title,
  overline,
  style,
}: {
  title: string;
  overline?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      data-testid="stack-header"
      className="text-center pb-4"
      style={style}
    >
      {overline && (
        <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-signal mb-1">
          {overline}
        </div>
      )}
      <div className="font-mono text-mono uppercase tracking-widest text-fg">
        {title}
      </div>
    </div>
  );
}

function Row({
  label,
  highlight,
  style,
}: {
  label: string;
  highlight?: boolean;
  style?: React.CSSProperties;
}) {
  const border = highlight ? "border-signal" : "border-border";
  return (
    <div
      data-testid="stack-row"
      data-highlight={highlight ? "true" : "false"}
      className={`flex items-center justify-center bg-bg-elev border ${border} px-3 font-mono text-[12px] text-fg-muted text-center`}
      style={{
        height: `${ROW_HEIGHT}px`,
        marginBottom: `${ROW_GAP}px`,
        ...style,
      }}
    >
      {label}
    </div>
  );
}

function ArrowCell({
  direction,
  style,
}: {
  direction: "right" | "down";
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        height: `${ROW_HEIGHT + ROW_GAP}px`,
        ...style,
      }}
    >
      <Arrow direction={direction} />
    </div>
  );
}

function DownArrowBand({ count }: { count: number }) {
  return (
    <div
      data-testid="stack-arrow-band"
      className="flex items-center justify-center gap-12 py-2"
    >
      {Array.from({ length: count }).map((_, i) => (
        <Arrow key={i} direction="down" />
      ))}
    </div>
  );
}

function Arrow({ direction }: { direction: "right" | "down" }) {
  if (direction === "right") {
    return (
      <svg
        data-testid="stack-arrow"
        width="100%"
        height="10"
        viewBox="0 0 48 10"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="5"
          x2="42"
          y2="5"
          stroke="var(--fg-dim)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          points="38,1 42,5 38,9"
          fill="none"
          stroke="var(--fg-dim)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }
  return (
    <svg
      data-testid="stack-arrow"
      width="10"
      height="36"
      viewBox="0 0 10 36"
      aria-hidden="true"
    >
      <line
        x1="5"
        y1="0"
        x2="5"
        y2="30"
        stroke="var(--fg-dim)"
        strokeWidth="1"
      />
      <polyline
        points="1,26 5,30 9,26"
        fill="none"
        stroke="var(--fg-dim)"
        strokeWidth="1"
      />
    </svg>
  );
}
