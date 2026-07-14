import { useConceptLoop } from "../../hooks/useConceptLoop";
import { LinkedListVisualizer } from "../LinkedListVisualizer";
import { ConceptShell } from "./ConceptShell";
import type { LinkedListNode } from "../../types";

export interface LinkedListConceptFrame {
  nodes: LinkedListNode[];
  activeNodeIds?: string[];
  pointerVars?: Record<string, string | number>;
  caption: string;
}

export function ConceptLinkedListLoop({ frames }: { frames: LinkedListConceptFrame[] }) {
  const i = useConceptLoop(frames.length);
  const f = frames[i];
  return (
    <ConceptShell caption={f.caption} frameCount={frames.length} index={i}>
      <LinkedListVisualizer nodes={f.nodes} activeNodeIds={f.activeNodeIds} pointerVars={f.pointerVars} />
    </ConceptShell>
  );
}
