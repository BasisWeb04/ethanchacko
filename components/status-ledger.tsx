import { StatusStamp } from "./status-stamp";

type Tone = "live" | "pending" | "neutral";

export type LedgerRow = {
  tone: Tone;
  /** Short status stamp, e.g. LIVE, IN BUILD, DELIVERED. */
  status: string;
  /** What that status applies to, in owner-plain words. */
  item: string;
};

/*
  Signature element: the straight-status registry. Every case study carries one.
  It states plainly what is live, what is in build, and ends on the line that
  declines a result not yet earned. Styled as a document registry table: a
  column-header row, a stamp column, hairline row rules, and a RESULTS note row.
  No other portfolio puts its own limits on the page; that is the receipts
  positioning made visible.
*/
export function StatusLedger({
  rows,
  note,
  title = "Status registry",
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
      {/* Registry head */}
      <div className="border-b border-rule px-4 py-3">
        <span className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.09em] text-ink-muted">
          {title}
        </span>
      </div>

      {/* Column header row */}
      <div className="hidden grid-cols-[9rem_minmax(0,1fr)] gap-5 border-b border-rule bg-paper px-4 py-2 sm:grid">
        <span className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-ink-dim">
          Status
        </span>
        <span className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-ink-dim">
          Item
        </span>
      </div>

      <dl className="divide-y divide-rule">
        {rows.map((row, i) => (
          <div
            key={i}
            data-testid="ledger-row"
            className="grid grid-cols-1 gap-2 px-4 py-3 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-5"
          >
            <dt className="shrink-0">
              <StatusStamp tone={row.tone} label={row.status} />
            </dt>
            <dd className="text-small leading-snug text-ink">{row.item}</dd>
          </div>
        ))}
      </dl>

      {note && (
        <div className="flex flex-col gap-2 border-t border-rule bg-paper px-4 py-3 sm:flex-row sm:gap-5">
          <span className="shrink-0 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.09em] text-ink-dim sm:w-[9rem]">
            Results
          </span>
          <p className="text-small leading-snug text-ink-muted">{note}</p>
        </div>
      )}
    </div>
  );
}
