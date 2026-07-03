type Tone = "live" | "pending" | "neutral";

const DOT: Record<Tone, string> = {
  live: "bg-live",
  pending: "bg-pending",
  neutral: "bg-ink-dim",
};

const LABEL: Record<Tone, string> = {
  live: "text-live",
  pending: "text-pending",
  neutral: "text-ink-dim",
};

/*
  A single status marker: a small filled dot and a mono label, the way a build
  log stamps a line. Static and quiet by design; paper does not pulse.
*/
export function StatusDot({
  tone,
  label,
  className = "",
}: {
  tone: Tone;
  label: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`inline-block h-[7px] w-[7px] rounded-full ${DOT[tone]}`}
        aria-hidden="true"
      />
      <span
        className={`font-mono text-mono uppercase tracking-widest ${LABEL[tone]}`}
      >
        {label}
      </span>
    </span>
  );
}
