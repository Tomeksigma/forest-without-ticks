import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site-layout";
import geo from "@/data/wojewodztwa-granice.json";
import stats from "@/data/zachorowania-2024.json";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "Mapa zachorowań na boreliozę w Polsce 2024 – Uwaga Kleszcz!" },
      { name: "description", content: "Interaktywna mapa województw: liczba zachorowań i zapadalność na boreliozę w 2024 r. według NIZP PZH–PIB / GIS." },
      { property: "og:title", content: "Mapa zachorowań na boreliozę – Uwaga Kleszcz!" },
      { property: "og:description", content: "Sprawdź dane o boreliozie w swoim województwie i poznaj zasady profilaktyki." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MapPage,
});

type Row = { teryt: string; name: string; cases: number; incidence: number };
const rows = stats.borelioza as Row[];
const byId = Object.fromEntries(rows.map((r) => [r.teryt, r])) as Record<string, Row>;
type Metric = "incidence" | "cases";
type Layer = "borelioza" | "kzm";

const scales: Record<Metric, { max: number; label: string }[]> = {
  incidence: [{ max: 60, label: "< 60" }, { max: 90, label: "60–89,9" }, { max: 110, label: "90–109,9" }, { max: Infinity, label: "≥ 110" }],
  cases: [{ max: 1000, label: "< 1000" }, { max: 1700, label: "1000–1699" }, { max: 3000, label: "1700–2999" }, { max: Infinity, label: "≥ 3000" }],
};
const fills = ["var(--scale-1)", "var(--scale-2)", "var(--scale-3)", "var(--scale-4)"];
const fmt = (n: number, d = 0) => n.toLocaleString("pl-PL", { minimumFractionDigits: d, maximumFractionDigits: d });

function MapPage() {
  const [metric, setMetric] = useState<Metric>("incidence");
  const [layer, setLayer] = useState<Layer>("borelioza");
  const [sel, setSel] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const color = (r: Row) => fills[scales[metric].findIndex((s) => r[metric] < s.max)];
  const cur = sel ? byId[sel] : null;
  const total = rows.reduce((a, r) => a + r.cases, 0);

  return (
    <main>
      <PageHero kicker="Interaktywna mapa" title="Zauważ ryzyko, zanim kleszcz zauważy Ciebie">
        Zachorowania na boreliozę w województwach w {stats.year} r. Mapa pokazuje zachorowania ludzi, a nie liczbę kleszczy.
      </PageHero>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <section className="rounded-xl border bg-card p-4">
          <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Warstwa">
            {(["borelioza"] as Layer[]).map((l) => (
              <button key={l} onClick={() => setLayer(l)} aria-pressed={layer === l}
                className={`rounded-full border px-3 py-1 text-sm ${layer === l ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                {l === "borelioza" ? "Borelioza" : "KZM"}
              </button>
            ))}
            {layer === "borelioza" && (["incidence", "cases"] as Metric[]).map((m) => (
              <button key={m} onClick={() => setMetric(m)} aria-pressed={metric === m}
                className={`rounded-full border px-3 py-1 text-sm ${metric === m ? "bg-secondary font-medium text-primary" : "hover:bg-muted"}`}>
                {m === "incidence" ? "Zapadalność /100 tys." : "Liczba zachorowań"}
              </button>
            ))}
          </div>
          <div className="mb-3 flex gap-2">
            <label className="sr-only" htmlFor="woj">Wybierz województwo</label>
            <select id="woj" value={sel ?? ""} onChange={(e) => setSel(e.target.value || null)} className="flex-1 rounded-md border bg-background px-2 py-1 text-sm">
              <option value="">Cała Polska</option>
              {rows.map((r) => <option key={r.teryt} value={r.teryt}>{r.name}</option>)}
            </select>
            <button onClick={() => setSel(null)} className="rounded-md border px-3 py-1 text-sm hover:bg-muted">Cała Polska</button>
          </div>

          <svg viewBox={geo.viewBox} className="w-full" role="group" aria-label="Mapa województw Polski">
            {geo.regions.map((g) => {
              const r = byId[g.teryt]!;
              const active = sel === g.teryt;
              return (
                <path key={g.teryt} d={g.path} tabIndex={0} role="button"
                  aria-label={layer === "kzm" ? `${r.name}: brak zweryfikowanych danych KZM` : `${r.name}: ${fmt(r.cases)} zachorowań, zapadalność ${fmt(r.incidence, 1)} na 100 tys.`}
                  aria-pressed={active}
                  onClick={() => setSel(active ? null : g.teryt)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(active ? null : g.teryt); } }}
                  onMouseEnter={() => setHover(g.teryt)} onMouseLeave={() => setHover(null)}
                  style={{ fill: layer === "kzm" ? "var(--muted)" : color(r), opacity: sel && !active ? 0.45 : 1 }}
                  className={`cursor-pointer stroke-card outline-none transition-all focus-visible:stroke-foreground ${active || hover === g.teryt ? "stroke-foreground" : ""}`}
                  strokeWidth={active || hover === g.teryt ? 2.5 : 1.2}>
                  <title>{r.name}</title>
                </path>
              );
            })}
            {geo.regions.map((g) => {
              const r = byId[g.teryt]!;
              return layer === "borelioza" ? (
                <text key={g.teryt} x={g.cx} y={g.cy} textAnchor="middle" fontSize={13} fontWeight={600} className="pointer-events-none fill-foreground">
                  {metric === "incidence" ? fmt(r.incidence, 1) : fmt(r.cases)}
                </text>
              ) : null;
            })}
          </svg>

          <div className="mt-3">
            <p className="text-sm font-semibold">{layer === "kzm" ? "KZM – brak zweryfikowanych danych" : metric === "incidence" ? "Zapadalność na boreliozę (na 100 tys. mieszkańców)" : "Liczba zachorowań na boreliozę"}</p>
            {layer === "borelioza" && (
              <ul className="mt-2 flex flex-wrap gap-3 text-xs">
                {scales[metric].map((s, i) => (
                  <li key={s.label} className="flex items-center gap-1"><span className="h-3 w-5 rounded-sm border" style={{ background: fills[i] }} />{s.label}</li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="space-y-4" aria-live="polite">
          <div className="rounded-xl border bg-card p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{cur ? "Województwo" : "Polska ogółem"}</p>
            <h2 className="text-3xl font-semibold capitalize">{cur ? cur.name : "Cała Polska"}</h2>
            {layer === "kzm" ? (
              <p className="mt-4 rounded-lg bg-muted p-4">Brak zweryfikowanych danych. Warstwa zostanie uzupełniona po wprowadzeniu danych z NIZP PZH–PIB / GIS.</p>
            ) : (
              <dl className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-secondary p-4"><dt className="text-xs text-muted-foreground">Zachorowania</dt><dd className="text-2xl font-semibold">{fmt(cur ? cur.cases : total)}</dd></div>
                <div className="rounded-lg bg-secondary p-4"><dt className="text-xs text-muted-foreground">Zapadalność /100 tys.</dt><dd className="text-2xl font-semibold">{cur ? fmt(cur.incidence, 1) : "79,5"}</dd></div>
                <div className="col-span-2 text-xs text-muted-foreground">Rok: {stats.year} · Źródło: <a className="underline" href={stats.sourceUrl} target="_blank" rel="noreferrer">{stats.source}</a></div>
              </dl>
            )}
          </div>
          <div className="rounded-xl border-l-4 border-accent bg-accent/15 p-4 text-sm">
            Mapa nie pokazuje liczby kleszczy — brak jednolitych pomiarów. Wysoka zapadalność nie oznacza, że w danym województwie jest najwięcej kleszczy, ani nie określa Twojego indywidualnego ryzyka. Kleszcze występują w całej Polsce.
          </div>
          <div className="rounded-xl border bg-card p-5 text-sm">
            <h3 className="mb-2 text-lg font-semibold">Typowe siedliska kleszczy</h3>
            <p>Lasy liściaste i mieszane, obrzeża lasów, zarośla, łąki, wysokie trawy, parki i ogrody — głównie niska roślinność.</p>
          </div>
        </section>

        <section className="space-y-4 text-sm">
          <div className="rounded-xl border bg-card p-5">
            <h3 className="mb-2 text-lg font-semibold">Profilaktyka</h3>
            <ul className="list-disc space-y-1 pl-5"><li>Długie spodnie i rękawy, pełne obuwie, nogawki w skarpety.</li><li>Repelent z DEET, ikarydyną lub IR3535 zgodnie z etykietą.</li><li>Jasna odzież ułatwia zauważenie kleszcza.</li></ul>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <h3 className="mb-2 text-lg font-semibold">Sprawdź skórę po powrocie</h3>
            <p>Głowa i okolice uszu, pachy, pachwiny, zgięcia kolan, pas i pępek, plecy. Sprawdź też odzież i plecak.</p>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <h3 className="mb-2 text-lg font-semibold">Szczepienie przeciw KZM</h3>
            <p>Skuteczne szczepionki chronią przed KZM, ale nie przed boreliozą. Schemat podstawowy to zwykle 3 dawki i dawki przypominające.</p>
          </div>
          <div className="rounded-xl border bg-card p-5 text-xs text-muted-foreground">
            <h3 className="mb-2 text-base font-semibold text-foreground">Źródła</h3>
            <ul className="space-y-1">
              <li><a className="underline" href={stats.sourceUrl} target="_blank" rel="noreferrer">NIZP PZH–PIB / GIS – Choroby zakaźne w Polsce w 2024 r.</a></li>
              <li><a className="underline" href="https://www.gov.pl/web/gis/kleszczowe-zapalenie-mozgu" target="_blank" rel="noreferrer">GIS – Kleszczowe zapalenie mózgu</a></li>
              <li><a className="underline" href="https://www.ecdc.europa.eu/en/disease-vectors/surveillance-and-disease-data/tick-maps" target="_blank" rel="noreferrer">ECDC – mapy kleszczy</a></li>
              <li><a className="underline" href="https://www.aotm.gov.pl/" target="_blank" rel="noreferrer">AOTMiT</a></li>
              <li>Granice województw: GeoJSON z danych PRG (GUGiK), uproszczony.</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
