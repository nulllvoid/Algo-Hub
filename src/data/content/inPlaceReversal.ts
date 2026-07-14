import type { VariationContent, LinkedListNode } from "../../types";

const code = `ListNode* reverseList(ListNode* head) {
  ListNode* prev = NULL;
  ListNode* cur = head;
  ListNode* temp = NULL;

  while (cur != NULL) {
    temp = cur->next;
    cur->next = prev;
    prev = cur;
    cur = temp;
  }
  return prev;
}`;

function nodes(nextMap: Record<string, string | null>): LinkedListNode[] {
  const values: Record<string, number> = { n1: 1, n2: 2, n3: 3, n4: 4, n5: 5 };
  return Object.entries(values).map(([id, value]) => ({
    id,
    value,
    next: nextMap[id] ?? null,
  }));
}

const initial = { n1: "n2", n2: "n3", n3: "n4", n4: "n5", n5: null };

export const inPlaceReversal: VariationContent = {
  variationId: "in-place-reversal",
  code,
  engine: "linked-list",
  dryRunData: [
    {
      codeLine: 2,
      explanation: "List is 1 -> 2 -> 3 -> 4 -> 5. Initialize prev = NULL, cur = head (node 1), temp = NULL.",
      variables: { prev: "NULL", cur: "n1", temp: "NULL" },
      nodes: nodes(initial),
      activeNodeIds: ["n1"],
    },
    {
      codeLine: 7,
      explanation: "cur (node 1) isn't NULL, so enter the loop. temp = cur->next = node 2 (save it before we overwrite anything).",
      variables: { prev: "NULL", cur: "n1", temp: "n2" },
      nodes: nodes(initial),
      activeNodeIds: ["n1", "n2"],
    },
    {
      codeLine: 8,
      explanation: "cur->next = prev — node 1 now points to NULL instead of node 2. Node 1 is detached from the rest of the list.",
      variables: { prev: "NULL", cur: "n1", temp: "n2" },
      nodes: nodes({ n1: null, n2: "n3", n3: "n4", n4: "n5", n5: null }),
      activeNodeIds: ["n1"],
    },
    {
      codeLine: 10,
      explanation: "prev = cur (node 1); cur = temp (node 2). Advance both pointers one step.",
      variables: { prev: "n1", cur: "n2", temp: "n2" },
      nodes: nodes({ n1: null, n2: "n3", n3: "n4", n4: "n5", n5: null }),
      activeNodeIds: ["n1", "n2"],
    },
    {
      codeLine: 8,
      explanation: "temp = cur->next = node 3. Then cur->next = prev — node 2 now points back to node 1.",
      variables: { prev: "n1", cur: "n2", temp: "n3" },
      nodes: nodes({ n1: null, n2: "n1", n3: "n4", n4: "n5", n5: null }),
      activeNodeIds: ["n2"],
    },
    {
      codeLine: 10,
      explanation: "prev = cur (node 2); cur = temp (node 3).",
      variables: { prev: "n2", cur: "n3", temp: "n3" },
      nodes: nodes({ n1: null, n2: "n1", n3: "n4", n4: "n5", n5: null }),
      activeNodeIds: ["n2", "n3"],
    },
    {
      codeLine: 8,
      explanation: "temp = cur->next = node 4. Then cur->next = prev — node 3 now points back to node 2.",
      variables: { prev: "n2", cur: "n3", temp: "n4" },
      nodes: nodes({ n1: null, n2: "n1", n3: "n2", n4: "n5", n5: null }),
      activeNodeIds: ["n3"],
    },
    {
      codeLine: 10,
      explanation: "prev = cur (node 3); cur = temp (node 4).",
      variables: { prev: "n3", cur: "n4", temp: "n4" },
      nodes: nodes({ n1: null, n2: "n1", n3: "n2", n4: "n5", n5: null }),
      activeNodeIds: ["n3", "n4"],
    },
    {
      codeLine: 8,
      explanation: "temp = cur->next = node 5. Then cur->next = prev — node 4 now points back to node 3.",
      variables: { prev: "n3", cur: "n4", temp: "n5" },
      nodes: nodes({ n1: null, n2: "n1", n3: "n2", n4: "n3", n5: null }),
      activeNodeIds: ["n4"],
    },
    {
      codeLine: 10,
      explanation: "prev = cur (node 4); cur = temp (node 5).",
      variables: { prev: "n4", cur: "n5", temp: "n5" },
      nodes: nodes({ n1: null, n2: "n1", n3: "n2", n4: "n3", n5: null }),
      activeNodeIds: ["n4", "n5"],
    },
    {
      codeLine: 8,
      explanation: "temp = cur->next = NULL (node 5 was the tail). Then cur->next = prev — node 5 now points back to node 4.",
      variables: { prev: "n4", cur: "n5", temp: "NULL" },
      nodes: nodes({ n1: null, n2: "n1", n3: "n2", n4: "n3", n5: "n4" }),
      activeNodeIds: ["n5"],
    },
    {
      codeLine: 10,
      explanation: "prev = cur (node 5); cur = temp (NULL).",
      variables: { prev: "n5", cur: "NULL", temp: "NULL" },
      nodes: nodes({ n1: null, n2: "n1", n3: "n2", n4: "n3", n5: "n4" }),
      activeNodeIds: ["n5"],
    },
    {
      codeLine: 12,
      explanation: "cur is now NULL, so the loop ends. Return prev (node 5) as the new head: 5 -> 4 -> 3 -> 2 -> 1.",
      variables: { result: "n5" },
      nodes: nodes({ n1: null, n2: "n1", n3: "n2", n4: "n3", n5: "n4" }),
      activeNodeIds: ["n5", "n4", "n3", "n2", "n1"],
    },
  ],
};
