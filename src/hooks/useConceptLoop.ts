import { useEffect, useState } from "react";

export function useConceptLoop(frameCount: number, intervalMs = 1600) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setIndex(0);
    if (frameCount <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % frameCount), intervalMs);
    return () => clearInterval(id);
  }, [frameCount, intervalMs]);
  return index;
}
