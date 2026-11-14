import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"
      >
        <Link
          href="/"
          className="text-lg font-semibold text-zinc-900 dark:text-white"
        >
          EventFlow
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/events"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
          >
            Explore Events
          </Link>
        </div>
      </nav>
    </header>
  );
}