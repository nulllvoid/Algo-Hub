import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect, useState } from "react";

interface CodeBlockProps {
  code: string;
  highlightLine?: number;
}

function usePrefersDark() {
  const [dark, setDark] = useState(
    () => window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false,
  );
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => setDark(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);
  return dark;
}

export function CodeBlock({ code, highlightLine }: CodeBlockProps) {
  const dark = usePrefersDark();

  return (
    <SyntaxHighlighter
      language="cpp"
      style={dark ? oneDark : oneLight}
      showLineNumbers
      wrapLines
      lineProps={(lineNumber) => ({
        style: {
          display: "block",
          backgroundColor: lineNumber === highlightLine ? "color-mix(in srgb, var(--color-accent) 25%, transparent)" : undefined,
          borderLeft: lineNumber === highlightLine ? "3px solid var(--color-accent)" : "3px solid transparent",
          paddingLeft: "4px",
        },
      })}
      customStyle={{ margin: 0, fontSize: "12.5px", height: "100%" }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
