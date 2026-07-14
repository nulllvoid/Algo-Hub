import type { PatternCategory, PatternVariation } from "../types";

export const categories: PatternCategory[] = [
  { id: "hashing", name: "Hashing & Frequency Counting", description: "Trade space for O(1) average lookups to avoid nested loops." },
  { id: "two-pointers-sliding-window", name: "Two Pointers & Sliding Window", description: "Maintain a moving range or pair of indices instead of re-scanning." },
  { id: "prefix-sums-kadane", name: "Prefix Sums & Kadane's", description: "Precompute running totals so range queries become O(1)." },
  { id: "binary-search", name: "Binary Search", description: "Halve the search space using a monotonic property, not just sorted arrays." },
  { id: "linked-list", name: "Linked List Pointer Manipulation", description: "Rewire next pointers in place, tracking prev/curr/next carefully." },
  { id: "stack-monotonic", name: "Stack & Monotonic Stack", description: "Use a stack to answer 'nearest greater/smaller' style questions in O(n)." },
  { id: "recursion-backtracking", name: "Recursion & Backtracking", description: "Explore a decision tree, undoing choices that violate a constraint." },
  { id: "trees-bst", name: "Trees & BSTs", description: "Recursive structure mirrors recursive traversal; BSTs add an ordering invariant." },
  { id: "graphs", name: "Graphs", description: "Model relationships as nodes/edges; traverse, order, or connect them." },
  { id: "dynamic-programming", name: "Dynamic Programming", description: "Break a problem into overlapping subproblems and cache the results." },
  { id: "greedy", name: "Greedy", description: "Make the locally optimal choice, provable via exchange argument." },
  { id: "heaps", name: "Heaps / Priority Queue", description: "Keep the min/max of a changing set accessible in O(log n)." },
  { id: "bit-manipulation", name: "Bit Manipulation", description: "Exploit XOR/AND/OR properties for constant-space tricks." },
  { id: "tries", name: "Tries", description: "A prefix tree for fast string/bit-prefix lookups." },
];

export const variations: PatternVariation[] = [
  // ── Hashing & Frequency Counting ──────────────────────────────
  {
    id: "complement-pair-lookup",
    categoryId: "hashing",
    name: "Complement / Pair Lookup",
    difficulty: "Easy",
    coreIdea:
      "For each element, compute the value that would complete the pair (e.g. target - nums[i]) and check a hashmap built from elements seen so far. If it's there, you've found your pair in one pass — no nested loop needed.",
    whenToUse:
      "You need to find a pair (or count pairs) satisfying `a + b = target` (or any relation you can invert), and the array isn't sorted or you don't want to sort it.",
    pitfalls:
      "- Insert into the map **after** checking for the complement, or you'll match an element with itself.\n- Store indices (not just booleans) if the problem needs positions, not just existence.\n- Watch for duplicate values needing distinct indices — decide whether the map should hold the first or last occurrence.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    examples: [
      { title: "Two Sum", sourcePath: "Step 3 Solve Problems on Arrays/2. medium/two_sum_optimal.cpp" },
      { title: "Two Sum IV (BST)", sourcePath: "Step 14 Binary Search Trees/2. Practice Problems/two_sum_4.cpp" },
    ],
  },
  {
    id: "frequency-map-techniques",
    categoryId: "hashing",
    name: "Frequency-Map Techniques",
    difficulty: "Easy",
    coreIdea:
      "Count occurrences of each element in a single pass, then answer questions (most frequent, majority, distinct count) by scanning the map instead of the original array again.",
    whenToUse:
      "The question is fundamentally about 'how many times does X appear', 'which element appears most/least', or 'is there a majority element' and array values aren't bounded enough for a plain count array.",
    pitfalls:
      "- Use `unordered_map` for arbitrary values, but a fixed-size array is faster when values are bounded (e.g. lowercase letters, 0-255).\n- A true majority element (> n/2) can be found in O(1) space with Boyer-Moore voting — don't reach for a hashmap if space is constrained.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n) (O(1) for Boyer-Moore majority variant)",
    examples: [
      { title: "Frequency of Elements", sourcePath: "Step 1 Learn the basics/hashing/frequency.cpp" },
      { title: "Highest Occurring Element", sourcePath: "Step 1 Learn the basics/hashing/highest_occuring_elem.cpp" },
      { title: "Map Frequency", sourcePath: "Step 1 Learn the basics/hashing/map_frequency.cpp" },
      { title: "Majority Element (> n/2)", sourcePath: "Step 3 Solve Problems on Arrays/2. medium/majority_element.cpp" },
    ],
  },

  // ── Two Pointers & Sliding Window ─────────────────────────────
  {
    id: "fixed-size-window",
    categoryId: "two-pointers-sliding-window",
    name: "Fixed-size Window",
    difficulty: "Medium",
    coreIdea:
      "Maintain a window of exactly k elements. Slide it one step at a time: add the entering element, remove the leaving element, update the running answer — never recompute the whole window from scratch.",
    whenToUse:
      "The problem explicitly fixes a window size k (max/min sum of a subarray of size k, max value in every window of size k).",
    pitfalls:
      "- Prime the window with the first k elements before you start sliding, or the first slide will be off by one.\n- For 'max in window' use a monotonic deque, not a linear scan per window, or you degrade to O(n·k).",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) or O(k) for a deque-based max/min",
    examples: [
      { title: "Sliding Window Maximum", sourcePath: "Step 9 Stack and Queues/4. Implementation Problem/sliding_window_max.cpp" },
      { title: "Longest Subarray with Sum K (positives)", sourcePath: "Step 3 Solve Problems on Arrays/1. easy/longest_subarr_sum_k.cpp" },
    ],
  },
  {
    id: "variable-size-window",
    categoryId: "two-pointers-sliding-window",
    name: "Variable-size Window (shrink on violation)",
    difficulty: "Medium",
    coreIdea:
      "Grow the window by advancing `right` one step at a time. Whenever the window violates a constraint (e.g. a repeated character), shrink it from `left` until it's valid again. The answer is usually the max/min window size seen while valid.",
    whenToUse:
      "You need the longest/shortest contiguous subarray or substring satisfying a constraint, and the constraint is monotonic — adding elements can only make it 'more violated', so once you shrink until valid, you never need to re-check earlier positions.",
    pitfalls:
      "- The shrink step must be a `while`, not an `if` — one violation can require moving `left` multiple steps.\n- Update the best answer at the right moment: after the window becomes valid, not while it's still invalid.\n- Reset/decrement your tracking structures (char counts, distinct counts) exactly when the shrinking element leaves — an off-by-one here silently corrupts every later window.",
    timeComplexity: "O(n) — left and right each move at most n times",
    spaceComplexity: "O(k) for the auxiliary count structure",
    examples: [
      { title: "Longest Substring Without Repeating Characters", sourcePath: "Step 10 Sliding Window & Two Pointer Combined Problems/1. Medium Problems/longest_substring_without_repeating characters.cpp" },
      { title: "Fruits Into Baskets (at most 2 types)", sourcePath: "Step 10 Sliding Window & Two Pointer Combined Problems/1. Medium Problems/fruits_baskets.cpp" },
      { title: "Longest Repeating Character Replacement", sourcePath: "Step 10 Sliding Window & Two Pointer Combined Problems/1. Medium Problems/longest_repeating_char_replacement.cpp" },
    ],
  },
  {
    id: "at-most-k-counting-trick",
    categoryId: "two-pointers-sliding-window",
    name: "\"At Most K\" Counting Trick",
    difficulty: "Hard",
    coreIdea:
      "To count subarrays with **exactly** k of something, count subarrays with **at most** k, then subtract the count with **at most k-1**. 'At most' windows are much easier to slide than 'exactly' windows, which don't shrink monotonically.",
    whenToUse:
      "The problem asks to count subarrays/substrings with exactly k distinct elements, exactly k odd numbers, exactly k of some property — and a direct sliding window feels like it needs to grow and shrink non-monotonically.",
    pitfalls:
      "- This only works because `exactly(k) = atMost(k) - atMost(k-1)` — don't try to force a single window to track 'exactly'.\n- Guard `k - 1` against going negative when k = 0.",
    timeComplexity: "O(n) — two 'at most' passes, each O(n)",
    spaceComplexity: "O(n) or O(k) depending on the counted property",
    examples: [
      { title: "Count Number of Nice Subarrays", sourcePath: "Step 10 Sliding Window & Two Pointer Combined Problems/1. Medium Problems/count_no_nice_subarrays.cpp" },
      { title: "Binary Subarrays With Sum", sourcePath: "Step 10 Sliding Window & Two Pointer Combined Problems/1. Medium Problems/binary_subarray_with_sum.cpp" },
      { title: "Subarrays With K Different Integers", sourcePath: "Step 10 Sliding Window & Two Pointer Combined Problems/2. Hard Problems/subarray_with_k_different_integers.cpp" },
    ],
  },
  {
    id: "two-pointers-sorted-arrays",
    categoryId: "two-pointers-sliding-window",
    name: "Two Pointers on Sorted Arrays",
    difficulty: "Medium",
    coreIdea:
      "With the array sorted, start pointers at both ends. If the pair sum is too small, move `left` right (increase); if too large, move `right` left (decrease). Each move eliminates a whole set of possibilities other than a nested loop would recheck.",
    whenToUse:
      "The array is sorted (or you can sort it) and you're looking for pairs/triplets/quadruplets meeting a sum condition, or merging two sorted sequences.",
    pitfalls:
      "- Skip duplicate values at both `left` and `right` after finding a match, or you'll emit the same triplet/quadruplet repeatedly.\n- Sorting costs O(n log n) up front — don't forget that in the overall complexity, and don't sort if the problem needs original indices.",
    timeComplexity: "O(n log n) with the sort, O(n) per fixed prefix for 3Sum/4Sum",
    spaceComplexity: "O(1) extra beyond the output",
    examples: [
      { title: "3 Sum", sourcePath: "Step 3 Solve Problems on Arrays/3. hard/3_sum.cpp" },
      { title: "4 Sum (optimal)", sourcePath: "Step 3 Solve Problems on Arrays/3. hard/4Sum_optimal.cpp" },
      { title: "Union of Two Sorted Arrays", sourcePath: "Step 3 Solve Problems on Arrays/1. easy/union_sorted_arr.cpp" },
    ],
  },

  // ── Prefix Sums & Kadane's ─────────────────────────────────────
  {
    id: "kadanes-running-max",
    categoryId: "prefix-sums-kadane",
    name: "Kadane's Running Max",
    difficulty: "Medium",
    coreIdea:
      "Track the best subarray sum ending exactly at the current index (`currentSum`). At each step, decide whether extending the previous subarray is better than starting fresh here: `currentSum = max(nums[i], currentSum + nums[i])`. The global answer is the max `currentSum` seen.",
    whenToUse:
      "You need the maximum (or minimum) sum/product of a contiguous subarray, and a brute-force would be O(n²) by checking every start/end pair.",
    pitfalls:
      "- 'Start fresh' means resetting to `nums[i]`, not to 0 — an all-negative array needs this to still return the least-negative single element.\n- For maximum **product** (not sum), track both a running max and running min, since a negative number can flip the min into the new max.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    examples: [
      { title: "Maximum Subarray Sum (Kadane's)", sourcePath: "Step 3 Solve Problems on Arrays/2. medium/max_subarray_sum.cpp" },
      { title: "Maximum Subarray Sum — return indices", sourcePath: "Step 3 Solve Problems on Arrays/2. medium/max_subarray_sum_index.cpp" },
      { title: "Maximum Product Subarray", sourcePath: "Step 3 Solve Problems on Arrays/3. hard/maximum_product_subarray.cpp" },
    ],
  },
  {
    id: "prefix-sum-hashmap",
    categoryId: "prefix-sums-kadane",
    name: "Prefix Sum + Hashmap",
    difficulty: "Medium",
    coreIdea:
      "Precompute running prefix sums. The sum of any subarray [i+1..j] is `prefix[j] - prefix[i]`. To find a subarray summing to k, check at each j whether `prefix[j] - k` has been seen before as some earlier `prefix[i]`, using a hashmap of prefix-sum → count/index.",
    whenToUse:
      "You need subarray sums (or XORs) equal to a target, and the array can contain negative numbers — which rules out a sliding window, since the window can't be shrunk monotonically.",
    pitfalls:
      "- Seed the map with `{0: 1}` (or index -1) before the loop, or you'll miss subarrays that start at index 0.\n- Insert the current prefix sum into the map **after** checking for `prefix[j] - k`, same reasoning as the two-sum pair lookup.\n- This is the XOR analogue too: `prefix[j] XOR k` for subarray XOR problems, since XOR is its own inverse.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    examples: [
      { title: "Subarray Sum Equals K", sourcePath: "Step 3 Solve Problems on Arrays/2. medium/subarray_sum_equals_k.cpp" },
      { title: "Largest Subarray with Sum 0", sourcePath: "Step 3 Solve Problems on Arrays/3. hard/largest_subarray_sum_0.cpp" },
      { title: "Subarray XOR Equals K (optimal)", sourcePath: "Step 3 Solve Problems on Arrays/3. hard/sub_array_xor_k_optimal.cpp" },
    ],
  },

  // ── Binary Search ───────────────────────────────────────────────
  {
    id: "search-space-narrowing",
    categoryId: "binary-search",
    name: "Search-Space Narrowing on Sorted Array",
    difficulty: "Easy",
    coreIdea:
      "Repeatedly compare the target to the middle element and discard the half that can't contain it. The trick beyond 'find exact value' is knowing which loop invariant to use when you want a **boundary** (first/last occurrence, insert position) rather than a single match.",
    whenToUse:
      "The array is sorted and you need to find a value, or the first/last position satisfying a condition, or where a value would be inserted.",
    pitfalls:
      "- To find the **first** occurrence, don't stop at the first match — record it and keep searching left (`high = mid - 1`). To find the **last**, keep searching right (`low = mid + 1`).\n- Use `mid = low + (high - low) / 2`, never `(low + high) / 2` — the naive form overflows for large indices in other languages and is a habit worth keeping even where it doesn't.\n- `while (low <= high)` for finding a specific value; `while (low < high)` for narrowing to a single boundary/inflection point — mixing these up causes infinite loops or off-by-one misses.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    examples: [
      { title: "First and Last Position of Element", sourcePath: "Step 4 Binary Search/1. BS on 1D Array/first_last_position.cpp" },
      { title: "Lower Bound", sourcePath: "Step 4 Binary Search/1. BS on 1D Array/lower_bound.cpp" },
      { title: "Upper Bound", sourcePath: "Step 4 Binary Search/1. BS on 1D Array/upper_bound.cpp" },
      { title: "Count Occurrences in Sorted Array", sourcePath: "Step 4 Binary Search/1. BS on 1D Array/count_occurences_sorted_arr.cpp" },
    ],
  },
  {
    id: "narrowing-rotation-duplicates",
    categoryId: "binary-search",
    name: "Narrowing Under Rotation / Duplicates",
    difficulty: "Hard",
    coreIdea:
      "In a rotated sorted array, at least one half of [low..mid] or [mid..high] is always properly sorted. Identify which half is sorted by comparing the endpoints, then check whether the target falls in that half's range — if it does, search there; if not, search the other half.",
    whenToUse:
      "The array is sorted but then rotated at an unknown pivot, and you still need O(log n) search or need to find the rotation point / minimum element.",
    pitfalls:
      "- With duplicates, `nums[low] == nums[mid] == nums[high]` makes it impossible to tell which half is sorted — the only safe move is `low++; high--;` and retry, which degrades worst case to O(n).\n- For finding the minimum specifically: compare `nums[mid]` to `nums[high]` (not `nums[low]`) — if `nums[mid] > nums[high]` the minimum is strictly to the right of mid, else it's at mid or to the left.\n- Initialize `high = nums.size() - 1`, not `nums.size()` — the latter is a classic off-by-one that reads one past the array end.",
    timeComplexity: "O(log n) average, O(n) worst case with heavy duplicates",
    spaceComplexity: "O(1)",
    examples: [
      { title: "Search in Rotated Sorted Array (unique)", sourcePath: "Step 4 Binary Search/1. BS on 1D Array/search_rotated_sorted_arr.cpp" },
      { title: "Search in Rotated Sorted Array II (duplicates)", sourcePath: "Step 4 Binary Search/1. BS on 1D Array/search_rotated_sorted_arr2.cpp" },
      { title: "Find Minimum in Rotated Sorted Array", sourcePath: "Step 4 Binary Search/1. BS on 1D Array/find_min_rotated_array.cpp" },
      { title: "How Many Times Array Is Rotated", sourcePath: "Step 4 Binary Search/1. BS on 1D Array/how_many_times_array_rotated.cpp" },
    ],
  },
  {
    id: "binary-search-on-answer",
    categoryId: "binary-search",
    name: "Binary Search on Answer (Monotonic Predicate)",
    difficulty: "Hard",
    coreIdea:
      "Instead of searching over array indices, binary search over the **space of possible answers** (e.g. every possible 'minimum distance' or 'maximum capacity'). Write a `feasible(x)` check that's monotonic — true for all x beyond some threshold, false before it — then binary search for that threshold.",
    whenToUse:
      "You recognize the phrase 'minimize the maximum' or 'maximize the minimum', and you can write a yes/no feasibility check for a candidate answer that runs in linear (or better) time.",
    pitfalls:
      "- The hardest part is proving `feasible(x)` is monotonic — if it isn't, binary search silently gives a wrong answer with no error. Convince yourself of monotonicity before coding.\n- Decide up front whether you're searching for the first `true` or the last `false` — the loop bounds and final return value differ.\n- Set the search bounds tight (e.g. `low = max element`, `high = sum of elements`) — loose bounds just cost a few extra iterations, but wrong bounds miss the answer entirely.",
    timeComplexity: "O(n · log(range of possible answers))",
    spaceComplexity: "O(1)",
    examples: [
      { title: "Aggressive Cows", sourcePath: "Step 4 Binary Search/2. BS on Answers/aggressive_cows.cpp" },
      { title: "Koko Eating Bananas", sourcePath: "Step 4 Binary Search/2. BS on Answers/ko_ko_eating_banana.cpp" },
      { title: "Book Allocation Problem", sourcePath: "Step 4 Binary Search/2. BS on Answers/book_allocation_problem.cpp" },
      { title: "Capacity to Ship Packages Within D Days", sourcePath: "Step 4 Binary Search/2. BS on Answers/capacity_to_ship_packages_within_d_days.cpp" },
    ],
  },
  {
    id: "binary-search-2d-matrix",
    categoryId: "binary-search",
    name: "Binary Search on 2D Matrix",
    difficulty: "Medium",
    coreIdea:
      "If a 2D matrix is sorted row-wise and column-wise such that it behaves like one flattened sorted array, map a single mid-index back to `(row, col)` via `row = mid / cols`, `col = mid % cols` and binary search as usual. When rows/columns are independently sorted but not fully flattenable, search from a corner instead.",
    whenToUse:
      "Searching for a value or a boundary condition in a matrix where rows (and often columns) are sorted.",
    pitfalls:
      "- Confirm whether the matrix is 'fully sorted' (last element of row i < first element of row i+1) before treating it as flattenable — if not, the corner-search approach (start top-right, move left/down) is the correct one instead.\n- Double-check the `mid / cols` and `mid % cols` conversion against the actual matrix dimensions — swapping rows/cols here is a common silent bug.",
    timeComplexity: "O(log(rows·cols)) flattened, O(rows + cols) corner search",
    spaceComplexity: "O(1)",
    examples: [
      { title: "Search a 2D Matrix", sourcePath: "Step 4 Binary Search/3. BS on 2D Arrays/search_2D_matrix.cpp" },
      { title: "Search a 2D Matrix II", sourcePath: "Step 4 Binary Search/3. BS on 2D Arrays/search_2D_matrix2.cpp" },
      { title: "Median of a Row-wise Sorted Matrix", sourcePath: "Step 4 Binary Search/3. BS on 2D Arrays/matrix_median.cpp" },
    ],
  },

  // ── Linked List Pointer Manipulation ────────────────────────────
  {
    id: "in-place-reversal",
    categoryId: "linked-list",
    name: "In-place Reversal",
    difficulty: "Easy",
    coreIdea:
      "Walk the list once, keeping three pointers: `prev`, `curr`, `next`. At each node, save `next` before overwriting `curr->next = prev`, then advance all three. When `curr` becomes null, `prev` is the new head.",
    whenToUse:
      "You need to reverse a whole list, a sublist between positions, or groups of k nodes, without allocating a new list.",
    pitfalls:
      "- Save `next = curr->next` **before** reassigning `curr->next = prev`, or you lose the rest of the list irrecoverably.\n- For k-group reversal, first check the group actually has k nodes remaining — if not, per the problem's rules, that tail may need to stay unreversed.\n- The recursive version reverses conceptually 'from the end', which is the opposite mental model from the iterative version — don't mix the two half-way through.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) iterative, O(n) recursive (call stack)",
    examples: [
      { title: "Reverse a Linked List (iterative)", sourcePath: "Step 6 Learn LinkedList/3. medium problems on LL/reverse_linked_list.cpp" },
      { title: "Reverse a Linked List (recursive)", sourcePath: "Step 6 Learn LinkedList/3. medium problems on LL/reverse_LL_recursive.cpp" },
      { title: "Reverse Nodes in k-Group", sourcePath: "Step 6 Learn LinkedList/5. hard problems on LL/reverse_nodes_k_group.cpp" },
    ],
  },
  {
    id: "fast-slow-pointer",
    categoryId: "linked-list",
    name: "Fast/Slow Pointer",
    difficulty: "Medium",
    coreIdea:
      "Advance one pointer one step at a time and another two steps at a time. If there's a cycle, the fast pointer eventually laps the slow one inside it (Floyd's algorithm). With no cycle, fast reaches the end first — and when it does, slow is exactly at the middle.",
    whenToUse:
      "Finding the middle of a list in one pass, or detecting/locating the start of a cycle, without extra space for a visited-set.",
    pitfalls:
      "- Check `fast != nullptr && fast->next != nullptr` in the loop condition — checking only `fast` crashes on `fast->next->next`.\n- To find the cycle's **start** (not just detect one), after the pointers meet, reset one pointer to the head and advance both one step at a time — they meet exactly at the cycle start. This is a separate, non-obvious phase most people forget.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    examples: [
      { title: "Middle of the Linked List", sourcePath: "Step 6 Learn LinkedList/3. medium problems on LL/middle_linked_list.cpp" },
      { title: "Linked List Cycle (detect)", sourcePath: "Step 6 Learn LinkedList/3. medium problems on LL/linked_list_cycle.cpp" },
      { title: "Linked List Cycle II (find start)", sourcePath: "Step 6 Learn LinkedList/3. medium problems on LL/linked_list_cycle2.cpp" },
    ],
  },
  {
    id: "dummy-node-merge-delete",
    categoryId: "linked-list",
    name: "Dummy-Node Merge/Delete",
    difficulty: "Medium",
    coreIdea:
      "Prepend a sentinel 'dummy' node before the real head so that deleting or inserting at the head doesn't need special-casing — every operation, including on the first real node, looks the same as any other.",
    whenToUse:
      "Deleting a node that might be the head (nth-from-end, middle node), or merging/adding two lists where the result's head isn't known in advance.",
    pitfalls:
      "- Return `dummy->next`, not `dummy` itself, as the new head.\n- For 'remove nth from end', advance one pointer n steps first, then move both together — this converts an 'from the end' problem into a 'from the front' two-pointer problem in one pass instead of two.\n- When adding two numbers as lists (digit-by-digit with carry), don't forget a final carry can produce one extra node beyond both input lists' length.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) beyond the dummy node",
    examples: [
      { title: "Delete the Middle Node", sourcePath: "Step 6 Learn LinkedList/3. medium problems on LL/delete_middle_node.cpp" },
      { title: "Remove Nth Node From End of List", sourcePath: "Step 6 Learn LinkedList/3. medium problems on LL/remove_nth_node_from_endlist.cpp" },
      { title: "Add Two Numbers (as linked lists)", sourcePath: "Step 6 Learn LinkedList/3. medium problems on LL/add_2_numbers_LL.cpp" },
    ],
  },

  // ── Stack & Monotonic Stack ─────────────────────────────────────
  {
    id: "monotonic-stack",
    categoryId: "stack-monotonic",
    name: "Monotonic Stack",
    difficulty: "Medium",
    coreIdea:
      "Keep a stack whose elements stay in strictly increasing (or decreasing) order. When a new element breaks that order, pop everything smaller (or larger) than it — each popped element has just found its 'next greater/smaller' element, which is the current one.",
    whenToUse:
      "You need, for every element, the nearest element to its left/right that's greater/smaller — histograms, temperature-wait-days, trapping rain water, and similar 'nearest boundary' problems.",
    pitfalls:
      "- Store **indices** on the stack, not values — you usually need the distance or position of the answer, not just the value.\n- Decide 'strictly greater' vs 'greater or equal' carefully; it changes how duplicates are handled and is a frequent off-by-one source.\n- For circular arrays (next greater element II), iterate `2n` times using `i % n` instead of physically doubling the array.",
    timeComplexity: "O(n) — each element is pushed and popped at most once",
    spaceComplexity: "O(n)",
    examples: [
      { title: "Next Greater Element", sourcePath: "Step 9 Stack and Queues/3. Monotonic Stack/next_greater_element.cpp" },
      { title: "Next Smaller Element", sourcePath: "Step 9 Stack and Queues/3. Monotonic Stack/next_smaller_element.cpp" },
      { title: "Trapping Rain Water", sourcePath: "Step 9 Stack and Queues/3. Monotonic Stack/trapping_rain_water.cpp" },
      { title: "Largest Rectangle in Histogram", sourcePath: "Step 9 Stack and Queues/3. Monotonic Stack/largest_rectangle_histogram.cpp" },
    ],
  },
  {
    id: "stack-based-simulation",
    categoryId: "stack-monotonic",
    name: "Stack-based Simulation",
    difficulty: "Medium",
    coreIdea:
      "Simulate the process directly with a stack representing 'unresolved state so far' — an open bracket waiting to be closed, an asteroid that might still collide, a digit that might still be removed. Each new input either resolves something on top of the stack or gets pushed itself.",
    whenToUse:
      "The problem describes a step-by-step process with a notion of 'the most recent unresolved thing' — matching brackets, collisions, or building the smallest number by removing digits.",
    pitfalls:
      "- Always check the stack isn't empty before popping/peeking — a stray closing bracket or an asteroid with nothing left to collide with is a normal case, not an error.\n- For asteroid collisions, a single new asteroid can destroy **multiple** stack entries — use a `while`, not an `if`, to resolve all collisions before deciding the new asteroid's fate.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    examples: [
      { title: "Valid Parenthesis", sourcePath: "Step 9 Stack and Queues/1. Learning/valid_paranthesis.cpp" },
      { title: "Asteroid Collision", sourcePath: "Step 9 Stack and Queues/3. Monotonic Stack/asteroids_collision.cpp" },
      { title: "Remove K Digits", sourcePath: "Step 9 Stack and Queues/3. Monotonic Stack/remove_k_digits.cpp" },
    ],
  },

  // ── Recursion & Backtracking ────────────────────────────────────
  {
    id: "subsequence-subset-generation",
    categoryId: "recursion-backtracking",
    name: "Subsequence / Subset Generation",
    difficulty: "Medium",
    coreIdea:
      "At each index, branch into two recursive calls: one that includes the current element, one that excludes it. The recursion tree's leaves are exactly the 2^n subsequences — no explicit 'undo' is needed since each branch just doesn't include what the other did.",
    whenToUse:
      "Generating all subsets/subsequences, or counting/finding those meeting a sum condition, where order within the subsequence doesn't matter.",
    pitfalls:
      "- 'Include/exclude' naturally avoids duplicate subsets when all elements are distinct — with duplicate input values, you additionally need to sort first and skip adjacent duplicates at the same recursion depth to avoid duplicate subsets in the output.\n- Passing the running subset by reference and mutating it (push/pop) is far cheaper than copying it at every call — but then you *must* pop after the recursive call returns, or sibling branches see a corrupted subset.",
    timeComplexity: "O(2^n · n) — 2^n subsequences, O(n) to copy each into the output",
    spaceComplexity: "O(n) recursion depth, plus output size",
    examples: [
      { title: "Power Set", sourcePath: "Step 7 Recursion PatternWise/2. Subsequences Pattern/power_set.cpp" },
      { title: "Subsets Summing to K", sourcePath: "Step 7 Recursion PatternWise/2. Subsequences Pattern/sum_subsets_1.cpp" },
      { title: "Combination Sum", sourcePath: "Step 7 Recursion PatternWise/2. Subsequences Pattern/combination_sum.cpp" },
    ],
  },
  {
    id: "constraint-backtracking",
    categoryId: "recursion-backtracking",
    name: "Constraint Backtracking",
    difficulty: "Hard",
    coreIdea:
      "Place one piece of the solution at a time (a queen, a digit, a letter). Before recursing deeper, check the constraint (no attacking queen, valid Sudoku placement). If the branch is invalid, or a deeper call fails, undo the placement and try the next option — the 'backtrack' is that explicit undo step.",
    whenToUse:
      "You're building a solution incrementally under hard constraints and need to explore all valid completions (N-Queens, Sudoku) or prove one exists (word search).",
    pitfalls:
      "- Every placement needs a matching un-placement on the way back out, in the same function, after the recursive call — forgetting this leaks state into sibling branches.\n- Validate constraints incrementally (as you place each piece) rather than only checking the full board at the end — this prunes invalid branches early instead of wasting time completing them.\n- For grid search (word search, rat in a maze), mark cells 'visited' before recursing and unmark them on the way back — and check grid boundaries before every recursive step, not after.",
    timeComplexity: "Exponential in general, pruned heavily by constraint checks",
    spaceComplexity: "O(n) recursion depth (plus board/grid state)",
    examples: [
      { title: "N-Queens", sourcePath: "Step 7 Recursion PatternWise/3. Trying All combos/n_queens.cpp" },
      { title: "Sudoku Solver", sourcePath: "Step 7 Recursion PatternWise/3. Trying All combos/sudoku_solver.cpp" },
      { title: "Word Search", sourcePath: "Step 7 Recursion PatternWise/3. Trying All combos/word_search.cpp" },
      { title: "Rat in a Maze", sourcePath: "Step 7 Recursion PatternWise/3. Trying All combos/rat_in_maze.cpp" },
    ],
  },

  // ── Trees & BSTs ─────────────────────────────────────────────────
  {
    id: "dfs-traversal",
    categoryId: "trees-bst",
    name: "DFS Traversal (Pre/In/Post-order)",
    difficulty: "Easy",
    coreIdea:
      "Visit a node relative to its children: before both (preorder), between them (inorder), or after both (postorder). Each order is just a different placement of 'process root' around the two recursive calls on left and right subtrees.",
    whenToUse:
      "You need to visit every node — inorder for BSTs gives sorted order, preorder is useful for copying/serializing a tree's shape, postorder is needed when children must be fully processed before the parent (e.g. computing height, deleting a tree).",
    pitfalls:
      "- The iterative versions (using an explicit stack) aren't just 'the recursive version with a stack' — postorder iteratively is the trickiest, often implemented as a reversed 'root-right-left' preorder.\n- Always null-check before recursing into `node->left` / `node->right` — the base case is the single most common thing to omit under interview pressure.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h) recursion stack, h = tree height (O(n) worst case for a skewed tree)",
    examples: [
      { title: "Preorder Traversal", sourcePath: "Step 13 Binary Trees/1. Traversals/preorder_traversal.cpp" },
      { title: "Inorder Traversal", sourcePath: "Step 13 Binary Trees/1. Traversals/inorder_traversal.cpp" },
      { title: "Postorder Traversal", sourcePath: "Step 13 Binary Trees/1. Traversals/postorder_traversal.cpp" },
    ],
  },
  {
    id: "bfs-level-order",
    categoryId: "trees-bst",
    name: "BFS / Level-order",
    difficulty: "Medium",
    coreIdea:
      "Use a queue seeded with the root. Process one full level at a time by snapshotting the queue's current size before pushing that level's children — this naturally groups nodes by depth.",
    whenToUse:
      "You need level-by-level output, the rightmost/leftmost node per level (right/left side view), or the tree's top/bottom silhouette by column.",
    pitfalls:
      "- Snapshot `queue.size()` into a variable **before** the inner loop that pushes children — pushing directly into a growing queue while iterating over 'this level' merges levels together.\n- For left/right side view, you don't need the whole level in memory — just track the first or last node dequeued at each level.\n- Top/bottom view needs a column index carried alongside each node (often via a pair or extra queue), not just the node itself.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n) — worst case the last level holds ~n/2 nodes",
    examples: [
      { title: "Level Order Traversal", sourcePath: "Step 13 Binary Trees/1. Traversals/level_order_traversal.cpp" },
      { title: "Right Side View", sourcePath: "Step 13 Binary Trees/2. Medium Problems/right_side_view.cpp" },
      { title: "Top View of Binary Tree", sourcePath: "Step 13 Binary Trees/2. Medium Problems/top_view.cpp" },
    ],
  },
  {
    id: "bst-property-exploitation",
    categoryId: "trees-bst",
    name: "BST Property Exploitation",
    difficulty: "Medium",
    coreIdea:
      "A BST's inorder traversal is always sorted, and at every node, the entire left subtree is smaller and the entire right subtree is larger. That lets you discard half the tree at each step, the same way binary search discards half an array.",
    whenToUse:
      "Searching, inserting, or validating structure in a BST specifically (not a general binary tree) — the ordering invariant is what makes these O(log n)-on-average instead of O(n).",
    pitfalls:
      "- Validating a BST by only checking `node->val` against its immediate children is wrong — you need a valid (min, max) range threaded down through the recursion, since a node deep in the left subtree must still be less than the original root, not just its immediate parent.\n- A skewed/unbalanced BST degrades every 'O(log n)' operation here to O(n) — don't assume balance unless the problem guarantees it (e.g. built from a sorted array).",
    timeComplexity: "O(h), h = tree height (O(log n) balanced, O(n) skewed)",
    spaceComplexity: "O(h) recursion stack",
    examples: [
      { title: "Validate BST", sourcePath: "Step 14 Binary Search Trees/2. Practice Problems/validate_bst.cpp" },
      { title: "Kth Smallest Element in BST", sourcePath: "Step 14 Binary Search Trees/2. Practice Problems/kth_smallest_element.cpp" },
      { title: "Lowest Common Ancestor in BST", sourcePath: "Step 14 Binary Search Trees/2. Practice Problems/lca_bst.cpp" },
      { title: "Floor and Ceil in BST", sourcePath: "Step 14 Binary Search Trees/2. Practice Problems/floor_ciel_bst.cpp" },
    ],
  },
  {
    id: "tree-construction-from-traversals",
    categoryId: "trees-bst",
    name: "Tree Construction from Traversals",
    difficulty: "Hard",
    coreIdea:
      "Preorder's first element (or postorder's last) is always the root. Find that value's position in the inorder sequence — everything left of it in inorder is the left subtree, everything right is the right subtree. Recurse on each half.",
    whenToUse:
      "Rebuilding a tree from two given traversal sequences, or building a BST from a single sequence (where the BST property substitutes for a second traversal).",
    pitfalls:
      "- Build a value→index map for the inorder array up front — searching for the root's position linearly on every recursive call turns an O(n) algorithm into O(n²).\n- Track subarray boundaries by index ranges, not by slicing/copying arrays at each recursive call — slicing repeatedly is the other common way this becomes O(n²) or worse.\n- Preorder+inorder and postorder+inorder need different index arithmetic for the split point — don't copy one pattern's math into the other without re-deriving it.",
    timeComplexity: "O(n) with an index map, O(n²) worst case without",
    spaceComplexity: "O(n) for the map + O(h) recursion",
    examples: [
      { title: "Construct Binary Tree from Preorder & Inorder", sourcePath: "Step 13 Binary Trees/3. Hard Problems/construct_binary_tree_from_preorder_inorder.cpp" },
      { title: "Construct Binary Tree from Postorder & Inorder", sourcePath: "Step 13 Binary Trees/3. Hard Problems/construct_tree_from_postorder_inorder.cpp" },
      { title: "Construct BST from Preorder", sourcePath: "Step 14 Binary Search Trees/2. Practice Problems/create_bst_from_preorder.cpp" },
    ],
  },

  // ── Graphs ─────────────────────────────────────────────────────
  {
    id: "bfs-dfs-connected-components",
    categoryId: "graphs",
    name: "BFS/DFS & Connected Components",
    difficulty: "Medium",
    coreIdea:
      "Visit every reachable node from a start point using BFS (queue) or DFS (recursion/stack), marking each as visited so it's never processed twice. Running this from every unvisited node counts/labels the graph's connected components.",
    whenToUse:
      "Flood-fill style problems (number of islands, rotten oranges spreading), or anything asking 'how many separate groups' or 'is everything reachable from X'.",
    pitfalls:
      "- Mark a node visited **when you enqueue/push it**, not when you dequeue/pop it — otherwise the same node can be added to the queue multiple times before it's ever processed, wasting time and occasionally causing wrong counts.\n- BFS finds shortest paths in unweighted graphs; DFS does not — pick BFS specifically when 'minimum steps/distance' is asked for (e.g. rotten oranges' time-to-rot).\n- For grid graphs, bounds-check all four (or eight) neighbor directions before visiting — a missing boundary check is the most common crash in grid BFS/DFS.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V) for the visited set and queue/stack",
    examples: [
      { title: "DFS and BFS Traversal", sourcePath: "Step 15 Graphs/1. Learning/dfs_bfs.cpp" },
      { title: "Number of Islands", sourcePath: "Step 15 Graphs/2. Problems BFS DFS/num_islands.cpp" },
      { title: "Number of Connected Components", sourcePath: "Step 15 Graphs/1. Learning/connected_components.cpp" },
      { title: "Rotting Oranges", sourcePath: "Step 15 Graphs/2. Problems BFS DFS/rotten_oranges.cpp" },
    ],
  },
  {
    id: "topological-sort",
    categoryId: "graphs",
    name: "Topological Sort",
    difficulty: "Hard",
    coreIdea:
      "Order nodes so every directed edge u→v places u before v. DFS-based: finish a node (postorder) only after all its dependents are finished, then reverse the finish order. Kahn's (BFS-based): repeatedly remove nodes with in-degree 0, decrementing their neighbors' in-degrees.",
    whenToUse:
      "The problem describes dependencies or prerequisites (course scheduling, build order, alien dictionary letter ordering) in a **directed acyclic graph**.",
    pitfalls:
      "- Topological sort is only defined for DAGs — a cycle means no valid order exists. Kahn's algorithm detects this naturally: if the processed-node count ends up less than V, there's a cycle.\n- The DFS version needs the **reverse** of postorder finish times, not the finish order itself — this reversal is easy to forget.\n- For alien dictionary, the ordering constraints come from the **first differing character** between adjacent words only — comparing entire words, or missing the case where one word is a prefix of the next, are the two classic bugs.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V) for in-degree array / visited set + O(V) output",
    examples: [
      { title: "Topological Sort (DFS)", sourcePath: "Step 15 Graphs/3. topo sort Problems/topo_sort.cpp" },
      { title: "Topological Sort (Kahn's / BFS)", sourcePath: "Step 15 Graphs/3. topo sort Problems/topo_sort_kahn.cpp" },
      { title: "Course Schedule", sourcePath: "Step 15 Graphs/2. Problems BFS DFS/course_scheduler.cpp" },
      { title: "Alien Dictionary", sourcePath: "Step 15 Graphs/3. topo sort Problems/alien_dict.cpp" },
    ],
  },
  {
    id: "union-find-disjoint-set",
    categoryId: "graphs",
    name: "Union-Find / Disjoint Set",
    difficulty: "Hard",
    coreIdea:
      "Maintain a forest where each set has a representative 'parent'. `find(x)` walks up to the representative (with path compression, flattening the tree as it goes); `union(x, y)` links the two sets' representatives (by rank/size, to keep trees shallow). Two elements are connected iff `find(x) == find(y)`.",
    whenToUse:
      "Incrementally connecting elements and querying connectivity (accounts merge, network connections), or building a minimum spanning tree (Kruskal's needs cycle detection between edges).",
    pitfalls:
      "- Without **both** path compression and union by rank/size, worst-case find/union degrades to O(n) per operation — with both, it's near O(1) amortized (inverse Ackermann).\n- `find` should be implemented recursively (or iteratively) with path compression — `parent[x] = find(parent[x])` — a naive walk-up without compression is correct but slow.\n- In Kruskal's, process edges in increasing weight order and skip any edge whose endpoints are already unioned — that skip check *is* the cycle detection.",
    timeComplexity: "O(α(n)) per operation amortized — effectively constant",
    spaceComplexity: "O(V) for parent/rank arrays",
    examples: [
      { title: "Disjoint Set (Union-Find)", sourcePath: "Step 15 Graphs/5. Minimum Spanning Tree/disjoint_set.cpp" },
      { title: "Kruskal's Algorithm", sourcePath: "Step 15 Graphs/5. Minimum Spanning Tree/kruskal.cpp" },
      { title: "Accounts Merge", sourcePath: "Step 15 Graphs/5. Minimum Spanning Tree/accounts_merged.cpp" },
      { title: "Number of Islands II", sourcePath: "Step 15 Graphs/5. Minimum Spanning Tree/no_of_islands_2.cpp" },
    ],
  },
  {
    id: "shortest-path",
    categoryId: "graphs",
    name: "Shortest Path",
    difficulty: "Hard",
    coreIdea:
      "Dijkstra's greedily expands the closest unvisited node first using a min-heap, and only works with non-negative weights. Bellman-Ford relaxes every edge V-1 times, which is slower but tolerates negative weights and can detect negative cycles. Floyd-Warshall computes all-pairs shortest paths by considering every node as a possible intermediate.",
    whenToUse:
      "Weighted-graph shortest path questions — pick Dijkstra for non-negative weights and a single source, Bellman-Ford when negative weights are possible, Floyd-Warshall when you need every pair's distance on a small-to-medium graph.",
    pitfalls:
      "- Dijkstra with a min-heap can still push stale (outdated) distances for a node — check `if (dist popped > current best distance for that node) continue;` when popping, or you'll process a node's neighbors more than once with wrong data.\n- Bellman-Ford needs a **(V-1)th** extra pass to detect negative cycles: if any edge can still be relaxed after V-1 iterations, a negative cycle exists and shortest paths are undefined.\n- Floyd-Warshall's loop order matters: the intermediate-node `k` must be the **outermost** loop, not innermost — swapping the order silently gives wrong distances.",
    timeComplexity: "O((V+E) log V) Dijkstra, O(V·E) Bellman-Ford, O(V³) Floyd-Warshall",
    spaceComplexity: "O(V) Dijkstra/Bellman-Ford, O(V²) Floyd-Warshall",
    examples: [
      { title: "Dijkstra's Algorithm", sourcePath: "Step 15 Graphs/4. Shortest Path Algo & Problems/dijkstra.cpp" },
      { title: "Bellman-Ford Algorithm", sourcePath: "Step 15 Graphs/4. Shortest Path Algo & Problems/bellman_ford.cpp" },
      { title: "Floyd-Warshall Algorithm", sourcePath: "Step 15 Graphs/4. Shortest Path Algo & Problems/floyd_warshall.cpp" },
      { title: "Cheapest Flights Within K Stops", sourcePath: "Step 15 Graphs/4. Shortest Path Algo & Problems/cheapest_flight_k_stop.cpp" },
    ],
  },

  // ── Dynamic Programming ─────────────────────────────────────────
  {
    id: "dp-1d",
    categoryId: "dynamic-programming",
    name: "1D DP",
    difficulty: "Medium",
    coreIdea:
      "Define `dp[i]` as the answer using only the first i elements/steps, expressed in terms of a small number of earlier states (`dp[i-1]`, `dp[i-2]`, ...). Solve small `i` first and build up — or equivalently, write the recursive recurrence and cache it (memoization).",
    whenToUse:
      "The problem has an obvious recursive recurrence over a single index (steps to climb, houses to rob, jumps to make) and naive recursion would recompute the same subproblems exponentially many times.",
    pitfalls:
      "- Get the base case(s) right first (`dp[0]`, sometimes `dp[1]`) — a DP with a correct recurrence but a wrong base case produces plausible-looking wrong answers for every input.\n- Once the recurrence only depends on the last 1-2 states, replace the full `dp[]` array with 2-3 rolling variables — this is usually a trivial change that turns O(n) space into O(1).\n- House Robber's 'can't pick adjacent' constraint is the recurrence itself (`dp[i] = max(dp[i-1], dp[i-2] + nums[i])`) — don't try to add it as a post-hoc filter.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n) tabulation, O(1) with rolling variables",
    examples: [
      { title: "Climbing Stairs", sourcePath: "Step 16 Dynamic Programming/Lec 2. 1D DP/climbing_stairs.cpp" },
      { title: "House Robber", sourcePath: "Step 16 Dynamic Programming/Lec 2. 1D DP/house_robber.cpp" },
      { title: "Frog Jump", sourcePath: "Step 16 Dynamic Programming/Lec 2. 1D DP/frog_jump.cpp" },
    ],
  },
  {
    id: "dp-on-grids",
    categoryId: "dynamic-programming",
    name: "DP on Grids",
    difficulty: "Medium",
    coreIdea:
      "Define `dp[r][c]` as the best answer to reach cell (r, c). Since movement is typically only right/down (or down/diagonal for triangles), `dp[r][c]` depends only on `dp[r-1][c]` and `dp[r][c-1]` — fill the grid row by row.",
    whenToUse:
      "Counting paths or optimizing a path sum/cost through a 2D grid or triangle with restricted movement directions.",
    pitfalls:
      "- The first row and first column each have only **one** possible predecessor cell, not two — handle them as a distinct base case, not as a special case of the general recurrence with a missing neighbor defaulting to 0 (that's fine for path-counting sums, but wrong for min/max-cost grids where 0 looks like a valid cheaper path).\n- Obstacles (unique paths II) mean `dp[r][c] = 0` for blocked cells, and this propagates — a blocked first-row/column cell makes every cell after it in that row/column unreachable too.\n- Space can be reduced to O(cols) by keeping only the previous row, since each row only needs the row above it.",
    timeComplexity: "O(rows · cols)",
    spaceComplexity: "O(rows · cols), reducible to O(cols)",
    examples: [
      { title: "Unique Paths", sourcePath: "Step 16 Dynamic Programming/Lec 3. 2D 3D DP and DP on Grids/unique_path.cpp" },
      { title: "Minimum Path Sum", sourcePath: "Step 16 Dynamic Programming/Lec 3. 2D 3D DP and DP on Grids/minimum_path_sum.cpp" },
      { title: "Triangle — Minimum Path Sum", sourcePath: "Step 16 Dynamic Programming/Lec 3. 2D 3D DP and DP on Grids/triangle.cpp" },
      { title: "Ninja's Training (3-choice DP)", sourcePath: "Step 16 Dynamic Programming/Lec 3. 2D 3D DP and DP on Grids/ninja_training.cpp" },
    ],
  },
  {
    id: "knapsack-subset-sum-family",
    categoryId: "dynamic-programming",
    name: "0/1 Knapsack & Subset-Sum Family",
    difficulty: "Hard",
    coreIdea:
      "For each item, decide take-or-skip: `dp[i][target] = dp[i-1][target] OR dp[i-1][target - value[i]]` (for feasibility) or `max(...)` (for optimization). Subset-sum, partition, and target-sum problems are all this same recurrence with a different question asked of the same table.",
    whenToUse:
      "You're choosing a subset of items under a capacity/target constraint and each item can be used **at most once** (unbounded/coin-change variants relax this to unlimited reuse).",
    pitfalls:
      "- 0/1 knapsack (each item once) must iterate the capacity dimension **backward** if you're space-optimizing to a 1D array — forward iteration accidentally reuses the same item multiple times, silently turning it into unbounded knapsack.\n- 'Partition into two equal subsets' reduces to 'does a subset sum to totalSum / 2' — if totalSum is odd, the answer is immediately false, no DP needed.\n- Coin change 'minimum coins' initializes unreachable amounts to infinity (not 0), since 0 would look like a valid free solution.",
    timeComplexity: "O(n · capacity)",
    spaceComplexity: "O(n · capacity), reducible to O(capacity)",
    examples: [
      { title: "0/1 Knapsack", sourcePath: "Step 16 Dynamic Programming/Lec 4. DP on Subsequences/01knapsack.cpp" },
      { title: "Subset Sum Equal to Target", sourcePath: "Step 16 Dynamic Programming/Lec 4. DP on Subsequences/subset_sum_equal_target.cpp" },
      { title: "Partition Equal Subset Sum", sourcePath: "Step 16 Dynamic Programming/Lec 4. DP on Subsequences/partition_equal_subset_sum.cpp" },
      { title: "Coin Change — Minimum Coins", sourcePath: "Step 16 Dynamic Programming/Lec 4. DP on Subsequences/coin_change.cpp" },
    ],
  },
  {
    id: "dp-on-strings",
    categoryId: "dynamic-programming",
    name: "DP on Strings",
    difficulty: "Hard",
    coreIdea:
      "Define `dp[i][j]` over prefixes of two strings (or one string against itself for palindromic subsequence). If `s1[i] == s2[j]`, extend the match from `dp[i-1][j-1]`; otherwise combine the best of skipping a character from either string.",
    whenToUse:
      "Comparing or transforming two strings — longest common subsequence, edit distance — or finding palindromic structure within one string.",
    pitfalls:
      "- Offset the DP table by 1 (`dp` sized `(n+1) x (m+1)`) so index 0 cleanly represents 'empty prefix' — trying to handle empty-prefix as a special negative-index case is far more error-prone.\n- Edit distance's three operations (insert/delete/replace) correspond to three specific neighboring cells (`dp[i][j-1]`, `dp[i-1][j]`, `dp[i-1][j-1]`) — mixing up which cell represents which operation is the most common bug here.\n- Longest palindromic subsequence is just LCS of the string with its own reverse — recognizing that reduction saves re-deriving a new recurrence from scratch.",
    timeComplexity: "O(n · m)",
    spaceComplexity: "O(n · m), reducible to O(min(n, m)) with rolling rows",
    examples: [
      { title: "Longest Common Subsequence", sourcePath: "Step 16 Dynamic Programming/Lec 5. DP on Strings/longes_common_subsequence.cpp" },
      { title: "Edit Distance", sourcePath: "Step 16 Dynamic Programming/Lec 5. DP on Strings/edit_distance.cpp" },
      { title: "Longest Palindromic Subsequence", sourcePath: "Step 16 Dynamic Programming/Lec 5. DP on Strings/longest_palindrome_subsequence.cpp" },
    ],
  },
  {
    id: "dp-on-stocks",
    categoryId: "dynamic-programming",
    name: "DP on Stocks",
    difficulty: "Hard",
    coreIdea:
      "Track a small set of states per day — typically 'holding a stock' vs 'not holding', sometimes split further by transaction number or cooldown status. Each day, decide to buy, sell, or do nothing, transitioning between states based on which choice maximizes profit.",
    whenToUse:
      "Buy/sell-stock variants: unlimited transactions, at most k transactions, with cooldown, or with a transaction fee.",
    pitfalls:
      "- 'At most one transaction' (buy once, sell once) doesn't need full DP — track the minimum price seen so far and the max profit if sold today, in one pass.\n- 'Unlimited transactions' only needs `hold` and `notHold` states; 'at most k transactions' needs those states duplicated per transaction count `k` — conflating the two under-constrains or over-constrains the recurrence.\n- Cooldown and transaction-fee variants each add exactly one extra state or one extra subtraction respectively — start from the plain unlimited-transaction recurrence and add the minimal change, rather than rederiving from scratch.",
    timeComplexity: "O(n) or O(n·k) for the at-most-k variant",
    spaceComplexity: "O(1) to O(k) depending on the variant",
    examples: [
      { title: "Best Time to Buy and Sell Stock", sourcePath: "Step 16 Dynamic Programming/Lec 6. DP on Stocks/best_time_to_buy_and_sell_stock.cpp" },
      { title: "Best Time to Buy and Sell Stock II (unlimited)", sourcePath: "Step 16 Dynamic Programming/Lec 6. DP on Stocks/best_time_to_buy_and_sell_stock_2.cpp" },
      { title: "Best Time to Buy and Sell Stock with Cooldown", sourcePath: "Step 16 Dynamic Programming/Lec 6. DP on Stocks/best_time_to_buy_and_sell_stocks_5_with_cooldown.cpp" },
    ],
  },
  {
    id: "mcm-partition-dp",
    categoryId: "dynamic-programming",
    name: "MCM / Partition DP",
    difficulty: "Hard",
    coreIdea:
      "Try every possible 'last split point' `k` between `i` and `j`, combining the best cost of the left part `[i..k]`, the right part `[k+1..j]`, and a cost for merging/joining them at that split. `dp[i][j] = min over k of (dp[i][k] + dp[k+1][j] + cost(i,k,j))`.",
    whenToUse:
      "You're deciding where to 'cut' a sequence (matrix chain multiplication order, palindrome partitioning, balloon bursting, breaking a stick) and the cost of a cut depends on both resulting pieces.",
    pitfalls:
      "- The loop order matters: `dp[i][j]` depends on smaller ranges, so iterate by increasing range length (or recurse with memoization) — filling the table in plain row-major order reads uninitialized cells.\n- These are naturally exponential without memoization — always confirm the memo table is actually being hit (right key shape, e.g. `(i, j)` not just `i`) rather than silently falling back to pure recursion.\n- Burst Balloons is the classic case where thinking 'which balloon do I burst **first**' leads to a tangled recurrence — thinking 'which balloon do I burst **last** in range [i,j]' (so its neighbors at burst time are the range boundaries) is what makes the subproblems independent.",
    timeComplexity: "O(n³) typical (O(n²) states × O(n) split choices)",
    spaceComplexity: "O(n²)",
    examples: [
      { title: "Matrix Chain Multiplication", sourcePath: "Step 16 Dynamic Programming/Lec 8. MCM DP Partition DP/mcm.cpp" },
      { title: "Palindrome Partitioning II (min cuts)", sourcePath: "Step 16 Dynamic Programming/Lec 8. MCM DP Partition DP/palindrome_partioning2.cpp" },
      { title: "Burst Balloons", sourcePath: "Step 16 Dynamic Programming/Lec 8. MCM DP Partition DP/burst_ballons.cpp" },
    ],
  },

  // ── Greedy ───────────────────────────────────────────────────────
  {
    id: "interval-scheduling",
    categoryId: "greedy",
    name: "Interval Scheduling",
    difficulty: "Medium",
    coreIdea:
      "Sort intervals by end time (not start time). Greedily accept the next interval only if it starts after the last accepted one ends — this leaves the most room for future intervals, and is provably optimal for maximizing count.",
    whenToUse:
      "Maximizing the number of non-overlapping intervals (meetings, jobs) you can take, or the reverse — minimizing the number of intervals you must remove/merge.",
    pitfalls:
      "- Sorting by **start** time instead of **end** time is the single most common mistake here — it doesn't greedily maximize count and can give a wrong (or just suboptimal) answer.\n- 'Merge overlapping intervals' is a different, related problem (sort by start, merge on overlap) — don't conflate it with 'maximum non-overlapping selection' (sort by end, greedy accept), they solve different questions.\n- Watch the overlap boundary condition: does `[1,3]` and `[3,5]` count as overlapping? The problem statement decides `<` vs `<=`, and it changes the answer.",
    timeComplexity: "O(n log n) for the sort, O(n) for the greedy pass",
    spaceComplexity: "O(1) beyond the sort",
    examples: [
      { title: "Maximum Meetings in One Room", sourcePath: "Step 12 Greedy Algorithms/2. Medium Problems/max_meetings.cpp" },
      { title: "Non-overlapping Intervals", sourcePath: "Step 12 Greedy Algorithms/2. Medium Problems/non_overlapping_intervals.cpp" },
      { title: "Merge Intervals", sourcePath: "Step 12 Greedy Algorithms/2. Medium Problems/merge_intervals.cpp" },
      { title: "Minimum Platforms Required", sourcePath: "Step 12 Greedy Algorithms/2. Medium Problems/minimum_num_platforms_required_railway.cpp" },
    ],
  },
  {
    id: "exchange-argument-greedy",
    categoryId: "greedy",
    name: "Exchange-Argument Greedy",
    difficulty: "Medium",
    coreIdea:
      "Sort by whatever ratio or ordering makes the locally best choice available first (value/weight for knapsack, deadline/profit for job sequencing), then take greedily. The exchange argument justifies it: any optimal solution can be rearranged into greedy order without making it worse, so greedy order is also optimal.",
    whenToUse:
      "You suspect a greedy sort-then-pick strategy works, and can articulate what you're sorting by and why swapping two out-of-order elements never hurts the answer.",
    pitfalls:
      "- Greedy is easy to apply incorrectly with unjustified intuition — before trusting a greedy approach, be able to state the exchange argument (why an adjacent swap never makes things worse). If you can't, it's a sign DP might actually be required instead.\n- Fractional knapsack (take partial items, sort by value/weight ratio) is greedy-correct; 0/1 knapsack (whole items only) is **not** — greedy fails there and needs DP. Don't apply the fractional strategy to a 0/1 problem.\n- Job sequencing needs a second structure (often a boolean slot array or disjoint-set 'latest free slot before deadline') alongside the greedy sort — the sort alone isn't the whole algorithm.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n) or O(1) depending on the variant",
    examples: [
      { title: "Assign Cookies", sourcePath: "Step 12 Greedy Algorithms/1. Easy Problems/assign_cookies.cpp" },
      { title: "Fractional Knapsack", sourcePath: "Step 12 Greedy Algorithms/1. Easy Problems/fractional_knapsack.cpp" },
      { title: "Job Sequencing Problem", sourcePath: "Step 12 Greedy Algorithms/2. Medium Problems/job_sequencing.cpp" },
      { title: "Candy Distribution", sourcePath: "Step 12 Greedy Algorithms/2. Medium Problems/candy.cpp" },
    ],
  },

  // ── Heaps / Priority Queue ───────────────────────────────────────
  {
    id: "kth-largest-smallest-selection",
    categoryId: "heaps",
    name: "Kth Largest/Smallest Selection",
    difficulty: "Medium",
    coreIdea:
      "To find the kth largest, keep a **min-heap** of size k — any new element larger than the heap's minimum replaces it. The heap's root ends up being exactly the kth largest, since anything smaller was already evicted. (Mirror this with a max-heap for kth smallest.)",
    whenToUse:
      "You need the kth largest/smallest element, especially from a stream where elements arrive over time and you can't re-sort from scratch each time.",
    pitfalls:
      "- It's counterintuitive but correct: kth **largest** uses a **min**-heap (so the smallest of the 'top k so far' is always easy to evict), not a max-heap.\n- Only push a new element past capacity k if it's larger than the current root — pushing unconditionally and then popping is correct but does unnecessary work.\n- For a true streaming version (repeated `add()` calls), keep the heap alive across calls rather than rebuilding it each time — rebuilding turns an O(log k) operation into O(n log n).",
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(k)",
    examples: [
      { title: "Kth Largest Element", sourcePath: "Step 11 Heaps/2. Medium Problems/find_kth_largest.cpp" },
      { title: "Kth Smallest Element", sourcePath: "Step 11 Heaps/2. Medium Problems/find_kth_smallest.cpp" },
      { title: "Kth Largest Element in a Stream", sourcePath: "Step 11 Heaps/3. Hard Problems/kth_largest_element_stream.cpp" },
    ],
  },
  {
    id: "merge-scheduling-with-heap",
    categoryId: "heaps",
    name: "Merge/Scheduling with Heap",
    difficulty: "Hard",
    coreIdea:
      "When you repeatedly need 'the current smallest/most-frequent/most-available item among many independent sequences', a heap keeps that lookup at O(log n) instead of rescanning everything each time. Merging k sorted lists, scheduling tasks by frequency, and finding a running median are all variations of 'maintain a priority order over a changing set'.",
    whenToUse:
      "Merging multiple sorted sequences, scheduling tasks under a cooldown/frequency constraint, or maintaining a running statistic (median, top-k) as elements stream in.",
    pitfalls:
      "- For merging k sorted lists, push one element **per list** initially (with a reference back to which list/node it came from), not all elements at once — the heap should represent 'candidates', not the whole merged output.\n- Running median needs **two** heaps (a max-heap for the lower half, a min-heap for the upper half), kept balanced in size within 1 of each other — a single heap can't give O(log n) median access.\n- Task scheduler's cooldown is easy to model wrong — using a heap for 'most frequent remaining task' plus a queue for 'tasks currently cooling down' is the reliable combination, rather than trying to force it into the heap alone.",
    timeComplexity: "O(n log k) typical",
    spaceComplexity: "O(k) to O(n) depending on the variant",
    examples: [
      { title: "Merge K Sorted Lists", sourcePath: "Step 11 Heaps/2. Medium Problems/merge_k_sorted_list.cpp" },
      { title: "Task Scheduler", sourcePath: "Step 11 Heaps/2. Medium Problems/task_scheduler.cpp" },
      { title: "Top K Frequent Elements", sourcePath: "Step 11 Heaps/3. Hard Problems/top_k_frequent.cpp" },
    ],
  },

  // ── Bit Manipulation ─────────────────────────────────────────────
  {
    id: "bit-tricks-xor-properties",
    categoryId: "bit-manipulation",
    name: "Bit Tricks (XOR Properties)",
    difficulty: "Easy",
    coreIdea:
      "XOR-ing a number with itself gives 0, and XOR-ing with 0 gives the number back unchanged, and XOR is commutative/associative. So XOR-ing an entire array cancels every value that appears an even number of times, leaving only the odd-one-out.",
    whenToUse:
      "Finding a single non-duplicated element among duplicates, checking/setting/toggling individual bits, or swapping values without a temp variable.",
    pitfalls:
      "- When there are **two** unique numbers (not one) among duplicates, XOR-ing everything gives `a XOR b`, not either value alone — you then need to find any set bit in that result to partition the array into two groups, one containing each unique number, and XOR each group separately.\n- Use `n & (n-1)` to clear the lowest set bit — a cheap way to count set bits or check power-of-two (`n & (n-1) == 0`) — rather than a manual bit-by-bit loop when only that specific fact is needed.\n- `1 << i` on the wrong integer width can overflow for large `i` — be explicit about `int` vs `long long` when i can approach 31/63.",
    timeComplexity: "O(n) or O(log n) depending on the specific trick",
    spaceComplexity: "O(1)",
    examples: [
      { title: "Single Number", sourcePath: "Step 8 Bit Manipulation/2. Learn interview problems/single_number.cpp" },
      { title: "Single Number III (two uniques)", sourcePath: "Step 8 Bit Manipulation/1. Learn Bit Manipulation/single_number_3.cpp" },
      { title: "Check if the i-th Bit is Set", sourcePath: "Step 8 Bit Manipulation/1. Learn Bit Manipulation/check_is_set_bit.cpp" },
      { title: "Count Set Bits", sourcePath: "Step 8 Bit Manipulation/1. Learn Bit Manipulation/count_set_bit.cpp" },
    ],
  },
  {
    id: "advanced-maths-on-bits",
    categoryId: "bit-manipulation",
    name: "Advanced Maths on Bits",
    difficulty: "Medium",
    coreIdea:
      "Several classic number-theory operations become much faster with a bit- or sqrt-bounded loop instead of checking every candidate: trial-divide only up to √n for factors/primality, and sieve out composites in bulk rather than testing each number independently.",
    whenToUse:
      "Finding all divisors/factors of a number, prime factorization, or generating all primes up to n.",
    pitfalls:
      "- Trial division for factors/primality only needs to go up to `sqrt(n)` — for every divisor `d <= sqrt(n)`, there's a paired divisor `n/d >= sqrt(n)`, so checking further is redundant work.\n- The Sieve of Eratosthenes marks multiples starting from `p*p` (not `2*p`) — smaller multiples of `p` were already marked by smaller primes, so starting at `p*p` avoids redundant marking, and `p*p` can overflow `int` for `p` near sqrt(INT_MAX) if you're not careful with types.\n- Prime factorization via repeated division should divide out a prime factor completely (`while`, not `if`) before moving to the next candidate, or you'll miss repeated factors like `2` in `8 = 2*2*2`.",
    timeComplexity: "O(√n) trial division, O(n log log n) sieve",
    spaceComplexity: "O(1) trial division, O(n) sieve",
    examples: [
      { title: "Prime Factorization (sieve-based, for many queries)", sourcePath: "Step 8 Bit Manipulation/3. Advance Maths/prime_factorization_seive_way.cpp" },
      { title: "Sieve of Eratosthenes", sourcePath: "Step 8 Bit Manipulation/3. Advance Maths/seive_eratosthenes.cpp" },
      { title: "Print All Divisors (√n)", sourcePath: "Step 8 Bit Manipulation/3. Advance Maths/all_factors.cpp" },
      { title: "Check Power of Two", sourcePath: "Step 8 Bit Manipulation/1. Learn Bit Manipulation/power_2.cpp" },
    ],
  },

  // ── Tries ─────────────────────────────────────────────────────────
  {
    id: "trie-construction-prefix-search",
    categoryId: "tries",
    name: "Trie Construction & Prefix Search",
    difficulty: "Medium",
    coreIdea:
      "Each node represents one character position and holds child pointers (often a fixed 26-array for lowercase letters) plus an 'end of word' marker. Inserting/searching a word walks one character at a time, creating child nodes as needed — shared prefixes across words naturally share the same path in the tree.",
    whenToUse:
      "Repeated prefix queries — autocomplete, spell-check, 'does any word start with this prefix' — where a hashset of whole words can't efficiently answer prefix-only questions.",
    pitfalls:
      "- Distinguish 'this node marks the end of an inserted word' from 'this node exists' — a node existing only means it's part of some longer word's path, not that the prefix itself was inserted as a word.\n- Null-check child pointers before descending — searching for a word/prefix that diverges from every inserted word should return false/not-found cleanly, not dereference a null child.\n- 'Longest word such that every prefix of it is also a word' needs a DFS/backtracking walk down the trie checking the end-of-word marker at **every** level, not just the final node.",
    timeComplexity: "O(L) per insert/search, L = word length",
    spaceComplexity: "O(total characters across all inserted words)",
    examples: [
      { title: "Implement Trie", sourcePath: "Step 17 Tries/Theory/implement_trie.cpp" },
      { title: "Implement Trie II (prefix count)", sourcePath: "Step 17 Tries/Theory/implement_trie2.cpp" },
      { title: "Longest Word With All Prefixes", sourcePath: "Step 17 Tries/Theory/longes_word_with_all_prefixes.cpp" },
    ],
  },
  {
    id: "xor-trie",
    categoryId: "tries",
    name: "XOR Trie",
    difficulty: "Hard",
    coreIdea:
      "Insert every number's binary representation (fixed width, MSB first) as a path in a trie with only two children per node (bit 0 / bit 1). To maximize XOR with a given number, greedily walk the trie choosing the **opposite** bit at each level whenever it's available — a differing bit contributes more to the result the higher its position.",
    whenToUse:
      "Maximizing (or querying) the XOR of pairs from a set of numbers — a nested loop checking every pair is O(n²); the trie approach is near-linear.",
    pitfalls:
      "- Insert numbers as a **fixed-width** bit string (e.g. always 32 bits, MSB first) — inserting variable-length representations breaks the trie's ability to compare numbers bit-position-by-bit-position consistently.\n- Greedily preferring the opposite bit only works because higher bit positions dominate the numeric value of the result — going MSB-first isn't an arbitrary choice, it's what makes the greedy strategy provably optimal.\n- Build the trie from the full array first, then query per-element for its best XOR partner — interleaving insert/query per element is fine only if the problem explicitly needs 'best XOR using only previously seen elements'.",
    timeComplexity: "O(n · b), b = bit width (typically 32)",
    spaceComplexity: "O(n · b)",
    examples: [
      { title: "Maximum XOR of Two Numbers in an Array", sourcePath: "Step 17 Tries/Theory/maximize_xor_of_2_nums.cpp" },
      { title: "Maximum XOR With an Element From Array", sourcePath: "Step 17 Tries/Theory/max_xor_with_element_from_arr.cpp" },
    ],
  },
];
