import { useState, useMemo } from "react";
import { FileText, Filter } from "lucide-react";
import SectionHeader from "../components/common/SectionHeader";
import SearchBar from "../components/common/SearchBar";
import PaperCard from "../components/cards/PaperCard";
import { papers } from "../data/papers";

const directions = [
  "RPKI Adoption", "Route Origin Validation", "RPKI Misconfiguration", "RPKI Validator Security",
  "Route Hijack Detection", "Route Leak Detection", "AS Relationship Inference",
  "BGP Anomaly Detection", "BGPsec / ASPA / Path Validation", "Routing Security Measurement",
  "Routing Incident Case Study",
];

export default function Papers() {
  const [query, setQuery] = useState("");
  const [directionFilter, setDirectionFilter] = useState("");
  const [reproFilter, setReproFilter] = useState("");
  const [codeOnly, setCodeOnly] = useState(false);

  const filtered = useMemo(() => {
    let items = papers;
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (directionFilter) items = items.filter((p) => p.direction === directionFilter);
    if (reproFilter) items = items.filter((p) => p.reproducibility === reproFilter);
    if (codeOnly) items = items.filter((p) => p.hasCode);
    return items;
  }, [query, directionFilter, reproFilter, codeOnly]);

  const grouped = useMemo(() => {
    if (directionFilter) return null;
    const g: Record<string, typeof papers> = {};
    filtered.forEach((p) => {
      if (!g[p.direction]) g[p.direction] = [];
      g[p.direction].push(p);
    });
    return g;
  }, [filtered, directionFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeader
        title="Papers & Related Work Map"
        subtitle="论文导航与 Related Work 地图 — Papers organized by research direction for routing security"
        icon={<FileText className="h-6 w-6" />}
      />

      <div className="space-y-4 mb-8">
        <SearchBar value={query} onChange={setQuery} placeholder="Search papers by title, summary, or tags..." />

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setDirectionFilter("")}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              !directionFilter
                ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--border-accent)]"
            }`}
          >
            All Directions
          </button>
          {directions.map((d) => (
            <button
              key={d}
              onClick={() => setDirectionFilter(d === directionFilter ? "" : d)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                d === directionFilter
                  ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--border-accent)]"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <select
            value={reproFilter}
            onChange={(e) => setReproFilter(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border)] focus:outline-none focus:border-blue-500"
          >
            <option value="">All Reproducibility</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <label className="flex items-center gap-2 cursor-pointer text-xs text-[var(--text-secondary)]">
            <input
              type="checkbox"
              checked={codeOnly}
              onChange={(e) => setCodeOnly(e.target.checked)}
              className="accent-blue-500"
            />
            Has Code Only
          </label>
        </div>
      </div>

      <p className="text-sm text-[var(--text-muted)] mb-4">
        Showing {filtered.length} of {papers.length} papers
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Filter className="h-10 w-10 text-[var(--border)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)] text-lg font-medium">No papers found</p>
          <p className="text-[var(--text-muted)] text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : grouped ? (
        <div className="space-y-10">
          {Object.entries(grouped).map(([direction, dirPapers]) => (
            <div key={direction}>
              <h2 className="text-lg font-semibold text-blue-400 mb-4 pb-2 border-b border-[var(--border)]">
                {direction}
                <span className="text-sm text-[var(--text-muted)] ml-2">({dirPapers.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dirPapers.map((paper) => (
                  <PaperCard key={paper.id} paper={paper} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      )}
    </div>
  );
}
