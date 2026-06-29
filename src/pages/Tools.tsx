import { useState, useMemo } from "react";
import { Wrench, Filter } from "lucide-react";
import SectionHeader from "../components/common/SectionHeader";
import SearchBar from "../components/common/SearchBar";
import FilterPanel from "../components/common/FilterPanel";
import ToolCard from "../components/cards/ToolCard";
import { tools } from "../data/tools";
import { getUniqueTags, getUniqueCategories, filterByTags, searchItems } from "../utils/filters";

export default function Tools() {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = useMemo(() => getUniqueCategories(tools), []);
  const allTags = useMemo(() => getUniqueTags(tools), []);

  const filtered = useMemo(() => {
    let items = searchItems(tools, query);
    items = filterByTags(items, selectedTags);
    if (selectedCategory) items = items.filter((t) => t.category === selectedCategory);
    return items;
  }, [query, selectedTags, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeader
        title="Tools"
        subtitle="路由安全工具导航 — Routing security research tools with recommendations"
        icon={<Wrench className="h-6 w-6" />}
      />

      <div className="space-y-4 mb-8">
        <SearchBar value={query} onChange={setQuery} placeholder="Search tools by name, description, or use case..." />

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? "" : cat)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                cat === selectedCategory
                  ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--border-accent)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <FilterPanel tags={allTags} selectedTags={selectedTags} onToggle={(tag) => {
          setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
          );
        }} />
      </div>

      <p className="text-sm text-[var(--text-muted)] mb-4">
        Showing {filtered.length} of {tools.length} tools
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Filter className="h-10 w-10 text-[var(--border)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)] text-lg font-medium">No tools found</p>
          <p className="text-[var(--text-muted)] text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
