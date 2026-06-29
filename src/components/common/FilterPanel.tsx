import Tag from "./Tag";

interface FilterPanelProps {
  tags: string[];
  selectedTags: string[];
  onToggle: (tag: string) => void;
  title?: string;
}

export default function FilterPanel({ tags, selectedTags, onToggle, title }: FilterPanelProps) {
  if (tags.length === 0) return null;

  return (
    <div>
      {title && (
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">{title}</h3>
      )}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag
            key={tag}
            label={tag}
            active={selectedTags.includes(tag)}
            onClick={() => onToggle(tag)}
          />
        ))}
      </div>
    </div>
  );
}
