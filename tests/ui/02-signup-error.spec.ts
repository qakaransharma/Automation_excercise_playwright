import { test, expect } from "../../src/fixture/pagesFixture";
import { currentEnv } from "../../src/config/environment/env";
import { faker } from "@faker-js/faker";

test.describe("signUp error messages", () => {


  test("verify signup fails with already existing email and displays error message", async ({ page, navbarPage, signInPage }) => {

    // 1. Navigate to URL
    await page.goto("https://automationexercise.com/login");

    // 2. Click on Signup / Login button
    await navbarPage.clickNavbarItem("Signup / Login");

    // 3. Enter already registered name and email
    const name = currentEnv.testUserFirstName + " " + currentEnv.testUserLastName;
    const existingEmail = currentEnv.emailAddress;

    await signInPage.enterSignupDetails(name, existingEmail);

    // 4. Click Signup button
    await signInPage.clickSignup();

    // 5. Verify error message 'Email Address already exist!' is visible
    const errorMessage = await signInPage.getSignupErrorMessage();
    expect(errorMessage).toBe("Email Address already exist!");
    await expect(signInPage.lblSignupError).toBeVisible();

    //6. capture screenshot of page after error message apperas and 
    // save in screenshots folder with current date and time 
    await page.screenshot({ path: `screenshots/signup-error-${Date.now()}.png` });
  });

  test("verify signup fails and displays validation message when required field name is left blank", async ({ page, navbarPage, signInPage }) => {
    // 1. Navigate to URL
    await page.goto("https://automationexercise.com/login");

    // 2. Click on Signup / Login button
    await navbarPage.clickNavbarItem("Signup / Login");

    // 3. Enter only Email and leave Name blank
    const email = currentEnv.emailAddress;
    await signInPage.enterSignupDetails("", email);

    // 4. Click Signup button
    await signInPage.clickSignup();

    // 5. Verify validation message "Please fill out this field." is displayed for Name input
    const validationMessage = await signInPage.txtSignupName.evaluate((element: HTMLInputElement) => element.validationMessage);
    expect(validationMessage).toContain("fill out this field");
    await page.screenshot({ path: `screenshots/signup-error-${Date.now()}.png` });
  });

  test("verify signup fails and displays validation message when required field email is left blank", async ({ page, navbarPage, signInPage }) => {
    // 1. Navigate to URL
    await page.goto("https://automationexercise.com/login");

    // 2. Click on Signup / Login button
    await navbarPage.clickNavbarItem("Signup / Login");

    // 3. Enter only Email and leave Name blank
    const name = faker.person.fullName();
    await signInPage.enterSignupDetails("", name);

    // 4. Click Signup button
    await signInPage.clickSignup();

    // 5. Verify validation message "Please fill out this field." is displayed for Name input
    const validationMessage = await signInPage.txtSignupName.evaluate((element: HTMLInputElement) => element.validationMessage);
    expect(validationMessage).toContain("fill out this field");
    await page.screenshot({ path: `screenshots/signup-error-${Date.now()}.png` });

  });
});

