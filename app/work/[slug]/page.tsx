import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getAdjacent, getProject, projects } from "@/content/projects";
import { SectionLabel } from "@/components/section-label";
import { StatusDot } from "@/components/status-dot";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Ethan Chacko`,
      description: project.description,
      url: `https://ethanchacko.com/work/${project.slug}`,
      type: "article",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Ethan Chacko, Full-Stack Developer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Ethan Chacko`,
      description: project.description,
      images: ["/opengraph-image"],
    },
  };
}

function paragraphs(block: string) {
  return block.split(/\n\n+/).map((p, i) => (
    <p key={i} className="text-body text-fg leading-relaxed">
      {p.split("\n").map((line, j, arr) => (
        <span key={j}>
          {line}
          {j < arr.length - 1 && <br />}
        </span>
      ))}
    </p>
  ));
}

function Section({
  number,
  label,
  children,
}: {
  number: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-gutter py-section-y border-t border-border">
      <div className="mx-auto max-w-container grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <SectionLabel number={number} label={label} />
        <div className="space-y-4 max-w-[68ch]">{children}</div>
      </div>
    </section>
  );
}

export default function CaseStudyPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();
  const { prev, next } = getAdjacent(project.slug);

  const filled = [
    { label: "CONTEXT", body: project.context },
    { label: "CONSTRAINTS", body: project.constraints },
    { label: "APPROACH", body: project.approach },
  ].filter((s): s is { label: string; body: string } => Boolean(s.body));

  // Renumber based on which sections exist so the sequence stays 01/02/...
  const renumbered = filled.map((s, i) => ({
    ...s,
    number: String(i + 1).padStart(2, "0"),
  }));
  const stackNumber = String(renumbered.length + 1).padStart(2, "0");
  const resultNumber = String(renumbered.length + 2).padStart(2, "0");

  return (
    <article>
      {/* Header */}
      <header className="px-gutter py-section-y" data-testid="case-header">
        <div className="mx-auto max-w-container">
          <SectionLabel
            label={`WORK / ${project.slug.toUpperCase()}`}
            className="mb-6"
          />
          <h1 className="text-h1 text-fg mb-4">{project.title}</h1>
          <p className="text-body text-fg-muted max-w-[60ch] mb-8">
            {project.description}
          </p>
          {project.liveUrl && (
            <div className="mt-8 mb-10">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="visit-live"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-signal text-signal font-mono text-mono uppercase tracking-widest hover:border-signal hover:bg-signal/10 active:bg-signal/15 focus-visible:border-signal transition-colors duration-base"
              >
                VISIT LIVE <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-6 font-mono text-mono uppercase tracking-widest text-fg-muted">
            <span className="inline-flex items-center gap-2">
              <StatusDot
                status={project.status === "LIVE" ? "live" : "shipped"}
              />
              {project.status}
            </span>
            <span>{project.year}</span>
          </div>
          <div className="font-mono text-mono uppercase tracking-widest text-fg-dim mt-10 mb-3">
            / TECH
          </div>
          <div className="flex flex-wrap gap-3">
            {project.stack.map((t) => (
              <span
                key={t}
                className="font-mono text-mono text-fg-dim border border-border px-2 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Thumbnail */}
      <div className="px-gutter pb-section-y">
        <div className="mx-auto max-w-container">
          <div className="relative aspect-[16/10] rounded-md overflow-hidden border border-border bg-bg-elev">
            <Image
              src={project.thumbnailUrl}
              alt={`${project.title} preview`}
              fill
              sizes="(min-width: 1024px) 1100px, 100vw"
              priority
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Renumbered body sections */}
      {renumbered.map((s) => (
        <Section key={s.label} number={s.number} label={s.label}>
          {paragraphs(s.body)}
        </Section>
      ))}

      {/* Stack */}
      <Section number={stackNumber} label="STACK">
        <p className="font-mono text-body text-fg leading-relaxed">
          {project.stackDetailed}
        </p>
      </Section>

      {/* Result */}
      <Section number={resultNumber} label="RESULT">
        {paragraphs(project.result)}
      </Section>

      {/* Footer nav */}
      <nav
        className="px-gutter py-section-y border-t border-border"
        data-testid="case-nav"
      >
        <div className="mx-auto max-w-container flex items-center justify-between gap-4">
          {prev ? (
            <CaseNavLink
              href={`/work/${prev.slug}`}
              direction="prev"
              label={prev.title}
            />
          ) : (
            <span />
          )}
          {next ? (
            <CaseNavLink
              href={`/work/${next.slug}`}
              direction="next"
              label={next.title}
            />
          ) : (
            <span />
          )}
        </div>
      </nav>
    </article>
  );
}

function CaseNavLink({
  href,
  direction,
  label,
}: {
  href: string;
  direction: "prev" | "next";
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group font-mono text-mono uppercase tracking-widest text-fg-muted hover:text-fg transition-colors duration-base"
    >
      <span className="block text-fg-dim text-[10px] tracking-[0.14em]">
        {direction === "prev" ? "\u2190 PREVIOUS WORK" : "NEXT WORK \u2192"}
      </span>
      <span className="block mt-1 text-fg group-hover:text-signal transition-colors duration-base">
        {label}
      </span>
    </Link>
  );
}
