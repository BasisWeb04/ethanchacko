"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Node = {
  label: string;
  timestamp: string;
  description: string;
};

const nodes: Node[] = [
  {
    label: "BRIEF",
    timestamp: "DAY 0",
    description:
      "You email me with what needs building. Include scope, deadline, and any technical constraints you already know about.",
  },
  {
    label: "SCOPE",
    timestamp: "DAY 1-3",
    description:
      "I respond within 24 hours with a fit assessment, rough timeline, and fixed price or hourly estimate. If it's not a fit, I'll tell you and point you somewhere better.",
  },
  {
    label: "BUILD",
    timestamp: "WEEK 1-4",
    description:
      "I work against the spec. You get weekly updates by default, daily if you want them. Questions get answered within a business day.",
  },
  {
    label: "HANDOFF",
    timestamp: "WEEK 4+",
    description:
      "Clean repo, deployed to your infrastructure, docs your team can own. I stick around for 30 days of free iteration on anything broken.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const CIRCLE_DUR = 0.28;
const CONNECTOR_DUR = 0.3;
const STAGGER = 0.12;

// Vertical distance (px) from the top of a node column down to the
// circle's vertical center. Used to position the connector overlay.
const CIRCLE_CENTER_Y = 12 /* timestamp line */ + 12 /* pb-3 */ + 24 /* half of 48px circle */;

export function ProcessTimeline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "-15% 0px" });
  const reducedMotion = useReducedMotion() ?? false;
  const animate = !reducedMotion;
  const show = animate ? inView : true;

  return (
    <div ref={rootRef} data-testid="process-timeline">
      {/* Desktop: horizontal, 4 equal columns with connectors behind circles */}
      <div className="hidden md:block relative">
        {/* Connector overlay: 3 segments between circle centers */}
        <div
          aria-hidden="true"
          className="absolute left-[12.5%] right-[12.5%] flex pointer-events-none"
          style={{ top: `${CIRCLE_CENTER_Y}px` }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              data-testid="process-connector"
              className="flex-1 h-px bg-border origin-left"
              initial={animate ? { scaleX: 0 } : false}
              animate={show ? { scaleX: 1 } : undefined}
              transition={{
                duration: CONNECTOR_DUR,
                delay: (i + 1) * STAGGER,
                ease: EASE,
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4 relative">
          {nodes.map((node, i) => (
            <HorizontalNode
              key={node.label}
              node={node}
              index={i}
              show={show}
              animate={animate}
            />
          ))}
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <ol className="md:hidden flex flex-col">
        {nodes.map((node, i) => (
          <VerticalNode
            key={node.label}
            node={node}
            index={i}
            show={show}
            animate={animate}
            hasConnector={i < nodes.length - 1}
          />
        ))}
      </ol>
    </div>
  );
}

function HorizontalNode({
  node,
  index,
  show,
  animate,
}: {
  node: Node;
  index: number;
  show: boolean;
  animate: boolean;
}) {
  const circleDelay = index * STAGGER;

  return (
    <div
      data-testid="process-node"
      className="group relative flex flex-col items-center text-center"
    >
      <span
        data-testid="process-timestamp"
        className="font-mono text-[10px] leading-[12px] tracking-[0.12em] uppercase text-fg-dim pb-3"
      >
        {node.timestamp}
      </span>
      <motion.div
        data-testid="process-circle"
        className="w-12 h-12 rounded-full border border-border bg-bg-elev transition-colors duration-base motion-reduce:transition-none group-hover:border-signal relative z-10"
        initial={animate ? { opacity: 0, scale: 0.6 } : false}
        animate={show ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: CIRCLE_DUR, delay: circleDelay, ease: EASE }}
      />
      <span
        data-testid="process-label"
        className="mt-4 font-mono text-mono uppercase tracking-widest text-fg-muted group-hover:text-signal transition-colors duration-base motion-reduce:transition-none"
      >
        {node.label}
      </span>
      <p className="mt-3 text-small text-fg-dim group-hover:text-fg transition-colors duration-base motion-reduce:transition-none max-w-[24ch]">
        {node.description}
      </p>
    </div>
  );
}

function VerticalNode({
  node,
  index,
  show,
  animate,
  hasConnector,
}: {
  node: Node;
  index: number;
  show: boolean;
  animate: boolean;
  hasConnector: boolean;
}) {
  const circleDelay = index * STAGGER;
  const connectorDelay = (index + 1) * STAGGER;

  return (
    <li
      data-testid="process-node"
      className="group grid grid-cols-[48px_1fr] gap-4"
    >
      <div className="flex flex-col items-center">
        <motion.div
          data-testid="process-circle"
          className="w-12 h-12 rounded-full border border-border bg-bg-elev transition-colors duration-base motion-reduce:transition-none group-hover:border-signal shrink-0"
          initial={animate ? { opacity: 0, scale: 0.6 } : false}
          animate={show ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: CIRCLE_DUR, delay: circleDelay, ease: EASE }}
        />
        {hasConnector && (
          <div className="mt-2 mb-2 flex-1 flex items-stretch">
            <motion.div
              data-testid="process-connector"
              aria-hidden="true"
              className="w-px bg-border origin-top flex-1 min-h-[48px]"
              initial={animate ? { scaleY: 0 } : false}
              animate={show ? { scaleY: 1 } : undefined}
              transition={{
                duration: CONNECTOR_DUR,
                delay: connectorDelay,
                ease: EASE,
              }}
            />
          </div>
        )}
      </div>
      <div className="pb-8">
        <span
          data-testid="process-timestamp"
          className="block font-mono text-[10px] tracking-[0.12em] uppercase text-fg-dim"
        >
          {node.timestamp}
        </span>
        <span
          data-testid="process-label"
          className="mt-1 block font-mono text-mono uppercase tracking-widest text-fg-muted group-hover:text-signal transition-colors duration-base motion-reduce:transition-none"
        >
          {node.label}
        </span>
        <p className="mt-2 text-small text-fg-dim group-hover:text-fg transition-colors duration-base motion-reduce:transition-none max-w-[44ch]">
          {node.description}
        </p>
      </div>
    </li>
  );
}
