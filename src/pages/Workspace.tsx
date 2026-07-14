import { Link, useParams } from "react-router-dom";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ArrowLeft, FileCode2 } from "lucide-react";
import { categories, variations } from "../data/patterns";
import { contentByVariationId } from "../data/content";
import { useProgressStore } from "../store/useProgressStore";
import { DifficultyBadge } from "../components/DifficultyBadge";
import { StatusSelect } from "../components/StatusBadge";
import { ArrayVisualizer } from "../components/ArrayVisualizer";
import { LinkedListVisualizer } from "../components/LinkedListVisualizer";
import { VariablesPanel } from "../components/VariablesPanel";
import { StepControls } from "../components/StepControls";
import { CodeBlock } from "../components/CodeBlock";
import { MarkdownText } from "../components/MarkdownText";
import { ConceptVisual } from "../components/concept/ConceptVisual";
import { conceptVisualByVariationId } from "../data/conceptVisuals";
import { useDryRun } from "../hooks/useDryRun";

export function Workspace() {
  const { variationId } = useParams<{ variationId: string }>();
  const variation = variations.find((v) => v.id === variationId);
  const status = useProgressStore((s) => s.getStatus(variationId ?? ""));
  const setStatus = useProgressStore((s) => s.setStatus);

  if (!variation) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="text-zinc-500">No pattern found for "{variationId}".</p>
        <Link to="/" className="mt-4 inline-block text-accent hover:underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  const category = categories.find((c) => c.id === variation.categoryId);
  const content = contentByVariationId[variation.id];

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between gap-4 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/" className="shrink-0 rounded-md p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <ArrowLeft size={16} />
          </Link>
          <div className="min-w-0">
            <p className="truncate text-[11px] text-zinc-400">{category?.name}</p>
            <h1 className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-100">{variation.name}</h1>
          </div>
          <DifficultyBadge difficulty={variation.difficulty} />
        </div>
        <StatusSelect status={status} onChange={(s) => setStatus(variation.id, s)} />
      </header>

      <div className="min-h-0 flex-1">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={38} minSize={25}>
            <NotesPane variation={variation} />
          </Panel>
          <PanelResizeHandle className="w-px bg-zinc-200 hover:bg-accent dark:bg-zinc-800" />
          <Panel defaultSize={62} minSize={35}>
            {content ? <ContentPane content={content} /> : <NoContentPane variationId={variation.id} />}
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

function NotesPane({ variation }: { variation: (typeof variations)[number] }) {
  return (
    <div className="h-full overflow-y-auto px-5 py-5">
      <section className="mb-5">
        <h2 className="mb-1.5 text-xs font-bold uppercase tracking-wide text-zinc-400">Core Idea</h2>
        <MarkdownText text={variation.coreIdea} />
      </section>
      <section className="mb-5">
        <h2 className="mb-1.5 text-xs font-bold uppercase tracking-wide text-zinc-400">When to Use</h2>
        <MarkdownText text={variation.whenToUse} />
      </section>
      <section className="mb-5">
        <h2 className="mb-1.5 text-xs font-bold uppercase tracking-wide text-zinc-400">Pitfalls</h2>
        <MarkdownText text={variation.pitfalls} />
      </section>
      <section className="mb-5 flex gap-4 font-mono text-xs text-zinc-500 dark:text-zinc-400">
        <span>Time: {variation.timeComplexity}</span>
        <span>Space: {variation.spaceComplexity}</span>
      </section>
      <section>
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-400">Examples in this repo</h2>
        <ul className="flex flex-col gap-1.5">
          {variation.examples.map((ex) => (
            <li key={ex.sourcePath} className="flex items-start gap-2 text-xs">
              <FileCode2 size={13} className="mt-0.5 shrink-0 text-zinc-400" />
              <div className="min-w-0">
                <div className="font-medium text-zinc-700 dark:text-zinc-300">{ex.title}</div>
                <div className="truncate font-mono text-zinc-400">solutions/{ex.sourcePath}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function NoContentPane({ variationId }: { variationId: string }) {
  const concept = conceptVisualByVariationId[variationId];

  if (!concept) {
    return (
      <div className="flex h-full items-center justify-center px-6 text-center">
        <p className="max-w-xs text-sm text-zinc-400">
          Dry run coming soon — concept notes and examples on the left are ready to revise from in the meantime.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-2 dark:border-zinc-800">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
          Concept Visualization
        </span>
        <span className="text-[11px] text-zinc-400">Illustrative, not a traced dry run</span>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <ConceptVisual config={concept} />
      </div>
    </div>
  );
}

function ContentPane({ content }: { content: NonNullable<ReturnType<typeof getContent>> }) {
  const dryRun = useDryRun(content.dryRunData);
  const step = dryRun.step;

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto border-b border-zinc-200 dark:border-zinc-800">
        {content.engine === "array" ? (
          <ArrayVisualizer array={step.array ?? []} activeIndices={step.activeIndices} pointers={step.pointers} />
        ) : (
          <LinkedListVisualizer
            nodes={step.nodes ?? []}
            activeNodeIds={step.activeNodeIds}
            pointerVars={step.variables}
          />
        )}
        <p className="px-5 pb-4 text-sm text-zinc-600 dark:text-zinc-300">{step.explanation}</p>
      </div>
      <VariablesPanel variables={step.variables} />
      <StepControls
        index={dryRun.index}
        total={content.dryRunData.length}
        playing={dryRun.playing}
        atStart={dryRun.atStart}
        atEnd={dryRun.atEnd}
        onStepBack={dryRun.stepBackward}
        onStepForward={dryRun.stepForward}
        onTogglePlay={dryRun.togglePlay}
        onReset={dryRun.reset}
      />
      <div className="h-56 shrink-0 overflow-auto">
        <CodeBlock code={content.code} highlightLine={step.codeLine} />
      </div>
    </div>
  );
}

function getContent(id: string) {
  return contentByVariationId[id];
}
