import { useMemo, useState } from "react";
import { Figure, type Worn } from "@/components/dress-up";
import geo from "@/data/wojewodztwa-granice.json";
import stats from "@/data/zachorowania-2024.json";
import {
  codeCards, exitTicket, forestDecisions, mapQuestions, medicalCases, mythCards, removalDont, removalSteps,
  wardrobe, wardrobeScore, type Source,
} from "@/lib/teacher";

export type TaskProps = { checked: boolean; onScore?: ((n: number) => void) | undefined };

export const btn = "rounded-full border px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:opacity-50";
export const btnPrimary = "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50";

export function Sources({ list }: { list: Source[] }) {
  return (
    <p className="mt-3 text-xs text-muted-foreground">Źródła: {list.map((s, i) => (
      <span key={s.url}>{i > 0 && ", "}<a href={s.url} target="_blank" rel="noreferrer" className="underline">{s.label}</a></span>
    ))}</p>
  );
}

function Feedback({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return <div className={`animate-in fade-in slide-in-from-bottom-1 mt-2 rounded-lg border-l-4 p-3 text-sm ${ok ? "border-success bg-success/10" : "border-destructive bg-destructive/10"}`}>{children}</div>;
}

/* ---------- Ilustracja lasu z klikalnymi miejscami ---------- */
const zones = [
  { id: "korony", label: "Korony drzew", ok: false, why: "Kleszcze nie spadają z drzew – czekają nisko na roślinności." },
  { id: "las", label: "Wilgotny las i ściółka", ok: true, why: "Wilgotna ściółka i podszyt to typowe siedlisko kleszczy." },
  { id: "zarosla", label: "Zarośla i podszyt", ok: true, why: "Krzewy i podszyt – kleszcze czekają tu na żywiciela." },
  { id: "obrzeza", label: "Obrzeża ścieżki", ok: true, why: "Na skraju ścieżek zwierzęta i ludzie ocierają się o rośliny." },
  { id: "trawa", label: "Wysoka trawa", ok: true, why: "Wysoka trawa to jedno z najczęstszych miejsc kontaktu z kleszczem." },
  { id: "parking", label: "Utwardzony parking", ok: false, why: "Na suchej, utwardzonej nawierzchni bez roślin ryzyko jest małe." },
];

export function ForestScene({ checked, onDone }: { checked: boolean; onDone?: () => void }) {
  const [found, setFound] = useState<Record<string, boolean>>({});
  const [last, setLast] = useState<string | null>(null);
  const hit = (id: string) => { setFound((f) => ({ ...f, [id]: true })); setLast(id); };
  const okCount = zones.filter((z) => z.ok && found[z.id]).length;
  const z = zones.find((x) => x.id === last);
  const show = (id: string) => checked || found[id];
  const ring = (id: string) => (show(id) ? (zones.find((x) => x.id === id)!.ok ? "var(--success)" : "var(--destructive)") : "transparent");
  return (
    <div>
      <svg viewBox="0 0 600 300" className="w-full rounded-xl border" role="group" aria-label="Ilustracja lasu – kliknij miejsca">
        <rect width="600" height="300" fill="var(--secondary)" />
        <g role="button" aria-label="Korony drzew" onClick={() => hit("korony")} className="cursor-pointer">
          {[40, 110, 180].map((x) => <circle key={x} cx={x} cy={70} r={48} fill="var(--forest)" stroke={ring("korony")} strokeWidth={4} />)}
        </g>
        {[40, 110, 180].map((x) => <rect key={x} x={x - 6} y={110} width={12} height={60} fill="var(--secondary-foreground)" />)}
        <g role="button" aria-label="Wilgotny las i ściółka" onClick={() => hit("las")} className="cursor-pointer">
          <rect x="0" y="165" width="230" height="135" fill="var(--primary)" opacity="0.75" stroke={ring("las")} strokeWidth={4} />
        </g>
        <g role="button" aria-label="Zarośla i podszyt" onClick={() => hit("zarosla")} className="cursor-pointer">
          <rect x="235" y="160" width="150" height="100" fill="transparent" stroke={ring("zarosla")} strokeWidth={4} rx="20" />
          {[270, 320, 355].map((x, i) => <ellipse key={x} cx={x} cy={215 - i * 6} rx={40} ry={30} fill="var(--scale-3)" />)}
        </g>
        <rect x="405" y="120" width="60" height="180" fill="var(--muted)" />
        <g role="button" aria-label="Obrzeża ścieżki" onClick={() => hit("obrzeza")} className="cursor-pointer">
          <rect x="390" y="120" width="16" height="180" fill="var(--scale-2)" stroke={ring("obrzeza")} strokeWidth={4} />
          <rect x="464" y="120" width="16" height="180" fill="var(--scale-2)" stroke={ring("obrzeza")} strokeWidth={4} />
        </g>
        <g role="button" aria-label="Wysoka trawa" onClick={() => hit("trawa")} className="cursor-pointer">
          <rect x="485" y="205" width="115" height="95" fill="var(--scale-2)" stroke={ring("trawa")} strokeWidth={4} />
          {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${490 + i * 8} 300 q4 -50 ${i % 2 ? 6 : -4} -85`} stroke="var(--primary)" strokeWidth="3" fill="none" />)}
        </g>
        <g role="button" aria-label="Utwardzony parking" onClick={() => hit("parking")} className="cursor-pointer">
          <rect x="490" y="120" width="105" height="75" fill="var(--muted-foreground)" opacity="0.5" stroke={ring("parking")} strokeWidth={4} />
          <text x="542" y="163" textAnchor="middle" fontSize="16" className="fill-card font-semibold">P</text>
        </g>
        <text x="435" y="110" textAnchor="middle" fontSize="12" className="fill-foreground">ścieżka</text>
      </svg>
      <p className="mt-2 text-sm font-medium">Znalezione miejsca ryzyka: {okCount}/4</p>
      <div aria-live="polite">{z && <Feedback ok={z.ok}><strong>{z.label}:</strong> {z.why}</Feedback>}</div>
      {checked && <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">{zones.map((x) => <li key={x.id}>{x.ok ? "✓" : "✗"} {x.label}</li>)}</ul>}
      <div className="mt-3 flex gap-2">
        <button className={btn} onClick={() => { setFound({}); setLast(null); }}>Powtórz</button>
        {onDone && okCount === 4 && <span className="self-center text-sm text-success">Wszystkie miejsca znalezione!</span>}
      </div>
    </div>
  );
}

/* ---------- Prawda czy mit ---------- */
export function TruthMyth({ checked }: TaskProps) {
  const [ans, setAns] = useState<Record<number, boolean>>({});
  const done = Object.keys(ans).length;
  return (
    <div>
      <div className="mb-3 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full bg-accent transition-all" style={{ width: `${(done / 4) * 100}%` }} /></div>
      <p className="mb-3 text-sm font-medium">Postęp: {done}/4</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {mythCards.map((c, i) => {
          const a = ans[i];
          const open = a !== undefined || checked;
          return (
            <div key={i} className="rounded-xl border bg-card p-5">
              <p className="text-lg font-semibold">{c.text}</p>
              {a === undefined && !checked && (
                <div className="mt-3 flex gap-2">
                  <button className={btnPrimary} onClick={() => setAns({ ...ans, [i]: true })}>Prawda</button>
                  <button className={btn} onClick={() => setAns({ ...ans, [i]: false })}>Mit</button>
                </div>
              )}
              {open && (
                <Feedback ok={a === undefined || a === c.truth}>
                  <strong>{c.truth ? "PRAWDA" : "MIT"}.</strong> {a !== undefined && (a === c.truth ? "Dobrze! " : "Niestety nie. ")}{c.why}
                  <Sources list={[c.src]} />
                </Feedback>
              )}
            </div>
          );
        })}
      </div>
      <button className={`${btn} mt-4`} onClick={() => setAns({})}>Zagraj ponownie</button>
    </div>
  );
}

/* ---------- Symulator odzieży (lekcja 15 min) ---------- */
type Choice = { key: string; label: string; good: string; bad: string; goodWhy: string; badWhy: string };
const clothing: Choice[] = [
  { key: "rekaw", label: "Rękaw", good: "Długi", bad: "Krótki", goodWhy: "zakrywa ręce przed kontaktem z roślinnością", badWhy: "odsłania ręce i pachy" },
  { key: "spodnie", label: "Spodnie", good: "Długie", bad: "Krótkie", goodWhy: "chronią nogi w trawie i podszycie", badWhy: "odsłonięte nogi to łatwy cel – kleszcze czekają nisko" },
  { key: "buty", label: "Obuwie", good: "Pełne buty", bad: "Sandały", goodWhy: "zakrywają stopy i kostki", badWhy: "odsłaniają stopy i kostki" },
  { key: "nogawki", label: "Nogawki", good: "Zabezpieczone przy kostkach", bad: "Luźne", goodWhy: "utrudniają wejście kleszcza pod ubranie", badWhy: "kleszcz łatwo wejdzie pod nogawkę" },
  { key: "repelent", label: "Repelent", good: "Zastosowany wg etykiety", bad: "Brak", goodWhy: "zmniejsza ryzyko ukłucia (stosuj zgodnie z etykietą)", badWhy: "brak dodatkowej ochrony odstraszającej" },
];

export function ClothingSim() {
  const [sel, setSel] = useState<Record<string, boolean>>({ rekaw: false, spodnie: false, buty: false, nogawki: false, repelent: false });
  const on = (k: string) => !!sel[k];
  const [show, setShow] = useState(false);
  const worn: Worn = { gora: on("rekaw") ? "dlugi" : "koszulka", dol: on("spodnie") ? "spodnie" : "szorty", buty: on("buty") ? "buty" : "sandaly", ...(on("nogawki") && on("spodnie") ? { nogi: "skarpety" } : {}) };
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.3fr]">
      <div className={`rounded-xl border bg-card p-3 transition ${on("repelent") ? "ring-4 ring-accent/60" : ""}`}>
        <Figure worn={worn} />
        {on("repelent") && <p className="text-center text-xs text-muted-foreground">Repelent zastosowany</p>}
      </div>
      <div className="space-y-3">
        {clothing.map((c) => (
          <div key={c.key}>
            <p className="text-sm font-medium">{c.label}</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {[false, true].map((v) => (
                <button key={String(v)} aria-pressed={sel[c.key] === v} onClick={() => { setSel({ ...sel, [c.key]: v }); setShow(false); }}
                  className={`rounded-full border px-3 py-1 text-sm ${sel[c.key] === v ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{v ? c.good : c.bad}</button>
              ))}
            </div>
          </div>
        ))}
        <button className={btnPrimary} onClick={() => setShow(true)}>Sprawdź mój strój</button>
        {show && (
          <div aria-live="polite" className="space-y-2">
            {clothing.map((c) => <Feedback key={c.key} ok={on(c.key)}><strong>{sel[c.key] ? c.good : c.bad}:</strong> {sel[c.key] ? `zaleta – ${c.goodWhy}.` : `wada – ${c.badWhy}.`}</Feedback>)}
            <p className="text-sm text-muted-foreground">Żaden strój nie daje pełnej ochrony – po powrocie zawsze sprawdź skórę.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Kolejność usuwania kleszcza ---------- */
function Tweezers() {
  return (
    <svg viewBox="0 0 300 140" className="w-full max-w-sm" role="img" aria-label="Pęseta chwyta kleszcza tuż przy skórze i wyciąga go pionowo do góry">
      <rect x="0" y="100" width="300" height="40" fill="var(--scale-2)" />
      <ellipse cx="150" cy="96" rx="12" ry="9" fill="var(--foreground)" />
      <path d="M150 88 L130 10 M150 88 L170 10" stroke="var(--primary)" strokeWidth="6" strokeLinecap="round" />
      <path d="M200 70 v-40 m-8 8 l8 -8 l8 8" stroke="var(--accent)" strokeWidth="4" fill="none" />
      <text x="215" y="55" fontSize="12" className="fill-foreground">równomiernie</text>
    </svg>
  );
}

export function RemovalOrder({ checked }: TaskProps) {
  const shuffled = useMemo(() => [2, 0, 1], []);
  const [order, setOrder] = useState<number[]>([]);
  const [flip, setFlip] = useState<Record<number, boolean>>({});
  const done = order.length === 3;
  const ok = done && order.every((v, i) => v === i);
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <p className="text-sm text-muted-foreground">Kliknij czynności w prawidłowej kolejności.</p>
        <div className="mt-2 grid gap-2">
          {shuffled.map((i) => {
            const pos = order.indexOf(i);
            return <button key={i} disabled={pos >= 0} onClick={() => setOrder([...order, i])} className="rounded-lg border bg-card p-3 text-left text-sm hover:bg-muted disabled:bg-secondary">{pos >= 0 && <strong>{pos + 1}. </strong>}{removalSteps[i]}</button>;
          })}
        </div>
        {done && <Feedback ok={ok}>{ok ? "Brawo – prawidłowa kolejność!" : "Spróbuj ponownie."} Kolejność: {removalSteps.map((s, i) => `${i + 1}. ${s}`).join(" ")}</Feedback>}
        {checked && !done && <Feedback ok>{removalSteps.map((s, i) => `${i + 1}. ${s}`).join(" ")}</Feedback>}
        <button className={`${btn} mt-3`} onClick={() => setOrder([])}>Powtórz</button>
        <div className="mt-4"><Tweezers /></div>
      </div>
      <div>
        <p className="font-semibold">Czego nie robić? <span className="text-sm font-normal text-muted-foreground">(kliknij kartę)</span></p>
        <div className="mt-2 grid gap-2">
          {removalDont.map((d, i) => (
            <button key={i} onClick={() => setFlip({ ...flip, [i]: !flip[i] })} className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-left text-sm">
              <strong>✗ {d.t}</strong>{(flip[i] || checked) && <span className="block text-muted-foreground">{d.why}</span>}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Ćwiczenie wykonujemy na ilustracji – nie na skórze ucznia.</p>
        <Sources list={[{ label: "GIS – borelioza", url: "https://www.gov.pl/web/gis/borelioza" }]} />
      </div>
    </div>
  );
}

/* ---------- Bilet wyjścia ---------- */
export function ExitTicket() {
  const [v, setV] = useState(["", "", ""]);
  const [sent, setSent] = useState(false);
  return (
    <div className="space-y-3">
      {exitTicket.map((e, i) => (
        <label key={i} className="block">
          <span className="text-sm font-medium">{e.q}</span>
          <textarea value={v[i]} onChange={(ev) => setV(v.map((x, j) => (j === i ? ev.target.value : x)))} rows={2} className="mt-1 w-full rounded-lg border bg-background p-2 text-sm" />
          {sent && <span className="mt-1 block rounded-md bg-secondary p-2 text-sm">Wzór: {e.model}</span>}
        </label>
      ))}
      <div className="flex gap-2">
        <button className={btnPrimary} onClick={() => setSent(true)}>Zatwierdź</button>
        <button className={btn} onClick={() => { setV(["", "", ""]); setSent(false); }}>Wyczyść formularz</button>
      </div>
      <p className="text-xs text-muted-foreground">Odpowiedzi nie są nigdzie wysyłane ani zapisywane.</p>
    </div>
  );
}

/* ---------- Stacja 1: decyzje ---------- */
export function ForestDecisions({ checked, onScore }: TaskProps) {
  const [a, setA] = useState<Record<number, number>>({});
  const score = forestDecisions.filter((d, i) => a[i] === d.c).length;
  const all = Object.keys(a).length === forestDecisions.length;
  return (
    <div>
      <ForestScene checked={checked} />
      <h4 className="mt-6 font-semibold">Dopasuj działanie do sytuacji</h4>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        {forestDecisions.map((d, i) => (
          <div key={i} className="rounded-lg border bg-card p-3 text-sm">
            <p className="font-medium">{i + 1}. {d.s}</p>
            <div className="mt-2 grid gap-1">
              {d.o.map((o, j) => {
                const picked = a[i] === j;
                const reveal = a[i] !== undefined || checked;
                return <button key={j} disabled={a[i] !== undefined} onClick={() => setA({ ...a, [i]: j })}
                  className={`rounded-md border px-2 py-1 text-left ${reveal && j === d.c ? "border-success bg-success/10" : picked ? "border-destructive bg-destructive/10" : "hover:bg-muted"}`}>{o}</button>;
              })}
            </div>
          </div>
        ))}
      </div>
      <ScoreBar score={score} max={6} all={all} onScore={onScore} onReset={() => setA({})} />
    </div>
  );
}

function ScoreBar({ score, max, all, onScore, onReset }: { score: number; max: number; all: boolean; onScore?: ((n: number) => void) | undefined; onReset: () => void }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold">Wynik zadania: {score}/{max}{!all && " (nie wszystkie odpowiedzi)"}</span>
      {onScore && <button className={btnPrimary} onClick={() => onScore(score)}>Przypisz wynik zespołowi</button>}
      <button className={btn} onClick={onReset}>Powtórz</button>
    </div>
  );
}

/* ---------- Stacja 2: mapa ---------- */
type Row = { teryt: string; name: string; cases: number; incidence: number };
const rows = stats.borelioza as Row[];
const byId = Object.fromEntries(rows.map((r) => [r.teryt, r])) as Record<string, Row>;
const fills = ["var(--scale-1)", "var(--scale-2)", "var(--scale-3)", "var(--scale-4)"];
const colorOf = (v: number) => fills[[60, 90, 110, Infinity].findIndex((m) => v < m)];
const fmt = (n: number, d = 0) => n.toLocaleString("pl-PL", { minimumFractionDigits: d, maximumFractionDigits: d });

export function MapStation({ checked }: TaskProps) {
  const [sel, setSel] = useState<string | null>(null);
  const cur = sel ? byId[sel] : null;
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <svg viewBox={geo.viewBox} className="w-full" role="group" aria-label="Mapa województw – zapadalność na boreliozę">
          {geo.regions.map((g) => {
            const r = byId[g.teryt]!;
            return <path key={g.teryt} d={g.path} role="button" tabIndex={0} aria-label={r.name} onClick={() => setSel(g.teryt)}
              onKeyDown={(e) => { if (e.key === "Enter") setSel(g.teryt); }}
              style={{ fill: colorOf(r.incidence), opacity: sel && sel !== g.teryt ? 0.5 : 1 }} className="cursor-pointer stroke-card" strokeWidth={sel === g.teryt ? 3 : 1.2} />;
          })}
        </svg>
        <div className="mt-2 rounded-lg border bg-card p-3 text-sm" aria-live="polite">
          {cur ? <><strong className="capitalize">{cur.name}</strong>: {fmt(cur.cases)} zachorowań na boreliozę, zapadalność {fmt(cur.incidence, 1)} na 100 tys. mieszkańców ({stats.year} r.)</> : "Kliknij województwo, aby odczytać dane."}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Dane: <a className="underline" href={stats.sourceUrl} target="_blank" rel="noreferrer">{stats.source}</a>. Mapa pokazuje zachorowania ludzi, nie liczbę kleszczy.</p>
      </div>
      <div className="space-y-3">
        {mapQuestions.map((q, i) => (
          <div key={i} className="rounded-lg border bg-card p-3 text-sm">
            <p className="font-medium">{i + 1}. {q.q}</p>
            <textarea rows={2} className="mt-1 w-full rounded-md border bg-background p-2" aria-label={`Odpowiedź na pytanie ${i + 1}`} />
            {checked && <p className="mt-1 rounded-md bg-secondary p-2">Wzór: {q.model}</p>}
          </div>
        ))}
        <p className="text-xs text-muted-foreground">Odpowiedzi otwarte – nauczyciel przyznaje 0–2 pkt za każdą (maks. 8 pkt).</p>
      </div>
    </div>
  );
}

/* ---------- Stacja 3: szafa leśnika ---------- */
export function Wardrobe({ checked, onScore }: TaskProps) {
  const [sel, setSel] = useState<Record<string, boolean>>({});
  const [eval_, setEval] = useState(false);
  const on = (k: string) => !!sel[k];
  const show = eval_ || checked;
  const worn: Worn = {
    ...(on("dlugi") ? { gora: "dlugi" } : on("koszulka") ? { gora: "koszulka" } : {}),
    ...(on("spodnie") ? { dol: "spodnie" } : on("szorty") ? { dol: "szorty" } : {}),
    ...(on("buty") ? { buty: "buty" } : on("sandaly") ? { buty: "sandaly" } : {}),
  };
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
      <div className={`rounded-xl border bg-card p-3 ${on("repelent") ? "ring-4 ring-accent/60" : ""}`}>
        <Figure worn={worn} />
        <p className="text-center text-xs text-muted-foreground">{[on("repelent") && "repelent", on("peseta") && "pęseta w apteczce"].filter(Boolean).join(" · ") || "\u00a0"}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Zaznacz elementy odpowiednie na praktyki.</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {wardrobe.map((w) => (
            <button key={w.id} aria-pressed={!!sel[w.id]} onClick={() => { setSel({ ...sel, [w.id]: !sel[w.id] }); setEval(false); }}
              className={`rounded-lg border p-3 text-left text-sm transition ${sel[w.id] ? "border-primary bg-secondary" : "bg-card hover:bg-muted"} ${show ? (!!sel[w.id] === w.good ? "ring-2 ring-success" : "ring-2 ring-destructive") : ""}`}>
              {sel[w.id] ? "☑ " : "☐ "}{w.label}
              {show && <span className="mt-1 block text-xs text-muted-foreground">{w.good ? "Odpowiednie" : "Nieodpowiednie"} – {w.why}</span>}
            </button>
          ))}
        </div>
        <button className={`${btnPrimary} mt-3`} onClick={() => setEval(true)}>Oceń zestaw</button>
        {show && <ScoreBar score={wardrobeScore(sel)} max={8} all onScore={onScore} onReset={() => { setSel({}); setEval(false); }} />}
      </div>
    </div>
  );
}

/* ---------- Stacja 4: medyczne zagadki ---------- */
export function MedicalCases({ checked, onScore }: TaskProps) {
  const [a, setA] = useState<Record<string, boolean>>({});
  const all = medicalCases.flatMap((c) => c.st.map((s, i) => ({ k: `${c.id}${i}`, s })));
  const score = all.filter(({ k, s }) => a[k] === s.ok).length;
  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-3">
        {medicalCases.map((c) => (
          <div key={c.id} className="rounded-xl border bg-card p-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Historia {c.id}</p>
            <p className="font-semibold">{c.title}</p>
            <div className="mt-3 space-y-3">
              {c.st.map((s, i) => {
                const k = `${c.id}${i}`;
                const v = a[k];
                return (
                  <div key={k} className="text-sm">
                    <p>{s.t}</p>
                    <div className="mt-1 flex gap-2">
                      {[true, false].map((b) => (
                        <button key={String(b)} disabled={v !== undefined} onClick={() => setA({ ...a, [k]: b })}
                          className={`rounded-full border px-3 py-0.5 ${v === b ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{b ? "Tak" : "Nie"}</button>
                      ))}
                    </div>
                    {(v !== undefined || checked) && <Feedback ok={v === undefined || v === s.ok}><strong>{s.ok ? "Tak." : "Nie."}</strong> {s.why}</Feedback>}
                  </div>
                );
              })}
            </div>
            <Sources list={c.src} />
          </div>
        ))}
      </div>
      <ScoreBar score={score} max={9} all={Object.keys(a).length === 9} onScore={onScore} onReset={() => setA({})} />
      <p className="mt-2 text-xs text-muted-foreground">Zadanie edukacyjne – nie służy do stawiania diagnozy i nie zastępuje konsultacji lekarskiej.</p>
    </div>
  );
}

/* ---------- Stacja 5: kodeks ---------- */
export function CodeBuilder({ checked }: TaskProps) {
  const [rules, setRules] = useState<string[]>([]);
  const [own, setOwn] = useState("");
  const add = (t: string) => { if (t.trim() && rules.length < 5 && !rules.includes(t)) setRules([...rules, t.trim()]); };
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <p className="text-sm text-muted-foreground">Wybierz karty (maks. 5) lub dopisz własną zasadę.</p>
        <div className="mt-2 grid gap-2">
          {codeCards.map((c) => (
            <button key={c.t} disabled={rules.includes(c.t) || rules.length >= 5} onClick={() => add(c.t)}
              className={`rounded-lg border bg-card p-2 text-left text-sm hover:bg-muted disabled:opacity-50 ${checked ? (c.ok ? "ring-2 ring-success" : "ring-2 ring-destructive") : ""}`}>{c.t}</button>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input value={own} onChange={(e) => setOwn(e.target.value)} placeholder="Własna zasada…" className="flex-1 rounded-md border bg-background px-2 py-1 text-sm" />
          <button className={btn} onClick={() => { add(own); setOwn(""); }}>Dodaj</button>
        </div>
      </div>
      <div className="rounded-xl border-2 border-primary bg-card p-5">
        <p className="text-xs uppercase tracking-widest text-accent">Kodeks młodego leśnika</p>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-lg" style={{ fontFamily: "var(--font-display)" }}>
          {rules.map((r) => <li key={r}>{r} <button aria-label="Usuń" className="text-xs text-muted-foreground" onClick={() => setRules(rules.filter((x) => x !== r))}>✕</button></li>)}
        </ol>
        {rules.length === 0 && <p className="text-sm text-muted-foreground">Tu pojawią się zasady zespołu.</p>}
        <p className="mt-3 text-xs text-muted-foreground">Nauczyciel ocenia zasady: 0–5 pkt.</p>
      </div>
    </div>
  );
}
