import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { useI18n } from "../../contexts/I18nContext";

export default function Footer() {
  const { t } = useI18n();

  const quickLinks = [
    { label: t("nav.research"), to: "/research-tasks" },
    { label: t("nav.datasets"), to: "/datasets" },
    { label: t("nav.tools"), to: "/tools" },
    { label: t("nav.validators"), to: "/validators" },
  ];

  const resources = [
    { label: t("nav.papers"), to: "/papers" },
    { label: t("nav.standards"), to: "/standards" },
    { label: t("nav.learning"), to: "/learning-path" },
    { label: t("nav.incidents"), to: "/incidents" },
  ];

  return (
    <footer className="border-t" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-blue-400" />
              <span className="text-base font-bold gradient-text">RouteSecHub</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-secondary)" }}>
              {t("footer.desc")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>{t("footer.quick")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm transition-colors hover:opacity-80" style={{ color: "var(--text-secondary)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>{t("footer.resources")}</h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm transition-colors hover:opacity-80" style={{ color: "var(--text-secondary)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>{t("footer.community")}</h3>
            <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>{t("footer.community_desc")}</p>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-80" style={{ color: "var(--text-secondary)" }}>
              <Github /> GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs text-center" style={{ color: "var(--text-secondary)" }}>
            &copy; {new Date().getFullYear()} {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}

function Github({ className }: { className?: string }) {
  return (
    <svg className={className || "h-4 w-4"} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}
