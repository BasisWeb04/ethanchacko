import { test, expect, type Page, type Locator } from "@playwright/test";

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

// Underline animates with transform: scaleX(0 -> 1) pinned at
// transform-origin: left. Computed style reports transform as a matrix:
//   rest:   matrix(0, 0, 0, 1, 0, 0)
//   hover:  matrix(1, 0, 0, 1, 0, 0)
// Parse the first value to read the current scaleX.
function parseScaleX(transform: string): number {
  if (!transform || transform === "none") return 0;
  const match = transform.match(/matrix\(([^)]+)\)/);
  if (!match) return 0;
  const parts = match[1].split(",").map((n) => parseFloat(n.trim()));
  return parts[0] ?? 0;
}

function visible(locator: Locator): Locator {
  return locator.filter({ visible: true });
}

async function afterTransitions(page: Page, extra = 100) {
  await page.waitForTimeout(300 + extra);
}

test.describe("Phase 4.6 @ desktop 1440x900", () => {
  test.use({ viewport: DESKTOP });

  // --- NAV UNDERLINE ---

  test("nav underline draws to scaleX 1 on hover", async ({ page }) => {
    await page.goto("/");
    const link = page.locator('[data-testid="nav-link"]').first();
    await link.hover();
    await afterTransitions(page, 150);
    const transform = await link.evaluate(
      (el) => window.getComputedStyle(el, "::after").transform
    );
    expect(parseScaleX(transform)).toBeCloseTo(1, 1);
  });

  test("nav underline retreats to scaleX 0 after unhover", async ({
    page,
  }) => {
    await page.goto("/");
    const link = page.locator('[data-testid="nav-link"]').first();
    await link.hover();
    await afterTransitions(page, 150);
    await page.mouse.move(10, 10);
    await afterTransitions(page, 250);
    const transform = await link.evaluate(
      (el) => window.getComputedStyle(el, "::after").transform
    );
    expect(parseScaleX(transform)).toBeCloseTo(0, 1);
  });

  test("reduced motion nav underline uses opacity and keeps transform pinned", async ({
    browser,
  }) => {
    const ctx = await browser.newContext({
      viewport: DESKTOP,
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    await page.goto("/");
    const link = page.locator('[data-testid="nav-link"]').first();

    const rest = await link.evaluate((el) => {
      const s = window.getComputedStyle(el, "::after");
      return { opacity: s.opacity, transform: s.transform };
    });
    expect(Number(rest.opacity)).toBeCloseTo(0, 1);
    // Under reduced motion the transform stays at scaleX(1); only opacity animates.
    expect(parseScaleX(rest.transform)).toBeCloseTo(1, 1);

    await link.hover();
    await page.waitForTimeout(240);
    const hovered = await link.evaluate((el) => {
      const s = window.getComputedStyle(el, "::after");
      return { opacity: s.opacity, transform: s.transform };
    });
    expect(Number(hovered.opacity)).toBeCloseTo(1, 1);
    expect(parseScaleX(hovered.transform)).toBeCloseTo(1, 1);

    await ctx.close();
  });

  // --- PROCESS TIMELINE ---

  test("process timeline renders 4 visible nodes with expected labels", async ({
    page,
  }) => {
    await page.goto("/for-clients");
    const nodes = visible(
      page.locator(
        '[data-testid="process-timeline"] [data-testid="process-node"]'
      )
    );
    await expect(nodes).toHaveCount(4);

    const labels = await visible(
      page.locator(
        '[data-testid="process-timeline"] [data-testid="process-label"]'
      )
    ).allTextContents();
    expect(labels).toEqual(["BRIEF", "SCOPE", "BUILD", "HANDOFF"]);

    const timestamps = await visible(
      page.locator(
        '[data-testid="process-timeline"] [data-testid="process-timestamp"]'
      )
    ).allTextContents();
    expect(timestamps).toEqual(["DAY 0", "DAY 1-3", "WEEK 1-4", "WEEK 4+"]);
  });

  test("process timeline is horizontal on desktop", async ({ page }) => {
    await page.goto("/for-clients");
    const circles = visible(
      page.locator(
        '[data-testid="process-timeline"] [data-testid="process-circle"]'
      )
    );
    await expect(circles).toHaveCount(4);
    const a = await circles.nth(0).boundingBox();
    const b = await circles.nth(3).boundingBox();
    if (!a || !b) throw new Error("circles have no bounding box");
    expect(b.x).toBeGreaterThan(a.x + 100);
    expect(Math.abs(b.y - a.y)).toBeLessThan(20);
  });

  // --- STACK ARCHITECTURE ---

  test("stack architecture renders with three columns + signal border", async ({
    page,
  }) => {
    await page.goto("/for-agencies");
    const stack = page.locator('[data-testid="stack-architecture"]');
    await expect(stack).toBeVisible();

    const arrows = visible(stack.locator('[data-testid="stack-arrow"]'));
    expect(await arrows.count()).toBeGreaterThanOrEqual(6);

    const headers = visible(stack.locator('[data-testid="stack-header"]'));
    const headerTexts = await headers.allTextContents();
    const combined = headerTexts
      .map((t) => t.replace(/\s+/g, " ").trim())
      .join(" | ");
    expect(combined).toContain("YOUR AGENCY");
    expect(combined).toContain("ETHAN");
    expect(combined).toContain("YOUR STACK");
    expect(combined).toContain("CONTRACT DEV");

    const highlighted = visible(
      stack.locator('[data-testid="stack-row"][data-highlight="true"]')
    );
    expect(await highlighted.count()).toBe(4);

    const color = await highlighted
      .first()
      .evaluate((el) => window.getComputedStyle(el).borderTopColor);
    expect(color.replace(/\s+/g, "")).toBe("rgb(255,176,0)");

    const caption = stack.locator('[data-testid="stack-caption"]');
    await expect(caption).toHaveText(
      "NO ATTRIBUTION REQUIRED. YOUR CLIENT NEVER KNOWS I EXIST."
    );
  });

  // --- BUILD SHOWCASE ---

  for (const path of ["/for-agencies", "/for-clients"]) {
    test(`build showcase renders on ${path} with 5 tabs`, async ({ page }) => {
      await page.goto(path);
      const showcase = page.locator('[data-testid="build-showcase"]');
      await expect(showcase).toBeVisible();
      const tabs = showcase.locator('[data-testid="showcase-tab"]');
      await expect(tabs).toHaveCount(5);
      const labels = await tabs.allTextContents();
      expect(labels.map((l) => l.trim())).toEqual([
        "DASHBOARDS",
        "AUTOMATION",
        "SCRAPERS",
        "WEB APPS",
        "INTERNAL TOOLS",
      ]);
    });
  }

  test("clicking AUTOMATION tab makes it active in --signal color", async ({
    page,
  }) => {
    await page.goto("/for-agencies");
    const tab = page.locator(
      '[data-testid="showcase-tab"][data-tab="AUTOMATION"]'
    );
    await tab.click();
    await expect(tab).toHaveAttribute("data-active", "true");
    await expect
      .poll(
        async () =>
          (
            await tab.evaluate((el) => window.getComputedStyle(el).color)
          ).replace(/\s+/g, ""),
        { timeout: 1500 }
      )
      .toBe("rgb(255,176,0)");
  });

  test("showcase auto-advances after 5s when not hovered", async ({ page }) => {
    await page.goto("/for-agencies");
    await page.mouse.move(5, 5);
    const showcase = page.locator('[data-testid="build-showcase"]');
    const initial = await showcase.getAttribute("data-active-index");
    expect(initial).toBe("0");
    await page.waitForTimeout(5300);
    const after = await showcase.getAttribute("data-active-index");
    expect(after).not.toBe(initial);
  });

  test("hovering showcase pauses auto-advance", async ({ page }) => {
    await page.goto("/for-agencies");
    const showcase = page.locator('[data-testid="build-showcase"]');
    const initial = await showcase.getAttribute("data-active-index");
    expect(initial).toBe("0");
    await page
      .locator('[data-testid="showcase-tab"][data-tab="DASHBOARDS"]')
      .hover();
    await page.waitForTimeout(6000);
    const after = await showcase.getAttribute("data-active-index");
    expect(after).toBe(initial);
  });

  // --- REGRESSIONS ---

  test("homepage section numbers 00/01/02/03 intact", async ({ page }) => {
    await page.goto("/");
    const labels = await page
      .locator("main .font-mono.uppercase")
      .allTextContents();
    const nums = labels
      .map((t) => t.replace(/\s+/g, " ").trim())
      .filter((t) => /^\/\s*\d{2}\b/.test(t))
      .slice(0, 4)
      .map((t) => t.match(/\d{2}/)![0]);
    expect(nums).toEqual(["00", "01", "02", "03"]);
  });

  test("/for-agencies still has contract-sheet labels", async ({ page }) => {
    await page.goto("/for-agencies");
    const labels = await page
      .locator('[data-testid="sheet-label"]')
      .allTextContents();
    const set = new Set(labels.map((l) => l.replace(/[^A-Z]/g, "")));
    for (const l of ["SCOPE", "OWNERSHIP", "TURNAROUND", "STACK", "COMMS", "FIT"]) {
      expect(set.has(l)).toBeTruthy();
    }
  });

  test("/for-clients still has at least 5 FAQ pairs", async ({ page }) => {
    await page.goto("/for-clients");
    const items = page.locator('[data-testid="faq-item"]');
    expect(await items.count()).toBeGreaterThanOrEqual(5);
  });
});

test.describe("Phase 4.6 @ mobile 390x844", () => {
  test.use({ viewport: MOBILE });

  test("process timeline stacks vertically on mobile", async ({ page }) => {
    await page.goto("/for-clients");
    const circles = visible(
      page.locator(
        '[data-testid="process-timeline"] [data-testid="process-circle"]'
      )
    );
    await expect(circles).toHaveCount(4);
    const a = await circles.nth(0).boundingBox();
    const b = await circles.nth(3).boundingBox();
    if (!a || !b) throw new Error("circles have no bounding box");
    expect(b.y).toBeGreaterThan(a.y + 100);
    expect(Math.abs(b.x - a.x)).toBeLessThan(20);
  });

  test("stack architecture columns stack vertically on mobile", async ({
    page,
  }) => {
    await page.goto("/for-agencies");
    const headers = visible(
      page.locator(
        '[data-testid="stack-architecture"] [data-testid="stack-header"]'
      )
    );
    expect(await headers.count()).toBe(3);
    const a = await headers.nth(0).boundingBox();
    const c = await headers.nth(2).boundingBox();
    if (!a || !c) throw new Error("headers have no bounding box");
    expect(c.y).toBeGreaterThan(a.y + 100);
    expect(Math.abs(c.x - a.x)).toBeLessThan(30);
  });

  test("build showcase renders on mobile /for-agencies", async ({ page }) => {
    await page.goto("/for-agencies");
    await expect(page.locator('[data-testid="build-showcase"]')).toBeVisible();
    await expect(page.locator('[data-testid="showcase-tab"]')).toHaveCount(5);
  });

  test("build showcase renders on mobile /for-clients", async ({ page }) => {
    await page.goto("/for-clients");
    await expect(page.locator('[data-testid="build-showcase"]')).toBeVisible();
    await expect(page.locator('[data-testid="showcase-tab"]')).toHaveCount(5);
  });
});
