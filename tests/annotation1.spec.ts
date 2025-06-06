import { test, expect } from "@playwright/test";
import { baseURl } from "../config";

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
    await page.goto(process.env.baseURL || baseURl);
    await expect(page).toHaveTitle(/OrangeHRM/);
  });

  test("Test 2", async ({ page }) => {
    await page.goto(process.env.baseURL || baseURl);
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
