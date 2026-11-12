import { test, expect } from "@playwright/test";

test("event cards display event information and loaded images", async ({ page }) => {
    await page.goto("/events");

    const eventCards = page.getByRole("article");
    await expect(eventCards).toHaveCount(3);

    const musicCard = eventCards.filter({
        has: page.getByRole("heading", {
            name: "Sunset Music Festival",
            exact: true,
        }),
    });

    await expect(musicCard.getByText("Music", { exact: true })).toBeVisible();
    await expect(
        musicCard.getByText("Riverside Arena, Mumbai", { exact: true })
    ).toBeVisible();
    await expect(
        musicCard.getByText("Price: ₹999", { exact: true })
    ).toBeVisible();

    // Verify that all three cards are visible and their images load.
    for (const card of await eventCards.all()) {
        await expect(card).toBeVisible();

        const image = card.getByRole("img");
        await image.scrollIntoViewIfNeeded();
        await expect(image).toBeVisible();

        await expect
            .poll(() =>
                image.evaluate(
                    (img) =>
                        img instanceof HTMLImageElement &&
                        img.complete &&
                        img.naturalWidth > 0
                )
            )
            .toBe(true);
    }
});

test("event details display complete event information", async ({ page }) => {
  await page.goto("/events/evt-001");

  const eventDetails = page.getByRole("article");

  await expect(
    eventDetails.getByRole("heading", {
      name: "Sunset Music Festival",
      exact: true,
    })
  ).toBeVisible();

  await expect(
    eventDetails.getByText("Music", { exact: true })
  ).toBeVisible();

  await expect(
    eventDetails.getByText("Location: Riverside Arena, Mumbai", { exact: true })
  ).toBeVisible();

  await expect(
    eventDetails.getByText(
      "Join us for an amazing sunset music festival!",
      { exact: true }
    )
  ).toBeVisible();

  await expect(
    eventDetails.getByText("Price: ₹999", { exact: true })
  ).toBeVisible();

  const image = eventDetails.getByRole("img", {
    name: "Sunset Music Festival",
    exact: true,
  });

  await image.scrollIntoViewIfNeeded();
  await expect(image).toBeVisible();

  await expect
    .poll(() =>
      image.evaluate(
        (img) =>
          img instanceof HTMLImageElement &&
          img.complete &&
          img.naturalWidth > 0
      )
    )
    .toBe(true);

  await eventDetails
    .getByRole("link", { name: "Back to Events", exact: true })
    .click();

  await expect(page).toHaveURL("/events");
  await expect(
    page.getByRole("heading", { name: "Explore Events", exact: true })
  ).toBeVisible();
});
