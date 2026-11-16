import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { checkTeacherPassword } from "@/lib/teacher-auth.functions";
import { Notice } from "@/components/notices";
import { LessonRunner, type Stage } from "@/components/teacher/lesson-runner";
import {
  btnPrimary, ClothingSim, CodeBuilder, ExitTicket, ForestDecisions, ForestScene, MapStation, MedicalCases, RemovalOrder, TruthMyth, Wardrobe,
} from "@/components/teacher/tasks";
import { commonErrors, LESSON_A_TIMES, LESSON_B_TIMES, lessonMinutes, PASS_POINTS, SRC, TOTAL_MAX } from "@/lib/teacher";

export const Route = createFileRoute("/dla-nauczycieli")({
  head: () => ({
    meta: [
      { title: "Strefa Nauczyciela – ucz przez działanie | Uwaga Kleszcz!" },
      { name: "description", content: "Dwie gotowe, interaktywne lekcje o kleszczach (15 i 45 minut) dla techników leśnych: gry, mapa, symulator i stacje zadaniowe." },
      { property: "og:title", content: "Strefa Nauczyciela – Uwaga Kleszcz!" },
      { property: "og:description", content: "Interaktywne lekcje „Gotowi do lasu!” i „Leśni detektywi” prowadzone w całości na stronie." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TeacherZone,
});

const t = (arr: [number, number][], i: number) => arr[i]!;

const lessonA: Stage[] = [
  {
    title: "Start misji", time: t(LESSON_A_TIMES, 0),
    instruction: "Odczytaj misję. Poproś uczniów, by na ilustracji wskazali miejsca, gdzie można spotkać kleszcze.",
    script: "Jesteście zespołem młodych leśników. Za chwilę rozpoczynacie praktyki. Waszym zadaniem jest przygotować się do pracy w terenie i ograniczyć ryzyko kontaktu z kleszczami. Gdzie podczas praktyk można spotkać kleszcze?",
    key: "Las i ściółka, zarośla/podszyt, wysoka trawa, obrzeża ścieżek. Nie: korony drzew, utwardzony parking.",
    render: (c) => (<><p className="mb-3 rounded-lg bg-secondary p-4">Jesteście zespołem młodych leśników. Za chwilę rozpoczynacie praktyki. Waszym zadaniem jest przygotować się do pracy w terenie i ograniczyć ryzyko kontaktu z kleszczami.</p><p className="mb-2 font-semibold">Gdzie podczas praktyk można spotkać kleszcze?</p><ForestScene checked={c.checked} /></>),
  },
  {
    title: "Prawda czy mit?", time: t(LESSON_A_TIMES, 1), sources: [SRC.gisB, SRC.gisK, SRC.who],
    instruction: "Uczniowie głosują (ręką lub na tablicy) przy każdej karcie. Po wyborze omów uzasadnienie.",
    script: "Sprawdźmy, co wiecie o kleszczach. Przy każdej karcie zdecydujcie: prawda czy mit?",
    key: "1 PRAWDA, 2 MIT, 3 MIT (szczepionka tylko na KZM), 4 PRAWDA.",
    render: (c) => <TruthMyth checked={c.checked} />,
  },
  {
    title: "Symulator odzieży", time: t(LESSON_A_TIMES, 2), sources: [SRC.who, SRC.gisB],
    instruction: "Uczeń przy tablicy wybiera elementy stroju, klasa doradza. Kliknij „Sprawdź mój strój” i omów zalety i wady.",
    script: "Ubierzmy ucznia technikum leśnego na praktyki. Które wybory zmniejszają ryzyko kontaktu z kleszczem?",
    key: "Długi rękaw, długie spodnie, pełne buty, nogawki zabezpieczone przy kostkach, repelent zgodnie z etykietą. Strój nie daje pełnej ochrony – nie podajemy procentów.",
    render: () => <ClothingSim />,
  },
  {
    title: "Jak usunąć kleszcza?", time: t(LESSON_A_TIMES, 3), sources: [SRC.gisB, SRC.who],
    instruction: "Uczniowie ułożą kroki w kolejności. Następnie odkryj karty „Czego nie robić?”. Nie ćwiczymy na skórze ucznia.",
    script: "Znaleźliście wkłutego kleszcza. Ułóżcie czynności w prawidłowej kolejności.",
    key: "1. Chwyć pęsetą blisko skóry. 2. Wyciągnij równomiernym ruchem. 3. Oczyść skórę i umyj ręce.\nNie: tłuszcz, przypalanie, ściskanie odwłoka.",
    render: (c) => <RemovalOrder checked={c.checked} />,
  },
  {
    title: "Bilet wyjścia", time: t(LESSON_A_TIMES, 4),
    instruction: "Uczniowie dokańczają trzy zdania (ustnie lub na tablicy). Po zatwierdzeniu pokaż wzory. „Wyczyść formularz” przygotowuje lekcję od nowa.",
    script: "Na koniec dokończcie trzy zdania – to Wasz plan na najbliższe praktyki.",
    key: "Wzorcowe odpowiedzi pojawiają się po kliknięciu „Zatwierdź”.",
    render: () => <ExitTicket />,
  },
];

function TeamsSetup({ teams, setTeams }: { teams: string[]; setTeams: (t: string[]) => void }) {
  return (
    <div>
      <p className="rounded-lg bg-secondary p-4">Zespoły przygotowują procedurę bezpiecznych praktyk leśnych. Na pięciu stacjach zdobywacie punkty – maksymalnie {TOTAL_MAX}, zaliczenie od {PASS_POINTS} pkt.</p>
      <label className="mt-4 block text-sm font-medium">Liczba zespołów
        <select value={teams.length} onChange={(e) => { const n = Number(e.target.value); setTeams(Array.from({ length: n }, (_, i) => teams[i] ?? `Zespół ${i + 1}`)); }} className="ml-2 rounded-md border bg-background px-2 py-1">
          {[2, 3, 4, 5, 6].map((n) => <option key={n}>{n}</option>)}
        </select>
      </label>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {teams.map((n, i) => <input key={i} value={n} onChange={(e) => setTeams(teams.map((x, j) => (j === i ? e.target.value : x)))} className="rounded-md border bg-background px-2 py-1" aria-label={`Nazwa zespołu ${i + 1}`} />)}
      </div>
    </div>
  );
}

const lessonB: Stage[] = [
  {
    title: "Odprawa", time: t(LESSON_B_TIMES, 0),
    instruction: "Ustal liczbę zespołów i ich nazwy. Przedstaw cel misji i zasady punktacji.",
    script: "Witajcie, leśni detektywi! Waszym zadaniem jest opracowanie procedury bezpiecznych praktyk. Na każdej stacji zdobywacie punkty.",
    key: "Punktacja: 6 + 8 + 8 + 9 + 5 = 36 pkt. Zaliczenie od 26 pkt (ok. 70%).",
    render: (c) => <TeamsSetup teams={c.teams} setTeams={c.setTeams} />,
  },
  {
    title: "Stacja 1 – Tropem kleszcza", time: t(LESSON_B_TIMES, 1), station: 0, sources: [SRC.who, SRC.gisB],
    instruction: "Zespoły wskazują miejsca kontaktu z kleszczem, a potem rozwiązują 6 decyzji (1 pkt każda).",
    script: "Przed Wami wilgotny las mieszany. Gdzie czeka kleszcz? Jak się zachowacie w sześciu sytuacjach?",
    key: "Miejsca: las, zarośla, obrzeża ścieżki, wysoka trawa.\nDecyzje: 1 środek ścieżki, 2 repelent, 3 nogawki w skarpety, 4 pień/ławka, 5 całe ciało, 6 pęseta.",
    render: (c) => <ForestDecisions checked={c.checked} onScore={c.onScore} />,
  },
  {
    title: "Stacja 2 – Mapa zagrożeń", time: t(LESSON_B_TIMES, 2), station: 1, sources: [SRC.pzh, SRC.ecdc],
    instruction: "Zespoły odczytują dane z mapy i odpowiadają na 4 pytania. Przyznaj 0–2 pkt za każdą odpowiedź ręcznie.",
    script: "Mapa pokazuje zachorowania na boreliozę w 2024 roku. Uwaga: to nie jest mapa liczby kleszczy!",
    key: "1 Nie – to zachorowania ludzi. 2 Zapadalność uwzględnia liczbę mieszkańców. 3 Nie – kleszcze są w całej Polsce. 4 Czas w lesie, praca, profilaktyka, diagnostyka, zgłaszanie, pogoda, żywiciele.",
    render: (c) => <MapStation checked={c.checked} />,
  },
  {
    title: "Stacja 3 – Szafa leśnika", time: t(LESSON_B_TIMES, 3), station: 2, sources: [SRC.who],
    instruction: "Zespół zaznacza elementy odpowiednie na praktyki. Ocenianych jest wszystkie 8 decyzji (1 pkt każda).",
    script: "Spakujcie się na praktyki. Co zabieracie, a co zostaje w domu?",
    key: "Tak: długie spodnie, pełne buty, bluza z długimi rękawami, repelent, pęseta.\nNie: sandały, koszulka bez rękawów, krótkie spodenki.",
    render: (c) => <Wardrobe checked={c.checked} onScore={c.onScore} />,
  },
  {
    title: "Stacja 4 – Medyczne zagadki", time: t(LESSON_B_TIMES, 4), station: 3, sources: [SRC.gisB, SRC.gisK, SRC.idsa],
    instruction: "Trzy historie, po 3 stwierdzenia (1 pkt każde). Podkreśl: nie mylimy boreliozy z KZM, nie leczymy się sami.",
    script: "Jesteście medycznymi detektywami. Oceńcie, które postępowanie jest właściwe.",
    key: "A: Tak, Nie, Tak (bez rutynowych przeciwciał bez objawów).\nB: Tak, Nie, Nie (rumień nie musi być tarczą; antybiotyk tylko od lekarza).\nC: Tak, Nie, Tak (pilna pomoc).",
    render: (c) => <MedicalCases checked={c.checked} onScore={c.onScore} />,
  },
  {
    title: "Stacja 5 – Kodeks młodego leśnika", time: t(LESSON_B_TIMES, 5), station: 4,
    instruction: "Zespoły układają 5 zasad z kart lub wpisują własne. Oceń 0–5 pkt ręcznie. Kodeks zostaw na ekranie.",
    script: "Stwórzcie kodeks: pięć zasad, które każdy leśnik powinien znać na pamięć.",
    key: "Ubiór, repelent wg etykiety, sprawdzanie skóry, szybkie usuwanie kleszcza, reagowanie na objawy. Karty fałszywe: masło, „KZM chroni przed wszystkim”, „jeśli nie swędzi…”.",
    render: (c) => <CodeBuilder checked={c.checked} />,
  },
  {
    title: "Finał", time: t(LESSON_B_TIMES, 6),
    instruction: "Pokaż wyniki zespołów i omów najczęstsze błędy. Na koniec każdy uczeń odpowiada na pytanie końcowe.",
    script: "Zobaczmy wyniki! A teraz każdy z Was: jaką jedną zasadę zastosujesz podczas najbliższych praktyk?",
    key: `Zaliczenie od ${PASS_POINTS}/${TOTAL_MAX} pkt.`,
    render: () => (
      <div className="space-y-4">
        <div className="rounded-xl border bg-card p-4"><p className="font-semibold">Najczęstsze błędy</p><ul className="mt-2 list-disc pl-5 text-sm">{commonErrors.map((e) => <li key={e}>{e}</li>)}</ul></div>
        <p className="rounded-xl bg-secondary p-5 text-xl" style={{ fontFamily: "var(--font-display)" }}>Jaką jedną zasadę zastosuję podczas najbliższych praktyk?</p>
      </div>
    ),
  },
];

const lessons = [
  { id: "a" as const, name: "GOTOWI DO LASU!", min: lessonMinutes(LESSON_A_TIMES), stages: lessonA, goals: ["rozpoznać miejsca występowania kleszczy", "odróżnić fakty od mitów", "dobrać strój na praktyki", "poznać prawidłowe usuwanie kleszcza"] },
  { id: "b" as const, name: "LEŚNI DETEKTYWI – OPERACJA BEZPIECZNY LAS", min: lessonMinutes(LESSON_B_TIMES), stages: lessonB, goals: ["analizować dane epidemiologiczne", "planować ochronę w terenie", "reagować na objawy po ukłuciu", "współpracować w zespole"] },
];

let unlockedThisVisit = false;

function TeacherGate({ onOk }: { onOk: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setErr("");
    try {
      const r = await checkTeacherPassword({ data: { password: pw } });
      if (r.ok) {
        unlockedThisVisit = true;
        onOk();
      } else {
        setErr((r as any).message || "Nieprawidłowy kod. Spróbuj ponownie.");
      }
    } catch {
      setErr("Nie udało się sprawdzić kodu. Spróbuj ponownie.");
    }
    setBusy(false);
  };
  return (
    <main className="mx-auto max-w-md px-6 py-20">
      <h1 className="text-3xl font-semibold">Strefa Nauczyciela</h1>
      <p className="mt-2 text-muted-foreground">Ta część jest dostępna tylko dla nauczycieli. Wpisz kod dostępu.</p>
      <form onSubmit={submit} className="mt-6 space-y-3">
        <label className="block text-sm font-medium">Kod nauczyciela
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="off" className="mt-1 w-full rounded-md border bg-background px-3 py-2" />
        </label>
        {err && <p className="text-sm text-destructive" role="alert">{err}</p>}
        <button disabled={busy || !pw} className={btnPrimary}>{busy ? "Sprawdzam…" : "Wejdź"}</button>
      </form>
    </main>
  );
}

function TeacherZone() {
  const [unlocked, setUnlocked] = useState(unlockedThisVisit);
  if (!unlocked) return <TeacherGate onOk={() => setUnlocked(true)} />;
  return <TeacherContent />;
}

function TeacherContent() {
  const [active, setActive] = useState<"a" | "b" | null>(null);
  const cur = lessons.find((l) => l.id === active);
  if (cur) return <LessonRunner title={cur.name} stages={cur.stages} teamsMode={cur.id === "b"} onExit={() => setActive(null)} />;
  return (
    <main>
      <section className="bg-forest text-forest-foreground">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-accent">Zauważ ryzyko, zanim kleszcz zauważy Ciebie</p>
          <h1 className="text-4xl font-semibold md:text-5xl">STREFA NAUCZYCIELA – UCZ PRZEZ DZIAŁANIE</h1>
          <p className="mt-4 max-w-3xl text-lg opacity-90">Dwie gotowe lekcje, interaktywne wyzwania i praktyczne zadania dla przyszłych leśników.</p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-6 md:grid-cols-2">
          {lessons.map((l) => (
            <article key={l.id} className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">{l.min} minut</span>
                <span className="text-sm text-muted-foreground">{l.stages.length} etapów · {l.stages.length} aktywności</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold">„{l.name}”</h2>
              <p className="mt-3 text-sm font-medium">Cele edukacyjne – uczeń potrafi:</p>
              <ul className="mt-1 list-disc pl-5 text-sm text-muted-foreground">{l.goals.map((g) => <li key={g}>{g}</li>)}</ul>
              <p className="mt-3 text-sm font-medium">Etapy:</p>
              <ol className="mt-1 space-y-0.5 text-sm text-muted-foreground">{l.stages.map((s) => <li key={s.title}>{s.time[0]}–{s.time[1]} min · {s.title}</li>)}</ol>
              <button className={`${btnPrimary} mt-6 self-start px-6 py-3 text-base`} onClick={() => { setActive(l.id); window.scrollTo(0, 0); }}>Rozpocznij lekcję</button>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Notice>Materiały służą edukacji i nie zastępują konsultacji medycznej. Nie stosuj samodzielnie antybiotyków – leczenie zleca lekarz.</Notice>
          <Notice>Odpowiedzi i punkty są przechowywane tylko w otwartej karcie przeglądarki – strona nie zbiera danych osobowych, a po odświeżeniu wszystko znika. Minutnik nie przełącza etapów sam – przebieg lekcji kontroluje nauczyciel.</Notice>
        </div>


        <section id="podstawa-naukowa" className="mt-12 rounded-xl border bg-card p-6">
          <h2 className="text-2xl font-semibold">Podstawa naukowa i aktualizacja</h2>
          <p className="mt-2 text-sm text-muted-foreground">Treści medyczne przygotowano zgodnie z zasadami EBM i aktualnymi zaleceniami. Dane epidemiologiczne: zachorowania na boreliozę w 2024 r. (NIZP PZH–PIB / GIS). Borelioza (bakteria) i KZM (wirus) to różne choroby – szczepionka chroni tylko przed KZM.</p>
          <ul className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
            {Object.values(SRC).map((s) => <li key={s.url}><a className="underline" href={s.url} target="_blank" rel="noreferrer">{s.label}</a></li>)}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">Materiały można bezpłatnie wykorzystywać do celów edukacyjnych i niekomercyjnych, z zachowaniem oznaczeń autorstwa i źródeł.</p>
        </section>
      </div>
    </main>
  );
}
