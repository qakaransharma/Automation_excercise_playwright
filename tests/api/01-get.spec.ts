import { test, expect } from "@playwright/test";

const API_BASE_URL = "https://restful-booker.herokuapp.com";

test.describe("Booking API", () => {
  test("GET /booking should return a list of bookings", async ({
    request,
  }) => {
    const response = await request.get(`${API_BASE_URL}/booking`);
    const bookings = await response.json();

    expect(response.status()).toBe(200);
    expect(bookings.length).toBeGreaterThan(0);
  });
});
