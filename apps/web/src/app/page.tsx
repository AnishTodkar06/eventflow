import EventCard from "@/components/EventCard";
import HeroSection from "@/components/home/HeroSection";
import { Suspense } from "react";
import { getEvents } from "@/lib/events";

async function UpcomingEvents() {
  const events = await getEvents();
  return (
    <section className="w-full">
      <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        Upcoming Events
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}


export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8">
      <HeroSection />
      <Suspense fallback={<p>Loading upcoming events...</p>}>
        <UpcomingEvents />
      </Suspense>
    </main>
  );
}
