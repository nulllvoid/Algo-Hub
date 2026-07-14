import { Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react";

interface StepControlsProps {
  index: number;
  total: number;
  playing: boolean;
  atStart: boolean;
  atEnd: boolean;
  onStepBack: () => void;
  onStepForward: () => void;
  onTogglePlay: () => void;
  onReset: () => void;
}

export function StepControls({
  index,
  total,
  playing,
  atStart,
  atEnd,
  onStepBack,
  onStepForward,
  onTogglePlay,
  onReset,
}: StepControlsProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-zinc-200 p-3 dark:border-zinc-800">
      <div className="flex items-center gap-1">
        <button
          onClick={onReset}
          className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          aria-label="Reset"
        >
          <RotateCcw size={16} />
        </button>
        <button
          onClick={onStepBack}
          disabled={atStart}
          className="rounded-md p-2 text-zinc-700 hover:bg-zinc-100 disabled:opacity-30 dark:text-zinc-200 dark:hover:bg-zinc-800"
          aria-label="Step backward"
        >
          <SkipBack size={16} />
        </button>
        <button
          onClick={onTogglePlay}
          className="rounded-md bg-accent p-2 text-white hover:opacity-90"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          onClick={onStepForward}
          disabled={atEnd}
          className="rounded-md p-2 text-zinc-700 hover:bg-zinc-100 disabled:opacity-30 dark:text-zinc-200 dark:hover:bg-zinc-800"
          aria-label="Step forward"
        >
          <SkipForward size={16} />
        </button>
      </div>
      <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
        Step {index + 1} / {total}
      </span>
    </div>
  );
}
