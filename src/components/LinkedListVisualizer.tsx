import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { LinkedListNode } from "../types";

interface LinkedListVisualizerProps {
  nodes: LinkedListNode[];
  activeNodeIds?: string[];
  pointerVars?: Record<string, string | number>;
}

const POINTER_KEYS = ["prev", "cur", "temp", "head", "left", "right"];

export function LinkedListVisualizer({ nodes, activeNodeIds = [], pointerVars = {} }: LinkedListVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [arcs, setArcs] = useState<{ id: string; d: string; back: boolean }[]>([]);

  const sortedNodes = [...nodes].sort((a, b) => a.id.localeCompare(b.id));

  const pointersByNode = new Map<string, string[]>();
  for (const key of POINTER_KEYS) {
    const val = pointerVars[key];
    if (typeof val === "string" && val !== "NULL") {
      const list = pointersByNode.get(val) ?? [];
      list.push(key);
      pointersByNode.set(val, list);
    }
  }

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const nextArcs: { id: string; d: string; back: boolean }[] = [];

    for (const node of sortedNodes) {
      if (!node.next) continue;
      const fromEl = nodeRefs.current.get(node.id);
      const toEl = nodeRefs.current.get(node.next);
      if (!fromEl || !toEl) continue;
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();
      const x1 = fromRect.left + fromRect.width / 2 - containerRect.left;
      const x2 = toRect.left + toRect.width / 2 - containerRect.left;
      const y = fromRect.bottom - containerRect.top;
      const back = x2 < x1;
      const mid = (x1 + x2) / 2;
      const dip = back ? 50 : 28;
      nextArcs.push({
        id: `${node.id}-${node.next}`,
        d: `M ${x1} ${y} Q ${mid} ${y + dip} ${x2} ${y}`,
        back,
      });
    }
    setArcs(nextArcs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(nodes)]);

  return (
    <div ref={containerRef} className="relative py-10">
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-accent" />
          </marker>
        </defs>
        {arcs.map((arc) => (
          <path
            key={arc.id}
            d={arc.d}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={2}
            markerEnd="url(#arrowhead)"
            opacity={0.8}
          />
        ))}
      </svg>
      <div className="flex justify-center gap-10">
        {sortedNodes.map((node) => {
          const isActive = activeNodeIds.includes(node.id);
          const labels = pointersByNode.get(node.id) ?? [];
          return (
            <div key={node.id} className="flex flex-col items-center gap-1">
              <div className="flex h-5 gap-1">
                {labels.map((label) => (
                  <span
                    key={label}
                    className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold leading-none text-white"
                  >
                    {label}
                  </span>
                ))}
              </div>
              <motion.div
                ref={(el) => {
                  if (el) nodeRefs.current.set(node.id, el);
                }}
                layout
                animate={{
                  backgroundColor: isActive ? "var(--color-accent)" : "transparent",
                  color: isActive ? "#ffffff" : undefined,
                }}
                transition={{ duration: 0.25 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-zinc-300 font-mono text-sm font-semibold text-zinc-900 dark:border-zinc-600 dark:text-zinc-100"
              >
                {node.value}
              </motion.div>
              <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
                {node.next ? "→" : "∅"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
