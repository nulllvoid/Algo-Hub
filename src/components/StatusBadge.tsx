import type { RevisionStatus } from "../types";

const COLORS: Record<RevisionStatus, string> = {
  Unsolved: "bg-status-unsolved/15 text-status-unsolved",
  Review: "bg-status-review/15 text-status-review",
  Mastered: "bg-status-mastered/15 text-status-mastered",
};

export function StatusBadge({ status }: { status: RevisionStatus }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${COLORS[status]}`}>
      {status}
    </span>
  );
}

interface StatusSelectProps {
  status: RevisionStatus;
  onChange: (status: RevisionStatus) => void;
}

const OPTIONS: RevisionStatus[] = ["Unsolved", "Review", "Mastered"];

export function StatusSelect({ status, onChange }: StatusSelectProps) {
  return (
    <div className="flex gap-1">
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
            opt === status
              ? COLORS[opt] + " ring-1 ring-inset ring-current"
              : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
