import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
          DEFAULT: "var(--mark)",
          wash: "var(--mark-wash)",
        },
        rule: {
          DEFAULT: "var(--rule)",
          strong: "var(--rule-strong)",
        },
        live: "var(--live)",
        pending: "var(--pending)",
      },
      fontFamily: {
        // Source Serif 4 carries display and body: editorial and human to a
        // non-technical reader without reading as costume.
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        // Geist Mono is the annotation register. It only ever appears attached
        // to evidence: captions, data, status ledgers, margin notes.
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        // Geist Sans handles UI odds and ends (nav, buttons, controls).
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: [
          "clamp(2.75rem, 6vw, 5.25rem)",
          { lineHeight: "1.02", letterSpacing: "-0.021em", fontWeight: "700" },
        ],
        h1: [
          "clamp(2.25rem, 4.5vw, 3.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        h2: [
          "clamp(1.5rem, 3vw, 2.1rem)",
          { lineHeight: "1.2", letterSpacing: "-0.012em", fontWeight: "600" },
        ],
        h3: ["1.35rem", { lineHeight: "1.3", fontWeight: "600" }],
        body: ["1.0625rem", { lineHeight: "1.65" }],
        small: ["0.875rem", { lineHeight: "1.55" }],
        mono: ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.03em" }],
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
