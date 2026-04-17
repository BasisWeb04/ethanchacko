import { chromium } from "playwright-core";

const [, , url, out, width = "1440", height = "900"] = process.argv;
const browser = await chromium.launch({ channel: "chromium" });
const ctx = await browser.newContext({
  viewport: { width: Number(width), height: Number(height) },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(500);

// Scroll through the full page so every IntersectionObserver-driven
// reveal triggers. Then back to top for the fullPage capture.
await page.evaluate(async () => {
  const step = Math.max(200, Math.floor(window.innerHeight * 0.75));
  const total = document.documentElement.scrollHeight;
  for (let y = 0; y <= total; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 300));
});

await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(`wrote ${out} @ ${width}x${height}`);
