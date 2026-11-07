import { test, expect } from "@playwright/test";

test("should display the EventFlow Welcome heading", async ({ page }) => {
    await page.goto("/");
    await expect(
        page.getByRole("heading", { name: "Welcome to EventFlow" })
    ).toBeVisible();
});

test("should display three upcoming events", async ({ page }) => {
    await page.goto("/");
    const eventCards = page.getByRole("article");
    await expect(eventCards).toHaveCount(3);

    await expect(
        eventCards.getByRole("heading")
    ).toHaveText([
        "Sunset Music Festival",
        "Tech Innovators Conference",
        "Standup Comedy Night",
    ]);

});