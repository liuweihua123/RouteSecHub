import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockWithCopyProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeBlockWithCopy({ code, language, title }: CodeBlockWithCopyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-lg overflow-hidden border border-[var(--code-border)]">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[var(--code-border)]">
          <span className="text-xs text-[var(--text-secondary)] font-medium">{title}</span>
          {language && (
            <span className="text-xs text-[var(--text-muted)]">{language}</span>
          )}
        </div>
      )}
      <div className="relative group">
        <pre className="bg-[var(--code-bg)] p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-[var(--text-primary)] font-mono">{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 rounded-md bg-[var(--code-bg)] border border-[var(--code-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--code-border)] transition-all opacity-0 group-hover:opacity-100"
          title="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
        {copied && (
          <span className="absolute top-2 right-12 text-xs text-green-400 font-medium">
            Copied!
          </span>
        )}
      </div>
    </div>
  );
}
