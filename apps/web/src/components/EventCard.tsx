import Link from "next/link";
import Image from "next/image";
import type { Event } from "@/lib/events";

interface EventCardProps {
  event: Event;
}

const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function EventCard({ event }: EventCardProps) {
  const {
    id,
    title,
    date,
    location,
    price,
    category,
    venue,
    imageUrl,
  } = event;
  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
      <Link href={`/events/${id}`} className="block h-full focus-visible:outline-2
           focus-visible:outline-offset-[-2px]
           focus-visible:outline-violet-600">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="space-y-3 p-5">
          {/* Category */}
          <span className="block text-sm font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
            {category}
          </span>

          {/* Event title */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>

          {/* Date */}
          <p className="text-gray-700 dark:text-gray-300">
            Date: <time dateTime={date}>{date}</time>
          </p>

          {/* Venue and city */}
          <p className="text-gray-700 dark:text-gray-300">
            {venue}, {location}
          </p>

          {/* Price */}
          <p className="font-semibold text-gray-900 dark:text-white">
            Price: {formatter.format(price)}
          </p>

          {/* View Details text */}
          <span className="inline-block pt-2 font-medium text-violet-600 dark:text-violet-400 group-hover:underline">
            View Details &rarr;
          </span>
        </div>
      </Link>

    </article >
  );
}