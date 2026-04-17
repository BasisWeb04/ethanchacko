"use client";

import { WorkCard } from "./work-card";
import { WorkGridReveal } from "./work-grid-reveal";
import { projects } from "@/content/projects";

export function WorkGrid() {
  const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

  const sct = bySlug["servicecalltracker"];
  const basisweb = bySlug["basisweb"];
  const hammock = bySlug["hammock"];
  const occ = bySlug["operations-command"];

  const tools = [
    bySlug["warpspeed"],
    bySlug["acc-scraper"],
    bySlug["google-maps-scraper"],
  ];

  return (
    <div data-testid="work-grid" className="space-y-6">
      {/* Row 1: SCT hero (2 cols on lg) + BasisWeb + Hammock stacked (1 col on lg).
          On tablet, SCT spans both columns and BW/Hammock share a row. */}
      <div
        data-testid="work-grid-row"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div className="md:col-span-2 lg:col-span-2 lg:row-span-1">
          <WorkGridReveal index={0}>
            <WorkCard project={sct} priority featured />
          </WorkGridReveal>
        </div>
        <div className="lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 items-stretch">
          <WorkGridReveal index={1}>
            <WorkCard project={basisweb} priority />
          </WorkGridReveal>
          <WorkGridReveal index={2}>
            <WorkCard project={hammock} priority />
          </WorkGridReveal>
        </div>
      </div>

      {/* Row 2: OCC at 2-col width on lg, full-width on mobile/tablet. */}
      <div
        data-testid="work-grid-row"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div className="md:col-span-2 lg:col-span-2">
          <WorkGridReveal index={3}>
            <WorkCard project={occ} />
          </WorkGridReveal>
        </div>
        <div className="hidden lg:block" aria-hidden="true" />
      </div>

      {/* Row 3: three internal tools, equal weight. */}
      <div
        data-testid="work-grid-row"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {tools.map((project, i) => (
          <WorkGridReveal key={project.slug} index={4 + i}>
            <WorkCard project={project} />
          </WorkGridReveal>
        ))}
      </div>
    </div>
  );
}
