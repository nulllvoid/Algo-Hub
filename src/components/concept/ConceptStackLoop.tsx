import { motion, AnimatePresence } from "framer-motion";
import { useConceptLoop } from "../../hooks/useConceptLoop";
import { ConceptShell } from "./ConceptShell";

export interface StackConceptFrame {
  items: Array<number | string>;
  caption: string;
}

export function ConceptStackLoop({ frames }: { frames: StackConceptFrame[] }) {
  const i = useConceptLoop(frames.length);
  const f = frames[i];
  const reversed = [...f.items].reverse();

  return (
    <ConceptShell caption={f.caption} frameCount={frames.length} index={i}>
      <div className="flex flex-col-reverse items-center gap-1">
        <div className="h-1 w-24 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <AnimatePresence initial={false}>
          {reversed.map((item, idx) => (
            <motion.div
              key={`${idx}-${item}`}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex h-9 w-24 items-center justify-center rounded-md border-2 font-mono text-sm font-semibold ${
                idx === 0
                  ? "border-accent bg-accent text-white"
                  : "border-zinc-300 text-zinc-700 dark:border-zinc-600 dark:text-zinc-200"
              }`}
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ConceptShell>
  );
}
