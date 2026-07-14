# Algo Hub

An interactive revision dashboard for DSA interview prep, organized around **patterns**, not problems.

Most sheets (Striver's A2Z, NeetCode, etc.) list problems one by one, which makes revision feel like re-reading 400 near-duplicate write-ups. Algo Hub inverts that: the unit of revision is a **pattern variation** (e.g. "Variable-size Sliding Window", "Binary Search on Answer") — a technique that shows up under a dozen different problem names. Each variation carries:

- **Core idea** — the actual algorithmic insight, not a restatement of the problem
- **When to use** — recognition cues for spotting the pattern in a new problem
- **Pitfalls** — the specific off-by-ones and traps that actually trip people up
- **Real examples** — links to real solved problems in this repo (`solutions/`) that use the pattern
- **Interactive dry run** (for a seeded subset) — step through real C++ code line-by-line with a synced visualization of the array/pointer/linked-list state, play/pause/step controls, and a live variables panel

Revision status (`Unsolved` / `Review` / `Mastered`) is tracked per pattern variation and persisted locally.

## Stack

Vite + React + TypeScript + Tailwind CSS, `zustand` for state (persisted to `localStorage`), `framer-motion` for visualizer transitions, `react-router-dom` for routing, `react-syntax-highlighter` for line-highlighted code, `react-resizable-panels` for the workspace split layout.

## Structure

- `src/data/patterns.ts` — the full pattern taxonomy (14 categories, ~40 variations)
- `src/data/content/` — hand-traced interactive dry runs for a seeded subset of variations
- `solutions/` — real `.cpp` files copied from [Strivers-A2Z-DSA-Sheet](https://github.com/IbrahimBagwan1/Strivers-A2Z-DSA-Sheet), referenced by pattern examples
- `scripts/verify-sources.mjs` — checks every `sourcePath` in `patterns.ts` resolves under `solutions/`

## Development

```bash
npm install
npm run dev
```

```bash
node scripts/verify-sources.mjs   # verify all example source paths resolve
npm run build                      # typecheck + production build
```
