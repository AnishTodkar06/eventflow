import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-10 py-32 px-6 sm:px-16 bg-white dark:bg-black ">
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
      </main>
    </div>
  );
}
