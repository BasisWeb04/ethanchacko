type Tone = "live" | "pending" | "neutral";

// Border + text share the tone color; the fill stays paper so it reads like an
// ink stamp pressed onto the document, not a filled pill.
const TONE: Record<Tone, string> = {
  live: "text-live border-live",
  pending: "text-pending border-pending",
  neutral: "text-ink-muted border-rule-strong",
};

const GLYPH: Record<Tone, string> = {
  live: "bg-live",
  pending: "bg-pending",
  neutral: "bg-ink-dim",
};

/*
  The status STAMP. Small-caps Franklin in the tone color inside a 1.5px border
  of the same color, with a small square glyph leading the label. Static and
  quiet by design; paper does not pulse. `press` runs the one-shot ink-press on
  mount (killed under reduced motion). Used by the ledger, case-file cards, case
  headers, and the hero exhibit bar.
*/
export function StatusStamp({
  tone,
  label,
  press = false,
  className = "",
}: {
  tone: Tone;
  label: string;
  press?: boolean;
  className?: string;
}) {
  return (
    <span
      data-testid="status-stamp"
      data-tone={tone}
      className={`inline-flex items-center gap-1.5 border-[1.5px] px-2 py-1 font-sans text-[0.66rem] font-bold uppercase leading-none tracking-[0.09em] ${
        TONE[tone]
      } ${press ? "stamp-press" : ""} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-[6px] w-[6px] ${GLYPH[tone]}`}
      />
      {label}
    </span>
  );
}
