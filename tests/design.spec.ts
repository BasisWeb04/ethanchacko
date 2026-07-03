import { test, expect } from "@playwright/test";

test("email reveal reveals and copies the address", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const el = page.locator('[data-testid="email-reveal"]');
  await el.scrollIntoViewIfNeeded();
  await expect(el).toContainText("ethan@");
  await el.click();
  await expect(el).toContainText("ethan@basisweb.net");
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  expect(clip).toBe("ethan@basisweb.net");
});

test.describe("reduced motion is respected", () => {
  test.use({ reducedMotion: "reduce" });

  test("reveal content renders at full opacity, not stuck hidden", async ({
    page,
  }) => {
    await page.goto("/");
    const firstReveal = page.locator('[data-testid="receipts-strip"] > div').first();
    await expect(firstReveal).toBeVisible();
    // Under reduced motion the Reveal wrapper never applies an opacity:0 initial.
    await expect(firstReveal).toHaveCSS("opacity", "1");
    await expect(
      page.locator('[data-testid="case-file-card"]').first()
    ).toBeVisible();
  });
});

test.describe("no horizontal overflow on mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const route of [
    "/",
    "/for-agencies",
    "/work/inspection-revenue-engine",
    "/work/lead-data-engine",
  ]) {
    test(`${route} does not scroll sideways`, async ({ page }) => {
      await page.goto(route);
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth
      );
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }
});
