import { useConceptLoop } from "../../hooks/useConceptLoop";
import { ConceptShell } from "./ConceptShell";

export type CellState = "empty" | "filled" | "active";

export interface GridConceptFrame {
  cells: CellState[][];
  values?: Array<Array<number | string | null>>;
  caption: string;
}

const CELL_STYLES: Record<CellState, string> = {
  empty: "border-zinc-200 text-zinc-300 dark:border-zinc-700 dark:text-zinc-600",
  filled: "border-accent-soft bg-accent/10 text-zinc-700 dark:text-zinc-200",
  active: "border-accent bg-accent text-white",
};

export function ConceptGridLoop({ frames }: { frames: GridConceptFrame[] }) {
  const i = useConceptLoop(frames.length);
  const f = frames[i];

  return (
    <ConceptShell caption={f.caption} frameCount={frames.length} index={i}>
      <div className="flex flex-col gap-1">
        {f.cells.map((row, r) => (
          <div key={r} className="flex gap-1">
            {row.map((state, c) => (
              <div
                key={c}
                className={`flex h-8 w-8 items-center justify-center rounded border-2 font-mono text-[11px] font-semibold transition-all duration-300 ${CELL_STYLES[state]}`}
              >
                {f.values?.[r]?.[c] ?? ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </ConceptShell>
  );
}
