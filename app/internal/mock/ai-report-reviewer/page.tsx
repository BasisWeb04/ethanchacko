export const metadata = { robots: "noindex, nofollow" };

type Check = { status: "pass" | "flag"; text: string };
type SectionData = { name: string; checks: Check[] };

// Generic home-inspection categories and placeholder finding text. No client
// name, no branding, no app URL, no accuracy number, no real defect specifics.
const sections: SectionData[] = [
  {
    name: "Roof",
    checks: [
      { status: "pass", text: "Covering condition reviewed against the standard" },
      { status: "flag", text: "Flashing note needs reviewer confirmation" },
    ],
  },
  {
    name: "Exterior",
    checks: [
      { status: "pass", text: "Grading and drainage described as required" },
      { status: "pass", text: "Wall cladding coverage present" },
    ],
  },
  {
    name: "Electrical",
    checks: [
      { status: "flag", text: "Panel labeling comment missing a required detail" },
      { status: "pass", text: "Service rating recorded" },
    ],
  },
  {
    name: "Plumbing",
    checks: [
      { status: "pass", text: "Water heater specifics captured" },
      { status: "pass", text: "Fixture check noted per standard" },
    ],
  },
  {
    name: "HVAC",
    checks: [
      { status: "pass", text: "System type and age documented" },
      { status: "flag", text: "Maintenance note phrased below the standard" },
    ],
  },
  {
    name: "Interior",
    checks: [
      { status: "pass", text: "Room-by-room coverage complete" },
      { status: "pass", text: "Safety items called out as required" },
    ],
  },
];

// Tier-2 illustration of Ethan's own review-scorecard format. Layout is real;
// section names are generic categories and all findings are placeholder text.
export default function ReportReviewMock() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-paper p-10 text-ink">
      <div className="w-full max-w-[1000px] border border-rule bg-paper">
        <div className="flex items-center justify-between border-b border-rule px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="h-4 w-4 bg-mark" />
            <span className="font-serif text-lg font-semibold">
              Report Review · Scorecard
            </span>
          </div>
          <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-dim">
            Format illustration
          </span>
        </div>

        <div className="grid grid-cols-2">
          {sections.map((s, i) => (
            <div
              key={s.name}
              className={`px-6 py-5 border-rule ${
                i % 2 === 0 ? "border-r" : ""
              } ${i < sections.length - 2 ? "border-b" : ""}`}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-serif text-base font-semibold">
                  {s.name}
                </span>
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-dim">
                  Section {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="space-y-2.5">
                {s.checks.map((c, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span
                      className={`mt-[2px] shrink-0 border px-1.5 py-[2px] font-mono text-[0.6rem] uppercase tracking-widest ${
                        c.status === "pass"
                          ? "border-live text-live"
                          : "border-pending text-pending"
                      }`}
                    >
                      {c.status === "pass" ? "Pass" : "Flag"}
                    </span>
                    <span className="text-small leading-snug text-ink-muted">
                      {c.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-rule px-6 py-4 font-mono text-[0.7rem] uppercase tracking-widest text-ink-dim">
          <span>Layout shown · findings are placeholder text</span>
          <span>Grounded in the client&apos;s own standards</span>
        </div>
      </div>
    </div>
  );
}
