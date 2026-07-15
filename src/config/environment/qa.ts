require('dotenv').config();

export const qaConfig = {
  baseUrl: process.env.BASE_URL || "https://automationexercise.com",
  emailAddress: process.env.QA_EMAIL || "",
  password: process.env.QA_PASSWORD || "",
  testUserFirstName: process.env.QA_FIRST_NAME || "",
  testUserLastName: process.env.QA_LAST_NAME || "",
  postalCode: Number(process.env.QA_POSTAL_CODE) || 0,
};
