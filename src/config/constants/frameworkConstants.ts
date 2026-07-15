export const RETRIES = 1;
export const FULLY_PARALLEL = true;
export const WORKERS = Number(process.env.WORKERS) || 4;
export const HEADLESS = true;
export const SLOW_MO = 0;

export const SCREENSHOT_MODE = "only-on-failure";
export const VIDEO_MODE = "retain-on-failure";
export const TRACE_MODE = "on-first-retry";
