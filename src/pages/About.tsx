import { Shield, Heart, Target, Users, BookOpen, Database, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "../components/common/SectionHeader";

const audience = [
  { icon: <Users className="h-5 w-5 text-blue-400" />, title: "RPKI 研究人员", desc: "Researchers studying RPKI deployment, adoption, and validator implementations" },
  { icon: <Users className="h-5 w-5 text-cyan-400" />, title: "BGP 安全研究人员", desc: "Researchers analyzing BGP routing security, hijacks, and leaks" },
  { icon: <Database className="h-5 w-5 text-purple-400" />, title: "网络测量研究人员", desc: "Researchers conducting internet measurement studies" },
  { icon: <Wrench className="h-5 w-5 text-amber-400" />, title: "路由异常检测研究人员", desc: "Researchers developing anomaly detection methods for BGP" },
  { icon: <Shield className="h-5 w-5 text-green-400" />, title: "网络运维人员", desc: "Network operators deploying ROV and routing security measures" },
  { icon: <BookOpen className="h-5 w-5 text-pink-400" />, title: "刚入门的研究生", desc: "Graduate students new to routing security research" },
];

const futurePlans = [
  "Access RIPEstat API for live RPKI/ROA/prefix queries",
  "Access CAIDA ASRank API for AS hierarchy analysis",
  "Access BGPKIT Broker API for data discovery",
  "AS Knowledge Graph interactive visualization",
  "Prefix / ASN / ROA live query interface",
  "Incident reproduction experiment templates",
  "Paper reproduction package bundles",
  "Weekly Routing Security Digest",
];

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeader
        title="About RouteSecHub"
        subtitle="RouteSecHub 是一个面向 RPKI 与 BGP 路由安全研究的一站式导航与研究工作台"
        icon={<Shield className="h-6 w-6" />}
      />

      {/* Vision */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-400" /> Project Vision
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          RouteSecHub aims to be the practical entry point for RPKI and BGP routing security researchers.
          Instead of maintaining scattered bookmarks, researchers can find tools, data sources, papers,
          RFCs, classic incidents, and experimental scripts all in one place.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed mt-3">
          RouteSecHub 希望成为 RPKI 和 BGP 路由安全研究人员的实用入口，帮助研究者更快找到工具、数据、论文、标准和实验路径。
          我们不是简单的网址收藏夹，而是按研究任务组织资源的工作台。
        </p>
      </div>

      {/* Audience */}
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Target Audience</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {audience.map((item) => (
          <div key={item.title} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="shrink-0">{item.icon}</div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Researchers */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          <Users className="h-5 w-5 inline mr-2 text-blue-400" />
          Key Researchers in Routing Security
        </h2>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          Explore profiles of leading researchers in RPKI, BGP routing security, and internet measurement.
          Includes RFC authors, ASPA/ASRA draft contributors, and academic researchers.
        </p>
        <Link
          to="/researchers"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-sm text-blue-400 transition-all hover:-translate-y-0.5"
        >
          <Users className="h-4 w-4" /> Browse Researchers →
        </Link>
      </div>

      {/* Technical Architecture */}
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Technical Architecture</h2>
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 mb-8">
        <p className="text-sm text-[var(--text-secondary)] mb-4">
          Built with modern web technologies, designed for extensibility and open-source collaboration.
        </p>
        <div className="flex flex-wrap gap-3">
          {["React 19", "TypeScript", "Vite 8", "Tailwind CSS 4", "react-router-dom 7", "lucide-react"].map((tech) => (
            <span key={tech} className="text-xs px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] text-blue-400 border border-blue-500/20">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Data Sources */}
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Data Sources</h2>
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 mb-8">
        <p className="text-sm text-[var(--text-secondary)]">
          Data is currently sourced from static files for rapid development and easy contributions.
          The architecture is designed for seamless migration to live API queries in the future.
        </p>
      </div>

      {/* Roadmap */}
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Future Plans</h2>
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {futurePlans.map((plan) => (
            <div key={plan} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
              <span className="text-blue-400 mt-0.5">◈</span>
              {plan}
            </div>
          ))}
        </div>
      </div>

      {/* Contributing */}
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Contributing</h2>
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 mb-8">
        <p className="text-sm text-[var(--text-secondary)] mb-4">
          RouteSecHub is open source. Contributions are welcome whether it's adding new data sources,
          fixing bugs, improving documentation, or suggesting new features.
        </p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          <Github className="h-5 w-5" /> Contribute on GitHub
        </a>
      </div>

      {/* License */}
      <p className="text-xs text-[var(--text-muted)] text-center">
        Built with <Heart className="h-3 w-3 inline text-red-400" /> for the routing security research community.
        MIT License.
      </p>
    </div>
  );
}


function Github({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}
