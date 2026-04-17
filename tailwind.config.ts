import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "var(--bg)",
          elev: "var(--bg-elev)",
        },
        fg: {
          DEFAULT: "var(--fg)",
          muted: "var(--fg-muted)",
          dim: "var(--fg-dim)",
        },
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
        },
        signal: {
          DEFAULT: "var(--signal)",
          dim: "var(--signal-dim)",
        },
        live: "var(--live)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
      },
      fontSize: {
        display: [
          "clamp(3.5rem, 9vw, 8rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        h1: [
          "clamp(2.5rem, 5vw, 4.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        h2: [
          "clamp(1.75rem, 3vw, 2.5rem)",
          { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        h3: ["1.5rem", { lineHeight: "1.3", fontWeight: "500" }],
        body: ["1rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        mono: ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.08em" }],
      },
      maxWidth: {
        container: "1280px",
      },
      spacing: {
        gutter: "clamp(1.5rem, 4vw, 4rem)",
        "section-y": "clamp(4rem, 10vw, 8rem)",
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
      keyframes: {
        "pulse-live": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.4)", opacity: "0.4" },
        },
      },
      animation: {
        "pulse-live": "pulse-live 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
