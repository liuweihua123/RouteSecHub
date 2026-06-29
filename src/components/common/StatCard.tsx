interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color?: string;
}

export default function StatCard({ label, value, icon, color = "blue" }: StatCardProps) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-400",
    cyan: "bg-cyan-500/10 text-cyan-400",
    purple: "bg-purple-500/10 text-purple-400",
    green: "bg-green-500/10 text-green-400",
    amber: "bg-amber-500/10 text-amber-400",
  };

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 text-center">
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${colorMap[color] || colorMap.blue} mb-3`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-[var(--text-primary)] mb-1">{value}</div>
      <div className="text-sm text-[var(--text-secondary)]">{label}</div>
    </div>
  );
}
