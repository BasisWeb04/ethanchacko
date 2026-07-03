import { SectionLabel } from "./section-label";

type SectionProps = {
  label: string;
  index?: string;
  children: React.ReactNode;
  bordered?: boolean;
  className?: string;
  testId?: string;
  id?: string;
};

/*
  The margin-notes rail: a narrow left column that reads like the margin of a
  printed field manual. On the homepage it carries quiet wayfinding (the section
  label); case studies use their own rail to carry notes, dates, and stamps.
*/
export function Section({
  label,
  index,
  children,
  bordered = true,
  className = "",
  testId,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      data-testid={testId ?? "section"}
      className={`px-gutter py-section-y ${
        bordered ? "border-t border-rule" : ""
      } ${className}`}
    >
      <div
        data-testid="section-grid"
        className="mx-auto max-w-container grid gap-x-8 gap-y-6 lg:grid-cols-[200px_minmax(0,1fr)]"
      >
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionLabel label={label} index={index} />
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
