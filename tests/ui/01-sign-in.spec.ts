import { readFileSync } from "fs";
import { join } from "path";
import { test, expect } from "../../src/fixture/pagesFixture";
import { faker } from "@faker-js/faker";

const userData = JSON.parse(
  readFileSync(join(process.cwd(), "test-data/userData.json"), "utf8"),
);

test.describe("sign-up flow", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ signInPage }) => {
    await signInPage.navigateTo("/login");
  });

  test("verify user signup and registration flow", async ({
    signInPage,
  }) => {
    // Enter signup details with unique email
    const name = faker.person.fullName();
    const uniqueEmail = `testuser_${Date.now()}@email.com`;

    await signInPage.enterSignupDetails(name, uniqueEmail);
    await signInPage.clickSignup();

    // Verify account information form
    await expect(signInPage.lblAccountInfo).toBeVisible();

    // Fill account details
    await signInPage.fillAccountDetails(
      userData.signup.password,
      userData.signup.day,
      userData.signup.month,
      userData.signup.year,
    );

    // Fill address details
    await signInPage.fillAddressDetails(userData.address);

    // Create account
    await signInPage.clickCreateAccount();

    // Verify account created
    await expect(signInPage.lblAccountCreated).toBeVisible();
    await expect(signInPage.lblAccountCreated).toHaveText("Account Created!");

    // Continue to home page
    await signInPage.clickContinue();

    // Verify logged in
    await expect(signInPage.getLoggedInUserLocator(name)).toBeVisible();
  });

  test("verify entered name and email persist on account information screen", async ({
    signInPage,
  }) => {
    // Enter signup details
    const name = faker.person.fullName();
    const uniqueEmail = `testuser_${Date.now()}@email.com`;

    await signInPage.enterSignupDetails(name, uniqueEmail);
    await signInPage.clickSignup();

    // Verify account info form is visible
    await expect(signInPage.lblAccountInfo).toBeVisible();

    // Verify persisted values
    await expect(signInPage.txtPersistedName).toHaveValue(name);
    await expect(signInPage.txtPersistedEmail).toHaveValue(uniqueEmail);
  });
});
