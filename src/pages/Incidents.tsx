import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Filter } from "lucide-react";
import SectionHeader from "../components/common/SectionHeader";
import SearchBar from "../components/common/SearchBar";
import IncidentCard from "../components/cards/IncidentCard";
import { incidents } from "../data/incidents";
import type { IncidentType } from "../types";

const incidentTypes: IncidentType[] = [
  "Route Hijack", "Route Leak", "RPKI Invalid", "Misconfiguration", "Outage", "Prefix Leak", "AS Path Manipulation"
];

export default function Incidents() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<string>("");

  const years = useMemo(() => {
    const y = new Set(incidents.map((i) => i.startTimeUtc.substring(0, 4)));
    return Array.from(y).sort();
  }, []);

  const filtered = useMemo(() => {
    let items = incidents;
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (typeFilter) items = items.filter((i) => i.type === typeFilter);
    if (yearFilter) items = items.filter((i) => i.startTimeUtc.startsWith(yearFilter));
    return items;
  }, [query, typeFilter, yearFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeader
        title="Routing Security Incidents"
        subtitle="经典路由安全事件库 — A curated collection of significant routing security incidents for research and analysis"
        icon={<AlertTriangle className="h-6 w-6" />}
      />

      <div className="space-y-4 mb-8">
        <SearchBar value={query} onChange={setQuery} placeholder="Search incidents by name, description, or tags..." />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTypeFilter("")}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              !typeFilter
                ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--border-accent)]"
            }`}
          >
            All
          </button>
          {incidentTypes.map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type === typeFilter ? "" : type)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                type === typeFilter
                  ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--border-accent)]"
              }`}
            >
              {type}
            </button>
          ))}

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="ml-auto text-xs px-3 py-1.5 rounded-lg bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border)] focus:outline-none focus:border-blue-500"
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm text-[var(--text-muted)] mb-4">
        Showing {filtered.length} of {incidents.length} incidents
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Filter className="h-10 w-10 text-[var(--border)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)] text-lg font-medium">No incidents found</p>
          <p className="text-[var(--text-muted)] text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((incident) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              onClick={() => navigate(`/incidents/${incident.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
