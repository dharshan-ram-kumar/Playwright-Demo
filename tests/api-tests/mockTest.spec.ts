import { test, expect } from "@playwright/test";
import { tags } from "../../utils/tagData.json";

test.beforeEach(async ({ page }) => {
  await page.route("*/**/api/tags", async (route) => {
    await route.fulfill({
      // status: 200,
      // contentType: "application/json",
      body: JSON.stringify(tags),
    });
  });
  await page.route("*/**/api/articles*", async (route) => {
    const response = await route.fetch();
    const responseBody = await response.json();
    responseBody.articles[0].title = "This is test title";
    responseBody.articles[0].description = "This is test description";
    await route.fulfill({
      body: JSON.stringify(responseBody),
    });
  });

  await page.goto("https://conduit.bondaracademy.com/");
});

test("Title check", async ({ page }) => {
  await expect(page).toHaveTitle(/Conduit/);
  await expect(page.locator("app-article-list h1").first()).toContainText(
    "This is test title"
  );
  await expect(page.locator("app-article-list p").first()).toContainText(
    "This is test description"
  );
});
