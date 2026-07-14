import { useConceptLoop } from "../../hooks/useConceptLoop";
import { ConceptShell } from "./ConceptShell";

export interface IntervalBar {
  start: number;
  end: number;
  state?: "default" | "selected" | "rejected";
}

export interface IntervalConceptFrame {
  bars: IntervalBar[];
  scaleMax: number;
  caption: string;
}

const STATE_STYLES: Record<NonNullable<IntervalBar["state"]>, string> = {
  default: "bg-zinc-200 dark:bg-zinc-700",
  selected: "bg-accent",
  rejected: "bg-hard/40",
};

export function ConceptIntervalLoop({ frames }: { frames: IntervalConceptFrame[] }) {
  const i = useConceptLoop(frames.length);
  const f = frames[i];

  return (
    <ConceptShell caption={f.caption} frameCount={frames.length} index={i}>
      <div className="flex w-full max-w-sm flex-col gap-2.5">
        {f.bars.map((bar, idx) => (
          <div key={idx} className="relative h-6 w-full rounded bg-zinc-50 dark:bg-zinc-800/50">
            <div
              className={`absolute h-full rounded transition-all duration-300 ${STATE_STYLES[bar.state ?? "default"]}`}
              style={{
                left: `${(bar.start / f.scaleMax) * 100}%`,
                width: `${((bar.end - bar.start) / f.scaleMax) * 100}%`,
              }}
            />
          </div>
        ))}
      </div>
    </ConceptShell>
  );
}
