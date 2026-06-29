import { ExternalLink, Code, Database } from "lucide-react";
import type { Paper } from "../../types";
import Tag from "../common/Tag";

interface PaperCardProps {
  paper: Paper;
}

const reproColors = {
  Low: "bg-green-500/15 text-green-400 border-green-500/30",
  Medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  High: "bg-red-500/15 text-red-400 border-red-500/30",
};

export default function PaperCard({ paper }: PaperCardProps) {
  return (
    <div className="bg-[var(--bg-card)] rounded-xl p-5 card-hover">
      <div className="flex items-start justify-between mb-1">
        <span className="text-xs text-blue-400 font-medium">{paper.direction}</span>
        <span className="text-xs text-[var(--text-muted)]">{paper.year}</span>
      </div>
      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1 leading-snug">
        {paper.title}
      </h3>
      {paper.authors && (
        <p className="text-xs text-[var(--text-muted)] mb-2">{paper.authors}</p>
      )}
      <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">{paper.summary}</p>

      <div className="flex flex-wrap gap-2 mb-3 text-xs">
        <span className={`px-2 py-0.5 rounded-full border ${reproColors[paper.reproducibility]}`}>
          Repro: {paper.reproducibility}
        </span>
        {paper.hasCode && (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">
            <Code className="h-3 w-3" /> Code
          </span>
        )}
        {paper.hasPublicData && (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Database className="h-3 w-3" /> Data
          </span>
        )}
      </div>

      {paper.dataSources.length > 0 && (
        <p className="text-xs text-[var(--text-muted)] mb-3">
          Data: {paper.dataSources.join(", ")}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5 mb-3">
        {paper.tags.slice(0, 4).map((tag) => (
          <Tag key={tag} label={tag} size="sm" />
        ))}
      </div>

      {paper.link && paper.link !== "#" && (
        <div className="pt-2 border-t border-[var(--border)]">
          <a
            href={paper.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ExternalLink className="h-3 w-3" /> Read Paper
          </a>
        </div>
      )}
    </div>
  );
}
