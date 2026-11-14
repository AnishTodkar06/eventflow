import Link from "next/link";
import { getEvents } from "@/lib/events";
import EventCard from "@/components/EventCard";
import { Suspense } from "react";

interface EventsPageProps {
    searchParams: Promise<{
        search?: string;
    }>;
}
async function EventList({ searchParams }: EventsPageProps) {
    const { search } = await searchParams;
    const events = await getEvents(search);
    if (events.length === 0) {
        return (
            <p className="w-full rounded-lg bg-gray-50 px-4 py-8 text-center text-sm text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
                No events found{search ? ` for “${search}”` : ""}.
            </p>
        );
    }
    return (
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
}

async function SearchForm({ searchParams }: EventsPageProps) {
    const { search } = await searchParams;
    return (
        <form
            action="/events"
            method="GET"
            role="search"
            className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row"
        >
            <label htmlFor="event-search" className="sr-only">
                Search events
            </label>

            <input
                id="event-search"
                type="search"
                name="search"
                placeholder="Search concerts, conferences, comedy..."
                className="
      w-full flex-1 rounded-xl border border-zinc-300
      bg-white px-4 py-3 text-sm text-zinc-900
      placeholder:text-zinc-400
      outline-none transition
      focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20
      dark:border-zinc-700 dark:bg-zinc-900
      dark:text-white dark:placeholder:text-zinc-500
    "
                defaultValue={search ?? ""}
            />

            <button
                type="submit"
                className="
      rounded-xl bg-violet-600 px-6 py-3
      text-sm font-semibold text-white
      transition-colors hover:bg-violet-700
      focus-visible:outline-2 focus-visible:outline-offset-2
      focus-visible:outline-violet-500
    "
            >
                Search Events
            </button>
        </form>
    );
}

export default function EventsPage({ searchParams }: EventsPageProps) {
    return (
        <div className="flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
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
                <Suspense fallback={<p>Loading search form...</p>}>
                    <SearchForm searchParams={searchParams} />
                </Suspense>
                <Suspense fallback={<p>Loading events...</p>}>
                    <EventList searchParams={searchParams} />
                </Suspense>
            </main>
        </div>
    );
}