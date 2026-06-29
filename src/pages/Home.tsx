import { Link } from "react-router-dom";
import {
  Shield, Database, Network, AlertTriangle, GitBranch, CheckCircle, BookOpen, FlaskConical,
  FileText, ArrowRight, Globe, Zap, Users, BarChart3, ShieldAlert,
} from "lucide-react";
import GlobalSearchBar from "../components/common/GlobalSearchBar";
import StatCard from "../components/common/StatCard";
import IncidentCard from "../components/cards/IncidentCard";
import { incidents } from "../data/incidents";
import { resources } from "../data/resources";
import { useI18n } from "../contexts/I18nContext";

export default function Home() {
  const { t, td } = useI18n();

  const quickEntries = [
    { title: t("quick.rpki"), desc: t("quick.rpki_desc"), icon: <CheckCircle className="h-5 w-5" />, to: "/datasets", color: "from-cyan-500/20 to-cyan-500/5" },
    { title: t("quick.bgp"), desc: t("quick.bgp_desc"), icon: <Database className="h-5 w-5" />, to: "/datasets", color: "from-blue-500/20 to-blue-500/5" },
    { title: t("quick.as"), desc: t("quick.as_desc"), icon: <Network className="h-5 w-5" />, to: "/research-tasks", color: "from-purple-500/20 to-purple-500/5" },
    { title: t("quick.hijack"), desc: t("quick.hijack_desc"), icon: <ShieldAlert className="h-5 w-5" />, to: "/incidents", color: "from-red-500/20 to-red-500/5" },
    { title: t("quick.leak"), desc: t("quick.leak_desc"), icon: <AlertTriangle className="h-5 w-5" />, to: "/incidents", color: "from-amber-500/20 to-amber-500/5" },
    { title: t("quick.validator"), desc: t("quick.validator_desc"), icon: <Shield className="h-5 w-5" />, to: "/validators", color: "from-green-500/20 to-green-500/5" },
    { title: t("quick.papers"), desc: t("quick.papers_desc"), icon: <FileText className="h-5 w-5" />, to: "/papers", color: "from-pink-500/20 to-pink-500/5" },
    { title: t("quick.script"), desc: t("quick.script_desc"), icon: <FlaskConical className="h-5 w-5" />, to: "/script-generator", color: "from-orange-500/20 to-orange-500/5" },
  ];

  const taskEntries = [
    { name: t("task.hijack"), icon: <ShieldAlert className="h-5 w-5 text-red-400" /> },
    { name: t("task.leak"), icon: <GitBranch className="h-5 w-5 text-amber-400" /> },
    { name: t("task.rpki"), icon: <CheckCircle className="h-5 w-5 text-cyan-400" /> },
    { name: t("task.as"), icon: <Network className="h-5 w-5 text-purple-400" /> },
    { name: t("task.download"), icon: <Database className="h-5 w-5 text-blue-400" /> },
    { name: t("task.paper"), icon: <BookOpen className="h-5 w-5 text-pink-400" /> },
    { name: t("task.learn"), icon: <Users className="h-5 w-5 text-green-400" /> },
    { name: t("task.source"), icon: <BarChart3 className="h-5 w-5 text-orange-400" /> },
  ];

  const floatingKeywords = ["RPKI", "BGP", "AS", "ROA", "VRP", "ROV", "Prefix", "ASN", "Hijack", "Leak", "MANRS"];

  const featuredResources = resources.filter((r) =>
    ["routeviews", "ripe-ris", "bgpstream", "bgpkit-broker", "caida-asrank", "ripestat", "routinator", "manrs"].includes(r.id)
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-grid py-20 md:py-28 px-4" style={{ zIndex: 10, isolation: "isolate" }}>
        {/* Decorative blobs - contained so they don't overflow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float-delay" />
          <div className="absolute top-40 right-1/4 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl animate-float-delay2" />
          {floatingKeywords.map((kw, i) => (
            <span key={i} className="absolute text-xs font-mono font-bold select-none opacity-[0.06]"
              style={{ top: `${15 + (i * 7) % 70}%`, left: `${5 + (i * 13) % 85}%`, color: "#3b82f6" }}>
              {kw}
            </span>
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
            <Zap className="h-3 w-3" /> {t("home.badge")}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4"><span className="gradient-text">RouteSecHub</span></h1>
          <p className="text-lg md:text-xl mb-3" style={{ color: "var(--text-secondary)" }}>{t("home.subtitle")}</p>
          <p className="text-sm mb-8 max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>{t("home.subtitle_zh")}</p>
          <div className="max-w-xl mx-auto">
            <GlobalSearchBar />
          </div>
        </div>
      </section>

      {/* Quick Entry */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>{t("home.quick")}</h2>
        <p className="mb-8" style={{ color: "var(--text-secondary)" }}>{t("home.quick_sub")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickEntries.map((entry) => (
            <Link key={entry.title} to={entry.to}
              className={`bg-gradient-to-br ${entry.color} rounded-xl p-4 hover:border-blue-500/50 transition-all hover:-translate-y-1 group`}
              style={{ border: "1px solid var(--border)" }}>
              <div className="text-blue-400 mb-3">{entry.icon}</div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{entry.title}</h3>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{entry.desc}</p>
              <ArrowRight className="h-4 w-4 mt-2 group-hover:text-blue-400 transition-colors" style={{ color: "var(--text-muted)" }} />
            </Link>
          ))}
        </div>
      </section>

      {/* Research Tasks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>{t("home.tasks")}</h2>
        <p className="mb-8" style={{ color: "var(--text-secondary)" }}>{t("home.tasks_sub")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {taskEntries.map((task) => (
            <Link key={task.name} to="/research-tasks"
              className="flex items-center gap-3 rounded-lg px-4 py-3 hover:border-blue-500/40 transition-all hover:-translate-y-0.5 group"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
              {task.icon}
              <span className="text-sm group-hover:opacity-100 transition-opacity" style={{ color: "var(--text-secondary)" }}>{task.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Resources */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>{t("home.featured")}</h2>
            <p style={{ color: "var(--text-secondary)" }}>{t("home.featured_sub")}</p>
          </div>
          <Link to="/datasets" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
            {t("home.viewAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredResources.map((r) => (
            <a key={r.id} href={r.website || "#"} target="_blank" rel="noopener noreferrer"
              className="rounded-xl p-4 hover:border-blue-500/40 transition-all hover:-translate-y-1"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-blue-400" />
                <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{r.name}</h3>
              </div>
              <p className="text-xs line-clamp-2" style={{ color: "var(--text-secondary)" }}>{td(r.id, r.description)}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Incidents */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>{t("home.incidents")}</h2>
            <p style={{ color: "var(--text-secondary)" }}>{t("home.incidents_sub")}</p>
          </div>
          <Link to="/incidents" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
            {t("home.viewAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {incidents.slice(0, 6).map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard label={t("home.stats.datasets")} value="40+" icon={<Database className="h-5 w-5" />} color="blue" />
          <StatCard label={t("home.stats.tools")} value="23+" icon={<Shield className="h-5 w-5" />} color="cyan" />
          <StatCard label={t("home.stats.incidents")} value="7" icon={<AlertTriangle className="h-5 w-5" />} color="amber" />
          <StatCard label={t("home.stats.papers")} value="11" icon={<FileText className="h-5 w-5" />} color="purple" />
          <StatCard label={t("home.stats.standards")} value="26+" icon={<BookOpen className="h-5 w-5" />} color="green" />
        </div>
      </section>
    </div>
  );
}
