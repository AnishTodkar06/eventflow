import Link from "next/link";
import EventCard from "@/components/EventCard";

const events = [
  {
    id: "evt-001",
    title: "Sunset Music Festival",
    date: "2026-12-15",
    location: "Mumbai",
    price: 999,
  },
  {
    id: "evt-002",
    title: "Tech Innovators Conference",
    date: "2026-12-20",
    location: "Pune",
    price: 1499,
  },
  {
    id: "evt-003",
    title: "Standup Comedy Night",
    date: "2027-01-10",
    location: "Hyderabad",
    price: 499,
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-6xl flex-col items-center justify-start gap-10 py-16 px-6 sm:px-16 bg-white dark:bg-black ">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to EventFlow
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Discover and book amazing events near you.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base items-center justify-center font-medium ">
          <Link href="/events" className="rounded-md bg-black px-4 py-2 text-white hover:bg-blue-700">
            Explore Events
          </Link>
        </div>

          <section className="w-full">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={event.date}
                  location={event.location}
                  price={event.price}
                />
              ))}
            </div>
          </section>
      </main>
    </div>
  );
}
