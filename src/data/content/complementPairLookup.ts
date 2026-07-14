import type { VariationContent } from "../../types";

const code = `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
  vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
      int complement = target - nums[i];
      if (mp.find(complement) != mp.end()) {
        return {mp[complement], i};
      }
      mp[nums[i]] = i;
    }
    return {};
  }
};`;

export const complementPairLookup: VariationContent = {
  variationId: "complement-pair-lookup",
  code,
  engine: "array",
  dryRunData: [
    {
      codeLine: 8,
      explanation: "nums = [2, 7, 11, 15], target = 9. Start with an empty map and i = 0.",
      variables: { i: 0, target: 9, map: "{}" },
      array: [2, 7, 11, 15],
      activeIndices: [],
    },
    {
      codeLine: 11,
      explanation: "complement = target - nums[0] = 9 - 2 = 7.",
      variables: { i: 0, complement: 7, map: "{}" },
      array: [2, 7, 11, 15],
      activeIndices: [0],
    },
    {
      codeLine: 12,
      explanation: "Is 7 in the map? Map is still empty, so no.",
      variables: { i: 0, complement: 7, map: "{}", found: "false" },
      array: [2, 7, 11, 15],
      activeIndices: [0],
    },
    {
      codeLine: 15,
      explanation: "Not found — store nums[0] = 2 at index 0 before moving on.",
      variables: { i: 0, map: "{2: 0}" },
      array: [2, 7, 11, 15],
      activeIndices: [0],
    },
    {
      codeLine: 11,
      explanation: "i = 1. complement = target - nums[1] = 9 - 7 = 2.",
      variables: { i: 1, complement: 2, map: "{2: 0}" },
      array: [2, 7, 11, 15],
      activeIndices: [1],
    },
    {
      codeLine: 12,
      explanation: "Is 2 in the map? Yes — it was stored at index 0 in the previous iteration.",
      variables: { i: 1, complement: 2, map: "{2: 0}", found: "true" },
      array: [2, 7, 11, 15],
      activeIndices: [0, 1],
    },
    {
      codeLine: 13,
      explanation: "Return {mp[2], i} = {0, 1} — indices 0 and 1 sum to the target.",
      variables: { result: "[0, 1]" },
      array: [2, 7, 11, 15],
      activeIndices: [0, 1],
    },
  ],
};
