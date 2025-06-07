import { test, expect } from "@playwright/test";
import { Login } from "../pageObjectModel/login";
import { baseURl } from "../config";
import testData from "../utils/loginData.json";

test.describe("Data-driven Login", () => {
  for (const { username, password, expected } of testData) {
    test(`Login with ${username} and ${password}`, async ({ page }) => {
      const loginPage = new Login(page);

      await page.goto(process.env.baseURL || baseURl);
      await loginPage.login(username, password);

      const dashboard = page.locator(".oxd-topbar-header-title", {
        hasText: "Dashboard",
      });

      if (expected === "success") {
        await expect(dashboard).toBeVisible();
      } else if (expected === "Required") {
        const requiredMessage = await loginPage.requiredGetMessage();
        expect(requiredMessage).toBe(expected);
      } else {
        const message = await loginPage.getMessage();
        expect(message).toBe(expected);
      }
    });
  }
});
