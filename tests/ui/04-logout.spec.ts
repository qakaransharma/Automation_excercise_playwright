import { test, expect } from "../../src/fixture/pagesFixture";
import { currentEnv } from "../../src/config/environment/env";

test("verify user logout after login in application", async ({
  page,
  logoutPage,
}) => {
  await logoutPage.navigateTo("/");
  await expect(logoutPage.lnkLogout).toBeVisible();

  // Perform logout
  await logoutPage.logout();

  // Verify user is logged out
  await expect(logoutPage.lnkSignupLogin).toBeVisible();
  expect(page).toHaveURL(`${currentEnv.baseUrl}/login`);
});
