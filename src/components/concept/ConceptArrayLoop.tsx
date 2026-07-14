import { useConceptLoop } from "../../hooks/useConceptLoop";
import { ArrayVisualizer } from "../ArrayVisualizer";
import { ConceptShell } from "./ConceptShell";
import type { Pointer } from "../../types";

export interface ArrayConceptFrame {
  array: Array<number | string>;
  activeIndices?: number[];
  pointers?: Pointer[];
  caption: string;
}

export function ConceptArrayLoop({ frames }: { frames: ArrayConceptFrame[] }) {
  const i = useConceptLoop(frames.length);
  const f = frames[i];
  return (
    <ConceptShell caption={f.caption} frameCount={frames.length} index={i}>
      <ArrayVisualizer array={f.array} activeIndices={f.activeIndices} pointers={f.pointers} />
    </ConceptShell>
  );
}
