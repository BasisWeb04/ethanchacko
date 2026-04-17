"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StatusDot } from "./status-dot";

export type Project = {
  slug: string;
  title: string;
  description: string;
  status: "LIVE" | "SHIPPED";
  stack: string[];
  thumbnailUrl?: string;
  liveUrl?: string;
};

export function WorkCard({ project }: { project: Project }) {
  const statusType = project.status === "LIVE" ? "live" : "shipped";

  return (
    <div
      data-testid="work-card"
      data-status={project.status}
      className="group border border-border rounded-md bg-bg-elev hover:border-border-strong transition-colors duration-base"
    >
      {/* Thumbnail placeholder */}
      <div className="relative aspect-[16/10] bg-bg-elev rounded-t-md overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-mono text-fg-dim uppercase tracking-widest">
            {project.slug}
          </span>
        </div>
        {project.status === "LIVE" && project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="external-link"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-md border border-border bg-bg/80 text-fg-muted hover:text-fg hover:border-border-strong transition-colors duration-base"
          >
            <ArrowUpRight size={16} />
          </a>
        )}
      </div>

      {/* Card body */}
      <Link href={`/work/${project.slug}`} className="block p-4">
        <div className="mb-2 group-hover:scale-[1.15] origin-left transition-transform duration-base motion-reduce:transform-none inline-block">
          <StatusDot status={statusType} />
        </div>
        <h3 className="text-h3 text-fg mb-1">{project.title}</h3>
        <p className="text-small text-fg-muted mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-mono text-fg-dim"
            >
              {tech}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
}
