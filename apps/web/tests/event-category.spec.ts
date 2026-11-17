import { test, expect } from "@playwright/test";

test("user can discover events by category from the homepage", async ({ page }) => {
    await page.goto("/");

    const categories = page.getByRole("region", {
        name: "Explore by category",
    });
    await categories.getByRole("link", { name: /Explore Music events/ }).click();

    await expect(page).toHaveURL((url) => {
        return (
            url.pathname === "/events" &&
            url.searchParams.get("category") === "Music"
        );
    });
    await expect(
        page.getByRole("combobox", { name: "Category" })
    ).toHaveValue("Music");

    const eventCards = page.getByRole("article");
    await expect(eventCards).toHaveCount(1);
    await expect(eventCards.getByRole("heading")).toHaveText([
        "Sunset Music Festival",
    ]);
});

test("events page filters events by category", async ({ page }) => {
    await page.goto("/events?category=Technology");

    await expect(
        page.getByRole("combobox", { name: "Category" })
    ).toHaveValue("Technology");
    const eventCards = page.getByRole("article");
    await expect(eventCards).toHaveCount(1);
    await expect(eventCards.getByRole("heading")).toHaveText([
        "Tech Innovators Conference",
    ]);
});

test("events page handles duplicate category parameters", async ({ page }) => {
    await page.goto("/events?category=music&category=Technology");

    await expect(
        page.getByRole("combobox", { name: "Category" })
    ).toHaveValue("Music");
    await expect(page.getByRole("article")).toHaveCount(1);
    await expect(page.getByRole("article").getByRole("heading")).toHaveText([
        "Sunset Music Festival",
    ]);
});

test(
    "category dropdown reflects case-insensitive category filter",
    async ({ page }) => {
        await page.goto("/events?category=cOmEdY");

        await expect(
            page.getByRole("combobox", { name: "Category" })
        ).toHaveValue("Comedy");
        await expect(page.getByRole("article")).toHaveCount(1);
        await expect(page.getByRole("article").getByRole("heading")).toHaveText([
            "Standup Comedy Night",
        ]);
    }
);

test("user can change the category filter", async ({ page }) => {
    await page.goto("/events");
    await page
        .getByRole("combobox", { name: "Category" })
        .selectOption("Technology");
    await page.getByRole("button", { name: "Search Events" }).click();

    await expect(page).toHaveURL(/\/events\?.*category=Technology/);
    const eventCards = page.getByRole("article");
    await expect(eventCards).toHaveCount(1);
    await expect(eventCards.getByRole("heading")).toHaveText([
        "Tech Innovators Conference",
    ]);
});

test(
    "user can reselect all categories before submitting filters",
    async ({ page }) => {
        await page.goto("/events");

        const categorySelect = page.getByRole("combobox", {
            name: "Category",
        });
        await expect(categorySelect).toHaveValue("");

        await categorySelect.selectOption("Music");
        await categorySelect.selectOption("");
        await expect(categorySelect).toHaveValue("");

        await page.getByRole("button", { name: "Search Events" }).click();
        await expect(page).toHaveURL((url) => {
            return (
                url.pathname === "/events" &&
                url.searchParams.get("category") === "" &&
                url.searchParams.get("search") === ""
            );
        });
        await expect(page.getByRole("article")).toHaveCount(3);
    }
);

test("user can clear all filters", async ({ page }) => {
    await page.goto("/events?category=Music&search=music");
    await expect(page.getByRole("article")).toHaveCount(1);

    await page.getByRole("link", { name: "Clear all filters" }).click();

    await expect(page).toHaveURL(/\/events$/);
    await expect(page.getByRole("combobox", { name: "Category" })).toHaveValue(
        ""
    );
    await expect(
        page.getByRole("searchbox", { name: "Search events" })
    ).toHaveValue("");
    await expect(page.getByRole("article")).toHaveCount(3);
});

test("search preserves the selected category filter", async ({ page }) => {
    await page.goto("/events?category=Music");
    await page
        .getByRole("searchbox", { name: "Search events" })
        .fill("conference");

    const navigation = page.waitForURL((url) => {
        return (
            url.pathname === "/events" &&
            url.searchParams.get("search") === "conference" &&
            url.searchParams.get("category") === "Music"
        );
    });
    await page.getByRole("button", { name: "Search Events" }).click();
    await navigation;

    const url = new URL(page.url());
    expect(url.searchParams.get("search")).toBe("conference");
    expect(url.searchParams.get("category")).toBe("Music");
    await expect(
        page.getByText(
            "No events found for “conference” in category “Music”.",
            { exact: true }
        )
    ).toBeVisible();
    await expect(page.getByRole("article")).toHaveCount(0);
});