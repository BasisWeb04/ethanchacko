import { test } from "@playwright/test";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

type Target = {
  slug: string;
  url: string;
  kind: "live" | "mock";
};

const targets: Target[] = [
  { slug: "servicecalltracker", url: "https://servicecalltracker.com", kind: "live" },
  { slug: "basisweb", url: "https://basisweb.net", kind: "live" },
  { slug: "hammock", url: "https://hammockpropertyinspections.com", kind: "live" },
  { slug: "operations-command", url: "https://restaurun.basisweb.net", kind: "live" },
  { slug: "warpspeed", url: "http://localhost:3000/internal/mock/warpspeed", kind: "mock" },
  { slug: "acc-scraper", url: "http://localhost:3000/internal/mock/acc-scraper", kind: "mock" },
  { slug: "google-maps-scraper", url: "http://localhost:3000/internal/mock/google-maps-scraper", kind: "mock" },
];

const outDir = path.resolve(process.cwd(), "public", "work");

test.beforeAll(async () => {
  await mkdir(outDir, { recursive: true });
});

for (const target of targets) {
  test(`capture ${target.slug}`, async ({ page }) => {
    test.setTimeout(90_000);

    const gotoTimeout = target.kind === "live" ? 60_000 : 30_000;

    await page.goto(target.url, {
      waitUntil: "domcontentloaded",
      timeout: gotoTimeout,
    });

    try {
      await page.waitForLoadState("networkidle", { timeout: 30_000 });
    } catch {
      // Some sites keep long-lived connections open. Proceed regardless.
    }

    await page.waitForTimeout(1500);

    const pngBuffer = await page.screenshot({
      type: "png",
      fullPage: false,
      animations: "disabled",
    });

    const webp = await sharp(pngBuffer).webp({ quality: 85 }).toBuffer();
    const outPath = path.join(outDir, `${target.slug}.webp`);
    await writeFile(outPath, webp);

    console.log(`wrote ${outPath} (${webp.byteLength} bytes)`);
  });
}
