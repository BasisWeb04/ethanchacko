import { SectionLabel } from "./section-label";

type SectionProps = {
  number?: string;
  label: string;
  children: React.ReactNode;
  bordered?: boolean;
  className?: string;
  testId?: string;
};

export function Section({
  number,
  label,
  children,
  bordered = true,
  className = "",
  testId,
}: SectionProps) {
  return (
    <section
      data-testid={testId ?? "section"}
      className={`px-gutter py-section-y ${
        bordered ? "border-t border-border" : ""
      } ${className}`}
    >
      <div
        data-testid="section-grid"
        className="mx-auto max-w-container grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]"
      >
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionLabel number={number} label={label} />
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
