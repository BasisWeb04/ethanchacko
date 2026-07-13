import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { StatusStamp } from "./status-stamp";

type Tone = "live" | "pending" | "neutral";

/*
  A case-file card: the receipts strip is three of these. A file folder with a
  tab label, a real capture mounted on a paper mat with corner crop marks (no
  fake chrome), the one marked stat, and a status stamp at the foot. Square
  corners, a 2px paper lift on hover.
*/
export function CaseFileCard({
  label,
  href,
  image,
  imageAlt,
  illustration = false,
  statLead,
  statRest,
  status,
  priority = false,
}: {
  label: string;
  href: string;
  image: string;
  imageAlt: string;
  illustration?: boolean;
  statLead: string;
  statRest: string;
  status: { tone: Tone; label: string };
  priority?: boolean;
}) {
  return (
    <Link
      href={href}
      data-testid="case-file-card"
      className="group flex h-full flex-col border border-rule bg-paper-elev transition duration-base hover:-translate-y-0.5 hover:border-rule-strong hover:shadow-[0_12px_30px_-14px_rgba(0,0,0,0.7)]"
    >
      {/* File tab */}
      <div className="flex items-center justify-between gap-2 border-b border-rule px-3 py-2.5">
        <span className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.09em] text-ink-muted">
          {label}
        </span>
        <ArrowUpRight
          size={14}
          aria-hidden="true"
          className="shrink-0 text-ink-dim transition-transform duration-base group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>

      {/* Mounted capture, recessed into the panel */}
      <div className="relative bg-paper p-2">
        <span aria-hidden="true">
          <span className="absolute left-0.5 top-0.5 h-2 w-2 border-l border-t border-rule-strong" />
          <span className="absolute right-0.5 top-0.5 h-2 w-2 border-r border-t border-rule-strong" />
          <span className="absolute bottom-0.5 left-0.5 h-2 w-2 border-b border-l border-rule-strong" />
          <span className="absolute bottom-0.5 right-0.5 h-2 w-2 border-b border-r border-rule-strong" />
        </span>
        <div className="relative aspect-[16/10] overflow-hidden border border-rule">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="object-cover object-top"
          />
          {illustration && (
            <span className="absolute left-1.5 top-1.5 bg-ink/85 px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.08em] text-paper">
              Illustration
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-3 py-3.5">
        <p className="text-body leading-snug text-ink">
          <span className="mark-phrase font-semibold">{statLead}</span> {statRest}
        </p>
        <div className="mt-4 border-t border-rule pt-3">
          <StatusStamp tone={status.tone} label={status.label} />
        </div>
      </div>
    </Link>
  );
}
