import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProductsDetailsPage extends BasePage {
  readonly productDetailsSection: Locator;
  readonly productName: Locator;
  readonly productCategory: Locator;

  constructor(page: Page) {
    super(page);
    this.productDetailsSection = page.locator(".product-details");
    this.productName = page.locator("div[class='product-information'] h2");
    this.productCategory = page.locator(
      "//div[@class='product-information']//p[contains(text(), 'Category:')]",
    );
  }

  async isProductsDetailsVisible(): Promise<boolean> {
    return this.productDetailsSection.isVisible();
  }

  async isProductNameVisible(): Promise<boolean> {
    return this.productName.isVisible();
  }

  async isProductCategoryVisible(): Promise<boolean> {
    return this.productCategory.isVisible();
  }

  async getProductName(): Promise<string> {
    return (await this.productName.textContent())?.trim() ?? "";
  }

  async getProductCategory(): Promise<string> {
    return (await this.productCategory.textContent())?.trim() ?? "";
  }

  async getProductDetails() {
    return {
      productName: await this.getProductName(),
      productCategory: await this.getProductCategory(),
    };
  }
}
