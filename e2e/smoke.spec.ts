import { test, expect } from "@playwright/test";
import { routes } from "./routes";

/**
 * Structural smoke tests across viewports. Verifies that every static route
 * renders a single <main>, exactly one <h1>, a header and footer, and has no
 * horizontal overflow (a common responsive regression at narrow widths).
 */
for (const { path, name } of routes) {
  test(`smoke: ${name} renders core landmarks without overflow`, async ({ page }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" });

    await expect(page.locator("header").first()).toBeVisible();
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("footer").first()).toBeVisible();

    // Exactly one h1 per page (document outline correctness).
    await expect(page.locator("h1")).toHaveCount(1);

    // No horizontal scroll: scrollWidth should not exceed the viewport width.
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth - doc.clientWidth;
    });
    expect(overflow, "horizontal overflow in px").toBeLessThanOrEqual(1);
  });
}

test("mobile menu opens and closes on Escape", async ({ page, viewport }) => {
  test.skip((viewport?.width ?? 0) >= 1024, "mobile menu only renders below lg");

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open menu" }).click();

  const dialog = page.getByRole("dialog", { name: "Site menu" });
  await expect(dialog).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("primary touch targets meet the 40px minimum", async ({ page }) => {
  await page.goto("/cart", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => {});

  // Any rendered stepper/chip controls must be >= 40px on their smaller axis.
  const controls = page.locator(".stepper, .stepper-sm, .chip");
  const n = await controls.count();
  for (let i = 0; i < n; i++) {
    const box = await controls.nth(i).boundingBox();
    if (!box) continue;
    expect(Math.min(box.width, box.height)).toBeGreaterThanOrEqual(40);
  }
});

test("Meta Pixel initializes the production account and PageView", async ({ page }) => {
  // Keep the test deterministic while still verifying the inline bootstrap
  // queue that is handed to fbevents.js in real browsers.
  await page.route("https://connect.facebook.net/**", (route) => route.abort());
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect
    .poll(() =>
      page.evaluate(() => {
        const fbq = window.fbq as
          | (typeof window.fbq & { queue?: ArrayLike<unknown>[] })
          | undefined;
        return fbq?.queue?.map((call) => Array.from(call).slice(0, 2)) ?? [];
      }),
    )
    .toContainEqual(["init", "1293778635943718"]);

  await expect
    .poll(() =>
      page.evaluate(() => {
        const fbq = window.fbq as
          | (typeof window.fbq & { queue?: ArrayLike<unknown>[] })
          | undefined;
        return fbq?.queue?.map((call) => Array.from(call).slice(0, 2)) ?? [];
      }),
    )
    .toContainEqual(["track", "PageView"]);
});
