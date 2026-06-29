import { useState } from "react";
import { ChevronDown, ChevronRight, GraduationCap } from "lucide-react";
import SectionHeader from "../components/common/SectionHeader";
import Tag from "../components/common/Tag";
import { learningPath } from "../data/learningPath";

export default function LearningPath() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({ 1: true, 2: true });

  const toggle = (level: number) => {
    setExpanded((prev) => ({ ...prev, [level]: !prev[level] }));
  };

  const colors = [
    { dot: "bg-blue-500", line: "bg-blue-500/30", accent: "text-blue-400", border: "border-blue-500/30" },
    { dot: "bg-cyan-500", line: "bg-cyan-500/30", accent: "text-cyan-400", border: "border-cyan-500/30" },
    { dot: "bg-teal-500", line: "bg-teal-500/30", accent: "text-teal-400", border: "border-teal-500/30" },
    { dot: "bg-green-500", line: "bg-green-500/30", accent: "text-green-400", border: "border-green-500/30" },
    { dot: "bg-amber-500", line: "bg-amber-500/30", accent: "text-amber-400", border: "border-amber-500/30" },
    { dot: "bg-purple-500", line: "bg-purple-500/30", accent: "text-purple-400", border: "border-purple-500/30" },
    { dot: "bg-pink-500", line: "bg-pink-500/30", accent: "text-pink-400", border: "border-pink-500/30" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeader
        title="Learning Path"
        subtitle="为路由安全研究新手设计的学习路线 — A structured learning path for routing security research"
        icon={<GraduationCap className="h-6 w-6" />}
      />

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-[#2a3150] hidden md:block" />

        <div className="space-y-6">
          {learningPath.map((level) => {
            const c = colors[(level.level - 1) % colors.length];
            const isExpanded = expanded[level.level];

            return (
              <div key={level.level} className="relative md:pl-16">
                {/* Timeline dot */}
                <div className={`hidden md:flex absolute left-[15px] w-[18px] h-[18px] rounded-full ${c.dot} border-[3px] border-[#0a0e1a] z-10 items-center justify-center`} />

                <div className={`bg-[var(--bg-card)] border ${c.border} rounded-xl overflow-hidden transition-all`}>
                  <button
                    onClick={() => toggle(level.level)}
                    className="w-full flex items-center justify-between p-5 hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg ${c.dot} bg-opacity-20 flex items-center justify-center text-sm font-bold ${c.accent}`}>
                        {level.level}
                      </span>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{level.title}</h3>
                        <p className="text-sm text-[var(--text-secondary)]">{level.description}</p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-[var(--text-muted)] shrink-0" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-[var(--text-muted)] shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 space-y-4 border-t border-[var(--border)] pt-4">
                      {/* Objectives */}
                      <div>
                        <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">🎯 Learning Objectives</h4>
                        <ul className="space-y-1">
                          {level.objectives.map((obj, i) => (
                            <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              {obj}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Resources */}
                      {level.resources.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">📚 Recommended Resources</h4>
                          <ul className="space-y-1">
                            {level.resources.map((r, i) => (
                              <li key={i}>
                                <a
                                  href={r.link.startsWith("http") ? r.link : `${window.location.origin}${r.link}`}
                                  target={r.link.startsWith("http") ? "_blank" : undefined}
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                  {r.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Experiment */}
                      {level.experiment && (
                        <div>
                          <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">🧪 Suggested Experiment</h4>
                          <p className="text-sm text-[var(--text-secondary)]">{level.experiment}</p>
                        </div>
                      )}

                      {/* Paper Directions */}
                      {level.paperDirections.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">📄 Paper Directions</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {level.paperDirections.map((dir) => (
                              <Tag key={dir} label={dir} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
