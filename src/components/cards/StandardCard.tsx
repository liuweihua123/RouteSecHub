import { ExternalLink } from "lucide-react";
import type { Standard } from "../../types";
import Tag from "../common/Tag";

interface StandardCardProps {
  standard: Standard;
}

export default function StandardCard({ standard }: StandardCardProps) {
  return (
    <div className="bg-[var(--bg-card)] rounded-xl p-5 card-hover">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-base font-semibold text-[var(--text-primary)] leading-snug">
            {standard.name}
          </h3>
          <span className="text-sm font-mono text-cyan-400">{standard.rfcNumber}</span>
        </div>
      </div>
      <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
        {standard.category}
      </span>
      <p className="text-sm text-[var(--text-secondary)] mb-2">{standard.summary}</p>
      <p className="text-xs text-[var(--text-muted)] mb-3">🎯 Solves: {standard.solvesProblem}</p>
      <p className="text-xs text-[var(--text-muted)] mb-3">👤 Audience: {standard.audience}</p>
      {standard.relatedTools.length > 0 && (
        <p className="text-xs text-[var(--text-muted)] mb-3">
          🔧 Related: {standard.relatedTools.join(", ")}
        </p>
      )}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {standard.tags.map((tag) => (
          <Tag key={tag} label={tag} size="sm" />
        ))}
      </div>
      <div className="pt-2 border-t border-[var(--border)]">
        <a
          href={standard.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ExternalLink className="h-3 w-3" /> View Standard
        </a>
      </div>
    </div>
  );
}
