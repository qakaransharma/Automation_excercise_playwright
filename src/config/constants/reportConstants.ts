import { ReporterDescription } from "@playwright/test";

export const REPORTER_CONFIG: ReporterDescription[] = [
  ["html", { open: "never" }],
  ["allure-playwright"],
];
