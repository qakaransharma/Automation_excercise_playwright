import { test as base } from "../fixture/baseFixture";
import { faker } from '@faker-js/faker';
import {
  LoginPage,
  NavbarPage,
  ProductsDetailsPage,
  ProductsPage,
  SignInPage,
  LogoutPage,
  // No UserData export from pages; we'll define the type locally.
} from "../pages/index";

type UserData = {
  name: string;
  email: string;
};

type MyFixtures = {
  loginPage: LoginPage;
  navbarPage: NavbarPage;
  productsPage: ProductsPage;
  productsDetailsPage: ProductsDetailsPage;
  signInPage: SignInPage;
  logoutPage: LogoutPage; 
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  navbarPage: async ({ page }, use) => {
    await use(new NavbarPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  productsDetailsPage: async ({ page }, use) => {
    await use(new ProductsDetailsPage(page));
  },

  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },

  logoutPage: async ({ page }, use) => {
    await use(new LogoutPage(page));
  },
});

export const expect = test.expect;
