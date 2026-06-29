import { Shield, CheckCircle, XCircle, ExternalLink } from "lucide-react";
import SectionHeader from "../components/common/SectionHeader";

interface ValidatorItem {
  id: string;
  name: string;
  language: string;
  maintainer: string;
  isActive: boolean;
  productionReady: boolean;
  researchFriendly: boolean;
  supportsRTR: boolean;
  features: string;
  recommendedFor: string;
  link: string;
  isLegacy?: boolean;
}

const validators: ValidatorItem[] = [
  {
    id: "routinator",
    name: "Routinator",
    language: "Rust",
    maintainer: "NLnet Labs",
    isActive: true,
    productionReady: true,
    researchFriendly: true,
    supportsRTR: true,
    features: "Modular design, multiple RTR servers, extensive logging, Prometheus metrics, experimental ASPA support",
    recommendedFor: "General RPKI/ROV deployment, research experiments, production networks",
    link: "https://www.nlnetlabs.nl/projects/rpki/routinator/",
  },
  {
    id: "rpki-client",
    name: "rpki-client",
    language: "C",
    maintainer: "OpenBSD Project",
    isActive: true,
    productionReady: true,
    researchFriendly: true,
    supportsRTR: true,
    features: "Security-focused design, minimal dependencies, part of OpenBSD base system, portable to Linux",
    recommendedFor: "Production deployment, security-conscious environments, OpenBSD users",
    link: "https://www.rpki-client.org/",
  },
  {
    id: "fort",
    name: "FORT Validator",
    language: "C",
    maintainer: "NIC Mexico",
    isActive: true,
    productionReady: true,
    researchFriendly: true,
    supportsRTR: true,
    features: "Tal (Trust Anchor Locator) support, JSON output, RTR server, configurable validation",
    recommendedFor: "Production ROV deployment, RTR server setup, multi-platform deployment",
    link: "https://nicmx.github.io/FORT-validator/",
  },
  {
    id: "octorpki",
    name: "OctoRPKI",
    language: "Go",
    maintainer: "Cloudflare",
    isActive: true,
    productionReady: true,
    researchFriendly: false,
    supportsRTR: true,
    features: "High performance, designed for Cloudflare's global network, HTTP-based VRP publishing",
    recommendedFor: "Large-scale production deployment, Cloudflare infrastructure, high-throughput environments",
    link: "https://github.com/cloudflare/octorpki",
  },
  {
    id: "ripe-validator",
    name: "RIPE NCC RPKI Validator",
    language: "Java",
    maintainer: "RIPE NCC",
    isActive: false,
    productionReady: false,
    researchFriendly: false,
    supportsRTR: true,
    features: "Legacy validator, superseded by Routinator and other modern implementations",
    recommendedFor: "Not recommended for new deployments",
    link: "https://www.ripe.net/manage-ips-and-asns/resource-management/rpki/rpki-tools/",
    isLegacy: true,
  },
];

export default function Validators() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeader
        title="RPKI Validator Comparison"
        subtitle="Compare RPKI relying party software implementations for Route Origin Validation"
        icon={<Shield className="h-6 w-6" />}
      />

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 mb-8">
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          RPKI Validator 是 RPKI relying party 软件，用于获取、验证 RPKI repository 中的证书、ROA、Manifest、CRL 等对象，
          并生成 VRP（Validated ROA Payload），供路由器进行 Route Origin Validation（ROV）使用。
          The table below compares the major implementations available today.
        </p>
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left text-sm font-semibold text-[var(--text-secondary)] px-4 py-3">Validator</th>
              <th className="text-left text-sm font-semibold text-[var(--text-secondary)] px-4 py-3">Language</th>
              <th className="text-left text-sm font-semibold text-[var(--text-secondary)] px-4 py-3">Maintainer</th>
              <th className="text-center text-sm font-semibold text-[var(--text-secondary)] px-4 py-3">Active</th>
              <th className="text-center text-sm font-semibold text-[var(--text-secondary)] px-4 py-3">Production</th>
              <th className="text-center text-sm font-semibold text-[var(--text-secondary)] px-4 py-3">Research</th>
              <th className="text-center text-sm font-semibold text-[var(--text-secondary)] px-4 py-3">RTR</th>
              <th className="text-left text-sm font-semibold text-[var(--text-secondary)] px-4 py-3">Features</th>
              <th className="text-left text-sm font-semibold text-[var(--text-secondary)] px-4 py-3">Link</th>
            </tr>
          </thead>
          <tbody>
            {validators.map((v) => (
              <tr key={v.id} className={`border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]/50 ${v.isLegacy ? "opacity-50" : ""}`}>
                <td className="px-4 py-4">
                  <span className={`text-sm font-semibold ${v.isLegacy ? "line-through" : ""}`}>{v.name}</span>
                </td>
                <td className="px-4 py-4 text-sm text-[var(--text-secondary)] font-mono">{v.language}</td>
                <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">{v.maintainer}</td>
                <td className="px-4 py-4 text-center">
                  {v.isActive ? (
                    <CheckCircle className="h-4 w-4 text-green-400 inline" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400 inline" />
                  )}
                </td>
                <td className="px-4 py-4 text-center">
                  {v.productionReady ? (
                    <CheckCircle className="h-4 w-4 text-green-400 inline" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400 inline" />
                  )}
                </td>
                <td className="px-4 py-4 text-center">
                  {v.researchFriendly ? (
                    <CheckCircle className="h-4 w-4 text-green-400 inline" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400 inline" />
                  )}
                </td>
                <td className="px-4 py-4 text-center">
                  {v.supportsRTR ? (
                    <CheckCircle className="h-4 w-4 text-green-400 inline" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400 inline" />
                  )}
                </td>
                <td className="px-4 py-4 text-sm text-[var(--text-secondary)] max-w-xs">{v.features}</td>
                <td className="px-4 py-4">
                  <a href={v.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 text-blue-400 hover:text-blue-300" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-4">
        {validators.map((v) => (
          <div key={v.id} className={`bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 ${v.isLegacy ? "opacity-50" : ""}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className={`text-lg font-semibold text-[var(--text-primary)] ${v.isLegacy ? "line-through" : ""}`}>{v.name}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{v.maintainer} · {v.language}</p>
              </div>
              {v.isLegacy && (
                <span className="text-xs px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                  Legacy
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-muted)]">Active:</span>
                {v.isActive ? <CheckCircle className="h-4 w-4 text-green-400" /> : <XCircle className="h-4 w-4 text-red-400" />}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-muted)]">Production:</span>
                {v.productionReady ? <CheckCircle className="h-4 w-4 text-green-400" /> : <XCircle className="h-4 w-4 text-red-400" />}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-muted)]">Research:</span>
                {v.researchFriendly ? <CheckCircle className="h-4 w-4 text-green-400" /> : <XCircle className="h-4 w-4 text-red-400" />}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-muted)]">RTR:</span>
                {v.supportsRTR ? <CheckCircle className="h-4 w-4 text-green-400" /> : <XCircle className="h-4 w-4 text-red-400" />}
              </div>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-3">{v.features}</p>
            <a
              href={v.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <ExternalLink className="h-4 w-4" /> {v.link}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
