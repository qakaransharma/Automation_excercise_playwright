import { Locator, Page } from "@playwright/test";

export class CommonUtils {
  static async click(locator: Locator): Promise<void> {
    await locator.click(); // await page.locator.click()
  }

  static async clickWhenVisible(
    locator: Locator,
    timeout = 5000,
  ): Promise<void> {
    await locator.waitFor({ state: "visible", timeout });
    await locator.click();
  }

  static async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  static async fillWhenVisible(
    locator: Locator,
    value: string,
    timeout = 5000,
  ): Promise<void> {
    await locator.waitFor({ state: "visible", timeout });
    await locator.fill(value);
  }

  static async getText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() ?? "";
  }

  static async isVisible(locator: Locator, timeout?: number): Promise<boolean> {
    return await locator.isVisible({ timeout });
  }

  static async waitForElement(
    locator: Locator,
    state: "visible" | "hidden" | "attached" | "detached" = "visible",
    timeout = 5000,
  ): Promise<void> {
    await locator.waitFor({ state, timeout });
  }

  static async navigateTo(
    page: Page,
    url: string,
    timeout?: number,
  ): Promise<void> {
    await page.goto(url, { timeout });
  }

  static async getAttribute(
    locator: Locator,
    name: string,
  ): Promise<string | null> {
    return await locator.getAttribute(name);
  }

  static async hover(locator: Locator): Promise<void> {
    await locator.hover();
  }
}
