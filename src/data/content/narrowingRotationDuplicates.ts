import type { VariationContent } from "../../types";

const code = `int search(vector<int>& nums, int target) {
  int n = nums.size();
  int left = 0;
  int right = n - 1;
  int ans = -1;
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (nums[mid] == target) {
      return mid;
    }
    else if (nums[left] == nums[mid] && nums[mid] == nums[right]) {
      left++;
      right--;
    }
    else if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target <= nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    else if (nums[mid] <= nums[right]) {
      if (nums[mid] <= target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return ans;
}`;

// Deliberately not the file's own main() example — that array (4,5,6,7,0,1,2) never
// triggers the duplicates branch. This one hits it twice before resolving, which is
// the whole point of this variation.
const arr = [3, 3, 1, 3, 3, 3, 3];

export const narrowingRotationDuplicates: VariationContent = {
  variationId: "narrowing-rotation-duplicates",
  code,
  engine: "array",
  dryRunData: [
    {
      codeLine: 2,
      explanation: "nums = [3, 3, 1, 3, 3, 3, 3], target = 1. left = 0, right = 6.",
      variables: { left: 0, right: 6, target: 1 },
      array: arr,
      pointers: [{ label: "left", index: 0 }, { label: "right", index: 6 }],
      activeIndices: [],
    },
    {
      codeLine: 7,
      explanation: "mid = 0 + (6-0)/2 = 3. nums[mid] = nums[3] = 3, which isn't the target (1).",
      variables: { left: 0, mid: 3, right: 6 },
      array: arr,
      pointers: [{ label: "left", index: 0 }, { label: "mid", index: 3 }, { label: "right", index: 6 }],
      activeIndices: [3],
    },
    {
      codeLine: 12,
      explanation: "nums[left]=3, nums[mid]=3, nums[right]=3 — all equal. We can't tell which half is sorted, so shrink both ends: left++, right--.",
      variables: { left: 1, right: 5 },
      array: arr,
      pointers: [{ label: "left", index: 1 }, { label: "mid", index: 3 }, { label: "right", index: 5 }],
      activeIndices: [0, 3, 6],
    },
    {
      codeLine: 7,
      explanation: "mid = 1 + (5-1)/2 = 3. nums[mid] = 3, still not the target.",
      variables: { left: 1, mid: 3, right: 5 },
      array: arr,
      pointers: [{ label: "left", index: 1 }, { label: "mid", index: 3 }, { label: "right", index: 5 }],
      activeIndices: [3],
    },
    {
      codeLine: 12,
      explanation: "nums[left]=3, nums[mid]=3, nums[right]=3 — all equal again. Same shrink: left++, right--.",
      variables: { left: 2, right: 4 },
      array: arr,
      pointers: [{ label: "left", index: 2 }, { label: "mid", index: 3 }, { label: "right", index: 4 }],
      activeIndices: [1, 3, 5],
    },
    {
      codeLine: 7,
      explanation: "mid = 2 + (4-2)/2 = 3. nums[mid] = 3, still not the target.",
      variables: { left: 2, mid: 3, right: 4 },
      array: arr,
      pointers: [{ label: "left", index: 2 }, { label: "mid", index: 3 }, { label: "right", index: 4 }],
      activeIndices: [3],
    },
    {
      codeLine: 15,
      explanation: "This time nums[left]=1 differs from nums[mid]=3 — the duplicate trap doesn't apply. Check the left half: nums[left](1) <= nums[mid](3), so [left..mid] is the sorted half.",
      variables: { left: 2, mid: 3, right: 4 },
      array: arr,
      pointers: [{ label: "left", index: 2 }, { label: "mid", index: 3 }, { label: "right", index: 4 }],
      activeIndices: [2, 3],
    },
    {
      codeLine: 16,
      explanation: "Is target (1) within [nums[left]=1, nums[mid]=3]? Yes — 1 <= 1 <= 3. Search the left half: right = mid - 1 = 2.",
      variables: { left: 2, right: 2 },
      array: arr,
      pointers: [{ label: "left", index: 2 }, { label: "right", index: 2 }],
      activeIndices: [2, 3],
    },
    {
      codeLine: 7,
      explanation: "mid = 2 + (2-2)/2 = 2. nums[mid] = nums[2] = 1 — that's the target!",
      variables: { left: 2, mid: 2, right: 2 },
      array: arr,
      pointers: [{ label: "left", index: 2 }, { label: "mid", index: 2 }, { label: "right", index: 2 }],
      activeIndices: [2],
    },
    {
      codeLine: 9,
      explanation: "Return mid = 2 — target found at index 2, after twice shrinking past the ambiguous nums[left]==nums[mid]==nums[right] case.",
      variables: { result: 2 },
      array: arr,
      pointers: [{ label: "mid", index: 2 }],
      activeIndices: [2],
    },
  ],
};
