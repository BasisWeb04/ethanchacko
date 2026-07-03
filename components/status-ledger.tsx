import { StatusDot } from "./status-dot";

type Tone = "live" | "pending" | "neutral";

export type LedgerRow = {
  tone: Tone;
  /** Short status stamp, e.g. LIVE, ROLLING OUT, IN BUILD. */
  status: string;
  /** What that status applies to, in owner-plain words. */
  item: string;
};

/*
  Signature element: the straight-status ledger. Every case study carries one.
  It states plainly what is live, what is rolling out, what is in build, and
  ends on the line that declines a result not yet earned. No other portfolio
  puts its own limits on the page; that is the receipts positioning made visible.
*/
export function StatusLedger({
  rows,
  note,
  title = "Status ledger",
  className = "",
}: {
  rows: LedgerRow[];
  note?: string;
  title?: string;
  className?: string;
}) {
  return (
    <div
      data-testid="status-ledger"
      className={`border border-rule bg-paper-elev ${className}`}
    >
      <div className="border-b border-rule px-4 py-3 font-mono text-mono uppercase tracking-widest text-ink-dim">
        {title}
      </div>
      <dl className="divide-y divide-rule">
        {rows.map((row, i) => (
          <div
            key={i}
            data-testid="ledger-row"
            className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-5"
          >
            <dt className="shrink-0">
              <StatusDot tone={row.tone} label={row.status} />
            </dt>
            <dd className="text-small leading-snug text-ink">{row.item}</dd>
          </div>
        ))}
      </dl>
      {note && (
        <div className="flex gap-3 border-t border-rule bg-paper px-4 py-3">
          <span className="shrink-0 pt-[2px] font-mono text-mono uppercase tracking-widest text-ink-dim">
            Results
          </span>
          <p className="text-small leading-snug text-ink-muted">{note}</p>
        </div>
      )}
    </div>
  );
}
