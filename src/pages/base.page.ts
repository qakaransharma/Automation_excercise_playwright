import { Page, Locator } from "@playwright/test";
import { currentEnv } from "../config/environment/env";

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(`${currentEnv.baseUrl}${path}`);
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() ?? "";
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }
}
