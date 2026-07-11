import { Locator, Page } from "@playwright/test";
import { CommonUtils } from "../utils/commonUtils";

export class SignInPage {
  readonly page: Page;
  readonly txtSignupName: Locator;
  readonly txtSignupEmail: Locator;
  readonly btnSignup: Locator;
  readonly lblSignupError: Locator;

  // Account details form
  readonly lblAccountInfo: Locator;
  readonly rdoGenderMale: Locator;
  readonly txtPassword: Locator;
  readonly selDays: Locator;
  readonly selMonths: Locator;
  readonly selYears: Locator;
  readonly chkNewsletter: Locator;
  readonly chkOptin: Locator;

  // Address details form
  readonly txtFirstName: Locator;
  readonly txtLastName: Locator;
  readonly txtCompany: Locator;
  readonly txtAddress: Locator;
  readonly selCountry: Locator;
  readonly txtState: Locator;
  readonly txtCity: Locator;
  readonly txtZipcode: Locator;
  readonly txtMobileNumber: Locator;
  readonly btnCreateAccount: Locator;

  // Success screen
  readonly lblAccountCreated: Locator;
  readonly btnContinue: Locator;


  constructor(page: Page) {
    this.page = page;

    // Signup form locators
    this.txtSignupName = page.locator("input[data-qa='signup-name']");
    this.txtSignupEmail = page.locator("input[data-qa='signup-email']");
    this.btnSignup = page.locator("button[data-qa='signup-button']");
    this.lblSignupError = page.locator(".signup-form p");

    // Account details form locators
    this.lblAccountInfo = page.locator("text=Enter Account Information");
    this.rdoGenderMale = page.locator("#id_gender1");
    this.txtPassword = page.locator("input[data-qa='password']");
    this.selDays = page.locator("select[data-qa='days']");
    this.selMonths = page.locator("select[data-qa='months']");
    this.selYears = page.locator("select[data-qa='years']");
    this.chkNewsletter = page.locator("#newsletter");
    this.chkOptin = page.locator("#optin");

    // Address details form locators
    this.txtFirstName = page.locator("input[data-qa='first_name']");
    this.txtLastName = page.locator("input[data-qa='last_name']");
    this.txtCompany = page.locator("input[data-qa='company']");
    this.txtAddress = page.locator("input[data-qa='address']");
    this.selCountry = page.locator("select[data-qa='country']");
    this.txtState = page.locator("input[data-qa='state']");
    this.txtCity = page.locator("input[data-qa='city']");
    this.txtZipcode = page.locator("input[data-qa='zipcode']");
    this.txtMobileNumber = page.locator("input[data-qa='mobile_number']");
    this.btnCreateAccount = page.locator("button[data-qa='create-account']");

    // Success screen locators
    this.lblAccountCreated = page.locator("h2[data-qa='account-created']");
    this.btnContinue = page.locator("a[data-qa='continue-button']");
  }

  async enterSignupDetails(name: string, email: string) {
    await CommonUtils.fill(this.txtSignupName, name);
    await CommonUtils.fill(this.txtSignupEmail, email);
  }

  async clickSignup() {
    await CommonUtils.click(this.btnSignup);
  }

  async getSignupErrorMessage(): Promise<string> {
    return await CommonUtils.getText(this.lblSignupError);
  }

  async getSignupName(): Promise<string> {
    const value = await CommonUtils.getAttribute(this.txtSignupName, "value");
    return value ?? "";
  }

  async getSignupEmail(): Promise<string> {
    const value = await CommonUtils.getAttribute(this.txtSignupEmail, "value");
    return value ?? "";
  }

  async isAccountInfoFormVisible(): Promise<boolean> {
    return await CommonUtils.isVisible(this.lblAccountInfo);
  }

  async fillAccountDetails(password: string, day: string, month: string, year: string) {
    await CommonUtils.click(this.rdoGenderMale);
    await CommonUtils.fill(this.txtPassword, password);
    await this.selDays.selectOption(day);
    await this.selMonths.selectOption(month);
    await this.selYears.selectOption(year);
    await this.chkNewsletter.check();
    await this.chkOptin.check();
  }

  async fillAddressDetails(details: {
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }) {
    await CommonUtils.fill(this.txtFirstName, details.firstName);
    await CommonUtils.fill(this.txtLastName, details.lastName);
    await CommonUtils.fill(this.txtCompany, details.company);
    await CommonUtils.fill(this.txtAddress, details.address);
    await this.selCountry.selectOption(details.country);
    await CommonUtils.fill(this.txtState, details.state);
    await CommonUtils.fill(this.txtCity, details.city);
    await CommonUtils.fill(this.txtZipcode, details.zipcode);
    await CommonUtils.fill(this.txtMobileNumber, details.mobileNumber);
  }

  async clickCreateAccount() {
    await CommonUtils.click(this.btnCreateAccount);
  }

  async isAccountCreatedVisible(): Promise<boolean> {
    return await CommonUtils.isVisible(this.lblAccountCreated);
  }

  async clickContinue() {
    await CommonUtils.click(this.btnContinue);
  }

  getLoggedInUserLocator(name: string): Locator {
    return this.page.locator(`text=Logged in as ${name}`);
  }
}
