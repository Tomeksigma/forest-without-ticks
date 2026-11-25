import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  checkAdminPassword,
  getSiteTexts,
  saveSiteText,
  getModulesData,
  saveModule,
  saveLesson,
  deleteLesson,
  saveQuizQuestion,
  deleteQuizQuestion,
  getFactsData,
  saveFact,
  deleteFact,
  getSimulatorData,
  saveSimulatorScenario,
  deleteSimulatorScenario,
  uploadImageToStorage,
  listStorageImages,
  getGalleryPhotos,
  saveGalleryPhoto,
  deleteGalleryPhoto,
  type DbModule,
  type StorageImageItem,
} from "@/lib/admin.functions";
import defaultHero from "@/assets/las-hero.jpg";
import { moduleImages } from "@/lib/images";
import { MarkdownView } from "@/components/markdown-view";
import defaultOlivia from "@/content/olivia.txt?raw";
import defaultKonkurs from "@/content/konkurs.txt?raw";
import defaultKlauzula from "@/content/klauzula-rodo.txt?raw";
import defaultPolityka from "@/content/polityka.txt?raw";
import defaultRegulamin from "@/content/regulamin.txt?raw";
import defaultStandardy from "@/content/standardy-ochrony.txt?raw";

export const Route = createFileRoute("/admin")({
  loader: async () => {
    try {
      const [textsRes, modsRes, factsRes, simRes, galleryRes] = await Promise.all([
        getSiteTexts(),
        getModulesData(),
        getFactsData(),
        getSimulatorData(),
        getGalleryPhotos(),
      ]);

      return {
        texts: textsRes.texts || {},
        modules: modsRes.modules || [],
        facts: factsRes.facts || [],
        miniQuiz: factsRes.miniQuiz || [],
        scenarios: simRes.scenarios || [],
        photos: galleryRes.photos || [],
      };
    } catch (e) {
      console.error("[Admin loader error]", e);
      return {
        texts: {},
        modules: [],
        facts: [],
        miniQuiz: [],
        scenarios: [],
        photos: [],
      };
    }
  },
  head: () => ({
    meta: [
      { title: "Panel Administratora – Uwaga Kleszcz!" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const data = Route.useLoaderData();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [authPassword, setAuthPassword] = useState<string | null>(null);
  const [authError, setAuthError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "texts" | "modules" | "quizzes" | "facts" | "simulator" | "gallery" | "upload"
  >("texts");

  const [statusMsg, setStatusMsg] = useState<{ text: string; ok: boolean } | null>(null);

  // Check stored password in sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem("admin_pw");
    if (saved) {
      setAuthPassword(saved);
    }
  }, []);

  const showStatus = (text: string, ok: boolean = true) => {
    setStatusMsg({ text, ok });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckingAuth(true);
    setAuthError("");
    try {
      const res = await checkAdminPassword({ data: { password } });
      if (res.ok) {
        setAuthPassword(password);
        sessionStorage.setItem("admin_pw", password);
      } else {
        setAuthError((res as any).message || "Nieprawidłowe hasło administratora.");
      }
    } catch {
      setAuthError("Błąd weryfikacji hasła.");
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_pw");
    setAuthPassword(null);
    setPassword("");
  };

  if (!authPassword) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-lg">
          <div className="text-center">
            <span className="inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
              Zarządzanie treścią
            </span>
            <h1 className="mt-3 text-3xl font-semibold text-foreground">Panel Administratora</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Podaj hasło administratora, aby edytować treści, zdjęcia i pytania.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground">Hasło</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Wpisz hasło..."
                className="mt-1 w-full rounded-lg border bg-background px-4 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {authError && (
              <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{authError}</p>
            )}

            <button
              type="submit"
              disabled={checkingAuth || !password}
              className="w-full rounded-lg bg-primary py-3 font-medium text-primary-foreground transition hover:opacity-95 disabled:opacity-50"
            >
              {checkingAuth ? "Sprawdzanie..." : "Zaloguj się"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:underline">
              ← Wróć do strony głównej
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">CMS</span>
          <h1 className="text-3xl font-bold text-foreground">Panel Administratora</h1>
          <p className="text-sm text-muted-foreground">
            Wszystkie zmiany są zapisywane w bazie i widoczne natychmiast po odświeżeniu strony.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.invalidate()}
            className="rounded-lg border px-3 py-1.5 text-sm hover:bg-muted"
            title="Przeładuj dane z bazy"
          >
            ↻ Odśwież dane
          </button>
          <Link to="/" className="rounded-lg border px-3 py-1.5 text-sm hover:bg-muted">
            Zobacz stronę →
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/20"
          >
            Wyloguj
          </button>
        </div>
      </div>

      {/* Status banner */}
      {statusMsg && (
        <div
          className={`mt-4 rounded-xl p-4 text-sm font-medium shadow-sm transition-all ${
            statusMsg.ok ? "bg-success/15 text-success border border-success/30" : "bg-destructive/15 text-destructive border border-destructive/30"
          }`}
        >
          {statusMsg.ok ? "✓ " : "⚠️ "}
          {statusMsg.text}
        </div>
      )}

      {/* Tabs navigation */}
      <div className="mt-6 flex flex-wrap gap-2 border-b pb-3">
        {[
          { id: "texts", label: "Teksty strony" },
          { id: "modules", label: "Moduły i Lekcje" },
          { id: "quizzes", label: "Quizy i Pytania" },
          { id: "facts", label: "Ciekawostki (12 kart)" },
          { id: "simulator", label: "Symulator" },
          { id: "gallery", label: "Galeria prac" },
          { id: "upload", label: "Zdjęcia i Magazyn" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === t.id
                ? "bg-primary text-primary-foreground shadow"
                : "bg-card hover:bg-muted text-foreground border"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="mt-8">
        {activeTab === "texts" && (
          <TextsEditor
            texts={data.texts}
            adminPassword={authPassword}
            onSaved={(msg) => {
              showStatus(msg);
              router.invalidate();
            }}
          />
        )}

        {activeTab === "modules" && (
          <ModulesEditor
            modules={data.modules}
            texts={data.texts}
            adminPassword={authPassword}
            onSaved={(msg) => {
              showStatus(msg);
              router.invalidate();
            }}
          />
        )}

        {activeTab === "quizzes" && (
          <QuizzesEditor
            modules={data.modules}
            miniQuiz={data.miniQuiz}
            adminPassword={authPassword}
            onSaved={(msg) => {
              showStatus(msg);
              router.invalidate();
            }}
          />
        )}

        {activeTab === "facts" && (
          <FactsEditor
            facts={data.facts}
            adminPassword={authPassword}
            onSaved={(msg) => {
              showStatus(msg);
              router.invalidate();
            }}
          />
        )}

        {activeTab === "simulator" && (
          <SimulatorEditor
            scenarios={data.scenarios}
            adminPassword={authPassword}
            onSaved={(msg) => {
              showStatus(msg);
              router.invalidate();
            }}
          />
        )}

        {activeTab === "gallery" && (
          <GalleryEditor
            photos={data.photos}
            adminPassword={authPassword}
            onSaved={(msg) => {
              showStatus(msg);
              router.invalidate();
            }}
          />
        )}

        {activeTab === "upload" && (
          <StorageUploader
            texts={data.texts}
            adminPassword={authPassword}
            onSaved={(msg) => {
              showStatus(msg);
              router.invalidate();
            }}
          />
        )}
      </div>
    </main>
  );
}

/* ──────────────────────────────────────────────────────────────
   TAB 1: SITE TEXTS EDITOR
   ────────────────────────────────────────────────────────────── */
function TextsEditor({
  texts,
  adminPassword,
  onSaved,
}: {
  texts: Record<string, string>;
  adminPassword: string;
  onSaved: (msg: string) => void;
}) {
  const fields = [
    { key: "homepage.hero_kicker", label: "Strona główna: Mały nagłówek baneru (kicker)", defaultVal: "Projekt edukacyjny" },
    { key: "homepage.hero_title", label: "Strona główna: Główny tytuł baneru", defaultVal: "Zauważ ryzyko, zanim kleszcz zauważy Ciebie" },
    { key: "homepage.hero_subtitle", label: "Strona główna: Podtytuł baneru", defaultVal: "Nie odkładaj – Działaj!" },
    { key: "homepage.olivia", label: "Strona główna: Treść sekcji „O projekcie” (akapit po akapicie)", multiline: true, rows: 8, defaultVal: defaultOlivia },
    { key: "konkurs.text", label: "Strona Konkursu: Pełny tekst regulaminu konkursu", multiline: true, rows: 12, defaultVal: defaultKonkurs },
    { key: "klauzula_rodo.text", label: "Strona Konkursu: Klauzula informacyjna RODO", multiline: true, rows: 10, defaultVal: defaultKlauzula },
    { key: "polityka.text", label: "Polityka prywatności serwisu", multiline: true, rows: 12, defaultVal: defaultPolityka },
    { key: "regulamin.text", label: "Regulamin serwisu", multiline: true, rows: 12, defaultVal: defaultRegulamin },
    { key: "standardy_ochrony.text", label: "Standardy Ochrony Małoletnich", multiline: true, rows: 10, defaultVal: defaultStandardy },
    // --- Linki do pobierania (Konkurs) ---
    { key: "konkurs.doc_url", label: "Konkurs – URL: Regulamin Konkursu", defaultVal: "" },
    { key: "konkurs.adult_form_url", label: "Konkurs – URL: Formularz pełnoletni", defaultVal: "" },
    { key: "konkurs.minor_form_url", label: "Konkurs – URL: Formularz niepełnoletni", defaultVal: "" },
    { key: "konkurs.privacy_clause_url", label: "Konkurs – URL: Klauzula RODO", defaultVal: "" },
    { key: "konkurs.child_protection_url", label: "Konkurs – URL: Standardy Ochrony", defaultVal: "" },
      { key: "polityka.doc_url", label: "Polityka prywatności – URL: Plik PDF", defaultVal: "" },
      { key: "regulamin.doc_url", label: "Regulamin serwisu – URL: Plik PDF", defaultVal: "" },
    // --- Pytania odblokowujące moduły ---
    { key: "unlock.module1.word", label: "Pyt. obl. Moduł I – słowo kluczowe (np. borelioza)", defaultVal: "borelioza" },
    { key: "unlock.module1.stem", label: "Pyt. obl. Moduł I – rdzeń słowa (np. borelioz)", defaultVal: "borelioz" },
    { key: "unlock.module2.word", label: "Pyt. obl. Moduł II – słowo kluczowe (np. repelent)", defaultVal: "repelent" },
    { key: "unlock.module2.stem", label: "Pyt. obl. Moduł II – rdzeń słowa (np. repelent)", defaultVal: "repelent" },
    { key: "unlock.module3.word", label: "Pyt. obl. Moduł III – słowo kluczowe (np. antybiotyk)", defaultVal: "antybiotyk" },
    { key: "unlock.module3.stem", label: "Pyt. obl. Moduł III – rdzeń słowa (np. antybiotyk)", defaultVal: "antybiotyk" },
  ];

  const [values, setValues] = useState<Record<string, string>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);

  useEffect(() => {
    const init: Record<string, string> = {};
    for (const f of fields) {
      init[f.key] = texts[f.key] ?? f.defaultVal ?? "";
    }
    setValues(init);
  }, [texts]);

  const handleSave = async (key: string) => {
    setSavingKey(key);
    try {
      await saveSiteText({
        data: {
          key,
          value: values[key] ?? "",
          adminPassword,
        },
      });
      onSaved(`Zapisano tekst: ${key}`);
    } catch (e: any) {
      alert("Błąd zapisu: " + e.message);
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Teksty serwisu</h2>
        <p className="text-sm text-muted-foreground">
          Edytuj hasła baneru, opisy i pełne teksty dokumentów. Kliknij „Zapisz” pod wybranym polem.
        </p>
      </div>

      <div className="grid gap-6">
        {fields.map((f) => (
          <div key={f.key} className="rounded-xl border bg-card p-5 shadow-sm">
            <label className="block font-semibold text-foreground">{f.label}</label>
            <span className="text-xs font-mono text-muted-foreground">Klucz: {f.key}</span>

            {f.multiline ? (
              <textarea
                rows={f.rows ?? 5}
                value={values[f.key] ?? ""}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                className="mt-2 w-full rounded-lg border bg-background p-3 text-sm font-sans leading-relaxed focus:border-primary focus:outline-none"
              />
            ) : (
              <input
                type="text"
                value={values[f.key] ?? ""}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                className="mt-2 w-full rounded-lg border bg-background p-2.5 text-sm focus:border-primary focus:outline-none"
              />
            )}

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                disabled={savingKey === f.key}
                onClick={() => handleSave(f.key)}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
              >
                {savingKey === f.key ? "Zapisywanie..." : "Zapisz to pole"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TAB 2: MODULES & LESSONS (MARKDOWN) EDITOR
   ────────────────────────────────────────────────────────────── */
function ModulesEditor({
  modules,
  texts,
  adminPassword,
  onSaved,
}: {
  modules: DbModule[];
  texts?: Record<string, string>;
  adminPassword: string;
  onSaved: (msg: string) => void;
}) {
  const [selectedModIndex, setSelectedModIndex] = useState(0);
  const curMod = modules[selectedModIndex];

  // Module edit state
  const [modTitle, setModTitle] = useState("");
  const [modLead, setModLead] = useState("");
  const [savingMod, setSavingMod] = useState(false);

  // Unlock question state
  const defaultWords: Record<number, { word: string; stem: string }> = {
    1: { word: "borelioza", stem: "borelioz" },
    2: { word: "repelent", stem: "repelent" },
    3: { word: "antybiotyk", stem: "antybiotyk" },
  };
  const [unlockWord, setUnlockWord] = useState("");
  const [unlockStem, setUnlockStem] = useState("");
  const [savingUnlock, setSavingUnlock] = useState(false);

  // Lesson edit state
  const [selectedLessonId, setSelectedLessonId] = useState<number | "new">(-1);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonMd, setLessonMd] = useState("");
  const [lessonSort, setLessonSort] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);
  const [savingLesson, setSavingLesson] = useState(false);

  useEffect(() => {
    if (curMod) {
      setModTitle(curMod.title);
      setModLead(curMod.lead);
      const modNum = curMod.n || (selectedModIndex + 1);
      const def = defaultWords[modNum] || { word: "kleszcz", stem: "kleszcz" };
      setUnlockWord(texts?.[`unlock.module${modNum}.word`] || def.word);
      setUnlockStem(texts?.[`unlock.module${modNum}.stem`] || def.stem);
      if (curMod.lessons.length > 0) {
        const first = curMod.lessons[0]!;
        setSelectedLessonId(first.id);
        setLessonTitle(first.title);
        setLessonMd(first.content_md);
        setLessonSort(first.sort_order);
      } else {
        setSelectedLessonId("new");
        setLessonTitle("");
        setLessonMd("");
        setLessonSort(1);
      }
    }
  }, [curMod]);

  const selectLesson = (l: DbModule["lessons"][0]) => {
    setSelectedLessonId(l.id);
    setLessonTitle(l.title);
    setLessonMd(l.content_md);
    setLessonSort(l.sort_order);
    setPreviewMode(false);
  };

  const startNewLesson = () => {
    setSelectedLessonId("new");
    setLessonTitle("");
    setLessonMd("### Nowa sekcja\n\nTreść lekcji w formacie Markdown...\n\n- Punkt 1\n- Punkt 2\n\n> **Ważne:** Zwróć na to uwagę!");
    setLessonSort((curMod?.lessons.length ?? 0) + 1);
    setPreviewMode(false);
  };

  const handleSaveModule = async () => {
    if (!curMod) return;
    setSavingMod(true);
    try {
      await saveModule({
        data: {
          id: curMod.id,
          title: modTitle,
          lead: modLead,
          adminPassword,
        },
      });
      onSaved(`Zaktualizowano dane Modułu ${curMod.roman}`);
    } catch (e: any) {
      alert("Błąd: " + e.message);
    } finally {
      setSavingMod(false);
    }
  };

  const handleSaveUnlockQuestion = async () => {
    if (!curMod) return;
    const modNum = curMod.n || (selectedModIndex + 1);
    setSavingUnlock(true);
    try {
      await Promise.all([
        saveSiteText({
          data: {
            key: `unlock.module${modNum}.word`,
            value: unlockWord.trim(),
            adminPassword,
          },
        }),
        saveSiteText({
          data: {
            key: `unlock.module${modNum}.stem`,
            value: unlockStem.trim(),
            adminPassword,
          },
        }),
      ]);
      onSaved(`Zapisano pytanie odblokowujące dla Modułu ${curMod.roman}`);
    } catch (e: any) {
      alert("Błąd: " + e.message);
    } finally {
      setSavingUnlock(false);
    }
  };

  const handleSaveLesson = async () => {
    if (!curMod) return;
    setSavingLesson(true);
    try {
      await saveLesson({
        data: {
          moduleId: curMod.id,
          title: lessonTitle,
          content_md: lessonMd,
          sort_order: lessonSort,
          adminPassword,
          id: selectedLessonId !== "new" ? (selectedLessonId as number) : undefined,
        },
      });
      onSaved(`Zapisano lekcję: ${lessonTitle}`);
    } catch (e: any) {
      alert("Błąd: " + e.message);
    } finally {
      setSavingLesson(false);
    }
  };

  const handleDeleteLesson = async () => {
    if (selectedLessonId === "new") return;
    if (!confirm("Czy na pewno usunąć tę lekcję?")) return;
    try {
      await deleteLesson({
        data: {
          id: selectedLessonId,
          adminPassword,
        },
      });
      onSaved("Usunięto lekcję");
    } catch (e: any) {
      alert("Błąd: " + e.message);
    }
  };

  if (!curMod) {
    return <p className="text-muted-foreground">Brak modułów w bazie danych.</p>;
  }

  return (
    <div className="space-y-8">
      {/* Module selector */}
      <div className="flex gap-3 border-b pb-4">
        {modules.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => setSelectedModIndex(idx)}
            className={`rounded-lg px-4 py-2.5 font-semibold text-sm transition ${
              selectedModIndex === idx
                ? "bg-forest text-forest-foreground shadow"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Moduł {m.roman}: {m.title}
          </button>
        ))}
      </div>

      {/* Module Meta */}
      <div className="rounded-xl border bg-card p-5">
        <h3 className="text-lg font-semibold">Nagłówek Modułu {curMod.roman}</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-muted-foreground">Tytuł modułu</label>
            <input
              type="text"
              value={modTitle}
              onChange={(e) => setModTitle(e.target.value)}
              className="mt-1 w-full rounded-md border bg-background p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground">Podtytuł / Lead</label>
            <input
              type="text"
              value={modLead}
              onChange={(e) => setModLead(e.target.value)}
              className="mt-1 w-full rounded-md border bg-background p-2 text-sm"
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <button
            onClick={handleSaveModule}
            disabled={savingMod}
            className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
          >
            {savingMod ? "Zapisywanie..." : "Zapisz nagłówek modułu"}
          </button>
        </div>
      </div>

      {/* Pytanie odblokowujące (bramka na końcu modułu) */}
      <div className="rounded-xl border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-semibold">Pytanie odblokowujące (bramka na końcu Modułu {curMod.roman})</h3>
          <span className="text-xs text-muted-foreground">Uczeń musi podliczyć wystąpienia tego słowa w module</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Zmieniając słowo kluczowe i rdzeń, system automatycznie przelicza prawidłową liczbę wystąpień w lekcjach i generuje odpowiedzi w quizie bramkowym.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-foreground">Słowo kluczowe (wyświetlane w pytaniu)</label>
            <input
              type="text"
              value={unlockWord}
              onChange={(e) => setUnlockWord(e.target.value)}
              placeholder="np. borelioza"
              className="mt-1 w-full rounded-md border bg-background p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground">Rdzeń słowa do zliczania w tekście</label>
            <input
              type="text"
              value={unlockStem}
              onChange={(e) => setUnlockStem(e.target.value)}
              placeholder="np. borelioz (zlicza: borelioza, boreliozy, boreliozą)"
              className="mt-1 w-full rounded-md border bg-background p-2 text-sm"
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <button
            onClick={handleSaveUnlockQuestion}
            disabled={savingUnlock || !unlockWord.trim() || !unlockStem.trim()}
            className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {savingUnlock ? "Zapisywanie..." : "Zapisz pytanie odblokowujące"}
          </button>
        </div>
      </div>

      {/* Lessons split view */}
      <div className="grid gap-6 md:grid-cols-[260px_1fr]">
        {/* Left: lesson list */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Lekcje modułu ({curMod.lessons.length})</h4>
            <button
              onClick={startNewLesson}
              className="rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground hover:opacity-90"
            >
              + Nowa lekcja
            </button>
          </div>

          <div className="space-y-1">
            {curMod.lessons.map((l, i) => (
              <button
                key={l.id}
                onClick={() => selectLesson(l)}
                className={`w-full text-left rounded-lg p-3 text-sm transition ${
                  selectedLessonId === l.id
                    ? "bg-primary text-primary-foreground font-medium shadow-sm"
                    : "bg-card border hover:bg-muted"
                }`}
              >
                <div className="opacity-70 text-xs">Lekcja {i + 1}</div>
                <div className="line-clamp-2">{l.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Markdown Editor */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                {selectedLessonId === "new" ? "Tworzenie nowej lekcji" : "Edycja lekcji"}
              </span>
              <h3 className="text-xl font-bold">{lessonTitle || "Bez tytułu"}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted"
              >
                {previewMode ? "✏️ Tryb edycji Markdown" : "👁️ Podgląd sformatowany"}
              </button>
              {selectedLessonId !== "new" && (
                <button
                  type="button"
                  onClick={handleDeleteLesson}
                  className="rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20"
                >
                  Usuń lekcję
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div className="grid gap-3 sm:grid-cols-[1fr_100px]">
              <div>
                <label className="block text-xs font-medium text-muted-foreground">Tytuł lekcji</label>
                <input
                  type="text"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  placeholder="Wpisz tytuł lekcji..."
                  className="mt-1 w-full rounded-md border bg-background p-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground">Kolejność</label>
                <input
                  type="number"
                  value={lessonSort}
                  onChange={(e) => setLessonSort(parseInt(e.target.value) || 1)}
                  className="mt-1 w-full rounded-md border bg-background p-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="block text-xs font-medium text-muted-foreground">
                  Treść lekcji (Markdown): nagłówki (###), pogrubienia (**tekst**), linki ([tekst](url)), ramki (&gt;), listy (- ), tabele (|)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const linkUrl = prompt("Wklej adres URL (np. https://example.com lub link do pliku):", "https://");
                      if (linkUrl && linkUrl.trim()) {
                        const linkLabel = prompt("Wpisz tekst linku (np. Kliknij tutaj / Zobacz więcej):", "Kliknij tutaj") || "Link";
                        const mdLink = `[${linkLabel}](${linkUrl.trim()})`;
                        setLessonMd((prev) => prev ? `${prev} ${mdLink}` : mdLink);
                      }
                    }}
                    className="rounded border border-primary/40 bg-primary/10 px-2 py-1 text-xs font-semibold text-primary hover:bg-primary/20"
                  >
                    + Wstaw link [tekst](url)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const noteText = "> **Zapamiętaj**\n> Treść wyróżnionej wskazówki...";
                      setLessonMd((prev) => prev ? `${prev}\n\n${noteText}` : noteText);
                    }}
                    className="rounded border px-2 py-1 text-xs text-muted-foreground hover:bg-muted"
                  >
                    + Ramka wyróżnienia
                  </button>
                </div>
              </div>

              {previewMode ? (
                <div className="mt-2 min-h-[300px] rounded-lg border bg-background p-6 shadow-inner">
                  <MarkdownView content={lessonMd} />
                </div>
              ) : (
                <textarea
                  rows={16}
                  value={lessonMd}
                  onChange={(e) => setLessonMd(e.target.value)}
                  placeholder="Wpisz treść lekcji w formacie Markdown... Aby dodać link, wpisz: [Tekst do kliknięcia](https://adres-strony.pl) lub wklej bezpośrednio adres https://..."
                  className="mt-2 w-full rounded-lg border bg-background p-4 font-mono text-sm leading-relaxed focus:border-primary focus:outline-none"
                />
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                💡 <strong>Dodawanie linków:</strong> Użyj przycisku <strong>+ Wstaw link</strong>, wpisz <code className="bg-muted px-1 rounded">[Nazwa linku](https://adres.pl)</code> lub wklej bezpośrednio adres <code className="bg-muted px-1 rounded">https://...</code> — linki otworzą się w nowej karcie.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleSaveLesson}
                disabled={savingLesson || !lessonTitle.trim()}
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-40"
              >
                {savingLesson ? "Zapisywanie..." : "Zapisz lekcję"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TAB 3: QUIZZES & QUESTIONS EDITOR
   ────────────────────────────────────────────────────────────── */
function QuizzesEditor({
  modules,
  miniQuiz,
  adminPassword,
  onSaved,
}: {
  modules: DbModule[];
  miniQuiz: any[];
  adminPassword: string;
  onSaved: (msg: string) => void;
}) {
  const [selectedScope, setSelectedScope] = useState<string>("module:1");
  const [savingId, setSavingId] = useState<number | null>(null);

  // Filter questions by scope
  let questions: { id: number; q: string; options: string[]; correct: number; sort_order: number }[] = [];
  if (selectedScope.startsWith("module:")) {
    const modNum = parseInt(selectedScope.replace("module:", ""));
    const m = modules.find((x) => x.n === modNum);
    questions = m?.quiz ?? [];
  }

  const [editList, setEditList] = useState(questions);

  useEffect(() => {
    setEditList(questions);
  }, [selectedScope, modules]);

  const handleUpdateField = (idx: number, field: string, val: any) => {
    const next = [...editList];
    next[idx] = { ...next[idx]!, [field]: val };
    setEditList(next);
  };

  const handleUpdateOption = (qIdx: number, optIdx: number, val: string) => {
    const next = [...editList];
    const opts = [...next[qIdx]!.options];
    opts[optIdx] = val;
    next[qIdx] = { ...next[qIdx]!, options: opts };
    setEditList(next);
  };

  const handleAddQuestion = () => {
    const next = [
      ...editList,
      {
        id: 0,
        q: "Nowe pytanie quizowe",
        options: ["Odpowiedź A", "Odpowiedź B", "Odpowiedź C", "Odpowiedź D"],
        correct: 0,
        sort_order: editList.length + 1,
      },
    ];
    setEditList(next);
  };

  const handleSaveQuestion = async (q: typeof editList[0]) => {
    setSavingId(q.id);
    try {
      await saveQuizQuestion({
        data: {
          scope: selectedScope,
          q: q.q,
          options: q.options,
          correct: q.correct,
          sort_order: q.sort_order,
          adminPassword,
          id: q.id !== 0 ? (q.id as number) : undefined,
        },
      });
      onSaved(`Zapisano pytanie: "${q.q}"`);
    } catch (e: any) {
      alert("Błąd: " + e.message);
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (id === 0) {
      setEditList(editList.filter((x) => x.id !== 0));
      return;
    }
    if (!confirm("Czy na pewno usunąć to pytanie?")) return;
    try {
      await deleteQuizQuestion({
        data: { id, adminPassword },
      });
      onSaved("Usunięto pytanie");
    } catch (e: any) {
      alert("Błąd: " + e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold">Quizy i pytania kontrolne</h2>
          <p className="text-sm text-muted-foreground">
            Wybierz moduł, aby edytować pytania quizu końcowego i modułowego.
          </p>
        </div>
        <button
          onClick={handleAddQuestion}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90"
        >
          + Dodaj nowe pytanie
        </button>
      </div>

      {/* Scope picker */}
      <div className="flex gap-2">
        {modules.map((m) => (
          <button
            key={m.n}
            onClick={() => setSelectedScope(`module:${m.n}`)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              selectedScope === `module:${m.n}`
                ? "bg-primary text-primary-foreground"
                : "border bg-card hover:bg-muted"
            }`}
          >
            Moduł {m.roman} ({m.quiz.length} pytań)
          </button>
        ))}
      </div>

      {/* Questions list */}
      <div className="space-y-6">
        {editList.map((q, idx) => (
          <div key={idx} className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between gap-2 border-b pb-3">
              <span className="font-semibold text-sm text-muted-foreground">Pytanie #{idx + 1}</span>
              <button
                type="button"
                onClick={() => handleDelete(q.id)}
                className="text-xs text-destructive hover:underline"
              >
                Usuń pytanie
              </button>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium text-muted-foreground">Treść pytania</label>
              <input
                type="text"
                value={q.q}
                onChange={(e) => handleUpdateField(idx, "q", e.target.value)}
                className="mt-1 w-full rounded-md border bg-background p-2.5 text-sm font-medium focus:border-primary focus:outline-none"
              />
            </div>

            <div className="mt-4 space-y-2">
              <label className="block text-xs font-medium text-muted-foreground">
                Opcje odpowiedzi (zaznacz kropką poprawną):
              </label>
              {q.options.map((opt, oIdx) => (
                <div key={oIdx} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name={`correct-${idx}`}
                    checked={q.correct === oIdx}
                    onChange={() => handleUpdateField(idx, "correct", oIdx)}
                    className="h-4 w-4 text-primary"
                    title="Ustaw jako poprawną odpowiedź"
                  />
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleUpdateOption(idx, oIdx, e.target.value)}
                    className={`flex-1 rounded-md border bg-background p-2 text-sm ${
                      q.correct === oIdx ? "border-success font-medium bg-success/5" : ""
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                disabled={savingId === q.id}
                onClick={() => handleSaveQuestion(q)}
                className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
              >
                {savingId === q.id ? "Zapisywanie..." : "Zapisz to pytanie"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TAB 4: FACTS (CIEKAWOSTKI) EDITOR
   ────────────────────────────────────────────────────────────── */
function FactsEditor({
  facts,
  adminPassword,
  onSaved,
}: {
  facts: any[];
  adminPassword: string;
  onSaved: (msg: string) => void;
}) {
  const [list, setList] = useState(facts);
  const [savingId, setSavingId] = useState<number | null>(null);

  useEffect(() => {
    setList(facts);
  }, [facts]);

  const handleUpdate = (idx: number, field: string, val: any) => {
    const next = [...list];
    next[idx] = { ...next[idx]!, [field]: val };
    setList(next);
  };

  const handleSave = async (f: any) => {
    setSavingId(f.id);
    try {
      await saveFact({
        data: {
          id: f.id,
          category: f.category,
          question: f.question,
          answer: f.answer,
          explanation: f.explanation,
          meaning: f.meaning,
          sourceName: f.source_name || f.sourceName || "",
          sourceUrl: f.source_url || f.sourceUrl || "",
          guess: f.guess,
          sort_order: f.sort_order || f.id,
          adminPassword,
        },
      });
      onSaved(`Zapisano ciekawostkę #${f.id}`);
    } catch (e: any) {
      alert("Błąd: " + e.message);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">12 Kart Ciekawostek Naukowych</h2>
        <p className="text-sm text-muted-foreground">
          Edytuj pytania, odpowiedzi, znaczenie dla leśnika oraz opcje zgadywanki.
        </p>
      </div>

      <div className="grid gap-6">
        {list.map((f, idx) => (
          <div key={f.id} className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="font-semibold text-sm">Karta #{f.id} · Kategoria: {f.category}</span>
              <select
                value={f.category}
                onChange={(e) => handleUpdate(idx, "category", e.target.value)}
                className="rounded border bg-background px-2 py-1 text-xs"
              >
                <option value="biologia">Biologia</option>
                <option value="srodowisko">Środowisko</option>
                <option value="medyczne">Medyczne</option>
              </select>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground">Pytanie na karcie</label>
                <input
                  type="text"
                  value={f.question}
                  onChange={(e) => handleUpdate(idx, "question", e.target.value)}
                  className="mt-1 w-full rounded-md border bg-background p-2 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground">Krótka odpowiedź (odkrycie)</label>
                <input
                  type="text"
                  value={f.answer}
                  onChange={(e) => handleUpdate(idx, "answer", e.target.value)}
                  className="mt-1 w-full rounded-md border bg-background p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground">Naukowe wyjaśnienie</label>
                <textarea
                  rows={2}
                  value={f.explanation}
                  onChange={(e) => handleUpdate(idx, "explanation", e.target.value)}
                  className="mt-1 w-full rounded-md border bg-background p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground">Znaczenie dla leśnika</label>
                <input
                  type="text"
                  value={f.meaning}
                  onChange={(e) => handleUpdate(idx, "meaning", e.target.value)}
                  className="mt-1 w-full rounded-md border bg-background p-2 text-sm"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground">Źródło naukowe (nazwa)</label>
                  <input
                    type="text"
                    value={f.source_name || f.sourceName || ""}
                    onChange={(e) => handleUpdate(idx, "source_name", e.target.value)}
                    className="mt-1 w-full rounded-md border bg-background p-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground">Źródło naukowe (link URL)</label>
                  <input
                    type="text"
                    value={f.source_url || f.sourceUrl || ""}
                    onChange={(e) => handleUpdate(idx, "source_url", e.target.value)}
                    className="mt-1 w-full rounded-md border bg-background p-2 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                disabled={savingId === f.id}
                onClick={() => handleSave(f)}
                className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
              >
                {savingId === f.id ? "Zapisywanie..." : "Zapisz kartę"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TAB 5: SIMULATOR EDITOR
   ────────────────────────────────────────────────────────────── */
function SimulatorEditor({
  scenarios,
  adminPassword,
  onSaved,
}: {
  scenarios: any[];
  adminPassword: string;
  onSaved: (msg: string) => void;
}) {
  const [list, setList] = useState(scenarios);
  const [savingId, setSavingId] = useState<number | null>(null);

  useEffect(() => {
    setList(scenarios);
  }, [scenarios]);

  const handleUpdate = (idx: number, field: string, val: any) => {
    const next = [...list];
    next[idx] = { ...next[idx]!, [field]: val };
    setList(next);
  };

  const handleSave = async (s: any) => {
    setSavingId(s.id);
    try {
      await saveSimulatorScenario({
        data: {
          id: s.id,
          stage: s.stage,
          situation: s.situation,
          options: s.options,
          adminPassword,
        },
      });
      onSaved(`Zapisano scenariusz: ${s.stage}`);
    } catch (e: any) {
      alert("Błąd: " + e.message);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Symulator Decyzji</h2>
        <p className="text-sm text-muted-foreground">
          Sytuacje terenowe i opcje postępowania podczas praktyk.
        </p>
      </div>

      <div className="space-y-6">
        {list.map((s, idx) => (
          <div key={idx} className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="border-b pb-3">
              <span className="font-semibold text-sm text-muted-foreground">Sytuacja #{idx + 1}</span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground">Etap (np. Przed wyjściem)</label>
                <input
                  type="text"
                  value={s.stage}
                  onChange={(e) => handleUpdate(idx, "stage", e.target.value)}
                  className="mt-1 w-full rounded-md border bg-background p-2 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground">Opis sytuacji</label>
                <textarea
                  rows={2}
                  value={s.situation}
                  onChange={(e) => handleUpdate(idx, "situation", e.target.value)}
                  className="mt-1 w-full rounded-md border bg-background p-2 text-sm"
                />
              </div>

              <div className="space-y-3 pt-2">
                <label className="block text-xs font-medium text-muted-foreground">Opcje wyboru i wyjaśnienia:</label>
                {s.options.map((opt: any, oIdx: number) => (
                  <div key={oIdx} className="rounded-lg border bg-background p-3 text-sm space-y-2">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={opt.ok}
                        onChange={(e) => {
                          const opts = [...s.options];
                          opts[oIdx] = { ...opts[oIdx], ok: e.target.checked };
                          handleUpdate(idx, "options", opts);
                        }}
                        className="h-4 w-4"
                        id={`ok-${idx}-${oIdx}`}
                      />
                      <label htmlFor={`ok-${idx}-${oIdx}`} className="text-xs font-semibold">
                        {opt.ok ? "✓ Poprawna odpowiedź" : "✕ Niepoprawna odpowiedź"}
                      </label>
                    </div>
                    <input
                      type="text"
                      value={opt.text}
                      onChange={(e) => {
                        const opts = [...s.options];
                        opts[oIdx] = { ...opts[oIdx], text: e.target.value };
                        handleUpdate(idx, "options", opts);
                      }}
                      placeholder="Tekst opcji..."
                      className="w-full rounded border p-2 text-sm"
                    />
                    <input
                      type="text"
                      value={opt.why}
                      onChange={(e) => {
                        const opts = [...s.options];
                        opts[oIdx] = { ...opts[oIdx], why: e.target.value };
                        handleUpdate(idx, "options", opts);
                      }}
                      placeholder="Uzasadnienie dlaczego tak / dlaczego nie..."
                      className="w-full rounded border p-2 text-xs text-muted-foreground"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                disabled={savingId === s.id}
                onClick={() => handleSave(s)}
                className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
              >
                {savingId === s.id ? "Zapisywanie..." : "Zapisz ten scenariusz"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TAB 6: GALLERY PHOTOS MANAGER
   ────────────────────────────────────────────────────────────── */
function GalleryEditor({
  photos,
  adminPassword,
  onSaved,
}: {
  photos: any[];
  adminPassword: string;
  onSaved: (msg: string) => void;
}) {
  const [list, setList] = useState(photos);

  useEffect(() => {
    setList(photos);
  }, [photos]);

  const toggleApproval = async (p: any) => {
    try {
      await saveGalleryPhoto({
        data: {
          id: p.id,
          storagePath: p.storage_path,
          caption: p.caption,
          author: p.author,
          school: p.school,
          approved: !p.approved,
          adminPassword,
        },
      });
      onSaved(`Zmieniono widoczność pracy: ${p.approved ? "Ukryto" : "Zatwierdzono"}`);
    } catch (e: any) {
      alert("Błąd: " + e.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Czy na pewno usunąć tę pracę z galerii?")) return;
    try {
      await deleteGalleryPhoto({
        data: { id, adminPassword },
      });
      onSaved("Usunięto pracę z galerii");
    } catch (e: any) {
      alert("Błąd: " + e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Galeria prac konkursowych</h2>
          <p className="text-sm text-muted-foreground">
            Zarządzaj nadesłanymi projektami murali i decyduj, które są widoczne dla odwiedzających.
          </p>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed p-12 text-center text-muted-foreground">
          <p>Brak prac w galerii.</p>
          <p className="mt-2 text-xs">
            Możesz przesłać nowe zdjęcie w zakładce <strong>Zdjęcia i Magazyn</strong>.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => {
            const url = p.storage_path.startsWith("http")
              ? p.storage_path
              : `https://qeuduxvviipftcaeogrk.supabase.co/storage/v1/object/public/site-assets/${p.storage_path}`;

            return (
              <div key={p.id} className="overflow-hidden rounded-xl border bg-card shadow-sm">
                <div className="aspect-[4/3] bg-muted">
                  <img src={url} alt={p.caption || "Praca"} className="h-full w-full object-cover" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      p.approved ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                    }`}>
                      {p.approved ? "✓ Widoczna na stronie" : "Ukryta"}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleApproval(p)}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      {p.approved ? "Ukryj" : "Zatwierdź"}
                    </button>
                  </div>

                  <p className="font-medium text-sm text-foreground">{p.caption || "Bez podpisu"}</p>
                  <p className="text-xs text-muted-foreground">{p.author} · {p.school}</p>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      className="text-xs text-destructive hover:underline"
                    >
                      Usuń z galerii
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TAB 7: STORAGE & IMAGE UPLOADER
   ────────────────────────────────────────────────────────────── */
const IMAGE_SLOTS = [
  {
    key: "homepage.hero_image",
    shortLabel: "Tło strony",
    label: "Tło główne (Strona główna i Strefa Edukacji)",
    defaultUrl: defaultHero,
  },
  {
    key: "module.1.image",
    shortLabel: "Moduł 1",
    label: "Okładka Modułu 1 (Poznaj zagrożenie)",
    defaultUrl: moduleImages[1] ?? "",
  },
  {
    key: "module.2.image",
    shortLabel: "Moduł 2",
    label: "Okładka Modułu 2 (Chroń siebie)",
    defaultUrl: moduleImages[2] ?? "",
  },
  {
    key: "module.3.image",
    shortLabel: "Moduł 3",
    label: "Okładka Modułu 3 (Reaguj właściwie)",
    defaultUrl: moduleImages[3] ?? "",
  },
] as const;

function StorageUploader({
  texts,
  adminPassword,
  onSaved,
}: {
  texts: Record<string, string>;
  adminPassword: string;
  onSaved: (msg: string) => void;
}) {
  const slots = IMAGE_SLOTS;

  const [file, setFile] = useState<File | null>(null);
  const [folder, setFolder] = useState("modules");
  const [targetSlot, setTargetSlot] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [assigningKey, setAssigningKey] = useState<string | null>(null);
  const [lastUploadedUrl, setLastUploadedUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [author, setAuthor] = useState("");
  const [school, setSchool] = useState("");

  const [slotUrls, setSlotUrls] = useState<Record<string, string>>({});
  const [storageImages, setStorageImages] = useState<StorageImageItem[]>([]);
  const [loadingStorage, setLoadingStorage] = useState(false);
  const [storageFilter, setStorageFilter] = useState<string>("all");

  useEffect(() => {
    const next: Record<string, string> = {};
    for (const s of slots) {
      next[s.key] = texts[s.key] ?? "";
    }
    setSlotUrls(next);
  }, [texts]);

  const loadStorageImages = async () => {
    setLoadingStorage(true);
    try {
      const res = await listStorageImages({ data: { adminPassword } });
      setStorageImages(res.images || []);
    } catch (e) {
      console.error("Failed to list storage images:", e);
    } finally {
      setLoadingStorage(false);
    }
  };

  useEffect(() => {
    void loadStorageImages();
  }, [adminPassword]);

  const assignImageToSlot = async (slotKey: string, url: string) => {
    const slotMeta = slots.find((s) => s.key === slotKey);
    setAssigningKey(slotKey);
    try {
      await saveSiteText({
        data: {
          key: slotKey,
          value: url.trim(),
          adminPassword,
        },
      });
      setSlotUrls((prev) => ({ ...prev, [slotKey]: url.trim() }));
      onSaved(
        url.trim()
          ? `Ustawiono nowe zdjęcie dla miejsca: ${slotMeta?.label || slotKey}!`
          : `Przywrócono domyślne zdjęcie dla miejsca: ${slotMeta?.label || slotKey}.`,
      );
    } catch (e: any) {
      alert("Błąd zapisu: " + e.message);
    } finally {
      setAssigningKey(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const res = reader.result as string;
          const base64 = res.split(",")[1];
          if (base64) resolve(base64);
          else reject(new Error("Błąd odczytu pliku"));
        };
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);

      const base64 = await base64Promise;

      const res = await uploadImageToStorage({
        data: {
          base64,
          filename: file.name,
          contentType: file.type || "image/jpeg",
          folder,
          adminPassword,
        },
      });

      setLastUploadedUrl(res.publicUrl);

      if (folder === "gallery") {
        await saveGalleryPhoto({
          data: {
            storagePath: res.publicUrl,
            caption: caption || file.name,
            author,
            school,
            approved: true,
            adminPassword,
          },
        });
        onSaved("Dodano nowe zdjęcie bezpośrednio do galerii prac!");
      } else if (targetSlot) {
        await assignImageToSlot(targetSlot, res.publicUrl);
      } else {
        onSaved(`Pomyślnie przesłano plik: ${file.name}. Wybierz poniżej miejsce na stronie.`);
      }

      void loadStorageImages();
    } catch (e: any) {
      alert("Błąd przesyłania: " + e.message);
    } finally {
      setUploading(false);
    }
  };

  const filteredStorage = storageImages.filter(
    (img) => storageFilter === "all" || img.folder === storageFilter,
  );

  return (
    <div className="space-y-10">
      {/* 1. Uploader card */}
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Przesyłanie zdjęć (Supabase Storage)</h2>
          <p className="text-sm text-muted-foreground">
            Prześlij nowe zdjęcie z komputera do chmury i ustaw je jako tło strony albo okładkę wybranego modułu (1, 2 lub 3).
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground">Wybierz plik z dysku</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:opacity-90"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground">Folder docelowy w magazynie</label>
              <select
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                className="mt-1 w-full rounded-md border bg-background p-2.5 text-sm"
              >
                <option value="modules">modules (okładki modułów)</option>
                <option value="hero">hero (zdjęcie w tle strony)</option>
                <option value="gallery">gallery (prace konkursowe na mural)</option>
                <option value="logos">logos (loga i patronaty)</option>
                <option value="uploads">uploads (ogólny)</option>
              </select>
            </div>

            {folder !== "gallery" && (
              <div>
                <label className="block text-sm font-medium text-foreground">Gdzie ustawić od razu? (opcjonalnie)</label>
                <select
                  value={targetSlot}
                  onChange={(e) => setTargetSlot(e.target.value)}
                  className="mt-1 w-full rounded-md border bg-background p-2.5 text-sm"
                >
                  <option value="">Tylko prześlij (wybiorę za chwilę)</option>
                  {slots.map((s) => (
                    <option key={s.key} value={s.key}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {folder === "gallery" && (
            <div className="space-y-3 rounded-lg border bg-muted/40 p-3">
              <p className="text-xs font-semibold text-primary">Informacje o pracy konkursowej:</p>
              <input
                type="text"
                placeholder="Podpis pracy / tytuł muralu..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full rounded border bg-background p-2 text-xs"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Autor (imię lub pseudonim)..."
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full rounded border bg-background p-2 text-xs"
                />
                <input
                  type="text"
                  placeholder="Szkoła / Technikum..."
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full rounded border bg-background p-2 text-xs"
                />
              </div>
            </div>
          )}

          <button
            type="button"
            disabled={!file || uploading}
            onClick={handleUpload}
            className="w-full rounded-lg bg-primary py-3 font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {uploading ? "Przesyłanie do chmury..." : "Prześlij do magazynu"}
          </button>
        </div>

        {lastUploadedUrl && (
          <div className="rounded-xl border bg-success/10 p-5 space-y-4">
            <p className="font-semibold text-sm text-success">✓ Zdjęcie zostało pomyślnie przesłane!</p>
            <div className="aspect-video max-w-sm overflow-hidden rounded-lg border bg-background">
              <img src={lastUploadedUrl} alt="Podgląd" className="h-full w-full object-cover" />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Publiczny link URL:</label>
              <input
                type="text"
                readOnly
                value={lastUploadedUrl}
                className="w-full rounded border bg-background p-2 text-xs font-mono"
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground">Ustaw to zdjęcie w wybranym miejscu na stronie:</p>
              <div className="flex flex-wrap gap-2">
                {slots.map((s) => {
                  const isActive = (texts[s.key] ?? "").trim() === lastUploadedUrl;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      disabled={assigningKey === s.key}
                      onClick={() => assignImageToSlot(s.key, lastUploadedUrl)}
                      className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                        isActive
                          ? "bg-success text-white"
                          : "bg-primary text-primary-foreground hover:opacity-90"
                      } disabled:opacity-50`}
                    >
                      {isActive ? `✓ Ustawiono: ${s.shortLabel}` : `Ustaw jako: ${s.shortLabel}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Current 4 image places overview */}
      <div className="space-y-4 border-t pt-8">
        <div>
          <h3 className="text-xl font-bold">Aktualne zdjęcia w 4 miejscach na stronie</h3>
          <p className="text-sm text-muted-foreground">
            Podgląd aktywnych zdjęć dla tła strony oraz okładek Modułu 1, 2 i 3. Możesz tu też wkleić własny link lub przywrócić zdjęcie domyślne.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {slots.map((s) => {
            const customUrl = (texts[s.key] ?? "").trim();
            const activeSrc = customUrl || s.defaultUrl;
            const draftVal = slotUrls[s.key] ?? "";
            return (
              <div key={s.key} className="rounded-xl border bg-card p-4 shadow-sm space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{s.label}</h4>
                    <span className="text-[11px] font-mono text-muted-foreground">{s.key}</span>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      customUrl
                        ? "bg-success/15 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {customUrl ? "Własne zdjęcie" : "Domyślne"}
                  </span>
                </div>

                <div className="aspect-video overflow-hidden rounded-lg border bg-muted">
                  <img src={activeSrc} alt={s.label} className="h-full w-full object-cover" />
                </div>

                <div className="flex flex-wrap gap-2">
                  <input
                    type="text"
                    placeholder="Wklej URL zdjęcia (albo kliknij poniżej przy zdjęciu z chmury)..."
                    value={draftVal}
                    onChange={(e) => setSlotUrls((prev) => ({ ...prev, [s.key]: e.target.value }))}
                    className="min-w-0 flex-1 rounded-md border bg-background px-2.5 py-1.5 text-xs font-mono"
                  />
                  <button
                    type="button"
                    disabled={assigningKey === s.key || draftVal.trim() === customUrl}
                    onClick={() => assignImageToSlot(s.key, draftVal)}
                    className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:opacity-40"
                  >
                    Zapisz
                  </button>
                  {customUrl && (
                    <button
                      type="button"
                      disabled={assigningKey === s.key}
                      onClick={() => assignImageToSlot(s.key, "")}
                      className="rounded-md border px-3 py-1.5 text-xs hover:bg-muted disabled:opacity-40"
                    >
                      Przywróć domyślne
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Already uploaded storage images library */}
      <div className="space-y-4 border-t pt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold">Zdjęcia już przesłane do bazy (Supabase Storage)</h3>
            <p className="text-sm text-muted-foreground">
              Kliknij wybrany przycisk pod dowolnym przesłanym zdjęciem, aby od razu ustawić je w jednym z 4 miejsc.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={storageFilter}
              onChange={(e) => setStorageFilter(e.target.value)}
              className="rounded-md border bg-background px-3 py-1.5 text-xs"
            >
              <option value="all">Wszystkie foldery</option>
              <option value="modules">modules</option>
              <option value="hero">hero</option>
              <option value="uploads">uploads</option>
              <option value="gallery">gallery</option>
              <option value="logos">logos</option>
            </select>
            <button
              type="button"
              onClick={() => void loadStorageImages()}
              disabled={loadingStorage}
              className="rounded-md border px-3 py-1.5 text-xs hover:bg-muted disabled:opacity-50"
            >
              {loadingStorage ? "Ładowanie..." : "↻ Odśwież listę"}
            </button>
          </div>
        </div>

        {loadingStorage && storageImages.length === 0 ? (
          <p className="text-sm text-muted-foreground">Wczytywanie zdjęć z magazynu...</p>
        ) : filteredStorage.length === 0 ? (
          <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            Brak przesłanych zdjęć w wybranym folderze.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStorage.map((img) => (
              <div key={img.path} className="flex flex-col rounded-xl border bg-card p-3 shadow-sm">
                <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                  <img src={img.publicUrl} alt={img.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="mt-2 min-w-0">
                  <span className="inline-block rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-primary">
                    {img.folder}
                  </span>
                  <p className="mt-1 truncate text-xs font-mono text-muted-foreground" title={img.name}>
                    {img.name}
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-1.5">
                  {slots.map((s) => {
                    const isActive = (texts[s.key] ?? "").trim() === img.publicUrl;
                    return (
                      <button
                        key={s.key}
                        type="button"
                        disabled={assigningKey === s.key}
                        onClick={() => assignImageToSlot(s.key, img.publicUrl)}
                        className={`rounded border px-2 py-1.5 text-[11px] font-medium transition ${
                          isActive
                            ? "border-primary bg-primary text-primary-foreground"
                            : "bg-background hover:bg-muted"
                        } disabled:opacity-50`}
                      >
                        {isActive ? `✓ ${s.shortLabel}` : s.shortLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
