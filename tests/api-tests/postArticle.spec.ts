import { test, expect } from "@playwright/test";
import { publicAPI, publicUI } from "../../config";
import { article, credentials } from "../../utils/apiData";

test.beforeEach(async ({ page }) => {
  await page.goto(publicUI);
  await page.getByText("Sign in").click();
  await page.getByPlaceholder("Email").fill(credentials.email);
  await page.getByPlaceholder("Password").fill(credentials.password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveTitle(/Conduit/);
});

test("Create an article", async ({ request }) => {
  const res = await request.post(`${publicAPI}/users/login`, {
    data: {
      user: {
        email: credentials.email,
        password: credentials.password,
      },
    },
  });
  const responseBody = await res.json();
  const accessToken = responseBody.user.token;
  const articleResponse = await request.post(`${publicAPI}/articles/`, {
    data: { article },
    headers: {
      Authorization: `Token ${accessToken}`,
    },
  });
  expect(articleResponse.status()).toEqual(201);
});
test("Delete", async ({ page }) => {
  await page.getByText("Global Feed").click();
  await page.getByText(article.title).click();
  await page
    .locator(
      'div[class="container"] button[class="btn btn-sm btn-outline-danger"]'
    )
    .click();
});
