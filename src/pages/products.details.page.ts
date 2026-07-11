import { Locator, Page } from "@playwright/test";
import { CommonUtils } from "../utils/commonUtils";

export class ProductsDetailsPage {
  readonly page: Page;
  readonly productDetailsSection: Locator;
  readonly productName: Locator;
  readonly productCategory: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productDetailsSection = page.locator("[class='product-details']");
    this.productName = page.locator("div[class='product-information'] h2");
    this.productCategory = page.locator(
      "//div[@class='product-information']//p[contains(text(), 'Category:')]",
    );
  }

  async isProductsDetailsVisible(): Promise<boolean> {
    // return await this.productDetailsSection.isVisible();
    return await CommonUtils.isVisible(this.productDetailsSection);
  }

  async isProductNameVisible(): Promise<boolean> {
    // return await this.productName.isVisible();
    return await CommonUtils.isVisible(this.productName);
  }

  async isProductCategoryVisible(): Promise<boolean> {
    return await CommonUtils.isVisible(this.productCategory);
  }

  async getProductName(): Promise<string> {
    // return (await this.productName.textContent()) || "";
    return await CommonUtils.getText(this.productName);
  }

  async getProductDetails() {
    const productDetailsObj = {
      productName: await this.getProductName(),
      productCategory: await this.getProductName(),
    };

    return productDetailsObj;
  }
}
