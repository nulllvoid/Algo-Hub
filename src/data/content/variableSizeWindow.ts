import type { VariationContent } from "../../types";

const code = `int lengthOfLongestSubstring(string s) {
  map<char,int> mp;
  int n = s.size();
  int maxLen = 0;
  int left = 0;
  for (int right = 0; right < n; right++) {
    if (mp.find(s[right]) == mp.end()) {
      mp[s[right]] = right;
    }
    else {
      int item = mp[s[right]];
      mp[s[right]] = right;
      if (left < item) {
        left = item + 1;
      }
      else if (item == left) {
        left += 1;
      }
    }
    int len = (right - left + 1);
    maxLen = max(maxLen, len);
  }
  return maxLen;
}`;

const s = ["a", "b", "c", "a", "b", "c", "b", "b"];

function windowIndices(left: number, right: number): number[] {
  const out: number[] = [];
  for (let i = left; i <= right; i++) out.push(i);
  return out;
}

export const variableSizeWindow: VariationContent = {
  variationId: "variable-size-window",
  code,
  engine: "array",
  dryRunData: [
    {
      codeLine: 2,
      explanation: 's = "abcabcbb". Start with an empty map, left = 0, maxLen = 0.',
      variables: { left: 0, maxLen: 0, map: "{}" },
      array: s,
      activeIndices: [],
    },
    {
      codeLine: 8,
      explanation: "right = 0, char 'a'. Not in map — record mp['a'] = 0. Window is [0,0], len = 1.",
      variables: { right: 0, left: 0, len: 1, maxLen: 1, map: "{a:0}" },
      array: s,
      activeIndices: windowIndices(0, 0),
      pointers: [{ label: "left", index: 0 }, { label: "right", index: 0 }],
    },
    {
      codeLine: 8,
      explanation: "right = 1, char 'b'. Not in map — record mp['b'] = 1. Window is [0,1], len = 2.",
      variables: { right: 1, left: 0, len: 2, maxLen: 2, map: "{a:0, b:1}" },
      array: s,
      activeIndices: windowIndices(0, 1),
      pointers: [{ label: "left", index: 0 }, { label: "right", index: 1 }],
    },
    {
      codeLine: 8,
      explanation: "right = 2, char 'c'. Not in map — record mp['c'] = 2. Window is [0,2], len = 3.",
      variables: { right: 2, left: 0, len: 3, maxLen: 3, map: "{a:0, b:1, c:2}" },
      array: s,
      activeIndices: windowIndices(0, 2),
      pointers: [{ label: "left", index: 0 }, { label: "right", index: 2 }],
    },
    {
      codeLine: 17,
      explanation: "right = 3, char 'a' — already in map at index 0. Since item(0) == left(0), shrink: left = 1. Window is [1,3], len = 3.",
      variables: { right: 3, left: 1, item: 0, len: 3, maxLen: 3, map: "{a:3, b:1, c:2}" },
      array: s,
      activeIndices: windowIndices(1, 3),
      pointers: [{ label: "left", index: 1 }, { label: "right", index: 3 }],
    },
    {
      codeLine: 17,
      explanation: "right = 4, char 'b' — already in map at index 1. item(1) == left(1), shrink: left = 2. Window is [2,4], len = 3.",
      variables: { right: 4, left: 2, item: 1, len: 3, maxLen: 3, map: "{a:3, b:4, c:2}" },
      array: s,
      activeIndices: windowIndices(2, 4),
      pointers: [{ label: "left", index: 2 }, { label: "right", index: 4 }],
    },
    {
      codeLine: 17,
      explanation: "right = 5, char 'c' — already in map at index 2. item(2) == left(2), shrink: left = 3. Window is [3,5], len = 3.",
      variables: { right: 5, left: 3, item: 2, len: 3, maxLen: 3, map: "{a:3, b:4, c:5}" },
      array: s,
      activeIndices: windowIndices(3, 5),
      pointers: [{ label: "left", index: 3 }, { label: "right", index: 5 }],
    },
    {
      codeLine: 14,
      explanation: "right = 6, char 'b' — already in map at index 4. This time left(3) < item(4), so jump left forward: left = item + 1 = 5. Window is [5,6], len = 2.",
      variables: { right: 6, left: 5, item: 4, len: 2, maxLen: 3, map: "{a:3, b:6, c:5}" },
      array: s,
      activeIndices: windowIndices(5, 6),
      pointers: [{ label: "left", index: 5 }, { label: "right", index: 6 }],
    },
    {
      codeLine: 14,
      explanation: "right = 7, char 'b' — already in map at index 6. left(5) < item(6), jump: left = item + 1 = 7. Window is [7,7], len = 1.",
      variables: { right: 7, left: 7, item: 6, len: 1, maxLen: 3, map: "{a:3, b:7, c:5}" },
      array: s,
      activeIndices: windowIndices(7, 7),
      pointers: [{ label: "left", index: 7 }, { label: "right", index: 7 }],
    },
    {
      codeLine: 23,
      explanation: 'Loop ends. maxLen = 3, achieved by the window "abc" at indices 0..2 — the longest run without a repeated character.',
      variables: { maxLen: 3 },
      array: s,
      activeIndices: [0, 1, 2],
    },
  ],
};
