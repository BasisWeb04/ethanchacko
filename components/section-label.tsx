type Props = {
  label: string;
  /** Only pass an index where sequence is real (a true ordered step). */
  index?: string;
  /** Render as a boxed form-field label (hairline box, usgraphics register). */
  boxed?: boolean;
  className?: string;
};

/*
  Section/field label in the document register: Franklin semibold small-caps at
  modest tracking (the old mono-widest eyebrow is abolished sitewide). The boxed
  variant wraps it in a hairline field box where the metaphor wants a form field.
*/
export function SectionLabel({ label, index, boxed = false, className = "" }: Props) {
  if (boxed) {
    return (
      <div className={`field-label ${className}`}>
        {index && <span className="mr-1.5 text-ink">{index}</span>}
        {label}
      </div>
    );
  }

  return (
    <div
      className={`font-sans text-[0.72rem] font-semibold uppercase leading-none tracking-[0.09em] text-ink-muted ${className}`}
    >
      {index && <span className="mr-2 text-ink">{index}</span>}
      {label}
    </div>
  );
}
