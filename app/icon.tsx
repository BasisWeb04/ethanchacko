import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const LEGACY_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25";

async function fetchGeistBold() {
  const cssRes = await fetch(
    "https://fonts.googleapis.com/css2?family=Geist:wght@700&display=swap",
    { headers: { "User-Agent": LEGACY_UA } }
  );
  const css = await cssRes.text();
  const match = css.match(/src:\s*url\((https:\/\/[^)]+)\)/);
  if (!match) throw new Error("could not parse Geist css");
  const fontRes = await fetch(match[1], { headers: { "User-Agent": LEGACY_UA } });
  return fontRes.arrayBuffer();
}

export default async function Icon() {
  const geist = await fetchGeistBold();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#050505",
          color: "#EDEDED",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Geist",
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "-0.03em",
          borderRadius: 4,
        }}
      >
        EC
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Geist", data: geist, weight: 700, style: "normal" }],
    }
  );
}
