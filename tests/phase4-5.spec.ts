import { test, expect } from "@playwright/test";

test("homepage sections run 00 / 01 / 02 / 03 in order", async ({ page }) => {
  await page.goto("/");
  const labels = page.locator("main").locator(".font-mono.uppercase");
  const texts = await labels.allTextContents();
  const numbered = texts
    .map((t) => t.replace(/\s+/g, " ").trim())
    .filter((t) => /^\/\s*\d{2}\b/.test(t));

  expect(numbered.length).toBeGreaterThanOrEqual(4);
  const sequence = numbered.slice(0, 4).map((t) => t.match(/\d{2}/)![0]);
  expect(sequence).toEqual(["00", "01", "02", "03"]);
});

test("/for-agencies has no rate block or rate number", async ({ page }) => {
  await page.goto("/for-agencies");
  const body = await page.locator("body").innerText();
  expect(body).not.toContain("Starts at $65/hr");
  expect(body).not.toContain("/ RATE");
  expect(body).not.toMatch(/\$\s*65\s*\/?\s*hr/i);
});

test("/for-agencies contract sheet has all 6 labels", async ({ page }) => {
  await page.goto("/for-agencies");
  const labels = page.locator('[data-testid="sheet-label"]');
  await expect(labels).toHaveCount(6);

  const expected = ["SCOPE", "OWNERSHIP", "TURNAROUND", "STACK", "COMMS", "FIT"];
  for (const label of expected) {
    await expect(
      page.locator('[data-testid="sheet-label"]', { hasText: label })
    ).toHaveCount(1);
  }
});

test("/for-clients has at least 5 Q&A pairs", async ({ page }) => {
  await page.goto("/for-clients");
  const items = page.locator('[data-testid="faq-item"]');
  const count = await items.count();
  expect(count).toBeGreaterThanOrEqual(5);
});

test("/for-clients surfaces key questions", async ({ page }) => {
  await page.goto("/for-clients");
  const questions = page.locator('[data-testid="faq-question"]');
  await expect(
    questions.filter({ hasText: "What do I actually get?" })
  ).toHaveCount(1);
  await expect(
    questions.filter({ hasText: "How long does this take?" })
  ).toHaveCount(1);
});

test("nothing on the site advertises a rate number", async ({ page }) => {
  for (const path of ["/", "/for-agencies", "/for-clients"]) {
    await page.goto(path);
    const body = await page.locator("body").innerText();
    expect(body, `rate token on ${path}`).not.toMatch(/\$\s*65\s*\/?\s*hr/i);
  }
});
