import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { routes } from "./routes";

/**
 * Accessibility scan: runs axe-core against every static route. The Playwright
 * `projects` config replays this file at 360 / 768 / 1280px, so each page is
 * checked for WCAG 2.x A/AA violations at mobile, tablet, and desktop widths.
 */
for (const { path, name } of routes) {
  test(`a11y: ${name} has no WCAG A/AA violations`, async ({ page }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    // Let fonts / lazy content settle so contrast checks are accurate.
    await page.waitForLoadState("networkidle").catch(() => {});

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    if (results.violations.length > 0) {
      // Surface a readable summary in the test output.
      console.log(
        `\n${name} (${path}) axe violations:\n` +
          results.violations
            .map(
              (v) =>
                `  • [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))`
            )
            .join("\n")
      );
    }

    expect(results.violations, "axe accessibility violations").toEqual([]);
  });
}
