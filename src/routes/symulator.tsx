import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site-layout";
import { scenarios as fallbackScenarios } from "@/lib/simulator";
import { DressUp } from "@/components/dress-up";
import { getSimulatorData } from "@/lib/admin.functions";

export const Route = createFileRoute("/symulator")({
  loader: async () => {
    try {
      const res = await getSimulatorData();
      return { scenarios: res?.scenarios?.length ? res.scenarios : fallbackScenarios };
    } catch {
      return { scenarios: fallbackScenarios };
    }
  },
  head: () => ({
    meta: [
      { title: "Symulator decyzji – Uwaga Kleszcz!" },
      { name: "description", content: "Wybierz właściwe postępowanie: przygotowanie do lasu, kontrola ciała, usuwanie kleszcza i niepokojące objawy." },
      { property: "og:title", content: "Symulator decyzji – Uwaga Kleszcz!" },
      { property: "og:description", content: "Sprawdź, czy wiesz, jak postąpić w terenie." },
    ],
  }),
  component: Sim,
});

function Sim() {
  const { scenarios } = Route.useLoaderData();
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = i >= scenarios.length;
  const s = scenarios[i];
  const restart = () => { setI(0); setPick(null); setScore(0); };
  return (
    <main>
      <PageHero kicker="Symulator" title="Co zrobisz w tej sytuacji?">Wybierz odpowiedź — od razu zobaczysz wyjaśnienie. Symulator nie służy do diagnozy.</PageHero>
      <DressUp />
      <div className="mx-auto max-w-3xl px-6 py-10">
        {done ? (
          <div className="rounded-xl bg-secondary p-8 text-center">
            <h2 className="text-3xl font-semibold">Wynik: {score}/{scenarios.length}</h2>
            <p className="mt-2 text-secondary-foreground">{score === scenarios.length ? "Świetnie — wiesz, jak chronić zdrowie w lesie!" : "Przejrzyj Strefę Edukacji i spróbuj ponownie."}</p>
            <button onClick={restart} className="mt-6 rounded-full bg-primary px-6 py-3 text-primary-foreground">Zagraj ponownie</button>
          </div>
        ) : s && (
          <div>
            <div className="text-sm text-muted-foreground">Sytuacja {i + 1} z {scenarios.length} · {s.stage}</div>
            <h2 className="mt-2 text-2xl font-semibold">{s.situation}</h2>
            <div className="mt-6 space-y-3">
              {s.options.map((o, j) => {
                const st = pick === null ? "hover:bg-muted" : o.ok ? "border-success bg-success/10" : pick === j ? "border-destructive bg-destructive/10" : "opacity-60";
                return (
                  <button key={j} disabled={pick !== null} onClick={() => { setPick(j); if (o.ok) setScore(score + 1); }} className={`block w-full rounded-lg border bg-card p-4 text-left ${st}`}>
                    {o.text}
                    {pick !== null && (pick === j || o.ok) && <div className="mt-2 text-sm text-muted-foreground">{o.why}</div>}
                  </button>
                );
              })}
            </div>
            {pick !== null && <button onClick={() => { setI(i + 1); setPick(null); }} className="mt-6 rounded-full bg-primary px-6 py-3 text-primary-foreground">{i + 1 < scenarios.length ? "Dalej →" : "Zobacz wynik"}</button>}
          </div>
        )}
      </div>
    </main>
  );
}
