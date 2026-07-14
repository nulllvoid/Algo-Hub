import { motion } from "framer-motion";
import type { Pointer as PointerType } from "../types";

interface ArrayVisualizerProps {
  array: Array<number | string>;
  activeIndices?: number[];
  pointers?: PointerType[];
}

export function ArrayVisualizer({ array, activeIndices = [], pointers = [] }: ArrayVisualizerProps) {
  const pointersByIndex = new Map<number, PointerType[]>();
  for (const p of pointers) {
    const list = pointersByIndex.get(p.index) ?? [];
    list.push(p);
    pointersByIndex.set(p.index, list);
  }

  return (
    <div className="flex flex-wrap items-end justify-center gap-2 py-8">
      {array.map((value, i) => {
        const isActive = activeIndices.includes(i);
        const ptrs = pointersByIndex.get(i) ?? [];
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="flex h-5 flex-col items-center justify-end gap-0.5">
              {ptrs.map((p) => (
                <span
                  key={p.label}
                  className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold leading-none text-white"
                >
                  {p.label}
                </span>
              ))}
            </div>
            <motion.div
              layout
              animate={{
                backgroundColor: isActive ? "var(--color-accent)" : "transparent",
                color: isActive ? "#ffffff" : undefined,
                scale: isActive ? 1.08 : 1,
              }}
              transition={{ duration: 0.25 }}
              className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-zinc-300 font-mono text-sm font-semibold text-zinc-900 dark:border-zinc-600 dark:text-zinc-100"
            >
              {value}
            </motion.div>
            <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">{i}</span>
          </div>
        );
      })}
    </div>
  );
}
