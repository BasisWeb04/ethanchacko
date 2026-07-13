import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // content/ MUST stay scanned: the case-study aspect-[...] classes live in
    // content/projects.ts and only compile because this glob is here. Drop it
    // and every exhibit collapses to zero height.
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // The Public Record: engineering-paper light. A cool document white,
        // near-black ink, BasisWeb azure as the working accent.
        paper: {
          DEFAULT: "var(--paper)",
          elev: "var(--paper-elev)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--ink-muted)",
          dim: "var(--ink-dim)",
        },
        mark: {
          // Azure as a FILL (with --on-mark text on top). For azure text or
          // thin rules on paper, use `mark-ink` (deepened to pass AA).
          DEFAULT: "var(--mark)",
          ink: "var(--mark-ink)",
        },
        rule: {
          DEFAULT: "var(--rule)",
          strong: "var(--rule-strong)",
        },
        live: "var(--live)",
        pending: "var(--pending)",
        redact: "var(--redact)",
      },
      fontFamily: {
        // Display + UI: Libre Franklin (Franklin Gothic heritage, American
        // printed forms). Institutional-human, not dev-tool. This is the body
        // default; prose blocks opt back into the serif.
        sans: ["var(--font-libre-franklin)", "system-ui", "sans-serif"],
        // Body prose: Source Serif 4. The report reading register, in its
        // honest job now (comfortable reading), not headline costume.
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        // Data + annotations: Geist Mono. Only ever attached to evidence:
        // captions, callout notes, table values, stamps, dates.
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Display sizes carry Franklin metrics: heavy weight, tight tracking.
        display: [
          "clamp(2.5rem, 5.6vw, 4.75rem)",
          { lineHeight: "1.0", letterSpacing: "-0.022em", fontWeight: "800" },
        ],
        h1: [
          "clamp(2rem, 4.2vw, 3.25rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "800" },
        ],
        h2: [
          "clamp(1.5rem, 3vw, 2.15rem)",
          { lineHeight: "1.12", letterSpacing: "-0.012em", fontWeight: "750" },
        ],
        h3: ["1.3rem", { lineHeight: "1.28", fontWeight: "700" }],
        // Body prose scale unchanged.
        body: ["1.0625rem", { lineHeight: "1.65" }],
        small: ["0.875rem", { lineHeight: "1.55" }],
        mono: ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.02em" }],
      },
      maxWidth: {
        container: "1200px",
      },
      spacing: {
        gutter: "clamp(1.5rem, 4vw, 4rem)",
        "section-y": "clamp(3.5rem, 8vw, 6.5rem)",
      },
      transitionTimingFunction: {
        "ease-out-custom": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-in-out-custom": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        fast: "180ms",
        base: "280ms",
        slow: "520ms",
      },
    },
  },
  plugins: [],
};
export default config;
