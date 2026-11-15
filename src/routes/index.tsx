import { createFileRoute, Link } from "@tanstack/react-router";
import defaultHero from "@/assets/las-hero.jpg";
import defaultOlivia from "@/content/olivia.txt?raw";
import { getSiteTexts } from "@/lib/admin.functions";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      const res = await getSiteTexts();
      return { texts: res.texts };
    } catch {
      return { texts: {} };
    }
  },
  head: () => ({
    meta: [
      { title: "Uwaga Kleszcz! – Zauważ ryzyko, zanim kleszcz zauważy Ciebie" },
      { name: "description", content: "Projekt edukacyjny dla uczniów techników leśnych: Strefa Edukacji, mapa kleszczy, symulator decyzji i ogólnopolski konkurs na mural." },
      { property: "og:title", content: "Uwaga Kleszcz! – projekt edukacyjny" },
      { property: "og:description", content: "Zauważ ryzyko, zanim kleszcz zauważy Ciebie – Nie odkładaj – Działaj!" },
    ],
  }),
  component: Home,
});

const tiles = [
  { to: "/strefa-edukacji", t: "Strefa Edukacji", d: "Trzy moduły, quizy i certyfikat." },
  { to: "/mapa", t: "Mapa kleszczy", d: "Gdzie w Polsce występują kleszcze." },
  { to: "/symulator", t: "Symulator decyzji", d: "Sprawdź, jak postąpić w terenie." },
  { to: "/konkurs", t: "Konkurs na mural", d: "Regulamin i zasady zgłoszeń." },
  { to: "/galeria", t: "Galeria prac", d: "Prace konkursowe uczniów." },
  { to: "/dla-nauczycieli", t: "Dla nauczycieli", d: "Dwie interaktywne lekcje: 15 i 45 minut." },
] as const;

function Home() {
  const { texts } = Route.useLoaderData();
  const heroImage = texts["homepage.hero_image"] || defaultHero;
  const heroKicker = texts["homepage.hero_kicker"] || "Projekt edukacyjny";
  const heroTitle = texts["homepage.hero_title"] || "Zauważ ryzyko, zanim kleszcz zauważy Ciebie";
  const heroSubtitle = texts["homepage.hero_subtitle"] || "Nie odkładaj – Działaj!";
  const rawOlivia = texts["homepage.olivia"] || defaultOlivia;

  const paras = rawOlivia.replace(/\r/g, "").replace(/([^.!?:”])\n/g, "$1 ").split("\n").map((s) => s.trim()).filter(Boolean);
  return (
    <main>
      <section className="relative isolate overflow-hidden bg-forest text-forest-foreground">
        <img src={heroImage} alt="Las o poranku" width={1600} height={912} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest via-forest/60 to-transparent" />
        <div className="mx-auto flex min-h-[75vh] max-w-5xl flex-col justify-end px-6 pb-16 pt-24">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-accent">{heroKicker}</p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">{heroTitle}</h1>
          <p className="mt-4 text-2xl italic md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>{heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/strefa-edukacji" className="rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground hover:opacity-90">Wejdź do Strefy Edukacji</Link>
            <Link to="/konkurs" className="rounded-full border border-forest-foreground/40 px-6 py-3 font-medium hover:bg-forest-foreground/10">Konkurs na mural</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="mb-6 text-3xl font-semibold">O projekcie</h2>
        <div className="space-y-4 text-lg leading-relaxed">{paras.map((p, i) => <p key={i}>{p}</p>)}</div>
      </section>
      <section className="mx-auto grid max-w-5xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((x) => (
          <Link key={x.to} to={x.to} className="rounded-xl border bg-card p-6 transition hover:shadow-lg">
            <h3 className="text-2xl font-semibold text-primary">{x.t}</h3>
            <p className="mt-2 text-muted-foreground">{x.d}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
