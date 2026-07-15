import { test, expect } from "../../src/fixture/generatedUserFixture";

test.describe("login flow", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateTo("/login");
  });

  test("verify login with valid credentials", async ({
    loginPage,
    navbarPage,
    generatedUser,
  }) => {
    await loginPage.loginToApp(generatedUser.emailAddress, generatedUser.password);

    const isLogoutButtonVisible = await navbarPage.isNavbarVisible("Logout");
    expect(isLogoutButtonVisible).toBeTruthy();
  });
});
