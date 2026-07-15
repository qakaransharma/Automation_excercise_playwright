# Automation Exercise – Playwright Framework

End-to-end UI and API automation framework for [Automation Exercise](https://automationexercise.com/) built with **Playwright**, **TypeScript**, and the **Page Object Model (POM)** pattern.

The framework separates **test logic** (`tests/`) from **reusable application code** (`src/`) so tests stay readable, maintainable, and easy to scale.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Browser automation and test runner |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe test and framework code |
| [Faker](https://fakerjs.dev/) | Generate random test data (names, emails, etc.) |
| [Allure](https://allurereport.org/) | Rich HTML test reporting |
| [cross-env](https://www.npmjs.com/package/cross-env) | Run tests against different environments (QA / Stage) |
| [dotenv](https://www.npmjs.com/package/dotenv) | Load environment variables from `.env` file |
| [Prettier](https://prettier.io/) | Code formatting and style enforcement |
| [Winston](https://www.npmjs.com/package/winston) | Structured logging with console and file transports |

---

## Prerequisites

Before you begin, make sure you have:

- **Node.js** v18 or later ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** (to clone the repository)

> **Allure reports (optional):** To open Allure reports locally, install [Allure Commandline](https://allurereport.org/docs/install/) and ensure `allure` is available on your system PATH.

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/qakaransharma/Automation_excercise_playwright.git
cd Automation_excercise_playwright
```

### 2. Install npm dependencies

```bash
npm install
```

This installs Playwright, TypeScript types, Faker, Allure reporters, and other packages defined in `package.json`.

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your environment-specific values (QA credentials, Stage credentials, base URL). See `.env.example` for all available variables.

### 4. Install Playwright browsers

```bash
npx playwright install
```

On Linux/CI environments, install system dependencies as well:

```bash
npx playwright install --with-deps
```

### 5. Verify setup

```bash
npm test
```

---

## Framework Structure

```
Automation_excercise_playwright/
├── .github/workflows/       # CI pipeline (GitHub Actions)
├── src/                     # Framework code (reusable across all tests)
│   ├── config/
│   │   ├── constants/       # Framework & reporter settings
│   │   └── environment/     # QA / Stage environment configs
│   ├── fixture/             # Playwright custom fixtures (hooks + logging)
│   ├── pages/               # Page Object Model classes (BasePage + page objects)
│   └── utils/               # Shared utilities (logger)
├── tests/
│   ├── auth.setup.ts        # Storage state setup (login once, reuse session)
│   ├── ui/                  # UI test specifications
│   └── api/                 # API test specifications
├── auth/                    # Saved browser sessions (git-ignored)
├── logs/                    # Test execution logs (git-ignored)
├── reports/                 # Test reports - HTML + Allure (git-ignored)
├── test-data/               # External test data (JSON files)
├── Dockerfile               # Docker image definition
├── docker-compose.yml       # Docker service configuration
├── .dockerignore            # Docker build exclusions
├── .env.example             # Environment variables template
├── .prettierrc              # Prettier code formatting config
├── playwright.config.ts     # Playwright global configuration
├── tsconfig.json            # TypeScript compiler options
└── package.json             # Dependencies and npm scripts
```

---

## Why We Use `src/` – Framework Layer

The `src/` folder contains everything that **supports** the tests. Tests should not contain locators, login logic, or environment details — those live here.

### `src/config/environment/`

Manages **multi-environment** support. Switch between QA and Stage using the `ENV` variable. Credentials are loaded from `.env` via `dotenv` — never hardcoded in source files.

| File | Purpose |
|------|---------|
| `qa.ts` | QA environment URL, credentials, and user details |
| `stage.ts` | Stage environment URL, credentials, and user details |
| `index.ts` | Exports all environment configs |
| `env.ts` | Reads `process.env.ENV` and returns the active config as `currentEnv` |

**Why?** Keeps credentials and URLs out of test files. Change environment in one place without editing every test.

### `src/config/constants/`

Central place for framework behaviour settings.

| File | Purpose |
|------|---------|
| `frameworkConstants.ts` | Retries, workers, headless mode, slow-mo, screenshot/video/trace settings |
| `reportConstants.ts` | Reporter configuration (HTML + Allure) |

**Why?** One file to control how tests run (parallel or serial, headed or headless, reporting) instead of scattering settings across tests.

### `src/fixture/`

Playwright **custom fixtures** that inject ready-to-use objects into every test.

| File | Purpose |
|------|---------|
| `baseFixture.ts` | Extends Playwright `test` to provide a base fixture with logging hooks (test start/end, duration, pass/fail) |
| `pagesFixture.ts` | Injects all Page Object instances (`loginPage`, `navbarPage`, `productsPage`, etc.) into tests |

**Why?** Tests receive pre-built page objects automatically — no `new LoginPage(page)` in every test file. Reduces boilerplate and keeps setup consistent.

### `src/pages/`

**Page Object Model (POM)** classes. Each class represents one page or UI section.

| File | Purpose |
|------|---------|
| `base.page.ts` | Base class for all page objects — provides `navigateTo()`, `getPageTitle()`, `waitForPageLoad()`, `getText()`, `isVisible()`, `click()`, `fill()` |
| `login.page.ts` | Login form actions (enter email, password, submit) |
| `sign-in.page.ts` | Signup / registration form actions |
| `navbar.page.ts` | Top navigation bar (click menu items, check visibility) |
| `products.page.ts` | All Products listing page |
| `products.details.page.ts` | Individual product detail page |
| `logout.page.ts` | Login and logout flow |
| `index.ts` | Barrel export — import all pages from one place |

**Why?** If a locator or UI flow changes, update **one page class** instead of every test that uses it.

### `src/utils/`

| File | Purpose |
|------|---------|
| `logger.ts` | Winston logger with console + file transports (logs to `logs/test.log` and `logs/error.log`) |

**Why?** Structured logging helps debug failures, track test execution, and maintain audit trails.

---

## Why We Use `tests/` – Test Layer

The `tests/` folder contains **only test scenarios** — what to verify, in what order, and what to assert. Tests import framework code from `src/`.

### `tests/ui/`

| File | What it tests |
|------|---------------|
| `01-sign-in.spec.ts` | Full user signup and account registration flow with random data (Faker + unique email), and verifies persisted name/email on account info screen |
| `02-signup-error.spec.ts` | Negative signup scenarios — duplicate email, blank name, and blank email error messages |
| `03-login.spec.ts` | Login with valid credentials from environment config |
| `04-logout.spec.ts` | Login, verify logout link, perform logout, verify redirect to login page |
| `05-product.spec.ts` | Navigate to Products, open first product, verify product name against `test-data/productDetails.json` |

**Why separate test files?** Each file covers one feature area. Easy to run a single scenario, debug failures, and onboard new team members.

### `tests/auth.setup.ts`

Runs **once before all tests** to perform login and save the browser session (cookies + localStorage) to `auth/user.json`. All subsequent tests reuse this session via Playwright's `storageState`.

```bash
npm run test:setup  # Run setup independently
```

**Why?** Avoids logging in on every test. Tests that need a logged-in user start instantly. Tests that need a fresh state (signup, login) clear it via `test.use({ storageState: { cookies: [], origins: [] } })`.

### `tests/api/`

| File | What it tests |
|------|---------------|
| `01-get.spec.ts` | GET /booking API endpoint — verifies response status and data |

**Why API tests?** Validates backend functionality alongside UI tests using Playwright's built-in `request` API. No additional API testing framework required.

### `test-data/`

| File | Purpose |
|------|---------|
| `productDetails.json` | Expected product name used for assertions in product tests |
| `userData.json` | User signup data (password, DOB, address) used in registration tests |

**Why external JSON?** Test data can be updated without changing test code — useful for data-driven testing.

---

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in headed mode (visible browser)

```bash
npm run test:headed
```

### Run tests by environment

```bash
# QA environment (default)
npm run test:qa

# Stage environment
npm run test:stage
```

### Run a single test file

```bash
npx playwright test tests/ui/03-login.spec.ts
```

### Run a specific test by name

```bash
npx playwright test -g "verify login with valid credentials"
```

### Run in debug mode

```bash
npx playwright test --debug
```

---

## Running Tests with Docker

### Build the Docker image

```bash
docker compose build
```

or

```bash
npm run docker:build
```

### Run all tests in Docker

```bash
docker compose up
```

or

```bash
npm run docker:test
```

### Run tests against a specific environment

```bash
# QA environment (default)
ENV=qa docker compose up

# Stage environment
ENV=stage docker compose up
```

### Run a single test file in Docker

```bash
docker compose run test npx playwright test tests/ui/03-login.spec.ts
```

### Run tests by name in Docker

```bash
docker compose run test npx playwright test -g "verify login with valid credentials"
```

### Clean up Docker resources

```bash
docker compose down --rmi local
```

or

```bash
npm run docker:clean
```

### Test reports

Reports are volume-mounted to `./reports/` on your host machine:

- `reports/playwright/` — Playwright HTML report
- `reports/allure-results/` — Allure raw results

Open the Playwright report:

```bash
npx playwright show-report reports/playwright
```

---

## npm Scripts Reference

| Script | Command | Description |
|--------|---------|-------------|
| `test` | `npx playwright test` | Run all tests (default: QA env) |
| `test:headed` | `npx playwright test --headed` | Run with browser UI visible |
| `test:setup` | `npx playwright test tests/auth.setup.ts` | Run auth setup to save login session |
| `test:qa` | `cross-env ENV=qa npx playwright test` | Run against QA config, then generate and open Allure report |
| `test:stage` | `cross-env ENV=stage npx playwright test` | Run against Stage config |
| `report:playwright` | `npx playwright show-report` | Open Playwright HTML report |
| `allure:generate` | `allure generate ...` | Generate Allure report from results |
| `allure:open` | `allure open allure-report` | Open generated Allure report |
| `allure:serve` | `allure serve allure-report` | Serve Allure report locally |
| `clean:allure` | Removes `allure-results` and `allure-report` folders |
| `clean:auth` | Removes saved browser sessions (`auth/` folder) |
| `clean:logs` | Removes test execution logs (`logs/` folder) |
| `docker:build` | `docker compose build` | Build Docker image |
| `docker:test` | `docker compose up --abort-on-container-exit` | Run all tests in Docker (QA) |
| `docker:test:qa` | `cross-env ENV=qa docker compose up` | Run QA tests in Docker |
| `docker:test:stage` | `cross-env ENV=stage docker compose up` | Run Stage tests in Docker |
| `docker:clean` | `docker compose down --rmi local` | Remove Docker image and containers |

---

## Environment Configuration

Environment secrets are stored in `.env` (git-ignored) and loaded via `dotenv`. Copy `.env.example` to `.env` and fill in your values. See `.env.example` for all available variables.

Set the active environment with the `ENV` variable:

| Value | Config file used | Default |
|-------|------------------|---------|
| `qa` | `src/config/environment/qa.ts` | Yes |
| `stage` | `src/config/environment/stage.ts` | No |

Example — run login test on Stage:

```bash
cross-env ENV=stage npx playwright test tests/ui/03-login.spec.ts
```

Each environment config provides:

- `baseUrl` – application URL
- `emailAddress` / `password` – login credentials
- `testUserFirstName` / `testUserLastName` – user details for signup tests
- `postalCode` – address data for registration

---

## Reports

This framework generates two types of reports:

### Playwright HTML Report

Generated automatically after each run.

```bash
npm run report:playwright
```

Output folder: `playwright-report/`

### Allure Report

```bash
npm run allure:generate
npm run allure:open
```

Output folders: `allure-results/` (raw) and `allure-report/` (generated HTML)

---

## Hooks, Storage State & Logging

### Hooks (beforeEach / afterEach)

Tests use `beforeEach` hooks to handle navigation and setup, keeping test bodies focused on assertions:

```ts
test.describe("sign-up flow", () => {
  test.beforeEach(async ({ signInPage }) => {
    await signInPage.navigateTo("/login");
  });

  test("verify signup", async ({ signInPage }) => {
    // Test body — no navigation needed
  });
});
```

The `baseFixture.ts` also provides **global logging hooks** that automatically log test start, completion time, and pass/fail status to `logs/test.log`.

### Storage State (Session Persistence)

The framework uses Playwright's `storageState` to persist login sessions across tests:

1. `tests/auth.setup.ts` runs **once** before all tests
2. It logs in and saves browser cookies/localStorage to `auth/user.json`
3. All tests in the `chromium` project inherit this session automatically
4. Tests that need a **fresh state** (signup, login) clear it:

```ts
test.describe("sign-up flow", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  // ... tests run without saved session
});
```

### Logging (Winston)

The framework uses [Winston](https://www.npmjs.com/package/winston) for structured logging:

| Log file | Content |
|----------|---------|
| `logs/test.log` | All test events (start, pass/fail, duration) |
| `logs/error.log` | Failed tests only with error details |
| Console | Color-coded output during test execution |

**Log level:** Set `LOG_LEVEL` env var (default: `info`). Available: `error`, `warn`, `info`, `debug`.

---

## CI/CD

GitHub Actions workflow (`.github/workflows/playwright.yml`) runs on every push/PR to `main` or `master`:

1. Checks out code
2. Installs dependencies (`npm ci`)
3. Installs Playwright browsers
4. Runs all tests
5. Uploads Playwright HTML report as an artifact (retained 30 days)

---

## Key Configuration Files

| File | Purpose |
|------|---------|
| `playwright.config.ts` | Test directory, timeouts, browser projects, reporters, screenshot/video/trace settings, storage state |
| `tsconfig.json` | TypeScript strict mode, CommonJS modules, Node.js types, path aliases |
| `package.json` | Dependencies, npm scripts, project metadata |
| `.gitignore` | Excludes `node_modules/`, reports, `auth/`, `logs/`, and test artifacts from version control |
| `.env.example` | Template for environment variables (copy to `.env` and fill in secrets) |
| `.prettierrc` | Prettier code formatting rules (single quotes, trailing commas, 100 print width) |
| `tests/auth.setup.ts` | Storage state setup — logs in once and saves session for all tests |
| `Dockerfile` | Docker image definition — Playwright v1.61.1-noble base with Chromium |
| `docker-compose.yml` | Docker service configuration — env_file, volume mounts, environment override |
| `.dockerignore` | Excludes `node_modules/`, `.git/`, reports, and artifacts from Docker build |

---

## Design Principles

1. **Separation of concerns** — `src/` = how to interact with the app; `tests/` = what to verify
2. **Page Object Model** — UI locators and actions live in page classes, not in tests
3. **BasePage inheritance** — All page objects extend a common BasePage with shared navigation and utility methods
4. **Fixtures** — Shared setup (navigation, page objects) injected automatically
5. **Hooks** — `beforeEach` for navigation/setup, global hooks for logging test lifecycle
6. **Storage state** — Login once, reuse session across tests; fresh state when needed
7. **Environment-driven** — URLs and credentials controlled by `ENV`, not hardcoded in tests
8. **Centralized config** — Framework behaviour (retries, headless, reporters) in one place
9. **External test data** — JSON files for data that may change independently of test logic
10. **Environment secrets via `.env`** — Credentials loaded from `.env` (git-ignored), never committed to source
11. **Structured logging** — Winston logs to console + files for debugging and audit trails

---

## Author

**Karan Sharma**

Repository: [Automation_excercise_playwright](https://github.com/qakaransharma/Automation_excercise_playwright)
