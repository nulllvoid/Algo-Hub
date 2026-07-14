import type { ConceptConfig } from "../components/concept/ConceptVisual";

// Illustrative, ambient visualizations for variations that don't (yet) have a
// hand-traced interactive dry run. These loop on their own — no step controls,
// no claim to trace one specific real input — they exist purely to give the
// pattern a visual shape instead of a wall of text.
export const conceptVisualByVariationId: Record<string, ConceptConfig> = {
  "frequency-map-techniques": {
    kind: "array",
    frames: [
      { array: [4, 2, 4, 1, 2, 4], activeIndices: [0], pointers: [{ label: "i", index: 0 }], caption: "Scan left to right, incrementing a count for each value seen." },
      { array: [4, 2, 4, 1, 2, 4], activeIndices: [1, 2, 4], pointers: [{ label: "i", index: 4 }], caption: "count[4] = 2, count[2] = 2 so far — every repeat just bumps a counter, no re-scanning." },
      { array: [4, 2, 4, 1, 2, 4], activeIndices: [0, 2, 5], pointers: [{ label: "i", index: 5 }], caption: "By the end: count[4] = 3 is the highest — read the answer straight off the map." },
    ],
  },

  "fixed-size-window": {
    kind: "array",
    frames: [
      { array: [3, 1, 4, 1, 5, 9, 2], activeIndices: [0, 1, 2], caption: "A window of fixed size 3 starts at the left." },
      { array: [3, 1, 4, 1, 5, 9, 2], activeIndices: [1, 2, 3], caption: "Slide right by one: drop index 0, add index 3 — no need to re-sum the whole window." },
      { array: [3, 1, 4, 1, 5, 9, 2], activeIndices: [4, 5, 6], caption: "Keep sliding to the end — each step is O(1) work." },
    ],
  },

  "at-most-k-counting-trick": {
    kind: "array",
    frames: [
      { array: [1, 2, 1, 3, 2], activeIndices: [0], pointers: [{ label: "L", index: 0 }, { label: "R", index: 0 }], caption: "Compute atMost(K) with a growing window..." },
      { array: [1, 2, 1, 3, 2], activeIndices: [0, 1, 2, 3], pointers: [{ label: "L", index: 0 }, { label: "R", index: 3 }], caption: "...grow R until the window would exceed K distinct values, shrinking L when it does." },
      { array: [1, 2, 1, 3, 2], activeIndices: [2, 3, 4], pointers: [{ label: "L", index: 2 }, { label: "R", index: 4 }], caption: "exactly(K) = atMost(K) − atMost(K−1), computed the same way with a smaller K." },
    ],
  },

  "two-pointers-sorted-arrays": {
    kind: "array",
    frames: [
      { array: [1, 3, 5, 7, 9, 11], pointers: [{ label: "left", index: 0 }, { label: "right", index: 5 }], activeIndices: [0, 5], caption: "Start at both ends of the sorted array." },
      { array: [1, 3, 5, 7, 9, 11], pointers: [{ label: "left", index: 2 }, { label: "right", index: 4 }], activeIndices: [2, 4], caption: "Sum too big → move right left. Sum too small → move left right." },
      { array: [1, 3, 5, 7, 9, 11], pointers: [{ label: "left", index: 3 }, { label: "right", index: 3 }], activeIndices: [3], caption: "Pointers meet — every pair has been considered in O(n), not O(n²)." },
    ],
  },

  "prefix-sum-hashmap": {
    kind: "array",
    frames: [
      { array: [3, 4, -7, 1, 3, 3, 1, -4], activeIndices: [0], caption: "prefix[0] = 3. Store it in a hashmap: {3: 1 occurrence}." },
      { array: [3, 4, -7, 1, 3, 3, 1, -4], activeIndices: [0, 1, 2], caption: "prefix[2] = 0. If we're looking for sum = 0, this subarray [0..2] qualifies immediately." },
      { array: [3, 4, -7, 1, 3, 3, 1, -4], activeIndices: [3, 4, 5, 6, 7], caption: "Any later prefix minus an earlier stored prefix gives that subarray's sum — O(1) lookup instead of re-summing." },
    ],
  },

  "binary-search-on-answer": {
    kind: "array",
    frames: [
      { array: [1, 2, 3, 4, 5, 6, 7, 8], pointers: [{ label: "low", index: 0 }, { label: "high", index: 7 }], activeIndices: [0, 7], caption: "Treat this as the space of candidate answers, not array data." },
      { array: [1, 2, 3, 4, 5, 6, 7, 8], pointers: [{ label: "low", index: 0 }, { label: "mid", index: 3 }, { label: "high", index: 7 }], activeIndices: [3], caption: "feasible(mid)? If true, the answer is mid or smaller — search left." },
      { array: [1, 2, 3, 4, 5, 6, 7, 8], pointers: [{ label: "low", index: 4 }, { label: "high", index: 5 }], activeIndices: [4, 5], caption: "Keep halving until low meets high — that's the smallest feasible answer." },
    ],
  },

  "binary-search-2d-matrix": {
    kind: "grid",
    frames: [
      {
        cells: [["filled", "filled", "active"], ["filled", "filled", "filled"], ["empty", "empty", "empty"]],
        values: [[1, 3, 5], [7, 9, 11], [13, 15, 17]],
        caption: "Flattened, the matrix behaves like one sorted array — mid = row*cols + col.",
      },
      {
        cells: [["empty", "empty", "empty"], ["filled", "active", "filled"], ["empty", "empty", "empty"]],
        values: [[1, 3, 5], [7, 9, 11], [13, 15, 17]],
        caption: "Narrow toward the target the same way a 1D binary search would.",
      },
      {
        cells: [["empty", "empty", "empty"], ["empty", "empty", "empty"], ["active", "empty", "empty"]],
        values: [[1, 3, 5], [7, 9, 11], [13, 15, 17]],
        caption: "For matrices sorted only per-row/column, start from a corner instead and step in/down.",
      },
    ],
  },

  "fast-slow-pointer": {
    kind: "linked-list",
    frames: [
      {
        nodes: [{ id: "n1", value: 1, next: "n2" }, { id: "n2", value: 2, next: "n3" }, { id: "n3", value: 3, next: "n4" }, { id: "n4", value: 4, next: "n5" }, { id: "n5", value: 5, next: "n6" }, { id: "n6", value: 6, next: null }],
        activeNodeIds: ["n1"],
        pointerVars: { slow: "n1", fast: "n1" },
        caption: "Both pointers start at the head.",
      },
      {
        nodes: [{ id: "n1", value: 1, next: "n2" }, { id: "n2", value: 2, next: "n3" }, { id: "n3", value: 3, next: "n4" }, { id: "n4", value: 4, next: "n5" }, { id: "n5", value: 5, next: "n6" }, { id: "n6", value: 6, next: null }],
        activeNodeIds: ["n2", "n3"],
        pointerVars: { slow: "n2", fast: "n3" },
        caption: "slow moves 1 step, fast moves 2 — fast pulls ahead.",
      },
      {
        nodes: [{ id: "n1", value: 1, next: "n2" }, { id: "n2", value: 2, next: "n3" }, { id: "n3", value: 3, next: "n4" }, { id: "n4", value: 4, next: "n5" }, { id: "n5", value: 5, next: "n6" }, { id: "n6", value: 6, next: null }],
        activeNodeIds: ["n3", "n6"],
        pointerVars: { slow: "n3", fast: "n6" },
        caption: "When fast reaches the end, slow is exactly at the middle.",
      },
    ],
  },

  "dummy-node-merge-delete": {
    kind: "linked-list",
    frames: [
      {
        nodes: [{ id: "d", value: 0, next: "n1" }, { id: "n1", value: 1, next: "n2" }, { id: "n2", value: 2, next: "n3" }, { id: "n3", value: 3, next: null }],
        activeNodeIds: ["d"],
        pointerVars: { dummy: "d" },
        caption: "Prepend a dummy node before head — deleting node 1 no longer needs a special case.",
      },
      {
        nodes: [{ id: "d", value: 0, next: "n1" }, { id: "n1", value: 1, next: "n2" }, { id: "n2", value: 2, next: "n3" }, { id: "n3", value: 3, next: null }],
        activeNodeIds: ["n1", "n2"],
        pointerVars: { prev: "n1", target: "n2" },
        caption: "Walk to just before the node you want to remove.",
      },
      {
        nodes: [{ id: "d", value: 0, next: "n1" }, { id: "n1", value: 1, next: "n3" }, { id: "n3", value: 3, next: null }],
        activeNodeIds: ["n1", "n3"],
        pointerVars: { result: "d.next" },
        caption: "prev->next = prev->next->next — node 2 is unlinked. Return dummy.next as the head.",
      },
    ],
  },

  "monotonic-stack": {
    kind: "stack",
    frames: [
      { items: [2], caption: "Push 2 — the stack only ever holds an increasing run." },
      { items: [2, 5], caption: "5 > 2, so it's pushed too — still increasing." },
      { items: [3], caption: "3 arrives. Pop 5 (and then 2) — each pop just found its 'next greater element': 3." },
    ],
  },

  "stack-based-simulation": {
    kind: "stack",
    frames: [
      { items: ["("], caption: "Reading \"(()\": push '(' — an unresolved open bracket." },
      { items: ["(", "("], caption: "Another '(' — still unresolved, push again." },
      { items: ["("], caption: "A ')' arrives — it resolves the most recent '(' — pop." },
    ],
  },

  "subsequence-subset-generation": {
    kind: "tree",
    frames: [
      { highlightIds: ["t1"], labels: { t1: "{}", t2: "", t3: "", t4: "", t5: "", t6: "", t7: "" }, hiddenIds: ["t2", "t3", "t4", "t5", "t6", "t7"], caption: "Start with an empty subsequence at the root." },
      { highlightIds: ["t2", "t3"], labels: { t1: "{}", t2: "incl 1", t3: "excl 1" }, hiddenIds: ["t4", "t5", "t6", "t7"], caption: "Branch on the first element: include it, or exclude it." },
      { highlightIds: ["t4", "t5", "t6", "t7"], labels: { t1: "{}", t2: "incl 1", t3: "excl 1", t4: "{1,2}", t5: "{1}", t6: "{2}", t7: "{}" }, caption: "Every leaf of this include/exclude tree is one of the 2ⁿ subsequences." },
    ],
  },

  "constraint-backtracking": {
    kind: "tree",
    frames: [
      { highlightIds: ["t1"], labels: { t1: "start" }, hiddenIds: ["t2", "t3", "t4", "t5", "t6", "t7"], caption: "Place the first piece." },
      { visitedIds: ["t1", "t2"], highlightIds: ["t4"], labels: { t1: "start", t2: "try A", t4: "try A1" }, hiddenIds: ["t3", "t5", "t6", "t7"], caption: "Go deeper — place the next piece, checking the constraint each time." },
      { visitedIds: ["t1", "t2"], highlightIds: ["t2"], labels: { t1: "start", t2: "try A", t4: "✗" }, hiddenIds: ["t3", "t5", "t6", "t7"], caption: "Dead end — undo the last placement (backtrack) and try a different branch." },
    ],
  },

  "dfs-traversal": {
    kind: "tree",
    frames: [
      { highlightIds: ["t1"], visitedIds: [], caption: "Preorder: visit the root first." },
      { highlightIds: ["t2"], visitedIds: ["t1"], caption: "Then recurse into the left subtree entirely..." },
      { highlightIds: ["t3"], visitedIds: ["t1", "t2", "t4", "t5"], caption: "...before ever visiting the right subtree." },
    ],
  },

  "bfs-level-order": {
    kind: "tree",
    frames: [
      { highlightIds: ["t1"], caption: "Level 0: just the root." },
      { highlightIds: ["t2", "t3"], visitedIds: ["t1"], caption: "Level 1: both children, processed together via a queue." },
      { highlightIds: ["t4", "t5", "t6", "t7"], visitedIds: ["t1", "t2", "t3"], caption: "Level 2: the queue's size is snapshotted so levels never blur together." },
    ],
  },

  "bst-property-exploitation": {
    kind: "tree",
    frames: [
      { highlightIds: ["t1"], caption: "Searching for 5: at the root (4), 5 > 4 — go right." },
      { highlightIds: ["t3"], visitedIds: ["t1"], caption: "At 6: 5 < 6 — go left." },
      { highlightIds: ["t3"], visitedIds: ["t1"], labels: { t3: 6 }, caption: "The entire left subtree of 4 was skipped — that's the O(log n) win." },
    ],
  },

  "tree-construction-from-traversals": {
    kind: "tree",
    frames: [
      { highlightIds: ["t1"], hiddenIds: ["t2", "t3", "t4", "t5", "t6", "t7"], caption: "Preorder's first element is always the root." },
      { highlightIds: ["t2", "t3"], visitedIds: ["t1"], hiddenIds: ["t4", "t5", "t6", "t7"], caption: "Find that value in inorder — everything left of it is the left subtree, everything right is the right subtree." },
      { visitedIds: ["t1", "t2", "t3"], highlightIds: ["t4", "t5", "t6", "t7"], caption: "Recurse on each half to fill in the rest of the tree." },
    ],
  },

  "bfs-dfs-connected-components": {
    kind: "graph",
    frames: [
      { highlightIds: ["g1"], caption: "Start a search from an unvisited node." },
      { highlightIds: ["g2", "g6", "g4"], visitedIds: ["g1"], caption: "Visit every neighbor, marking each one visited immediately." },
      { visitedIds: ["g1", "g2", "g4", "g6"], highlightIds: ["g3", "g5"], caption: "Keep expanding until nothing new is reachable — that's one connected component." },
    ],
  },

  "topological-sort": {
    kind: "graph",
    frames: [
      { highlightIds: ["g1"], caption: "g1 has no incoming edges — it can go first." },
      { visitedIds: ["g1"], highlightIds: ["g2", "g6"], caption: "Removing g1 frees up g2 and g6 — their dependencies are now satisfied." },
      { visitedIds: ["g1", "g2", "g6", "g4"], highlightIds: ["g3", "g5"], caption: "Order: g1, g2, g6, g4, g3, g5 — every edge points forward in this order." },
    ],
  },

  "union-find-disjoint-set": {
    kind: "graph",
    frames: [
      { highlightIds: ["g1", "g2"], caption: "union(g1, g2) — merge their sets." },
      { highlightIds: ["g4", "g5", "g6"], visitedIds: ["g1", "g2"], caption: "A separate union(g4,g5), union(g5,g6) forms a second, unrelated set." },
      { visitedIds: ["g1", "g2", "g3", "g4"], highlightIds: ["g3"], caption: "union(g2, g3) merges the two sets into one — find(g1) now equals find(g6).", labels: {} },
    ],
  },

  "shortest-path": {
    kind: "graph",
    frames: [
      { highlightIds: ["g1"], caption: "Start at the source with distance 0." },
      { visitedIds: ["g1"], highlightIds: ["g2", "g6"], caption: "Relax every edge out of the closest unvisited node (Dijkstra) or every edge, repeatedly (Bellman-Ford)." },
      { visitedIds: ["g1", "g2", "g6", "g4"], highlightIds: ["g3"], caption: "Each relaxed edge either improves a distance or is skipped — the shortest path emerges from repeating this." },
    ],
  },

  "dp-1d": {
    kind: "grid",
    frames: [
      { cells: [["filled", "empty", "empty", "empty", "empty", "empty"]], values: [[1, null, null, null, null, null]], caption: "dp[0] is the base case." },
      { cells: [["filled", "filled", "active", "empty", "empty", "empty"]], values: [[1, 1, 2, null, null, null]], caption: "dp[i] is built from a couple of earlier entries — dp[2] = dp[1] + dp[0]." },
      { cells: [["filled", "filled", "filled", "filled", "filled", "active"]], values: [[1, 1, 2, 3, 5, 8]], caption: "Fill left to right once — no subproblem is ever recomputed." },
    ],
  },

  "dp-on-grids": {
    kind: "grid",
    frames: [
      { cells: [["filled", "filled", "filled"], ["filled", "empty", "empty"], ["empty", "empty", "empty"]], values: [[1, 1, 1], [1, null, null], [null, null, null]], caption: "First row and column each have only one predecessor." },
      { cells: [["filled", "filled", "filled"], ["filled", "active", "empty"], ["empty", "empty", "empty"]], values: [[1, 1, 1], [1, 2, null], [null, null, null]], caption: "dp[r][c] = dp[r-1][c] + dp[r][c-1] — combine the cell above and the cell to the left." },
      { cells: [["filled", "filled", "filled"], ["filled", "filled", "filled"], ["filled", "filled", "active"]], values: [[1, 1, 1], [1, 2, 3], [1, 3, 6]], caption: "Fill row by row until the bottom-right cell holds the answer." },
    ],
  },

  "knapsack-subset-sum-family": {
    kind: "grid",
    frames: [
      { cells: [["active", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty"]], values: [["T", null, null, null], [null, null, null, null]], caption: "dp[0][0] = true — sum 0 is always achievable with no items." },
      { cells: [["filled", "empty", "empty", "empty"], ["filled", "active", "empty", "empty"]], values: [["T", "F", "F", "F"], ["T", "T", null, null]], caption: "For each item: take it (jump capacity by its weight) or skip it — carry the row down." },
      { cells: [["filled", "empty", "empty", "empty"], ["filled", "filled", "filled", "active"]], values: [["T", "F", "F", "F"], ["T", "T", "T", "T"]], caption: "The last row/column tells you which totals are actually reachable." },
    ],
  },

  "dp-on-strings": {
    kind: "grid",
    frames: [
      { cells: [["filled", "empty", "empty"], ["empty", "empty", "empty"], ["empty", "empty", "empty"]], values: [[0, 0, 0], [0, null, null], [0, null, null]], caption: "Row 0 / column 0 represent an empty prefix of either string." },
      { cells: [["filled", "filled", "filled"], ["filled", "active", "empty"], ["filled", "empty", "empty"]], values: [[0, 0, 0], [0, 1, null], [0, null, null]], caption: "Matching characters extend the diagonal; mismatches take the best of up/left." },
      { cells: [["filled", "filled", "filled"], ["filled", "filled", "filled"], ["filled", "filled", "active"]], values: [[0, 0, 0], [0, 1, 1], [0, 1, 2]], caption: "The bottom-right cell holds the answer over the full two strings." },
    ],
  },

  "dp-on-stocks": {
    kind: "grid",
    frames: [
      { cells: [["active", "empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty", "empty"]], values: [[0, null, null, null, null], ["-p0", null, null, null, null]], caption: "Two running states per day: holding a share, or not." },
      { cells: [["filled", "active", "empty", "empty", "empty"], ["filled", "active", "empty", "empty", "empty"]], values: [[0, 0, null, null, null], ["-p0", "-p0", null, null, null]], caption: "notHold[i] = max(notHold[i-1], hold[i-1] + price[i]) — sell today or don't." },
      { cells: [["filled", "filled", "filled", "filled", "active"], ["filled", "filled", "filled", "filled", "filled"]], values: [[0, 0, 2, 2, 4], ["-p0", "-p0", "-1", "-1", "-1"]], caption: "The final notHold entry is the max profit — you'd never end while still holding." },
    ],
  },

  "mcm-partition-dp": {
    kind: "grid",
    frames: [
      { cells: [["empty", "active", "empty", "empty"], ["empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty"]], caption: "dp[i][j] = best cost to fully resolve the range [i..j]." },
      { cells: [["empty", "filled", "active", "empty"], ["empty", "empty", "filled", "empty"], ["empty", "empty", "empty", "empty"], ["empty", "empty", "empty", "empty"]], caption: "Try every split point k between i and j, combining dp[i][k] + dp[k+1][j] + a join cost." },
      { cells: [["empty", "filled", "filled", "active"], ["empty", "empty", "filled", "filled"], ["empty", "empty", "empty", "filled"], ["empty", "empty", "empty", "empty"]], caption: "Fill by increasing range length — dp[0][3] depends on every smaller range already being solved." },
    ],
  },

  "interval-scheduling": {
    kind: "interval",
    frames: [
      { scaleMax: 12, bars: [{ start: 1, end: 4 }, { start: 3, end: 6 }, { start: 5, end: 8 }, { start: 8, end: 11 }], caption: "Sort intervals by end time, not start time." },
      { scaleMax: 12, bars: [{ start: 1, end: 4, state: "selected" }, { start: 3, end: 6, state: "rejected" }, { start: 5, end: 8 }, { start: 8, end: 11 }], caption: "Take the first interval — it ends earliest, leaving the most room." },
      { scaleMax: 12, bars: [{ start: 1, end: 4, state: "selected" }, { start: 3, end: 6, state: "rejected" }, { start: 5, end: 8, state: "selected" }, { start: 8, end: 11, state: "selected" }], caption: "Keep taking the next interval that starts after the last one accepted ends." },
    ],
  },

  "exchange-argument-greedy": {
    kind: "array",
    frames: [
      { array: ["0.5", "0.3", "0.8", "0.2"], caption: "Value/weight ratios for each item, unsorted." },
      { array: ["0.8", "0.5", "0.3", "0.2"], activeIndices: [0], caption: "Sort descending by ratio — the best 'bang per unit' comes first." },
      { array: ["0.8", "0.5", "0.3", "0.2"], activeIndices: [0, 1], caption: "Take greedily from the front until capacity runs out — provably optimal for the fractional version." },
    ],
  },

  "kth-largest-smallest-selection": {
    kind: "tree",
    frames: [
      { highlightIds: ["t1"], labels: { t1: 9, t2: 4, t3: 6, t4: 1, t5: 3, t6: 5, t7: 8 }, caption: "A min-heap of size k — the root is always the smallest of the top-k seen so far." },
      { highlightIds: ["t1"], labels: { t1: 3, t2: 4, t3: 6, t4: 1, t5: 9, t6: 5, t7: 8 }, caption: "A new element larger than the root evicts the root and re-heapifies." },
      { highlightIds: ["t1"], labels: { t1: 5, t2: 6, t3: 8, t4: 9 }, hiddenIds: ["t5", "t6", "t7"], caption: "After processing everything, the root is exactly the kth largest." },
    ],
  },

  "merge-scheduling-with-heap": {
    kind: "tree",
    frames: [
      { highlightIds: ["t1"], labels: { t1: 2, t2: 5, t3: 4, t4: 9, t5: 7, t6: 8, t7: 6 }, caption: "The min-heap's root is always the next candidate to process." },
      { highlightIds: ["t2"], visitedIds: ["t1"], labels: { t1: 4, t2: 5, t3: 6, t4: 9, t5: 7, t6: 8 }, hiddenIds: ["t7"], caption: "Pop the root, push its replacement (e.g. the next element from the same list), re-heapify." },
      { highlightIds: ["t1"], visitedIds: ["t2"], labels: { t1: 5, t2: 7, t3: 6, t4: 9, t6: 8 }, hiddenIds: ["t5", "t7"], caption: "Repeat — this is how k sorted lists merge, or tasks get scheduled by priority." },
    ],
  },

  "bit-tricks-xor-properties": {
    kind: "array",
    frames: [
      { array: [4, 1, 2, 1, 2], activeIndices: [0, 1], caption: "XOR every element together — a ^ a = 0, so pairs cancel out." },
      { array: [4, 1, 2, 1, 2], activeIndices: [1, 3], caption: "The two 1s cancel..." },
      { array: [4, 1, 2, 1, 2], activeIndices: [0], caption: "...the two 2s cancel — only the unpaired 4 survives the XOR." },
    ],
  },

  "advanced-maths-on-bits": {
    kind: "array",
    frames: [
      { array: [2, 3, 4, 5, 6, 7, 8, 9], activeIndices: [0], caption: "Sieve of Eratosthenes: start at the first unmarked number, 2." },
      { array: [2, 3, 4, 5, 6, 7, 8, 9], activeIndices: [2, 4, 6], caption: "Mark every multiple of 2 starting from 2² — smaller multiples were already handled by smaller primes." },
      { array: [2, 3, 4, 5, 6, 7, 8, 9], activeIndices: [1, 3, 5, 7], caption: "Whatever's left unmarked is prime — no per-number trial division needed." },
    ],
  },

  "trie-construction-prefix-search": {
    kind: "tree",
    frames: [
      { highlightIds: ["t1"], labels: { t1: "c" }, hiddenIds: ["t2", "t3", "t4", "t5", "t6", "t7"], caption: "Insert \"cat\": c..." },
      { highlightIds: ["t2"], visitedIds: ["t1"], labels: { t1: "c", t2: "a" }, hiddenIds: ["t3", "t4", "t5", "t6", "t7"], caption: "...c-a..." },
      { highlightIds: ["t4"], visitedIds: ["t1", "t2"], labels: { t1: "c", t2: "a", t4: "t ●" }, hiddenIds: ["t3", "t5", "t6", "t7"], caption: "...c-a-t, marked end-of-word. Inserting \"car\" next reuses the shared \"ca\" path." },
    ],
  },

  "xor-trie": {
    kind: "tree",
    frames: [
      { highlightIds: ["t1"], labels: { t1: "bit 2" }, hiddenIds: ["t2", "t3", "t4", "t5", "t6", "t7"], caption: "Insert each number's bits, MSB first, as a path down the trie." },
      { highlightIds: ["t3"], visitedIds: ["t1"], labels: { t1: "bit 2", t2: "0", t3: "1" }, hiddenIds: ["t4", "t5", "t6", "t7"], caption: "To maximize XOR, greedily walk toward the opposite bit at each level, when it exists." },
      { highlightIds: ["t6"], visitedIds: ["t1", "t3"], labels: { t1: "bit 2", t2: "0", t3: "1", t6: "0" }, hiddenIds: ["t4", "t5", "t7"], caption: "Higher bit positions dominate the result, which is exactly why greedy-from-MSB is optimal here." },
    ],
  },
};
