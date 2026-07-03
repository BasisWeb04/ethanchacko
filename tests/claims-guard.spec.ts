import { test, expect } from "@playwright/test";
import { projects } from "../content/projects";

// The honesty limit, made executable. Every public route is crawled and its
// rendered HTML is asserted to contain NONE of these strings:
//   - client-identifying names (the three case studies stay anonymized),
//   - the banned verb "recovered" (the flagship "migrated", never "recovered"),
//   - the hidden dev method ("Claude Code"),
//   - the em-dash character (voice rule: no em dashes anywhere, sitewide).
// If any appears in a rendered page, the build fails here. This test must pass
// on every run.
const EM_DASH = String.fromCharCode(0x2014);
const BANNED: string[] = [
  "Front Line",
  "Hathaway",
  "Sean",
  "Michael",
  "Seiverling",
  "Kirby",
  "Paul",
  "Akron",
  "recovered",
  "Claude Code",
  "Home Professors",
  "homeprofessors",
  EM_DASH,
];

// Public routes only. /internal/mock/* is noindex infrastructure and is not a
// marketing surface, so it is excluded here; its rendered output is still
// scrubbed of the dev method separately (it feeds the thumbnails).
const STATIC_ROUTES = ["/", "/for-agencies"];
const WORK_ROUTES = projects.map((p) => `/work/${p.slug}`);
const ROUTES = [...STATIC_ROUTES, ...WORK_ROUTES];

for (const route of ROUTES) {
  test(`claims guard: ${route}`, async ({ page }) => {
    await page.goto(route);
    const html = (await page.content()).toLowerCase();
    // Case-insensitive so a casing trick cannot smuggle a banned string past.
    const hits = BANNED.filter((s) => html.includes(s.toLowerCase()));
    expect(
      hits,
      `banned string(s) rendered on ${route}: ${hits
        .map((h) => (h === EM_DASH ? "em-dash" : h))
        .join(", ")}`
    ).toEqual([]);
  });
}
