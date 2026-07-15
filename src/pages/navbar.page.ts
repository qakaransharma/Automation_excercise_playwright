import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class NavbarPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  navbarItem(itemName: string): Locator {
    return this.page.getByRole("link", { name: itemName });
  }

  async clickNavbarItem(itemName: string): Promise<void> {
    await this.navbarItem(itemName).click();
  }

  async isNavbarVisible(itemName: string): Promise<boolean> {
    return this.navbarItem(itemName).isVisible();
  }
}
