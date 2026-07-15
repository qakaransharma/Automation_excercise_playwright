import { test, expect } from "../../src/fixture/pagesFixture";
import { currentEnv } from "../../src/config/environment/env";

test.describe("login flow", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("verify login with valid credentials", async ({
    page,
    loginPage,
    navbarPage,
  }) => {
    await page.goto(`${currentEnv.baseUrl}/login`);

    await loginPage.loginToApp(currentEnv.emailAddress, currentEnv.password);

    const isLogoutButtonVisible = await navbarPage.isNavbarVisible("Logout");
    expect(isLogoutButtonVisible).toBeTruthy();
  });
});
