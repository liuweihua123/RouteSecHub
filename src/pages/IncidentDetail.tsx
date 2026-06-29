import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, AlertTriangle, Calendar, ExternalLink, Shield, FlaskConical, Clock,
  MapPin, Tags as TagsIcon,
} from "lucide-react";
import Tag from "../components/common/Tag";
import { incidents } from "../data/incidents";

const typeColors: Record<string, string> = {
  "Route Hijack": "bg-red-500/15 text-red-400 border-red-500/30",
  "Route Leak": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "RPKI Invalid": "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  Misconfiguration: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Outage: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  "Prefix Leak": "bg-pink-500/15 text-pink-400 border-pink-500/30",
  "AS Path Manipulation": "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
};

export default function IncidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const incident = incidents.find((i) => i.id === id);

  if (!incident) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <AlertTriangle className="h-12 w-12 text-[var(--border)] mx-auto mb-4" />
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Incident Not Found</h2>
        <p className="text-[var(--text-secondary)] mb-6">The incident you're looking for doesn't exist.</p>
        <Link to="/incidents" className="text-blue-400 hover:text-blue-300">
          &larr; Back to Incidents
        </Link>
      </div>
    );
  }

  const handleGenerateScript = () => {
    navigate("/script-generator", {
      state: {
        eventName: incident.name,
        startTimeUtc: incident.startTimeUtc,
        endTimeUtc: incident.endTimeUtc || incident.startTimeUtc,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link to="/incidents" className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Incidents
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className={`text-xs px-2.5 py-1 rounded-full border ${typeColors[incident.type] || typeColors["Route Hijack"]}`}>
            {incident.type}
          </span>
          <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
            <Calendar className="h-3 w-3" /> {incident.startTimeUtc} UTC
          </span>
        </div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-3">{incident.name}</h1>
        <p className="text-base text-[var(--text-secondary)] leading-relaxed">{incident.description}</p>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-400" /> Involved ASNs
          </h3>
          <div className="flex flex-wrap gap-2">
            {incident.involvedASNs.map((asn) => (
              <span key={asn} className="text-xs px-2 py-1 rounded bg-[var(--code-bg)] text-[var(--text-primary)] font-mono border border-[var(--code-border)]">
                {asn}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-cyan-400" /> Affected Prefixes
          </h3>
          <div className="flex flex-wrap gap-2">
            {incident.affectedPrefixes.map((p, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded bg-[var(--code-bg)] text-[var(--text-primary)] font-mono border border-[var(--code-border)]">
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <TagsIcon className="h-4 w-4 text-purple-400" /> Recommended Data Sources
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {incident.recommendedDataSources.map((ds) => (
              <Tag key={ds} label={ds} />
            ))}
          </div>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-400" /> Recommended Window
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">{incident.recommendedWindow}</p>
        </div>
      </div>

      {/* Timeline */}
      {incident.timeline && incident.timeline.length > 0 && (
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-400" /> Timeline
          </h3>
          <div className="relative">
            <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-[#2a3150]" />
            {incident.timeline.map((event, i) => (
              <div key={i} className="flex items-start gap-4 pb-4 last:pb-0 relative">
                <div className="shrink-0 w-[15px] h-[15px] rounded-full bg-blue-500 border-[3px] border-[#1a1f35] mt-1 z-10" />
                <div>
                  <span className="text-xs font-mono text-cyan-400">{event.time}</span>
                  <p className="text-sm text-[var(--text-primary)]">{event.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Steps */}
      {incident.analysisSteps && incident.analysisSteps.length > 0 && (
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-purple-400" /> Analysis Steps
          </h3>
          <ol className="space-y-2">
            {incident.analysisSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                <span className="shrink-0 w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center text-xs font-medium">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Related Research */}
      {incident.researchUseCases.length > 0 && (
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Research Use Cases</h3>
          <div className="flex flex-wrap gap-2">
            {incident.researchUseCases.map((uc) => (
              <Tag key={uc} label={uc} />
            ))}
          </div>
        </div>
      )}

      {/* Generate Script */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Analyze This Incident</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Generate a BGP data fetching script for this incident's time window
            </p>
          </div>
          <button
            onClick={handleGenerateScript}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-sm text-blue-400 transition-all hover:-translate-y-0.5"
          >
            <FlaskConical className="h-4 w-4" />
            Generate Script
          </button>
        </div>
      </div>

      {/* Related Papers */}
      {incident.relatedPapers && incident.relatedPapers.length > 0 && (
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Related Research Directions</h3>
          <div className="flex flex-wrap gap-2">
            {incident.relatedPapers.map((rp) => (
              <Link key={rp} to="/papers" className="text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2">
                {rp}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      {incident.links.length > 0 && (
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">External Resources</h3>
          <div className="space-y-2">
            {incident.links.map((link, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ExternalLink className="h-4 w-4" /> {link}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {incident.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
    </div>
  );
}
