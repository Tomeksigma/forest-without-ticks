// Dane i zasady punktacji Strefy Nauczyciela.
export const SRC = {
  gisB: { label: "GIS – borelioza", url: "https://www.gov.pl/web/gis/borelioza" },
  gisK: { label: "GIS – KZM", url: "https://www.gov.pl/web/gis/kleszczowe-zapalenie-mozgu" },
  pzh: { label: "NIZP PZH–PIB", url: "https://wwwold.pzh.gov.pl/oldpage/epimeld/" },
  aotm: { label: "AOTMiT", url: "https://www.aotm.gov.pl/" },
  who: { label: "WHO", url: "https://www.who.int/europe/news-room/questions-and-answers/item/public-health-advice-on-ticks-and-tick-borne-diseases" },
  ecdc: { label: "ECDC", url: "https://www.ecdc.europa.eu/en/disease-vectors/surveillance-and-disease-data/tick-maps" },
  idsa: { label: "IDSA/AAN/ACR 2020", url: "https://doi.org/10.1093/cid/ciaa1215" },
} as const;
export type Source = (typeof SRC)[keyof typeof SRC];

/** Etapy lekcji: [start, koniec] w minutach. */
export const LESSON_A_TIMES: [number, number][] = [[0, 2], [2, 6], [6, 11], [11, 14], [14, 15]];
export const LESSON_B_TIMES: [number, number][] = [[0, 3], [3, 10], [10, 18], [18, 26], [26, 35], [35, 41], [41, 45]];
export const lessonMinutes = (t: [number, number][]) => (t[t.length - 1]?.[1] ?? 0);

/** Maksymalne punkty pięciu stacji lekcji 45-minutowej. */
export const STATION_MAX = [6, 8, 8, 9, 5] as const;
export const STATION_NAMES = ["Tropem kleszcza", "Mapa zagrożeń", "Szafa leśnika", "Medyczne zagadki", "Kodeks młodego leśnika"];
export const TOTAL_MAX = STATION_MAX.reduce((a, b) => a + b, 0);
export const PASS_POINTS = 26;
export const isTeamPassed = (pts: number) => pts >= PASS_POINTS;
export const clampPoints = (v: number, station: number) => Math.max(0, Math.min(STATION_MAX[station] ?? 0, Math.round(v) || 0));

export const mythCards = [
  { text: "Kleszcze występują również w parkach.", truth: true, why: "Kleszcze żyją wszędzie tam, gdzie jest wilgotna roślinność – także w parkach miejskich i ogrodach.", src: SRC.gisB },
  { text: "Kleszcze spadają z koron drzew.", truth: false, why: "Kleszcze czekają na niskiej roślinności (zwykle do ok. 1 m) i przyczepiają się przy otarciu.", src: SRC.who },
  { text: "Szczepienie przeciw KZM chroni przed boreliozą.", truth: false, why: "Szczepionka chroni tylko przed KZM (choroba wirusowa). Przeciw boreliozie (choroba bakteryjna) nie ma szczepionki dla ludzi.", src: SRC.gisK },
  { text: "Po praktykach należy sprawdzić całe ciało.", truth: true, why: "Oglądanie skóry – zwłaszcza pach, pachwin, zgięć kolan, okolic uszu i linii włosów – pozwala szybko usunąć kleszcza.", src: SRC.who },
];

export const removalSteps = [
  "Chwyć kleszcza cienką pęsetą blisko skóry.",
  "Wyciągnij równomiernym ruchem.",
  "Oczyść skórę i umyj ręce.",
];
export const removalDont = [
  { t: "Smarowanie tłuszczem", why: "Opóźnia usunięcie i może podrażnić kleszcza." },
  { t: "Przypalanie", why: "Grozi oparzeniem i nie ułatwia usunięcia." },
  { t: "Ściskanie odwłoka", why: "Może sprzyjać przedostaniu się treści kleszcza do skóry." },
];

export const exitTicket = [
  { q: "Przed praktykami będę…", model: "…zakładać długie spodnie, bluzę z długim rękawem i pełne buty, chować nogawki w skarpety i stosować repelent zgodnie z etykietą." },
  { q: "Po praktykach sprawdzę…", model: "…całe ciało, zwłaszcza pachy, pachwiny, zgięcia kolan, okolice uszu i linię włosów, a także ubranie." },
  { q: "Jeśli znajdę kleszcza…", model: "…od razu usunę go pęsetą blisko skóry, oczyszczę skórę, umyję ręce i będę obserwować miejsce ukłucia; przy objawach zgłoszę się do lekarza." },
];

export const forestDecisions = [
  { s: "Idziecie przez wysoką trawę do powierzchni próbnej.", o: ["Idę środkiem ścieżki, gdy to możliwe", "Skracam drogę przez trawę"], c: 0 },
  { s: "Rano przed wyjściem w teren.", o: ["Nakładam repelent zgodnie z etykietą", "Repelent nie ma znaczenia"], c: 0 },
  { s: "Pracujesz w gęstym podszycie.", o: ["Chowam nogawki w skarpety", "Podwijam nogawki, bo jest gorąco"], c: 0 },
  { s: "Przerwa na odpoczynek.", o: ["Siadam na kurtce w trawie", "Siadam na pniu lub na ławce, a potem oglądam ubranie"], c: 1 },
  { s: "Wieczór po powrocie z praktyk.", o: ["Oglądam całe ciało i biorę prysznic", "Sprawdzam tylko ręce"], c: 0 },
  { s: "Znajdujesz wkłutego kleszcza.", o: ["Smaruję go masłem i czekam", "Usuwam go od razu pęsetą"], c: 1 },
];

export const mapQuestions = [
  { q: "Czy liczba zachorowań jest równa liczbie kleszczy?", model: "Nie. Mapa pokazuje zgłoszone zachorowania ludzi na boreliozę, a nie liczbę kleszczy ani ich zakażenie." },
  { q: "Dlaczego porównujemy zapadalność na 100 tys. mieszkańców?", model: "Bo uwzględnia liczbę mieszkańców – można porównać województwa o różnej wielkości." },
  { q: "Czy województwo z mniejszą liczbą zachorowań jest wolne od kleszczy?", model: "Nie. Kleszcze występują w całej Polsce; mniej zachorowań nie oznacza braku ryzyka." },
  { q: "Jakie czynniki mogą wpływać na liczbę zgłaszanych zachorowań?", model: "Np. czas spędzany w lesie, praca w terenie, profilaktyka, dostęp do lekarza i diagnostyki, sposób zgłaszania, pogoda, liczba zwierząt-żywicieli." },
];

export const wardrobe = [
  { id: "spodnie", label: "Długie spodnie", good: true, why: "Chronią nogi przed kontaktem z roślinnością." },
  { id: "sandaly", label: "Sandały", good: false, why: "Odsłaniają stopy i kostki." },
  { id: "buty", label: "Pełne buty terenowe", good: true, why: "Zakrywają stopy i kostki." },
  { id: "koszulka", label: "Koszulka bez rękawów", good: false, why: "Odsłania ramiona i pachy." },
  { id: "dlugi", label: "Bluza z długimi rękawami", good: true, why: "Zakrywa ręce; na jasnej łatwiej zauważyć kleszcza." },
  { id: "repelent", label: "Repelent zgodny z etykietą", good: true, why: "Zmniejsza ryzyko ukłucia, jeśli jest stosowany zgodnie z etykietą." },
  { id: "szorty", label: "Krótkie spodenki", good: false, why: "Odsłaniają nogi – kleszcze czekają na niskiej roślinności." },
  { id: "peseta", label: "Cienka pęseta w apteczce", good: true, why: "Pozwala szybko i prawidłowo usunąć kleszcza." },
];
export const wardrobeScore = (sel: Record<string, boolean>) => wardrobe.filter((w) => !!sel[w.id] === w.good).length;

export const medicalCases = [
  {
    id: "A", title: "Kleszcz wkłuty w skórę, brak objawów", src: [SRC.gisB, SRC.idsa],
    st: [
      { t: "Kleszcza należy jak najszybciej usunąć pęsetą blisko skóry i oczyścić skórę.", ok: true, why: "Szybkie, prawidłowe usunięcie to najważniejszy krok." },
      { t: "Bez objawów warto od razu zbadać przeciwciała przeciw boreliozie.", ok: false, why: "Rutynowe badanie przeciwciał bez objawów nie jest zalecane – przeciwciała pojawiają się dopiero po tygodniach." },
      { t: "Przez kilka tygodni obserwuję miejsce ukłucia i samopoczucie.", ok: true, why: "Obserwacja pozwala zauważyć np. rumień wędrujący lub gorączkę." },
    ],
  },
  {
    id: "B", title: "Powiększający się rumień po kilkunastu dniach", src: [SRC.gisB, SRC.idsa],
    st: [
      { t: "Trzeba skonsultować się z lekarzem.", ok: true, why: "Powiększający się rumień może być objawem boreliozy – oceni go lekarz." },
      { t: "Rumień zawsze wygląda jak tarcza strzelnicza.", ok: false, why: "Rumień wędrujący nie musi mieć przejaśnienia w środku." },
      { t: "Mogę sam wziąć antybiotyk z domowej apteczki.", ok: false, why: "Leczenie zleca wyłącznie lekarz – nie lecz się sam." },
    ],
  },
  {
    id: "C", title: "Gorączka, silny ból głowy i sztywność karku", src: [SRC.gisK, SRC.gisB],
    st: [
      { t: "To sytuacja wymagająca pilnej pomocy medycznej.", ok: true, why: "Takie objawy mogą świadczyć o zajęciu układu nerwowego (np. KZM)." },
      { t: "Wystarczy odpocząć i odczekać kilka dni.", ok: false, why: "Zwlekanie przy objawach neurologicznych jest niebezpieczne." },
      { t: "Lekarzowi warto powiedzieć o pobycie w lesie lub ukłuciu kleszcza.", ok: true, why: "Ta informacja pomaga lekarzowi w diagnozie." },
    ],
  },
];

export const codeCards = [
  { t: "Odpowiednio ubierz się do pracy w terenie.", ok: true },
  { t: "Stosuj repelent zgodnie z etykietą.", ok: true },
  { t: "Posmaruj kleszcza masłem, zanim go usuniesz.", ok: false },
  { t: "Sprawdzaj skórę po praktykach.", ok: true },
  { t: "Szczepienie przeciw KZM chroni przed wszystkimi chorobami odkleszczowymi.", ok: false },
  { t: "Szybko i prawidłowo usuwaj kleszcze.", ok: true },
  { t: "Jeśli nic nie swędzi, nie trzeba się oglądać.", ok: false },
  { t: "Nie ignoruj niepokojących objawów.", ok: true },
];

export const commonErrors = [
  "Mylenie boreliozy z KZM – szczepionka chroni tylko przed KZM.",
  "Przekonanie, że kleszcze spadają z drzew.",
  "Traktowanie mapy zachorowań jako mapy liczby kleszczy.",
  "Oczekiwanie, że rumień zawsze wygląda jak tarcza.",
  "Pomysł samodzielnego przyjmowania antybiotyku.",
];
