import type { VariationContent } from "../../types";
import { complementPairLookup } from "./complementPairLookup";
import { kadanesRunningMax } from "./kadanesRunningMax";
import { searchSpaceNarrowing } from "./searchSpaceNarrowing";
import { narrowingRotationDuplicates } from "./narrowingRotationDuplicates";
import { variableSizeWindow } from "./variableSizeWindow";
import { inPlaceReversal } from "./inPlaceReversal";

const all: VariationContent[] = [
  complementPairLookup,
  kadanesRunningMax,
  searchSpaceNarrowing,
  narrowingRotationDuplicates,
  variableSizeWindow,
  inPlaceReversal,
];

export const contentByVariationId: Record<string, VariationContent> =
  Object.fromEntries(all.map((c) => [c.variationId, c]));
