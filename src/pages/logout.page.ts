import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class LogoutPage extends BasePage {
  readonly lnkLogout: Locator;
  readonly lnkSignupLogin: Locator;

  constructor(page: Page) {
    super(page);
    this.lnkLogout = page.getByRole("link", { name: "Logout" });
    this.lnkSignupLogin = page.getByRole("link", { name: "Signup / Login" });
  }

  async logout() {
    await this.lnkLogout.click();
  }

  async isLogoutLinkVisible(): Promise<boolean> {
    return this.lnkLogout.isVisible();
  }

  async isSignupLoginLinkVisible(): Promise<boolean> {
    return this.lnkSignupLogin.isVisible();
  }
}
