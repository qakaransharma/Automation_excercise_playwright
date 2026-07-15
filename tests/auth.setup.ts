import { test as setup, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { currentEnv } from "../src/config/environment/env";
import { logger } from "../src/utils/logger";

const authFile = "auth/user.json";
const generatedUserFile = "test-data/generatedUser.json";

setup("register and save storage state", async ({ page }) => {
  const uniqueEmail = `testuser_${Date.now()}@email.com`;
  const password = "SecurePassword123";
  const name = faker.person.fullName();
  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ") || faker.person.lastName();

  logger.info("Starting dynamic registration setup");

  await page.goto(`${currentEnv.baseUrl}/login`);
  logger.info("Navigated to login page");

  // Sign up with unique email
  await page.locator("input[data-qa='signup-name']").fill(name);
  await page.locator("input[data-qa='signup-email']").fill(uniqueEmail);
  await page.locator("button[data-qa='signup-button']").click();

  // Verify account info form
  await expect(page.getByText("Enter Account Information")).toBeVisible();

  // Fill account details
  await page.locator("#id_gender1").click();
  await page.locator("input[data-qa='password']").fill(password);
  await page.locator("select[data-qa='days']").selectOption("10");
  await page.locator("select[data-qa='months']").selectOption("5");
  await page.locator("select[data-qa='years']").selectOption("1995");
  await page.locator("#newsletter").check();
  await page.locator("#optin").check();

  // Fill address details
  const userData = JSON.parse(
    readFileSync(join(process.cwd(), "test-data/userData.json"), "utf8"),
  );
  await page.locator("input[data-qa='first_name']").fill(firstName);
  await page.locator("input[data-qa='last_name']").fill(lastName);
  await page.locator("input[data-qa='company']").fill(userData.address.company);
  await page.locator("input[data-qa='address']").fill(userData.address.address);
  await page.locator("select[data-qa='country']").selectOption(userData.address.country);
  await page.locator("input[data-qa='state']").fill(userData.address.state);
  await page.locator("input[data-qa='city']").fill(userData.address.city);
  await page.locator("input[data-qa='zipcode']").fill(userData.address.zipcode);
  await page.locator("input[data-qa='mobile_number']").fill(userData.address.mobileNumber);

  // Create account
  await page.locator("button[data-qa='create-account']").click();

  // Verify account created
  await expect(page.locator("h2[data-qa='account-created']")).toBeVisible();
  logger.info("Account created successfully");

  // Continue to home page
  await page.locator("a[data-qa='continue-button']").click();

  // Verify logged in
  await expect(page.getByText(`Logged in as ${name}`)).toBeVisible();
  logger.info("Login successful, saving storage state");

  await page.context().storageState({ path: authFile });
  logger.info(`Storage state saved to ${authFile}`);

  // Save generated credentials for other tests
  const generatedUser = {
    name,
    firstName,
    lastName,
    emailAddress: uniqueEmail,
    password,
  };

  mkdirSync(join(process.cwd(), "test-data"), { recursive: true });
  writeFileSync(
    join(process.cwd(), generatedUserFile),
    JSON.stringify(generatedUser, null, 2),
  );
  logger.info(`Generated user credentials saved to ${generatedUserFile}`);
});
