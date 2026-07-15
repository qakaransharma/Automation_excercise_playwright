import { test, expect } from "../../src/fixture/generatedUserFixture";
import { faker } from "@faker-js/faker";

test.describe("signUp error messages", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ signInPage }) => {
    await signInPage.navigateTo("/login");
  });

  test("verify signup fails with already existing email and displays error message", async ({
    signInPage,
    generatedUser,
  }) => {
    // Use the dynamically registered email (already exists)
    const name = `${generatedUser.firstName} ${generatedUser.lastName}`;
    await signInPage.enterSignupDetails(name, generatedUser.emailAddress);
    await signInPage.clickSignup();

    // Verify error message
    const errorMessage = await signInPage.getSignupErrorMessage();
    expect(errorMessage).toBe("Email Address already exist!");
    await expect(signInPage.lblSignupError).toBeVisible();
  });

  test("verify signup fails when required field name is left blank", async ({
    signInPage,
    generatedUser,
  }) => {
    // Leave name blank, enter email
    await signInPage.enterSignupDetails("", generatedUser.emailAddress);
    await signInPage.clickSignup();

    // Verify browser validation message
    const validationMessage =
      await signInPage.getSignupNameValidationMessage();
    expect(validationMessage).toContain("fill out this field");
  });

  test("verify signup fails when required field email is left blank", async ({
    signInPage,
  }) => {
    // Enter name, leave email blank
    const name = faker.person.fullName();
    await signInPage.enterSignupDetails(name, "");
    await signInPage.clickSignup();

    // Verify browser validation message
    const validationMessage =
      await signInPage.getSignupEmailValidationMessage();
    expect(validationMessage).toContain("fill out this field");
  });
});
