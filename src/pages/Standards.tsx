import { useState, useMemo } from "react";
import { BookOpen, Filter, ChevronDown, ChevronRight } from "lucide-react";
import SectionHeader from "../components/common/SectionHeader";
import SearchBar from "../components/common/SearchBar";
import StandardCard from "../components/cards/StandardCard";
import { standards } from "../data/standards";

const categories = [
  "RPKI Fundamentals", "ROA / VRP", "Route Origin Validation", "RTR Protocol",
  "BGPsec", "ASPA", "Route Leak Detection / Prevention", "RSC / Signed Objects",
  "MANRS / Operational Best Practices",
];

export default function Standards() {
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    if (!query.trim()) return standards;
    const q = query.toLowerCase();
    return standards.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.rfcNumber.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const grouped = useMemo(() => {
    const g: Record<string, typeof standards> = {};
    filtered.forEach((s) => {
      if (!g[s.category]) g[s.category] = [];
      g[s.category].push(s);
    });
    return g;
  }, [filtered]);

  const toggle = (cat: string) => {
    setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeader
        title="RFCs & Standards"
        subtitle="IETF 标准与 RFC 导航 — Standards for RPKI, BGP security, and route origin validation"
        icon={<BookOpen className="h-6 w-6" />}
      />

      <div className="space-y-4 mb-8">
        <SearchBar value={query} onChange={setQuery} placeholder="Search standards by RFC number, name, or description..." />
      </div>

      <p className="text-sm text-[var(--text-muted)] mb-4">
        Showing {filtered.length} of {standards.length} standards
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Filter className="h-10 w-10 text-[var(--border)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)] text-lg font-medium">No standards found</p>
          <p className="text-[var(--text-muted)] text-sm mt-1">Try adjusting your search</p>
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((cat) => {
            const items = grouped[cat];
            if (!items) return null;
            const isCollapsed = collapsed[cat];

            return (
              <div key={cat} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden">
                <button
                  onClick={() => toggle(cat)}
                  className="w-full flex items-center justify-between px-5 py-3 hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-semibold text-[var(--text-primary)]">{cat}</h2>
                    <span className="text-xs text-[var(--text-muted)]">({items.length})</span>
                  </div>
                  {isCollapsed ? (
                    <ChevronRight className="h-4 w-4 text-[var(--text-muted)]" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-[var(--text-muted)]" />
                  )}
                </button>
                {!isCollapsed && (
                  <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((standard) => (
                      <StandardCard key={standard.id} standard={standard} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
