import { test, expect, type Locator } from "@playwright/test";

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

function visible(locator: Locator): Locator {
  return locator.filter({ visible: true });
}

// ---------------------------------------------------------------------------
// Left-gutter Section layout applies to every main page
// ---------------------------------------------------------------------------

test.describe("Phase 5.5 @ desktop 1440x900: section layout", () => {
  test.use({ viewport: DESKTOP });

  const routes = ["/", "/for-agencies", "/for-clients"];
  for (const route of routes) {
    test(`${route} has at least one Section grid with a 220px left gutter at lg`, async ({
      page,
    }) => {
      await page.goto(route);
      const grids = page.locator('[data-testid="section-grid"]');
      const count = await grids.count();
      expect(count).toBeGreaterThanOrEqual(1);
      const matches = await grids.evaluateAll((els) =>
        els
          .map((el) => window.getComputedStyle(el).gridTemplateColumns)
          .filter((v) => /(^|\s)220px(\s|$)/.test(v))
      );
      expect(
        matches.length,
        `at least one Section on ${route} must render the 220px gutter`
      ).toBeGreaterThanOrEqual(1);
    });
  }
});

// ---------------------------------------------------------------------------
// Asymmetric work grid: 3 rows, varying card sizes
// ---------------------------------------------------------------------------

test.describe("Phase 5.5 @ desktop 1440x900: asymmetric work grid", () => {
  test.use({ viewport: DESKTOP });

  test("work grid renders exactly 3 rows", async ({ page }) => {
    await page.goto("/");
    const rows = page.locator('[data-testid="work-grid-row"]');
    await expect(rows).toHaveCount(3);
  });

  test("ServiceCallTracker is visibly wider than BasisWeb at desktop", async ({
    page,
  }) => {
    await page.goto("/");
    const sct = page
      .locator('[data-testid="work-card"][data-featured="true"]')
      .first();
    await expect(sct).toBeVisible();
    const sctWidth = (await sct.boundingBox())?.width ?? 0;

    // BasisWeb sits in the right-column stack alongside Hammock.
    const cards = page.locator('[data-testid="work-card"]');
    const allBoxes = await cards.evaluateAll((els) =>
      els.map((el) => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        return { width: rect.width, title: el.querySelector("h3, h2")?.textContent ?? "" };
      })
    );
    const basisweb = allBoxes.find((c) => c.title.includes("BasisWeb"));
    expect(basisweb, "BasisWeb card should render").toBeTruthy();
    expect(sctWidth).toBeGreaterThan(basisweb!.width + 50);
  });

  test("work grid exposes at least 3 distinct card widths at desktop", async ({
    page,
  }) => {
    await page.goto("/");
    const cards = page.locator('[data-testid="work-card"]');
    const widths = await cards.evaluateAll((els) =>
      els.map((el) => Math.round((el as HTMLElement).getBoundingClientRect().width))
    );
    // Bucket widths into 10px groups so anti-aliasing doesn't inflate uniqueness.
    const buckets = new Set(widths.map((w) => Math.round(w / 10) * 10));
    expect(buckets.size).toBeGreaterThanOrEqual(2);
    // There must be at least one "wide" card and one "narrow" card, and the
    // wide is meaningfully wider than the narrow.
    const sorted = [...widths].sort((a, b) => a - b);
    const narrow = sorted[0];
    const wide = sorted[sorted.length - 1];
    expect(wide).toBeGreaterThan(narrow + 100);
  });
});

// ---------------------------------------------------------------------------
// Case study promoted VISIT LIVE button
// ---------------------------------------------------------------------------

test.describe("Phase 5.5 @ desktop 1440x900: case study header", () => {
  test.use({ viewport: DESKTOP });

  test("LIVE case study renders a promoted VISIT LIVE button above the status row", async ({
    page,
  }) => {
    await page.goto("/work/servicecalltracker");
    const visitLive = page.locator('[data-testid="visit-live"]');
    await expect(visitLive).toBeVisible();
    await expect(visitLive).toHaveAttribute("href", /servicecalltracker\.com/);
    await expect(visitLive).toHaveAttribute("target", "_blank");

    // The promoted button sits visually above the status/year metadata row.
    const visitBox = await visitLive.boundingBox();
    const year = page
      .locator('[data-testid="case-header"] span')
      .filter({ hasText: /^\d{4}$/ })
      .first();
    await expect(year).toBeVisible();
    const yearBox = await year.boundingBox();
    expect(visitBox).toBeTruthy();
    expect(yearBox).toBeTruthy();
    expect(visitBox!.y).toBeLessThan(yearBox!.y);
  });

  test("SHIPPED case study does not render the VISIT LIVE button", async ({
    page,
  }) => {
    await page.goto("/work/warpspeed");
    await expect(page.locator('[data-testid="visit-live"]')).toHaveCount(0);
  });
});

// ---------------------------------------------------------------------------
// Hero metadata strip
// ---------------------------------------------------------------------------

test.describe("Phase 5.5: hero metadata strip", () => {
  test("renders 3 columns at desktop", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: DESKTOP });
    const page = await ctx.newPage();
    await page.goto("/");
    const strip = page.locator('[data-testid="hero-metadata"]');
    await expect(strip).toBeVisible();
    const cols = strip.locator("> div");
    await expect(cols).toHaveCount(3);
    const tops = await cols.evaluateAll((els) =>
      els.map((el) => (el as HTMLElement).getBoundingClientRect().top)
    );
    const unique = new Set(tops.map((t) => Math.round(t)));
    // Desktop lays them side by side -- all three tops should match.
    expect(unique.size).toBe(1);
    await ctx.close();
  });

  test("stacks to 1 column at mobile", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: MOBILE });
    const page = await ctx.newPage();
    await page.goto("/");
    const strip = page.locator('[data-testid="hero-metadata"]');
    await expect(strip).toBeVisible();
    const cols = strip.locator("> div");
    const tops = await cols.evaluateAll((els) =>
      els.map((el) => (el as HTMLElement).getBoundingClientRect().top)
    );
    const unique = new Set(tops.map((t) => Math.round(t)));
    // Mobile stacks them -- each column has its own y position.
    expect(unique.size).toBe(3);
    await ctx.close();
  });
});

// ---------------------------------------------------------------------------
// Mobile work grid still single column
// ---------------------------------------------------------------------------

test.describe("Phase 5.5 @ mobile 390x844", () => {
  test.use({ viewport: MOBILE });

  test("work grid cards all share a single left position on mobile", async ({
    page,
  }) => {
    await page.goto("/");
    const cards = visible(page.locator('[data-testid="work-card"]'));
    const lefts = await cards.evaluateAll((els) =>
      els.map((el) =>
        Math.round((el as HTMLElement).getBoundingClientRect().left)
      )
    );
    const unique = new Set(lefts);
    expect(unique.size).toBe(1);
    // All 7 cards still present.
    expect(lefts.length).toBe(7);
  });
});
