type Props = {
  status: "live" | "shipped";
  className?: string;
};

export function StatusDot({ status, className = "" }: Props) {
  if (status === "live") {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-live animate-pulse-live motion-reduce:animate-none" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-live" />
        </span>
        <span className="font-mono text-mono uppercase text-live tracking-widest">
          Live
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="inline-flex rounded-full h-2 w-2 bg-signal" />
      <span className="font-mono text-mono uppercase text-signal tracking-widest">
        Shipped
      </span>
    </span>
  );
}
