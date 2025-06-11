import { test, expect } from "@playwright/test";
import { LoginPage } from "./parallelExecution/login";
import { publicUI } from "../config";
import { credentials } from "../utils/apiData";

test.describe("UI Tests - Login", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(publicUI);
    await page.getByText("Sign in").click();
  });

  test.afterEach(async ({}, testInfo) => {
    testInfo.annotations.push({ type: "severity", description: "critical" });
    console.log(
      `Test "${testInfo.title}" finished with status: ${testInfo.status}`
    );
  });

  test("Login with valid credentials", async ({ page }) => {
    await loginPage.login(credentials.email, credentials.password);
    await expect(page.locator(".row")).toHaveScreenshot();
    await expect(page.locator(".navbar.navbar-light")).toBeVisible();
    await expect(page.getByText("Global Feed")).toBeVisible();
  });

  test("Simulate a visual regression by changing background color", async ({
    page,
  }) => {
    await loginPage.login(credentials.email, credentials.password);
    await page.evaluate(() => {
      const row = document.querySelector(".row");
      if (row) {
        row.setAttribute("style", "background-color: red;");
      }
    });
    await expect(page.locator(".row")).toHaveScreenshot();
    await expect(page.locator(".navbar.navbar-light")).toBeVisible();
    await expect(page.getByText("Global Feed")).toBeVisible();
  });

  test("Login with invalid credentials", async ({ page }) => {
    await loginPage.login("email@example.com", "password");
    await expect(page.locator(".error-messages")).toBeVisible();
    await expect(page.locator(".row")).toHaveScreenshot();
  });
  test.describe("Flaky Test Visual Regression", () => {
    test.describe.configure({ retries: 2 });
    test("Flaky login retry", async ({ page }, testInfo) => {
      console.log(`Retry #${testInfo.retry}`);

      const password =
        testInfo.retry === 1 ? credentials.password : credentials.email;

      await loginPage.login(credentials.email, password);
      await expect(page.locator(".row")).toHaveScreenshot();
      await expect(page.getByText("Global Feed")).toBeVisible();
    });
  });
});
