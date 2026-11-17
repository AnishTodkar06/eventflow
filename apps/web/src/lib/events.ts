import "server-only";
export type Event = {
    id: string;
    title: string;
    date: string;
    location: string;
    price: number;
    description: string;
    category: string;
    venue: string;
    imageUrl: string;
};

export interface EventFilters {
    search?: string;
    category?: string;
}

export async function getEvents(
    filters: EventFilters = {}
): Promise<Event[]> {
    const apiBaseUrl = process.env.API_BASE_URL;
    if (!apiBaseUrl) {
        throw new Error("API_BASE_URL is not configured");
    }
    const { search, category } = filters;
    const normalizedSearch = search?.trim();
    const normalizedCategory = category?.trim();
    const params = new URLSearchParams();
    if (normalizedSearch) {
        params.set("search", normalizedSearch);
    }

    if (normalizedCategory) {
        params.set("category", normalizedCategory);
    }
    const queryString = params.toString();
    const url = `${apiBaseUrl}/api/events${queryString ? `?${queryString}` : ""}`;
    const response = await fetch(url, {
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch events: HTTP ${response.status}`);
    }
    const events: Event[] = await response.json();
    return events;
}

export async function getEventById(
    id: string
): Promise<Event | null> {
    const apiBaseUrl = process.env.API_BASE_URL;
    if (!apiBaseUrl) {
        throw new Error("API_BASE_URL is not configured");
    }
    const response = await fetch(`${apiBaseUrl}/api/events/${encodeURIComponent(id)}`, {
        cache: "no-store",
    });
    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch event: HTTP ${response.status}`);
    }
    const event: Event = await response.json();
    return event;
}