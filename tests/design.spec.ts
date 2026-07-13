import { test, expect } from "@playwright/test";

// These assertions lock in THE PUBLIC RECORD design system: the artifact hero,
// the inspection loupe on Tier-1 exhibits (and its absence on illustrations),
// the build index that replaced the marquee, and the case-study image heights
// that depend on the Tailwind content-glob scanning content/projects.ts.

test("hero leads with the artifact: lede, Exhibit A, and the email CTA", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator('[data-testid="hero"]')).toBeVisible();
  await expect(page.locator('[data-testid="hero-lede"]')).toBeVisible();
  await expect(page.locator('[data-testid="cta-email"]')).toBeVisible();
  // Exhibit A is a real annotated exhibit in the hero.
  await expect(
    page.locator('[data-testid="hero"] [data-testid="annotated-exhibit"]')
  ).toBeVisible();
});

test("the inspection loupe is wired on a Tier-1 exhibit", async ({ page }) => {
  await page.goto("/work/inspection-revenue-engine");
  // The cover exhibit (a real capture) exposes the magnifier as a button.
  const loupe = page
    .locator('[data-testid="annotated-exhibit"] [role="button"]')
    .first();
  await expect(loupe).toBeVisible();
  await expect(loupe).toHaveAttribute("aria-label", /Magnify exhibit/);
});

test("the loupe is disabled on a Tier-2 illustration", async ({ page }) => {
  // The tool pages carry rendered illustrations, which must not offer the
  // "look closer, it's real" magnifier.
  await page.goto("/work/warpspeed");
  const exhibit = page.locator('[data-testid="annotated-exhibit"]').first();
  await expect(exhibit).toBeVisible();
  await expect(exhibit.locator('[role="button"]')).toHaveCount(0);
});

test("the shipped marquee carries the seven real builds", async ({ page }) => {
  await page.goto("/");
  const marquee = page.locator('[data-testid="more-builds-section"]');
  await expect(marquee).toBeVisible();
  // Duplicated track for the seamless loop: seven builds, fourteen links.
  await expect(marquee.locator('a[href^="/work/"]')).toHaveCount(14);
});

test.describe("reduced motion is respected", () => {
  test.use({ reducedMotion: "reduce" });

  test("reveal content renders at full opacity, not stuck hidden", async ({
    page,
  }) => {
    await page.goto("/");
    const firstReveal = page
      .locator('[data-testid="receipts-strip"] > div')
      .first();
    await expect(firstReveal).toBeVisible();
    // Under reduced motion the settle wrapper never sticks at opacity:0.
    await expect(firstReveal).toHaveCSS("opacity", "1");
    await expect(
      page.locator('[data-testid="case-file-card"]').first()
    ).toBeVisible();
  });
});

test.describe("case-study exhibits render at real height (content-glob guard)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const slug of [
    "inspection-revenue-engine",
    "lead-data-engine",
    "ai-report-reviewer",
  ]) {
    test(`/work/${slug} exhibit image is not collapsed`, async ({ page }) => {
      await page.goto(`/work/${slug}`);
      const img = page
        .locator('[data-testid="annotated-exhibit"] img')
        .first();
      await expect(img).toBeVisible();
      const box = await img.boundingBox();
      expect(box, "exhibit image has a layout box").not.toBeNull();
      // A zero/near-zero height means the aspect class did not compile because
      // content/ dropped out of the Tailwind content globs.
      expect(box!.height).toBeGreaterThan(40);
    });
  }
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

test("email reveal reveals and copies the address", async ({ page, context }) => {
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
