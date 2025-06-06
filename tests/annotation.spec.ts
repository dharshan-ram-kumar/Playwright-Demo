import { test, expect } from "@playwright/test";
import { baseURl } from "../config";

test("Conditional skip based on env", async ({ page }) => {
  test.skip(process.env.SKIP_CASE === "true", "Skipping due to env var");
  await page.goto(process.env.baseURL || baseURl);
});

test.skip("Skip Navigate to Orange HRM", async ({ page }) => {
  await page.goto(process.env.baseURL || baseURl);
  await expect(page).toHaveTitle("OrangeHRM");
});

test("Based on browser, Navigate to Orange HRM", async ({ page }, browser) => {
  test.skip(browser.project.name !== "chromium", "Only for Chromium");
  await page.goto(process.env.baseURL || baseURl);
  await expect(page).toHaveTitle("OrangeHRM");
});
