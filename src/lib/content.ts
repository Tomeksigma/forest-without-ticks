export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "list"; items: string[]; ordered?: boolean }
  | { t: "note"; title?: string; text: string; tone?: "warn" | "info" }
  | { t: "steps"; items: string[] }
  | { t: "table"; rows: [string, "Mit" | "Fakt", string][] }
  | { t: "checklist"; groups: { title: string; items: string[] }[] }
  | { t: "src"; text: string };

export type Lesson = { title: string; blocks: Block[] };
export type Question = { q: string; options: string[]; correct: number };
export type Module = { n: number; roman: string; title: string; lead: string; lessons: Lesson[]; quiz: Question[] };

export const modules: Module[] = [
  {
    n: 1,
    roman: "I",
    title: "Poznaj zagrożenie",
    lead: "Biologia kleszcza, miejsca występowania, borelioza, KZM i najczęstsze mity.",
    lessons: [
      {
        title: "Kleszcz – mały pajęczak, duże znaczenie",
        blocks: [
          { t: "p", text: "Kleszcze to pajęczaki należące do podgromady roztoczy. W odróżnieniu od owadów dorosłe kleszcze mają cztery pary odnóży. Żywią się krwią kręgowców, między innymi ssaków i ptaków." },
          { t: "p", text: "W Polsce jednym z najważniejszych gatunków z punktu widzenia zdrowia człowieka jest kleszcz pospolity (Ixodes ricinus). Występuje w lasach, na łąkach, w parkach i ogrodach." },
          { t: "p", text: "Cykl rozwojowy kleszcza obejmuje cztery stadia: jajo, larwę, nimfę i postać dorosłą. Larwa ma trzy pary odnóży, natomiast nimfa i osobnik dorosły – cztery." },
          { t: "steps", items: ["Jajo", "Larwa", "Nimfa", "Dorosły kleszcz"] },
          { t: "p", text: "Kleszcze nie latają i nie skaczą. Najczęściej oczekują na żywiciela na roślinności, a następnie przyczepiają się podczas kontaktu ze skórą lub odzieżą." },
          { t: "p", text: "Ich ślina zawiera substancje ułatwiające pobieranie krwi. Dlatego ukłucie często pozostaje niezauważone." },
          { t: "note", title: "Zapamiętaj", text: "Brak bólu i swędzenia nie oznacza, że kleszcz nie przyczepił się do skóry." },
          { t: "src", text: "ECDC – materiały dotyczące kleszczy i ochrony przed ukłuciami; WHO/Europe – Public health advice on ticks and tick-borne diseases (2025)." },
        ],
      },
      {
        title: "Gdzie i kiedy występują kleszcze?",
        blocks: [
          { t: "p", text: "Kleszcze najczęściej spotykamy w miejscach zapewniających odpowiednią wilgotność i dostęp do żywicieli. Mogą to być lasy liściaste i mieszane, obrzeża lasów, zarośla, łąki oraz tereny zielone w miastach." },
          { t: "p", text: "Wbrew popularnemu przekonaniu kleszcze nie czekają na człowieka na szczytach wysokich drzew. Zwykle znajdują się na niskiej roślinności." },
          { t: "p", text: "W Polsce aktywność kleszczy jest zazwyczaj największa od wiosny do jesieni, ale podczas łagodnej zimy mogą pozostawać aktywne również w chłodniejszych miesiącach. Ich aktywność zależy od temperatury, wilgotności, gatunku i lokalnych warunków środowiskowych." },
          { t: "note", tone: "info", title: "Co to oznacza dla przyszłego leśnika?", text: "Nie wystarczy chronić się przed kleszczami tylko podczas wakacji. Odpowiednie środki ochronne warto stosować zawsze, gdy warunki sprzyjają ich aktywności." },
        ],
      },
      {
        title: "Borelioza – co musisz wiedzieć?",
        blocks: [
          { t: "p", text: "Borelioza z Lyme jest chorobą zakaźną wywoływaną przez bakterie należące do kompleksu Borrelia burgdorferi sensu lato. Do zakażenia człowieka dochodzi przede wszystkim poprzez ukłucie zakażonego kleszcza." },
          { t: "p", text: "Nie każdy kleszcz jest zakażony, a nawet ukłucie zakażonego osobnika nie musi prowadzić do zachorowania." },
          { t: "p", text: "Jednym z najbardziej charakterystycznych wczesnych objawów boreliozy jest rumień wędrujący – powiększająca się zmiana skórna, która zwykle pojawia się w okresie od 3 do 30 dni po zakażeniu." },
          { t: "p", text: "Rumień nie zawsze ma wygląd czerwonego pierścienia z jaśniejszym środkiem. Może być jednolicie zaczerwieniony. Nie każdy pacjent zauważa rumień." },
          { t: "p", text: "Inne możliwe objawy boreliozy obejmują gorączkę, zmęczenie, bóle mięśni i stawów. W niektórych przypadkach choroba może prowadzić do zajęcia układu nerwowego, stawów lub serca." },
          { t: "p", text: "Boreliozę leczy się odpowiednio dobranymi antybiotykami. Wczesne rozpoznanie i właściwe leczenie zmniejszają ryzyko powikłań." },
          { t: "note", tone: "warn", title: "Ważne", text: "Sam dodatni wynik badania przeciwciał nie zawsze oznacza aktywną boreliozę. Wyniki należy interpretować w połączeniu z objawami i wywiadem medycznym." },
          { t: "src", text: "IDSA/AAN/ACR – Clinical Practice Guidelines for Lyme Disease (2020/2021); GIS – Borelioza; CDC – Signs and Symptoms of Untreated Lyme Disease." },
        ],
      },
      {
        title: "Kleszczowe zapalenie mózgu – dlaczego szczepienie ma znaczenie?",
        blocks: [
          { t: "p", text: "Kleszczowe zapalenie mózgu, w skrócie KZM, jest chorobą wirusową atakującą ośrodkowy układ nerwowy." },
          { t: "p", text: "W przeciwieństwie do boreliozy, której przyczyną są bakterie, KZM wywołuje wirus. Nie istnieje swoiste leczenie przeciwwirusowe o udowodnionej skuteczności przeciw KZM. Leczenie polega przede wszystkim na łagodzeniu objawów i podtrzymywaniu funkcji organizmu." },
          { t: "p", text: "Zakażenie może przebiegać bezobjawowo. U części osób występuje początkowo gorączka, zmęczenie, ból głowy i mięśni. U niektórych pacjentów po okresie poprawy rozwija się druga faza choroby, związana z zapaleniem opon mózgowo-rdzeniowych, mózgu lub rdzenia kręgowego." },
          { t: "p", text: "Możliwe są poważne powikłania neurologiczne." },
          { t: "note", tone: "info", title: "Dobra wiadomość", text: "Przeciw KZM dostępne są skuteczne szczepionki. Szczepienie jest szczególnie istotne dla osób regularnie przebywających na terenach występowania wirusa, w tym uczniów odbywających praktyki leśne." },
          { t: "note", tone: "warn", text: "Szczepienie przeciw KZM nie zapobiega boreliozie i nie zastępuje ochrony przed ukłuciami." },
          { t: "src", text: "WHO – Tick-borne encephalitis vaccines: WHO position paper; GIS – Kleszczowe zapalenie mózgu; ECDC – Factsheet about tick-borne encephalitis." },
        ],
      },
      {
        title: "Zmiany klimatu a kleszcze",
        blocks: [
          { t: "p", text: "Zmiany temperatury i wilgotności mogą wpływać na przeżywalność, aktywność i rozmieszczenie kleszczy. Łagodniejsze zimy i dłuższe okresy odpowiednich warunków pogodowych mogą sprzyjać ich aktywności w niektórych regionach." },
          { t: "p", text: "Nie oznacza to jednak, że liczba kleszczy rośnie wszędzie w jednakowym tempie. Znaczenie mają również zmiany użytkowania terenu, liczebność zwierząt będących żywicielami oraz zachowania ludzi." },
          { t: "p", text: "Z perspektywy przyszłego leśnika ważne jest rozumienie, że ryzyko kontaktu z kleszczami wynika z wielu czynników środowiskowych." },
          { t: "src", text: "ECDC – informacje o wektorach chorób i wpływie zmian środowiskowych na choroby przenoszone przez wektory." },
        ],
      },
      {
        title: "Mity i fakty",
        blocks: [
          {
            t: "table",
            rows: [
              ["Kleszcze spadają z drzew", "Mit", "Zwykle przyczepiają się z niskiej roślinności"],
              ["Kleszcze występują tylko latem", "Mit", "Mogą być aktywne także w innych porach roku"],
              ["Każde ukłucie oznacza boreliozę", "Mit", "Nie każdy kleszcz przenosi bakterie"],
              ["Szczepienie przeciw KZM chroni też przed boreliozą", "Mit", "Chroni przed KZM, nie przed boreliozą"],
              ["Po powrocie z lasu należy obejrzeć skórę", "Fakt", "Regularna kontrola ułatwia szybkie wykrycie kleszcza"],
              ["Rumień wędrujący zawsze ma kształt pierścienia", "Mit", "Może mieć różny wygląd"],
            ],
          },
        ],
      },
    ],
    quiz: [
      { q: "Ile par odnóży ma dorosły kleszcz?", options: ["Trzy", "Cztery", "Dwie", "Sześć"], correct: 1 },
      { q: "Gdzie kleszcze najczęściej oczekują na żywiciela?", options: ["Na szczytach drzew", "Na niskiej roślinności", "W powietrzu – skaczą na ofiarę", "Wyłącznie w wodzie"], correct: 1 },
      { q: "Co wywołuje kleszczowe zapalenie mózgu (KZM)?", options: ["Bakteria", "Grzyb", "Wirus", "Pasożyt jelitowy"], correct: 2 },
      { q: "Rumień wędrujący zwykle pojawia się:", options: ["W ciągu kilku minut", "Od 3 do 30 dni po zakażeniu", "Po roku", "Tylko u dzieci"], correct: 1 },
      { q: "Czy szczepienie przeciw KZM chroni przed boreliozą?", options: ["Tak, całkowicie", "Tak, częściowo", "Nie", "Tylko u dorosłych"], correct: 2 },
      { q: "Kiedy w Polsce kleszcze mogą być aktywne?", options: ["Tylko w lipcu i sierpniu", "Głównie od wiosny do jesieni, a w łagodną zimę także wtedy", "Wyłącznie zimą", "Tylko podczas deszczu"], correct: 1 },
    ],
  },
  {
    n: 2,
    roman: "II",
    title: "Chroń siebie",
    lead: "Odzież, repelenty, szczepienie, kontrola ciała i procedura bezpieczeństwa na praktykach.",
    lessons: [
      {
        title: "Ubierz się odpowiednio – ochrona zaczyna się przed wejściem do lasu",
        blocks: [
          { t: "p", text: "Podczas praktyk leśnych odpowiedni ubiór jest jednym z podstawowych elementów profilaktyki ukłuć kleszczy." },
          { t: "p", text: "Kleszcze najczęściej przyczepiają się do człowieka podczas kontaktu z roślinnością. Odzież zakrywająca skórę może ograniczyć liczbę miejsc, w których kleszcz może się wkłuć, ale nie zapewnia całkowitej ochrony." },
          { t: "h", text: "Jak przygotować strój na praktyki?" },
          { t: "list", items: ["Załóż długie spodnie i bluzę lub koszulę z długimi rękawami.", "Wybierz pełne obuwie zamiast sandałów.", "W miarę możliwości włóż nogawki spodni w skarpety.", "Rozważ jasną odzież, na której łatwiej zauważyć przemieszczającego się kleszcza.", "Po powrocie sprawdź również ubrania i wyposażenie terenowe."] },
          { t: "p", text: "Jasna odzież nie odstrasza kleszczy. Jej zaletą jest przede wszystkim ułatwienie ich zauważenia." },
          { t: "note", title: "Zapamiętaj", text: "Nawet prawidłowo dobrany strój nie zwalnia z kontroli ciała po powrocie z lasu." },
          { t: "src", text: "WHO/Europe (2025), ECDC – Personal protective measures against tick bites, GIS – materiały profilaktyczne." },
        ],
      },
      {
        title: "Repelenty – co naprawdę działa?",
        blocks: [
          { t: "p", text: "Repelenty to środki, których zadaniem jest odstraszanie stawonogów, w tym kleszczy." },
          { t: "p", text: "Do substancji stosowanych w preparatach odstraszających kleszcze należą między innymi DEET, ikarydyna (picaridin) i IR3535." },
          { t: "p", text: "Skuteczność konkretnego produktu zależy od jego składu, stężenia, sposobu użycia i czasu, jaki upłynął od aplikacji." },
          { t: "h", text: "Aby bezpiecznie korzystać z repelentu:" },
          { t: "list", items: ["Wybieraj preparat z deklarowanym działaniem przeciw kleszczom.", "Sprawdź dopuszczony wiek użytkownika i instrukcję stosowania.", "Nakładaj preparat tylko na powierzchnie wskazane przez producenta.", "Nie stosuj go na uszkodzoną skórę.", "Ponawiaj aplikację zgodnie z etykietą, a nie według dowolnie ustalonego odstępu czasu."] },
          { t: "note", tone: "warn", text: "Niektóre produkty z permetryną są przeznaczone do impregnacji odzieży i sprzętu. Permetryny przeznaczonej do impregnacji tkanin nie należy stosować bezpośrednio na skórę." },
          { t: "h", text: "A co z naturalnymi olejkami eterycznymi?" },
          { t: "p", text: "Niektóre substancje roślinne wykazują działanie odstraszające, ale skuteczność i czas ochrony zależą od konkretnego preparatu. Nie należy zakładać, że domowa mieszanka olejków zapewnia ochronę porównywalną z przebadanym, dopuszczonym repelentem." },
          { t: "src", text: "IDSA/AAN/ACR (2020), zalecenia dotyczące profilaktyki ukłuć; ECDC; WHO/Europe (2025)." },
        ],
      },
      {
        title: "Szczepienie przeciw KZM – ochrona przed groźną chorobą",
        blocks: [
          { t: "p", text: "Kleszczowe zapalenie mózgu może prowadzić do poważnych powikłań neurologicznych. Szczepienie ochronne jest najważniejszą swoistą metodą zapobiegania tej chorobie." },
          { t: "p", text: "Szczepionki przeciw KZM są inaktywowane, co oznacza, że nie zawierają wirusa zdolnego do wywołania zakażenia." },
          { t: "p", text: "Podstawowy schemat szczepienia obejmuje zazwyczaj trzy dawki, a dla utrzymania ochrony potrzebne są dawki przypominające. Dokładne odstępy zależą od preparatu, wieku i zaleceń medycznych." },
          { t: "p", text: "W przypadku uczniów techników leśnych temat szczepień jest szczególnie ważny ze względu na częsty kontakt ze środowiskiem naturalnym podczas praktyk zawodowych." },
          { t: "note", tone: "warn", title: "Pamiętaj", text: "Szczepienie przeciw KZM nie chroni przed boreliozą, dlatego również osoby zaszczepione powinny stosować repelenty, odzież ochronną i kontrolować skórę." },
          { t: "note", tone: "info", title: "Czy wiesz, że...?", text: "Wirus KZM może być przenoszony także przez spożycie niepasteryzowanego mleka lub jego przetworów pochodzących od zakażonych zwierząt. Dlatego bezpieczeństwo żywności również ma znaczenie w profilaktyce KZM." },
          { t: "src", text: "WHO – Vaccines against tick-borne encephalitis: WHO position paper; GIS – Kleszczowe zapalenie mózgu; ECDC – Tick-borne encephalitis." },
        ],
      },
      {
        title: "Kontrola ciała po powrocie z lasu",
        blocks: [
          { t: "p", text: "Kleszcze mogą przyczepić się do skóry w miejscach trudnych do zauważenia. Dlatego po zakończeniu praktyk terenowych należy dokładnie obejrzeć ciało." },
          { t: "h", text: "Szczególną uwagę zwróć na:" },
          { t: "list", items: ["Skórę głowy i okolice uszu", "Pachy", "Pachwiny", "Zgięcia pod kolanami", "Okolice pasa i pępka", "Plecy i inne trudno dostępne miejsca"] },
          { t: "p", text: "Do obejrzenia trudno dostępnych miejsc można użyć lusterka lub poprosić zaufaną osobę o pomoc. Kontrola powinna odbywać się z poszanowaniem prywatności." },
          { t: "p", text: "Warto również sprawdzić odzież, plecak i pozostałe wyposażenie. Kleszcz może przemieścić się z ubrania na skórę już po zakończeniu zajęć." },
          { t: "note", title: "Zapamiętaj", text: "Kontrola ciała powinna stać się stałym elementem rutyny po praktykach terenowych, podobnie jak czyszczenie sprzętu." },
          { t: "src", text: "WHO/Europe (2025); ECDC – zalecenia dotyczące ochrony osobistej." },
        ],
      },
      {
        title: "Twoja procedura bezpieczeństwa na praktykach",
        blocks: [
          {
            t: "checklist",
            groups: [
              { title: "Przed wyjściem", items: ["Załóż odpowiednią odzież ochronną.", "Zastosuj repelent zgodnie z etykietą.", "Zabierz przyrząd do usuwania kleszczy."] },
              { title: "Podczas praktyk", items: ["Unikaj niepotrzebnego kontaktu z gęstą roślinnością.", "Sprawdzaj odzież podczas przerw.", "Nie ignoruj znalezionego kleszcza."] },
              { title: "Po powrocie", items: ["Obejrzyj dokładnie skórę.", "Sprawdź ubrania i wyposażenie.", "Usuń zauważone kleszcze możliwie szybko."] },
            ],
          },
        ],
      },
    ],
    quiz: [
      { q: "Jaka jest główna zaleta jasnej odzieży?", options: ["Odstrasza kleszcze", "Ułatwia zauważenie kleszcza", "Zabija kleszcze", "Nie ma żadnej zalety"], correct: 1 },
      { q: "Która substancja jest stosowana w repelentach przeciw kleszczom?", options: ["Ikarydyna", "Paracetamol", "Chlorek sodu", "Witamina C"], correct: 0 },
      { q: "Permetrynę do impregnacji tkanin należy:", options: ["Nakładać na skórę", "Stosować na odzież i sprzęt, nie na skórę", "Pić rozcieńczoną", "Stosować na uszkodzoną skórę"], correct: 1 },
      { q: "Jak często ponawiać aplikację repelentu?", options: ["Co 10 minut", "Raz w tygodniu", "Zgodnie z etykietą produktu", "Nigdy"], correct: 2 },
      { q: "Ile dawek obejmuje zazwyczaj podstawowy schemat szczepienia przeciw KZM?", options: ["Jedną", "Dwie", "Trzy", "Pięć"], correct: 2 },
      { q: "Które miejsce wymaga szczególnej uwagi podczas kontroli ciała?", options: ["Paznokcie", "Zgięcia pod kolanami", "Zęby", "Wnętrze dłoni"], correct: 1 },
    ],
  },
  {
    n: 3,
    roman: "III",
    title: "Reaguj właściwie",
    lead: "Usuwanie kleszcza, obserwacja objawów, badania, antybiotyki i przypadki z praktyk.",
    lessons: [
      {
        title: "Znalazłeś kleszcza? Działaj prawidłowo",
        blocks: [
          { t: "p", text: "Znalezienie kleszcza wkłutego w skórę może wywołać niepokój. Najważniejsze jest jednak spokojne i szybkie działanie." },
          { t: "h", text: "Jak usunąć kleszcza?" },
          { t: "list", ordered: true, items: ["Przygotuj cienką pęsetę lub odpowiedni przyrząd do usuwania kleszczy.", "Chwyć kleszcza możliwie blisko skóry, unikając ściskania odwłoka.", "Pociągnij go równomiernie i zdecydowanie, bez gwałtownego szarpania.", "Po usunięciu oczyść miejsce ukłucia środkiem odpowiednim do dezynfekcji skóry.", "Umyj ręce.", "Zanotuj datę ukłucia i obserwuj stan zdrowia."] },
          { t: "note", tone: "warn", text: "Nie należy kleszcza smarować olejem, masłem, lakierem do paznokci ani przypalać. Nie należy też zgniatać go palcami." },
          { t: "p", text: "Jeżeli niewielki fragment aparatu gębowego pozostał w skórze i nie można go łatwo usunąć, nie należy agresywnie rozgrzebywać miejsca ukłucia. W razie wątpliwości lub nasilającego się miejscowego stanu zapalnego warto skonsultować się z pracownikiem ochrony zdrowia." },
          { t: "h", text: "Dlaczego czas ma znaczenie?" },
          { t: "p", text: "W przypadku boreliozy ryzyko przeniesienia bakterii zwykle zwiększa się wraz z czasem żerowania kleszcza. Nie ma jednak jednej granicy czasu, poniżej której zakażenie jest absolutnie niemożliwe." },
          { t: "p", text: "Wirus KZM może zostać przeniesiony wcześniej, dlatego szybkie usunięcie kleszcza nie daje pełnej ochrony przed tą chorobą." },
          { t: "src", text: "WHO/Europe (2025); IDSA/AAN/ACR (2020); ECDC." },
        ],
      },
      {
        title: "Co obserwować po ukłuciu?",
        blocks: [
          { t: "p", text: "Po usunięciu kleszcza nie trzeba zakładać, że doszło do zakażenia. Warto jednak zwracać uwagę na samopoczucie i zmiany skórne przez następne tygodnie." },
          { t: "h", text: "Do objawów wymagających konsultacji lekarskiej należą:" },
          { t: "list", items: ["Powiększająca się zmiana skórna, szczególnie mogąca odpowiadać rumieniowi wędrującemu.", "Gorączka, dreszcze, wyraźne osłabienie.", "Uporczywe bóle głowy lub mięśni.", "Obrzęk dużego stawu.", "Porażenie nerwu twarzowego lub inne objawy neurologiczne."] },
          { t: "p", text: "Niewielkie zaczerwienienie i swędzenie bezpośrednio po ukłuciu mogą być miejscową reakcją skóry i nie muszą oznaczać boreliozy. Jeśli jednak zmiana się powiększa, należy skonsultować ją z lekarzem." },
          { t: "note", tone: "warn", title: "Pilna pomoc", text: "Pilnej pomocy medycznej wymagają między innymi silny ból głowy ze sztywnością karku, zaburzenia świadomości, drgawki lub nagłe objawy neurologiczne." },
          { t: "src", text: "CDC – Signs and Symptoms of Untreated Lyme Disease; ECDC – Tick-borne encephalitis; IDSA/AAN/ACR." },
        ],
      },
      {
        title: "Czy po ukłuciu trzeba wykonać badania?",
        blocks: [
          { t: "p", text: "Nie każde ukłucie kleszcza wymaga badań laboratoryjnych." },
          { t: "p", text: "Badania serologiczne w kierunku boreliozy wykrywają odpowiedź immunologiczną organizmu, czyli przeciwciała. We wczesnym okresie po zakażeniu mogą one jeszcze nie być obecne w ilości pozwalającej na ich wykrycie." },
          { t: "p", text: "Dlatego wykonywanie testu bezpośrednio po ukłuciu u osoby bez objawów nie jest zalecane." },
          { t: "p", text: "Również badanie usuniętego kleszcza na obecność bakterii Borrelia nie jest wiarygodnym sposobem ustalenia, czy człowiek został zakażony." },
          { t: "p", text: "W przypadku typowego rumienia wędrującego rozpoznanie boreliozy jest zwykle kliniczne i nie wymaga oczekiwania na dodatni wynik przeciwciał." },
          { t: "p", text: "Jeśli lekarz podejrzewa inne postacie boreliozy, może zlecić odpowiednią diagnostykę, uwzględniając czas od zakażenia i objawy." },
          { t: "note", title: "Zapamiętaj", text: "Badania wykonuje się wtedy, gdy istnieją wskazania medyczne, a nie tylko dlatego, że znaleziono kleszcza." },
          { t: "src", text: "IDSA/AAN/ACR (2020), diagnostyka boreliozy; AOTMiT – rekomendacja nr 43/2025." },
        ],
      },
      {
        title: "Czy po ukłuciu potrzebny jest antybiotyk?",
        blocks: [
          { t: "p", text: "Antybiotyki są stosowane w leczeniu boreliozy, ale nie powinny być przyjmowane samodzielnie po każdym ukłuciu kleszcza." },
          { t: "p", text: "Amerykańskie wytyczne IDSA dopuszczają profilaktykę antybiotykową po ściśle określonych ukłuciach wysokiego ryzyka. Nie oznacza to jednak, że takie postępowanie należy rutynowo stosować u wszystkich osób ukłutych przez kleszcza w Polsce." },
          { t: "p", text: "Decyzja o ewentualnej profilaktyce lub leczeniu powinna być podejmowana przez lekarza z uwzględnieniem aktualnych zaleceń, wieku pacjenta, rodzaju ekspozycji i stanu klinicznego." },
          { t: "p", text: "Antybiotyki nie zapobiegają kleszczowemu zapaleniu mózgu, ponieważ KZM jest chorobą wirusową." },
          { t: "note", tone: "warn", text: "Nie przyjmuj antybiotyków „na wszelki wypadek” bez zalecenia lekarza." },
          { t: "src", text: "IDSA/AAN/ACR (2020); AOTMiT (2025); WHO – informacje o KZM." },
        ],
      },
      {
        title: "Przypadki z praktyk leśnych",
        blocks: [
          { t: "h", text: "Przypadek 1 – Kleszcz po zajęciach terenowych" },
          { t: "p", text: "Uczeń zauważył kleszcza na łydce po powrocie z lasu. Nie ma gorączki ani innych objawów." },
          { t: "note", tone: "info", title: "Prawidłowe postępowanie", text: "Jak najszybciej usunąć kleszcza, oczyścić skórę i obserwować ewentualne objawy. Samo ukłucie nie oznacza konieczności wykonywania badań lub przyjmowania antybiotyku." },
          { t: "h", text: "Przypadek 2 – Powiększająca się zmiana skórna" },
          { t: "p", text: "Dwa tygodnie po praktykach uczeń zauważył powiększające się zaczerwienienie na nodze." },
          { t: "note", tone: "info", title: "Prawidłowe postępowanie", text: "Skontaktować się z lekarzem, który oceni zmianę i zdecyduje o leczeniu. Nie należy czekać na pojawienie się charakterystycznego pierścienia." },
          { t: "h", text: "Przypadek 3 – Gorączka i silny ból głowy" },
          { t: "p", text: "Kilkanaście dni po pobycie w lesie u ucznia pojawiła się gorączka, silny ból głowy i sztywność karku." },
          { t: "note", tone: "warn", title: "Prawidłowe postępowanie", text: "Pilna ocena medyczna. Objawy mogą wskazywać na poważną chorobę wymagającą szybkiej diagnostyki, niekoniecznie związaną z kleszczami." },
        ],
      },
    ],
    quiz: [
      { q: "Jak prawidłowo chwycić kleszcza?", options: ["Za odwłok, mocno ściskając", "Możliwie blisko skóry, bez ściskania odwłoka", "Palcami, zgniatając go", "Po posmarowaniu masłem"], correct: 1 },
      { q: "Czego NIE należy robić z wkłutym kleszczem?", options: ["Usuwać pęsetą", "Smarować go olejem lub przypalać", "Dezynfekować miejsca po usunięciu", "Notować daty ukłucia"], correct: 1 },
      { q: "Czy badanie przeciwciał tuż po ukłuciu u osoby bez objawów jest zalecane?", options: ["Tak, zawsze", "Nie", "Tylko w weekend", "Tak, jeśli kleszcz był duży"], correct: 1 },
      { q: "Czy antybiotyk zapobiega KZM?", options: ["Tak", "Nie, bo KZM to choroba wirusowa", "Tylko penicylina", "Tylko u dzieci"], correct: 1 },
      { q: "Dwa tygodnie po praktykach pojawia się powiększające się zaczerwienienie. Co robisz?", options: ["Czekam na pierścień", "Biorę antybiotyk samodzielnie", "Kontaktuję się z lekarzem", "Ignoruję"], correct: 2 },
      { q: "Silny ból głowy ze sztywnością karku wymaga:", options: ["Odpoczynku w domu", "Pilnej pomocy medycznej", "Wypicia herbaty", "Badania kleszcza"], correct: 1 },
    ],
  },
];
