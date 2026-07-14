import type { VariationContent } from "../../types";

const code = `vector<int> searchRange(vector<int>& nums, int target) {
  int n = nums.size();
  int lb = lower_bound(nums.begin(), nums.end(), target) - nums.begin();
  if (lb == n) return { -1, -1 };
  if (nums[lb] != target) return { -1, -1 };
  if (lb == n - 1) return { lb, lb };
  int ub = lb;
  while (ub < n - 1 && nums[ub] == nums[ub + 1]) {
    ub++;
  }
  return { lb, ub };
}`;

const arr = [5, 7, 7, 8, 8, 10];

export const searchSpaceNarrowing: VariationContent = {
  variationId: "search-space-narrowing",
  code,
  engine: "array",
  dryRunData: [
    {
      codeLine: 2,
      explanation: "nums = [5, 7, 7, 8, 8, 10], target = 8. n = 6.",
      variables: { n: 6, target: 8 },
      array: arr,
      activeIndices: [],
    },
    {
      codeLine: 3,
      explanation: "Binary search (lower_bound) finds the first index whose value is >= 8 — that's index 3.",
      variables: { lb: 3 },
      array: arr,
      pointers: [{ label: "lb", index: 3 }],
      activeIndices: [3],
    },
    {
      codeLine: 4,
      explanation: "lb (3) != n (6), so target isn't past the end of the array — keep going.",
      variables: { lb: 3, n: 6 },
      array: arr,
      pointers: [{ label: "lb", index: 3 }],
      activeIndices: [3],
    },
    {
      codeLine: 5,
      explanation: "nums[lb] = nums[3] = 8, which equals target — so 8 does appear in the array.",
      variables: { lb: 3, "nums[lb]": 8 },
      array: arr,
      pointers: [{ label: "lb", index: 3 }],
      activeIndices: [3],
    },
    {
      codeLine: 6,
      explanation: "lb (3) != n-1 (5), so lb isn't the last element — there might be more occurrences to the right.",
      variables: { lb: 3 },
      array: arr,
      pointers: [{ label: "lb", index: 3 }],
      activeIndices: [3],
    },
    {
      codeLine: 7,
      explanation: "Start ub at lb (3) and walk right while duplicates continue.",
      variables: { lb: 3, ub: 3 },
      array: arr,
      pointers: [{ label: "lb", index: 3 }, { label: "ub", index: 3 }],
      activeIndices: [3],
    },
    {
      codeLine: 8,
      explanation: "ub < n-1 (3 < 5) and nums[ub] == nums[ub+1] (nums[3]=8 == nums[4]=8) — extend the run: ub becomes 4.",
      variables: { lb: 3, ub: 4 },
      array: arr,
      pointers: [{ label: "lb", index: 3 }, { label: "ub", index: 4 }],
      activeIndices: [3, 4],
    },
    {
      codeLine: 8,
      explanation: "ub < n-1 (4 < 5) but nums[ub] != nums[ub+1] (nums[4]=8 vs nums[5]=10) — the run of 8s has ended. Loop stops.",
      variables: { lb: 3, ub: 4 },
      array: arr,
      pointers: [{ label: "lb", index: 3 }, { label: "ub", index: 4 }],
      activeIndices: [3, 4],
    },
    {
      codeLine: 11,
      explanation: "Return {lb, ub} = {3, 4} — the first and last occurrence of 8.",
      variables: { result: "[3, 4]" },
      array: arr,
      pointers: [{ label: "lb", index: 3 }, { label: "ub", index: 4 }],
      activeIndices: [3, 4],
    },
  ],
};
