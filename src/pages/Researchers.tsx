import { useState, useMemo } from "react";
import { Users, ExternalLink } from "lucide-react";
import SectionHeader from "../components/common/SectionHeader";
import SearchBar from "../components/common/SearchBar";
import Tag from "../components/common/Tag";
import { researchers } from "../data/researchers";

export default function Researchers() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return researchers;
    const q = query.toLowerCase();
    return researchers.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.affiliation.toLowerCase().includes(q) ||
        r.bio.toLowerCase().includes(q) ||
        r.focus.some((f) => f.toLowerCase().includes(q)) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeader
        title="Key Researchers"
        subtitle="RPKI 与 BGP 路由安全领域的重要研究人员 — Key researchers in RPKI, BGP routing security, and internet measurement"
        icon={<Users className="h-6 w-6" />}
      />

      <div className="mb-8">
        <SearchBar value={query} onChange={setQuery} placeholder="Search researchers by name, affiliation, focus area..." />
      </div>

      <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
        Showing {filtered.length} of {researchers.length} researchers
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="rounded-xl p-5 card-hover"
            style={{ backgroundColor: "var(--bg-card)" }}
          >
            {/* Header */}
            <div className="flex items-start gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                  {r.name}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {r.title} · {r.affiliation}
                </p>
              </div>
            </div>

            {/* Focus areas */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {r.focus.map((f) => (
                <span
                  key={f}
                  className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                >
                  {f}
                </span>
              ))}
            </div>

            {/* Bio */}
            <p className="text-sm mb-3 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {r.bio}
            </p>

            {/* Key contributions */}
            <div className="mb-3">
              <h4 className="text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)" }}>
                Key Contributions
              </h4>
              <ul className="space-y-1">
                {r.keyContributions.slice(0, 3).map((c, i) => (
                  <li key={i} className="text-xs flex items-start gap-2" style={{ color: "var(--text-secondary)" }}>
                    <span className="text-blue-400 mt-0.5">◈</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {r.tags.map((t) => (
                <Tag key={t} label={t} size="sm" />
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3 pt-2 border-t" style={{ borderColor: "var(--border)" }}>
              {r.homepage && (
                <a
                  href={r.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <ExternalLink className="h-3 w-3" /> Homepage
                </a>
              )}
              {r.googleScholar && (
                <a
                  href={r.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <ExternalLink className="h-3 w-3" /> Scholar
                </a>
              )}
              {r.github && (
                <a
                  href={r.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <ExternalLink className="h-3 w-3" /> GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
