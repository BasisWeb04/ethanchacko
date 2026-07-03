import { test, expect } from "@playwright/test";
import { projects } from "../content/projects";

const ROUTES = [
  "/",
  "/for-agencies",
  ...projects.map((p) => `/work/${p.slug}`),
];

test.describe("routes resolve", () => {
  for (const route of ROUTES) {
    test(`${route} returns 200`, async ({ page }) => {
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
    });
  }
});

test("/for-clients permanently redirects to home", async ({ request }) => {
  const res = await request.get("/for-clients", { maxRedirects: 0 });
  // Next.js maps permanent:true to 308 (method-preserving); Google honors it
  // as a permanent redirect, the same ranking signal as 301.
  expect(res.status()).toBe(308);
  expect(res.headers()["location"]).toMatch(/\/$/);
});

test("homepage carries the receipts strip and contact", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('[data-testid="hero"]')).toBeVisible();
  await expect(page.locator('[data-testid="case-file-card"]')).toHaveCount(3);
  await expect(page.locator('[data-testid="more-builds"] > li')).toHaveCount(7);
  await expect(page.locator('[data-testid="email-reveal"]')).toBeVisible();
});

test("nav points at the three homepage sections", async ({ page }) => {
  await page.goto("/");
  const links = page.locator('[data-testid="nav-link"]');
  await expect(links).toHaveCount(3);
  await expect(links.nth(0)).toHaveAttribute("href", "/#work");
  await expect(links.nth(1)).toHaveAttribute("href", "/#about");
  await expect(links.nth(2)).toHaveAttribute("href", "/#contact");
});

test("flagship case study carries a status ledger and annotated exhibits", async ({
  page,
}) => {
  await page.goto("/work/inspection-revenue-engine");
  await expect(page.locator('[data-testid="status-ledger"]')).toBeVisible();
  await expect(page.locator('[data-testid="ledger-row"]')).toHaveCount(6);
  await expect(
    page.locator('[data-testid="annotated-exhibit"]').first()
  ).toBeVisible();
});
