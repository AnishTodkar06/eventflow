import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/categories";

export default function CategorySection() {
  return (
    <section aria-labelledby="category-section-heading">
      <div className="mb-6">
        <h2
          id="category-section-heading"
          className="text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Explore by category
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Find experiences that match your interests.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={{
              pathname: "/events",
              query: { category: category.name },
            }}
            className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600 dark:border-zinc-700 dark:bg-zinc-800"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={category.image}
                alt={category.imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="space-y-2 p-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {category.name}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {category.description}
              </p>
              <span className="inline-block pt-1 font-medium text-violet-600 group-hover:underline dark:text-violet-400">
                Explore {category.name} events &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}