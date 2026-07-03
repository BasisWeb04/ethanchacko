import Image from "next/image";

export type Callout = {
  n: number;
  /** Plain-words margin note, keyed to the marker number. */
  note: string;
  /** Optional pin position on the image, as percentages (0-100). */
  x?: number;
  y?: number;
};

/*
  Signature element: the annotated exhibit. A real screenshot marked up the way
  a careful engineer marks up a document for a client. Numbered markers pin to
  points on the image and key to short plain-English notes underneath.
  Translating a system into owner language is the service being sold, so the
  design performs it. No browser chrome: the evidence stands on its own with a
  caption. The caption states honestly what the image is (for an illustration of
  Ethan's own tool, it says so, in the register of a diagram credit).
*/
export function AnnotatedExhibit({
  src,
  alt,
  caption,
  callouts = [],
  aspect = "aspect-[16/10]",
  priority = false,
  illustration = false,
}: {
  src: string;
  alt: string;
  caption: string;
  callouts?: Callout[];
  aspect?: string;
  priority?: boolean;
  illustration?: boolean;
}) {
  const pinned = callouts.filter((c) => c.x != null && c.y != null);

  return (
    <figure data-testid="annotated-exhibit">
      <div className="relative border border-rule bg-paper-elev">
        <div className={`relative ${aspect}`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 760px, 100vw"
            priority={priority}
            className="object-cover object-top"
          />
          {illustration && (
            <span className="absolute left-0 top-0 bg-ink/85 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-paper">
              Illustration
            </span>
          )}
          {pinned.map((c) => (
            <span
              key={c.n}
              aria-hidden="true"
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-ink bg-mark font-mono text-[11px] font-semibold text-ink shadow-[0_1px_2px_rgba(28,27,24,0.25)]"
            >
              {c.n}
            </span>
          ))}
        </div>
      </div>

      {callouts.length > 0 && (
        <ol className="mt-4 space-y-2.5">
          {callouts.map((c) => (
            <li key={c.n} className="flex gap-3">
              <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center border border-ink bg-mark font-mono text-[11px] font-semibold text-ink">
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
