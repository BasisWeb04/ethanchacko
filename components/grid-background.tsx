/*
  Atmospheric background: a faint technical grid that fades out down the page,
  plus a soft azure glow at the top. All CSS, no assets. Basisweb-inspired
  texture that reads "systems" without adding a single word.
*/
export function GridBackground({
  className = "",
  glow = true,
}: {
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(var(--rule) 1px, transparent 1px), linear-gradient(90deg, var(--rule) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(125% 85% at 50% 0%, #000 0%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(125% 85% at 50% 0%, #000 0%, transparent 72%)",
        }}
      />
      {glow && (
        <div
          className="absolute inset-x-0 top-0 h-[70vh]"
          style={{
            background:
              "radial-gradient(45% 55% at 50% -8%, rgba(46,155,255,0.12), transparent 70%)",
          }}
        />
      )}
    </div>
  );
}
