import { test, expect } from "@playwright/test";
import { LoginPage } from "./login";
import { publicUI } from "../../config";
import { credentials } from "../../utils/apiData";

test.describe("UI Tests - Login", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(publicUI);
    await page.getByText("Sign in").click();
  });

  test.afterEach(async ({}, testInfo) => {
    console.log(
      `Test "${testInfo.title}" finished with status: ${testInfo.status}`
    );
  });

  test("Login with valid credentials", async ({ page }) => {
    await loginPage.login(credentials.email, credentials.password);
    await expect(page.locator(".navbar.navbar-light")).toBeVisible();
    await expect(page.getByText("Global Feed")).toBeVisible();
  });

  test("Login with invalid credentials", async ({ page }) => {
    await loginPage.login("email@example.com", "password");
    await expect(page.locator(".error-messages")).toBeVisible();
  });
  test.describe("Flaky Test", () => {
    test.describe.configure({ retries: 2 });
    test("Flaky login retry", async ({ page }, testInfo) => {
      console.log(`Retry #${testInfo.retry}`);

      const password =
        testInfo.retry === 2 ? credentials.password : credentials.email;

      await loginPage.login(credentials.email, password);
      await expect(page.getByText("Global Feed")).toBeVisible();
    });
  });
});
