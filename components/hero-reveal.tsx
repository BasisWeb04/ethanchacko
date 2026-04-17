// Hero serif reveal uses a CSS keyframe (see app/globals.css .hero-serif-reveal)
// so it renders reliably at SSR + first paint even if JS hydration is delayed.
// Framer-motion's initial/animate was putting inline opacity:0 into the SSR
// markup, which left the text invisible whenever client hydration stalled.

export function HeroSerifReveal({ children }: { children: React.ReactNode }) {
  return (
    <span className="hero-serif-reveal font-serif italic text-signal inline-block">
      {children}
    </span>
  );
}
