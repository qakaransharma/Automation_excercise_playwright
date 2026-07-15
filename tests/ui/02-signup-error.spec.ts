import { test, expect } from "../../src/fixture/pagesFixture";
import { currentEnv } from "../../src/config/environment/env";
import { faker } from "@faker-js/faker";

test.describe("signUp error messages", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("verify signup fails with already existing email and displays error message", async ({
    page,
    navbarPage,
    signInPage,
  }) => {
    await page.goto(`${currentEnv.baseUrl}/login`);
    await navbarPage.clickNavbarItem("Signup / Login");

    const name = `${currentEnv.testUserFirstName} ${currentEnv.testUserLastName}`;
    await signInPage.enterSignupDetails(name, currentEnv.emailAddress);
    await signInPage.clickSignup();

    const errorMessage = await signInPage.getSignupErrorMessage();
    expect(errorMessage).toBe("Email Address already exist!");
    await expect(signInPage.lblSignupError).toBeVisible();
  });

  test("verify signup fails when required field name is left blank", async ({
    page,
    navbarPage,
    signInPage,
  }) => {
    await page.goto(`${currentEnv.baseUrl}/login`);
    await navbarPage.clickNavbarItem("Signup / Login");

    await signInPage.enterSignupDetails("", currentEnv.emailAddress);
    await signInPage.clickSignup();

    const validationMessage =
      await signInPage.getSignupNameValidationMessage();
    expect(validationMessage).toContain("fill out this field");
  });

  test("verify signup fails when required field email is left blank", async ({
    page,
    navbarPage,
    signInPage,
  }) => {
    await page.goto(`${currentEnv.baseUrl}/login`);
    await navbarPage.clickNavbarItem("Signup / Login");

    const name = faker.person.fullName();
    await signInPage.enterSignupDetails(name, "");
    await signInPage.clickSignup();

    const validationMessage =
      await signInPage.getSignupEmailValidationMessage();
    expect(validationMessage).toContain("fill out this field");
  });
});
