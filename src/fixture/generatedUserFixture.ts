import { readFileSync } from "fs";
import { join } from "path";
import { test as pagesTest } from "./pagesFixture";

export interface GeneratedUser {
  name: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}

type GeneratedUserFixture = {
  generatedUser: GeneratedUser;
};

function readGeneratedUser(): GeneratedUser {
  return JSON.parse(
    readFileSync(join(process.cwd(), "test-data/generatedUser.json"), "utf8"),
  );
}

export const test = pagesTest.extend<GeneratedUserFixture>({
  generatedUser: async ({}, use) => {
    await use(readGeneratedUser());
  },
});

export const expect = test.expect;
