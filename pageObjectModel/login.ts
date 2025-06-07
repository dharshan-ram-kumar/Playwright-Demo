import { Page, Locator, expect } from "@playwright/test";

export class Login {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private message: Locator;

  constructor(page: Page) {
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator("button", { hasText: "Login" });
    this.message = page.locator("div[role='alert']");
  }

  //   async fillUsername(username: string) {
  //     await this.usernameInput.fill(username);
  //   }

  //   async fillPassword(password: string) {
  //     await this.passwordInput.fill(password);
  //   }

  //   async clickLogin() {
  //     await this.loginButton.click();
  //   }

  async getMessage() {
    return await this.message.textContent();
  }
  async login(username: string, password: string) {
    // await this.fillUsername(username);
    // await this.fillPassword(password);
    // await this.clickLogin();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
