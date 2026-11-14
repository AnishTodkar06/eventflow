import { test, expect } from "@playwright/test";

test('user can navigate from an event card to its details', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Sunset Music Festival/ }).click();
    await expect(page).toHaveURL(/\/events\/evt-001$/);
    await expect(page.getByRole('heading', { name: 'Sunset Music Festival' })).toBeVisible();
});

test('user sees a not-found page for an invalid event', async ({ page }) => {
    await page.goto('/events/evt-999');
    await expect(page.getByRole('heading', { name: 'Event Not Found' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Back to Events' })).toBeVisible();
    await page.getByRole('link', { name: 'Back to Events' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Welcome to EventFlow' })).toBeVisible();
});

test('user is able to navigate to events page and back to home', async ({ page }) => {
    await page.goto('/');
    await page
        .getByRole("main")
        .getByRole("link", { name: "Explore Events", exact: true })
        .click();
    await expect(page).toHaveURL('/events');
    await expect(page.getByRole('heading', { name: 'Explore Events' })).toBeVisible();
    const eventCards = page.getByRole("article");
    await expect(eventCards).toHaveCount(3);
    await page.getByRole('link', { name: 'Back to Home' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Welcome to EventFlow' })).toBeVisible();
});
