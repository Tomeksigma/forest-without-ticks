import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site-layout";
import fullVideo from "@/assets/videos/usuwanie-kleszcza-sceny.mp4.asset.json";

export const Route = createFileRoute("/materialy-wideo")({
  head: () => ({
    meta: [
      { title: "Materiały wideo – Uwaga Kleszcz!" },
      { name: "description", content: "Filmy edukacyjne o usuwaniu kleszcza, obserwacji po ukłuciu i badaniach laboratoryjnych. Polskie napisy, bez dźwięku." },
      { property: "og:title", content: "Materiały wideo – Uwaga Kleszcz!" },
      { property: "og:description", content: "Obejrzyj przygotowane filmy o postępowaniu po ukłuciu kleszcza z polskimi napisami." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: VideoPage,
});

const films = [
  { title: "Usuń • obserwuj • reaguj", duration: "30 sekund", url: fullVideo.url },
];

function VideoPage() {
  return (
    <main>
      <PageHero kicker="Uwaga Kleszcz!" title="Materiały wideo">Postępowanie po ukłuciu kleszcza — filmy z polskimi napisami, bez dźwięku.</PageHero>
      <div className="mx-auto max-w-4xl px-4 pt-8">
        <p className="border-l-4 border-accent bg-accent/15 p-4 text-sm">Filmy są ilustracjami wygenerowanymi przez AI. Pokazany chwyt pęsety wymaga weryfikacji medycznej — filmy nie zastępują sprawdzonej instrukcji ani konsultacji lekarskiej.</p>
      </div>
      {films.map((film) => (
        <section key={film.url} className="mx-auto max-w-4xl space-y-4 border-b px-4 py-8" aria-label={film.title}>
          <div>
            <p className="mb-2 text-sm text-muted-foreground">{film.duration} · Polskie napisy · Bez dźwięku</p>
            <h2 className="text-2xl font-semibold">{film.title}</h2>
          </div>
          <video className="aspect-video w-full rounded-lg bg-muted" controls playsInline muted preload="metadata" aria-label={film.title}>
            <source src={film.url} type="video/mp4" />
            Twoja przeglądarka nie obsługuje filmu.
          </video>
        </section>
      ))}
      <section className="mx-auto max-w-4xl space-y-3 px-4 py-8">
        <h2 className="text-xl font-semibold">Sprawdzone zasady postępowania</h2>
        <p className="text-sm">Cienką pęsetą chwyć kleszcza tuż przy skórze, bez ściskania odwłoka. Pociągnij równomiernie, bez wykręcania i szarpania. Oczyść miejsce ukłucia i umyj ręce. Zanotuj datę; przy powiększającym się zaczerwienieniu lub gorączce skontaktuj się z lekarzem.</p>
        <a className="text-sm underline underline-offset-4" href="https://www.cdc.gov/ticks/after-a-tick-bite/index.html" target="_blank" rel="noreferrer">Źródło: CDC — postępowanie po ukłuciu kleszcza</a>
      </section>
    </main>
  );
}