import { Calendar } from "lucide-react";
import type { Incident, IncidentType } from "../../types";
import Tag from "../common/Tag";

interface IncidentCardProps {
  incident: Incident;
  onClick?: () => void;
}

const typeColors: Record<IncidentType, string> = {
  "Route Hijack": "bg-red-500/15 text-red-400 border-red-500/30",
  "Route Leak": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "RPKI Invalid": "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  Misconfiguration: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Outage: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  "Prefix Leak": "bg-pink-500/15 text-pink-400 border-pink-500/30",
  "AS Path Manipulation": "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
};

export default function IncidentCard({ incident, onClick }: IncidentCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-[var(--bg-card)] rounded-xl p-5 card-hover ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{incident.name}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${typeColors[incident.type]}`}>
          {incident.type}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
        <Calendar className="h-3 w-3" />
        <span>{incident.startTimeUtc} UTC</span>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">{incident.description}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {incident.involvedASNs.slice(0, 3).map((asn) => (
          <span
            key={asn}
            className="text-xs px-2 py-0.5 rounded bg-[var(--code-bg)] text-[var(--text-primary)] border border-[var(--code-border)]"
          >
            {asn}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {incident.tags.slice(0, 4).map((tag) => (
          <Tag key={tag} label={tag} size="sm" />
        ))}
      </div>
    </div>
  );
}
