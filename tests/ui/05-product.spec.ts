import { readFileSync } from "fs";
import { join } from "path";
import { test, expect } from "../../src/fixture/pagesFixture";

const productDetails = JSON.parse(
  readFileSync(
    join(process.cwd(), "test-data/productDetails.json"),
    "utf8",
  ),
) as { productName: string };

test.describe("Verify Products", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.navigateTo("/");
  });

  test("Verify All Products and product detail page", async ({
    productsPage,
    productsDetailsPage,
    navbarPage,
  }) => {
    // Verify home page is visible
    const homePageTitle = await productsPage.getPageTitle();
    expect(homePageTitle).toContain("Automation Exercise");

    // Navigate to Products page
    await navbarPage.clickNavbarItem("Products");
    expect(await productsPage.isAllProductsHeaderVisible()).toBeTruthy();
    expect(await productsPage.isProductsListVisible()).toBeTruthy();

    // View first product
    await productsPage.clickViewProductOfFirstProduct();

    // Verify product details
    expect(await productsDetailsPage.isProductsDetailsVisible()).toBeTruthy();
    expect(await productsDetailsPage.isProductNameVisible()).toBeTruthy();
    expect(
      await productsDetailsPage.isProductCategoryVisible(),
    ).toBeTruthy();

    // Verify product name matches expected
    const productDetailsObj = await productsDetailsPage.getProductDetails();
    expect(productDetailsObj.productName).toBe(productDetails.productName);
  });
});
