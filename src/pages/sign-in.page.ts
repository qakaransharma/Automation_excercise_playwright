import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class SignInPage extends BasePage {
  // Signup form
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

  // Persisted name/email fields on account info screen
  readonly txtPersistedName: Locator;
  readonly txtPersistedEmail: Locator;

  constructor(page: Page) {
    super(page);

    // Signup form
    this.txtSignupName = page.locator("input[data-qa='signup-name']");
    this.txtSignupEmail = page.locator("input[data-qa='signup-email']");
    this.btnSignup = page.locator("button[data-qa='signup-button']");
    this.lblSignupError = page.locator(".signup-form p");

    // Account details form
    this.lblAccountInfo = page.getByText("Enter Account Information");
    this.rdoGenderMale = page.locator("#id_gender1");
    this.txtPassword = page.locator("input[data-qa='password']");
    this.selDays = page.locator("select[data-qa='days']");
    this.selMonths = page.locator("select[data-qa='months']");
    this.selYears = page.locator("select[data-qa='years']");
    this.chkNewsletter = page.locator("#newsletter");
    this.chkOptin = page.locator("#optin");

    // Address details form
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

    // Success screen
    this.lblAccountCreated = page.locator("h2[data-qa='account-created']");
    this.btnContinue = page.locator("a[data-qa='continue-button']");

    // Persisted fields
    this.txtPersistedName = page.locator("input[data-qa='name']");
    this.txtPersistedEmail = page.locator("input[data-qa='email']");
  }

  async enterSignupDetails(name: string, email: string) {
    await this.txtSignupName.fill(name);
    await this.txtSignupEmail.fill(email);
  }

  async clickSignup() {
    await this.btnSignup.click();
  }

  async getSignupErrorMessage(): Promise<string> {
    return (await this.lblSignupError.textContent())?.trim() ?? "";
  }

  async getSignupNameValidationMessage(): Promise<string> {
    return this.txtSignupName.evaluate(
      (element: HTMLInputElement) => element.validationMessage,
    );
  }

  async getSignupEmailValidationMessage(): Promise<string> {
    return this.txtSignupEmail.evaluate(
      (element: HTMLInputElement) => element.validationMessage,
    );
  }

  async isAccountInfoFormVisible(): Promise<boolean> {
    return this.lblAccountInfo.isVisible();
  }

  async fillAccountDetails(
    password: string,
    day: string,
    month: string,
    year: string,
  ) {
    await this.rdoGenderMale.click();
    await this.txtPassword.fill(password);
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
    await this.txtFirstName.fill(details.firstName);
    await this.txtLastName.fill(details.lastName);
    await this.txtCompany.fill(details.company);
    await this.txtAddress.fill(details.address);
    await this.selCountry.selectOption(details.country);
    await this.txtState.fill(details.state);
    await this.txtCity.fill(details.city);
    await this.txtZipcode.fill(details.zipcode);
    await this.txtMobileNumber.fill(details.mobileNumber);
  }

  async clickCreateAccount() {
    await this.btnCreateAccount.click();
  }

  async isAccountCreatedVisible(): Promise<boolean> {
    return this.lblAccountCreated.isVisible();
  }

  async clickContinue() {
    await this.btnContinue.click();
  }

  getLoggedInUserLocator(name: string): Locator {
    return this.page.getByText(`Logged in as ${name}`);
  }
}
