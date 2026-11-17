import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-zinc-950 px-6 py-12 text-white sm:px-12 sm:py-20">
      <Image
        src="/images/hero-events.jpg"
        alt=""
        fill
        sizes="(max-width: 1280px) 100vw, 1152px"
        loading="eager"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-zinc-950/85 via-zinc-950/65 to-zinc-950/80"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl"
      />
      <div className="mx-auto max-w-3xl">
        <p className="mb-5 text-sm font-semibold tracking-[0.2em] text-purple-300">
          YOUR NEXT EXPERIENCE STARTS HERE
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Discover moments worth experiencing.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
          Explore live concerts, technology conferences, comedy shows, and
          unforgettable experiences near you.
        </p>
        <form
          action="/events"
          method="GET"
          role="search"
          className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="hero-search" className="sr-only">
            Search events
          </label>
          <input
            id="hero-search"
            type="search"
            name="search"
            placeholder="Search for your next event..."
            className="w-full rounded-xl bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
          />
          <button
            type="submit"
            className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300"
          >
            Search
          </button>
        </form>
        <Link
          href="/events"
          className="mt-8 inline-flex items-center rounded-full bg-purple-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300"
        >
          Explore Events
        </Link>
      </div>
    </section>
  );
}