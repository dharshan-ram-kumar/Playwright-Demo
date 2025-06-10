import { test, expect } from "@playwright/test";
import { APIClient } from "../apiTests/api-client";
import { credentials } from "../../utils/apiData";
import { publicAPI } from "../../config";

let apiClient: APIClient;

test.describe.parallel("API Tests", () => {
  test.beforeAll(async () => {
    apiClient = await APIClient.create();
  });

  test.afterAll(async () => {
    await apiClient.dispose();
  });

  test("GET articles", async () => {
    const res = await apiClient.get(`${publicAPI}/articles`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.articles.length).toBeGreaterThan(0);
  });

  test("POST user login", async () => {
    const res = await apiClient.post(`${publicAPI}/users/login`, {
      data: {
        user: {
          email: credentials.email,
          password: credentials.password,
        },
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.user.token).toBeTruthy();
  });
});
