import Link from "next/link";
import { getEvents } from "@/lib/events";
import EventCard from "@/components/EventCard";
import { Suspense } from "react";

async function EventList() {
    const events = await getEvents();
    return (
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
                <EventCard
                    id={event.id}
                    key={event.id}
                    title={event.title}
                    date={event.date}
                    location={event.location}
                    price={event.price}
                />
            ))}
        </div>
    );
}

export default function EventsPage() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-6xl flex-col items-center justify-start gap-10 py-16 px-6 sm:px-16 bg-white dark:bg-black">
                <div className="flex flex-col items-center gap-6 text-center">
                    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                        Explore Events
                    </h1>
                    <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        Discover events happening near you.
                    </p>
                    <Link
                        href="/"
                        className="rounded-md bg-black px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Back to Home
                    </Link>
                </div>
                <Suspense fallback={<p>Loading events...</p>}>
                    <EventList />
                </Suspense>
            </main>
        </div>
    );
}