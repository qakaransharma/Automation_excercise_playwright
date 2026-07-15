import { test, expect } from "../../src/fixture/pagesFixture";
import { currentEnv } from "../../src/config/environment/env";

test("verify user logout after login in application", async ({
  page,
  logoutPage,
}) => {
  await logoutPage.navigateTo("/");
  expect(await logoutPage.isLogoutLinkVisible()).toBeTruthy();

  // Perform logout
  await logoutPage.logout();

  // Verify user is logged out
  expect(await logoutPage.isSignupLoginLinkVisible()).toBeTruthy();
  expect(page).toHaveURL(`${currentEnv.baseUrl}/login`);
});
