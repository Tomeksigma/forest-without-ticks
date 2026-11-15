import type { Module } from "@/lib/content";

/** Słowo, które uczeń liczy w tekście lekcji danego modułu, aby odblokować następny krok. */
export const keyWords: Record<number, { word: string; stem: string }> = {
  1: { word: "borelioza", stem: "borelioz" },
  2: { word: "repelent", stem: "repelent" },
  3: { word: "antybiotyk", stem: "antybiotyk" },
};

/** Cały tekst lekcji modułu (bez dopisków ze źródłami). */
export function moduleText(m: any): string {
  if (!m || !m.lessons) return "";
  return m.lessons
    .map((l: any) => {
      if (typeof l.content_md === "string") {
        return l.content_md;
      }
      if (Array.isArray(l.blocks)) {
        return l.blocks
          .flatMap((b: any): string[] => {
            switch (b.t) {
              case "src": return [];
              case "p": case "h": return [b.text];
              case "note": return [b.title ?? "", b.text];
              case "list": case "steps": return b.items;
              case "table": return b.rows.flat();
              case "checklist": return b.groups.flatMap((g: any) => [g.title, ...g.items]);
              default: return [];
            }
          })
          .join(" ");
      }
      return "";
    })
    .join(" ");
}

/** Liczy wystąpienia słowa razem z odmianami (np. borelioza, boreliozy, boreliozą). */
export const countStem = (text: string, stem: string) => text.toLowerCase().split(stem.toLowerCase()).length - 1;

export function keyQuestion(m: Module) {
  const k = keyWords[m.n]!;
  const answer = countStem(moduleText(m), k.stem);
  const options = [...new Set([answer, answer + 2, Math.max(0, answer - 2), answer + 4])].sort((a, b) => a - b);
  return { ...k, answer, options };
}
