export const metadata = { robots: "noindex, nofollow" };

const leads = [
  { name: "Desert Cool HVAC", rating: 4.9, reviews: 287, phone: "(602) 555-0134", website: "desertcoolhvac.com", address: "4512 N 7th St, Phoenix AZ" },
  { name: "Phoenix Plumbing Pros", rating: 4.8, reviews: 412, phone: "(602) 555-0199", website: "phxplumbingpros.com", address: "2201 W Camelback Rd, Phoenix AZ" },
  { name: "Valley Wide AC Repair", rating: 4.7, reviews: 156, phone: "(480) 555-0147", website: "valleywideac.net", address: "938 E Southern Ave, Mesa AZ" },
  { name: "Copper State Heating", rating: 4.9, reviews: 203, phone: "(602) 555-0166", website: "copperstateheating.com", address: "6817 N 16th St, Phoenix AZ" },
  { name: "Scottsdale Air Pros", rating: 4.8, reviews: 98, phone: "(480) 555-0121", website: "scottsdaleairpros.com", address: "8225 E Indian School Rd, Scottsdale AZ" },
  { name: "Ahwatukee AC Masters", rating: 4.6, reviews: 142, phone: "(480) 555-0187", website: "ahwatukeeac.com", address: "4747 E Elliot Rd, Phoenix AZ" },
  { name: "Gilbert Climate Control", rating: 4.7, reviews: 176, phone: "(480) 555-0133", website: "gilbertclimate.com", address: "1401 W Elliot Rd, Gilbert AZ" },
  { name: "Mesa Mechanical HVAC", rating: 4.5, reviews: 89, phone: "(480) 555-0102", website: "mesamech.com", address: "2929 E Broadway Rd, Mesa AZ" },
  { name: "Tempe Comfort Systems", rating: 4.8, reviews: 218, phone: "(480) 555-0156", website: "tempecomfort.com", address: "1830 E University Dr, Tempe AZ" },
  { name: "Chandler Cooling Co", rating: 4.9, reviews: 264, phone: "(480) 555-0179", website: "chandlercooling.com", address: "2150 S Arizona Ave, Chandler AZ" },
  { name: "North Phoenix HVAC", rating: 4.6, reviews: 112, phone: "(602) 555-0143", website: "northphxhvac.com", address: "16035 N 7th Ave, Phoenix AZ" },
  { name: "Sonoran Heating & Air", rating: 4.7, reviews: 191, phone: "(602) 555-0118", website: "sonoranhvac.com", address: "4340 W Indian School Rd, Phoenix AZ" },
  { name: "Peoria Air Experts", rating: 4.8, reviews: 134, phone: "(623) 555-0164", website: "peoriaairexperts.com", address: "9030 W Peoria Ave, Peoria AZ" },
  { name: "Glendale HVAC Services", rating: 4.5, reviews: 76, phone: "(623) 555-0128", website: "glendalehvac.net", address: "5805 W Bell Rd, Glendale AZ" },
];

export default function GoogleMapsScraperMock() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] text-[#EDEDED] font-sans flex flex-col">
      {/* Top bar */}
      <div className="h-[52px] shrink-0 border-b border-[#1A1A1A] flex items-center px-6 gap-6">
        <div className="flex items-center gap-2 font-mono text-[12px] tracking-[0.12em] uppercase text-[#8A8A8A]">
          <span className="text-[#FFB000]">&bull;</span>
          GMAPS / LEAD SCRAPER
        </div>
        <div className="ml-auto flex items-center gap-4 font-mono text-[11px] tracking-[0.1em] uppercase text-[#8A8A8A]">
          <span>query:</span>
          <span className="text-[#EDEDED]">HVAC phoenix metro</span>
          <span className="text-[#4A4A4A]">/</span>
          <span>page 3 of 8</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 border-b border-[#1A1A1A]">
        {[
          { label: "SCRAPED", value: "51" },
          { label: "WITH PHONE", value: "51" },
          { label: "WITH WEBSITE", value: "47" },
          { label: "AVG RATING", value: "4.73" },
          { label: "CHAINS FILTERED", value: "8" },
        ].map((s, i) => (
          <div
            key={s.label}
            className={`px-6 py-4 ${i < 4 ? "border-r border-[#1A1A1A]" : ""}`}
          >
            <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#8A8A8A] mb-1">
              {s.label}
            </div>
            <div className="font-sans text-[24px] font-bold leading-none">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-[1fr_90px_110px_150px_200px_1fr] items-center px-6 py-3 border-b border-[#1A1A1A] font-mono text-[11px] tracking-[0.12em] uppercase text-[#8A8A8A]">
          <span>BUSINESS</span>
          <span className="text-right">RATING</span>
          <span className="text-right">REVIEWS</span>
          <span>PHONE</span>
          <span>WEBSITE</span>
          <span>ADDRESS</span>
        </div>
        {leads.map((l) => (
          <div
            key={l.name}
            className="grid grid-cols-[1fr_90px_110px_150px_200px_1fr] items-center px-6 py-[11px] border-b border-[#1A1A1A] text-[13px] hover:bg-[#0C0C0C]"
          >
            <span className="text-[#EDEDED] truncate">{l.name}</span>
            <span className="font-mono text-right text-[#FFB000]">{l.rating.toFixed(1)}</span>
            <span className="font-mono text-right text-[#EDEDED]">{l.reviews}</span>
            <span className="font-mono text-[12px] text-[#8A8A8A]">{l.phone}</span>
            <span className="font-mono text-[12px] text-[#8A8A8A] truncate">{l.website}</span>
            <span className="text-[#8A8A8A] truncate">{l.address}</span>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="h-[28px] shrink-0 border-t border-[#1A1A1A] flex items-center justify-between px-6 font-mono text-[11px] text-[#4A4A4A]">
        <span>exporting: phx-hvac-2026-04-15.csv &bull; 51 rows</span>
        <span>playwright / python / asyncio / proxy pool 12 active</span>
      </div>
    </div>
  );
}
