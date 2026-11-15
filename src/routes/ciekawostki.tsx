import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { PageHero } from "@/components/site-layout";
import { HealthNotice, ProgressNotice } from "@/components/notices";
import { categories, facts as fallbackFacts, miniQuiz as fallbackMiniQuiz, type Fact } from "@/lib/facts";
import { getFactsData } from "@/lib/admin.functions";

export const Route = createFileRoute("/ciekawostki")({
  loader: async () => {
    try {
      const res = await getFactsData();
      return {
        facts: res?.facts?.length ? res.facts : fallbackFacts,
        miniQuiz: res?.miniQuiz?.length ? res.miniQuiz : fallbackMiniQuiz,
      };
    } catch {
      return { facts: fallbackFacts, miniQuiz: fallbackMiniQuiz };
    }
  },
  head: () => ({
    meta: [
      { title: "Czy wiesz, że…? Ciekawostki o kleszczach – Uwaga Kleszcz!" },
      { name: "description", content: "12 interaktywnych kart naukowych ciekawostek o kleszczach: biologia, siedliska i fakty medyczne, z grą „Zgadnij, zanim odkryjesz” i quizem końcowym." },
      { property: "og:title", content: "Czy wiesz, że…? Ciekawostki o kleszczach – Uwaga Kleszcz!" },
      { property: "og:description", content: "Odkryj naukowe tajemnice kleszczy. Sprawdź, co jest faktem, a co tylko popularnym mitem." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Ciekawostki,
});

const catLabel = Object.fromEntries(categories.map((c) => [c.id, c.label])) as Record<Fact["category"], string>;

function CategoryIcon({ cat }: { cat: Fact["category"] }) {
  const stroke = "currentColor";
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (cat === "biologia")
    return (
      <svg {...common}>
        <path d="M9 3h6M11 3v6.5L6.5 18a2 2 0 0 0 1.8 3h7.4a2 2 0 0 0 1.8-3L13 9.5V3" />
        <path d="M8 14h8" />
      </svg>
    );
  if (cat === "srodowisko")
    return (
      <svg {...common}>
        <path d="M12 3l5 6h-2.5l3.5 5h-3l3 4H6l3-4H6l3.5-5H7z" />
        <path d="M12 18v3" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

function FactCard({ f, discovered, points, guessOpen, choice, onOpen, onPick }: {
  f: Fact;
  discovered: boolean;
  points: boolean;
  guessOpen: boolean;
  choice: number | null;
  onOpen: () => void;
  onPick: (i: number) => void;
}) {
  return (
    <article id={`karta-${f.id}`} className="flex flex-col rounded-xl border bg-card p-5">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-primary"><CategoryIcon cat={f.category} /></span>
        <span className="uppercase tracking-widest">{catLabel[f.category]}</span>
        <span className="ml-auto font-semibold text-primary">#{f.id}</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold">{f.question}</h3>

      {!discovered && !guessOpen && (
        <button onClick={onOpen} className="mt-4 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground motion-safe:transition-opacity motion-safe:hover:opacity-90">
          Odkryj ciekawostkę
        </button>
      )}

      {guessOpen && !discovered && (
        <div className="mt-4">
          <p className="text-sm font-medium">Zgadnij, zanim odkryjesz:</p>
          <div className="mt-2 space-y-2">
            {f.guess.options.map((o, i) => (
              <button key={i} onClick={() => onPick(i)} className="block w-full rounded-lg border bg-background p-3 text-left text-sm hover:bg-muted">
                {o}
              </button>
            ))}
          </div>
        </div>
      )}

      {discovered && (
        <div className="mt-4 space-y-3 text-sm leading-relaxed">
          <p><strong className="text-primary">Odpowiedź:</strong> {f.answer}</p>
          {choice !== null && (
            <p className={choice === f.guess.correct ? "text-success" : "text-destructive"}>
              {choice === f.guess.correct ? "✓ Zgadłeś za pierwszym razem — punkt!" : "✗ To nie ta odpowiedź — poprawna jest wyżej. Treść i tak została odkryta."}
            </p>
          )}
          <p className="text-muted-foreground">{f.explanation}</p>
          <p className="rounded-lg bg-secondary p-3"><strong>Co to znaczy dla Ciebie:</strong> {f.meaning}</p>
          <p>
            <a href={f.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Źródło: {f.sourceName}</a>
          </p>
          <div className="flex items-center gap-2">
            {points && <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success">+1 punkt</span>}
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">✓ Poznane</span>
          </div>
        </div>
      )}
    </article>
  );
}

function MiniQuiz({ list }: { list: any[] }) {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = list[i];
  const passed = score >= Math.ceil(list.length * 0.7);
  const restart = () => { setI(0); setPick(null); setScore(0); setDone(false); };

  if (done) {
    return (
      <div className="rounded-xl bg-secondary p-8 text-center">
        <h3 className="text-3xl font-semibold">Wynik quizu: {score}/{list.length}</h3>
        <p className="mt-2 text-secondary-foreground">
          {passed ? `Zaliczone — minimum ${Math.ceil(list.length * 0.7)}/${list.length} osiągnięte. Dobrze znasz kleszcze!` : `Próg zaliczenia to minimum ${Math.ceil(list.length * 0.7)}/${list.length}. Przejrzyj karty jeszcze raz i spróbuj ponownie.`}
        </p>
        <ul className="mx-auto mt-4 max-w-2xl space-y-2 text-left text-sm">
          {list.map((item, j) => (
            <li key={j} className="rounded-lg border bg-card p-3">
              <strong>{item.question}</strong>
              <div className="mt-1 text-muted-foreground">Poprawna: {item.options[item.correct]}. {item.why}</div>
            </li>
          ))}
        </ul>
        <button onClick={restart} className="mt-6 rounded-full bg-primary px-6 py-3 text-primary-foreground">Spróbuj ponownie</button>
      </div>
    );
  }

  return (
    <div>
      <div className="text-sm text-muted-foreground">Pytanie {i + 1} z {list.length} · próg zaliczenia: {Math.ceil(list.length * 0.7)}/{list.length}</div>
      <h3 className="mt-2 text-2xl font-semibold">{q!.question}</h3>
      <div className="mt-4 space-y-3">
        {q!.options.map((o: string, j: number) => {
          const st = pick === null ? "hover:bg-muted" : j === q!.correct ? "border-success bg-success/10" : pick === j ? "border-destructive bg-destructive/10" : "opacity-60";
          return (
            <button key={j} disabled={pick !== null} onClick={() => { setPick(j); if (j === q!.correct) setScore(score + 1); }} className={`block w-full rounded-lg border bg-card p-4 text-left ${st}`}>
              {o}
            </button>
          );
        })}
      </div>
      {pick !== null && q!.why && (
        <p className="mt-3 text-sm text-muted-foreground"><strong>Uzasadnienie:</strong> {q!.why}</p>
      )}
      {pick !== null && (
        <button onClick={() => { setI(i + 1); setPick(null); if (i + 1 >= list.length) setDone(true); }} className="mt-4 rounded-full bg-primary px-6 py-3 text-primary-foreground">
          {i + 1 < list.length ? "Dalej →" : "Zobacz wynik"}
        </button>
      )}
    </div>
  );
}

function Ciekawostki() {
  const { facts, miniQuiz } = Route.useLoaderData();
  const [discovered, setDiscovered] = useState<number[]>([]);
  const [scored, setScored] = useState<number[]>([]);
  const [guessOpen, setGuessOpen] = useState<number | null>(null);
  const [choices, setChoices] = useState<Record<number, number | null>>({});
  const [filter, setFilter] = useState<"all" | Fact["category"]>("all");
  const shellRef = useRef<HTMLDivElement>(null);

  const visible = facts.filter((f) => filter === "all" || f.category === filter);
  const found = discovered.length;
  const allFound = found === facts.length;
  const pct = Math.round((found / facts.length) * 100);

  const open = (id: number) => setGuessOpen(id);
  const pick = (id: number, i: number) => {
    setChoices((c) => ({ ...c, [id]: i }));
    setDiscovered((d) => (d.includes(id) ? d : [...d, id]));
    setGuessOpen(null);
    const f = facts.find((x) => x.id === id)!;
    if (i === f.guess.correct) setScored((s) => (s.includes(id) ? s : [...s, id]));
  };
  const randomFact = () => {
    const pool = facts.filter((f) => !discovered.includes(f.id));
    const list = pool.length ? pool : facts;
    const f = list[Math.floor(Math.random() * list.length)]!;
    setFilter("all");
    if (pool.length) setGuessOpen(f.id);
    document.getElementById(`karta-${f.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const reset = () => { setDiscovered([]); setScored([]); setGuessOpen(null); setChoices({}); };
  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void shellRef.current?.requestFullscreen?.();
  };

  return (
    <main>
      <PageHero kicker="Ciekawostki" title="Czy wiesz, że…? 12 zaskakujących faktów o kleszczach">
        Odkryj naukowe tajemnice kleszczy. Sprawdź, co jest faktem, a co tylko popularnym mitem.
      </PageHero>

      <div ref={shellRef} className="bg-background">
        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="mb-6 space-y-3"><ProgressNotice /><HealthNotice /></div>

          <div className="rounded-xl border bg-card p-4">
            <div className="flex flex-wrap items-center gap-3" aria-live="polite">
              <span className="text-sm font-medium">Odkryto {found} z {facts.length} ciekawostek{allFound ? ` · punkty: ${scored.length}/${facts.length}` : ""}</span>
              <div className="ml-auto flex flex-wrap gap-2">
                <button onClick={randomFact} className="rounded-full border px-4 py-2 text-sm hover:bg-muted">Losuj ciekawostkę</button>
                <button onClick={toggleFullscreen} className="rounded-full border px-4 py-2 text-sm hover:bg-muted">Tryb pełnoekranowy (dla nauczyciela)</button>
                <button onClick={reset} className="rounded-full border px-4 py-2 text-sm hover:bg-muted">Reset postępu</button>
              </div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={found} aria-valuemin={0} aria-valuemax={facts.length} aria-label="Odkryte ciekawostki">
              <div className="h-full bg-primary motion-safe:transition-all motion-safe:duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filtr kategorii">
            <button onClick={() => setFilter("all")} aria-pressed={filter === "all"} className={`rounded-full border px-4 py-2 text-sm ${filter === "all" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
              Wszystkie ({facts.length})
            </button>
            {categories.map((c) => {
              const n = facts.filter((f) => f.category === c.id).length;
              return (
                <button key={c.id} onClick={() => setFilter(c.id)} aria-pressed={filter === c.id} className={`rounded-full border px-4 py-2 text-sm ${filter === c.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                  {c.label} ({n})
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((f) => (
              <FactCard key={f.id} f={f} discovered={discovered.includes(f.id)} points={scored.includes(f.id)} guessOpen={guessOpen === f.id} choice={choices[f.id] ?? null} onOpen={() => open(f.id)} onPick={(i) => pick(f.id, i)} />
            ))}
          </div>

          <section id="quiz" className="mt-14">
            <h2 className="text-3xl font-semibold">Miniquiz końcowy</h2>
            {allFound ? (
              <div className="mt-4">
                <p className="text-muted-foreground">Odkryłeś wszystkie 12 kart — quiz jest odblokowany. Próg zaliczenia: minimum 5/6 odpowiedzi.</p>
                <div className="mt-6"><MiniQuiz list={miniQuiz} /></div>
              </div>
            ) : (
              <p className="mt-2 text-muted-foreground">Quiz odblokuje się po odkryciu wszystkich 12 ciekawostek (brakuje Ci {facts.length - found}).</p>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
