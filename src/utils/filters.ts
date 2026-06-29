export function filterByTags<T extends { tags: string[] }>(items: T[], selectedTags: string[]): T[] {
  if (selectedTags.length === 0) return items;
  return items.filter((item) => selectedTags.some((tag) => item.tags.includes(tag)));
}

export function filterByCategory<T extends { category: string }>(items: T[], category: string): T[] {
  if (!category) return items;
  return items.filter((item) => item.category === category);
}

export function getUniqueTags<T extends { tags: string[] }>(items: T[]): string[] {
  const tags = new Set<string>();
  items.forEach((item) => item.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function getUniqueCategories<T extends { category: string }>(items: T[]): string[] {
  const cats = new Set<string>();
  items.forEach((item) => cats.add(item.category));
  return Array.from(cats).sort();
}

export function searchItems<T extends { name: string; description: string; tags: string[] }>(
  items: T[],
  query: string
): T[] {
  if (!query.trim()) return items;
  const q = query.toLowerCase();
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
  );
}
