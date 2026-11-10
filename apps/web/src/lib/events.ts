import "server-only";
export type Event = {
    id: string;
    title: string;
    date: string;
    location: string;
    price: number;
};

export async function getEvents(): Promise<Event[]> {
    const apiBaseUrl = process.env.API_BASE_URL;
    if (!apiBaseUrl) {
        throw new Error("API_BASE_URL is not configured");
    }
    const response = await fetch(`${apiBaseUrl}/api/events`, {
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