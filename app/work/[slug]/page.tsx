import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import {
  getAdjacent,
  getProject,
  projects,
  type Tone,
} from "@/content/projects";
import { SectionLabel } from "@/components/section-label";
import { StatusDot } from "@/components/status-dot";
import { StatusLedger } from "@/components/status-ledger";
import { AnnotatedExhibit } from "@/components/annotated-exhibit";

type Params = { params: { slug: string } };

// The three tool pages carry rendered illustrations of Ethan's own tools, not
// live captures. Their cover image gets an honest illustration caption.
const ILLUSTRATION_SLUGS = new Set([
  "warpspeed",
  "acc-scraper",
  "google-maps-scraper",
]);

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
      title: `${project.title} · Ethan Chacko`,
      description: project.description,
      url: `https://ethanchacko.com/work/${project.slug}`,
      type: "article",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Ethan Chacko, systems builder in Surprise, AZ",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} · Ethan Chacko`,
      description: project.description,
      images: ["/opengraph-image"],
    },
  };
}

function paragraphs(block: string) {
  return block
    .split(/\n\n+/)
    .filter(Boolean)
    .map((p, i) => (
      <p key={i} className="text-body leading-relaxed text-ink">
        {p.split("\n").map((line, j, arr) => (
          <span key={j}>
            {line}
            {j < arr.length - 1 && <br />}
          </span>
        ))}
      </p>
    ));
}

function CaseSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-rule px-gutter py-section-y">
      <div className="mx-auto grid max-w-container gap-x-8 gap-y-6 lg:grid-cols-[200px_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionLabel label={label} />
        </div>
        <div className="min-w-0 max-w-[68ch] space-y-4">{children}</div>
      </div>
    </section>
  );
}

export default function CaseStudyPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();
  const { prev, next } = getAdjacent(project.slug);

  const headerStatus: { tone: Tone; label: string } =
    project.headerStatus ??
    (project.status === "LIVE"
      ? { tone: "live", label: "Live" }
      : { tone: "neutral", label: "Shipped" });

  const legacyProse = [
    { label: "Context", body: project.context },
    { label: "Constraints", body: project.constraints },
    { label: "Approach", body: project.approach },
  ].filter((s): s is { label: string; body: string } => Boolean(s.body));

  // Column count tracks the number of stats so the metrics band always closes
  // its border cleanly (no dangling rule over empty tracks).
  const statCount = project.stats?.length ?? 0;
  const statColsClass =
    statCount === 4
      ? "grid-cols-2 sm:grid-cols-4"
      : statCount === 3
      ? "grid-cols-3"
      : statCount === 2
      ? "grid-cols-2"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6";

  return (
    <article>
      {/* Header */}
      <header className="px-gutter pt-16 pb-section-y" data-testid="case-header">
        <div className="mx-auto max-w-container">
          <SectionLabel
            label={project.eyebrow ?? "Case study"}
            className="mb-6"
          />
          <h1 className="text-h1 text-ink">{project.title}</h1>
          <p className="mt-4 max-w-[60ch] text-body leading-relaxed text-ink-muted">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <StatusDot tone={headerStatus.tone} label={headerStatus.label} />
            <span className="font-mono text-mono uppercase tracking-widest text-ink-dim">
              {project.year}
            </span>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="visit-live"
                className="inline-flex items-center gap-2 border border-ink px-4 py-2 font-sans text-[0.9rem] text-ink transition-colors duration-base hover:bg-ink hover:text-paper"
              >
                Visit live site
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="border border-rule px-2 py-1 font-mono text-mono text-ink-dim"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Cover exhibit. Rich case studies (those with custom sections) only show
          a cover when one is explicitly set, so an unlabeled thumbnail never
          lands next to a claimed number. Light builds fall back to their
          thumbnail, tiered as an illustration where that is what it is. */}
      {project.cover ? (
        <div className="px-gutter pb-section-y">
          <div className="mx-auto max-w-container">
            <AnnotatedExhibit {...project.cover} priority />
          </div>
        </div>
      ) : !project.sections && project.thumbnailUrl ? (
        <div className="px-gutter pb-section-y">
          <div className="mx-auto max-w-container">
            <AnnotatedExhibit
              src={project.thumbnailUrl}
              alt={`${project.title} preview`}
              aspect="aspect-[16/10]"
              priority
              illustration={ILLUSTRATION_SLUGS.has(project.slug)}
              caption={
                ILLUSTRATION_SLUGS.has(project.slug)
                  ? "Illustration of the tool. A rendered depiction of my own output, not a live capture."
                  : project.liveUrl
                  ? project.thumbnailLabel
                  : `${project.title} preview`
              }
            />
          </div>
        </div>
      ) : null}

      {/* Stats band */}
      {project.stats && project.stats.length > 0 && (
        <div className="px-gutter pb-section-y">
          <div className="mx-auto max-w-container">
            <dl className={`grid border-l border-t border-rule ${statColsClass}`}>
              {project.stats.map((s) => (
                <div
                  key={s.label}
                  data-testid="case-stat"
                  className="border-b border-r border-rule px-4 py-5"
                >
                  <dt className="font-mono text-h3 text-ink">
                    {s.signal ? (
                      <span className="mark-phrase">{s.value}</span>
                    ) : (
                      s.value
                    )}
                  </dt>
                  <dd className="mt-2 font-mono text-[11px] uppercase leading-snug tracking-widest text-ink-dim">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}

      {/* Prose: custom sections, else legacy */}
      {project.sections
        ? project.sections.map((s) => (
            <CaseSection key={s.heading} label={s.heading}>
              {paragraphs(s.body)}
            </CaseSection>
          ))
        : legacyProse.map((s) => (
            <CaseSection key={s.label} label={s.label}>
              {paragraphs(s.body)}
            </CaseSection>
          ))}

      {/* Exhibits */}
      {project.exhibits && project.exhibits.length > 0 && (
        <section className="border-t border-rule px-gutter py-section-y">
          <div className="mx-auto grid max-w-container gap-x-8 gap-y-6 lg:grid-cols-[200px_minmax(0,1fr)]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <SectionLabel label="Exhibits" />
            </div>
            <div className="min-w-0 space-y-12">
              {project.exhibits.map((ex) => (
                <AnnotatedExhibit key={ex.src} {...ex} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Status ledger */}
      {project.ledger && (
        <CaseSection label="Status">
          <StatusLedger
            rows={project.ledger.rows}
            note={project.ledger.note}
            title={project.ledger.title}
          />
        </CaseSection>
      )}

      {/* Result */}
      {project.result && (
        <CaseSection label="Result">{paragraphs(project.result)}</CaseSection>
      )}

      {/* Stack */}
      <CaseSection label="Stack">
        <p className="font-mono text-body leading-relaxed text-ink">
          {project.stackDetailed}
        </p>
      </CaseSection>

      {/* Footer nav */}
      <nav
        className="border-t border-rule px-gutter py-section-y"
        data-testid="case-nav"
      >
        <div className="mx-auto flex max-w-container items-center justify-between gap-4">
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
      className="group font-mono text-mono uppercase tracking-widest text-ink-muted transition-colors duration-base hover:text-ink"
    >
      <span className="block text-[10px] tracking-[0.14em] text-ink-dim">
        {direction === "prev" ? "← Previous" : "Next →"}
      </span>
      <span className="mt-1 block text-ink group-hover:text-ink">{label}</span>
    </Link>
  );
}
