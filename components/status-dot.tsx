type Props = {
  status: "live" | "shipped";
  className?: string;
  scaleOnGroupHover?: boolean;
};

const DOT_SCALE_CLASS =
  "inline-block transition-transform duration-base group-hover:scale-[1.15] motion-reduce:transform-none";

export function StatusDot({
  status,
  className = "",
  scaleOnGroupHover = false,
}: Props) {
  if (status === "live") {
    const dot = (
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-live animate-pulse-live motion-reduce:animate-none" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-live" />
      </span>
    );
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        {scaleOnGroupHover ? (
          <span className={DOT_SCALE_CLASS}>{dot}</span>
        ) : (
          dot
        )}
        <span className="font-mono text-mono uppercase text-live tracking-widest">
          Live
        </span>
      </span>
    );
  }

  const dot = <span className="inline-flex rounded-full h-2 w-2 bg-signal" />;
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {scaleOnGroupHover ? (
        <span className={DOT_SCALE_CLASS}>{dot}</span>
      ) : (
        dot
      )}
      <span className="font-mono text-mono uppercase text-signal tracking-widest">
        Shipped
      </span>
    </span>
  );
}
