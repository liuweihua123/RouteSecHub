import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X, Sun, Moon, Languages } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useI18n } from "../../contexts/I18nContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang, t } = useI18n();

  const navLinks = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.research"), to: "/research-tasks" },
    { label: t("nav.datasets"), to: "/datasets" },
    { label: t("nav.tools"), to: "/tools" },
    { label: t("nav.validators"), to: "/validators" },
    { label: t("nav.incidents"), to: "/incidents" },
    { label: t("nav.papers"), to: "/papers" },
    { label: t("nav.standards"), to: "/standards" },
    { label: t("nav.script"), to: "/script-generator" },
    { label: t("nav.learning"), to: "/learning-path" },
    { label: t("nav.researchers"), to: "/researchers" },
    { label: t("nav.about"), to: "/about" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border)", opacity: 0.95 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            onClick={() => setMobileOpen(false)}
          >
            <Shield className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-bold gradient-text">RouteSecHub</span>
          </Link>

          <div className="hidden xl:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-2 py-1.5 text-[11px] font-medium rounded transition-colors whitespace-nowrap ${
                  isActive(link.to)
                    ? "text-blue-400"
                    : ""
                }`}
                style={!isActive(link.to) ? { color: "var(--text-secondary)" } : undefined}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-blue-400 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2 py-1.5 rounded text-xs font-medium transition-colors"
              style={{ color: "var(--text-secondary)" }}
              title={lang === "en" ? "Switch to Chinese" : "Switch to English"}
            >
              <Languages className="h-4 w-4" />
              {lang === "en" ? "中" : "EN"}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded transition-colors"
              style={{ color: "var(--text-secondary)" }}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="xl:hidden p-1.5 rounded transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="xl:hidden border-t backdrop-blur-md" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-primary)" }}>
          <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 text-sm font-medium rounded transition-colors ${
                  isActive(link.to)
                    ? "text-blue-400"
                    : ""
                }`}
                style={!isActive(link.to) ? { color: "var(--text-secondary)" } : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
