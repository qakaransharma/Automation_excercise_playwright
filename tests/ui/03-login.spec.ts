import { test, expect } from "../../src/fixture/pagesFixture";
import { currentEnv } from "../../src/config/environment/env";

test("verify login with valid credentials", async ({
  loginPage,
  navbarPage,
}) => {

  // 1. Click on Login button 
  await navbarPage.clickNavbarItem("Login");

  // 2. Perform Login using page object
  await loginPage.loginToApp(currentEnv.emailAddress, currentEnv.password);

  // 3. Verify user is successfully logged in (Logout link becomes visible)
  const isLogoutButtonVisible = await navbarPage.isNavbarVisible("Logout");

  expect(isLogoutButtonVisible).toBeTruthy();
});


