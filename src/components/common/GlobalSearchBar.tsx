import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { searchAll, type SearchResult } from "../../utils/search";

const typeColors: Record<string, string> = {
  resource: "bg-blue-500/15 text-blue-400",
  tool: "bg-purple-500/15 text-purple-400",
  dataset: "bg-green-500/15 text-green-400",
  incident: "bg-red-500/15 text-red-400",
  paper: "bg-amber-500/15 text-amber-400",
  standard: "bg-cyan-500/15 text-cyan-400",
  researcher: "bg-pink-500/15 text-pink-400",
};

const typeLabels: Record<string, string> = {
  resource: "Resource",
  tool: "Tool",
  dataset: "Dataset",
  incident: "Incident",
  paper: "Paper",
  standard: "Standard",
  researcher: "Researcher",
};

export default function GlobalSearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length >= 2) {
      const r = searchAll(query);
      setResults(r);
      setShowDropdown(true);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0) setShowDropdown(true); }}
          placeholder="Search tools, datasets, papers, incidents, RFCs, researchers..."
          className="w-full pl-10 pr-4 py-3 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        />
      </div>

      {showDropdown && results.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-1 rounded-xl shadow-2xl overflow-hidden z-[100] max-h-[400px] overflow-y-auto"
          style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="px-3 py-2 text-xs font-medium" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>
            {results.length} results found
          </div>
          {results.map((r, i) => (
            <Link
              key={`${r.type}-${r.id}-${i}`}
              to={r.link}
              onClick={() => setShowDropdown(false)}
              className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-[var(--bg-secondary)]"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded font-medium ${typeColors[r.type]}`}>
                {typeLabels[r.type]}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                  {r.name}
                </div>
                <div className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {r.description.slice(0, 100)}...
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {showDropdown && results.length === 0 && query.trim().length >= 2 && (
        <div
          className="absolute top-full left-0 right-0 mt-1 rounded-xl shadow-2xl p-6 text-center z-[100]"
          style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>No results for "{query}"</p>
        </div>
      )}
    </div>
  );
}
