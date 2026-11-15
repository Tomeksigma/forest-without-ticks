export type Fact = {
  id: number;
  category: "biologia" | "srodowisko" | "medyczne";
  question: string;
  answer: string;
  explanation: string;
  meaning: string;
  sourceName: string;
  sourceUrl: string;
  guess: { options: string[]; correct: number };
};

export const categories = [
  { id: "biologia", label: "Biologia kleszcza", range: "karty 1–5" },
  { id: "srodowisko", label: "Kleszcze i środowisko", range: "karty 6–9" },
  { id: "medyczne", label: "Fakty medyczne i naukowe", range: "karty 10–12" },
] as const;

export const facts: Fact[] = [
  {
    id: 1,
    category: "biologia",
    question: "Czy kleszcz jest owadem?",
    answer: "Nie. Kleszcze są pajęczakami. Dorosłe osobniki mają osiem odnóży, a larwy sześć.",
    explanation: "Kleszcze należą do pajęczaków (Arachnida), razem z pająkami i roztoczami. Owady mają trzy pary odnóży, a dorosłe kleszcze — cztery pary; larwa kleszcza ma dopiero trzy pary.",
    meaning: "Nie myl kleszczy z owadami — to wpływa na rozumienie ich biologii i sposobu żerowania.",
    sourceName: "ECDC – disease vectors",
    sourceUrl: "https://www.ecdc.europa.eu/en/disease-vectors",
    guess: { options: ["Tak", "Nie — to pajęczak", "To mięczak"], correct: 1 },
  },
  {
    id: 2,
    category: "biologia",
    question: "Czy kleszcze skaczą z drzew?",
    answer: "Nie. Kleszcze nie skaczą i nie latają. Zwykle oczekują na żywiciela na roślinności, wykorzystując zachowanie nazywane questing.",
    explanation: "Kleszcz wspięty na trawę lub krzew wyciąga przednie odnóża i czeka na kontakt z przechodzącym żywicielem (questing). Nie spada celowo z gałęzi drzew.",
    meaning: "Kontakt z trawą i krzewami prowadzi do ukłucia — kleszcz czeka właśnie tam, a nie na drzewie.",
    sourceName: "ECDC – disease vectors",
    sourceUrl: "https://www.ecdc.europa.eu/en/disease-vectors",
    guess: { options: ["Nie — nie skaczą ani nie latają", "Tak, czekają na gałęziach", "Skaczą tylko dorosłe"], correct: 0 },
  },
  {
    id: 3,
    category: "biologia",
    question: "Jak kleszcz wykrywa człowieka?",
    answer: "Wykorzystuje narządy zmysłowe, między innymi narząd Hallera na pierwszej parze odnóży, który pomaga odbierać bodźce środowiskowe.",
    explanation: "Narząd Hallera to struktura zmysłowa na przednich odnóżach kleszcza, odbierająca bodźce chemiczne i fizyczne z otoczenia. Pomaga kleszczowi namierzyć żywiciela bez wzroku.",
    meaning: "Kleszcz wykrywa żywiciela bez wzroku podobnego do ludzkiego — nie da się go „oszukać” samym cichym chodzeniem.",
    sourceName: "ECDC – disease vectors",
    sourceUrl: "https://www.ecdc.europa.eu/en/disease-vectors",
    guess: { options: ["Widzi go dobrym wzrokiem", "Narządem Hallera na odnóżach", "Słyszy kroki"], correct: 1 },
  },
  {
    id: 4,
    category: "biologia",
    question: "Dlaczego małe kleszcze są trudne do zauważenia?",
    answer: "Nimfy są niewielkie, ale również mogą przenosić patogeny.",
    explanation: "Nimfa kleszcza pospolitego jest wielkości znacznie mniejszej od dorosłej samicy, a mimo to może przenosić patogeny. To właśnie łatwo przeoczone nimfy odpowiadają za dużą część ukłuć.",
    meaning: "Po praktykach należy dokładnie sprawdzić całe ciało — mały kleszcz jest równie groźny jak duży.",
    sourceName: "NIZP PZH–PIB",
    sourceUrl: "https://www.pzh.gov.pl/",
    guess: { options: ["Są przezroczyste", "Umieją się kamuflować", "Nimfy są bardzo małe, choć mogą przenosić patogeny"], correct: 2 },
  },
  {
    id: 5,
    category: "biologia",
    question: "Czy kleszcz rośnie podczas pobierania krwi?",
    answer: "Tak. Podczas żerowania ciało kleszcza może znacznie zwiększyć objętość.",
    explanation: "W trakcie żerowania kleszcz pobiera dużą ilość krwi, a jego ciało potrafi zwiększyć objętość wielokrotnie. W miarę napełniania staje się coraz bardziej widoczny.",
    meaning: "Nie czekaj, aż kleszcz napęcznieje — usuń go możliwie szybko, zaraz po zauważeniu.",
    sourceName: "ECDC – disease vectors",
    sourceUrl: "https://www.ecdc.europa.eu/en/disease-vectors",
    guess: { options: ["Nie, jego wielkość jest stała", "Tylko samce rosną", "Tak — może znacznie zwiększyć objętość ciała"], correct: 2 },
  },
  {
    id: 6,
    category: "srodowisko",
    question: "Dlaczego kleszcze lubią wilgotne miejsca?",
    answer: "Są podatne na utratę wody. Wilgotny mikroklimat sprzyja ich przeżyciu.",
    explanation: "Kleszcze tracą wodę z organizmu łatwiej niż wiele innych stawonogów, dlatego potrzebują wilgotnego mikroklimatu. Dlatego unikają przesuszonych, nasłonecznionych miejsc.",
    meaning: "Wilgotna ściółka, podszyt i zarośla mogą być odpowiednimi siedliskami kleszczy.",
    sourceName: "ECDC – disease vectors",
    sourceUrl: "https://www.ecdc.europa.eu/en/disease-vectors",
    guess: { options: ["Bo wilgoć jest dla nich pokarmem", "Bo są podatne na utratę wody", "Bo unikają jasnego światła, które je oślepia"], correct: 1 },
  },
  {
    id: 7,
    category: "srodowisko",
    question: "Jak długo żyje kleszcz?",
    answer: "Cykl rozwojowy kleszcza pospolitego może trwać kilka lat, często około trzech, zależnie od warunków.",
    explanation: "Kleszcz pospolity przechodzi rozwój od larwy przez nimfę do postaci dorosłej, a każdy etap wymaga posiłku krwi. Cały cykl, zależnie od warunków klimatycznych i dostępności żywicieli, trwa zwykle około trzech lat.",
    meaning: "Kleszcze pozostają elementem ekosystemu przez wiele sezonów — ryzyko kontaktu nie znika po jednym roku.",
    sourceName: "ECDC – disease vectors",
    sourceUrl: "https://www.ecdc.europa.eu/en/disease-vectors",
    guess: { options: ["Ponad 20 lat", "Jeden sezon", "Cykl może trwać około trzech lat"], correct: 2 },
  },
  {
    id: 8,
    category: "srodowisko",
    question: "Ile jaj może złożyć samica?",
    answer: "Samica Ixodes ricinus może złożyć około 2000 jaj.",
    explanation: "Po posiłku krwi samica składa jaja, zwykle w szczelinach gruntu i ściółki. Liczba około 2000 dotyczy samicy kleszcza pospolitego (Ixodes ricinus).",
    meaning: "Nie wszystkie osobniki przeżywają — nie utożsamiaj liczby jaj z liczbą dorosłych kleszczy w lesie.",
    sourceName: "ECDC – disease vectors",
    sourceUrl: "https://www.ecdc.europa.eu/en/disease-vectors",
    guess: { options: ["Około 200", "Około 2000", "Około 20 000"], correct: 1 },
  },
  {
    id: 9,
    category: "srodowisko",
    question: "Czy kleszcze są aktywne tylko latem?",
    answer: "Nie. Aktywność zależy od temperatury, wilgotności i mikroklimatu. Może występować również w chłodniejszych miesiącach.",
    explanation: "Aktywność kleszczy zależy od warunków pogodowych — wystarczy temperatura i wilgotność sprzyjające questingowi. W ciepłych, wilgotnych okresach bywają aktywne także wiosną, jesienią, a nawet w łagodne dni zimowe.",
    meaning: "Ochrona podczas praktyk jest ważna także poza latem.",
    sourceName: "ECDC – tick-borne encephalitis",
    sourceUrl: "https://www.ecdc.europa.eu/en/tick-borne-encephalitis",
    guess: { options: ["Tak, zimą zawsze zapadają w odrętwienie", "Nie — aktywność zależy od temperatury i wilgotności", "Są aktywne wyłącznie w maju"], correct: 1 },
  },
  {
    id: 10,
    category: "medyczne",
    question: "Czy KZM można zakazić się bez ukłucia?",
    answer: "Tak, rzadko — przez spożycie zakażonego niepasteryzowanego mleka lub jego produktów.",
    explanation: "Dominującą drogą zakażenia KZM jest ukłucie zakażonego kleszcza, ale opisywano także zakażenia przez niepasteryzowane mleko zakażonych zwierząt hodowlanych (np. kóz) i jego produkty.",
    meaning: "Pasteryzacja mleka jest istotna dla bezpieczeństwa żywności.",
    sourceName: "ECDC – tick-borne encephalitis",
    sourceUrl: "https://www.ecdc.europa.eu/en/tick-borne-encephalitis",
    guess: { options: ["Tak, przez zwykły dotyk skóry", "Nie, wyłącznie przez ukłucie", "Tak, rzadko — przez niepasteryzowane mleko"], correct: 2 },
  },
  {
    id: 11,
    category: "medyczne",
    question: "Ile gatunków kleszczy stwierdzono w Polsce?",
    answer: "Publikacja NIZP PZH–PIB z 2022 roku wskazywała 19 gatunków. Najbardziej rozpowszechniony jest Ixodes ricinus.",
    explanation: "Według publikacji NIZP PZH–PIB z 2022 r. w Polsce stwierdzono 19 gatunków kleszczy. Dominującym gatunkiem, o największym znaczeniu epidemiologicznym, jest kleszcz pospolity (Ixodes ricinus).",
    meaning: "Nie wszystkie gatunki mają identyczne siedliska i znaczenie epidemiologiczne. Liczba gatunków może się zmieniać wraz z nowymi badaniami — dlatego podajemy rok źródła (2022).",
    sourceName: "NIZP PZH–PIB",
    sourceUrl: "https://www.pzh.gov.pl/",
    guess: { options: ["5", "19", "47"], correct: 1 },
  },
  {
    id: 12,
    category: "medyczne",
    question: "Jak naukowcy badają kleszcze w terenie?",
    answer: "Stosują między innymi metodę przeciągania jasnej tkaniny po roślinności, aby pobierać próbki do badań.",
    explanation: "Badacze przeciągają po roślinności jasny materiał (tzw. flagę lub chorągiew), na który wspinają się oczekujące kleszcze. Tak zbierane próbki pozwalają ocenić ich liczebność i zakażenie patogenami.",
    meaning: "Badania wymagają procedur bezpieczeństwa i nie są ćwiczeniem do samodzielnego wykonywania przez uczniów.",
    sourceName: "ECDC – disease vectors",
    sourceUrl: "https://www.ecdc.europa.eu/en/disease-vectors",
    guess: { options: ["Przeciągają jasną tkaninę po roślinności", "Nocą oświetlają las latarkami", "Odsysają kleszcze odkurzaczem"], correct: 0 },
  },
];

export type QuizQ = { question: string; options: string[]; correct: number; why: string };

export const miniQuiz: QuizQ[] = [
  { question: "Ile odnóży ma larwa kleszcza?", options: ["4", "6", "8"], correct: 1, why: "Larwa ma trzy pary odnóży (sześć), a nimfa i dorosły osobnik — cztery pary (osiem)." },
  { question: "Czy kleszcze skaczą?", options: ["Tak, z drzew", "Tylko dorosłe", "Nie"], correct: 2, why: "Kleszcze nie skaczą i nie latają — czekają na roślinności w pozycji questingu." },
  { question: "Co pomaga kleszczowi wykrywać żywiciela?", options: ["Narząd Hallera", "Dobre oczy", "Uszy"], correct: 0, why: "Narząd Hallera na pierwszej parze odnóży odbiera bodźce środowiskowe." },
  { question: "Jakie warunki sprzyjają Ixodes ricinus?", options: ["Suchy, gorący klimat", "Wilgotny mikroklimat", "Silne nasłonecznienie"], correct: 1, why: "Kleszcze są podatne na utratę wody, więc sprzyja im wilgotny mikroklimat." },
  { question: "Czy KZM można zakazić się przez niepasteryzowane mleko?", options: ["Nie, tylko przez ukłucie", "Tak, przez dotyk", "Tak, rzadko"], correct: 2, why: "Zakażenia przez niepasteryzowane mleko są rzadkie, ale opisywane." },
  { question: "Czy nimfy mogą przenosić patogeny?", options: ["Tak", "Nie, tylko dorosłe", "Tylko w ciepłe miesiące"], correct: 0, why: "Nimfy są małe, ale mogą przenosić patogeny — dlatego łatwo je przeoczyć." },
];
