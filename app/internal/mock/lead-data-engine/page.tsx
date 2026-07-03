export const metadata = { robots: "noindex, nofollow" };

const headers = [
  "#",
  "Company",
  "Contact",
  "Title",
  "Email",
  "Phone",
  "Source",
  "Verified",
  "Score",
];

const titles = [
  "Operations",
  "Owner",
  "Fleet",
  "Logistics",
  "Dispatch",
  "Purchasing",
  "Owner",
  "Operations",
  "Safety",
];
const sources = [
  "Directory",
  "Web",
  "Directory",
  "Web",
  "Directory",
  "Web",
  "Directory",
  "Web",
  "Directory",
];
const scores = [4, 3, 5, 4, 3, 4, 5, 3, 4];

function Score({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-[3px]" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`h-[7px] w-[7px] rounded-full ${
            i < n ? "bg-ink" : "bg-rule"
          }`}
        />
      ))}
    </span>
  );
}

// Tier-2 illustration of Ethan's own deliverable format. Columns and layout are
// real; every cell is obviously-generic placeholder or masked. No real names,
// companies, contacts, or scores. Never rendered beside a claimed number.
export default function LeadDataMock() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-paper p-10 text-ink">
      <div className="w-full max-w-[1120px] border border-rule bg-paper">
        <div className="flex items-center justify-between border-b border-rule px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="h-4 w-4 bg-mark" />
            <span className="font-serif text-lg font-semibold">
              BasisWeb · Lead Data Deliverable
            </span>
          </div>
          <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-dim">
            Format illustration
          </span>
        </div>

        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-rule">
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 font-mono text-[0.68rem] font-normal uppercase tracking-widest text-ink-dim"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-mono text-[0.8rem]">
            {titles.map((t, i) => (
              <tr key={i} className="border-b border-rule">
                <td className="px-4 py-3 text-ink-dim">
                  {String(i + 1).padStart(2, "0")}
                </td>
                <td className="px-4 py-3">Company {String(i + 1).padStart(2, "0")}</td>
                <td className="px-4 py-3 text-ink-dim">••• · •••</td>
                <td className="px-4 py-3 text-ink-muted">{t}</td>
                <td className="px-4 py-3 text-ink-dim">•••••@•••••.com</td>
                <td className="px-4 py-3 text-ink-dim">(•••) •••-••••</td>
                <td className="px-4 py-3 text-ink-muted">{sources[i]}</td>
                <td className="px-4 py-3 text-live">✓</td>
                <td className="px-4 py-3">
                  <Score n={scores[i]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-rule px-6 py-4 font-mono text-[0.7rem] uppercase tracking-widest text-ink-dim">
          <span>Columns and layout shown · sample data redacted</span>
          <span>xlsx · his template</span>
        </div>
      </div>
    </div>
  );
}
