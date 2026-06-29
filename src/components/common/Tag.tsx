interface TagProps {
  label: string;
  color?: string;
  onClick?: () => void;
  active?: boolean;
  size?: "sm" | "md";
}

const tagColors: Record<string, string> = {
  RPKI: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  BGP: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Route Leak": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Hijack: "bg-red-500/15 text-red-400 border-red-500/30",
  "AS Relationship": "bg-purple-500/15 text-purple-400 border-purple-500/30",
  ROV: "bg-green-500/15 text-green-400 border-green-500/30",
  Visualization: "bg-pink-500/15 text-pink-400 border-pink-500/30",
  Outage: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  MRT: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  CAIDA: "bg-teal-500/15 text-teal-400 border-teal-500/30",
  RIPE: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  Python: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Rust: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Go: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  API: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

export default function Tag({ label, color, onClick, active, size = "sm" }: TagProps) {
  const baseColor = color || tagColors[label] || "bg-blue-500/15 text-blue-400 border-blue-500/30";
  const activeStyle = active ? "ring-1 ring-white/30 bg-opacity-30" : "";
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1";

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center rounded-full border font-medium ${baseColor} ${activeStyle} ${sizeClass} ${onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
    >
      {label}
    </span>
  );
}
