import { Locator, Page } from "@playwright/test";
import { CommonUtils } from "../utils/commonUtils";

export class LoginPage {
  readonly page: Page;
  readonly txtEmailAddress: Locator;
  readonly txtPassword: Locator;
  readonly btnLogin: Locator;
  readonly divLoginForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.divLoginForm = page.locator("[class='login-form']");
    this.txtEmailAddress = this.divLoginForm.getByPlaceholder("Email Address");
    this.txtPassword = this.divLoginForm.getByPlaceholder("Password");
    this.btnLogin = this.divLoginForm.locator("[data-qa='login-button']");
  }

  async enterEmailAddress(emailAddress: string) {
    // await this.txtEmailAddress.fill(emailAddress);
    await CommonUtils.fill(this.txtEmailAddress, emailAddress);
  }

  async enterPassword(password: string) {
    // await this.txtPassword.fill(password);
    await CommonUtils.fill(this.txtPassword, password);
  }

  async clickLogin() {
    // await this.btnLogin.click();
    await CommonUtils.click(this.btnLogin);
  }

  async loginToApp(emailAddress: string, password: string) {
    await this.enterEmailAddress(emailAddress);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async isLoginButtonVisible(): Promise<boolean> {
    return await this.btnLogin.isVisible();
  }
}
