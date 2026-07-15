import { test as base } from "@playwright/test";
import { logger } from "../utils/logger";

export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    const testLogger = logger.child({ test: testInfo.title });
    testLogger.info("Test started");

    const startTime = Date.now();

    await use(page);

    const duration = Date.now() - startTime;
    if (testInfo.status === "passed") {
      testLogger.info(`Test passed (${duration}ms)`);
    } else if (testInfo.status === "failed") {
      testLogger.error(`Test failed (${duration}ms)`, {
        error: testInfo.error?.message,
      });
    } else {
      testLogger.warn(`Test ${testInfo.status} (${duration}ms)`);
    }
  },
});

export const expect = test.expect;
