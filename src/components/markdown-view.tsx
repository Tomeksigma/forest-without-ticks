import React, { useState } from "react";

interface MarkdownViewProps {
  content: string;
  className?: string;
}

type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | {
      type: "blockquote";
      title: string | null;
      lines: string[];
      variant: "warn" | "info" | "default";
    }
  | { type: "ordered_list"; items: string[] }
  | { type: "checklist"; items: { text: string; checked: boolean }[] }
  | { type: "bullet_list"; items: string[] }
  | { type: "source"; text: string }
  | { type: "paragraph"; text: string };

/**
 * Robust line-by-line parser that groups contiguous Markdown structures
 * into coherent semantic blocks without naive newline-splitting issues.
 */
function parseMarkdown(content: string): Block[] {
  // Normalize Windows CRLF and legacy CR to standard LF
  const lines = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const blocks: Block[] = [];

  let i = 0;
  while (i < lines.length) {
    const rawLine = lines[i]!;
    const line = rawLine.trim();

    // Skip empty lines
    if (!line) {
      i++;
      continue;
    }

    // 1. Heading (#, ##, ###, ####)
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch && headingMatch[1] && headingMatch[2]) {
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      });
      i++;
      continue;
    }

    // 2. Markdown Table (lines starting with |)
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      // Collect all | lines, allowing blank lines between rows
      while (i < lines.length) {
        const cur = lines[i]!.trim();
        if (cur.startsWith("|")) {
          tableLines.push(cur);
          i++;
        } else if (!cur) {
          // Look ahead: if the next non-empty line is also a | row, include the blank and continue
          let j = i + 1;
          while (j < lines.length && !lines[j]!.trim()) j++;
          if (j < lines.length && lines[j]!.trim().startsWith("|")) {
            i++; // skip blank line, continue collecting
          } else {
            break;
          }
        } else {
          break;
        }
      }
      if (tableLines.length >= 2) {
        const parseRow = (rowStr: string) =>
          rowStr
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((c) => c.trim());

        const headers = parseRow(tableLines[0]!);
        const isDelimiter = (l: string) => /^\|?\s*:?-+:?\s*(\|?\s*:?-+:?\s*)+\|?$/.test(l.trim());
        const dataLines = tableLines.slice(1).filter((l) => !isDelimiter(l));
        const dataRows = dataLines.map(parseRow);

        blocks.push({
          type: "table",
          headers,
          rows: dataRows,
        });
        continue;
      }
    }

    // 3. Blockquote / Callout note (contiguous lines starting with >)
    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length) {
        const cur = lines[i]!.trim();
        if (cur.startsWith(">")) {
          quoteLines.push(cur.replace(/^>\s?/, ""));
          i++;
        } else if (!cur) {
          // Look ahead: if the next non-empty line is also a > line, treat as continuation
          let j = i + 1;
          while (j < lines.length && !lines[j]!.trim()) j++;
          if (j < lines.length && lines[j]!.trim().startsWith(">")) {
            quoteLines.push(""); // preserve blank line within blockquote
            i++;
          } else {
            break;
          }
        } else {
          break;
        }
      }

      const nonEmpty = quoteLines.map((l) => l.trim()).filter(Boolean);
      const combined = nonEmpty.join(" ");

      const isWarn =
        combined.includes("⚠️") ||
        combined.toLowerCase().includes("uwaga") ||
        combined.toLowerCase().includes("ważne") ||
        combined.toLowerCase().includes("pilna pomoc");
      const isInfo =
        combined.includes("ℹ️") ||
        combined.toLowerCase().includes("informacja") ||
        combined.toLowerCase().includes("dobra wiadomość") ||
        combined.toLowerCase().includes("czy wiesz") ||
        combined.toLowerCase().includes("prawidłowe postępowanie");

      let title: string | null = null;
      let bodyLines: string[] = [];

      // Extract bold title if present on first line
      if (nonEmpty.length > 0 && nonEmpty[0]!.startsWith("**") && nonEmpty[0]!.endsWith("**")) {
        title = nonEmpty[0]!.slice(2, -2).trim();
        bodyLines = nonEmpty.slice(1);
      } else {
        bodyLines = nonEmpty;
      }

      blocks.push({
        type: "blockquote",
        title,
        lines: bodyLines,
        variant: isWarn ? "warn" : isInfo ? "info" : "default",
      });
      continue;
    }

    // 4. Interactive Checklist (- [ ] or - [x])
    if (/^[-*]\s*\[[ xX]\]/.test(line)) {
      const checkItems: { text: string; checked: boolean }[] = [];
      while (i < lines.length && /^[-*]\s*\[[ xX]\]/.test(lines[i]!.trim())) {
        const cur = lines[i]!.trim();
        const checked = /^[-*]\s*\[[xX]\]/.test(cur);
        const text = cur.replace(/^[-*]\s*\[[ xX]\]\s*/, "").trim();
        checkItems.push({ text, checked });
        i++;
      }
      blocks.push({
        type: "checklist",
        items: checkItems,
      });
      continue;
    }

    // 5. Bullet List (- or *)
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i]!.trim())) {
        items.push(lines[i]!.trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push({
        type: "bullet_list",
        items,
      });
      continue;
    }

    // 6. Ordered List (1. , 2. )
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i]!.trim())) {
        items.push(lines[i]!.trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({
        type: "ordered_list",
        items,
      });
      continue;
    }

    // 7. Source attribution (_source_ or starts with "Źródła:")
    const isItalicSource =
      (line.startsWith("_") && line.endsWith("_")) ||
      (line.startsWith("*") && line.endsWith("*"));
    const isTextSource = line.toLowerCase().startsWith("źródła:");
    if (isItalicSource || isTextSource) {
      const clean = line
        .replace(/^[_*]+|[_*]+$/g, "")
        .replace(/^źródła:\s*/i, "")
        .trim();
      blocks.push({
        type: "source",
        text: clean,
      });
      i++;
      continue;
    }

    // 8. Normal paragraph: consume lines until blank line or new block delimiter
    const pLines: string[] = [];
    while (i < lines.length) {
      const cur = lines[i]!.trim();
      if (!cur) break;
      if (
        cur.startsWith("#") ||
        cur.startsWith("|") ||
        cur.startsWith(">") ||
        /^[-*]\s+/.test(cur) ||
        /^\d+\.\s+/.test(cur) ||
        (cur.startsWith("_") && cur.endsWith("_")) ||
        cur.toLowerCase().startsWith("źródła:")
      ) {
        break;
      }
      pLines.push(cur);
      i++;
    }

    if (pLines.length > 0) {
      blocks.push({
        type: "paragraph",
        text: pLines.join(" "),
      });
    }
  }

  return blocks;
}

export function MarkdownView({ content, className = "" }: MarkdownViewProps) {
  if (!content) return null;

  const blocks = parseMarkdown(content);

  return (
    <div className={`space-y-5 text-lg leading-relaxed ${className}`}>
      {blocks.map((block, idx) => {
        // Headings
        if (block.type === "heading") {
          if (block.level === 4) {
            return (
              <h4 key={idx} className="pt-3 text-lg font-semibold text-foreground">
                {renderInline(block.text)}
              </h4>
            );
          }
          if (block.level === 3) {
            return (
              <h3 key={idx} className="pt-4 text-xl font-semibold text-foreground">
                {renderInline(block.text)}
              </h3>
            );
          }
          return (
            <h2 key={idx} className="pt-6 text-2xl font-bold text-foreground">
              {renderInline(block.text)}
            </h2>
          );
        }

        // Table
        if (block.type === "table") {
          return (
            <div key={idx} className="my-6 overflow-x-auto rounded-xl border bg-card shadow-sm">
              <table className="w-full border-collapse text-left text-sm md:text-base">
                <thead>
                  <tr className="border-b bg-muted/60 font-semibold text-foreground">
                    {block.headers.map((h, hIdx) => (
                      <th key={hIdx} className="px-4 py-3">
                        {renderInline(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {block.rows.map((row, rIdx) => (
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

        // Blockquote / Callout note
        if (block.type === "blockquote") {
          return (
            <div
              key={idx}
              className={`my-6 rounded-xl border-l-4 p-5 text-base shadow-sm ${
                block.variant === "warn"
                  ? "border-destructive bg-destructive/10 text-foreground"
                  : block.variant === "info"
                  ? "border-primary bg-secondary/80 text-foreground"
                  : "border-accent bg-accent/15 text-foreground"
              }`}
            >
              {block.title && (
                <div className="mb-2 font-semibold text-foreground text-lg tracking-tight">
                  {renderInline(block.title)}
                </div>
              )}
              <div className="space-y-2 leading-relaxed">
                {block.lines.map((line, pIdx) => (
                  <p key={pIdx}>{renderInline(line)}</p>
                ))}
              </div>
            </div>
          );
        }

        // Ordered list / Step cards
        if (block.type === "ordered_list") {
          const isSteps =
            block.items.length >= 2 &&
            block.items.length <= 6 &&
            block.items.every((it) => it.length < 50 && !it.includes("\n"));

          if (isSteps) {
            return (
              <ol key={idx} className="my-6 grid grid-cols-2 gap-3 md:grid-cols-4 list-none p-0">
                {block.items.map((it, iIdx) => (
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
              {block.items.map((it, iIdx) => (
                <li key={iIdx}>{renderInline(it)}</li>
              ))}
            </ol>
          );
        }

        // Interactive Checklist
        if (block.type === "checklist") {
          return <InteractiveChecklist key={idx} items={block.items} />;
        }

        // Bullet List
        if (block.type === "bullet_list") {
          return (
            <ul key={idx} className="my-4 space-y-2 pl-6 list-disc marker:text-accent">
              {block.items.map((item, lIdx) => (
                <li key={lIdx}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }

        // Source attribution
        if (block.type === "source") {
          return (
            <p key={idx} className="mt-8 border-t pt-4 text-sm text-muted-foreground leading-normal">
              <strong className="text-foreground/80">Źródła:</strong> {renderInline(block.text)}
            </p>
          );
        }

        // Paragraph
        return (
          <p key={idx} className="text-foreground/90 leading-relaxed">
            {renderInline(block.text)}
          </p>
        );
      })}
    </div>
  );
}

/** Interactive checklist block */
function InteractiveChecklist({
  items,
}: {
  items: { text: string; checked: boolean }[];
}) {
  const [checkedState, setCheckedState] = useState<Record<number, boolean>>(() => {
    const init: Record<number, boolean> = {};
    items.forEach((item, i) => {
      init[i] = item.checked;
    });
    return init;
  });

  const toggle = (idx: number) => {
    setCheckedState((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="my-4 space-y-2 rounded-xl border bg-card p-4 shadow-sm">
      {items.map((item, lIdx) => {
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
            <span
              className={
                isChecked
                  ? "line-through opacity-60 text-muted-foreground"
                  : "text-foreground"
              }
            >
              {renderInline(item.text)}
            </span>
          </label>
        );
      })}
    </div>
  );
}

/** Render inline Markdown formatting (bold, italic, links, inline code) */
function renderInline(text: string): React.ReactNode {
  if (!text) return null;

  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\*[^*]+\*|_[^_]+_|`[^`]+`)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (!part) return null;

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
          {part.slice(1, -1)}
        </code>
      );
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch && linkMatch[1] && linkMatch[2]) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:text-primary/80 transition-colors"
        >
          {linkMatch[1]}
        </a>
      );
    }

    if (
      (part.startsWith("*") && part.endsWith("*")) ||
      (part.startsWith("_") && part.endsWith("_"))
    ) {
      return (
        <em key={i} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }

    return part;
  });
}
