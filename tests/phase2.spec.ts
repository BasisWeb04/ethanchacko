import { test, expect } from "@playwright/test";

test("hero renders with correct copy", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator('[data-testid="hero"]');
  const h1 = hero.locator("h1");
  await expect(h1).toContainText("I build systems,");
  const serifSpan = h1.locator("span.italic");
  await expect(serifSpan).toContainText("not slide decks.");
  const subhead = page.locator('[data-testid="hero-subhead"]');
  await expect(subhead).toHaveText(
    "Full-stack developer out of Phoenix. I ship software for agencies and businesses who need something built, not pitched."
  );
});

test("hero CTAs link correctly", async ({ page }) => {
  await page.goto("/");
  const agenciesCta = page.locator('[data-testid="cta-agencies"]');
  await expect(agenciesCta).toHaveAttribute("href", "/for-agencies");
  const brandsCta = page.locator('[data-testid="cta-brands"]');
  await expect(brandsCta).toHaveAttribute("href", "/for-clients");
});

test("work grid has exactly 7 cards", async ({ page }) => {
  await page.goto("/");
  const cards = page.locator('[data-testid="work-card"]');
  await expect(cards).toHaveCount(7);
});

test("status dot distribution", async ({ page }) => {
  await page.goto("/");
  const liveCards = page.locator('[data-status="LIVE"]');
  const shippedCards = page.locator('[data-status="SHIPPED"]');
  await expect(liveCards).toHaveCount(4);
  await expect(shippedCards).toHaveCount(3);
});

test("live cards have external link arrow", async ({ page }) => {
  await page.goto("/");
  const liveCards = page.locator('[data-status="LIVE"]');
  const liveCount = await liveCards.count();
  for (let i = 0; i < liveCount; i++) {
    const card = liveCards.nth(i);
    const externalLink = card.locator('[data-testid="external-link"]');
    await expect(externalLink).toHaveCount(1);
    const href = await externalLink.getAttribute("href");
    expect(href).toBeTruthy();
  }

  const shippedCards = page.locator('[data-status="SHIPPED"]');
  const shippedCount = await shippedCards.count();
  for (let i = 0; i < shippedCount; i++) {
    const card = shippedCards.nth(i);
    const externalLink = card.locator('[data-testid="external-link"]');
    await expect(externalLink).toHaveCount(0);
  }
});

test("stack section contains all 12 tools", async ({ page }) => {
  await page.goto("/");
  const stackSection = page.locator('[data-testid="stack-section"]');
  const tools = [
    "Next.js",
    "TypeScript",
    "Tailwind",
    "shadcn/ui",
    "Supabase",
    "n8n",
    "Python",
    "Playwright",
    "Twilio",
    "Resend",
    "Vercel",
    "Claude API",
  ];
  for (const tool of tools) {
    await expect(stackSection).toContainText(tool);
  }
});

test("nav hover underline", async ({ page }) => {
  await page.goto("/");
  const navLink = page.locator('[data-testid="nav-link"]').first();
  await navLink.hover();
  await page.waitForTimeout(250);
  const transform = await navLink.evaluate((el) => {
    const after = window.getComputedStyle(el, "::after");
    return after.transform;
  });
  expect(transform).not.toBe("none");
  expect(transform).toContain("matrix");
});

test("email reveal initial state", async ({ page }) => {
  await page.goto("/");
  const emailReveal = page.locator('[data-testid="email-reveal"]');
  await expect(emailReveal).toContainText("ethan@\u2022\u2022\u2022\u2022\u2022\u2022\u2022.net");
});

test("email reveal click behavior", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const emailReveal = page.locator('[data-testid="email-reveal"]');
  await emailReveal.click();
  await page.waitForTimeout(500);
  await expect(emailReveal).toContainText("ethan@basisweb.net");
  const clipboardContent = await page.evaluate(() =>
    navigator.clipboard.readText()
  );
  expect(clipboardContent).toBe("ethan@basisweb.net");
  const toast = page.locator('[data-testid="copied-toast"]');
  await expect(toast).toBeVisible();
  await expect(toast).toHaveText("COPIED");
});

test("prefers-reduced-motion disables animations", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const emailReveal = page.locator('[data-testid="email-reveal"]');
  await emailReveal.click();
  await page.waitForTimeout(50);
  await expect(emailReveal).toContainText("ethan@basisweb.net");
});
