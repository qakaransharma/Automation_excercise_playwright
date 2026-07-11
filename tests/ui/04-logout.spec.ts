import { test, expect } from "../../src/fixture/pagesFixture";
import { currentEnv } from "../../src/config/environment/env";

test("verify user logout after login in application", async ({ page, logoutPage, navbarPage }) => {
  // 1. Click on Signup / Login button 
  await navbarPage.clickNavbarItem("Signup / Login");

  // 2. Perform Login using page object
  await logoutPage.login(currentEnv.emailAddress, currentEnv.password);

  // 3. Verify user is successfully logged in (Logout link becomes visible)
  expect(await logoutPage.isLogoutLinkVisible()).toBeTruthy();

  // 4. Perform Logout using page object
  await logoutPage.logout();

  // 5. Verify user is logged out (Signup / Login link is visible again)
  expect(await logoutPage.isSignupLoginLinkVisible()).toBeTruthy();
  expect(page).toHaveURL("https://automationexercise.com/login");
});
