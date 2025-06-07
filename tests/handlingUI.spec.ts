import { test, expect } from "@playwright/test";
import { baseURl, password, username } from "../config";

test.describe("Using Locators", () => {
  test.beforeEach("Login", async ({ page }) => {
    await page.goto(process.env.baseURL || baseURl);
    await expect(page).toHaveTitle("OrangeHRM");

    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
    await expect(page.getByText("Username")).toBeVisible();
    await page.locator('input[name="username"]').fill(username || "princep");
    await expect(page.getByText(/Password/)).toBeVisible();
    await page
      .locator("//input[@placeholder='Password']")
      .fill(password || "Welcome@ta2025");
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
    await page.locator("button", { hasText: "Login" }).click();
    // await page.waitForTimeout(5000);
  });

  test("Extract table data", async ({ page }) => {
    // await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();
    await expect(
      page.locator(".oxd-topbar-header-title").filter({ hasText: "Dashboard" })
    ).toBeVisible();
    await page.getByRole("link", { name: "Admin" }).click();
    await page.getByText("Records Found");
    const header = await page
      .locator("div.oxd-table-header div[role='row']")
      .innerText();
    console.log(header);
    await page
      .locator(
        "div[role='table'] div:nth-child(1) div:nth-child(1) div:nth-child(6) div:nth-child(1) button:nth-child(2) i:nth-child(1)"
      )
      .click();
    await page.waitForTimeout(2000);
    await page.getByText("Cancel").click();
    const cell = page.locator(
      "div[role='rowgroup'] div:nth-child(2) div:nth-child(1) div:nth-child(3)"
    );
    await expect(cell).toHaveText("Admin");
  });

  test("UI Handles", async ({ page }) => {
    // await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();
    await expect(
      page.locator(".oxd-topbar-header-title").filter({ hasText: "Dashboard" })
    ).toBeVisible();
    await page.locator(".oxd-userdropdown-tab").click();
    await expect(page.locator("ul[role='menu']")).toBeVisible();
    await page.getByRole("link", { name: "Admin" }).click();
    const checkbox = page.locator(
      "body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)"
    );
    await checkbox.click();
    await checkbox.click();
    await page
      .locator(
        'div[role="table"] div:nth-child(1) div:nth-child(1) div:nth-child(6) div:nth-child(1) button:nth-child(1) i:nth-child(1)'
      )
      .click();
    await expect(page.getByText("Are you Sure?")).toBeVisible();
    await page.getByRole("button", { name: "No, Cancel" }).click();
  });
});

test("Wait Techniques", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/dynamic_loading/2");
  await page.getByRole("button", { name: "Start" }).click();
  await page.waitForSelector("div[id='finish'] h4", { state: "visible" });
  await expect(page.locator("div[id='finish'] h4")).toHaveText("Hello World!");
});
