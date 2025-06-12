import { test, expect } from "@playwright/test";
import { APIClient } from "../apiTests/api-client";

let apiClient: APIClient;

test.describe("API  Tests", () => {
  test.beforeAll(async () => {
    apiClient = await APIClient.create();
  });

  test.afterAll(async () => {
    await apiClient.dispose();
  });

  //   test("GET articles", async () => {
  //     const res = await apiClient.get(`${publicAPI}/articles`);
  //     expect(res.status()).toBe(200);
  //     const data = await res.json();
  //     expect(data.articles.length).toBeGreaterThan(0);
  //   });

  test("POST user login", async () => {
    const res = await apiClient.post(
      "http://192.168.1.47:8082/orangehrm-5.7/orangehrm-5.7/web/index.php/auth/validate",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          _token:
            "36d87bbee692deb6bd30.03GGBq5xVqP5dndp6bValKZZR8NRt6mZcU3iEp6VGEQ.tzvIb9pJLu66Dz0ktu8i1vkGN6Qh5933MHylf_q4SgqyN9Fg4gRnxqwyJg",
          username: "princep",
          password: "Welcome@ta2025",
        }).toString(),
      }
    );
    expect(res.status()).toBeGreaterThanOrEqual(200);
    const html = await res.text();
    expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
  });
});
