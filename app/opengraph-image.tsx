import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ethan Chacko, systems builder in Surprise, AZ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Use an older UA so Google Fonts serves woff (Satori in this Next.js version
// rejects the woff2 signature wOF2).
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

function fetchFranklin(weight: number) {
  return fetchGoogleFontCssSrc(
    `https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@${weight}&display=swap`
  );
}

export default async function Image() {
  const [franklinHeavy, franklinMedium] = await Promise.all([
    fetchFranklin(800),
    fetchFranklin(500),
  ]);

  const paper = "#17181A";
  const ink = "#ECEAE3";
  const inkMuted = "#A8A29A";
  const inkDim = "#86878C";
  const mark = "#2E9BFF";
  const markInk = "#5AA9FF";
  const rule = "#2C2E33";

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
          fontFamily: "Franklin",
        }}
      >
        {/* Top rule + dateline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 16, height: 16, background: mark }} />
            <div
              style={{
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: inkDim,
                display: "flex",
              }}
            >
              Systems builder · Surprise, AZ
            </div>
          </div>
          <div
            style={{ marginTop: 22, height: 1, width: "100%", background: rule }}
          />
        </div>

        {/* Name + receipt line */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontWeight: 800,
              fontSize: 132,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: ink,
              display: "flex",
            }}
          >
            Ethan Chacko
          </div>
          <div
            style={{
              marginTop: 26,
              fontWeight: 500,
              fontSize: 36,
              lineHeight: 1.3,
              color: inkMuted,
              maxWidth: 920,
              display: "flex",
            }}
          >
            I build the systems service businesses run on.
          </div>
        </div>

        {/* Bottom rule + footer with azure stamp */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{ marginBottom: 22, height: 1, width: "100%", background: rule }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 24,
                fontWeight: 500,
                letterSpacing: "0.02em",
                color: inkDim,
              }}
            >
              ethanchacko.com
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: `2px solid ${mark}`,
                color: markInk,
                background: paper,
                padding: "8px 16px",
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Real systems · real screenshots
            </div>
          </div>
        </div>

        {/* Left margin accent, echoing the site's document rail */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 8,
            background: mark,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Franklin", data: franklinMedium, weight: 500, style: "normal" },
        { name: "Franklin", data: franklinHeavy, weight: 800, style: "normal" },
      ],
    }
  );
}
