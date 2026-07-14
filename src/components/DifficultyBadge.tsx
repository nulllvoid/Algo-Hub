import type { Difficulty } from "../types";

const COLORS: Record<Difficulty, string> = {
  Easy: "text-easy border-easy",
  Medium: "text-medium border-medium",
  Hard: "text-hard border-hard",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${COLORS[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}
