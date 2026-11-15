import { useEffect, useRef, useState } from "react";
import { btn, btnPrimary, Sources } from "@/components/teacher/tasks";
import { clampPoints, isTeamPassed, PASS_POINTS, STATION_MAX, STATION_NAMES, TOTAL_MAX, type Source } from "@/lib/teacher";

export type StageCtx = { checked: boolean; onScore: (n: number) => void; teams: string[]; scores: number[][]; setTeams: (t: string[]) => void };
export type Stage = {
  title: string; time: [number, number]; instruction: string; script: string; key: string;
  station?: number; sources?: Source[]; render: (c: StageCtx) => React.ReactNode;
};

const mmss = (s: number) => `${s < 0 ? "−" : ""}${Math.floor(Math.abs(s) / 60)}:${String(Math.abs(s) % 60).padStart(2, "0")}`;

export function LessonRunner({ title, stages, onExit, teamsMode }: { title: string; stages: Stage[]; onExit: () => void; teamsMode?: boolean }) {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState<Record<number, boolean>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [elapsed, setElapsed] = useState<Record<number, number>>({});
  const [paused, setPaused] = useState(false);
  const [projector, setProjector] = useState(false);
  const [keyOpen, setKeyOpen] = useState(false);
  const [teams, setTeams] = useState<string[]>(["Zespół 1", "Zespół 2", "Zespół 3", "Zespół 4"]);
  const [scores, setScores] = useState<number[][]>(() => Array.from({ length: 6 }, () => [0, 0, 0, 0, 0]));
  const [target, setTarget] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setElapsed((e) => ({ ...e, [idx]: (e[idx] ?? 0) + 1 })), 1000);
    return () => clearInterval(t);
  }, [idx, paused]);

  const st = stages[idx]!;
  const dur = (st.time[1] - st.time[0]) * 60;
  const left = dur - (elapsed[idx] ?? 0);
  const setPts = (team: number, station: number, v: number) =>
    setScores((s) => s.map((row, i) => (i === team ? row.map((x, j) => (j === station ? clampPoints(v, station) : x)) : row)));
  const ctx = (i: number): StageCtx => ({
    checked: !!checked[i], teams, scores, setTeams,
    onScore: (n) => { const sn = stages[i]?.station; if (sn !== undefined) setPts(target, sn, n); },
  });
  const fullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else root.current?.requestFullscreen?.();
  };

  return (
    <div ref={root} className="min-h-screen overflow-auto bg-background">
      <div className="sticky top-0 z-40 border-b bg-forest text-forest-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs uppercase tracking-widest text-accent">{title}</p>
            <p className="truncate font-semibold">Etap {idx + 1}/{stages.length}: {st.title} <span className="font-normal opacity-80">({st.time[0]}–{st.time[1]} min)</span></p>
          </div>
          <div className={`rounded-lg px-3 py-1 font-mono text-xl tabular-nums ${left < 0 ? "bg-destructive text-destructive-foreground" : "bg-forest-foreground/10"}`} aria-live="off" title="Czas pozostały do końca etapu">
            {mmss(left)}{paused && " ⏸"}
          </div>
          <button className="rounded-full border border-forest-foreground/40 px-3 py-1 text-sm" onClick={() => setProjector(!projector)}>{projector ? "Tryb nauczyciela" : "Tryb projektora"}</button>
          <button className="rounded-full border border-forest-foreground/40 px-3 py-1 text-sm" onClick={fullscreen}>Pełny ekran</button>
          {!projector && <button className="rounded-full border border-forest-foreground/40 px-3 py-1 text-sm" onClick={onExit}>Zakończ</button>}
        </div>
        <div className="h-1.5 bg-forest-foreground/10"><div className="h-full bg-accent transition-all" style={{ width: `${((idx + 1) / stages.length) * 100}%` }} /></div>
      </div>

      <div className={`mx-auto grid max-w-7xl gap-6 px-4 py-6 ${projector ? "" : "lg:grid-cols-[1fr_340px]"}`}>
        <section aria-label="Zadanie dla uczniów">
          {stages.map((s, i) => (
            <div key={i} hidden={i !== idx}>
              <h2 className="text-3xl font-semibold">{s.title}</h2>
              {!shown[i] && !projector ? (
                <div className="mt-4 rounded-xl border-2 border-dashed p-10 text-center text-muted-foreground">
                  Zadanie jest ukryte przed uczniami. Kliknij „Pokaż zadanie uczniom”.
                </div>
              ) : (
                <div className="mt-4">{s.render(ctx(i))}{s.sources && <Sources list={s.sources} />}</div>
              )}
              {teamsMode && s.station !== undefined && !projector && (
                <TeamPoints station={s.station} teams={teams} scores={scores} setPts={setPts} target={target} setTarget={setTarget} />
              )}
            </div>
          ))}
          {/* Etap końcowy dostaje tabelę wyników */}
          {teamsMode && idx === stages.length - 1 && <Results teams={teams} scores={scores} />}
        </section>

        {!projector && (
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start" aria-label="Panel nauczyciela">
            <div className="flex flex-wrap gap-2">
              <button className={btnPrimary} onClick={() => setShown({ ...shown, [idx]: true })}>Pokaż zadanie uczniom</button>
              <button className={btn} onClick={() => { setShown({ ...shown, [idx]: true }); setChecked({ ...checked, [idx]: true }); }}>Sprawdź odpowiedzi</button>
              <button className={btn} disabled={idx === 0} onClick={() => setIdx(idx - 1)}>← Poprzedni etap</button>
              <button className={btn} disabled={idx === stages.length - 1} onClick={() => setIdx(idx + 1)}>Następny etap →</button>
              <button className={btn} onClick={() => setPaused(!paused)}>{paused ? "Wznów" : "Pauza"}</button>
            </div>
            {left < 0 && <p className="rounded-lg bg-accent/20 p-3 text-sm">Czas etapu minął – przejdź dalej, gdy uznasz to za stosowne.</p>}
            <div className="rounded-xl border bg-card p-4 text-sm">
              <p className="font-semibold">Instrukcja prowadzenia</p>
              <p className="mt-1 text-muted-foreground">{st.instruction}</p>
            </div>
            <div className="rounded-xl border-l-4 border-accent bg-card p-4 text-sm">
              <p className="font-semibold">Tekst prowadzącego</p>
              <p className="mt-1 italic">„{st.script}”</p>
            </div>
            <div className="rounded-xl border bg-card p-4 text-sm">
              <button className="font-semibold underline" onClick={() => setKeyOpen(!keyOpen)}>{keyOpen ? "Ukryj klucz odpowiedzi" : "Pokaż klucz odpowiedzi (tylko nauczyciel)"}</button>
              {keyOpen && <p className="mt-2 whitespace-pre-line">{st.key}</p>}
            </div>
            <ol className="space-y-1 text-sm">
              {stages.map((s, i) => (
                <li key={i}><button onClick={() => setIdx(i)} className={`w-full rounded-md px-2 py-1 text-left ${i === idx ? "bg-secondary font-medium" : "hover:bg-muted"}`}>{s.time[0]}–{s.time[1]} min · {s.title}</button></li>
              ))}
            </ol>
          </aside>
        )}
      </div>
    </div>
  );
}

function TeamPoints({ station, teams, scores, setPts, target, setTarget }: { station: number; teams: string[]; scores: number[][]; setPts: (t: number, s: number, v: number) => void; target: number; setTarget: (n: number) => void }) {
  return (
    <div className="mt-6 rounded-xl border bg-muted/50 p-4">
      <p className="font-semibold">Punkty zespołów – stacja {station + 1} (maks. {STATION_MAX[station] ?? 0} pkt)</p>
      <p className="text-xs text-muted-foreground">Wybierz zespół, który teraz rozwiązuje zadanie – „Przypisz wynik zespołowi” wpisze mu punkty. Możesz też wpisać punkty ręcznie (np. za odpowiedzi otwarte).</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {teams.map((t, i) => (
          <label key={i} className={`flex items-center gap-2 rounded-lg border bg-card p-2 text-sm ${target === i ? "border-primary" : ""}`}>
            <input type="radio" name={`target-${station}`} checked={target === i} onChange={() => setTarget(i)} />
            <span className="flex-1">{t}</span>
            <input type="number" min={0} max={STATION_MAX[station] ?? 0} value={scores[i]?.[station] ?? 0} onChange={(e) => setPts(i, station, Number(e.target.value))} className="w-16 rounded-md border bg-background px-2 py-1" aria-label={`Punkty: ${t}`} />
          </label>
        ))}
      </div>
    </div>
  );
}

function Results({ teams, scores }: { teams: string[]; scores: number[][] }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border bg-card p-4">
      <table className="w-full text-sm">
        <thead><tr className="text-left">
          <th className="p-2">Zespół</th>{STATION_NAMES.map((n, i) => <th key={n} className="p-2">{n} <span className="text-muted-foreground">/{STATION_MAX[i]}</span></th>)}
          <th className="p-2">Suma /{TOTAL_MAX}</th><th className="p-2">%</th><th className="p-2">Wynik</th>
        </tr></thead>
        <tbody>
          {teams.map((t, i) => {
            const sum = (scores[i] ?? []).reduce((a, b) => a + b, 0);
            return (
              <tr key={i} className="border-t">
                <td className="p-2 font-medium">{t}</td>
                {(scores[i] ?? []).map((v, j) => <td key={j} className="p-2">{v}</td>)}
                <td className="p-2 font-semibold">{sum}</td>
                <td className="p-2">{Math.round((sum / TOTAL_MAX) * 100)}%</td>
                <td className={`p-2 font-semibold ${isTeamPassed(sum) ? "text-success" : "text-destructive"}`}>{isTeamPassed(sum) ? "Zaliczone" : `Brak zaliczenia (min. ${PASS_POINTS})`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
