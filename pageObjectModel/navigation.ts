import { Page } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async dashboard() {
    await this.page.getByRole("link", { name: "Form Layouts" }).click();
  }
}
