require('dotenv').config();

export const stageConfig = {
  baseUrl: process.env.BASE_URL || "https://automationexercise.com",
  emailAddress: process.env.STAGE_EMAIL || "",
  password: process.env.STAGE_PASSWORD || "",
  testUserFirstName: process.env.STAGE_FIRST_NAME || "",
  testUserLastName: process.env.STAGE_LAST_NAME || "",
  postalCode: Number(process.env.STAGE_POSTAL_CODE) || 0,
};
