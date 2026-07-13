import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const LEGACY_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25";

async function fetchFranklin(weight: number) {
  const cssRes = await fetch(
    `https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@${weight}&display=swap`,
    { headers: { "User-Agent": LEGACY_UA } }
  );
  const css = await cssRes.text();
  const match = css.match(/src:\s*url\((https:\/\/[^)]+)\)/);
  if (!match) throw new Error("could not parse Libre Franklin css");
  const fontRes = await fetch(match[1], { headers: { "User-Agent": LEGACY_UA } });
  return fontRes.arrayBuffer();
}

export default async function Icon() {
  const franklin = await fetchFranklin(800);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#17181A",
          color: "#ECEAE3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Franklin",
          fontWeight: 800,
          fontSize: 17,
          letterSpacing: "-0.04em",
          borderBottom: "4px solid #2E9BFF",
        }}
      >
        EC
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Franklin", data: franklin, weight: 800, style: "normal" }],
    }
  );
}
