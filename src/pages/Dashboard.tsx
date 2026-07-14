import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Search, Sparkles } from "lucide-react";
import { categories, variations } from "../data/patterns";
import { contentByVariationId } from "../data/content";
import { useProgressStore } from "../store/useProgressStore";
import { DifficultyBadge } from "../components/DifficultyBadge";
import { StatusBadge } from "../components/StatusBadge";
import type { RevisionStatus } from "../types";

const STATUS_FILTERS: Array<RevisionStatus | "All"> = ["All", "Unsolved", "Review", "Mastered"];

export function Dashboard() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<RevisionStatus | "All">("All");
  const status = useProgressStore((s) => s.status);

  const filteredVariations = useMemo(() => {
    const q = search.trim().toLowerCase();
    return variations.filter((v) => {
      const st = status[v.id] ?? "Unsolved";
      if (statusFilter !== "All" && st !== statusFilter) return false;
      if (q && !v.name.toLowerCase().includes(q) && !v.coreIdea.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [search, statusFilter, status]);

  const variationsByCategory = useMemo(() => {
    const map = new Map<string, typeof variations>();
    for (const cat of categories) map.set(cat.id, []);
    for (const v of filteredVariations) {
      map.get(v.categoryId)?.push(v);
    }
    return map;
  }, [filteredVariations]);

  const totalMastered = variations.filter((v) => (status[v.id] ?? "Unsolved") === "Mastered").length;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Algo Hub</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {variations.length} patterns across {categories.length} categories &middot; {totalMastered} mastered
        </p>
      </header>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patterns..."
            className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-accent dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
        <div className="flex gap-1">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                statusFilter === s
                  ? "bg-accent text-white"
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <Accordion.Root type="multiple" defaultValue={categories.map((c) => c.id)} className="flex flex-col gap-3">
        {categories.map((cat) => {
          const catVariations = variationsByCategory.get(cat.id) ?? [];
          const totalInCat = variations.filter((v) => v.categoryId === cat.id).length;
          const masteredInCat = variations.filter(
            (v) => v.categoryId === cat.id && (status[v.id] ?? "Unsolved") === "Mastered",
          ).length;
          const pct = totalInCat === 0 ? 0 : Math.round((masteredInCat / totalInCat) * 100);

          if (catVariations.length === 0) return null;

          return (
            <Accordion.Item
              key={cat.id}
              value={cat.id}
              className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="truncate font-semibold text-zinc-900 dark:text-zinc-100">{cat.name}</h2>
                      <span className="shrink-0 text-xs text-zinc-400">
                        {masteredInCat}/{totalInCat}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-zinc-500 dark:text-zinc-400">{cat.description}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div className="h-full rounded-full bg-easy" style={{ width: `${pct}%` }} />
                    </div>
                    <ChevronDown
                      size={16}
                      className="shrink-0 text-zinc-400 transition-transform group-data-[state=open]:rotate-180"
                    />
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="border-t border-zinc-100 px-4 py-2 dark:border-zinc-800">
                <div className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
                  {catVariations.map((v) => {
                    const st = status[v.id] ?? "Unsolved";
                    const hasContent = !!contentByVariationId[v.id];
                    return (
                      <Link
                        key={v.id}
                        to={`/pattern/${v.id}`}
                        className="flex items-center justify-between gap-3 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          {hasContent && (
                            <Sparkles size={13} className="shrink-0 text-accent" aria-label="Interactive dry run available" />
                          )}
                          <span className="truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
                            {v.name}
                          </span>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <DifficultyBadge difficulty={v.difficulty} />
                          <StatusBadge status={st} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
}
