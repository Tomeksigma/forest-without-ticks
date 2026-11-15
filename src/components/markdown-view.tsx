import React from "react";

interface MarkdownViewProps {
  content: string;
  className?: string;
}

export function MarkdownView({ content, className = "" }: MarkdownViewProps) {
  if (!content) return null;

  // Split into raw blocks by double-or-more newline
  const rawBlocks = content.split(/\n{2,}/);

  return (
    <div className={`space-y-4 text-lg leading-relaxed ${className}`}>
      {rawBlocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Headings: ### or ####
        if (trimmed.startsWith("#### ")) {
          return (
            <h4 key={idx} className="pt-2 text-lg font-semibold text-foreground">
              {renderInline(trimmed.slice(5))}
            </h4>
          );
        }
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={idx} className="pt-3 text-xl font-semibold text-foreground">
              {renderInline(trimmed.slice(4))}
            </h3>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={idx} className="pt-4 text-2xl font-bold text-foreground">
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
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-3">
                            {renderInline(cell)}
                          </td>
                        ))}
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
          const quoteText = trimmed
            .split("\n")
            .map((line) => line.replace(/^>\s?/, ""))
            .join("\n")
            .trim();

          const isWarn = quoteText.includes("⚠️") || quoteText.toLowerCase().includes("uwaga") || quoteText.toLowerCase().includes("ważne");
          const isInfo = quoteText.includes("ℹ️") || quoteText.toLowerCase().includes("informacja") || quoteText.toLowerCase().includes("zapamiętaj");

          return (
            <div
              key={idx}
              className={`rounded-xl border-l-4 p-5 text-base shadow-sm ${
                isWarn
                  ? "border-destructive bg-destructive/10 text-foreground"
                  : isInfo
                  ? "border-primary bg-secondary/80 text-foreground"
                  : "border-accent bg-accent/15 text-foreground"
              }`}
            >
              <div className="space-y-2">
                {quoteText.split("\n\n").map((par, pIdx) => (
                  <p key={pIdx}>{renderInline(par)}</p>
                ))}
              </div>
            </div>
          );
        }

        // Ordered list: 1. Item
        if (/^\d+\.\s/.test(trimmed)) {
          const items = trimmed
            .split("\n")
            .map((l) => l.replace(/^\d+\.\s*/, "").trim())
            .filter(Boolean);
          return (
            <ol key={idx} className="space-y-2 pl-6 list-decimal marker:font-semibold marker:text-primary">
              {items.map((it, iIdx) => (
                <li key={iIdx}>{renderInline(it)}</li>
              ))}
            </ol>
          );
        }

        // Unordered list / Checklist: - Item or - [ ] Item
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const lines = trimmed.split("\n").filter((l) => l.trim().length > 0);
          return (
            <ul key={idx} className="space-y-2 pl-6">
              {lines.map((line, lIdx) => {
                const clean = line.replace(/^[-*]\s*/, "").trim();
                const isChecklist = clean.startsWith("[ ] ") || clean.startsWith("[x] ");
                if (isChecklist) {
                  const checked = clean.startsWith("[x] ");
                  const text = clean.slice(4);
                  return (
                    <li key={lIdx} className="flex items-center gap-3 list-none -ml-6 py-1">
                      <span className={`inline-flex h-5 w-5 items-center justify-center rounded border text-xs font-bold ${checked ? "bg-primary text-primary-foreground border-primary" : "border-muted-foreground/40 bg-background"}`}>
                        {checked ? "✓" : ""}
                      </span>
                      <span>{renderInline(text)}</span>
                    </li>
                  );
                }
                return (
                  <li key={lIdx} className="list-disc marker:text-accent">
                    {renderInline(clean)}
                  </li>
                );
              })}
            </ul>
          );
        }

        // Source credit note: _text_ or *text*
        if ((trimmed.startsWith("_") && trimmed.endsWith("_")) || (trimmed.startsWith("*") && trimmed.endsWith("*"))) {
          const clean = trimmed.replace(/^[_*]+|[_*]+$/g, "");
          return (
            <p key={idx} className="text-sm italic text-muted-foreground border-t pt-3">
              {clean}
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
