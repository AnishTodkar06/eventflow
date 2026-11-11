import { test, expect } from "@playwright/test";

test('user can search events by title', async ({ page }) => {
    await page.goto('/events');
    await page.getByRole("searchbox", { name: "Search events" }).fill("music");
    await page.getByRole("button", { name: "Search Events" }).click();
    await expect(page).toHaveURL(/\/events\?search=music$/);
    const eventCards = page.getByRole("article");
    await expect(eventCards).toHaveCount(1);
    await expect(eventCards.getByRole("heading")).toHaveText(["Sunset Music Festival"]);
});

test('search works regardless of letter case', async ({ page }) => {
    await page.goto('/events');
    await page.getByRole("searchbox", { name: "Search events" }).fill("MUSIC");
    await page.getByRole("button", { name: "Search Events" }).click();
    await expect(page).toHaveURL(/\/events\?search=MUSIC$/);
    const eventCards = page.getByRole("article");
    await expect(eventCards).toHaveCount(1);
    await expect(eventCards.getByRole("heading")).toHaveText(["Sunset Music Festival"]);
    await expect(
        page.getByRole("searchbox", { name: "Search events" })
    ).toHaveValue("MUSIC");
});

test('user sees an empty state when no events match', async ({ page }) => {
    const searchTerm = "football";

    await page.goto("/events");
    await page.getByRole("searchbox", { name: "Search events" }).fill(searchTerm);
    await page.getByRole("button", { name: "Search Events", exact: true }).click();

    await expect(page).toHaveURL(`/events?search=${searchTerm}`);
    const eventCards = page.getByRole("article");
    await expect(eventCards).toHaveCount(0);
    await expect(
        page.getByText(`No events found for “${searchTerm}”.`, { exact: true })
    ).toBeVisible();
});


