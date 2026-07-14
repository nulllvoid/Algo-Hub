import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RevisionStatus } from "../types";

interface ProgressState {
  status: Record<string, RevisionStatus>;
  setStatus: (variationId: string, status: RevisionStatus) => void;
  getStatus: (variationId: string) => RevisionStatus;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      status: {},
      setStatus: (variationId, status) =>
        set((state) => ({
          status: { ...state.status, [variationId]: status },
        })),
      getStatus: (variationId) => get().status[variationId] ?? "Unsolved",
    }),
    { name: "algo-hub-progress" },
  ),
);
