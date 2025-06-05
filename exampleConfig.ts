import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  timeout: 3000,
  retries: 1,
  testDir: "./tests",
  use: {
    baseURL: "http://192.168.1.47:8082/orangehrm-5.7/orangehrm-5.7",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],
  grep: /@focus/, // This runs only smoke-tagged tests if `--grep` is used
  reporter: [["html", { outputFolder: "html-report", open: "never" }]],
});

// npx playwright test --grep "@focus"
// npx playwright test --grep-invert "@focus"
