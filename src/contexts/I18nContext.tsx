import { createContext, useContext, useState, type ReactNode } from "react";

type Lang = "en" | "zh";

interface I18nContextType {
  lang: Lang;
  toggle: () => void;
  t: (key: string) => string;
  td: (id: string, fallback: string) => string;
}

const I18nContext = createContext<I18nContextType>({ lang: "en", toggle: () => {}, t: (k) => k, td: (_, f) => f });

const translations: Record<string, { en: string; zh: string }> = {
  // Navbar
  "nav.home": { en: "Home", zh: "首页" },
  "nav.research": { en: "Research Tasks", zh: "研究任务" },
  "nav.datasets": { en: "Datasets", zh: "数据源" },
  "nav.tools": { en: "Tools", zh: "工具" },
  "nav.validators": { en: "Validators", zh: "验证器" },
  "nav.incidents": { en: "Incidents", zh: "事件库" },
  "nav.papers": { en: "Papers", zh: "论文" },
  "nav.standards": { en: "Standards", zh: "标准" },
  "nav.script": { en: "Script Generator", zh: "脚本生成器" },
  "nav.learning": { en: "Learning Path", zh: "学习路线" },
  "nav.researchers": { en: "Researchers", zh: "研究人员" },
  "nav.about": { en: "About", zh: "关于" },

  // Home
  "home.badge": { en: "Open Source Research Portal", zh: "开源研究门户" },
  "home.subtitle": { en: "A Practical Research Portal for RPKI and BGP Routing Security", zh: "面向 RPKI 与 BGP 路由安全的实用研究门户" },
  "home.subtitle_zh": { en: "One-stop platform for RPKI, BGP routing security, AS relationship, and routing anomaly detection research.", zh: "面向 RPKI、BGP 路由安全、AS 关系分析、路由异常检测研究的一站式资源、数据、工具与实验导航平台" },
  "home.search": { en: "Search tools, datasets, papers, incidents, RFCs, AS resources...", zh: "搜索工具、数据集、论文、事件、RFC、AS 资源..." },
  "home.quick": { en: "Quick Access", zh: "快速入口" },
  "home.quick_sub": { en: "Jump directly to what you need", zh: "直接跳转到你需要的功能" },
  "home.tasks": { en: "What do I want to do?", zh: "我要做什么？" },
  "home.tasks_sub": { en: "Start from your research task", zh: "从你的研究任务出发" },
  "home.featured": { en: "Featured Resources", zh: "精选资源" },
  "home.featured_sub": { en: "Core data sources and tools for routing security research", zh: "路由安全研究核心数据源与工具" },
  "home.incidents": { en: "Classic Incidents", zh: "经典事件" },
  "home.incidents_sub": { en: "Study routing security incidents to understand real-world threats", zh: "研究路由安全事件，理解真实威胁" },
  "home.viewAll": { en: "View All", zh: "查看全部" },
  "home.stats.datasets": { en: "Datasets & APIs", zh: "数据源 & API" },
  "home.stats.tools": { en: "Tools", zh: "工具" },
  "home.stats.incidents": { en: "Classic Incidents", zh: "经典事件" },
  "home.stats.papers": { en: "Paper Directions", zh: "论文方向" },
  "home.stats.standards": { en: "RFCs & Standards", zh: "RFC & 标准" },

  // Home task entries
  "task.hijack": { en: "Analyze a BGP Hijack", zh: "分析一次 BGP Hijack" },
  "task.leak": { en: "Reproduce Route Leak Event", zh: "复现 Route Leak 事件" },
  "task.rpki": { en: "Query Prefix RPKI Status", zh: "查询 Prefix 的 RPKI 状态" },
  "task.as": { en: "Query AS Upstream/Downstream/Peer", zh: "查询 AS 上游/下游/Peer" },
  "task.download": { en: "Download BGP Updates Data", zh: "下载 BGP Updates 数据" },
  "task.paper": { en: "Write Paper Related Work", zh: "写论文 Related Work" },
  "task.learn": { en: "Learn RPKI & Routing Security", zh: "学习 RPKI 和路由安全基础" },
  "task.source": { en: "Choose Suitable Data Sources", zh: "选择合适的数据源" },

  // Home quick entries
  "quick.rpki": { en: "RPKI / ROA Query", zh: "RPKI / ROA 查询" },
  "quick.rpki_desc": { en: "Query RPKI validation status for prefixes", zh: "查询前缀的 RPKI 验证状态" },
  "quick.bgp": { en: "BGP Data Download", zh: "BGP 数据下载" },
  "quick.bgp_desc": { en: "Download BGP updates and RIB data", zh: "下载 BGP 更新和 RIB 数据" },
  "quick.as": { en: "AS Relationship Analysis", zh: "AS 关系分析" },
  "quick.as_desc": { en: "Analyze AS relationships and topology", zh: "分析 AS 关系和拓扑" },
  "quick.hijack": { en: "Route Hijack Events", zh: "Route Hijack 事件" },
  "quick.hijack_desc": { en: "Study route hijacking incidents", zh: "研究路由劫持事件" },
  "quick.leak": { en: "Route Leak Events", zh: "Route Leak 事件" },
  "quick.leak_desc": { en: "Analyze route leak incidents", zh: "分析路由泄漏事件" },
  "quick.validator": { en: "RPKI Validator", zh: "RPKI Validator" },
  "quick.validator_desc": { en: "Compare RPKI validator implementations", zh: "比较 RPKI 验证器实现" },
  "quick.papers": { en: "Paper Related Work", zh: "论文 Related Work" },
  "quick.papers_desc": { en: "Navigate papers by research direction", zh: "按研究方向浏览论文" },
  "quick.script": { en: "Script Generator", zh: "实验脚本生成器" },
  "quick.script_desc": { en: "Generate BGP data fetching scripts", zh: "生成 BGP 数据抓取脚本" },

  // Pages
  "page.datasets.title": { en: "Datasets & APIs", zh: "数据源 & API" },
  "page.datasets.subtitle": { en: "Curated BGP and routing security data sources for research", zh: "面向研究的 BGP 与路由安全数据源导航" },
  "page.datasets.search": { en: "Search datasets by name, description, or tags...", zh: "按名称、描述或标签搜索数据源..." },
  "page.datasets.hasApi": { en: "Has API", zh: "有 API" },
  "page.datasets.historical": { en: "Historical Data", zh: "历史数据" },
  "page.datasets.realtime": { en: "Real-time Data", zh: "实时数据" },
  "page.datasets.showing": { en: "Showing", zh: "显示" },
  "page.datasets.of": { en: "of", zh: "/" },
  "page.datasets.notfound": { en: "No datasets found", zh: "未找到数据源" },
  "page.datasets.adjust": { en: "Try adjusting your search or filters", zh: "请尝试调整搜索或筛选条件" },

  "page.tools.title": { en: "Tools", zh: "工具" },
  "page.tools.subtitle": { en: "Routing security research tools with recommendations", zh: "路由安全研究工具导航与推荐" },
  "page.tools.search": { en: "Search tools by name, description, or use case...", zh: "按名称、描述或用途搜索工具..." },
  "page.tools.notfound": { en: "No tools found", zh: "未找到工具" },

  "page.incidents.title": { en: "Routing Security Incidents", zh: "路由安全事件库" },
  "page.incidents.subtitle": { en: "A curated collection of significant routing security incidents for research and analysis", zh: "精选路由安全事件集合，用于研究和分析" },
  "page.incidents.search": { en: "Search incidents by name, description, or tags...", zh: "按名称、描述或标签搜索事件..." },
  "page.incidents.notfound": { en: "No incidents found", zh: "未找到事件" },
  "page.incidents.all": { en: "All", zh: "全部" },
  "page.incidents.allYears": { en: "All Years", zh: "所有年份" },

  "page.incident.timeline": { en: "Timeline", zh: "时间线" },
  "page.incident.analysis": { en: "Analysis Steps", zh: "分析步骤" },
  "page.incident.asns": { en: "Involved ASNs", zh: "涉及 ASNs" },
  "page.incident.prefixes": { en: "Affected Prefixes", zh: "受影响前缀" },
  "page.incident.sources": { en: "Recommended Data Sources", zh: "推荐数据源" },
  "page.incident.window": { en: "Recommended Window", zh: "推荐时间窗口" },
  "page.incident.usecases": { en: "Research Use Cases", zh: "研究用例" },
  "page.incident.analyze": { en: "Analyze This Incident", zh: "分析此事件" },
  "page.incident.analyze_desc": { en: "Generate a BGP data fetching script for this incident's time window", zh: "为此事件的时间窗口生成 BGP 数据抓取脚本" },
  "page.incident.generate": { en: "Generate Script", zh: "生成脚本" },
  "page.incident.related_papers": { en: "Related Research Directions", zh: "相关研究方向" },
  "page.incident.external": { en: "External Resources", zh: "外部资源" },
  "page.incident.back": { en: "Back to Incidents", zh: "返回事件列表" },
  "page.incident.notfound": { en: "Incident Not Found", zh: "未找到事件" },
  "page.incident.notfound_desc": { en: "The incident you're looking for doesn't exist.", zh: "你查找的事件不存在。" },

  "page.papers.title": { en: "Papers & Related Work Map", zh: "论文与 Related Work 地图" },
  "page.papers.subtitle": { en: "Papers organized by research direction for routing security", zh: "按研究方向组织的路由安全论文导航" },
  "page.papers.search": { en: "Search papers by title, summary, or tags...", zh: "按标题、摘要或标签搜索论文..." },
  "page.papers.allDir": { en: "All Directions", zh: "所有方向" },
  "page.papers.allRepro": { en: "All Reproducibility", zh: "所有复现难度" },
  "page.papers.codeOnly": { en: "Has Code Only", zh: "仅有代码" },
  "page.papers.notfound": { en: "No papers found", zh: "未找到论文" },

  "page.standards.title": { en: "RFCs & Standards", zh: "RFC 与标准" },
  "page.standards.subtitle": { en: "Standards for RPKI, BGP security, and route origin validation", zh: "RPKI、BGP 安全与路由源验证相关标准" },
  "page.standards.search": { en: "Search standards by RFC number, name, or description...", zh: "按 RFC 编号、名称或描述搜索标准..." },
  "page.standards.notfound": { en: "No standards found", zh: "未找到标准" },

  "page.research.title": { en: "Research Tasks", zh: "研究任务" },
  "page.research.subtitle": { en: "Find resources organized by what you want to do", zh: "按研究任务组织资源 — 从需求出发" },
  "page.research.ds": { en: "Recommended Data Sources", zh: "推荐数据源" },
  "page.research.tools": { en: "Recommended Tools", zh: "推荐工具" },
  "page.research.dirs": { en: "Paper Directions", zh: "论文方向" },
  "page.research.view": { en: "View Resources", zh: "查看资源" },

  "page.validator.title": { en: "RPKI Validator Comparison", zh: "RPKI Validator 对比" },
  "page.validator.subtitle": { en: "Compare RPKI relying party software implementations for Route Origin Validation", zh: "比较 RPKI relying party 软件实现" },
  "page.validator.desc": { en: "RPKI Validator software fetches, validates RPKI repository objects (certificates, ROAs, Manifests, CRLs), and generates VRPs for routers to perform Route Origin Validation.", zh: "RPKI Validator 是 RPKI relying party 软件，用于获取、验证 RPKI repository 中的证书、ROA、Manifest、CRL 等对象，并生成 VRP，供路由器进行 Route Origin Validation 使用。" },

  "page.script.title": { en: "BGP Data Script Generator", zh: "BGP 数据脚本生成器" },
  "page.script.subtitle": { en: "Generate data fetching scripts for BGP event analysis and reproduction", zh: "为 BGP 事件分析和复现生成数据抓取脚本" },
  "page.script.params": { en: "Event Parameters", zh: "事件参数" },
  "page.script.eventName": { en: "Event Name (optional)", zh: "事件名称（可选）" },
  "page.script.start": { en: "Start Time UTC", zh: "开始时间 UTC" },
  "page.script.end": { en: "End Time UTC", zh: "结束时间 UTC" },
  "page.script.before": { en: "Include Before (hours)", zh: "前延时长（小时）" },
  "page.script.after": { en: "Include After (hours)", zh: "后延时长（小时）" },
  "page.script.source": { en: "Data Source", zh: "数据源" },
  "page.script.collectors": { en: "Collectors", zh: "Collectors" },
  "page.script.datatype": { en: "Data Type", zh: "数据类型" },
  "page.script.output": { en: "Output Method", zh: "输出方式" },
  "page.script.generate": { en: "Generate Script", zh: "生成脚本" },
  "page.script.time_note": { en: "Time Window Note", zh: "时间窗口说明" },
  "page.script.steps": { en: "Recommended Analysis Steps", zh: "推荐分析步骤" },
  "page.script.placeholder": { en: "Fill in the event parameters and click 'Generate Script'", zh: "填写事件参数并点击「生成脚本」" },

  "page.learning.title": { en: "Learning Path", zh: "学习路线" },
  "page.learning.subtitle": { en: "A structured learning path for routing security research", zh: "为路由安全研究新手设计的学习路线" },
  "page.learning.objectives": { en: "Learning Objectives", zh: "学习目标" },
  "page.learning.resources": { en: "Recommended Resources", zh: "推荐资源" },
  "page.learning.experiment": { en: "Suggested Experiment", zh: "建议实验" },
  "page.learning.directions": { en: "Paper Directions", zh: "论文方向" },

  "page.about.title": { en: "About RouteSecHub", zh: "关于 RouteSecHub" },
  "page.about.subtitle": { en: "A one-stop navigation and research workbench for RPKI and BGP routing security research", zh: "面向 RPKI 与 BGP 路由安全研究的一站式导航与研究工作台" },
  "page.about.vision": { en: "Project Vision", zh: "项目愿景" },
  "page.about.vision_p1": { en: "RouteSecHub aims to be the practical entry point for RPKI and BGP routing security researchers. Instead of maintaining scattered bookmarks, researchers can find tools, data sources, papers, RFCs, classic incidents, and experimental scripts all in one place.", zh: "RouteSecHub 希望成为 RPKI 和 BGP 路由安全研究人员的实用入口，帮助研究者更快找到工具、数据、论文、标准和实验路径。我们不是简单的网址收藏夹，而是按研究任务组织资源的工作台。" },
  "page.about.audience": { en: "Target Audience", zh: "目标受众" },
  "page.about.tech": { en: "Technical Architecture", zh: "技术架构" },
  "page.about.tech_desc": { en: "Built with modern web technologies, designed for extensibility and open-source collaboration.", zh: "使用现代 Web 技术构建，面向可扩展性和开源协作。" },
  "page.about.future": { en: "Future Plans", zh: "后续规划" },
  "page.about.contributing": { en: "Contributing", zh: "贡献" },
  "page.about.contributing_desc": { en: "RouteSecHub is open source. Contributions are welcome whether it's adding new data sources, fixing bugs, improving documentation, or suggesting new features.", zh: "RouteSecHub 是开源项目。无论是添加数据源、修复 Bug、改进文档还是建议新功能，都欢迎贡献。" },
  "page.about.license": { en: "Built with ❤️ for the routing security research community. MIT License.", zh: "为路由安全研究社区用心构建 ❤️ MIT 许可证。" },

  // Audience
  "audience.rpki": { en: "RPKI Researchers", zh: "RPKI 研究人员" },
  "audience.rpki_desc": { en: "Researchers studying RPKI deployment, adoption, and validator implementations", zh: "研究 RPKI 部署、采用和验证器实现的研究人员" },
  "audience.bgp": { en: "BGP Security Researchers", zh: "BGP 安全研究人员" },
  "audience.bgp_desc": { en: "Researchers analyzing BGP routing security, hijacks, and leaks", zh: "分析 BGP 路由安全、劫持和泄漏的研究人员" },
  "audience.measurement": { en: "Network Measurement Researchers", zh: "网络测量研究人员" },
  "audience.measurement_desc": { en: "Researchers conducting internet measurement studies", zh: "进行互联网测量研究的研究人员" },
  "audience.anomaly": { en: "Routing Anomaly Detection Researchers", zh: "路由异常检测研究人员" },
  "audience.anomaly_desc": { en: "Researchers developing anomaly detection methods for BGP", zh: "开发 BGP 异常检测方法的研究人员" },
  "audience.ops": { en: "Network Operations Engineers", zh: "网络运维人员" },
  "audience.ops_desc": { en: "Network operators deploying ROV and routing security measures", zh: "部署 ROV 和路由安全措施的网络运维人员" },
  "audience.students": { en: "Graduate Students", zh: "刚入门的研究生" },
  "audience.students_desc": { en: "Graduate students new to routing security research", zh: "刚接触路由安全研究的研究生" },

  // Footer
  "footer.desc": { en: "A centralized platform for BGP routing security research, datasets, tools, and incident tracking.", zh: "面向 BGP 路由安全研究的集中平台，整合数据源、工具和事件追踪。" },
  "footer.quick": { en: "Quick Links", zh: "快速链接" },
  "footer.resources": { en: "Resources", zh: "资源" },
  "footer.community": { en: "Community", zh: "社区" },
  "footer.community_desc": { en: "Built for the routing security research community.", zh: "为路由安全研究社区构建。" },
  "footer.rights": { en: "RouteSecHub. All rights reserved.", zh: "RouteSecHub. 保留所有权利。" },

  // Empty
  "empty.notfound": { en: "No results found", zh: "未找到结果" },
  "empty.adjust": { en: "Try adjusting your search or filters", zh: "请尝试调整搜索或筛选条件" },

  // Future plans
  "future.ripestat": { en: "Access RIPEstat API for live RPKI/ROA/prefix queries", zh: "接入 RIPEstat API 实时查询 RPKI/ROA/前缀" },
  "future.asrank": { en: "Access CAIDA ASRank API for AS hierarchy analysis", zh: "接入 CAIDA ASRank API 进行 AS 层级分析" },
  "future.bgpkit": { en: "Access BGPKIT Broker API for data discovery", zh: "接入 BGPKIT Broker API 进行数据发现" },
  "future.graph": { en: "AS Knowledge Graph interactive visualization", zh: "AS 知识图谱交互式可视化" },
  "future.query": { en: "Prefix / ASN / ROA live query interface", zh: "前缀 / ASN / ROA 实时查询界面" },
  "future.incident": { en: "Incident reproduction experiment templates", zh: "事件复现实验模板" },
  "future.paper": { en: "Paper reproduction package bundles", zh: "论文复现包" },
  "future.digest": { en: "Weekly Routing Security Digest", zh: "每周路由安全摘要" },
};

const descZh: Record<string, string> = {
  "routeviews": "俄勒冈大学 RouteViews 项目，从全球 40+ 收集器提供 BGP 路由数据。BGP 研究和路由安全分析的基础数据源。",
  "ripe-ris": "RIPE NCC 路由信息服务，通过 26+ 路由收集器（rrc00-rrc25）在全球收集 BGP 数据。",
  "ris-live": "通过 WebSocket 提供的 RIPE RIS 收集器实时 BGP 消息流，低延迟访问实时 BGP 更新。",
  "bgpstream": "BGP 数据分析开源框架，支持从 RouteViews、RIPE RIS 等来源访问实时和历史 BGP 数据。",
  "bgpkit-broker": "索引 RouteViews 和 RIPE RIS MRT 转储文件的代理服务，方便查找和下载特定 BGP 数据。",
  "pybgpkit": "BGPKIT Parser 的 Python 绑定，在 Python 中高效解析 MRT 文件。",
  "pybgpstream-lib": "BGPStream 的 Python 接口，使用熟悉的 Python 语法访问多个收集器的 BGP 数据。",
  "caida-asrank": "CAIDA 的 AS 排名系统，基于 AS 客户锥和关系数据。提供 GraphQL API 查询 AS 拓扑信息。",
  "caida-as-relationship": "CAIDA 推断的 AS 间关系（提供商-客户、对等），广泛用于 BGP 安全研究。",
  "caida-as2org": "AS 编号到组织的映射，帮助识别 AS 运营者和事件归因。",
  "peeringdb": "对等、IXP 和设施信息的开放数据库，了解对等关系必不可少。",
  "routinator": "NLnet Labs 的 RPKI Relying Party 软件，获取、验证 RPKI 数据并生成 VRP。",
  "nist-rpki-monitor": "NIST 的 RPKI 部署监控仪表板，跟踪 ROA 覆盖率、RPKI 采用率和仓库健康状况。",
  "ripestat": "RIPE NCC 的大型信息系统，通过 REST API 提供 RPKI/ROA 查询、前缀分析和 50+ 数据调用。",
  "rpki-repos": "全球 RPKI 仓库基础设施，提供所有 RPKI 信任锚的 ROA、证书、Manifest 和 CRL 访问。",
  "manrs": "互联网社会的路由安全最佳实践倡议，推动网络运营商改善路由安全。",
  "bgpalerter": "NTT 的实时 BGP 监控和告警工具，检测路由劫持、泄漏和 ROV 违规。",
  "artemis": "FORTH-ICS 开发的自动实时 BGP 前缀劫持检测和缓解系统。",
  "cloudflare-radar": "Cloudflare 互联网智能平台，提供 BGP 路由数据、RPKI 状态和互联网流量趋势。",
  "bgp-tools": "综合 BGP 探索工具，提供前缀查找、AS 信息、对等详情和路由表视图。",
  "bgpview": "BGP 工具包和 ASN 路由查询工具，通过 API 提供前缀、ASN 和 IP 地址详情。",
  "bgpwatch": "CGTF BGP 监控平台，提供实时路由事件检测和前缀监控。",
  "bgpmon": "BGP 监控服务，为 BGP 路由异常、劫持和泄漏提供实时告警。",
  "bgp-reports": "Geoff Huston 的综合 BGP 统计报告，包含路由表分析、前缀增长趋势和 AS 数量统计。",
  "qrator-radar": "实时 BGP 监控和分析平台，具有 RPKI 验证状态、劫持检测和路由异常告警功能。",
  "ripe-atlas": "RIPE NCC 的全球互联网测量网络，在全球拥有探测器。提供 ping、traceroute、DNS 和 BGP 测量。",
  "ping-pe": "多地点 ping、mtr、dig、TCP 端口检查和实时 BGP Looking Glass。",
  "rpkiviews": "RPKI 数据存档，提供可下载的 RPKI VRP 快照，用于历史 RPKI 分析。",
  "cloudflare-rpki": "Cloudflare 的 RPKI 门户，提供 RPKI 验证器服务和 ROA 监控仪表板。",
  "radb": "互联网路由注册数据库，用于查询和注册路由策略信息。",
  "bgpy": "BGP Python 安全模拟器，用于模拟 BGP 中的攻击/防御场景。ACM IMC 2023 发表。",
  "bgpgraph": "BGP 图分析工具，用于从 BGP 数据构建和分析 AS 级拓扑图。",
  "ripe-whois": "RIPE NCC 的 Whois 数据库，查询 IP 地址分配、AS 编号、路由策略和 RPSL 对象。",
  "arin-whois": "ARIN Whois 服务，查询 ARIN 区域的 IP 和 ASN 注册信息。",
  "iana-as-numbers": "IANA 自治系统编号官方注册表，跟踪各 RIR 的 AS 编号分配。",
  "mininet": "网络模拟器，可创建逼真的虚拟网络，模拟 BGP 路由场景和攻击。",
  "cgtf-lg": "在线 BGP Looking Glass，用于检查从 BGP 路由器收集的前缀。",
  "spamhaus-drop": "Spamhaus 不路由不对等（DROP）列表，提供不应被路由或对等的 IP 范围。",
  "nsdc-bgp": "中国国家基础科学公共科学数据中心 BGP 路由劫持研究和异常检测数据集。",
  "ripe-labs": "RIPE NCC 的研究博客，发布互联网测量、路由安全、RPKI 和网络运营方面的文章。",
  "isbgpsafeyet": "Cloudflare 的工具，测试你的 ISP 是否执行路由源验证（ROV）。",
  "apnic-whois": "APNIC 的 Whois 服务，查询亚太地区的 IP 和 ASN 注册信息。",
  "afrinic-whois": "AFRINIC 的 Whois 服务，查询非洲地区的 IP 和 ASN 注册信息。",
  "bgper": "中文 BGP 学习和工具平台，为中国网络社区提供 BGP 教程、工具和资源。",
  "cloudflare-radar-routing": "Cloudflare Radar 的路由智能部分，显示全球 BGP 路由数据、RPKI 采用趋势和前缀统计。",
  "he-bgp": "Hurricane Electric 的综合 BGP 工具包，提供 AS 查找、前缀分析和全球路由表对等信息。",
  // Tool-specific IDs
  "rpki-client": "OpenBSD 的 RPKI Relying Party 实现。便携式、最小化、注重安全的 C 语言实现。",
  "fort-validator": "NIC Mexico 开发的 RPKI 验证器，支持 RTR 协议和所有 RPKI 对象类型。",
  "octorpki": "Cloudflare 的 RPKI Relying Party 实现（Go 语言），专为高性能和大规模部署设计。",
  "pybgpstream": "BGPStream 的 Python 绑定，提供 Python 风格的接口访问 RouteViews 和 RIPE RIS 的 BGP 数据。",
  "bgpkit": "用 Rust 编写的高性能 BGP MRT 文件解析工具包，包括 Parser、Broker 和相关工具。",
  "mrt-parser": "用于解析 MRT 转储文件的工具和库，RouteViews 和 RIPE RIS 使用的文件格式。",
  "ripestat-tool": "RIPE NCC 的综合信息系统，通过 Web 和 API 提供 50+ 数据调用，用于网络信息查询。",
  "bgplay": "可视化工具，显示随时间变化的 BGP 路由更改，将前缀公告、撤回和路径变化展示为交互式时间线。",
  "caida-asrank-tool": "CAIDA 的 AS 排名系统，基于 AS 客户锥和关系数据。提供 GraphQL API 查询 AS 拓扑信息。",
  "bgpmon-tool": "实时 BGP 监控和告警服务，检测路由异常、劫持和配置错误。",
  "bgp-potaroo": "Geoff Huston 的 BGP 统计报告 — 来自 APNIC 数据的路由表增长、AS 数量趋势、前缀分析。",
  // Dataset-specific IDs
  "caida-asrel": "CAIDA 推断的 AS 间关系数据（提供商-客户、对等对等），BGP 安全研究中广泛使用。",
  "routinator-data": "Routinator 生成的已验证 ROA 载荷（VRP），包含用于路由源验证的前缀-源-最大长度元组。",
  "nist-rpki": "NIST 的 RPKI 部署监控服务，跟踪全球 RPKI 部署状态、ROA 覆盖率和仓库健康状况。",
  "ripestat-rpki": "RIPE NCC 的信息系统，通过 REST API 提供 RPKI/ROA 查询、前缀分析和 50+ 数据调用。",
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("routesechub-lang") as Lang) || "zh";
    }
    return "zh";
  });

  const toggle = () => {
    setLang((l) => {
      const next = l === "en" ? "zh" : "en";
      localStorage.setItem("routesechub-lang", next);
      return next;
    });
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry.en || key;
  };

  const td = (id: string, fallback: string): string => {
    if (lang === "zh") {
      return descZh[id] || fallback;
    }
    return fallback;
  };

  return (
    <I18nContext.Provider value={{ lang, toggle, t, td }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
