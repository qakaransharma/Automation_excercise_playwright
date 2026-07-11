import { Locator, Page } from "@playwright/test";
import { CommonUtils } from "../utils/commonUtils";

export class LogoutPage {
  readonly page: Page;
  readonly txtEmailAddress: Locator;
  readonly txtPassword: Locator;
  readonly btnLogin: Locator;
  readonly lnkLogout: Locator;
  readonly lnkSignupLogin: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Using Playwright's predefined locators (getByPlaceholder, getByRole)
    this.txtEmailAddress = page.getByPlaceholder("Email Address").first(); // target the login form email
    this.txtPassword = page.getByPlaceholder("Password").first();
    this.btnLogin = page.getByRole("button", { name: "Login" });
    this.lnkLogout = page.getByRole("link", { name: "Logout" });
    this.lnkSignupLogin = page.getByRole("link", { name: "Signup / Login" });
  }

  async login(emailAddress: string, password: string) {
    await CommonUtils.fill(this.txtEmailAddress, emailAddress);
    await CommonUtils.fill(this.txtPassword, password);
    await CommonUtils.click(this.btnLogin);
  }

  async logout() {
    await CommonUtils.click(this.lnkLogout);
  }

  async isLogoutLinkVisible(): Promise<boolean> {
    return await CommonUtils.isVisible(this.lnkLogout);
  }

  async isSignupLoginLinkVisible(): Promise<boolean> {
    return await CommonUtils.isVisible(this.lnkSignupLogin);
  }
}
