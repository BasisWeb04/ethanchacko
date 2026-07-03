type Props = {
  label: string;
  /** Only pass an index where sequence is real (a true ordered step). */
  index?: string;
  className?: string;
};

export function SectionLabel({ label, index, className = "" }: Props) {
  return (
    <div
      className={`font-mono text-mono uppercase tracking-widest text-ink-dim ${className}`}
    >
      {index && <span className="text-ink mr-2">{index}</span>}
      {label}
    </div>
  );
}
