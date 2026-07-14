interface VariablesPanelProps {
  variables: Record<string, number | string>;
}

export function VariablesPanel({ variables }: VariablesPanelProps) {
  const entries = Object.entries(variables);
  if (entries.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 border-t border-zinc-200 p-3 dark:border-zinc-800">
      {entries.map(([key, value]) => (
        <div
          key={key}
          className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-900"
        >
          <span className="text-zinc-500 dark:text-zinc-400">{key}</span>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{String(value)}</span>
        </div>
      ))}
    </div>
  );
}
