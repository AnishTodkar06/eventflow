import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/"
            className="text-lg font-semibold text-zinc-900 dark:text-white"
          >
            EventFlow
          </Link>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Discover. Experience. Connect.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-zinc-900 dark:text-white">
            Navigation
          </span>
          <div className="flex gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/" className="hover:text-violet-600 dark:hover:text-violet-400">
              Home
            </Link>
            <Link
              href="/events"
              className="hover:text-violet-600 dark:hover:text-violet-400"
            >
              Explore Events
            </Link>
          </div>
        </nav>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © 2026 EventFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}