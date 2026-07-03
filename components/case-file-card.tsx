import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StatusDot } from "./status-dot";

type Tone = "live" | "pending" | "neutral";

/*
  A case-file card: the homepage receipts strip is three of these. Each is a
  clipped exhibit, one true line with the number marked, and a status stamp,
  laid out like a file on a desk. This is where the design spends its boldness.
*/
export function CaseFileCard({
  caseLabel,
  href,
  image,
  imageAlt,
  illustration = false,
  statLead,
  statRest,
  status,
  priority = false,
}: {
  caseLabel: string;
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
      className="group flex h-full flex-col border border-rule bg-paper transition-colors duration-base hover:border-rule-strong"
    >
      <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
        <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-dim">
          {caseLabel}
        </span>
        <ArrowRight
          size={14}
          aria-hidden="true"
          className="text-ink-dim transition-transform duration-base group-hover:translate-x-0.5"
        />
      </div>

      <div className="relative aspect-[16/10] overflow-hidden border-b border-rule bg-paper-elev">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="object-cover object-top"
        />
        {illustration && (
          <span className="absolute bottom-0 left-0 bg-paper/90 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-ink-dim">
            Illustration
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
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
