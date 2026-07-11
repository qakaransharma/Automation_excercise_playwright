import { Locator, Page } from "@playwright/test";

export class NavbarPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // returning a locator
  navbarItem(itemName: string): Locator {
    return this.page.locator(`a:has-text("${itemName}")`);
  }

  async clickNavbarItem(itemName: string): Promise<void> {
    return await this.navbarItem(itemName).click();
  }

  async isNavbarVisible(itemName: string): Promise<boolean> {
    return await this.navbarItem(itemName).isVisible();
  }
}
