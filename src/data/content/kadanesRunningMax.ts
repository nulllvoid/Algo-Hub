import type { VariationContent } from "../../types";

const code = `int maximum_sum(vector<int> &nums){
  int n = nums.size();
  int sum = 0;
  int maxi = INT_MIN;
  for (int i = 0; i < n; i++){
    sum += nums[i];
    if (sum > maxi){
      maxi = sum;
    }

    if (sum < 0){
      sum = 0;
    }
  }
  return maxi;
}`;

const arr = [-2, -3, 4, -1, -2, 1, 5, -3];

export const kadanesRunningMax: VariationContent = {
  variationId: "kadanes-running-max",
  code,
  engine: "array",
  dryRunData: [
    {
      codeLine: 3,
      explanation: "Initialize sum = 0 and maxi to the smallest possible value, so any real sum beats it.",
      variables: { sum: 0, maxi: "-inf" },
      array: arr,
      activeIndices: [],
    },
    {
      codeLine: 6,
      explanation: "i = 0: sum += nums[0] = -2. sum is now -2.",
      variables: { i: 0, sum: -2, maxi: "-inf" },
      array: arr,
      activeIndices: [0],
    },
    {
      codeLine: 8,
      explanation: "-2 > -inf, so maxi updates to -2 — the best we've seen is just 'start here'.",
      variables: { i: 0, sum: -2, maxi: -2 },
      array: arr,
      activeIndices: [0],
    },
    {
      codeLine: 12,
      explanation: "sum (-2) < 0, so reset sum to 0 — carrying a negative sum forward can only hurt future subarrays.",
      variables: { i: 0, sum: 0, maxi: -2 },
      array: arr,
      activeIndices: [0],
    },
    {
      codeLine: 6,
      explanation: "i = 1: sum += nums[1] = 0 + (-3) = -3.",
      variables: { i: 1, sum: -3, maxi: -2 },
      array: arr,
      activeIndices: [1],
    },
    {
      codeLine: 12,
      explanation: "-3 is not > maxi(-2), so maxi is unchanged. sum < 0, so reset sum to 0 again.",
      variables: { i: 1, sum: 0, maxi: -2 },
      array: arr,
      activeIndices: [1],
    },
    {
      codeLine: 6,
      explanation: "i = 2: sum += nums[2] = 0 + 4 = 4.",
      variables: { i: 2, sum: 4, maxi: -2 },
      array: arr,
      activeIndices: [2],
    },
    {
      codeLine: 8,
      explanation: "4 > -2, so maxi updates to 4. A fresh subarray starting at index 2 is winning so far.",
      variables: { i: 2, sum: 4, maxi: 4 },
      array: arr,
      activeIndices: [2],
    },
    {
      codeLine: 6,
      explanation: "i = 3: sum += nums[3] = 4 + (-1) = 3. Not > maxi(4), not < 0 — no updates fire this round.",
      variables: { i: 3, sum: 3, maxi: 4 },
      array: arr,
      activeIndices: [2, 3],
    },
    {
      codeLine: 6,
      explanation: "i = 4: sum += nums[4] = 3 + (-2) = 1. Still below maxi, still non-negative — sum just carries forward.",
      variables: { i: 4, sum: 1, maxi: 4 },
      array: arr,
      activeIndices: [2, 3, 4],
    },
    {
      codeLine: 6,
      explanation: "i = 5: sum += nums[5] = 1 + 1 = 2.",
      variables: { i: 5, sum: 2, maxi: 4 },
      array: arr,
      activeIndices: [2, 3, 4, 5],
    },
    {
      codeLine: 6,
      explanation: "i = 6: sum += nums[6] = 2 + 5 = 7.",
      variables: { i: 6, sum: 7, maxi: 4 },
      array: arr,
      activeIndices: [2, 3, 4, 5, 6],
    },
    {
      codeLine: 8,
      explanation: "7 > 4, so maxi updates to 7 — the running subarray [4, -1, -2, 1, 5] is now the best.",
      variables: { i: 6, sum: 7, maxi: 7 },
      array: arr,
      activeIndices: [2, 3, 4, 5, 6],
    },
    {
      codeLine: 6,
      explanation: "i = 7: sum += nums[7] = 7 + (-3) = 4. Not > maxi(7) — this element would only shrink the best sum.",
      variables: { i: 7, sum: 4, maxi: 7 },
      array: arr,
      activeIndices: [2, 3, 4, 5, 6, 7],
    },
    {
      codeLine: 15,
      explanation: "Loop ends. Return maxi = 7 — achieved by the subarray [4, -1, -2, 1, 5] at indices 2..6.",
      variables: { maxi: 7 },
      array: arr,
      activeIndices: [2, 3, 4, 5, 6],
    },
  ],
};
