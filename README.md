# ethanchacko.com

Personal portfolio for Ethan Chacko. Full-stack developer based in Phoenix, AZ.
Built for agencies and service companies looking for a second pair of hands that
ships under their brand.

## Stack

Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, cmdk,
Playwright. Deployed on Vercel.

## Development

    npm install
    npm run dev

Opens at http://localhost:3000.

## Testing

    npx playwright test           # full Playwright suite (68 tests)
    npx playwright test audit     # cross-page audit only
    npx playwright test --ui      # UI mode

The Playwright config starts `npm run dev` automatically and reuses an existing
dev server on :3000.

## Production build

    npm run build
    npm run start

## Structure

    app/                Next.js routes (App Router)
      (page files)      /, /for-agencies, /for-clients, /work/[slug], not-found
      opengraph-image   OG card generated at the edge with next/og
      icon              32x32 monogram favicon
      apple-icon        180x180 monogram
      globals.css       design tokens (colors, focus ring) and nav underline
    components/         reusable UI (nav, footer, hud chip, work card,
                          email reveal, command palette, build showcase,
                          process timeline, stack architecture, ...)
    content/            typed content layer -- single source of truth for the
                          7 projects that appear on the grid and at /work/[slug]
    public/             static assets (fonts, work thumbnails as WebP)
    scripts/            build-time helpers (screenshot capture, preview tool)
    tests/              Playwright specs (phase2..phase4.6 + audit)

## Design tokens

All colors live in `app/globals.css` as CSS custom properties and are exposed
to Tailwind via `tailwind.config.ts`:

    --bg          #050505   page background
    --bg-elev     #0C0C0C   elevated surface (cards, palette)
    --fg          #EDEDED   primary text
    --fg-muted    #8A8A8A   secondary text (AA)
    --fg-dim      #808080   tertiary text (AA)
    --border      #1A1A1A   hairline border
    --border-strong #2A2A2A hover border
    --signal      #FFB000   accent (CTAs, focus ring, italic serif)
    --signal-dim  #B38000   dim accent (AA)
    --live        #22C55E   live status dot

Fonts: Geist Sans + Geist Mono (local variable fonts) and Instrument Serif
italic (Google Fonts). Serif is only used for the italicised tail of the hero
manifesto and case study taglines.

## Deployment

Not wired to Vercel yet. Push the repo to Vercel, set the project's domain to
`ethanchacko.com`, and the build should work without config changes. The
`metadataBase` in `app/layout.tsx` is set to `https://ethanchacko.com`.

## Contact

ethan@basisweb.net
