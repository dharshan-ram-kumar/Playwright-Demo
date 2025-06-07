import { test, expect } from "@playwright/test";
import { Login } from "../pageObjectModel/login";
import { baseURl, password, username } from "../config";

test("Login class", async ({ page }) => {
  const loginPage = new Login(page);

  await page.goto(process.env.baseURL || baseURl);
  await expect(page).toHaveTitle("OrangeHRM");
  await loginPage.login(username || "princep", password || "Welcome@ta2025");

  await expect(
    page.locator(".oxd-topbar-header-title").filter({ hasText: "Dashboard" })
  ).toBeVisible();
});
