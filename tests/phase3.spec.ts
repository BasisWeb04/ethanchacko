import { test, expect } from "@playwright/test";

const WORK_SLUGS = [
  "servicecalltracker",
  "basisweb",
  "hammock",
  "operations-command",
  "warpspeed",
  "acc-scraper",
  "google-maps-scraper",
];

test("all 7 work cards have a real thumbnail image from /work/", async ({
  page,
}) => {
  await page.goto("/");
  const cards = page.locator('[data-testid="work-card"]');
  await expect(cards).toHaveCount(7);

  const count = await cards.count();
  for (let i = 0; i < count; i++) {
    const img = cards.nth(i).locator("img");
    await expect(img).toHaveCount(1);
    const src = (await img.getAttribute("src")) ?? "";
    const srcset = (await img.getAttribute("srcset")) ?? "";
    const references = `${src} ${srcset}`;
    expect(references).toMatch(/%2Fwork%2F|\/work\//);
  }
});

test("no 404s on any work thumbnail image", async ({ page }) => {
  const failed: string[] = [];
  page.on("response", (res) => {
    const url = res.url();
    if (
      (url.includes("/work/") || url.includes("%2Fwork%2F")) &&
      res.status() >= 400
    ) {
      failed.push(`${res.status()} ${url}`);
    }
  });
  await page.goto("/", { waitUntil: "networkidle" });

  // Give every card's img a moment to resolve.
  await page.waitForLoadState("networkidle");
  for (const slug of WORK_SLUGS) {
    const direct = await page.request.get(`/work/${slug}.webp`);
    expect(direct.status(), `/work/${slug}.webp should return 200`).toBe(200);
  }
  expect(failed, failed.join("\n")).toEqual([]);
});

test("browser chrome bar renders on every work card", async ({ page }) => {
  await page.goto("/");
  const cards = page.locator('[data-testid="work-card"]');
  const count = await cards.count();
  expect(count).toBe(7);

  for (let i = 0; i < count; i++) {
    const chrome = cards.nth(i).locator('[data-testid="browser-chrome"]');
    await expect(chrome).toHaveCount(1);
    const lights = chrome.locator('[data-testid="traffic-lights"] > span');
    await expect(lights).toHaveCount(3);
  }
});

test("/for-agencies returns 200 and contains key copy", async ({ page }) => {
  const res = await page.goto("/for-agencies");
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1")).toContainText("second pair of hands");
  await expect(page.locator("body")).toContainText(
    "White-label contract dev for agencies"
  );
});

test("/for-clients returns 200 and contains key copy", async ({ page }) => {
  const res = await page.goto("/for-clients");
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1")).toContainText("One developer");
  await expect(page.locator("body")).toContainText(
    "single point of contact"
  );
});

test("nav links from homepage reach both audience pages", async ({ page }) => {
  await page.goto("/");

  await page.click('[data-testid="nav-link"]:has-text("For Agencies")');
  await page.waitForURL("**/for-agencies");
  await expect(page.locator("h1")).toContainText("second pair of hands");

  await page.goto("/");
  await page.click('[data-testid="nav-link"]:has-text("For Clients")');
  await page.waitForURL("**/for-clients");
  await expect(page.locator("h1")).toContainText("One developer");
});

test("hero CTAs navigate to audience pages", async ({ page }) => {
  await page.goto("/");

  await page.click('[data-testid="cta-agencies"]');
  await page.waitForURL("**/for-agencies");
  await expect(page.locator("h1")).toContainText("second pair of hands");

  await page.goto("/");
  await page.click('[data-testid="cta-brands"]');
  await page.waitForURL("**/for-clients");
  await expect(page.locator("h1")).toContainText("One developer");
});
