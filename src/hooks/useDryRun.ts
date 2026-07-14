import { useEffect, useRef, useState } from "react";
import type { DryRunStep } from "../types";

const PLAY_INTERVAL_MS = 900;

export function useDryRun(steps: DryRunStep[]) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const atStart = index === 0;
  const atEnd = index === steps.length - 1;

  useEffect(() => {
    if (!playing) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => {
        if (i >= steps.length - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, PLAY_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, steps.length]);

  const stepForward = () => setIndex((i) => Math.min(i + 1, steps.length - 1));
  const stepBackward = () => setIndex((i) => Math.max(i - 1, 0));
  const reset = () => {
    setPlaying(false);
    setIndex(0);
  };
  const togglePlay = () => {
    if (atEnd) {
      setIndex(0);
    }
    setPlaying((p) => !p);
  };

  return {
    index,
    step: steps[index],
    atStart,
    atEnd,
    playing,
    stepForward,
    stepBackward,
    reset,
    togglePlay,
  };
}
