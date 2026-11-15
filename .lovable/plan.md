# Strona projektu edukacyjnego Olivii Moritz

## Zakładki i zawartość
- **Strona główna** — tytuł projektu, leśne zdjęcie oraz przesłany tekst przedstawiający Olivię, cel inicjatywy i patronaty.
- **Strefa Edukacji** — przeniesienie obecnej strony z trzema modułami pod osobną zakładkę, bez utraty materiałów i zdjęć.
- **Konkurs** — zasady, harmonogram, nagrody, sposób zgłoszenia e-mailem oraz pełny regulamin do przeczytania i pobrania w oryginalnym DOCX.
- **Galeria prac konkursowych** — przygotowana przestrzeń na rzeczywiste prace; bez wymyślonych zgłoszeń i bez traktowania logotypów jako prac konkursowych. Prace będą dodawane po przekazaniu ich przez organizatorkę i sprawdzeniu uprawnień do publikacji.
- **Materiały dla nauczycieli** — pełne przesłane scenariusze zajęć 15- i 45-minutowych, karty pracy, plan 12 slajdów, test z kluczem, możliwość drukowania.
- **Polityka prywatności** — pełny przesłany dokument do przeczytania i pobrania, oddzielony od brakującej konkursowej klauzuli RODO. Dokument wskazuje Netlify i Sanity CMS oraz zawiera miejsca do uzupełnienia; zachować oryginał i oznaczyć go jako wymagający dostosowania do faktycznie używanych usług przed publikacją strony.
- **Regulamin serwisu** — osobna zakładka z pełnym przesłanym dokumentem i możliwością pobrania oryginału; zaznaczyć potrzebę aktualizacji wskazanego adresu strony przed publikacją.
- **Mapa występowania kleszczy** — interaktywna mapa Polski z przybliżaniem, przesuwaniem i wyborem regionu. Pokazywać udokumentowane występowanie na podstawie ECDC, datę i źródło danych; zachować oznaczenia „brak danych” i „nieznane”. Nie utożsamiać występowania kleszczy z częstością zachorowań ani indywidualnym ryzykiem i nie wymyślać lokalnych ognisk.
- **Symulator decyzji** — scenariusze przygotowania do lasu, kontroli po powrocie, usuwania kleszcza i niepokojących objawów. Po wyborze odpowiedzi natychmiastowe wyjaśnienie, możliwość ponowienia i podsumowanie; bez diagnozowania użytkownika.

## Zgodność z regulaminem
Przekazany regulamin wymaga **jednego quizu końcowego po trzech modułach**, podczas gdy obecna strona blokuje kolejne moduły quizami cząstkowymi. Dostosować ścieżkę do regulaminu: trzy moduły, jeden quiz końcowy z progiem 70%, następnie lokalny certyfikat. Dotychczasowe pytania modułowe mogą pozostać jako ćwiczenia, ale nie jako warunek konkursowy.

Na końcu wykorzystać **przesłany wzór certyfikatu**, uzupełniając imię, nazwisko i datę oraz umożliwiając zapisanie dokumentu lokalnie. Dane i wyniki pozostają wyłącznie w bieżącej sesji aplikacji i znikają po odświeżeniu, zgodnie z przesłaną polityką prywatności; zastąpić obecne trwałe zapisywanie wyników w przeglądarce. Na stronie certyfikatu nie powtarzać pod nim logotypów już zawartych we wzorze.

## Logotypy i licznik
- Wspólna stopka z patronatami Lasów Państwowych i inspekcji sanitarnej.
- Pasek programu i finansowania wykorzystać tylko raz; **Uczelnie Przyszłości przed WUM**, bez osobnego duplikatu logo Uczelnie Przyszłości.
- Wspólny rzeczywisty licznik wejść, nie sztuczna liczba ani licznik ograniczony do jednej przeglądarki. Lovable Cloud będzie potrzebny wyłącznie do przechowywania zbiorczej liczby; nie zapisywać imion, wyników quizów ani adresów IP w tabeli licznika. Licznik mierzy wejścia na stronę, a nie unikalne osoby.

## Kahoot i brakujące materiały
Przygotować zestaw pytań z odpowiedziami do utworzenia quizu Kahoot oraz odnośnik do Kahoot. **Nie udawać, że opublikowany quiz już istnieje**: do bezpośredniego linku dla uczniów potrzebny będzie adres quizu utworzonego na koncie Kahoot organizatorki.

Nie zostały przekazane prace do galerii, formularze zgłoszeniowe, konkursowa klauzula RODO ani Standardy Ochrony Małoletnich. Nie tworzyć ich jako rzekomo oficjalnych dokumentów.

## Szczegóły techniczne
- Zachować TanStack Start i istniejące kolory oraz kroje pisma; wspólną nawigację i stopkę umieścić wokół wszystkich stron.
- Nazwa serwisu zgodna z nowymi dokumentami: **Uwaga Kleszcz!**; pełny tytuł projektu pozostaje w treści strony głównej i konkursu.
- Przesłane logotypy i regulamin udostępniać przez magazyn plików projektu.
- Mapa przez Google Maps Platform; konfiguracja zostanie udostępniona do połączenia. Nie pobierać lokalizacji użytkownika i nie uruchamiać zewnętrznej mapy przed świadomym wyborem jej otwarcia. Uwzględnić tę usługę przy dostosowaniu polityki prywatności.
- Osobny tytuł i opis dla każdej zakładki.
- Testy konkretnych zasad: próg 70%, końcowy quiz i dostęp do certyfikatu, terminy i nagrody z regulaminu.
- Testy decyzji symulatora oraz braku trwałego zapisywania danych quizu i certyfikatu.
- Sprawdzić przeglądanie zakładek, quiz i certyfikat w przeglądarce oraz układ na małym i dużym ekranie.
- Działanie zewnętrznej mapy sprawdzi organizatorka na udostępnionej stronie; środowisko testowe nie obsługuje wiarygodnej weryfikacji Google Maps.