import { ExhibitImage } from "./exhibit-image";
import { StatusStamp } from "./status-stamp";
import type { Callout } from "@/content/projects";

export type { Callout };

type Tone = "live" | "pending" | "neutral";

/*
  Signature element: the annotated exhibit, restaged as a mounted proof. A real
  capture set on a paper mat with registration crop marks at the corners, marked
  up the way a careful engineer marks a document for a client. Numbered markers
  pin to points on the image and key to short plain-English notes underneath.
  Tier-1 captures carry the inspection loupe; Tier-2 illustrations keep an honest
  caption and no loupe. An optional header bar carries the exhibit letter, a
  field label, and a pressed status stamp (the hero's "live dashboard" bar).
*/
export function AnnotatedExhibit({
  src,
  alt,
  caption,
  callouts = [],
  aspect = "aspect-[16/10]",
  priority = false,
  illustration = false,
  letter,
  label,
  stamp,
}: {
  src: string;
  alt: string;
  caption: string;
  callouts?: Callout[];
  aspect?: string;
  priority?: boolean;
  illustration?: boolean;
  /** Exhibit letter where a page has a real sequence (A / B / C). */
  letter?: string;
  /** Field label shown in the exhibit header bar. */
  label?: string;
  /** Pressed status stamp on the exhibit header bar. */
  stamp?: { tone: Tone; label: string };
}) {
  const pinned = callouts.filter((c) => c.x != null && c.y != null);
  const hasHeader = Boolean(label || stamp || letter);

  return (
    <figure data-testid="annotated-exhibit">
      <div className="relative border border-rule bg-paper-elev p-2 sm:p-3">
        <CropMarks />

        {hasHeader && (
          <div className="mb-2 flex items-center justify-between gap-3 sm:mb-3">
            <span className="inline-flex items-center gap-2.5">
              {letter && (
                <span className="inline-flex h-6 min-w-6 items-center justify-center border border-ink px-1 font-sans text-[0.7rem] font-bold text-ink">
                  {letter}
                </span>
              )}
              {label && (
                <span className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.09em] text-ink-muted">
                  {label}
                </span>
              )}
            </span>
            {stamp && <StatusStamp tone={stamp.tone} label={stamp.label} press />}
          </div>
        )}

        <ExhibitImage
          src={src}
          alt={alt}
          aspect={aspect}
          priority={priority}
          illustration={illustration}
          pinned={pinned}
        />
      </div>

      {callouts.length > 0 && (
        <ol className="mt-4 space-y-2.5">
          {callouts.map((c) => (
            <li key={c.n} className="flex gap-3">
              <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center border border-[color:var(--on-mark)] bg-mark font-mono text-[11px] font-semibold text-[color:var(--on-mark)]">
                {c.n}
              </span>
              <span className="font-mono text-[0.8rem] leading-relaxed text-ink-muted">
                {c.note}
              </span>
            </li>
          ))}
        </ol>
      )}

      <figcaption className="mt-3 font-mono text-mono leading-snug text-ink-dim">
        {caption}
      </figcaption>
    </figure>
  );
}

/* Registration marks at the four corners of the mat, like a printer's proof. */
function CropMarks() {
  const arm = "absolute h-2.5 w-2.5 border-rule-strong";
  return (
    <span aria-hidden="true">
      <span className={`${arm} left-1 top-1 border-l border-t`} />
      <span className={`${arm} right-1 top-1 border-r border-t`} />
      <span className={`${arm} bottom-1 left-1 border-b border-l`} />
      <span className={`${arm} bottom-1 right-1 border-b border-r`} />
    </span>
  );
}
