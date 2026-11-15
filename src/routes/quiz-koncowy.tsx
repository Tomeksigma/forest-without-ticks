import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { modules as fallbackModules } from "@/lib/content";
import { isFinalPassed, isUnlocked, saveFinal, useProgress } from "@/lib/progress";
import { ProgressNotice } from "@/components/notices";
import { getModulesData } from "@/lib/admin.functions";

export const Route = createFileRoute("/quiz-koncowy")({
  loader: async () => {
    try {
      const res = await getModulesData();
      return { modules: res?.modules?.length ? res.modules : fallbackModules };
    } catch {
      return { modules: fallbackModules };
    }
  },
  head: () => ({
    meta: [
      { title: "Quiz końcowy – Strefa Edukacji | Uwaga Kleszcz!" },
      { name: "description", content: "Jeden duży quiz z trzech modułów o kleszczach. Wynik z każdej części trafia na certyfikat." },
      { property: "og:title", content: "Quiz końcowy – Uwaga Kleszcz!" },
      { property: "og:description", content: "Sprawdź wiedzę z trzech modułów i odbierz certyfikat." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FinalQuiz,
});

function FinalQuiz() {
  const { modules } = Route.useLoaderData();
  const { progress } = useProgress();
  const [ans, setAns] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ per: Record<number, number>; correct: number; ok: boolean } | null>(null);
  const total = modules.reduce((a, m) => a + m.quiz.length, 0);

  if (!isUnlocked(modules.length + 1, progress.passed))
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold">Quiz końcowy jeszcze zablokowany</h1>
        <p className="mt-3 text-muted-foreground">Przejdź wszystkie moduły i odpowiedz na pytanie na końcu każdego z nich.</p>
        <div className="mt-6 text-left"><ProgressNotice /></div>
        <Link to="/strefa-edukacji" className="mt-6 inline-block text-primary underline">Wróć do modułów</Link>
      </div>
    );

  const submit = () => {
    const per: Record<number, number> = {};
    let correct = 0;
    for (const m of modules) {
      const c = m.quiz.filter((q, i) => ans[`${m.n}-${i}`] === q.correct).length;
      per[m.n] = Math.round((c / m.quiz.length) * 100);
      correct += c;
    }
    const ok = isFinalPassed(per);
    setResult({ per, correct, ok });
    saveFinal(per, ok);
    window.scrollTo({ top: 0 });
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-semibold">Quiz końcowy</h1>
      <p className="mt-2 text-muted-foreground">Jeden quiz, trzy części – po jednej z każdego modułu. Wynik z każdej części trafi na certyfikat. Aby zaliczyć, potrzebujesz minimum 70% poprawnych odpowiedzi w każdej z trzech części.</p>

      {result && (
        <div className={`mt-6 rounded-xl p-6 ${result.ok ? "bg-secondary" : "bg-destructive/10"}`}>
          <div className="text-2xl font-semibold">{result.ok ? "Gratulacje! Quiz zaliczony." : "Jeszcze nie tym razem"} – {result.correct}/{total} ({Math.round((result.correct / total) * 100)}%)</div>
          <ul className="mt-3 space-y-1">{modules.map((m) => <li key={m.n}>Moduł {m.roman} – {m.title}: <strong>{result.per[m.n]}%</strong></li>)}</ul>
          <div className="mt-4 flex flex-wrap gap-3">
            {result.ok
              ? <Link to="/certyfikat" className="rounded-full bg-accent px-5 py-2 font-medium text-accent-foreground">Odbierz certyfikat →</Link>
              : <button onClick={() => { setAns({}); setResult(null); }} className="rounded-full bg-primary px-5 py-2 text-primary-foreground">Spróbuj ponownie</button>}
          </div>
        </div>
      )}

      {modules.map((m) => (
        <section key={m.n} className="mt-10">
          <p className="text-sm uppercase tracking-widest text-accent-foreground/70">Część {m.roman}</p>
          <h2 className="text-2xl font-semibold">{m.title}</h2>
          <div className="mt-4 space-y-5">
            {m.quiz.map((q, i) => {
              const key = `${m.n}-${i}`;
              return (
                <fieldset key={key} className="rounded-lg border bg-card p-5">
                  <legend className="px-1 font-medium">{i + 1}. {q.q}</legend>
                  <div className="mt-2 space-y-2">
                    {q.options.map((o, j) => {
                      const chosen = ans[key] === j;
                      const st = result ? (j === q.correct ? "border-success bg-success/10" : chosen ? "border-destructive bg-destructive/10" : "") : chosen ? "border-primary bg-secondary" : "";
                      return (
                        <label key={j} className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 ${st}`}>
                          <input type="radio" name={key} disabled={!!result} checked={chosen} onChange={() => setAns({ ...ans, [key]: j })} />
                          {o}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              );
            })}
          </div>
        </section>
      ))}

      {!result && (
        <button disabled={Object.keys(ans).length < total} onClick={submit} className="mt-10 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground disabled:opacity-40">
          Sprawdź odpowiedzi ({Object.keys(ans).length}/{total})
        </button>
      )}
    </main>
  );
}
