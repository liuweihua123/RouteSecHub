interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function SectionHeader({ title, subtitle, icon }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        {icon && (
          <div className="text-blue-400">{icon}</div>
        )}
        <h1 className="text-2xl md:text-3xl font-bold gradient-text">{title}</h1>
      </div>
      {subtitle && (
        <p className="text-[var(--text-secondary)] text-base max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
