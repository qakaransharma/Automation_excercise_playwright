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
  test("Verify All Products and product detail page", async ({
    page,
    navbarPage,
    productsPage,
    productsDetailsPage,
  }) => {
    // Verify that home page is visible successfully
    const homePageTitle = await page.title();
    expect(homePageTitle).toContain("Automation Exercise");

    // Click on 'Products' button
    await navbarPage.clickNavbarItem("Products");
    expect(await productsPage.isAllProductsHeaderVisible()).toBeTruthy();
    expect(await productsPage.isProductsListVisible()).toBeTruthy();

    await productsPage.clickViewProductOfFirstProduct();

    // Verify Product details container is displayed
    expect(await productsDetailsPage.isProductsDetailsVisible()).toBeTruthy();

    // Verify Product name and Category labels are displayed
    expect(await productsDetailsPage.isProductNameVisible()).toBeTruthy();
    expect(await productsDetailsPage.isProductCategoryVisible()).toBeTruthy();

    const actualProductName = await productsDetailsPage.getProductName();

    console.log("productDetails.productName::", productDetails.productName);
    expect(actualProductName).toBe(productDetails.productName);

    const productDetailsObj = await productsDetailsPage.getProductDetails();

    expect(productDetailsObj.productName).toBe(productDetails.productName);
  });
});
