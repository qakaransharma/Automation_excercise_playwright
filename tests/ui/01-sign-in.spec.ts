import { currentEnv } from "../../src/config/environment/env";
import { test, expect } from "../../src/fixture/pagesFixture";
import { faker } from "@faker-js/faker";

test("verify user signup and registration flow", async ({ page, navbarPage }) => {

  // 1. Navigate to URL
  await page.goto("https://automationexercise.com/login");

  // 2. Click on Signup / Login button
  await navbarPage.clickNavbarItem("Signup / Login");

  // use of random data for user signup used 2 different ways 
  // 1. Generate unique email to avoid "Email Address already exist" error
  const uniqueEmail = `testuser_${Date.now()}@email.com`;
  // used faker class to generate random strings
  const name = faker.person.fullName();


  // 3. Enter data in name and email for signup
  await page.locator("input[data-qa='signup-name']").fill(name);
  await page.locator("input[data-qa='signup-email']").fill(uniqueEmail);

  // 4. Click Signup button
  await page.locator("button[data-qa='signup-button']").click();

  // 5. Fill out the account details to fully sign up
  await expect(page.locator("text=Enter Account Information")).toBeVisible();

  // Select title
  await page.locator("#id_gender1").click(); // Mr.

  // Password
  await page.locator("input[data-qa='password']").fill("SecurePassword123");

  // Date of Birth
  await page.locator("select[data-qa='days']").selectOption("10");
  await page.locator("select[data-qa='months']").selectOption("5"); // May
  await page.locator("select[data-qa='years']").selectOption("1995");

  // Newsletter & Offers checkboxes (optional but good to interact)
  await page.locator("#newsletter").check();
  await page.locator("#optin").check();

  // Address Information
  await page.locator("input[data-qa='first_name']").fill("Test");
  await page.locator("input[data-qa='last_name']").fill("User");
  await page.locator("input[data-qa='company']").fill("Test Company");
  await page.locator("input[data-qa='address']").fill("123 Test Street");
  await page.locator("select[data-qa='country']").selectOption("United States");
  await page.locator("input[data-qa='state']").fill("California");
  await page.locator("input[data-qa='city']").fill("Los Angeles");
  await page.locator("input[data-qa='zipcode']").fill("90001");
  await page.locator("input[data-qa='mobile_number']").fill("1234567890");

  // Click 'Create Account' button
  await page.locator("button[data-qa='create-account']").click();

  // 6. Assert/Verify user is signed up in applications
  await expect(page.locator("h2[data-qa='account-created']")).toBeVisible();
  await expect(page.locator("text=Account Created!")).toBeVisible();

  // Click Continue
  await page.locator("a[data-qa='continue-button']").click();

  // Verify that message :- "Logged in as <ign in username>" is visible in navbar
  const loggedInText = page.locator(`text=Logged in as ${name}`);
  await expect(loggedInText).toBeVisible();
});

test("verify entered name and email persist on account information screen", async ({ page, navbarPage }) => {

  // Navigate to login page
  await page.goto("https://automationexercise.com/login");

  // Click on Signup / Login button
  await navbarPage.clickNavbarItem("Signup / Login");

  // Generate name and email
  const name = faker.person.fullName();
  const uniqueEmail2 = `testuser_${Date.now()}@email.com`;

  // Fill in name and email
  await page.locator("input[data-qa='signup-name']").fill(name);
  await page.locator("input[data-qa='signup-email']").fill(uniqueEmail2);

  // Submit signup
  await page.locator("button[data-qa='signup-button']").click();
  await expect(page.locator("text=Enter Account Information")).toBeVisible();

  await expect(page.locator("input[data-qa='name']")).toHaveValue(name);
  await expect(page.locator("input[data-qa='email']")).toHaveValue(uniqueEmail2);
});
