export type Difficulty = "Easy" | "Medium" | "Hard";
export type RevisionStatus = "Unsolved" | "Review" | "Mastered";
export type Engine = "array" | "linked-list";

export interface PatternCategory {
  id: string;
  name: string;
  description: string;
}

export interface PatternExample {
  title: string;
  sourcePath: string;
}

export interface PatternVariation {
  id: string;
  categoryId: string;
  name: string;
  difficulty: Difficulty;
  coreIdea: string;
  whenToUse: string;
  pitfalls: string;
  timeComplexity: string;
  spaceComplexity: string;
  examples: PatternExample[];
}

export interface Pointer {
  label: string;
  index: number;
}

export interface LinkedListNode {
  id: string;
  value: number;
  next: string | null;
}

export interface DryRunStep {
  codeLine: number;
  explanation: string;
  variables: Record<string, number | string>;
  array?: Array<number | string>;
  activeIndices?: number[];
  pointers?: Pointer[];
  nodes?: LinkedListNode[];
  activeNodeIds?: string[];
}

export interface VariationContent {
  variationId: string;
  code: string;
  engine: Engine;
  dryRunData: DryRunStep[];
}
