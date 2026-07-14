import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

const components: Components = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-zinc-900 dark:text-zinc-100">{children}</strong>,
  code: ({ children }) => (
    <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] text-accent dark:bg-zinc-800">
      {children}
    </code>
  ),
  ul: ({ children }) => <ul className="mb-2 list-disc space-y-1.5 pl-4 last:mb-0">{children}</ul>,
  li: ({ children }) => <li>{children}</li>,
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noreferrer" className="text-accent underline">
      {children}
    </a>
  ),
};

export function MarkdownText({ text }: { text: string }) {
  return (
    <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
      <ReactMarkdown components={components}>{text}</ReactMarkdown>
    </div>
  );
}
