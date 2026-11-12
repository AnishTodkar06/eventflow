import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getEventById } from "@/lib/events";
import Link from "next/link";
import Image from "next/image";

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
    if (event == null) {
        notFound();
    }
    return (
        <article className="w-full space-y-8 text-left">
            <header className="space-y-2">
                <span className="block text-sm font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
                    {event.category}
                </span>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {event.title}
                </h2>
            </header>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                />
            </div>

            <div className="space-y-2 text-zinc-600 dark:text-zinc-400">
                <p>
                    Date: <time dateTime={event.date}>{event.date}</time>
                </p>
                <p>
                    Location: {event.venue}, {event.location}
                </p>
                <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    Price: {formatter.format(event.price)}
                </p>
            </div>

            <section className="space-y-3">
                <h3 className="text-xl font-semibold">
                    About this event
                </h3>
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {event.description}
                </p>
            </section>

            <Link
                href="/events"
                className="inline-flex rounded-md bg-violet-600 px-4 py-2 font-medium text-white hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
            >
                Back to Events
            </Link>
        </article>
    );
}

export default function EventPage({ params }: EventPageProps) {
    return (
        <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-start gap-8 px-4 py-10 text-center sm:px-6">
            <h1 className="text-3xl font-semibold">Event Details</h1>
            <Suspense fallback={<p>Loading Event Details...</p>}>
                <EventDetails params={params} />
            </Suspense>
        </main>
    );
}
