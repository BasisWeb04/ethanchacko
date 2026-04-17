import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ethan Chacko, Full-Stack Developer";
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

async function fetchGoogleFont(family: string, italic = false) {
  return fetchGoogleFontCssSrc(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family
    )}:ital,wght@${italic ? "1" : "0"},400&display=swap`
  );
}

async function fetchGoogleFontWeight(family: string, weight: number) {
  return fetchGoogleFontCssSrc(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family
    )}:wght@${weight}&display=swap`
  );
}

export default async function Image() {
  const [geistBold, geistRegular, serif] = await Promise.all([
    fetchGoogleFontWeight("Geist", 700),
    fetchGoogleFontWeight("Geist", 400),
    fetchGoogleFont("Instrument Serif", true),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#050505",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "96px",
          position: "relative",
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 72,
            left: 72,
            right: 72,
            height: 1,
            background: "#1A1A1A",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 72,
            left: 72,
            right: 72,
            height: 1,
            background: "#1A1A1A",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 88,
            left: 96,
            fontSize: 22,
            fontWeight: 400,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#8A8A8A",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#4A4A4A" }}>/</span>
          <span style={{ marginLeft: 12 }}>MANIFESTO</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 128,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              color: "#EDEDED",
              display: "flex",
            }}
          >
            I build systems,
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "InstrumentSerif",
              fontStyle: "italic",
              fontSize: 128,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#FFB000",
            }}
          >
            not slide decks.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 88,
            left: 96,
            right: 96,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            fontWeight: 400,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#8A8A8A",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            ethanchacko.com
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: "#FFB000" }}>&#x25CF;</span>
            <span style={{ marginLeft: 12 }}>PHX / FULL-STACK</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistRegular, weight: 400, style: "normal" },
        { name: "Geist", data: geistBold, weight: 700, style: "normal" },
        { name: "InstrumentSerif", data: serif, style: "italic", weight: 400 },
      ],
    }
  );
}
