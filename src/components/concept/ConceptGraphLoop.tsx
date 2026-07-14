import { useConceptLoop } from "../../hooks/useConceptLoop";
import { ConceptShell } from "./ConceptShell";

const POSITIONS: Record<string, { x: number; y: number }> = {
  g1: { x: 50, y: 8 },
  g2: { x: 85, y: 30 },
  g3: { x: 85, y: 70 },
  g4: { x: 50, y: 92 },
  g5: { x: 15, y: 70 },
  g6: { x: 15, y: 30 },
};
const EDGES: [string, string][] = [
  ["g1", "g2"],
  ["g2", "g3"],
  ["g3", "g4"],
  ["g4", "g5"],
  ["g5", "g6"],
  ["g6", "g1"],
  ["g1", "g4"],
];

export interface GraphConceptFrame {
  highlightIds?: string[];
  visitedIds?: string[];
  labels?: Record<string, string | number>;
  caption: string;
}

const DEFAULT_LABELS: Record<string, string | number> = {
  g1: "A",
  g2: "B",
  g3: "C",
  g4: "D",
  g5: "E",
  g6: "F",
};

export function ConceptGraphLoop({ frames }: { frames: GraphConceptFrame[] }) {
  const i = useConceptLoop(frames.length);
  const f = frames[i];
  const labels = { ...DEFAULT_LABELS, ...f.labels };
  const highlight = new Set(f.highlightIds ?? []);
  const visited = new Set(f.visitedIds ?? []);

  return (
    <ConceptShell caption={f.caption} frameCount={frames.length} index={i}>
      <svg viewBox="0 0 100 100" className="h-44 w-44 overflow-visible">
        {EDGES.map(([a, b]) => (
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
        {Object.keys(POSITIONS).map((id) => {
          const pos = POSITIONS[id];
          const isActive = highlight.has(id);
          const isVisited = visited.has(id);
          return (
            <g key={id}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={9}
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
                fontSize={7}
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
