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

test.only("Based on browser, Navigate to Orange HRM", async ({
  page,
}, browser) => {
  test.skip(browser.project.name !== "chromium", "Only for Chromium");
  await page.goto(process.env.baseURL || baseURl);
  await expect(page).toHaveTitle("OrangeHRM");
});

test.fail("Fail test", async ({ page }) => {
  await page.goto(process.env.baseURL || baseURl);
  await expect(page).toHaveTitle(/Login/);
});

test("@focus Run only Navigate to Orange HRM", async ({ page }) => {
  await page.goto(process.env.baseURL || baseURl);
  await expect(page.locator("h5")).toHaveText("Login");
});

test("Slowdown Navigate to Orange HRM", async ({ page }) => {
  await page.goto(process.env.baseURL || baseURl);
  test.slow();
  await expect(page).toHaveTitle("OrangeHRM");
});

test.describe("Grouped test", () => {
  test("Test 1", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/OrangeHRM/);
  });

  test("Test 2", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h5")).toHaveText("Login");
  });
});

test("Test with errors", async ({ page }) => {
  try {
    await page.goto(process.env.baseURL || baseURl);
    await expect(page).toHaveTitle("HRMS");
  } catch (error) {
    test.fixme(true, "Test failed unexpectedly, skipping...");
  }
});
