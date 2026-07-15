import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProductsPage extends BasePage {
  readonly allProductsHeader: Locator;
  readonly productsList: Locator;
  readonly viewProductButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.allProductsHeader = page.getByText("All Products");
    this.productsList = page.locator(".features_items");
    this.viewProductButtons = page.locator("a[href*='product_details']");
  }

  async isAllProductsHeaderVisible(): Promise<boolean> {
    return this.allProductsHeader.isVisible();
  }

  async isProductsListVisible(): Promise<boolean> {
    return this.productsList.isVisible();
  }

  async clickViewProductOfFirstProduct(): Promise<void> {
    await this.viewProductButtons.first().click();
  }
}
