import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getEventById } from "@/lib/events";

interface EventPageProps {
    params: Promise<{
        id: string;
    }>;
}

const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

async function EventDetails({ params }: EventPageProps) {
    const { id } = await params;
    const event = await getEventById(id);
    if (event ==null) {
        notFound();
    }
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
