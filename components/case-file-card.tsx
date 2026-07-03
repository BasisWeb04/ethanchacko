import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StatusDot } from "./status-dot";
import { DeviceFrame } from "./device-frame";

type Tone = "live" | "pending" | "neutral";
type IconType = React.ElementType;

/*
  A case-file card: the receipts strip is three of these. The screenshot routes
  through the shared DeviceFrame (plain chrome so the card header stays the
  chrome), the label carries a small azure glyph, and the whole card lifts on
  hover. The one true stat is marked; the status stamp says exactly where it
  stands.
*/
export function CaseFileCard({
  caseLabel,
  href,
  image,
  imageAlt,
  icon: Icon,
  illustration = false,
  light = false,
  statLead,
  statRest,
  status,
  priority = false,
}: {
  caseLabel: string;
  href: string;
  image: string;
  imageAlt: string;
  icon?: IconType;
  illustration?: boolean;
  light?: boolean;
  statLead: string;
  statRest: string;
  status: { tone: Tone; label: string };
  priority?: boolean;
}) {
  return (
    <Link
      href={href}
      data-testid="case-file-card"
      className="group flex h-full flex-col rounded-xl border border-rule bg-paper-elev/40 p-3 transition duration-base hover:-translate-y-1 hover:border-rule-strong"
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-widest text-ink-dim">
          {Icon && <Icon size={13} className="text-mark" aria-hidden="true" />}
          {caseLabel}
        </span>
        <ArrowUpRight
          size={14}
          aria-hidden="true"
          className="text-ink-dim transition-transform duration-base group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>

      <DeviceFrame
        chrome="plain"
        src={image}
        alt={imageAlt}
        aspect="aspect-[16/10]"
        illustration={illustration}
        light={light}
        glow={false}
        priority={priority}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
      />

      <div className="mt-4 flex flex-1 flex-col px-1">
        <p className="text-body leading-snug text-ink">
          <span className="mark-phrase font-semibold">{statLead}</span> {statRest}
        </p>
        <div className="mt-4 border-t border-rule pt-3">
          <StatusDot tone={status.tone} label={status.label} />
        </div>
      </div>
    </Link>
  );
}
