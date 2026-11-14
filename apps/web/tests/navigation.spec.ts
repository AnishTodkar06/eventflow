import { test, expect } from "@playwright/test";

test('shared navigation works across EventFlow pages', async ({ page }) => {
    await page.goto('/');
    const navbar = page.getByRole("navigation", { name: "Main navigation" });
    await expect(navbar).toBeVisible();
    await navbar
        .getByRole("link", { name: "Explore Events" })
        .click();
    await expect(page).toHaveURL('/events');
    await expect(navbar).toBeVisible();
    await page.getByRole("article").getByRole('link', { name: 'Sunset Music Festival' }).click();
    await expect(page).toHaveURL(/\/events\/evt-001$/);
    await expect(navbar).toBeVisible();
    await page.goto('/events/evt-999');
    await expect(
        page.getByRole("heading", { name: "Event Not Found" })
    ).toBeVisible();
    await expect(navbar).toBeVisible();
    await navbar
        .getByRole("link", { name: "Home" })
        .click();
    await expect(page).toHaveURL('/');
});

