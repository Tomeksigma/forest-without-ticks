import os
import json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src")
CONTENT_DIR = os.path.join(SRC, "content")

def block_to_md(b: dict) -> str:
    t = b.get("t")
    if t == "p":
        return b.get("text", "") + "\n\n"
    elif t == "h":
        return f"### {b.get('text', '')}\n\n"
    elif t == "list":
        ordered = b.get("ordered", False)
        items = b.get("items", [])
        lines = []
        for i, item in enumerate(items, 1):
            prefix = f"{i}." if ordered else "-"
            lines.append(f"{prefix} {item}")
        return "\n".join(lines) + "\n\n"
    elif t == "steps":
        items = b.get("items", [])
        lines = [f"{i}. {item}" for i, item in enumerate(items, 1)]
        return "\n".join(lines) + "\n\n"
    elif t == "note":
        title = b.get("title")
        text = b.get("text", "")
        tone = b.get("tone")
        tag = "⚠️ " if tone == "warn" else ("ℹ️ " if tone == "info" else "")
        if title:
            return f"> **{tag}{title}**\n> \n> {text}\n\n"
        return f"> {tag}{text}\n\n"
    elif t == "table":
        rows = b.get("rows", [])
        out = ["| Przekonanie | Typ | Wyjaśnienie |", "|---|:---:|---|"]
        for r in rows:
            out.append(f"| {r[0]} | **{r[1]}** | {r[2]} |")
        return "\n".join(out) + "\n\n"
    elif t == "checklist":
        groups = b.get("groups", [])
        out = []
        for g in groups:
            out.append(f"#### {g.get('title', '')}")
            for item in g.get("items", []):
                out.append(f"- [ ] {item}")
            out.append("")
        return "\n".join(out) + "\n"
    elif t == "src":
        return f"_{b.get('text', '')}_\n\n"
    return ""

def escape_sql_tag(val: str, tag: str = "txt") -> str:
    return f"${tag}${val}${tag}$"

modules_data = [
    {
        "n": 1,
        "roman": "I",
        "title": "Poznaj zagrożenie",
        "lead": "Biologia kleszcza, miejsca występowania, borelioza, KZM i najczęstsze mity.",
        "lessons": [
            {
                "title": "Kleszcz – mały pajęczak, duże znaczenie",
                "blocks": [
                    {"t": "p", "text": "Kleszcze to pajęczaki należące do podgromady roztoczy. W odróżnieniu od owadów dorosłe kleszcze mają cztery pary odnóży. Żywią się krwią kręgowców, między innymi ssaków i ptaków."},
                    {"t": "p", "text": "W Polsce jednym z najważniejszych gatunków z punktu widzenia zdrowia człowieka jest kleszcz pospolity (Ixodes ricinus). Występuje w lasach, na łąkach, w parkach i ogrodach."},
                    {"t": "p", "text": "Cykl rozwojowy kleszcza obejmuje cztery stadia: jajo, larwę, nimfę i postać dorosłą. Larwa ma trzy pary odnóży, natomiast nimfa i osobnik dorosły – cztery."},
                    {"t": "steps", "items": ["Jajo", "Larwa", "Nimfa", "Dorosły kleszcz"]},
                    {"t": "p", "text": "Kleszcze nie latają i nie skaczą. Najczęściej oczekują na żywiciela na roślinności, a następnie przyczepiają się podczas kontaktu ze skórą lub odzieżą."},
                    {"t": "p", "text": "Ich ślina zawiera substancje ułatwiające pobieranie krwi. Dlatego ukłucie często pozostaje niezauważone."},
                    {"t": "note", "title": "Zapamiętaj", "text": "Brak bólu i swędzenia nie oznacza, że kleszcz nie przyczepił się do skóry."},
                    {"t": "src", "text": "ECDC – materiały dotyczące kleszczy i ochrony przed ukłuciami; WHO/Europe – Public health advice on ticks and tick-borne diseases (2025)."}
                ]
            },
            {
                "title": "Gdzie i kiedy występują kleszcze?",
                "blocks": [
                    {"t": "p", "text": "Kleszcze najczęściej spotykamy w miejscach zapewniających odpowiednią wilgotność i dostęp do żywicieli. Mogą to być lasy liściaste i mieszane, obrzeża lasów, zarośla, łąki oraz tereny zielone w miastach."},
                    {"t": "p", "text": "Wbrew popularnemu przekonaniu kleszcze nie czekają na człowieka na szczytach wysokich drzew. Zwykle znajdują się na niskiej roślinności."},
                    {"t": "p", "text": "W Polsce aktywność kleszczy jest zazwyczaj największa od wiosny do jesieni, ale podczas łagodnej zimy mogą pozostawać aktywne również w chłodniejszych miesiącach. Ich aktywność zależy od temperatury, wilgotności, gatunku i lokalnych warunków środowiskowych."},
                    {"t": "note", "tone": "info", "title": "Co to oznacza dla przyszłego leśnika?", "text": "Nie wystarczy chronić się przed kleszczami tylko podczas wakacji. Odpowiednie środki ochronne warto stosować zawsze, gdy warunki sprzyjają ich aktywności."}
                ]
            },
            {
                "title": "Borelioza – co musisz wiedzieć?",
                "blocks": [
                    {"t": "p", "text": "Borelioza z Lyme jest chorobą zakaźną wywoływaną przez bakterie należące do kompleksu Borrelia burgdorferi sensu lato. Do zakażenia człowieka dochodzi przede wszystkim poprzez ukłucie zakażonego kleszcza."},
                    {"t": "p", "text": "Nie każdy kleszcz jest zakażony, a nawet ukłucie zakażonego osobnika nie musi prowadzić do zachorowania."},
                    {"t": "p", "text": "Jednym z najbardziej charakterystycznych wczesnych objawów boreliozy jest rumień wędrujący – powiększająca się zmiana skórna, która zwykle pojawia się w okresie od 3 do 30 dni po zakażeniu."},
                    {"t": "p", "text": "Rumień nie zawsze ma wygląd czerwonego pierścienia z jaśniejszym środkiem. Może być jednolicie zaczerwieniony. Nie każdy pacjent zauważa rumień."},
                    {"t": "p", "text": "Inne możliwe objawy boreliozy obejmują gorączkę, zmęczenie, bóle mięśni i stawów. W niektórych przypadkach choroba może prowadzić do zajęcia układu nerwowego, stawów lub serca."},
                    {"t": "p", "text": "Boreliozę leczy się odpowiednio dobranymi antybiotykami. Wczesne rozpoznanie i właściwe leczenie zmniejszają ryzyko powikłań."},
                    {"t": "note", "tone": "warn", "title": "Ważne", "text": "Sam dodatni wynik badania przeciwciał nie zawsze oznacza aktywną boreliozę. Wyniki należy interpretować w połączeniu z objawami i wywiadem medycznym."},
                    {"t": "src", "text": "IDSA/AAN/ACR – Clinical Practice Guidelines for Lyme Disease (2020/2021); GIS – Borelioza; CDC – Signs and Symptoms of Untreated Lyme Disease."}
                ]
            },
            {
                "title": "Kleszczowe zapalenie mózgu – dlaczego szczepienie ma znaczenie?",
                "blocks": [
                    {"t": "p", "text": "Kleszczowe zapalenie mózgu, w skrócie KZM, jest chorobą wirusową atakującą ośrodkowy układ nerwowy."},
                    {"t": "p", "text": "W przeciwieństwie do boreliozy, której przyczyną są bakterie, KZM wywołuje wirus. Nie istnieje swoiste leczenie przeciwwirusowe o udowodnionej skuteczności przeciw KZM. Leczenie polega przede wszystkim na łagodzeniu objawów i podtrzymywaniu funkcji organizmu."},
                    {"t": "p", "text": "Zakażenie może przebiegać bezobjawowo. U części osób występuje początkowo gorączka, zmęczenie, ból głowy i mięśni. U niektórych pacjentów po okresie poprawy rozwija się druga faza choroby, związana z zapaleniem opon mózgowo-rdzeniowych, mózgu lub rdzenia kręgowego."},
                    {"t": "p", "text": "Możliwe są poważne powikłania neurologiczne."},
                    {"t": "note", "tone": "info", "title": "Dobra wiadomość", "text": "Przeciw KZM dostępne są skuteczne szczepionki. Szczepienie jest szczególnie istotne dla osób regularnie przebywających na terenach występowania wirusa, w tym uczniów odbywających praktyki leśne."},
                    {"t": "note", "tone": "warn", "text": "Szczepienie przeciw KZM nie zapobiega boreliozie i nie zastępuje ochrony przed ukłuciami."},
                    {"t": "src", "text": "WHO – Tick-borne encephalitis vaccines: WHO position paper; GIS – Kleszczowe zapalenie mózgu; ECDC – Factsheet about tick-borne encephalitis."}
                ]
            },
            {
                "title": "Zmiany klimatu a kleszcze",
                "blocks": [
                    {"t": "p", "text": "Zmiany temperatury i wilgotności mogą wpływać na przeżywalność, aktywność i rozmieszczenie kleszczy. Łagodniejsze zimy i dłuższe okresy odpowiednich warunków pogodowych mogą sprzyjać ich aktywności w niektórych regionach."},
                    {"t": "p", "text": "Nie oznacza to jednak, że liczba kleszczy rośnie wszędzie w jednakowym tempie. Znaczenie mają również zmiany użytkowania terenu, liczebność zwierząt będących żywicielami oraz zachowania ludzi."},
                    {"t": "p", "text": "Z perspektywy przyszłego leśnika ważne jest rozumienie, że ryzyko kontaktu z kleszczami wynika z wielu czynników środowiskowych."},
                    {"t": "src", "text": "ECDC – informacje o wektorach chorób i wpływie zmian środowiskowych na choroby przenoszone przez wektory."}
                ]
            },
            {
                "title": "Mity i fakty",
                "blocks": [
                    {
                        "t": "table",
                        "rows": [
                            ["Kleszcze spadają z drzew", "Mit", "Zwykle przyczepiają się z niskiej roślinności"],
                            ["Kleszcze występują tylko latem", "Mit", "Mogą być aktywne także w innych porach roku"],
                            ["Każde ukłucie oznacza boreliozę", "Mit", "Nie każdy kleszcz przenosi bakterie"],
                            ["Szczepienie przeciw KZM chroni też przed boreliozą", "Mit", "Chroni przed KZM, nie przed boreliozą"],
                            ["Po powrocie z lasu należy obejrzeć skórę", "Fakt", "Regularna kontrola ułatwia szybkie wykrycie kleszcza"],
                            ["Rumień wędrujący zawsze ma kształt pierścienia", "Mit", "Może mieć różny wygląd"]
                        ]
                    }
                ]
            }
        ],
        "quiz": [
            {"q": "Ile par odnóży ma dorosły kleszcz?", "options": ["Trzy", "Cztery", "Dwie", "Sześć"], "correct": 1},
            {"q": "Gdzie kleszcze najczęściej oczekują na żywiciela?", "options": ["Na szczytach drzew", "Na niskiej roślinności", "W powietrzu – skaczą na ofiarę", "Wyłącznie w wodzie"], "correct": 1},
            {"q": "Co wywołuje kleszczowe zapalenie mózgu (KZM)?", "options": ["Bakteria", "Grzyb", "Wirus", "Pasożyt jelitowy"], "correct": 2},
            {"q": "Rumień wędrujący zwykle pojawia się:", "options": ["W ciągu kilku minut", "Od 3 do 30 dni po zakażeniu", "Po roku", "Tylko u dzieci"], "correct": 1},
            {"q": "Czy szczepienie przeciw KZM chroni przed boreliozą?", "options": ["Tak, całkowicie", "Tak, częściowo", "Nie", "Tylko u dorosłych"], "correct": 2},
            {"q": "Kiedy w Polsce kleszcze mogą być aktywne?", "options": ["Tylko w lipcu i sierpniu", "Głównie od wiosny do jesieni, a w łagodną zimę także wtedy", "Wyłącznie zimą", "Tylko podczas deszczu"], "correct": 1}
        ]
    },
    {
        "n": 2,
        "roman": "II",
        "title": "Chroń siebie",
        "lead": "Odzież, repelenty, szczepienie, kontrola ciała i procedura bezpieczeństwa na praktykach.",
        "lessons": [
            {
                "title": "Ubierz się odpowiednio – ochrona zaczyna się przed wejściem do lasu",
                "blocks": [
                    {"t": "p", "text": "Podczas praktyk leśnych odpowiedni ubiór jest jednym z podstawowych elementów profilaktyki ukłuć kleszczy."},
                    {"t": "p", "text": "Kleszcze najczęściej przyczepiają się do człowieka podczas kontaktu z roślinnością. Odzież zakrywająca skórę może ograniczyć liczbę miejsc, w których kleszcz może się wkłuć, ale nie zapewnia całkowitej ochrony."},
                    {"t": "h", "text": "Jak przygotować strój na praktyki?"},
                    {"t": "list", "items": ["Załóż długie spodnie i bluzę lub koszulę z długimi rękawami.", "Wybierz pełne obuwie zamiast sandałów.", "W miarę możliwości włóż nogawki spodni w skarpety.", "Rozważ jasną odzież, na której łatwiej zauważyć przemieszczającego się kleszcza.", "Po powrocie sprawdź również ubrania i wyposażenie terenowe."]},
                    {"t": "p", "text": "Jasna odzież nie odstrasza kleszczy. Jej zaletą jest przede wszystkim ułatwienie ich zauważenia."},
                    {"t": "note", "title": "Zapamiętaj", "text": "Nawet prawidłowo dobrany strój nie zwalnia z kontroli ciała po powrocie z lasu."},
                    {"t": "src", "text": "WHO/Europe (2025), ECDC – Personal protective measures against tick bites, GIS – materiały profilaktyczne."}
                ]
            },
            {
                "title": "Repelenty – co naprawdę działa?",
                "blocks": [
                    {"t": "p", "text": "Repelenty to środki, których zadaniem jest odstraszanie stawonogów, w tym kleszczy."},
                    {"t": "p", "text": "Do substancji stosowanych w preparatach odstraszających kleszcze należą między innymi DEET, ikarydyna (picaridin) i IR3535."},
                    {"t": "p", "text": "Skuteczność konkretnego produktu zależy od jego składu, stężenia, sposobu użycia i czasu, jaki upłynął od aplikacji."},
                    {"t": "h", "text": "Aby bezpiecznie korzystać z repelentu:"},
                    {"t": "list", "items": ["Wybieraj preparat z deklarowanym działaniem przeciw kleszczom.", "Sprawdź dopuszczony wiek użytkownika i instrukcję stosowania.", "Nakładaj preparat tylko na powierzchnie wskazane przez producenta.", "Nie stosuj go na uszkodzoną skórę.", "Ponawiaj aplikację zgodnie z etykietą, a nie według dowolnie ustalonego odstępu czasu."]},
                    {"t": "note", "tone": "warn", "text": "Niektóre produkty z permetryną są przeznaczone do impregnacji odzieży i sprzętu. Permetryny przeznaczonej do impregnacji tkanin nie należy stosować bezpośrednio na skórę."},
                    {"t": "h", "text": "A co z naturalnymi olejkami eterycznymi?"},
                    {"t": "p", "text": "Niektóre substancje roślinne wykazują działanie odstraszające, ale skuteczność i czas ochrony zależą od konkretnego preparatu. Nie należy zakładać, że domowa mieszanka olejków zapewnia ochronę porównywalną z przebadanym, dopuszczonym repelentem."},
                    {"t": "src", "text": "IDSA/AAN/ACR (2020), zalecenia dotyczące profilaktyki ukłuć; ECDC; WHO/Europe (2025)."}
                ]
            },
            {
                "title": "Szczepienie przeciw KZM – ochrona przed groźną chorobą",
                "blocks": [
                    {"t": "p", "text": "Kleszczowe zapalenie mózgu może prowadzić do poważnych powikłań neurologicznych. Szczepienie ochronne jest najważniejszą swoistą metodą zapobiegania tej chorobie."},
                    {"t": "p", "text": "Szczepionki przeciw KZM są inaktywowane, co oznacza, że nie zawierają wirusa zdolnego do wywołania zakażenia."},
                    {"t": "p", "text": "Podstawowy schemat szczepienia obejmuje zazwyczaj trzy dawki, a dla utrzymania ochrony potrzebne są dawki przypominające. Dokładne odstępy zależą od preparatu, wieku i zaleceń medycznych."},
                    {"t": "p", "text": "W przypadku uczniów techników leśnych temat szczepień jest szczególnie ważny ze względu na częsty kontakt ze środowiskiem naturalnym podczas praktyk zawodowych."},
                    {"t": "note", "tone": "warn", "title": "Pamiętaj", "text": "Szczepienie przeciw KZM nie chroni przed boreliozą, dlatego również osoby zaszczepione powinny stosować repelenty, odzież ochronną i kontrolować skórę."},
                    {"t": "note", "tone": "info", "title": "Czy wiesz, że...?", "text": "Wirus KZM może być przenoszony także przez spożycie niepasteryzowanego mleka lub jego przetworów pochodzących od zakażonych zwierząt. Dlatego bezpieczeństwo żywności również ma znaczenie w profilaktyce KZM."},
                    {"t": "src", "text": "WHO – Vaccines against tick-borne encephalitis: WHO position paper; GIS – Kleszczowe zapalenie mózgu; ECDC – Tick-borne encephalitis."}
                ]
            },
            {
                "title": "Kontrola ciała po powrocie z lasu",
                "blocks": [
                    {"t": "p", "text": "Kleszcze mogą przyczepić się do skóry w miejscach trudnych do zauważenia. Dlatego po zakończeniu praktyk terenowych należy dokładnie obejrzeć ciało."},
                    {"t": "h", "text": "Szczególną uwagę zwróć na:"},
                    {"t": "list", "items": ["Skórę głowy i okolice uszu", "Pachy", "Pachwiny", "Zgięcia pod kolanami", "Okolice pasa i pępka", "Plecy i inne trudno dostępne miejsca"]},
                    {"t": "p", "text": "Do obejrzenia trudno dostępnych miejsc można użyć lusterka lub poprosić zaufaną osobę o pomoc. Kontrola powinna odbywać się z poszanowaniem prywatności."},
                    {"t": "p", "text": "Warto również sprawdzić odzież, plecak i pozostałe wyposażenie. Kleszcz może przemieścić się z ubrania na skórę już po zakończeniu zajęć."},
                    {"t": "note", "title": "Zapamiętaj", "text": "Kontrola ciała powinna stać się stałym elementem rutyny po praktykach terenowych, podobnie jak czyszczenie sprzętu."},
                    {"t": "src", "text": "WHO/Europe (2025); ECDC – zalecenia dotyczące ochrony osobistej."}
                ]
            },
            {
                "title": "Twoja procedura bezpieczeństwa na praktykach",
                "blocks": [
                    {
                        "t": "checklist",
                        "groups": [
                            {"title": "Przed wyjściem", "items": ["Załóż odpowiednią odzież ochronną.", "Zastosuj repelent zgodnie z etykietą.", "Zabierz przyrząd do usuwania kleszczy."]},
                            {"title": "Podczas praktyk", "items": ["Unikaj niepotrzebnego kontaktu z gęstą roślinnością.", "Sprawdzaj odzież podczas przerw.", "Nie ignoruj znalezionego kleszcza."]},
                            {"title": "Po powrocie", "items": ["Obejrzyj dokładnie skórę.", "Sprawdź ubrania i wyposażenie.", "Usuń zauważone kleszcze możliwie szybko."]}
                        ]
                    }
                ]
            }
        ],
        "quiz": [
            {"q": "Jaka jest główna zaleta jasnej odzieży?", "options": ["Odstrasza kleszcze", "Ułatwia zauważenie kleszcza", "Zabija kleszcze", "Nie ma żadnej zalety"], "correct": 1},
            {"q": "Która substancja jest stosowana w repelentach przeciw kleszczom?", "options": ["Ikarydyna", "Paracetamol", "Chlorek sodu", "Witamina C"], "correct": 0},
            {"q": "Permetrynę do impregnacji tkanin należy:", "options": ["Nakładać na skórę", "Stosować na odzież i sprzęt, nie na skórę", "Pić rozcieńczoną", "Stosować na uszkodzoną skórę"], "correct": 1},
            {"q": "Jak często ponawiać aplikację repelentu?", "options": ["Co 10 minut", "Raz w tygodniu", "Zgodnie z etykietą produktu", "Nigdy"], "correct": 2},
            {"q": "Ile dawek obejmuje zazwyczaj podstawowy schemat szczepienia przeciw KZM?", "options": ["Jedną", "Dwie", "Trzy", "Pięć"], "correct": 2},
            {"q": "Które miejsce wymaga szczególnej uwagi podczas kontroli ciała?", "options": ["Paznokcie", "Zgięcia pod kolanami", "Zęby", "Wnętrze dłoni"], "correct": 1}
        ]
    },
    {
        "n": 3,
        "roman": "III",
        "title": "Reaguj właściwie",
        "lead": "Usuwanie kleszcza, obserwacja objawów, badania, antybiotyki i przypadki z praktyk.",
        "lessons": [
            {
                "title": "Znalazłeś kleszcza? Działaj prawidłowo",
                "blocks": [
                    {"t": "p", "text": "Znalezienie kleszcza wkłutego w skórę może wywołać niepokój. Najważniejsze jest jednak spokojne i szybkie działanie."},
                    {"t": "h", "text": "Jak usunąć kleszcza?"},
                    {"t": "list", "ordered": True, "items": ["Przygotuj cienką pęsetę lub odpowiedni przyrząd do usuwania kleszczy.", "Chwyć kleszcza możliwie blisko skóry, unikając ściskania odwłoka.", "Pociągnij go równomiernie i zdecydowanie, bez gwałtownego szarpania.", "Po usunięciu oczyść miejsce ukłucia środkiem odpowiednim do dezynfekcji skóry.", "Umyj ręce.", "Zanotuj datę ukłucia i obserwuj stan zdrowia."]},
                    {"t": "note", "tone": "warn", "text": "Nie należy kleszcza smarować olejem, masłem, lakierem do paznokci ani przypalać. Nie należy też zgniatać go palcami."},
                    {"t": "p", "text": "Jeżeli niewielki fragment aparatu gębowego pozostał w skórze i nie można go łatwo usunąć, nie należy agresywnie rozgrzebywać miejsca ukłucia. W razie wątpliwości lub nasilającego się miejscowego stanu zapalnego warto skonsultować się z pracownikiem ochrony zdrowia."},
                    {"t": "h", "text": "Dlaczego czas ma znaczenie?"},
                    {"t": "p", "text": "W przypadku boreliozy ryzyko przeniesienia bakterii zwykle zwiększa się wraz z czasem żerowania kleszcza. Nie ma jednak jednej granicy czasu, poniżej której zakażenie jest absolutnie niemożliwe."},
                    {"t": "p", "text": "Wirus KZM może zostać przeniesiony wcześniej, dlatego szybkie usunięcie kleszcza nie daje pełnej ochrony przed tą chorobą."},
                    {"t": "src", "text": "WHO/Europe (2025); IDSA/AAN/ACR (2020); ECDC."}
                ]
            },
            {
                "title": "Co obserwować po ukłuciu?",
                "blocks": [
                    {"t": "p", "text": "Po usunięciu kleszcza nie trzeba zakładać, że doszło do zakażenia. Warto jednak zwracać uwagę na samopoczucie i zmiany skórne przez następne tygodnie."},
                    {"t": "h", "text": "Do objawów wymagających konsultacji lekarskiej należą:"},
                    {"t": "list", "items": ["Powiększająca się zmiana skórna, szczególnie mogąca odpowiadać rumieniowi wędrującemu.", "Gorączka, dreszcze, wyraźne osłabienie.", "Uporczywe bóle głowy lub mięśni.", "Obrzęk dużego stawu.", "Porażenie nerwu twarzowego lub inne objawy neurologiczne."]},
                    {"t": "p", "text": "Niewielkie zaczerwienienie i swędzenie bezpośrednio po ukłuciu mogą być miejscową reakcją skóry i nie muszą oznaczać boreliozy. Jeśli jednak zmiana się powiększa, należy skonsultować ją z lekarzem."},
                    {"t": "note", "tone": "warn", "title": "Pilna pomoc", "text": "Pilnej pomocy medycznej wymagają między innymi silny ból głowy ze sztywnością karku, zaburzenia świadomości, drgawki lub nagłe objawy neurologiczne."},
                    {"t": "src", "text": "CDC – Signs and Symptoms of Untreated Lyme Disease; ECDC – Tick-borne encephalitis; IDSA/AAN/ACR."}
                ]
            },
            {
                "title": "Czy po ukłuciu trzeba wykonać badania?",
                "blocks": [
                    {"t": "p", "text": "Nie każde ukłucie kleszcza wymaga badań laboratoryjnych."},
                    {"t": "p", "text": "Badania serologiczne w kierunku boreliozy wykrywają odpowiedź immunologiczną organizmu, czyli przeciwciała. We wczesnym okresie po zakażeniu mogą one jeszcze nie być obecne w ilości pozwalającej na ich wykrycie."},
                    {"t": "p", "text": "Dlatego wykonywanie testu bezpośrednio po ukłuciu u osoby bez objawów nie jest zalecane."},
                    {"t": "p", "text": "Również badanie usuniętego kleszcza na obecność bakterii Borrelia nie jest wiarygodnym sposobem ustalenia, czy człowiek został zakażony."},
                    {"t": "p", "text": "W przypadku typowego rumienia wędrującego rozpoznanie boreliozy jest zwykle kliniczne i nie wymaga oczekiwania na dodatni wynik przeciwciał."},
                    {"t": "p", "text": "Jeśli lekarz podejrzewa inne postacie boreliozy, może zlecić odpowiednią diagnostykę, uwzględniając czas od zakażenia i objawy."},
                    {"t": "note", "title": "Zapamiętaj", "text": "Badania wykonuje się wtedy, gdy istnieją wskazania medyczne, a nie tylko dlatego, że znaleziono kleszcza."},
                    {"t": "src", "text": "IDSA/AAN/ACR (2020), diagnostyka boreliozy; AOTMiT – rekomendacja nr 43/2025."}
                ]
            },
            {
                "title": "Czy po ukłuciu potrzebny jest antybiotyk?",
                "blocks": [
                    {"t": "p", "text": "Antybiotyki są stosowane w leczeniu boreliozy, ale nie powinny być przyjmowane samodzielnie po każdym ukłuciu kleszcza."},
                    {"t": "p", "text": "Amerykańskie wytyczne IDSA dopuszczają profilaktykę antybiotykową po ściśle określonych ukłuciach wysokiego ryzyka. Nie oznacza to jednak, że takie postępowanie należy rutynowo stosować u wszystkich osób ukłutych przez kleszcza w Polsce."},
                    {"t": "p", "text": "Decyzja o ewentualnej profilaktyce lub leczeniu powinna być podejmowana przez lekarza z uwzględnieniem aktualnych zaleceń, wieku pacjenta, rodzaju ekspozycji i stanu klinicznego."},
                    {"t": "p", "text": "Antybiotyki nie zapobiegają kleszczowemu zapaleniu mózgu, ponieważ KZM jest chorobą wirusową."},
                    {"t": "note", "tone": "warn", "text": "Nie przyjmuj antybiotyków „na wszelki wypadek” bez zalecenia lekarza."},
                    {"t": "src", "text": "IDSA/AAN/ACR (2020); AOTMiT (2025); WHO – informacje o KZM."}
                ]
            },
            {
                "title": "Przypadki z praktyk leśnych",
                "blocks": [
                    {"t": "h", "text": "Przypadek 1 – Kleszcz po zajęciach terenowych"},
                    {"t": "p", "text": "Uczeń zauważył kleszcza na łydce po powrocie z lasu. Nie ma gorączki ani innych objawów."},
                    {"t": "note", "tone": "info", "title": "Prawidłowe postępowanie", "text": "Jak najszybciej usunąć kleszcza, oczyścić skórę i obserwować ewentualne objawy. Samo ukłucie nie oznacza konieczności wykonywania badań lub przyjmowania antybiotyku."},
                    {"t": "h", "text": "Przypadek 2 – Powiększająca się zmiana skórna"},
                    {"t": "p", "text": "Dwa tygodnie po praktykach uczeń zauważył powiększające się zaczerwienienie na nodze."},
                    {"t": "note", "tone": "info", "title": "Prawidłowe postępowanie", "text": "Skontaktować się z lekarzem, który oceni zmianę i zdecyduje o leczeniu. Nie należy czekać na pojawienie się charakterystycznego pierścienia."},
                    {"t": "h", "text": "Przypadek 3 – Gorączka i silny ból głowy"},
                    {"t": "p", "text": "Kilkanaście dni po pobycie w lesie u ucznia pojawiła się gorączka, silny ból głowy i sztywność karku."},
                    {"t": "note", "tone": "warn", "title": "Prawidłowe postępowanie", "text": "Pilna ocena medyczna. Objawy mogą wskazywać na poważną chorobę wymagającą szybkiej diagnostyki, niekoniecznie związaną z kleszczami."}
                ]
            }
        ],
        "quiz": [
            {"q": "Jak prawidłowo chwycić kleszcza?", "options": ["Za odwłok, mocno ściskając", "Możliwie blisko skóry, bez ściskania odwłoka", "Palcami, zgniatając go", "Po posmarowaniu masłem"], "correct": 1},
            {"q": "Czego NIE należy robić z wkłutym kleszczem?", "options": ["Usuwać pęsetą", "Smarować go olejem lub przypalać", "Dezynfekować miejsca po usunięciu", "Notować daty ukłucia"], "correct": 1},
            {"q": "Czy badanie przeciwciał tuż po ukłuciu u osoby bez objawów jest zalecane?", "options": ["Tak, zawsze", "Nie", "Tylko w weekend", "Tak, jeśli kleszcz był duży"], "correct": 1},
            {"q": "Czy antybiotyk zapobiega KZM?", "options": ["Tak", "Nie, bo KZM to choroba wirusowa", "Tylko penicylina", "Tylko u dzieci"], "correct": 1},
            {"q": "Dwa tygodnie po praktykach pojawia się powiększające się zaczerwienienie. Co robisz?", "options": ["Czekam na pierścień", "Biorę antybiotyk samodzielnie", "Kontaktuję się z lekarzem", "Ignoruję"], "correct": 2},
            {"q": "Silny ból głowy ze sztywnością karku wymaga:", "options": ["Odpoczynku w domu", "Pilnej pomocy medycznej", "Wypicia herbaty", "Badania kleszcza"], "correct": 1}
        ]
    }
]

facts_data = [
    {
        "id": 1,
        "category": "biologia",
        "question": "Czy kleszcz jest owadem?",
        "answer": "Nie. Kleszcze są pajęczakami. Dorosłe osobniki mają osiem odnóży, a larwy sześć.",
        "explanation": "Kleszcze należą do pajęczaków (Arachnida), razem z pająkami i roztoczami. Owady mają trzy pary odnóży, a dorosłe kleszcze — cztery pary; larwa kleszcza ma dopiero trzy pary.",
        "meaning": "Nie myl kleszczy z owadami — to wpływa na rozumienie ich biologii i sposobu żerowania.",
        "sourceName": "ECDC – disease vectors",
        "sourceUrl": "https://www.ecdc.europa.eu/en/disease-vectors",
        "guess": {"options": ["Tak", "Nie — to pajęczak", "To mięczak"], "correct": 1}
    },
    {
        "id": 2,
        "category": "biologia",
        "question": "Czy kleszcze skaczą z drzew?",
        "answer": "Nie. Kleszcze nie skaczą i nie latają. Zwykle oczekują na żywiciela na roślinności, wykorzystując zachowanie nazywane questing.",
        "explanation": "Kleszcz wspięty na trawę lub krzew wyciąga przednie odnóża i czeka na kontakt z przechodzącym żywicielem (questing). Nie spada celowo z gałęzi drzew.",
        "meaning": "Kontakt z trawą i krzewami prowadzi do ukłucia — kleszcz czeka właśnie tam, a nie na drzewie.",
        "sourceName": "ECDC – disease vectors",
        "sourceUrl": "https://www.ecdc.europa.eu/en/disease-vectors",
        "guess": {"options": ["Nie — nie skaczą ani nie latają", "Tak, czekają na gałęziach", "Skaczą tylko dorosłe"], "correct": 0}
    },
    {
        "id": 3,
        "category": "biologia",
        "question": "Jak kleszcz wykrywa człowieka?",
        "answer": "Wykorzystuje narządy zmysłowe, między innymi narząd Hallera na pierwszej parze odnóży, który pomaga odbierać bodźce środowiskowe.",
        "explanation": "Narząd Hallera to struktura zmysłowa na przednich odnóżach kleszcza, odbierająca bodźce chemiczne i fizyczne z otoczenia. Pomaga kleszczowi namierzyć żywiciela bez wzroku.",
        "meaning": "Kleszcz wykrywa żywiciela bez wzroku podobnego do ludzkiego — nie da się go „oszukać” samym cichym chodzeniem.",
        "sourceName": "ECDC – disease vectors",
        "sourceUrl": "https://www.ecdc.europa.eu/en/disease-vectors",
        "guess": {"options": ["Widzi go dobrym wzrokiem", "Narządem Hallera na odnóżach", "Słyszy kroki"], "correct": 1}
    },
    {
        "id": 4,
        "category": "biologia",
        "question": "Dlaczego małe kleszcze są trudne do zauważenia?",
        "answer": "Nimfy są niewielkie, ale również mogą przenosić patogeny.",
        "explanation": "Nimfa kleszcza pospolitego jest wielkości znacznie mniejszej od dorosłej samicy, a mimo to może przenosić patogeny. To właśnie łatwo przeoczone nimfy odpowiadają za dużą część ukłuć.",
        "meaning": "Po praktykach należy dokładnie sprawdzić całe ciało — mały kleszcz jest równie groźny jak duży.",
        "sourceName": "NIZP PZH–PIB",
        "sourceUrl": "https://www.pzh.gov.pl/",
        "guess": {"options": ["Są przezroczyste", "Umieją się kamuflować", "Nimfy są bardzo małe, choć mogą przenosić patogeny"], "correct": 2}
    },
    {
        "id": 5,
        "category": "biologia",
        "question": "Czy kleszcz rośnie podczas pobierania krwi?",
        "answer": "Tak. Podczas żerowania ciało kleszcza może znacznie zwiększyć objętość.",
        "explanation": "W trakcie żerowania kleszcz pobiera dużą ilość krwi, a jego ciało potrafi zwiększyć objętość wielokrotnie. W miarę napełniania staje się coraz bardziej widoczny.",
        "meaning": "Nie czekaj, aż kleszcz napęcznieje — usuń go możliwie szybko, zaraz po zauważeniu.",
        "sourceName": "ECDC – disease vectors",
        "sourceUrl": "https://www.ecdc.europa.eu/en/disease-vectors",
        "guess": {"options": ["Nie, jego wielkość jest stała", "Tylko samce rosną", "Tak — może znacznie zwiększyć objętość ciała"], "correct": 2}
    },
    {
        "id": 6,
        "category": "srodowisko",
        "question": "Dlaczego kleszcze lubią wilgotne miejsca?",
        "answer": "Są podatne na utratę wody. Wilgotny mikroklimat sprzyja ich przeżyciu.",
        "explanation": "Kleszcze tracą wodę z organizmu łatwiej niż wiele innych stawonogów, dlatego potrzebują wilgotnego mikroklimatu. Dlatego unikają przesuszonych, nasłonecznionych miejsc.",
        "meaning": "Wilgotna ściółka, podszyt i zarośla mogą być odpowiednimi siedliskami kleszczy.",
        "sourceName": "ECDC – disease vectors",
        "sourceUrl": "https://www.ecdc.europa.eu/en/disease-vectors",
        "guess": {"options": ["Bo wilgoć jest dla nich pokarmem", "Bo są podatne na utratę wody", "Bo unikają jasnego światła, które je oślepia"], "correct": 1}
    },
    {
        "id": 7,
        "category": "srodowisko",
        "question": "Jak długo żyje kleszcz?",
        "answer": "Cykl rozwojowy kleszcza pospolitego może trwać kilka lat, często około trzech, zależnie od warunków.",
        "explanation": "Kleszcz pospolity przechodzi rozwój od larwy przez nimfę do postaci dorosłej, a każdy etap wymaga posiłku krwi. Cały cykl, zależnie od warunków klimatycznych i dostępności żywicieli, trwa zwykle około trzech lat.",
        "meaning": "Kleszcze pozostają elementem ekosystemu przez wiele sezonów — ryzyko kontaktu nie znika po jednym roku.",
        "sourceName": "ECDC – disease vectors",
        "sourceUrl": "https://www.ecdc.europa.eu/en/disease-vectors",
        "guess": {"options": ["Ponad 20 lat", "Jeden sezon", "Cykl może trwać około trzech lat"], "correct": 2}
    },
    {
        "id": 8,
        "category": "srodowisko",
        "question": "Ile jaj może złożyć samica?",
        "answer": "Samica Ixodes ricinus może złożyć około 2000 jaj.",
        "explanation": "Po posiłku krwi samica składa jaja, zwykle w szczelinach gruntu i ściółki. Liczba około 2000 dotyczy samicy kleszcza pospolitego (Ixodes ricinus).",
        "meaning": "Nie wszystkie osobniki przeżywają — nie utożsamiaj liczby jaj z liczbą dorosłych kleszczy w lesie.",
        "sourceName": "ECDC – disease vectors",
        "sourceUrl": "https://www.ecdc.europa.eu/en/disease-vectors",
        "guess": {"options": ["Około 200", "Około 2000", "Około 20 000"], "correct": 1}
    },
    {
        "id": 9,
        "category": "srodowisko",
        "question": "Czy kleszcze są aktywne tylko latem?",
        "answer": "Nie. Aktywność zależy od temperatury, wilgotności i mikroklimatu. Może występować również w chłodniejszych miesiącach.",
        "explanation": "Aktywność kleszczy zależy od warunków pogodowych — wystarczy temperatura i wilgotność sprzyjające questingowi. W ciepłych, wilgotnych okresach bywają aktywne także wiosną, jesienią, a nawet w łagodne dni zimowe.",
        "meaning": "Ochrona podczas praktyk jest ważna także poza latem.",
        "sourceName": "ECDC – tick-borne encephalitis",
        "sourceUrl": "https://www.ecdc.europa.eu/en/tick-borne-encephalitis",
        "guess": {"options": ["Tak, zimą zawsze zapadają w odrętwienie", "Nie — aktywność zależy od temperatury i wilgotności", "Są aktywne wyłącznie w maju"], "correct": 1}
    },
    {
        "id": 10,
        "category": "medyczne",
        "question": "Czy KZM można zakazić się bez ukłucia?",
        "answer": "Tak, rzadko — przez spożycie zakażonego niepasteryzowanego mleka lub jego produktów.",
        "explanation": "Dominującą drogą zakażenia KZM jest ukłucie zakażonego kleszcza, ale opisywano także zakażenia przez niepasteryzowane mleko zakażonych zwierząt hodowlanych (np. kóz) i jego produkty.",
        "meaning": "Pasteryzacja mleka jest istotna dla bezpieczeństwa żywności.",
        "sourceName": "ECDC – tick-borne encephalitis",
        "sourceUrl": "https://www.ecdc.europa.eu/en/tick-borne-encephalitis",
        "guess": {"options": ["Tak, przez zwykły dotyk skóry", "Nie, wyłącznie przez ukłucie", "Tak, rzadko — przez niepasteryzowane mleko"], "correct": 2}
    },
    {
        "id": 11,
        "category": "medyczne",
        "question": "Ile gatunków kleszczy stwierdzono w Polsce?",
        "answer": "Publikacja NIZP PZH–PIB z 2022 roku wskazywała 19 gatunków. Najbardziej rozpowszechniony jest Ixodes ricinus.",
        "explanation": "Według publikacji NIZP PZH–PIB z 2022 r. w Polsce stwierdzono 19 gatunków kleszczy. Dominującym gatunkiem, o największym znaczeniu epidemiologicznym, jest kleszcz pospolity (Ixodes ricinus).",
        "meaning": "Nie wszystkie gatunki mają identyczne siedliska i znaczenie epidemiologiczne. Liczba gatunków może się zmieniać wraz z nowymi badaniami — dlatego podajemy rok źródła (2022).",
        "sourceName": "NIZP PZH–PIB",
        "sourceUrl": "https://www.pzh.gov.pl/",
        "guess": {"options": ["5", "19", "47"], "correct": 1}
    },
    {
        "id": 12,
        "category": "medyczne",
        "question": "Jak naukowcy badają kleszcze w terenie?",
        "answer": "Stosują między innymi metodę przeciągania jasnej tkaniny po roślinności, aby pobierać próbki do badań.",
        "explanation": "Badacze przeciągają po roślinności jasny materiał (tzw. flagę lub chorągiew), na który wspinają się oczekujące kleszcze. Tak zbierane próbki pozwalają ocenić ich liczebność i zakażenie patogenami.",
        "meaning": "Badania wymagają procedur bezpieczeństwa i nie są ćwiczeniem do samodzielnego wykonywania przez uczniów.",
        "sourceName": "ECDC – disease vectors",
        "sourceUrl": "https://www.ecdc.europa.eu/en/disease-vectors",
        "guess": {"options": ["Przeciągają jasną tkaninę po roślinności", "Nocą oświetlają las latarkami", "Odsysają kleszcze odkurzaczem"], "correct": 0}
    }
]

mini_quiz_data = [
    {"question": "Ile odnóży ma larwa kleszcza?", "options": ["4", "6", "8"], "correct": 1, "why": "Larwa ma trzy pary odnóży (sześć), a nimfa i dorosły osobnik — cztery pary (osiem)."},
    {"question": "Czy kleszcze skaczą?", "options": ["Tak, z drzew", "Tylko dorosłe", "Nie"], "correct": 2, "why": "Kleszcze nie skaczą i nie latają — czekają na roślinności w pozycji questingu."},
    {"question": "Co pomaga kleszczowi wykrywać żywiciela?", "options": ["Narząd Hallera", "Dobre oczy", "Uszy"], "correct": 0, "why": "Narząd Hallera na pierwszej parze odnóży odbiera bodźce środowiskowe."},
    {"question": "Jakie warunki sprzyjają Ixodes ricinus?", "options": ["Suchy, gorący klimat", "Wilgotny mikroklimat", "Silne nasłonecznienie"], "correct": 1, "why": "Kleszcze są podatne na utratę wody, więc sprzyja im wilgotny mikroklimat."},
    {"question": "Czy KZM można zakazić się przez niepasteryzowane mleko?", "options": ["Nie, tylko przez ukłucie", "Tak, przez dotyk", "Tak, rzadko"], "correct": 2, "why": "Zakażenia przez niepasteryzowane mleko są rzadkie, ale opisywane."},
    {"question": "Czy nimfy mogą przenosić patogeny?", "options": ["Tak", "Nie, tylko dorosłe", "Tylko w ciepłe miesiące"], "correct": 0, "why": "Nimfy są małe, ale mogą przenosić patogeny — dlatego łatwo je przeoczyć."}
]

scenarios_data = [
    {
        "stage": "Przed wyjściem",
        "situation": "Rano wychodzisz na praktyki w młodnik z wysokimi trawami. Jak się ubierasz?",
        "options": [
            {"text": "Krótkie spodenki i sandały – będzie ciepło.", "ok": False, "why": "Odsłonięta skóra ułatwia kleszczom dostęp do ciała."},
            {"text": "Długie spodnie wpuszczone w skarpety, jasne ubranie, pełne buty i repelent.", "ok": True, "why": "Jasne ubranie ułatwia dostrzeżenie kleszcza, a repelent i zakryta skóra ograniczają ryzyko ukłucia."},
            {"text": "Ciemny dres – na nim nie widać brudu.", "ok": False, "why": "Na ciemnym materiale trudno zauważyć kleszcza."}
        ]
    },
    {
        "stage": "Po powrocie",
        "situation": "Wracasz z terenu do internatu. Co robisz najpierw?",
        "options": [
            {"text": "Dokładnie oglądam całe ciało, także pachy, pachwiny, zgięcia kolan i skórę głowy.", "ok": True, "why": "Kleszcze wybierają miejsca o cienkiej skórze; szybkie wykrycie zmniejsza ryzyko zakażenia."},
            {"text": "Sprawdzę jutro rano, jeśli coś zaswędzi.", "ok": False, "why": "Ukłucie zwykle nie boli ani nie swędzi – im dłużej kleszcz jest przyssany, tym większe ryzyko."},
            {"text": "Wystarczy obejrzeć ręce i nogi.", "ok": False, "why": "Kleszcze często wędrują w ukryte miejsca ciała."}
        ]
    },
    {
        "stage": "Znalezienie kleszcza",
        "situation": "Znajdujesz przyssanego kleszcza pod kolanem. Jak go usuwasz?",
        "options": [
            {"text": "Smaruję go masłem lub tłuszczem, aż sam odpadnie.", "ok": False, "why": "To mit – opóźnia usunięcie i może drażnić kleszcza."},
            {"text": "Chwytam pęsetą jak najbliżej skóry i wyciągam zdecydowanym ruchem, potem dezynfekuję miejsce.", "ok": True, "why": "Szybkie, prawidłowe usunięcie to najważniejszy krok. Zanotuj datę ukłucia."},
            {"text": "Wykręcam go palcami i przypalam zapalniczką.", "ok": False, "why": "Zgniatanie i przypalanie zwiększa ryzyko przedostania się drobnoustrojów."}
        ]
    },
    {
        "stage": "Obserwacja",
        "situation": "Po 10 dniach wokół miejsca ukłucia pojawia się powiększający się rumień. Co robisz?",
        "options": [
            {"text": "Czekam, aż pojawi się typowy pierścień.", "ok": False, "why": "Nie każdy rumień wygląda podręcznikowo – nie należy zwlekać."},
            {"text": "Kontaktuję się z lekarzem i mówię o ukłuciu kleszcza.", "ok": True, "why": "Lekarz oceni zmianę i zdecyduje o leczeniu."},
            {"text": "Kupuję w aptece maść i nie mówię nikomu.", "ok": False, "why": "Samoleczenie może opóźnić właściwe leczenie."}
        ]
    },
    {
        "stage": "Niepokojące objawy",
        "situation": "Kilkanaście dni po pobycie w lesie masz gorączkę, silny ból głowy i sztywność karku.",
        "options": [
            {"text": "To pewnie przeziębienie – odpocznę.", "ok": False, "why": "Takie objawy wymagają pilnej oceny medycznej."},
            {"text": "Pilnie zgłaszam się do lekarza.", "ok": True, "why": "Objawy mogą wskazywać na poważną chorobę (np. KZM) wymagającą szybkiej diagnostyki."}
        ]
    }
]

def read_text_file(filename: str) -> str:
    path = os.path.join(CONTENT_DIR, filename)
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    return ""

def main():
    sql = []
    sql.append("-- ============================================================")
    sql.append("-- Seed 001 — Uwaga Kleszcz! Initial Content Seed")
    sql.append("-- Run in: Supabase dashboard -> SQL Editor -> New query -> Run")
    sql.append("-- ============================================================\n")

    # 1. SITE TEXTS
    sql.append("-- ─── 1. SITE TEXTS ──────────────────────────────────────────")
    texts = {
        "homepage.hero_kicker": "Projekt edukacyjny",
        "homepage.hero_title": "Zauważ ryzyko, zanim kleszcz zauważy Ciebie",
        "homepage.hero_subtitle": "Nie odkładaj – Działaj!",
        "homepage.olivia": read_text_file("olivia.txt"),
        "konkurs.text": read_text_file("konkurs.txt"),
        "klauzula_rodo.text": read_text_file("klauzula-rodo.txt"),
        "polityka.text": read_text_file("polityka.txt"),
        "regulamin.text": read_text_file("regulamin.txt"),
        "standardy_ochrony.text": read_text_file("standardy-ochrony.txt"),
    }

    for k, v in texts.items():
        if v:
            tag = f"tag_{k.replace('.', '_')}"
            sql.append(f"""insert into site_texts (key, value)
values ('{k}', {escape_sql_tag(v, tag)})
on conflict (key) do update set value = excluded.value, updated_at = now();\n""")

    # 2. MODULES
    sql.append("-- ─── 2. MODULES ─────────────────────────────────────────────")
    for m in modules_data:
        lead_esc = m['lead'].replace("'", "''")
        title_esc = m['title'].replace("'", "''")
        sql.append(f"""insert into modules (n, roman, title, lead, sort_order)
values ({m['n']}, '{m['roman']}', '{title_esc}', '{lead_esc}', {m['n']})
on conflict (n) do update set
  roman = excluded.roman,
  title = excluded.title,
  lead = excluded.lead,
  sort_order = excluded.sort_order,
  updated_at = now();\n""")

    # 3. LESSONS
    sql.append("-- ─── 3. LESSONS (Clean Markdown) ─────────────────────────────")
    sql.append("delete from lessons;\n")
    for m in modules_data:
        for idx, l in enumerate(m["lessons"], 1):
            title_esc = l["title"].replace("'", "''")
            md_content = ""
            for b in l["blocks"]:
                md_content += block_to_md(b)
            md_content = md_content.strip()

            tag = f"l_{m['n']}_{idx}"
            sql.append(f"""insert into lessons (module_id, title, content_md, sort_order)
select id, '{title_esc}', {escape_sql_tag(md_content, tag)}, {idx}
from modules where n = {m['n']};\n""")

    # 4. QUIZ QUESTIONS
    sql.append("-- ─── 4. QUIZ QUESTIONS ───────────────────────────────────────")
    sql.append("delete from quiz_questions;\n")
    for m in modules_data:
        scope = f"module:{m['n']}"
        for idx, q in enumerate(m["quiz"], 1):
            q_esc = q["q"].replace("'", "''")
            opts_json = json.dumps(q["options"], ensure_ascii=False).replace("'", "''")
            sql.append(f"""insert into quiz_questions (scope, q, options, correct, sort_order)
values ('{scope}', '{q_esc}', '{opts_json}'::jsonb, {q['correct']}, {idx});\n""")

    for idx, q in enumerate(mini_quiz_data, 1):
        q_esc = q["question"].replace("'", "''")
        opts_json = json.dumps(q["options"], ensure_ascii=False).replace("'", "''")
        sql.append(f"""insert into quiz_questions (scope, q, options, correct, sort_order)
values ('mini', '{q_esc}', '{opts_json}'::jsonb, {q['correct']}, {idx});\n""")

    # 5. FACTS
    sql.append("-- ─── 5. CIEKAWOSTKI FACTS ────────────────────────────────────")
    sql.append("delete from facts;\n")
    for idx, f in enumerate(facts_data, 1):
        q_esc = f["question"].replace("'", "''")
        ans_esc = f["answer"].replace("'", "''")
        exp_esc = f["explanation"].replace("'", "''")
        mean_esc = f["meaning"].replace("'", "''")
        sname_esc = f["sourceName"].replace("'", "''")
        surl_esc = f["sourceUrl"].replace("'", "''")
        guess_json = json.dumps(f["guess"], ensure_ascii=False).replace("'", "''")
        sql.append(f"""insert into facts (id, category, question, answer, explanation, meaning, source_name, source_url, guess, sort_order)
values ({f['id']}, '{f['category']}', '{q_esc}', '{ans_esc}', '{exp_esc}', '{mean_esc}', '{sname_esc}', '{surl_esc}', '{guess_json}'::jsonb, {idx});\n""")

    # 6. SIMULATOR SCENARIOS
    sql.append("-- ─── 6. SIMULATOR SCENARIOS ──────────────────────────────────")
    sql.append("delete from simulator_scenarios;\n")
    for idx, s in enumerate(scenarios_data, 1):
        stage_esc = s["stage"].replace("'", "''")
        sit_esc = s["situation"].replace("'", "''")
        opts_json = json.dumps(s["options"], ensure_ascii=False).replace("'", "''")
        sql.append(f"""insert into simulator_scenarios (stage, situation, options, sort_order)
values ('{stage_esc}', '{sit_esc}', '{opts_json}'::jsonb, {idx});\n""")

    sql.append("-- ─── SEED COMPLETE ──────────────────────────────────────────\n")
    out_content = "\n".join(sql)

    out_path = os.path.join(ROOT, "seed-001.sql")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(out_content)

    print("Successfully generated seed-001.sql, size:", len(out_content), "bytes")

if __name__ == "__main__":
    main()
