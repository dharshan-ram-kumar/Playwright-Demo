import { test, expect } from "@playwright/test";
import { tags } from "../../utils/tagData.json";
import { publicUI } from "../../config";

test.beforeEach(async ({ page }) => {
  await page.route("*/**/api/tags", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(tags),
    });
  });
  //   await page.route("*/**/api/articles*", async (route) => {
  //     const response = await route.fetch();
  //     const responseBody = await response.json();
  //     responseBody.articles[0].title = "This is test title";
  //     responseBody.articles[0].description = "This is test description";
  //     await route.fulfill({
  //       body: JSON.stringify(responseBody),
  //     });
  //   });

  await page.goto(publicUI);
  await page.waitForTimeout(2000);
});

test("Title check", async ({ page }) => {
  await expect(page).toHaveTitle(/Conduit/);
});
