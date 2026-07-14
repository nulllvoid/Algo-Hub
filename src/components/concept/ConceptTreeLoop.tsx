import { useConceptLoop } from "../../hooks/useConceptLoop";
import { ConceptShell } from "./ConceptShell";

const NODE_IDS = ["t1", "t2", "t3", "t4", "t5", "t6", "t7"];
const POSITIONS: Record<string, { x: number; y: number }> = {
  t1: { x: 50, y: 12 },
  t2: { x: 26, y: 45 },
  t3: { x: 74, y: 45 },
  t4: { x: 13, y: 80 },
  t5: { x: 39, y: 80 },
  t6: { x: 61, y: 80 },
  t7: { x: 87, y: 80 },
};
const EDGES: [string, string][] = [
  ["t1", "t2"],
  ["t1", "t3"],
  ["t2", "t4"],
  ["t2", "t5"],
  ["t3", "t6"],
  ["t3", "t7"],
];
const DEFAULT_LABELS: Record<string, string | number> = {
  t1: 4,
  t2: 2,
  t3: 6,
  t4: 1,
  t5: 3,
  t6: 5,
  t7: 7,
};

export interface TreeConceptFrame {
  highlightIds?: string[];
  visitedIds?: string[];
  labels?: Record<string, string | number>;
  /** Node ids to omit entirely, for "tree being constructed" style frames. */
  hiddenIds?: string[];
  caption: string;
}

export function ConceptTreeLoop({ frames }: { frames: TreeConceptFrame[] }) {
  const i = useConceptLoop(frames.length);
  const f = frames[i];
  const labels = { ...DEFAULT_LABELS, ...f.labels };
  const hidden = new Set(f.hiddenIds ?? []);
  const highlight = new Set(f.highlightIds ?? []);
  const visited = new Set(f.visitedIds ?? []);

  return (
    <ConceptShell caption={f.caption} frameCount={frames.length} index={i}>
      <svg viewBox="0 0 100 92" className="h-44 w-full max-w-xs overflow-visible">
        {EDGES.filter(([a, b]) => !hidden.has(a) && !hidden.has(b)).map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={POSITIONS[a].x}
            y1={POSITIONS[a].y}
            x2={POSITIONS[b].x}
            y2={POSITIONS[b].y}
            stroke="currentColor"
            className="text-zinc-300 dark:text-zinc-700"
            strokeWidth={1}
          />
        ))}
        {NODE_IDS.filter((id) => !hidden.has(id)).map((id) => {
          const pos = POSITIONS[id];
          const isActive = highlight.has(id);
          const isVisited = visited.has(id);
          return (
            <g key={id} style={{ transition: "opacity 0.3s" }}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={8}
                className="transition-all duration-300"
                fill={isActive ? "var(--color-accent)" : isVisited ? "var(--color-accent-soft)" : "transparent"}
                stroke={isActive || isVisited ? "var(--color-accent)" : "currentColor"}
                style={{ color: isActive || isVisited ? undefined : "#a1a1aa" }}
                strokeWidth={1.2}
              />
              <text
                x={pos.x}
                y={pos.y + 2.8}
                textAnchor="middle"
                fontSize={6.5}
                className="select-none font-mono font-semibold"
                fill={isActive ? "#ffffff" : "currentColor"}
              >
                {labels[id]}
              </text>
            </g>
          );
        })}
      </svg>
    </ConceptShell>
  );
}
