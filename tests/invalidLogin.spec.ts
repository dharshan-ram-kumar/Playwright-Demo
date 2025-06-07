import { test, expect } from "@playwright/test";
import { Login } from "../pageObjectModel/login";
import { baseURl } from "../config";

test("Login with invalid credentials", async ({ page }) => {
  const loginPage = new Login(page);

  await page.goto(process.env.baseURL || baseURl);
  await expect(page).toHaveTitle("OrangeHRM");

  await loginPage.login("user", "password");

  const message = await loginPage.getMessage();
  expect(message?.trim()).toBe("Invalid credentials");
});
