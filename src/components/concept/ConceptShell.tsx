export function ConceptShell({
  children,
  caption,
  frameCount,
  index,
}: {
  children: React.ReactNode;
  caption: string;
  frameCount: number;
  index: number;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-6 py-10">
      <div className="flex min-h-[160px] w-full items-center justify-center">{children}</div>
      <p className="max-w-md text-center text-sm text-zinc-600 dark:text-zinc-300">{caption}</p>
      {frameCount > 1 && (
        <div className="flex gap-1.5">
          {Array.from({ length: frameCount }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition ${
                i === index ? "bg-accent" : "bg-zinc-200 dark:bg-zinc-700"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
