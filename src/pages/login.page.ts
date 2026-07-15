import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  readonly txtEmailAddress: Locator;
  readonly txtPassword: Locator;
  readonly btnLogin: Locator;

  constructor(page: Page) {
    super(page);
    const loginForm = page.locator("[class='login-form']");
    this.txtEmailAddress = loginForm.getByPlaceholder("Email Address");
    this.txtPassword = loginForm.getByPlaceholder("Password");
    this.btnLogin = loginForm.locator("[data-qa='login-button']");
  }

  async enterEmailAddress(emailAddress: string) {
    await this.txtEmailAddress.fill(emailAddress);
  }

  async enterPassword(password: string) {
    await this.txtPassword.fill(password);
  }

  async clickLogin() {
    await this.btnLogin.click();
  }

  async loginToApp(emailAddress: string, password: string) {
    await this.enterEmailAddress(emailAddress);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async isLoginButtonVisible(): Promise<boolean> {
    return this.btnLogin.isVisible();
  }
}
