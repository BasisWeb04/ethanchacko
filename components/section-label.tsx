type Props = {
  number: string;
  label: string;
  className?: string;
};

export function SectionLabel({ number, label, className = "" }: Props) {
  return (
    <div
      className={`font-mono text-mono uppercase text-fg-muted tracking-widest ${className}`}
    >
      <span className="text-fg-dim">/</span> {number}{" "}
      <span className="ml-2">{label}</span>
    </div>
  );
}
