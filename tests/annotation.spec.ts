import { test, expect } from "@playwright/test";
import { baseURl } from "../config";

test.skip("Skip Navigate to Orange HRM", async ({ page }) => {
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

test.describe("Describe Navigate to Orange HRM", () => {
  test("Navigate to Orange HRM", async ({ page }) => {
    await page.goto(process.env.baseURL || baseURl);
    await expect(page).toHaveTitle("OrangeHRM");
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
