import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ethan Chacko, systems builder in Surprise, AZ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Use an older UA so Google Fonts serves woff (Satori in this Next.js
// version rejects the woff2 signature wOF2).
const LEGACY_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25";

async function fetchGoogleFontCssSrc(cssUrl: string) {
  const cssRes = await fetch(cssUrl, { headers: { "User-Agent": LEGACY_UA } });
  const css = await cssRes.text();
  const match = css.match(/src:\s*url\((https:\/\/[^)]+)\)/);
  if (!match) throw new Error(`no font url in: ${css.slice(0, 300)}`);
  const fontRes = await fetch(match[1], { headers: { "User-Agent": LEGACY_UA } });
  if (!fontRes.ok) throw new Error(`font fetch ${match[1]} ${fontRes.status}`);
  return fontRes.arrayBuffer();
}

async function fetchGoogleFontWeight(family: string, weight: number) {
  return fetchGoogleFontCssSrc(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family
    )}:wght@${weight}&display=swap`
  );
}

export default async function Image() {
  const [serifBold, serifRegular] = await Promise.all([
    fetchGoogleFontWeight("Source Serif 4", 700),
    fetchGoogleFontWeight("Source Serif 4", 400),
  ]);

  const paper = "#FBFAF7";
  const ink = "#1C1B18";
  const inkMuted = "#5C5850";
  const inkDim = "#8A857B";
  const mark = "#FFD84D";
  const rule = "#E4E0D6";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: paper,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "SourceSerif",
        }}
      >
        {/* Top rule + dateline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 16, height: 16, background: mark }} />
            <div
              style={{
                fontSize: 22,
                fontWeight: 400,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: inkDim,
                display: "flex",
              }}
            >
              Systems builder · Surprise, AZ
            </div>
          </div>
          <div
            style={{
              marginTop: 22,
              height: 1,
              width: "100%",
              background: rule,
            }}
          />
        </div>

        {/* Name + receipt line */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 128,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: ink,
              display: "flex",
            }}
          >
            Ethan Chacko
          </div>
          <div
            style={{
              marginTop: 26,
              fontWeight: 400,
              fontSize: 36,
              lineHeight: 1.3,
              color: inkMuted,
              maxWidth: 900,
              display: "flex",
            }}
          >
            I build the operational systems service businesses run on.
          </div>
        </div>

        {/* Bottom rule + footer */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              marginBottom: 22,
              height: 1,
              width: "100%",
              background: rule,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 22,
              fontWeight: 400,
              letterSpacing: "0.06em",
              color: inkDim,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              ethanchacko.com
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              Real systems, real screenshots.
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "SourceSerif", data: serifRegular, weight: 400, style: "normal" },
        { name: "SourceSerif", data: serifBold, weight: 700, style: "normal" },
      ],
    }
  );
}
