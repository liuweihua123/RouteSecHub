import { Link } from "react-router-dom";
import {
  ShieldAlert, GitBranch, CheckCircle, Database, Network, FlaskConical, ArrowRight,
} from "lucide-react";
import SectionHeader from "../components/common/SectionHeader";
import Tag from "../components/common/Tag";
import { researchTasks } from "../data/researchTasks";

const iconMap: Record<string, React.ReactNode> = {
  ShieldAlert: <ShieldAlert className="h-8 w-8 text-red-400" />,
  GitBranch: <GitBranch className="h-8 w-8 text-amber-400" />,
  CheckCircle: <CheckCircle className="h-8 w-8 text-cyan-400" />,
  Database: <Database className="h-8 w-8 text-blue-400" />,
  Network: <Network className="h-8 w-8 text-purple-400" />,
  FlaskConical: <FlaskConical className="h-8 w-8 text-green-400" />,
};

export default function ResearchTasks() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeader
        title="Research Tasks"
        subtitle="按研究任务组织资源 — Find resources organized by what you want to do"
        icon={<FlaskConical className="h-6 w-6" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {researchTasks.map((task) => (
          <div key={task.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 card-hover">
            <div className="flex items-start gap-4 mb-4">
              <div className="shrink-0 w-12 h-12 bg-[var(--bg-secondary)] rounded-lg flex items-center justify-center">
                {iconMap[task.icon] || <Database className="h-8 w-8 text-blue-400" />}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">{task.name}</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{task.description}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <p className="text-xs text-[var(--text-muted)] mb-1.5 font-medium">Recommended Data Sources</p>
                <div className="flex flex-wrap gap-1.5">
                  {task.dataSources.map((ds) => (
                    <Tag key={ds} label={ds} size="sm" />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)] mb-1.5 font-medium">Recommended Tools</p>
                <div className="flex flex-wrap gap-1.5">
                  {task.tools.map((t) => (
                    <Tag key={t} label={t} size="sm" />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)] mb-1.5 font-medium">Paper Directions</p>
                <div className="flex flex-wrap gap-1.5">
                  {task.paperDirections.map((p) => (
                    <Tag key={p} label={p} size="sm" />
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/datasets"
              className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              View Resources <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
