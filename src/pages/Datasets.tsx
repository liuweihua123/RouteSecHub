import { useState, useMemo } from "react";
import { Database, Filter } from "lucide-react";
import SectionHeader from "../components/common/SectionHeader";
import SearchBar from "../components/common/SearchBar";
import FilterPanel from "../components/common/FilterPanel";
import DatasetCard from "../components/cards/DatasetCard";
import { datasets } from "../data/datasets";
import { getUniqueTags, getUniqueCategories, filterByTags, searchItems } from "../utils/filters";

export default function Datasets() {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filters, setFilters] = useState({ hasApi: false, historical: false, realtime: false });

  const categories = useMemo(() => getUniqueCategories(datasets), []);
  const allTags = useMemo(() => getUniqueTags(datasets), []);

  const filtered = useMemo(() => {
    let items = searchItems(datasets, query);
    items = filterByTags(items, selectedTags);
    if (selectedCategory) items = items.filter((d) => d.category === selectedCategory);
    if (filters.hasApi) items = items.filter((d) => d.hasApi);
    if (filters.historical) items = items.filter((d) => d.supportsHistoricalData);
    if (filters.realtime) items = items.filter((d) => d.supportsRealtimeData);
    return items;
  }, [query, selectedTags, selectedCategory, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeader
        title="Datasets & APIs"
        subtitle="数据源与 API 导航 — Curated BGP and routing security data sources for research"
        icon={<Database className="h-6 w-6" />}
      />

      <div className="space-y-4 mb-8">
        <SearchBar value={query} onChange={setQuery} placeholder="Search datasets by name, description, or tags..." />

        <div className="flex flex-wrap gap-4">
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
        </div>

        <div className="flex flex-wrap gap-4 text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.hasApi}
              onChange={(e) => setFilters((f) => ({ ...f, hasApi: e.target.checked }))}
              className="accent-blue-500"
            />
            <span className="text-[var(--text-secondary)]">Has API</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.historical}
              onChange={(e) => setFilters((f) => ({ ...f, historical: e.target.checked }))}
              className="accent-purple-500"
            />
            <span className="text-[var(--text-secondary)]">Historical Data</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.realtime}
              onChange={(e) => setFilters((f) => ({ ...f, realtime: e.target.checked }))}
              className="accent-cyan-500"
            />
            <span className="text-[var(--text-secondary)]">Real-time Data</span>
          </label>
        </div>

        <FilterPanel tags={allTags} selectedTags={selectedTags} onToggle={(tag) => {
          setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
          );
        }} />
      </div>

      <p className="text-sm text-[var(--text-muted)] mb-4">
        Showing {filtered.length} of {datasets.length} datasets
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Filter className="h-10 w-10 text-[var(--border)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)] text-lg font-medium">No datasets found</p>
          <p className="text-[var(--text-muted)] text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((dataset) => (
            <DatasetCard key={dataset.id} dataset={dataset} />
          ))}
        </div>
      )}
    </div>
  );
}
