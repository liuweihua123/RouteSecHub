import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FlaskConical, Clock, Database } from "lucide-react";
import SectionHeader from "../components/common/SectionHeader";
import CodeBlockWithCopy from "../components/common/CodeBlockWithCopy";
import { generateScript, ROUTEVIEWS_COLLECTORS, RIPE_RIS_COLLECTORS } from "../utils/scriptGenerator";

export default function ScriptGenerator() {
  const location = useLocation();

  const [eventName, setEventName] = useState("");
  const [startTimeUtc, setStartTimeUtc] = useState("");
  const [endTimeUtc, setEndTimeUtc] = useState("");
  const [includeBefore, setIncludeBefore] = useState(6);
  const [includeAfter, setIncludeAfter] = useState(6);
  const [dataSource, setDataSource] = useState<"routeviews" | "riperis" | "both">("routeviews");
  const [collectors, setCollectors] = useState<string[]>(["route-views2"]);
  const [dataType, setDataType] = useState<"updates" | "ribs">("updates");
  const [outputMethod, setOutputMethod] = useState<"pybgpstream" | "bgpkit" | "wget">("pybgpstream");
  const [generated, setGenerated] = useState<ReturnType<typeof generateScript> | null>(null);

  useEffect(() => {
    const state = location.state as Record<string, string> | null;
    if (state) {
      if (state.eventName) setEventName(state.eventName);
      if (state.startTimeUtc) setStartTimeUtc(state.startTimeUtc);
      if (state.endTimeUtc) setEndTimeUtc(state.endTimeUtc);
    }
  }, [location.state]);

  const handleGenerate = () => {
    if (!startTimeUtc || !endTimeUtc) return;
    const result = generateScript({
      eventName: eventName || undefined,
      startTimeUtc,
      endTimeUtc,
      includeBeforeHours: includeBefore,
      includeAfterHours: includeAfter,
      dataSource,
      collectors,
      dataType,
      outputMethod,
    });
    setGenerated(result);
  };

  const toggleCollector = (c: string) => {
    setCollectors((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const displayedCollectors = dataSource === "riperis"
    ? RIPE_RIS_COLLECTORS
    : dataSource === "routeviews"
    ? ROUTEVIEWS_COLLECTORS
    : [...ROUTEVIEWS_COLLECTORS, ...RIPE_RIS_COLLECTORS];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionHeader
        title="BGP Data Script Generator"
        subtitle="Generate data fetching scripts for BGP event analysis and reproduction"
        icon={<FlaskConical className="h-6 w-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Form */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-400" /> Event Parameters
          </h3>

          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Event Name (optional)</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="e.g., YouTube Pakistan Hijack"
              className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[#64748b] focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Start Time UTC</label>
              <input
                type="text"
                value={startTimeUtc}
                onChange={(e) => setStartTimeUtc(e.target.value)}
                placeholder="2021-10-04 15:39:00"
                className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[#64748b] font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">End Time UTC</label>
              <input
                type="text"
                value={endTimeUtc}
                onChange={(e) => setEndTimeUtc(e.target.value)}
                placeholder="2021-10-05 00:00:00"
                className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[#64748b] font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Include Before (hours)</label>
              <input
                type="number"
                value={includeBefore}
                onChange={(e) => setIncludeBefore(Number(e.target.value))}
                min={0}
                max={24}
                className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Include After (hours)</label>
              <input
                type="number"
                value={includeAfter}
                onChange={(e) => setIncludeAfter(Number(e.target.value))}
                min={0}
                max={24}
                className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Data Source</label>
            <select
              value={dataSource}
              onChange={(e) => {
                setDataSource(e.target.value as typeof dataSource);
                setCollectors([]);
              }}
              className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
            >
              <option value="routeviews">RouteViews</option>
              <option value="riperis">RIPE RIS</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Collectors</label>
            <div className="max-h-32 overflow-y-auto grid grid-cols-3 gap-1">
              {displayedCollectors.slice(0, 30).map((c) => (
                <label
                  key={c}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs cursor-pointer ${
                    collectors.includes(c)
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={collectors.includes(c)}
                    onChange={() => toggleCollector(c)}
                    className="accent-blue-500"
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Data Type</label>
              <select
                value={dataType}
                onChange={(e) => setDataType(e.target.value as typeof dataType)}
                className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
              >
                <option value="updates">Updates</option>
                <option value="ribs">RIBs</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Output Method</label>
              <select
                value={outputMethod}
                onChange={(e) => setOutputMethod(e.target.value as typeof outputMethod)}
                className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
              >
                <option value="pybgpstream">PyBGPStream</option>
                <option value="bgpkit">BGPKIT Broker / Parser</option>
                <option value="wget">wget MRT Links</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!startTimeUtc || !endTimeUtc}
            className="w-full py-2.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-sm text-blue-400 font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FlaskConical className="h-4 w-4 inline mr-2" />
            Generate Script
          </button>
        </div>

        {/* Result */}
        <div className="space-y-4">
          {generated ? (
            <>
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-cyan-400" /> Time Window Note
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">{generated.timeWindowNote}</p>
              </div>

              <CodeBlockWithCopy
                code={generated.code}
                language="python"
                title={generated.title}
              />

              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                  <Database className="h-4 w-4 text-purple-400" /> Recommended Analysis Steps
                </h3>
                <ol className="space-y-1.5">
                  {generated.analysisSteps.map((step, i) => (
                    <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                      <span className="text-blue-400 font-medium">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </>
          ) : (
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-8 flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <FlaskConical className="h-10 w-10 text-[var(--border)] mx-auto mb-3" />
                <p className="text-[var(--text-secondary)] text-sm">
                  Fill in the event parameters and click "Generate Script"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
