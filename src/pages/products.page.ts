import { Locator, Page } from "@playwright/test";
import { CommonUtils } from "../utils/commonUtils";

export class ProductsPage {
  readonly page: Page;
  readonly allProductsHeader: Locator;
  readonly productsList: Locator;
  readonly viewProductButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allProductsHeader = page.locator("text=All Products");
    this.productsList = page.locator(".features_items");
    this.viewProductButtons = page.locator("a[href*='product_details']");
  }

  async isAllProductsHeaderVisible(): Promise<boolean> {
    // return await this.allProductsHeader.isVisible();
    return await CommonUtils.isVisible(this.allProductsHeader);
  }

  async isProductsListVisible(): Promise<boolean> {
    // return await this.productsList.isVisible();
    return await CommonUtils.isVisible(this.productsList);
  }

  async clickViewProductOfFirstProduct(): Promise<void> {
    // await this.viewProductButtons.first().click();
    await CommonUtils.click(this.viewProductButtons.first());
  }
}
