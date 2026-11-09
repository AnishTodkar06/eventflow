import { Suspense } from "react";
import { notFound } from "next/navigation";

interface EventPageProps {
    params: Promise<{
        id: string;
    }>;
}
type Event = {
    id: string;
    title: string;
    date: string;
    location: string;
    price: number;
};

const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

async function EventDetails({ params }: EventPageProps) {
    const { id } = await params;
    const apiBaseUrl = process.env.API_BASE_URL;
    if (!apiBaseUrl) {
        throw new Error("API_BASE_URL is not configured");
    }
    const response = await fetch(`${apiBaseUrl}/api/events/${encodeURIComponent(id)}`, {
        cache: "no-store",
    });
    if (response.status === 404) {
        notFound();
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch event: HTTP ${response.status}`);
    }
    const event: Event = await response.json();
    return (
        <div>
            <h2>{event.title}</h2>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>Price: {formatter.format(event.price)}</p>
        </div>
    )
}

export default function EventPage({ params }: EventPageProps) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
            <h1 className="text-3xl font-semibold">Event Details</h1>
            <Suspense fallback={<p>Loading Event Details...</p>}>
                <EventDetails params={params} />
            </Suspense>
        </main>
    );
}
