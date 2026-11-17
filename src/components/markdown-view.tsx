import React, { useState } from "react";

interface MarkdownViewProps {
  content: string;
  className?: string;
}

export function MarkdownView({ content, className = "" }: MarkdownViewProps) {
  if (!content) return null;

  // 1. Normalize line endings (CRLF -> LF, CR -> LF)
  const normalized = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();

  // 2. Ensure standalone blocks before headers, tables, blockquotes even if separated by single newline
  const cleaned = normalized
    .replace(/\n(?=#{1,4}\s)/g, "\n\n")
    .replace(/\n(?=>)/g, "\n\n")
    .replace(/\n(?=\|)/g, "\n\n");

  // 3. Split into blocks by double-or-more newline
  const rawBlocks = cleaned.split(/\n{2,}/);

  return (
    <div className={`space-y-5 text-lg leading-relaxed ${className}`}>
      {rawBlocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Headings: ####, ###, ##
        if (trimmed.startsWith("#### ")) {
          return (
            <h4 key={idx} className="pt-3 text-lg font-semibold text-foreground">
              {renderInline(trimmed.slice(5))}
            </h4>
          );
        }
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={idx} className="pt-4 text-xl font-semibold text-foreground">
              {renderInline(trimmed.slice(4))}
            </h3>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={idx} className="pt-6 text-2xl font-bold text-foreground">
              {renderInline(trimmed.slice(3))}
            </h2>
          );
        }

        // Markdown Table: lines starting and ending with |
        if (trimmed.startsWith("|") && trimmed.includes("\n|")) {
          const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);
          if (lines.length >= 2) {
            const parseRow = (line: string) =>
              line
                .replace(/^\|/, "")
                .replace(/\|$/, "")
                .split("|")
                .map((c) => c.trim());

            const headers = parseRow(lines[0]!);
            const dataRows = lines.slice(2).map(parseRow);

            return (
              <div key={idx} className="my-6 overflow-x-auto rounded-xl border bg-card shadow-sm">
                <table className="w-full border-collapse text-left text-sm md:text-base">
                  <thead>
                    <tr className="border-b bg-muted/60 font-semibold text-foreground">
                      {headers.map((h, hIdx) => (
                        <th key={hIdx} className="px-4 py-3">
                          {renderInline(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {dataRows.map((row, rIdx) => (
                      <tr key={rIdx} className="transition-colors hover:bg-muted/30">
                        {row.map((cell, cIdx) => {
                          const cleanCell = cell.replace(/\*\*/g, "").trim();
                          const isFakt = cleanCell.toLowerCase() === "fakt";
                          const isMit = cleanCell.toLowerCase() === "mit";

                          return (
                            <td key={cIdx} className="px-4 py-3 align-top">
                              {isFakt ? (
                                <span className="inline-block rounded-full bg-success px-3 py-0.5 text-xs font-semibold text-primary-foreground shadow-sm">
                                  Fakt
                                </span>
                              ) : isMit ? (
                                <span className="inline-block rounded-full bg-destructive px-3 py-0.5 text-xs font-semibold text-destructive-foreground shadow-sm">
                                  Mit
                                </span>
                              ) : (
                                renderInline(cell)
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        }

        // Blockquote / Callout Note: lines starting with >
        if (trimmed.startsWith(">")) {
          const rawLines = trimmed
            .split("\n")
            .map((line) => line.replace(/^>\s?/, "").trim());

          const combined = rawLines.filter(Boolean).join(" ");
          const isWarn =
            combined.includes("⚠️") ||
            combined.toLowerCase().includes("uwaga") ||
            combined.toLowerCase().includes("ważne") ||
            combined.toLowerCase().includes("pilna pomoc");
          const isInfo =
            combined.includes("ℹ️") ||
            combined.toLowerCase().includes("informacja") ||
            combined.toLowerCase().includes("dobra wiadomość") ||
            combined.toLowerCase().includes("czy wiesz");

          // Extract title if the first line starts with bold: **Title**
          let title: string | null = null;
          let bodyLines: string[] = [];

          if (rawLines.length > 0 && rawLines[0]!.startsWith("**") && rawLines[0]!.endsWith("**")) {
            title = rawLines[0]!.slice(2, -2).replace(/^[⚠️ℹ️\s]+/, "").trim();
            bodyLines = rawLines.slice(1).filter(Boolean);
          } else {
            bodyLines = rawLines.filter(Boolean);
          }

          return (
            <div
              key={idx}
              className={`my-6 rounded-xl border-l-4 p-5 text-base shadow-sm ${
                isWarn
                  ? "border-destructive bg-destructive/10 text-foreground"
                  : isInfo
                  ? "border-primary bg-secondary/80 text-foreground"
                  : "border-accent bg-accent/15 text-foreground"
              }`}
            >
              {title && (
                <div className="mb-2 font-semibold text-foreground text-lg tracking-tight">
                  {title}
                </div>
              )}
              <div className="space-y-2 leading-relaxed">
                {bodyLines.map((line, pIdx) => (
                  <p key={pIdx}>{renderInline(line)}</p>
                ))}
              </div>
            </div>
          );
        }

        // Ordered list / Steps: 1. Item
        if (/^\d+\.\s/.test(trimmed)) {
          const items = trimmed
            .split("\n")
            .map((l) => l.replace(/^\d+\.\s*/, "").trim())
            .filter(Boolean);

          // If the items are short steps (e.g. "Jajo", "Larwa", "Nimfa", "Dorosły kleszcz"), render as card grid!
          const isSteps =
            items.length >= 2 &&
            items.length <= 6 &&
            items.every((it) => it.length < 50 && !it.includes("\n"));

          if (isSteps) {
            return (
              <ol key={idx} className="my-6 grid grid-cols-2 gap-3 md:grid-cols-4 list-none p-0">
                {items.map((it, iIdx) => (
                  <li
                    key={iIdx}
                    className="rounded-xl border bg-card p-4 text-center shadow-sm transition hover:shadow-md"
                  >
                    <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground shadow-sm">
                      {iIdx + 1}
                    </div>
                    <div className="text-base font-medium text-foreground">
                      {renderInline(it)}
                    </div>
                  </li>
                ))}
              </ol>
            );
          }

          return (
            <ol key={idx} className="my-4 space-y-2 pl-6 list-decimal marker:font-semibold marker:text-primary">
              {items.map((it, iIdx) => (
                <li key={iIdx}>{renderInline(it)}</li>
              ))}
            </ol>
          );
        }

        // Checklist or Bullet List: - Item or - [ ] Item
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const lines = trimmed.split("\n").filter((l) => l.trim().length > 0);
          const hasCheckboxes = lines.some(
            (l) => l.trim().startsWith("- [ ]") || l.trim().startsWith("- [x]")
          );

          if (hasCheckboxes) {
            return <InteractiveChecklist key={idx} lines={lines} />;
          }

          return (
            <ul key={idx} className="my-4 space-y-2 pl-6 list-disc marker:text-accent">
              {lines.map((line, lIdx) => {
                const clean = line.replace(/^[-*]\s*/, "").trim();
                return <li key={lIdx}>{renderInline(clean)}</li>;
              })}
            </ul>
          );
        }

        // Source credit note: _text_ or starts with "Źródła:"
        const isItalicSource =
          (trimmed.startsWith("_") && trimmed.endsWith("_")) ||
          (trimmed.startsWith("*") && trimmed.endsWith("*"));
        const isTextSource = trimmed.toLowerCase().startsWith("źródła:");

        if (isItalicSource || isTextSource) {
          const clean = trimmed
            .replace(/^[_*]+|[_*]+$/g, "")
            .replace(/^źródła:\s*/i, "")
            .trim();

          return (
            <p key={idx} className="mt-8 border-t pt-4 text-sm text-muted-foreground leading-normal">
              <strong className="text-foreground/80">Źródła:</strong> {clean}
            </p>
          );
        }

        // Normal paragraph
        return (
          <p key={idx} className="text-foreground/90">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

/** Interactive checklist block */
function InteractiveChecklist({ lines }: { lines: string[] }) {
  const [checkedState, setCheckedState] = useState<Record<number, boolean>>(() => {
    const init: Record<number, boolean> = {};
    lines.forEach((l, i) => {
      const clean = l.replace(/^[-*]\s*/, "").trim();
      init[i] = clean.startsWith("[x] ");
    });
    return init;
  });

  const toggle = (idx: number) => {
    setCheckedState((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="my-4 space-y-2 rounded-xl border bg-card p-4 shadow-sm">
      {lines.map((line, lIdx) => {
        const clean = line.replace(/^[-*]\s*/, "").trim();
        const isCheck = clean.startsWith("[ ] ") || clean.startsWith("[x] ");
        const text = isCheck ? clean.slice(4) : clean;
        const isChecked = !!checkedState[lIdx];

        return (
          <label
            key={lIdx}
            onClick={() => toggle(lIdx)}
            className="flex cursor-pointer items-start gap-3 rounded-lg p-2 transition hover:bg-muted/50 select-none text-base"
          >
            <span
              className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs font-bold transition-colors ${
                isChecked
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/40 bg-background"
              }`}
            >
              {isChecked ? "✓" : ""}
            </span>
            <span className={isChecked ? "line-through opacity-60 text-muted-foreground" : "text-foreground"}>
              {renderInline(text)}
            </span>
          </label>
        );
      })}
    </div>
  );
}

/** Render inline Markdown formatting (bold, italic, links, code) */
function renderInline(text: string): React.ReactNode {
  if (!text) return null;

  // Split bold (**text**)
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    // Check italics (*text* or _text_)
    const subParts = part.split(/(\*[^*]+\*|_[^_]+_)/g);
    return subParts.map((sub, j) => {
      if ((sub.startsWith("*") && sub.endsWith("*")) || (sub.startsWith("_") && sub.endsWith("_"))) {
        return (
          <em key={`${i}-${j}`} className="italic">
            {sub.slice(1, -1)}
          </em>
        );
      }
      return sub;
    });
  });
}
