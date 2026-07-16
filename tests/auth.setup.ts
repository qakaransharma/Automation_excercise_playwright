import { test as setup } from "@playwright/test";
import { mkdirSync } from "fs";
import { dirname } from "path";
import { currentEnv } from "../src/config/environment/env";
import { LoginPage } from "../src/pages/login.page";

const authFile = "auth/user.json";

setup("login and save storage state", async ({ page }) => {
  mkdirSync(dirname(authFile), { recursive: true });

  const loginPage = new LoginPage(page);

  await page.goto(`${currentEnv.baseUrl}/login`);

  await loginPage.loginToApp(currentEnv.emailAddress, currentEnv.password);

  await page.waitForURL((url) => !url.pathname.includes("/login"));

  await page.context().storageState({ path: authFile });
});
