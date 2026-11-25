import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { modules as fallbackModules, type Block } from "@/lib/content";
import { moduleImages } from "@/lib/images";
import { HealthNotice, ProgressNotice } from "@/components/notices";
import { isUnlocked, useProgress, saveKey } from "@/lib/progress";
import { keyQuestion } from "@/lib/key-question";
import { getModulesData, getSiteTexts } from "@/lib/admin.functions";
import { MarkdownView } from "@/components/markdown-view";

export const Route = createFileRoute("/modul/$n")({
  loader: async ({ params }) => {
    let list: any[] = fallbackModules;
    let texts: Record<string, string> = {};
    try {
      const [modsRes, textsRes] = await Promise.all([
        getModulesData(),
        (await import("@/lib/admin.functions")).getSiteTexts(),
      ]);
      if (modsRes && modsRes.modules && modsRes.modules.length > 0) {
        list = modsRes.modules;
      }
      texts = textsRes.texts || {};
    } catch {
      // fallback
    }
    const m = list.find((x) => String(x.n) === params.n);
    if (!m) throw notFound();
    return { module: m, n: m.n, texts };
  },
  head: ({ loaderData }) => {
    const m = loaderData?.module;
    const t = m ? `Moduł ${m.roman} – ${m.title} | Strefa Edukacji` : "Moduł | Strefa Edukacji";
    return { meta: [{ title: t }, { name: "description", content: m?.lead ?? "" }, { property: "og:title", content: t }, { property: "og:description", content: m?.lead ?? "" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] };
  },
  component: ModulePage,
});

function ModulePage() {
  const { module: m, n, texts } = Route.useLoaderData();
  const { progress } = useProgress();
  const [lesson, setLesson] = useState(0);
  const [quiz, setQuiz] = useState(false);
  useEffect(() => { setLesson(0); setQuiz(false); }, [n]);
  useEffect(() => { window.scrollTo({ top: 0 }); }, [lesson, quiz]);

  if (!isUnlocked(n, progress.passed)) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold">Moduł zablokowany</h1>
        <p className="mt-3 text-muted-foreground">Odpowiedz na pytanie na końcu poprzedniego modułu, aby odblokować ten etap.</p>
        <div className="mt-6 text-left"><ProgressNotice /></div>
        <Link to="/strefa-edukacji" className="mt-6 inline-block text-primary underline">Wróć do modułów</Link>
      </div>
    );
  }

  const L = m.lessons[lesson] ?? m.lessons[0]!;
  return (
    <main>
      <header className="relative h-64 overflow-hidden bg-forest text-forest-foreground">
        <img src={texts?.[`module.${n}.image`]?.trim() || moduleImages[n]} alt={m.title} width={1200} height={800} className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="relative mx-auto flex h-full max-w-5xl flex-col justify-end px-6 pb-8">
          <Link to="/strefa-edukacji" className="mb-auto mt-6 text-sm opacity-80 hover:opacity-100">← Strefa Edukacji</Link>
          <div className="text-sm uppercase tracking-widest text-accent">Moduł {m.roman}</div>
          <h1 className="text-4xl font-semibold md:text-5xl">{m.title}</h1>
        </div>
      </header>
      <div className="mx-auto max-w-5xl space-y-3 px-6 pt-8"><ProgressNotice /><HealthNotice /></div>
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-10 md:grid-cols-[220px_1fr]">
        <nav className="space-y-1 md:sticky md:top-6 md:self-start">
          {m.lessons.map((l: any, i: number) => (
            <button key={i} onClick={() => { setLesson(i); setQuiz(false); }} className={`block w-full rounded-md px-3 py-2 text-left text-sm ${!quiz && i === lesson ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
              <span className="opacity-60">{i + 1}.</span> {l.title}
            </button>
          ))}
          <button onClick={() => setQuiz(true)} className={`mt-2 block w-full rounded-md px-3 py-2 text-left text-sm font-medium ${quiz ? "bg-accent text-accent-foreground" : "border border-accent hover:bg-accent/20"}`}>
            Pytanie odblokowujące {progress.passed[n] ? "✓" : ""}
          </button>
        </nav>
        {quiz ? (
          <KeyQuestion m={m} done={!!progress.passed[n]} texts={texts} />
        ) : (
          <article>
            <div className="text-sm text-muted-foreground">Lekcja {lesson + 1} z {m.lessons.length}</div>
            <h2 className="mt-1 mb-6 text-3xl font-semibold">{L.title}</h2>
            {L.content_md ? (
              <MarkdownView content={L.content_md} />
            ) : (
              <div className="space-y-4 text-lg leading-relaxed">{L.blocks?.map((b: any, i: number) => <BlockView key={i} b={b} />)}</div>
            )}
            <div className="mt-10 flex justify-between border-t pt-6">
              <button disabled={lesson === 0} onClick={() => setLesson(lesson - 1)} className="rounded-full px-4 py-2 disabled:opacity-30 hover:bg-muted">← Poprzednia</button>
              {lesson < m.lessons.length - 1 ? (
                <button onClick={() => setLesson(lesson + 1)} className="rounded-full bg-primary px-5 py-2 text-primary-foreground">Następna →</button>
              ) : (
                <button onClick={() => setQuiz(true)} className="rounded-full bg-accent px-5 py-2 font-medium text-accent-foreground">Przejdź do pytania →</button>
              )}
            </div>
          </article>
        )}
      </div>
    </main>
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case "p": return <p>{b.text}</p>;
    case "h": return <h3 className="pt-2 text-xl font-semibold">{b.text}</h3>;
    case "list": {
      const Tag = b.ordered ? "ol" : "ul";
      return <Tag className={`space-y-2 pl-6 ${b.ordered ? "list-decimal" : "list-disc marker:text-accent"}`}>{b.items.map((x) => <li key={x}>{x}</li>)}</Tag>;
    }
    case "note":
      return (
        <div className={`rounded-lg border-l-4 p-4 text-base ${b.tone === "warn" ? "border-destructive bg-destructive/10" : b.tone === "info" ? "border-primary bg-secondary" : "border-accent bg-accent/15"}`}>
          {b.title && <div className="mb-1 font-semibold">{b.title}</div>}
          {b.text}
        </div>
      );
    case "steps":
      return (
        <ol className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {b.items.map((x, i) => (
            <li key={x} className="rounded-lg border bg-card p-4 text-center">
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">{i + 1}</div>
              <div className="text-base font-medium">{x}</div>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-base">
            <thead className="bg-muted text-left"><tr><th className="p-3">Twierdzenie</th><th className="p-3">Ocena</th><th className="p-3">Wyjaśnienie</th></tr></thead>
            <tbody>
              {b.rows.map(([s, v, e]) => (
                <tr key={s} className="border-t">
                  <td className="p-3">{s}</td>
                  <td className="p-3"><span className={`rounded-full px-2 py-0.5 text-sm font-medium ${v === "Fakt" ? "bg-success text-primary-foreground" : "bg-destructive text-destructive-foreground"}`}>{v}</span></td>
                  <td className="p-3 text-muted-foreground">{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "checklist": return <Checklist groups={b.groups} />;
    case "src": return <p className="pt-2 text-sm text-muted-foreground"><strong>Źródła:</strong> {b.text}</p>;
  }
}

function Checklist({ groups }: { groups: { title: string; items: string[] }[] }) {
  const all = groups.flatMap((g) => g.items);
  const [done, setDone] = useState<Set<string>>(new Set());
  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold">Checklista młodego leśnika</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {groups.map((g) => (
          <div key={g.title} className="rounded-lg border bg-card p-4">
            <div className="mb-3 font-semibold text-primary">{g.title}</div>
            {g.items.map((x) => (
              <label key={x} className="mb-2 flex cursor-pointer gap-2 text-base">
                <input type="checkbox" className="mt-1.5 accent-[var(--primary)]" checked={done.has(x)} onChange={() => { const s = new Set(done); s.has(x) ? s.delete(x) : s.add(x); setDone(s); }} />
                <span className={done.has(x) ? "line-through opacity-60" : ""}>{x}</span>
              </label>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="mb-1 text-sm">Zrealizowane działania: <strong>{done.size}/{all.length}</strong></div>
        <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-success transition-all" style={{ width: `${(done.size / all.length) * 100}%` }} /></div>
      </div>
    </div>
  );
}

function KeyQuestion({ m, done, texts }: { m: any; done: boolean; texts?: Record<string, string> }) {
  const word = texts?.[`unlock.module${m.n}.word`];
  const stem = texts?.[`unlock.module${m.n}.stem`];
  const k = keyQuestion(m, word, stem);
  const [pick, setPick] = useState<number | null>(null);
  const ok = pick === k.answer;
  const next = fallbackModules.find((x) => x.n === m.n + 1);
  const solved = done || ok;
  return (
    <section>
      <h2 className="text-3xl font-semibold">Pytanie odblokowujące – Moduł {m.roman}</h2>
      <p className="mt-2 text-muted-foreground">Odpowiedz poprawnie, aby przejść dalej. Wróć do lekcji, jeśli musisz policzyć.</p>
      <div className="mt-6 rounded-lg border bg-card p-5">
        <p className="font-medium">Ile razy w lekcjach tego modułu pojawia się słowo „{k.word}” (razem z odmianami, np. {k.word === "borelioza" ? "boreliozy, boreliozą" : `${k.word}u, ${k.word}y`})? Nie licz dopisków „Źródła”.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {k.options.map((o) => (
            <button key={o} onClick={() => { setPick(o); if (o === k.answer) saveKey(m.n); }} disabled={solved}
              className={`min-w-16 rounded-full border px-5 py-2 text-lg font-semibold ${pick === o ? (ok ? "border-success bg-success/10" : "border-destructive bg-destructive/10") : "hover:bg-muted"}`}>{o}</button>
          ))}
        </div>
        {pick !== null && !ok && <p className="mt-3 text-sm text-destructive" role="alert">To nie ta liczba – policz jeszcze raz i spróbuj ponownie.</p>}
      </div>
      {solved && (
        <div className="mt-6 rounded-xl bg-secondary p-6">
          <div className="text-2xl font-semibold">Brawo! {next ? `Moduł ${next.roman} odblokowany.` : "Quiz końcowy odblokowany."}</div>
          <div className="mt-4">
            {next
              ? <Link to="/modul/$n" params={{ n: String(next.n) }} className="rounded-full bg-primary px-5 py-2 text-primary-foreground">Moduł {next.roman} →</Link>
              : <Link to="/quiz-koncowy" className="rounded-full bg-accent px-5 py-2 font-medium text-accent-foreground">Przejdź do quizu końcowego →</Link>}
          </div>
        </div>
      )}
    </section>
  );
}
