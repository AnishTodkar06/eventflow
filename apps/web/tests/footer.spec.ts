import { expect, test } from "@playwright/test";

test("shared footer navigation works across EventFlow pages", async ({ page }) => {
  await page.goto("/");

  const footer = page.getByRole("contentinfo");
  const footerNav = footer.getByRole("navigation", {
    name: "Footer navigation",
  });

  await expect(footer).toBeVisible();
  await expect(
    footer.getByText("Discover. Experience. Connect."),
  ).toBeVisible();
  await expect(
    footer.getByText("© 2026 EventFlow. All rights reserved."),
  ).toBeVisible();

  await footerNav.getByRole("link", { name: "Explore Events" }).click();
  await expect(page).toHaveURL("/events");
  await expect(footer).toBeVisible();

  await footerNav.getByRole("link", { name: "Home" }).click();
  await expect(page).toHaveURL("/");
});

test("footer stays at the bottom on short pages", async ({ page }) => {
  await page.setViewportSize({
    width: 1440,
    height: 900,
  });
  await page.goto("/events/evt-999");

  await expect(
    page.getByRole("heading", { name: "Event Not Found" }),
  ).toBeVisible();

  const footer = page.getByRole("contentinfo");
  await expect(footer).toBeVisible();

  const footerBox = await footer.boundingBox();
  if (!footerBox) {
    throw new Error("Footer does not have a visible bounding box");
  }

  const footerBottom = footerBox.y + footerBox.height;
  expect(footerBottom).toBeCloseTo(900, 0);

  const documentHeight = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  expect(documentHeight).toBeLessThanOrEqual(900);
});