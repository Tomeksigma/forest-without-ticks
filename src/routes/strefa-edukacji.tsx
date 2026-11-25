import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/las-hero.jpg";
import { modules as fallbackModules } from "@/lib/content";
import { moduleImages } from "@/lib/images";
import { isUnlocked, useProgress } from "@/lib/progress";
import { HealthNotice, ProgressNotice } from "@/components/notices";
import { getModulesData, getSiteTexts } from "@/lib/admin.functions";

export const Route = createFileRoute("/strefa-edukacji")({
  loader: async () => {
    try {
      const [res, textsRes] = await Promise.all([
        getModulesData(),
        getSiteTexts(),
      ]);
      return {
        modules: res?.modules?.length ? res.modules : fallbackModules,
        texts: textsRes?.texts || ({} as Record<string, string>),
      };
    } catch {
      return { modules: fallbackModules, texts: {} as Record<string, string> };
    }
  },
  head: () => ({
    meta: [
      { title: "Strefa Edukacji – Uwaga Kleszcz!" },
      { name: "description", content: "Trzy moduły o kleszczach, boreliozie i KZM dla uczniów techników leśnych. Quizy, certyfikat i konkurs na mural." },
      { property: "og:title", content: "Strefa Edukacji – Uwaga Kleszcz!" },
      { property: "og:description", content: "Naucz się chronić zdrowie podczas praktyk leśnych." },
    ],
  }),
  component: Index,
});

function Index() {
  const { modules, texts } = Route.useLoaderData();
  const { progress } = useProgress();
  const done = modules.filter((m) => progress.passed[m.n]).length;
  const heroImage = texts["homepage.hero_image"]?.trim() || hero;
  return (
    <main>
      <section className="relative isolate min-h-[85vh] overflow-hidden bg-forest text-forest-foreground">
        <img src={heroImage} alt="Las o poranku" width={1600} height={912} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest via-forest/60 to-transparent" />
        <div className="mx-auto flex min-h-[85vh] max-w-5xl flex-col justify-end px-6 pb-20">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-accent">Strefa Edukacji · Praktyki leśne</p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight md:text-7xl">Las to Twoje przyszłe miejsce pracy.</h1>
          <p className="mt-4 text-2xl italic md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>Naucz się chronić swoje zdrowie.</p>
          <p className="mt-6 max-w-2xl text-lg opacity-90">
            Podczas praktyk poznajesz ekosystemy i uczysz się pracy w terenie. Ale nawet niewielki kleszcz może przenosić drobnoustroje wywołujące boreliozę i kleszczowe zapalenie mózgu (KZM).
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/modul/$n" params={{ n: "1" }} className="rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground transition hover:opacity-90">
              Zacznij od Modułu I
            </Link>
            <a href="#moduly" className="rounded-full border border-forest-foreground/40 px-6 py-3 font-medium hover:bg-forest-foreground/10">Zobacz moduły</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {[["3", "moduły praktycznej wiedzy"], ["70%", "Aby odebrać certyfikat, musisz uzyskać minimum 70% poprawnych odpowiedzi w każdej z trzech części quizu końcowego"]].map(([a, b]) => (
            <div key={a} className="border-l-2 border-accent pl-4">
              <div className="text-4xl font-semibold text-primary" style={{ fontFamily: "var(--font-display)" }}>{a}</div>
              <div className="text-muted-foreground">{b}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="moduly" className="mx-auto max-w-5xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-4xl font-semibold">Moduły</h2>
          <span className="text-sm text-muted-foreground">Ukończone: {done}/3</span>
        </div>
        <div className="mb-8 space-y-3"><ProgressNotice /><HealthNotice /></div>
        <div className="space-y-6">
          {modules.map((m) => {
            const open = isUnlocked(m.n, progress.passed);
            const passed = progress.passed[m.n];
            const card = (
              <article className={`grid overflow-hidden rounded-xl border bg-card md:grid-cols-[2fr_3fr] ${open ? "transition hover:shadow-lg" : "opacity-60"}`}>
                <img src={texts[`module.${m.n}.image`]?.trim() || moduleImages[m.n]} alt={m.title} width={1200} height={800} loading="lazy" className="h-56 w-full object-cover md:h-full" />
                <div className="p-6 md:p-8">
                  <div className="text-sm uppercase tracking-widest text-accent-foreground/70">Moduł {m.roman}</div>
                  <h3 className="mt-1 text-3xl font-semibold">{m.title}</h3>
                  <p className="mt-3 text-muted-foreground">{m.lead}</p>
                  <div className="mt-5 text-sm font-medium">
                    {passed ? <span className="text-success">✓ Ukończony{progress.scores[m.n] !== undefined ? ` (quiz końcowy: ${progress.scores[m.n]}%)` : ""}</span> : open ? <span className="text-primary">Rozpocznij →</span> : <span>🔒 Odpowiedz na pytanie z poprzedniego modułu</span>}
                  </div>
                </div>
              </article>
            );
            return open ? (
              <Link key={m.n} to="/modul/$n" params={{ n: String(m.n) }} className="block">{card}</Link>
            ) : (
              <div key={m.n}>{card}</div>
            );
          })}
        </div>
        <div className="mt-10 rounded-xl bg-secondary p-6 text-center">
          {progress.finalPassed ? (
            <Link to="/certyfikat" className="inline-block rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground">Odbierz certyfikat</Link>
          ) : done === 3 ? (
            <Link to="/quiz-koncowy" className="inline-block rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground">Rozwiąż quiz końcowy</Link>
          ) : (
            <p className="text-secondary-foreground">Ukończ wszystkie moduły i quiz końcowy, aby otrzymać certyfikat i wziąć udział w konkursie na projekt muralu.</p>
          )}
        </div>
      </section>
    </main>
  );
}
