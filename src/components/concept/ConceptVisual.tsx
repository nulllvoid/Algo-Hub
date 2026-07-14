import { ConceptArrayLoop, type ArrayConceptFrame } from "./ConceptArrayLoop";
import { ConceptLinkedListLoop, type LinkedListConceptFrame } from "./ConceptLinkedListLoop";
import { ConceptTreeLoop, type TreeConceptFrame } from "./ConceptTreeLoop";
import { ConceptGraphLoop, type GraphConceptFrame } from "./ConceptGraphLoop";
import { ConceptGridLoop, type GridConceptFrame } from "./ConceptGridLoop";
import { ConceptStackLoop, type StackConceptFrame } from "./ConceptStackLoop";
import { ConceptIntervalLoop, type IntervalConceptFrame } from "./ConceptIntervalLoop";

export type ConceptConfig =
  | { kind: "array"; frames: ArrayConceptFrame[] }
  | { kind: "linked-list"; frames: LinkedListConceptFrame[] }
  | { kind: "tree"; frames: TreeConceptFrame[] }
  | { kind: "graph"; frames: GraphConceptFrame[] }
  | { kind: "grid"; frames: GridConceptFrame[] }
  | { kind: "stack"; frames: StackConceptFrame[] }
  | { kind: "interval"; frames: IntervalConceptFrame[] };

export function ConceptVisual({ config }: { config: ConceptConfig }) {
  switch (config.kind) {
    case "array":
      return <ConceptArrayLoop frames={config.frames} />;
    case "linked-list":
      return <ConceptLinkedListLoop frames={config.frames} />;
    case "tree":
      return <ConceptTreeLoop frames={config.frames} />;
    case "graph":
      return <ConceptGraphLoop frames={config.frames} />;
    case "grid":
      return <ConceptGridLoop frames={config.frames} />;
    case "stack":
      return <ConceptStackLoop frames={config.frames} />;
    case "interval":
      return <ConceptIntervalLoop frames={config.frames} />;
  }
}
