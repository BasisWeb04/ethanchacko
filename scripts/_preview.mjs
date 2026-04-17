import { chromium } from "playwright-core";

const [, , url, out, width = "1440", height = "900"] = process.argv;
const browser = await chromium.launch({ channel: "chromium" });
const ctx = await browser.newContext({
  viewport: { width: Number(width), height: Number(height) },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1000);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(`wrote ${out} @ ${width}x${height}`);
