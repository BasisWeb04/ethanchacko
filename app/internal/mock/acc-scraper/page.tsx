export const metadata = { robots: "noindex, nofollow" };

const filings = [
  { id: "L25-0412-0091", filed: "2026-04-15 03:12", name: "Desert Ridge Plumbing Co", agent: "J. Ortiz", county: "Maricopa", enrich: "FOUND", score: 82 },
  { id: "L25-0412-0087", filed: "2026-04-15 02:58", name: "Copper State Detail LLC", agent: "M. Reyes", county: "Maricopa", enrich: "FOUND", score: 71 },
  { id: "L25-0412-0079", filed: "2026-04-15 01:44", name: "Mesa Home Services Group", agent: "A. Patel", county: "Maricopa", enrich: "FOUND", score: 64 },
  { id: "L25-0412-0074", filed: "2026-04-15 00:21", name: "Sonoran Aire Mechanical", agent: "R. Kim", county: "Maricopa", enrich: "PENDING", score: null },
  { id: "L25-0412-0068", filed: "2026-04-14 23:47", name: "Tempe Roof Rescue LLC", agent: "B. Navarro", county: "Maricopa", enrich: "FOUND", score: 88 },
  { id: "L25-0412-0061", filed: "2026-04-14 22:19", name: "Scottsdale Pool & Patio", agent: "K. Schultz", county: "Maricopa", enrich: "FOUND", score: 59 },
  { id: "L25-0412-0055", filed: "2026-04-14 21:32", name: "Gilbert Fence & Gate", agent: "D. Tran", county: "Maricopa", enrich: "NOISE", score: 22 },
  { id: "L25-0412-0049", filed: "2026-04-14 20:08", name: "Chandler Electric Works LLC", agent: "T. Williams", county: "Maricopa", enrich: "FOUND", score: 77 },
  { id: "L25-0412-0041", filed: "2026-04-14 19:15", name: "Peoria Auto Glass Pro", agent: "S. Hernandez", county: "Maricopa", enrich: "FOUND", score: 68 },
  { id: "L25-0412-0036", filed: "2026-04-14 18:02", name: "North Valley Landscape Co", agent: "J. Goodwin", county: "Maricopa", enrich: "PENDING", score: null },
  { id: "L25-0412-0029", filed: "2026-04-14 17:41", name: "Ahwatukee Pest Control", agent: "L. Nakamura", county: "Maricopa", enrich: "FOUND", score: 73 },
  { id: "L25-0412-0022", filed: "2026-04-14 16:28", name: "Arcadia HVAC Solutions LLC", agent: "C. Barrett", county: "Maricopa", enrich: "FOUND", score: 91 },
];

function enrichStyle(s: string) {
  if (s === "FOUND") return "text-[#22C55E]";
  if (s === "PENDING") return "text-[#FFB000]";
  return "text-[#6a6a70]";
}

export default function AccScraperMock() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] text-[#EDEDED] font-sans flex flex-col">
      {/* Top bar */}
      <div className="h-[52px] shrink-0 border-b border-[#1A1A1A] flex items-center px-6 gap-6">
        <div className="flex items-center gap-2 font-mono text-[12px] tracking-[0.12em] uppercase text-[#8A8A8A]">
          <span className="text-[#FFB000]">&bull;</span>
          ACC / AZCC WATCHER
        </div>
        <div className="ml-auto flex items-center gap-6 font-mono text-[11px] tracking-[0.1em] uppercase text-[#8A8A8A]">
          <span>MARICOPA</span>
          <span className="text-[#4A4A4A]">/</span>
          <span>24H WINDOW</span>
          <span className="text-[#4A4A4A]">/</span>
          <span className="text-[#22C55E]">WATCHING</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 border-b border-[#1A1A1A]">
        {[
          { label: "NEW FILINGS", value: "47", sub: "last 24h" },
          { label: "ENRICHED", value: "38", sub: "80.8%" },
          { label: "HIGH-SCORE", value: "12", sub: "score > 75" },
          { label: "NOISE FILTERED", value: "9", sub: "shell / holding" },
        ].map((s, i) => (
          <div
            key={s.label}
            className={`px-6 py-5 ${i < 3 ? "border-r border-[#1A1A1A]" : ""}`}
          >
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#8A8A8A] mb-2">
              {s.label}
            </div>
            <div className="font-sans text-[32px] font-bold leading-none">{s.value}</div>
            <div className="font-mono text-[11px] text-[#4A4A4A] mt-2">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-[180px_150px_1fr_160px_110px_120px_80px] items-center px-6 py-3 border-b border-[#1A1A1A] font-mono text-[11px] tracking-[0.12em] uppercase text-[#8A8A8A]">
          <span>FILING ID</span>
          <span>FILED</span>
          <span>BUSINESS NAME</span>
          <span>STATUTORY AGENT</span>
          <span>COUNTY</span>
          <span>ENRICHMENT</span>
          <span className="text-right">SCORE</span>
        </div>
        {filings.map((f) => (
          <div
            key={f.id}
            className="grid grid-cols-[180px_150px_1fr_160px_110px_120px_80px] items-center px-6 py-3 border-b border-[#1A1A1A] text-[14px] hover:bg-[#0C0C0C]"
          >
            <span className="font-mono text-[12px] text-[#8A8A8A]">{f.id}</span>
            <span className="font-mono text-[12px] text-[#8A8A8A]">{f.filed}</span>
            <span className="text-[#EDEDED]">{f.name}</span>
            <span className="text-[#8A8A8A]">{f.agent}</span>
            <span className="font-mono text-[12px] text-[#4A4A4A]">{f.county}</span>
            <span className={`font-mono text-[12px] tracking-[0.1em] ${enrichStyle(f.enrich)}`}>
              {f.enrich}
            </span>
            <span className="font-mono text-right text-[13px]">
              {f.score !== null ? (
                <span className={f.score > 75 ? "text-[#FFB000]" : "text-[#EDEDED]"}>
                  {f.score}
                </span>
              ) : (
                <span className="text-[#4A4A4A]">&ndash;</span>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="h-[28px] shrink-0 border-t border-[#1A1A1A] flex items-center justify-between px-6 font-mono text-[11px] text-[#4A4A4A]">
        <span>next run in 00:14:22</span>
        <span>hetzner-cx22 / playwright / seen-ids.json 14,812 rows</span>
      </div>
    </div>
  );
}
