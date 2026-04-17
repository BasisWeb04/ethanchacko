Phase 5.5: structural overhaul. This is the phase that moves the site
from "good portfolio" to "agency-grade." Three structural changes:
left-gutter section layout, asymmetric work grid, beefed-up light
case studies.

Prerequisite: Phase 5.1 must be shipped with all tests passing.

---

Task 1: Left-gutter layout applied site-wide.

Current state: sections on homepage, /for-agencies, /for-clients all
live in a center-constrained column. Only the case study template
uses left-gutter section labels correctly.

Goal: every major section on every page uses the same layout:
  - Section label in a left column (approx 180-220px wide)
  - Content in the right column (takes remaining space up to container max)
  - Hairline --border between sections (full container width)

Create a shared layout component components/section.tsx:

  type SectionProps = {
    number?: string;
    label: string;
    children: React.ReactNode;
    bordered?: boolean;
    className?: string;
  };
  
  export function Section({
    number,
    label,
    children,
    bordered = true,
    className = "",
  }: SectionProps) {
    return (
      <section
        className={`px-gutter py-section-y ${
          bordered ? "border-t border-border" : ""
        } ${className}`}
      >
        <div className="mx-auto max-w-container grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionLabel number={number} label={label} />
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </section>
    );
  }

Apply Section to:

  app/page.tsx
    - Hero stays as-is (no label on hero, it's the entry)
    - / 01 SELECTED WORK uses <Section number="01" label="SELECTED WORK">
    - / 02 STACK uses <Section number="02" label="STACK">
    - / 03 CONTACT uses <Section number="03" label="CONTACT">

  app/for-agencies/page.tsx
    - Hero stays as-is
    - / WORKFLOW uses <Section label="WORKFLOW">
    - / WHAT I BUILD uses <Section label="WHAT I BUILD">
    - Contract sheet uses <Section label="TERMS">
      (rename from current unlabeled sheet; label is TERMS)
    - / CONTACT uses <Section label="CONTACT">

  app/for-clients/page.tsx
    - Hero stays as-is
    - / PROCESS uses <Section label="PROCESS">
    - / WHAT I BUILD uses <Section label="WHAT I BUILD">
    - FAQ uses <Section label="QUESTIONS">
    - / CONTACT uses <Section label="CONTACT">

The sticky section label on desktop means as user scrolls through a
long section, the label stays visible in the gutter until the next
section arrives. This is the "newspaper spine" effect that
communicates structure.

On mobile (< lg breakpoint), the grid collapses to a single column.
Label renders above content. No sticky behavior.

Remove the mx-auto max-w-[72ch] FAQ wrapper in for-clients. It now
lives inside the Section component's right column and inherits
container width with its own max-width inside:

  <div className="max-w-[60ch]">
    {faq.map(...)}
  </div>

---

Task 2: Asymmetric work grid.

Current state: 3-column uniform grid, 7 cards all equal size. Reads
as Claude-generated.

Replace with a manually composed grid that reflects project hierarchy.
ServiceCallTracker is the flagship. BasisWeb + Hammock + Operations
Command Center are LIVE supporting projects. Warpspeed + ACC +
Google Maps are shipped internal tools.

Create components/work-grid.tsx:

  "use client";
  import { WorkCard } from "./work-card";
  import { WorkGridReveal } from "./work-grid-reveal";
  import { projects } from "@/content/projects";
  
  export function WorkGrid() {
    const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
    const order = [
      "servicecalltracker",
      "basisweb",
      "hammock",
      "operations-command",
      "warpspeed",
      "acc-scraper",
      "google-maps-scraper",
    ];
    
    // Desktop layout:
    // Row 1: SCT spans 2 columns (hero)
    // Row 2: BasisWeb + Hammock + OCC (3 equal)
    // Row 3: Warpspeed + ACC + GMaps (3 equal)
    
    return (
      <div className="space-y-6">
        {/* Row 1: hero */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 lg:row-span-1">
            <WorkGridReveal index={0}>
              <WorkCard project={bySlug["servicecalltracker"]} priority featured />
            </WorkGridReveal>
          </div>
          <div className="lg:col-span-1 flex flex-col gap-6">
            <WorkGridReveal index={1}>
              <WorkCard project={bySlug["basisweb"]} priority />
            </WorkGridReveal>
            <WorkGridReveal index={2}>
              <WorkCard project={bySlug["hammock"]} priority />
            </WorkGridReveal>
          </div>
        </div>
        
        {/* Row 2: OCC alone at mid weight */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WorkGridReveal index={3}>
              <WorkCard project={bySlug["operations-command"]} />
            </WorkGridReveal>
          </div>
          <div className="hidden lg:block" />
        </div>
        
        {/* Row 3: three internal tools, equal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["warpspeed", "acc-scraper", "google-maps-scraper"].map((slug, i) => (
            <WorkGridReveal key={slug} index={4 + i}>
              <WorkCard project={bySlug[slug]} />
            </WorkGridReveal>
          ))}
        </div>
      </div>
    );
  }

WorkCard needs to accept a `featured` prop that affects thumbnail
aspect ratio and body density:

  In components/work-card.tsx:
  type Props = {
    project: Project;
    priority?: boolean;
    featured?: boolean;
  };
  
  When featured is true:
    - Change thumbnail aspect-[16/10] to aspect-[16/9]
    - Card body padding goes from p-4 to p-6
    - Title goes from text-h3 to text-h2
    - Description max-width increases

Update app/page.tsx to use <WorkGrid /> instead of the current
inline .map over projects.

On mobile and tablet, asymmetric grid collapses:
  - Mobile: every card full width, stacked
  - Tablet: 2-column grid, SCT spans both columns
  - Desktop: the 3-column asymmetric layout above

---

Task 3: Case study writeups for the 4 LIVE projects.

File: content/projects.ts

Current LIVE writeups are 1-2 sentences. They feel thin next to the
SHIPPED project full post-mortems. Add one concrete metric each.

Update context and result for these four:

  servicecalltracker (existing context is fine, beef up result):
    result: "Feature-complete and launch-ready. 20+ pages, 119
    components, 10-page interactive demo dashboard, 5 industry
    landing pages. 40 Playwright tests passing, zero build warnings.
    Full funnel from homepage through solutions wizard to lead
    capture to Calendly booking."
  
  basisweb:
    context: "Agency platform and client gateway for BasisWeb. Scroll-
    pinned portfolio with device-framed screenshots, numbered
    capability cards with click-to-flip 3D interaction, bottom
    sticky pill navbar, free contractor tools."
    result: "Serves as both portfolio and lead capture for the
    agency. Four free calculator tools embedded as value-add for
    contractors, ranking in organic search for 'hvac pricing
    calculator' and adjacent queries."
  
  hammock:
    context: "Client build for Hammock Property Inspections, a
    Florida Space Coast home inspector. Clean 5-page marketing site
    with booking form backend, mobile-optimized, deployed to the
    client's own Vercel account via guided screen-share handoff."
    result: "Delivered in two milestones. Client owns deployment,
    repo, and all infrastructure. First paying external client
    build end to end. Navy / warm neutral / muted teal palette
    locked in during discovery, Merriweather and Inter for a
    print-meets-web aesthetic."
  
  operations-command:
    context: "Centralized work-order intake and routing for
    multi-location restaurant maintenance operations. Replaced a
    ServiceNow and ServiceChannel workflow with a purpose-built
    command center. Automated work orders flow from intake through
    dispatch to HouseCall Pro via n8n."
    result: "First paying BasisWeb client. Operational system
    running real restaurant maintenance workflow across multiple
    locations. Work orders that previously required manual
    re-entry into two systems now flow in under 30 seconds from
    intake to technician."

Keep the existing stackDetailed fields. Update only context and
result where listed above.

---

Task 4: Homepage hero density fix.

File: app/page.tsx

The hero currently feels spare because subhead + two buttons is the
entire above-fold. Add two elements to increase density without
adding noise:

  After the two CTA buttons, add a three-column metadata strip in
  mono small:

  <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-[640px] pt-8 border-t border-border">
    <div>
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-dim mb-1">
        BASED IN
      </div>
      <div className="font-mono text-mono text-fg">Phoenix, AZ</div>
    </div>
    <div>
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-dim mb-1">
        AVAILABLE FOR
      </div>
      <div className="font-mono text-mono text-fg">Subcontracting + direct</div>
    </div>
    <div>
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-dim mb-1">
        RESPONDING
      </div>
      <div className="font-mono text-mono text-fg">Within 24 hours</div>
    </div>
  </div>

This adds the tactical metadata under the manifesto without breaking
the manifesto's single-statement impact. Same mono vocabulary as the
HUD chip and case study metadata, consistent across the site.

---

Task 5: Test updates.

Update tests/phase2.spec.ts work grid assertions. The layout changes
mean:
  - Work cards total is still 7
  - But column counts vary by row
  - Update any "single left position" assertion at mobile to still
    work, any desktop "3 unique left positions" assertion needs to
    change

Rewrite the relevant tests to match the new grid:
  - Mobile (390x844): 7 cards, all left-aligned (1 unique left)
  - Tablet (768x1024): 7 cards, up to 2 unique lefts per row,
    SCT still full width
  - Desktop (1440x900): at least 3 unique lefts present across
    the whole grid; SCT card width is visibly larger than others

Do not weaken tests to make them pass. Do not test specific pixel
widths (brittle). Test relationships: SCT's width > BasisWeb's width
at desktop, for example.

Update tests/audit.spec.ts where applicable for the new Section
component structure. Every page's h1 should still be present.
Every page should still render a footer. Smoke tests remain valid.

Add a new test file tests/phase55.spec.ts with structural assertions:
  - Every main page has at least one Section with left-gutter
    (grid-template-columns containing 220px at lg viewport)
  - Work grid on homepage has at least 3 distinct row widths at
    desktop
  - Case study headers include a promoted VISIT LIVE button above
    the status row (for LIVE projects)
  - Hero metadata strip renders 3 columns on desktop, stacks on
    mobile

---

Rules:
- No em dashes anywhere
- Every animation wrapped in prefers-reduced-motion check
- Sticky section labels only on lg breakpoint and above
- Commit after each numbered task
- Use Context7 MCP to verify:
    CSS grid sticky positioning within grid items
    Tailwind arbitrary grid-cols values
    framer-motion layout animations if used
- Run full Playwright suite at end, report results

Stop after Task 5. Paste results and screenshots of:
  - Homepage desktop (1440x900) full page
  - /for-agencies desktop
  - /for-clients desktop
  - Homepage mobile (390x844) full page
  - One case study desktop