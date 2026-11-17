import { categories } from "@/lib/categories";

export function normalizeQueryParam(
    value: string | string[] | undefined
): string | undefined {
    const query = Array.isArray(value) ? value[0] : value;
    return query?.trim() || undefined;
}

export function normalizeCategory(
    value: string | string[] | undefined
): string | undefined {
    const category = normalizeQueryParam(value);
    if (!category) {
        return undefined;
    }

    const matchedCategory = categories.find(
        (option) => option.name.toLowerCase() === category.toLowerCase()
    );
    return matchedCategory?.name ?? category;
}