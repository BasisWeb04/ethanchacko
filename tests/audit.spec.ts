import { test, expect, type Page } from "@playwright/test";

// ---------------------------------------------------------------------------
// route catalogue
// ---------------------------------------------------------------------------

const WORK_SLUGS = [
  "servicecalltracker",
  "basisweb",
  "hammock",
  "operations-command",
  "warpspeed",
  "acc-scraper",
  "google-maps-scraper",
] as const;

const LIVE_SLUGS = new Set<string>([
  "servicecalltracker",
  "basisweb",
  "hammock",
  "operations-command",
]);

const OK_ROUTES: string[] = [
  "/",
  "/for-agencies",
  "/for-clients",
  ...WORK_SLUGS.map((s) => `/work/${s}`),
];

const BAD_ROUTE = "/work/definitely-not-a-real-project";

// Some network URLs are allowed to fail (external third-party assets we do
// not control, and next/image _next/image transforms that can 404 in dev).
function isIgnorableFailure(url: string) {
  return (
    url.startsWith("chrome-extension://") ||
    url.includes("/_next/image") // dev optimizer can 404 briefly
  );
}

function attachErrorTrackers(page: Page) {
  const consoleErrors: string[] = [];
  const failedRequests: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("requestfailed", (req) => {
    const url = req.url();
    if (!isIgnorableFailure(url)) failedRequests.push(url);
  });
  return { consoleErrors, failedRequests };
}

// ---------------------------------------------------------------------------
// per-route smoke
// ---------------------------------------------------------------------------

test.describe("Audit: per-route smoke", () => {
  for (const route of OK_ROUTES) {
    test(`${route} renders cleanly`, async ({ page }) => {
      const { consoleErrors, failedRequests } = attachErrorTrackers(page);
      const response = await page.goto(route, { waitUntil: "networkidle" });
      expect(response?.status(), `status for ${route}`).toBe(200);

      const title = await page.title();
      expect(title.length, `title for ${route}`).toBeGreaterThan(0);
      expect(title).toContain("Ethan Chacko");

      const metaDesc = await page
        .locator('meta[name="description"]')
        .first()
        .getAttribute("content");
      expect(metaDesc?.length ?? 0, `description for ${route}`).toBeGreaterThan(
        0
      );

      const ogImage = await page
        .locator('meta[property="og:image"]')
        .first()
        .getAttribute("content");
      expect(ogImage, `og:image for ${route}`).toBeTruthy();

      await expect(page.locator("nav").first()).toBeVisible();
      await expect(
        page.locator("nav").first().locator("text=PHX").first()
      ).toBeVisible();

      const footer = page.locator("footer").first();
      await expect(footer).toBeVisible();
      await expect(
        footer.locator('a[href="mailto:ethan@basisweb.net"]')
      ).toHaveCount(1);
      await expect(
        footer.locator('a[href*="upwork.com"]')
      ).toHaveCount(1);

      await expect(page.locator('a[href="#main"]')).toHaveCount(1);

      expect(consoleErrors, `console errors on ${route}`).toEqual([]);
      expect(failedRequests, `failed requests on ${route}`).toEqual([]);
    });
  }

  test(`${BAD_ROUTE} returns 404 with branded not-found page`, async ({
    page,
  }) => {
    const response = await page.goto(BAD_ROUTE);
    expect(response?.status()).toBe(404);
    await expect(page.locator('[data-testid="not-found"]')).toBeVisible();
    await expect(page.locator('[data-testid="not-found-home"]')).toHaveAttribute(
      "href",
      "/"
    );
    await expect(page.locator('[data-testid="not-found-email"]')).toHaveAttribute(
      "href",
      "mailto:ethan@basisweb.net"
    );
    await expect(page.locator('a[href="#main"]')).toHaveCount(1);
  });
});

// ---------------------------------------------------------------------------
// cross-page: command palette
// ---------------------------------------------------------------------------

test.describe("Audit: command palette works everywhere", () => {
  const sample = ["/", "/for-agencies", "/for-clients", "/work/basisweb"];
  for (const route of sample) {
    test(`CMD+K opens the palette on ${route}`, async ({ page }) => {
      await page.goto(route);
      await page.keyboard.press("Control+K");
      await expect(
        page.locator('[data-testid="command-palette"]')
      ).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(
        page.locator('[data-testid="command-palette"]')
      ).toHaveCount(0);
    });
  }

  test("palette Home command navigates to / from any page", async ({ page }) => {
    await page.goto("/for-agencies");
    await page.keyboard.press("Control+K");
    await expect(
      page.locator('[data-testid="command-palette"]')
    ).toBeVisible();
    // Click the Home item directly so we don't depend on cmdk's fuzzy ranking.
    await page
      .locator('[data-testid="palette-item"]')
      .filter({ hasText: /^Home$/ })
      .click();
    await expect(page).toHaveURL("http://localhost:3000/");
  });
});

// ---------------------------------------------------------------------------
// cross-page: email reveal
// ---------------------------------------------------------------------------

test("email reveal copies ethan@basisweb.net to clipboard", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.locator('[data-testid="email-reveal"]').click();
  await expect(page.locator('[data-testid="copied-toast"]')).toBeVisible();
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  expect(clip).toBe("ethan@basisweb.net");
});

// ---------------------------------------------------------------------------
// cross-page: work card links are correct
// ---------------------------------------------------------------------------

test("all 7 work cards link to the matching case study slug", async ({
  page,
}) => {
  await page.goto("/");
  const hrefs = await page
    .locator('[data-testid="work-card"] a[href^="/work/"]')
    .evaluateAll((els) =>
      els.map((el) => (el as HTMLAnchorElement).getAttribute("href"))
    );
  const slugs = hrefs
    .filter((h): h is string => !!h)
    .map((h) => h.replace("/work/", ""));
  // Each slug must be one of our 7, and all 7 must appear at least once.
  for (const slug of slugs) {
    expect(WORK_SLUGS).toContain(slug);
  }
  for (const expected of WORK_SLUGS) {
    expect(slugs).toContain(expected);
  }
});

test("all 4 LIVE work cards have an external link that opens in a new tab", async ({
  page,
}) => {
  await page.goto("/");
  const liveCards = page.locator('[data-status="LIVE"]');
  const count = await liveCards.count();
  expect(count).toBe(4);
  for (let i = 0; i < count; i++) {
    const card = liveCards.nth(i);
    const ext = card.locator('[data-testid="external-link"]');
    await expect(ext).toHaveCount(1);
    await expect(ext).toHaveAttribute("target", "_blank");
    await expect(ext).toHaveAttribute("rel", /noopener/);
  }
  // Sanity: the 4 LIVE slugs match our LIVE_SLUGS set.
  const liveHrefs = await liveCards
    .locator('a[href^="/work/"]')
    .evaluateAll((els) =>
      els.map((el) => (el as HTMLAnchorElement).getAttribute("href"))
    );
  const liveSlugs = new Set(
    liveHrefs
      .filter((h): h is string => !!h)
      .map((h) => h.replace("/work/", ""))
  );
  for (const slug of LIVE_SLUGS) {
    expect(liveSlugs).toContain(slug);
  }
});

// ---------------------------------------------------------------------------
// upwork url is exactly what the user confirmed
// ---------------------------------------------------------------------------

const UPWORK_URL = "https://www.upwork.com/freelancers/ethanchacko";

test("footer Upwork link points at the exact verified URL", async ({ page }) => {
  await page.goto("/");
  const link = page.locator("footer a", { hasText: "Upwork" }).first();
  await expect(link).toHaveAttribute("href", UPWORK_URL);
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noopener/);
});

test("command palette Upwork entry opens the exact verified URL in a new tab", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await page.keyboard.press("Control+K");
  await expect(page.locator('[data-testid="command-palette"]')).toBeVisible();

  const pagePromise = context.waitForEvent("page");
  await page
    .locator('[data-testid="palette-item"]')
    .filter({ hasText: /^Open Upwork profile$/ })
    .click();
  const newTab = await pagePromise;
  await newTab.waitForLoadState("domcontentloaded").catch(() => {});
  expect(newTab.url()).toBe(UPWORK_URL);
  await newTab.close();
});

// ---------------------------------------------------------------------------
// viewports
// ---------------------------------------------------------------------------

test.describe("Audit: viewport reflow", () => {
  test.describe("mobile 390x844", () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test("HUD chip collapses to the short PHX form on mobile", async ({
      page,
    }) => {
      await page.goto("/");
      const nav = page.locator("nav").first();
      // Desktop chip hidden on mobile, mobile chip visible with just PHX + AVAILABLE.
      const phxCount = await nav.locator("text=PHX").count();
      expect(phxCount).toBeGreaterThan(0);
      const utcVisible = await nav
        .locator("text=UTC")
        .first()
        .isVisible()
        .catch(() => false);
      expect(utcVisible).toBe(false);
    });

    test("work grid is a single column on mobile", async ({ page }) => {
      await page.goto("/");
      const cards = page.locator('[data-testid="work-card"]');
      const boxes = await cards.evaluateAll((els) =>
        els.map((el) => (el as HTMLElement).getBoundingClientRect().left)
      );
      const unique = new Set(boxes.map((b) => Math.round(b)));
      expect(unique.size).toBe(1);
    });

    test("process timeline stacks vertically on mobile", async ({ page }) => {
      await page.goto("/for-clients");
      // The desktop and mobile variants both mount; filter to the visible
      // (mobile) set so we measure the right layout.
      const nodes = page
        .locator('[data-testid="process-node"]')
        .filter({ visible: true });
      const count = await nodes.count();
      expect(count).toBe(4);
      const tops = await nodes.evaluateAll((els) =>
        els.map((el) => (el as HTMLElement).getBoundingClientRect().top)
      );
      for (let i = 1; i < tops.length; i++) {
        expect(tops[i]).toBeGreaterThan(tops[i - 1]);
      }
    });

    test("stack architecture columns stack vertically on mobile", async ({
      page,
    }) => {
      await page.goto("/for-agencies");
      await page
        .locator('[data-testid="stack-architecture"]')
        .scrollIntoViewIfNeeded();
      const headers = page
        .locator('[data-testid="stack-header"]')
        .filter({ visible: true });
      const count = await headers.count();
      expect(count).toBeGreaterThanOrEqual(3);
      const lefts = await headers.evaluateAll((els) =>
        els.map((el) => (el as HTMLElement).getBoundingClientRect().left)
      );
      const unique = new Set(lefts.map((l) => Math.round(l)));
      expect(unique.size).toBe(1);
    });

    test("build showcase tabs remain tappable on mobile", async ({ page }) => {
      await page.goto("/for-agencies");
      const tabs = page.locator('[data-testid="showcase-tab"]');
      const count = await tabs.count();
      expect(count).toBe(5);
      for (let i = 0; i < count; i++) {
        const box = await tabs.nth(i).boundingBox();
        expect(box?.height ?? 0).toBeGreaterThanOrEqual(24);
      }
    });
  });

  test.describe("tablet 768x1024", () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test("work grid uses 2 columns at tablet width", async ({ page }) => {
      await page.goto("/");
      const cards = page.locator('[data-testid="work-card"]');
      const lefts = await cards.evaluateAll((els) =>
        els.map((el) => (el as HTMLElement).getBoundingClientRect().left)
      );
      const unique = new Set(lefts.map((l) => Math.round(l)));
      expect(unique.size).toBe(2);
    });
  });

  test.describe("desktop 1440x900", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("work grid uses 3 columns at desktop width", async ({ page }) => {
      await page.goto("/");
      const cards = page.locator('[data-testid="work-card"]');
      const lefts = await cards.evaluateAll((els) =>
        els.map((el) => (el as HTMLElement).getBoundingClientRect().left)
      );
      const unique = new Set(lefts.map((l) => Math.round(l)));
      expect(unique.size).toBe(3);
    });

    test("HUD chip shows full PHX / UTC / time / AVAILABLE on desktop", async ({
      page,
    }) => {
      await page.goto("/");
      const nav = page.locator("nav").first();
      await expect(nav.locator("text=UTC").first()).toBeVisible();
      await expect(nav.locator("text=AVAILABLE").first()).toBeVisible();
    });
  });
});
