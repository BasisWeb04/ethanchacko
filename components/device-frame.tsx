import Image from "next/image";
import { Globe } from "lucide-react";

type Chrome = "browser" | "canvas" | "plain";

/*
  The device frame the shipped marquee routes through. A browser window chrome
  around real web/app captures, framed as documents pinned to the dark board.
  Optional children overlay the image box.
*/
export function DeviceFrame({
  src,
  alt,
  label,
  chrome = "browser",
  aspect = "aspect-[16/10]",
  priority = false,
  glow = true,
  illustration = false,
  light = false,
  objectPosition = "top",
  sizes = "(min-width: 1024px) 900px, 100vw",
  className = "",
  children,
}: {
  src: string;
  alt: string;
  label?: string;
  chrome?: Chrome;
  aspect?: string;
  priority?: boolean;
  glow?: boolean;
  illustration?: boolean;
  light?: boolean;
  objectPosition?: string;
  sizes?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative ${className}`}>
      {glow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10 opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(55% 50% at 50% 40%, rgba(46,155,255,0.26), transparent 72%)",
          }}
        />
      )}
      <div className="overflow-hidden rounded-xl border border-rule-strong bg-paper-elev shadow-[0_24px_70px_-20px_rgba(0,0,0,0.75)]">
        {chrome !== "plain" && (
          <div className="flex items-center gap-2 border-b border-rule bg-paper/50 px-3.5 py-2.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-ink-dim/55" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink-dim/35" />
              <span className="h-2.5 w-2.5 rounded-full bg-mark/70" />
            </span>
            {label && chrome === "browser" && (
              <span className="mx-auto inline-flex max-w-[75%] items-center gap-1.5 truncate rounded bg-paper px-3 py-0.5 font-mono text-[0.68rem] text-ink-dim">
                <Globe size={11} className="shrink-0 text-mark" aria-hidden="true" />
                {label}
              </span>
            )}
            {label && chrome === "canvas" && (
              <span className="ml-1 font-mono text-[0.68rem] uppercase tracking-widest text-ink-dim">
                {label}
              </span>
            )}
          </div>
        )}
        <div className={`relative ${aspect}`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            style={{ objectPosition }}
          />
          {light && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(18,18,17,0.16) 0%, transparent 14%, transparent 82%, rgba(18,18,17,0.24) 100%)",
              }}
            />
          )}
          {illustration && (
            <span className="absolute bottom-0 left-0 bg-paper/85 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-ink-dim">
              Illustration
            </span>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
