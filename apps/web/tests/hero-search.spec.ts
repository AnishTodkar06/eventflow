import { test, expect } from "@playwright/test";

test("user can search for events from the homepage", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("searchbox", { name: "Search events" }).fill("music");
    await page.getByRole("button", { name: "Search", exact: true }).click();

    await expect(page).toHaveURL("/events?search=music");
    const eventCards = page.getByRole("article");
    await expect(eventCards).toHaveCount(1);
    await expect(
        eventCards.getByRole("heading", {
            name: "Sunset Music Festival",
            exact: true,
        })
    ).toBeVisible();
});