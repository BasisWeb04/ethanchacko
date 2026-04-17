"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { StatusDot } from "./status-dot";

export type Project = {
  slug: string;
  title: string;
  description: string;
  status: "LIVE" | "SHIPPED";
  stack: string[];
  thumbnailUrl?: string;
  thumbnailLabel?: string;
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
      {/* Thumbnail with browser chrome */}
      <div className="relative aspect-[16/10] rounded-t-md overflow-hidden flex flex-col">
        {/* Browser chrome */}
        <div
          data-testid="browser-chrome"
          className="h-6 shrink-0 flex items-center px-3 bg-bg-elev border-b border-border"
        >
          <div
            data-testid="traffic-lights"
            className="flex items-center gap-1.5"
            aria-hidden="true"
          >
            <span className="block w-2 h-2 rounded-full bg-fg-dim" />
            <span className="block w-2 h-2 rounded-full bg-fg-dim" />
            <span className="block w-2 h-2 rounded-full bg-fg-dim" />
          </div>
          {project.thumbnailLabel && (
            <div className="flex-1 text-center px-3 truncate font-mono text-[10px] tracking-[0.08em] text-fg-dim">
              {project.thumbnailLabel}
            </div>
          )}
          {!project.thumbnailLabel && <div className="flex-1" />}
          <div className="w-[28px]" aria-hidden="true" />
        </div>

        {/* Image area */}
        <div className="relative flex-1 bg-bg-elev overflow-hidden">
          {project.thumbnailUrl ? (
            <Image
              src={project.thumbnailUrl}
              alt={`${project.title} preview`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-top"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-mono text-fg-dim uppercase tracking-widest">
                {project.slug}
              </span>
            </div>
          )}

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
