-- ============================================================
-- Seed 001 — Uwaga Kleszcz! Initial Content Seed
-- Run in: Supabase dashboard -> SQL Editor -> New query -> Run
-- ============================================================

-- ─── 1. SITE TEXTS ──────────────────────────────────────────
insert into site_texts (key, value)
values ('homepage.hero_kicker', $tag_homepage_hero_kicker$Projekt edukacyjny$tag_homepage_hero_kicker$)
on conflict (key) do update set value = excluded.value, updated_at = now();

insert into site_texts (key, value)
values ('homepage.hero_title', $tag_homepage_hero_title$Zauważ ryzyko, zanim kleszcz zauważy Ciebie$tag_homepage_hero_title$)
on conflict (key) do update set value = excluded.value, updated_at = now();

insert into site_texts (key, value)
values ('homepage.hero_subtitle', $tag_homepage_hero_subtitle$Nie odkładaj – Działaj!$tag_homepage_hero_subtitle$)
on conflict (key) do update set value = excluded.value, updated_at = now();

insert into site_texts (key, value)
values ('homepage.olivia', $tag_homepage_olivia$Nazywam się Olivia Moritz i jestem studentką kierunku Zdrowie Publiczne na Warszawskim 
Uniwersytecie Medycznym. W ramach programu „Uczelnie Przyszłości”, organizowanego przez 
Narodowe Centrum Badań i Rozwoju, realizuję projekt edukacyjny pt. „Zauważ ryzyko, zanim kleszcz 
zauważy Ciebie – Nie odkładaj – Działaj!”, skierowany do uczniów kształcących się w zawodzie 
technik leśnik.
Celem projektu jest zwiększenie świadomości i wiedzy młodzieży na temat chorób odkleszczowych, w 
szczególności boreliozy oraz kleszczowego zapalenia mózgu, a także kształtowanie prawidłowych 
nawyków i praktycznych umiejętności związanych z profilaktyką podczas przebywania w środowisku 
leśnym. Zależy mi na tym, aby młodzi ludzie, którzy w przyszłości będą pracować w lesie, potrafili 
świadomie rozpoznawać zagrożenia, skutecznie chronić swoje zdrowie i właściwie reagować w 
sytuacji narażenia na kontakt z kleszczami.
Konkurs został objęty Patronatem Dyrektora Generalnego Lasów Państwowych oraz Głównego 
Inspektoratu Sanitarnego . Wybór tych instytucji jest ściśle związany z tematyką i celami projektu. 
$tag_homepage_olivia$)
on conflict (key) do update set value = excluded.value, updated_at = now();

insert into site_texts (key, value)
values ('konkurs.text', $tag_konkurs_text$REGULAMIN OGÓLNOPOLSKIEGO KONKURSU EDUKACYJNEGO

„Zauważ ryzyko, zanim kleszcz zauważy Ciebie – Nie odkładaj – Działaj!”

§ 1. Postanowienia ogólne

1. Niniejszy Regulamin określa zasady organizacji i uczestnictwa w ogólnopolskim konkursie edukacyjnym „Zauważ ryzyko, zanim kleszcz zauważy Ciebie – Nie odkładaj – Działaj!”, zwanym dalej „Konkursem”.

2. Organizatorem Konkursu jest Olivia Moritz, osoba fizyczna, realizująca indywidualny projekt edukacyjny w ramach programu „Uczelnie Przyszłości”, zwana dalej „Organizatorem”.

3. Kontakt z Organizatorem odbywa się za pośrednictwem adresu: s097260@student.wum.edu.pl.

4. Konkurs jest skierowany do uczniów szkół ponadpodstawowych kształcących się w zawodzie technik leśnik na terenie Rzeczypospolitej Polskiej.

5. Konkurs ma charakter indywidualny, ogólnopolski, edukacyjny i artystyczny.

6. Udział w Konkursie jest dobrowolny i bezpłatny.

7. Konkurs jest elementem projektu edukacyjnego dotyczącego profilaktyki chorób odkleszczowych, w szczególności boreliozy oraz kleszczowego zapalenia mózgu.

8. Materiały edukacyjne mają charakter informacyjny i nie zastępują indywidualnej konsultacji medycznej.

9. W Konkursie mogą uczestniczyć również osoby małoletnie, z zachowaniem zasad określonych w niniejszym Regulaminie.

10. Konkurs nie jest organizowany przez szkoły uczestniczące w Projekcie. Szkoły mogą pełnić funkcję podmiotów współpracujących i informujących uczniów o możliwości udziału.

§ 2. Cele Konkursu

1. Celem Konkursu jest zwiększenie wiedzy uczniów o chorobach odkleszczowych i sposobach ograniczania ryzyka zakażenia.

2. Konkurs służy w szczególności:
a) promowaniu działań profilaktycznych;
b) rozwijaniu świadomości zdrowotnej wśród przyszłych pracowników sektora leśnego;
c) zachęcaniu do korzystania z wiedzy medycznej opartej na aktualnych dowodach naukowych;
d) rozwijaniu kreatywności i umiejętności tworzenia przekazu edukacyjnego;
e) zaangażowaniu młodzieży w projektowanie materiałów służących edukacji zdrowotnej.

3. Planowanym rezultatem Konkursu jest również opracowanie i wykonanie muralu edukacyjnego inspirowanego zwycięską pracą.

§ 3. Uczestnicy Konkursu

1. Uczestnikiem Konkursu może zostać osoba, która:
a) w dniu zgłoszenia jest uczniem szkoły ponadpodstawowej kształcącym się w zawodzie technik leśnik;
b) ma od 15 do 20 lat;
c) ukończy wymaganą ścieżkę edukacyjną;
d) zgłosi pracę zgodną z wymaganiami Regulaminu;
e) przedłoży wymagane oświadczenia i dokumenty.

2. Każdy uczestnik zgłasza pracę samodzielnie i indywidualnie.

3. Nie dopuszcza się prac zespołowych.

4. Każdy uczestnik może zgłosić jedną pracę konkursową.

5. Uczestnik niepełnoletni bierze udział za zgodą przedstawiciela ustawowego, zgodnie z formularzem zgłoszeniowym.

6. Uczestnik pełnoletni składa wszystkie wymagane oświadczenia samodzielnie.

7. Organizator może zweryfikować uprawnienie do udziału w Konkursie, w szczególności status ucznia i wiek, żądając wyłącznie danych lub dokumentów niezbędnych do potwierdzenia spełnienia warunków.

8. Udział w Konkursie nie jest uzależniony od zgody na publikację wizerunku uczestnika.

§ 4. Obowiązkowa ścieżka edukacyjna

1. Warunkiem dopuszczenia pracy do Konkursu jest uprzednie ukończenie internetowej ścieżki edukacyjnej.

2. Ścieżka edukacyjna składa się z trzech modułów:
a) Moduł I – „Poznaj zagrożenie”;
b) Moduł II – „Chroń siebie”;
c) Moduł III – „Reaguj właściwie”.

3. Ukończenie wszystkich wyżej wskazanych modułów kończy się przystąpieniem do jednego quizu końcowego, którego celem jest sprawdzenie wiedzy uczestnika zdobytej w trakcie realizacji modułów.

4. Warunkiem zaliczenia quizu jest uzyskanie co najmniej 70% poprawnych odpowiedzi.

5. Do udziału w Konkursie dopuszczone zostaną wyłącznie osoby, które ukończyły wszystkie trzy moduły edukacyjne i uzyskały co najmniej 70% poprawnych odpowiedzi w quizie końcowym.

6. Potwierdzeniem zaliczenia ścieżki edukacyjnej jest elektroniczny certyfikat generowany lokalnie w przeglądarce internetowej uczestnika, bez zapisywania jego danych osobowych ani wyników w bazie danych.

7. Uczestnik samodzielnie pobiera certyfikat i dołącza go do zgłoszenia konkursowego.

8. Termin ukończenia ścieżki edukacyjnej upływa dnia 31 marca 2027 r. godzina 23:59.

§ 5. Przedmiot Konkursu

1. Zadaniem uczestnika jest opracowanie autorskiego projektu muralu edukacyjnego, przedstawionego w formie plakatu.

2. Tematem projektu muralu jest profilaktyka chorób odkleszczowych, ze szczególnym uwzględnieniem ryzyka związanego z przebywaniem i pracą w środowisku leśnym.

3. Projekt powinien nawiązywać do hasła przewodniego: „Zauważ ryzyko, zanim kleszcz zauważy Ciebie – Nie odkładaj – Działaj!”.

4. Praca musi mieć wyraźny i dominujący charakter edukacyjny.

5. Przekaz powinien być zrozumiały dla odbiorców, atrakcyjny wizualnie i zgodny z aktualną wiedzą medyczną.

6. Uczestnik powinien wykorzystać przede wszystkim środki graficzne, w szczególności ilustracje, symbole, infografiki lub metafory wizualne.

7. W projekcie należy uwzględnić miejsce na kod QR prowadzący do materiałów edukacyjnych Projektu. Właściwy kod może zostać dodany przez wykonawcę podczas przygotowania muralu do realizacji.

8. Projekt nie może zawierać treści obraźliwych, dyskryminujących, naruszających dobra osobiste ani wprowadzających w błąd w zakresie profilaktyki zdrowotnej.

§ 6. Wymagania techniczne

1. Praca powinna zostać przygotowana w formie plakatu w formacie A4.

2. Plakat należy przesłać w postaci jednego pliku PDF.

3. Projekt powinien zachować czytelność tekstów i elementów graficznych po wyświetleniu oraz wydrukowaniu.

4. Praca może zostać przygotowana techniką tradycyjną, a następnie zdigitalizowana, lub z wykorzystaniem narzędzi komputerowych.

5. Organizator dopuszcza wykorzystanie programów graficznych, takich jak Canva, oraz narzędzi generatywnej sztucznej inteligencji, pod warunkiem zachowania zasad § 7.

6. Uczestnik nie może wykorzystywać elementów, do których nie posiada odpowiednich uprawnień.

7. Plik powinien zostać nazwany według wzoru: Nazwisko_Imie_Konkurs_Mural.pdf.

8. Organizator może poprosić o ponowne przesłanie pliku, jeżeli jego otwarcie, odczytanie lub ocena nie będą możliwe z przyczyn technicznych.

§ 7. Samodzielność pracy i wykorzystanie AI

1. Praca konkursowa powinna stanowić rezultat samodzielnej działalności twórczej uczestnika.

2. Dopuszczalne jest korzystanie z programów graficznych, gotowych narzędzi projektowych i generatywnej sztucznej inteligencji jako narzędzi wspierających opracowanie projektu.

3. Uczestnik musi wnieść rzeczywisty, indywidualny wkład twórczy w przygotowanie projektu, w szczególności w dobór przekazu, kompozycji i elementów graficznych.

4. Samo wygenerowanie gotowej grafiki przez AI bez istotnego wkładu twórczego uczestnika nie jest wystarczające do spełnienia wymogu autorskiego charakteru pracy.

5. Uczestnik ma obowiązek wskazać w formularzu zgłoszeniowym, czy korzystał z narzędzi AI oraz w jakim zakresie.

6. Korzystanie z zewnętrznych elementów graficznych jest dopuszczalne wyłącznie wtedy, gdy warunki ich wykorzystania pozwalają na planowane użycie pracy konkursowej.

7. Uczestnik nie może zgłaszać jako własnej pracy utworu innej osoby ani składać nieprawdziwych oświadczeń o przysługujących mu prawach.

8. Organizator może poprosić o wyjaśnienie sposobu przygotowania pracy i przedstawienie informacji dotyczących wykorzystanych materiałów lub narzędzi.

9. Jeżeli zgłoszona praca narusza prawa osób trzecich albo nie spełnia warunku samodzielności, Organizator może odmówić dopuszczenia jej do oceny, wskazując przyczynę.

§ 8. Zgłoszenie do Konkursu

1. Zgłoszenie następuje bezpośrednio do Organizatora wyłącznie za pośrednictwem adresu e-mail: s097260@student.wum.edu.pl.

2. Do zgłoszenia należy dołączyć:
a) pracę konkursową w formacie PDF;
b) odpowiedni formularz zgłoszeniowy;
c) wymagane oświadczenia dotyczące autorstwa i praw do pracy;
d) w przypadku osoby niepełnoletniej – zgodę rodzica lub opiekuna prawnego;
e) certyfikat potwierdzający ukończenie wymaganej ścieżki edukacyjnej, samodzielnie pobrany przez uczestnika.

3. Termin przyjmowania zgłoszeń rozpoczyna się 1 stycznia 2027 r. i kończy 31 marca 2027 r. o godz. 23:59, według czasu obowiązującego w Polsce.

4. Za termin zgłoszenia uważa się moment wpływu kompletnego zgłoszenia na wskazany adres e-mail Organizatora.

5. Zgłoszenia niekompletne mogą zostać skierowane do uzupełnienia w terminie wyznaczonym przez Organizatora.

6. Organizator może odmówić przyjęcia zgłoszenia złożonego po upływie terminu.

7. Organizator potwierdzi przyjęcie zgłoszenia na adres e-mail wskazany w formularzu zgłoszeniowym.

8. Złożenie zgłoszenia nie oznacza automatycznego dopuszczenia pracy do oceny. Organizator przeprowadza najpierw weryfikację formalną.

§ 9. Komisja Konkursowa

1. Oceny prac dokonuje trzyosobowa Komisja Konkursowa.

2. W skład Komisji wchodzą:
a) Olivia Moritz – Organizator;
b) osoba posiadająca wiedzę z zakresu epidemiologii;
c) osoba posiadająca wiedzę i doświadczenie w obszarze zdrowia publicznego.

3. Członkowie Komisji dokonują oceny prac niezależnie i bezstronnie.

4. Członek Komisji pozostający w konflikcie interesów w odniesieniu do konkretnego uczestnika podlega wyłączeniu z oceny jego pracy. Organizator zapewni w takim przypadku ocenę przez osobę zastępującą członka Komisji.

5. Organizator może udostępnić Komisji prace oznaczone numerami, bez danych identyfikujących autorów.

6. Z prac Komisji sporządza się protokół obejmujący wyniki punktowe, rozstrzygnięcie i ewentualne wyłączenia członków Komisji.

§ 10. Kryteria oceny

Prace oceniane będą według następujących kryteriów:

Kryterium — Maksymalna punktacja
Zgodność z tematyką Konkursu — 20
Wartość edukacyjna przekazu — 25
Poprawność merytoryczna — 20
Oryginalność i pomysłowość — 15
Czytelność komunikatu — 10
Walory artystyczne i estetyczne — 10
Łącznie — 100

1. Każdy członek Komisji przyznaje punkty niezależnie.

2. Wynikiem końcowym jest średnia arytmetyczna punktów przyznanych przez członków Komisji, z dokładnością do dwóch miejsc po przecinku.

3. W przypadku uzyskania takiego samego wyniku przez kilku uczestników o kolejności miejsc decyduje wyższa punktacja za wartość edukacyjną, a następnie za poprawność merytoryczną.

4. Jeżeli zastosowanie kryteriów z ust. 4 nie umożliwi rozstrzygnięcia, Komisja przeprowadza dodatkową ocenę porównawczą prac i dokumentuje jej uzasadnienie.

5. Praca zawierająca istotne informacje sprzeczne z aktualną wiedzą medyczną może zostać odrzucona, jeżeli niezgodności te uniemożliwiają wykorzystanie projektu do edukacji zdrowotnej.

6. Komisja może zarekomendować Organizatorowi korekty merytoryczne lub techniczne zwycięskiej pracy przed przygotowaniem muralu.

§ 11. Nagrody

1. Organizator przewiduje następujące nagrody:
a) I miejsce – wyróżnienie zwycięskiego projektu poprzez planowaną realizację muralu edukacyjnego inspirowanego pracą laureata;
b) II miejsce – czytnik e-booków o wartości do 600 zł;
c) III miejsce – drukarka laserowa o wartości do 400 zł.

2. Laureaci otrzymają także dyplomy potwierdzające zajęte miejsca.

3. Mural ma być opracowany i wykonany przez profesjonalnego wykonawcę na podstawie inspiracji zwycięskim projektem, z zachowaniem uzgodnionych praw autora.

4. Planowany termin wykonania muralu to czerwiec 2027 r.

5. W pierwszej kolejności Organizator może zaproponować realizację muralu w szkole zwycięskiego uczestnika.

6. Jeżeli realizacja muralu w tej lokalizacji nie będzie możliwa, Organizator podejmie działania zmierzające do wskazania innej odpowiedniej lokalizacji, po uzyskaniu wymaganych zgód.

7. Jeżeli pomimo podjęcia działań, o których mowa w ust. 5–6, realizacja muralu okaże się niemożliwa z przyczyn prawnych, technicznych lub organizacyjnych, Organizator wraz ze szkołą zwycięskiego uczestnika, podejmie możliwe działania  zastępcze.

8. Realizacja muralu wymaga uzyskania uprawnień do korzystania z projektu, zgody właściciela lub zarządcy nieruchomości oraz spełnienia wymogów technicznych, organizacyjnych i prawnych.

9. Nagrody rzeczowe nie podlegają wymianie na gotówkę.

10. Organizator odpowiada za ustalenie i wykonanie obowiązków podatkowych związanych z przyznaniem nagród, jeżeli takie obowiązki powstaną na podstawie obowiązujących przepisów.

11. Szczegóły przekazania nagród zostaną uzgodnione indywidualnie z laureatami.

§ 12. Ogłoszenie wyników

1. Rozstrzygnięcie Konkursu planowane jest na kwiecień 2027 r.

2. Wyniki zostaną przekazane laureatom za pośrednictwem danych kontaktowych wskazanych w zgłoszeniach.

3. Udzielona Organizatorowi licencja obejmuje prawo do publikacji na stronie internetowej projektu wszystkich prawidłowo zgłoszonych prac konkursowych, niezależnie od wyników konkursu, a nie wyłącznie prac laureatów.

4. Publikacja imienia, nazwiska oraz nazwy szkoły uczestnika w związku z prezentacją jego pracy konkursowej na stronie internetowej Projektu odbywa się na podstawie odrębnej, dobrowolnej zgody, udzielonej zgodnie z obowiązującymi przepisami prawa. Brak zgody nie wpływa na możliwość udziału w Konkursie, ocenę pracy ani przyznanie nagrody.

5. Publikacja wizerunku uczestnika nie stanowi warunku przyznania nagrody.

6. Zasady oznaczania autorstwa publikowanych prac będą uwzględniały zakres odrębnych, dobrowolnych zgód na publikację danych identyfikujących uczestników, z jednoczesnym poszanowaniem autorskich praw osobistych twórców. Przed publikacją pracy Organizator uzgodni z autorem sposób oznaczenia autorstwa, w tym możliwość użycia pseudonimu albo publikacji anonimowej, zgodnie z decyzją autora. Brak zgody na publikację danych osobowych nie oznacza zrzeczenia się autorskich praw osobistych.

§ 13. Prawa autorskie do prac konkursowych

1. Autorskie prawa osobiste do pracy pozostają przy jej twórcy.

2. Zgłoszenie pracy nie powoduje automatycznego przeniesienia autorskich praw majątkowych na Organizatora.

3. Uczestnik udziela Organizatorowi nieodpłatnej, niewyłącznej licencji na korzystanie z własnego, chronionego prawem autorskim wkładu twórczego w zgłoszoną pracę, w zakresie niezbędnym do:
a) przyjęcia i oceny pracy;
b) przeprowadzenia Konkursu;
c) ogłoszenia wyników;
d) prezentacji pracy na stronie internetowej Projektu;
e) udokumentowania Konkursu w sprawozdaniu z realizacji Projektu.

4. Licencja obejmuje następujące pola eksploatacji:
a) utrwalanie i zwielokrotnianie utworu techniką cyfrową;
b) sporządzanie kopii na potrzeby prac Komisji i dokumentacji Konkursu;
c) publiczne udostępnianie pracy w Internecie w taki sposób, aby każdy mógł mieć do niej dostęp w miejscu i czasie przez siebie wybranym;
d) zamieszczanie pracy w elektronicznym lub drukowanym sprawozdaniu z Projektu.

5. Licencja zostaje udzielona na okres pięciu lat, bez ograniczeń terytorialnych w zakresie korzystania z Internetu.

6. Organizator zobowiązuje się respektować autorskie prawa osobiste uczestnika, w szczególności prawo do oznaczenia autorstwa, z uwzględnieniem zgodnych z prawem zasad ochrony danych osobowych.

7. Licencja określona w niniejszym paragrafie nie obejmuje automatycznie wykonywania muralu, opracowywania zwycięskiej pracy ani udzielania wykonawcy praw do jej adaptacji.

8. Warunki wykorzystania zwycięskiego projektu do wykonania muralu zostaną uregulowane w odrębnej umowie z uprawnionym do pracy, a w przypadku małoletniego – z odpowiednim udziałem jego przedstawiciela ustawowego.

9. Uczestnik może wykorzystywać własną pracę również poza Konkursem, o ile nie narusza praw osób trzecich.

10. Jeżeli praca zawiera elementy stworzone przy użyciu AI albo licencjonowane materiały osób trzecich, uprawnienie Organizatora do korzystania z tych elementów musi wynikać z odpowiednich praw lub warunków licencyjnych. Niniejszy Regulamin nie nadaje uczestnikowi praw, których faktycznie nie posiada.

§ 14. Ochrona danych osobowych

1. Administratorem danych osobowych przetwarzanych na potrzeby organizacji Konkursu jest Olivia Moritz.

2. Dane przetwarzane będą w zakresie niezbędnym do przyjmowania i weryfikacji zgłoszeń, prowadzenia Konkursu, oceny prac, ogłoszenia wyników i przekazywania nagród.

3. Szczegółowe informacje dotyczące zasad przetwarzania danych osobowych, w tym zasad publikacji danych identyfikujących uczestników, zawiera odrębna klauzula informacyjna RODO dotycząca Konkursu, udostępniana przed dokonaniem zgłoszenia.

4. Organizator nie wymaga podawania informacji o stanie zdrowia uczestników.

5. Dane osobowe nie będą wykorzystywane do niepowiązanych z Konkursem działań marketingowych bez odpowiedniej podstawy prawnej.

§ 15. Bezpieczeństwo małoletnich

1. Konkurs realizowany jest z poszanowaniem praw i bezpieczeństwa osób małoletnich.

2. Organizator stosuje Standardy Ochrony Małoletnich dostosowane do charakteru Projektu.

3. Kontakt z uczestnikami małoletnimi odbywa się wyłącznie w sprawach organizacyjnych związanych z Konkursem i za pośrednictwem oficjalnych kanałów komunikacji.

4. Organizator nie wymaga udziału małoletnich w prywatnych spotkaniach ani prowadzenia komunikacji za pośrednictwem prywatnych kont w mediach społecznościowych.

5. Udział w ewentualnym wydarzeniu stacjonarnym wymaga przestrzegania zasad bezpieczeństwa ustalonych dla tego wydarzenia.

§ 16. Oficjalne otwarcie muralu

1. Organizator planuje zorganizowanie oficjalnego otwarcia muralu w czerwcu 2027 r.

2. Laureaci mogą zostać zaproszeni do udziału w wydarzeniu.

3. Udział w wydarzeniu jest dobrowolny i nie stanowi warunku otrzymania nagrody.

4. Co do zasady koszty dojazdu, wyżywienia i ewentualnego pobytu ponoszą uczestnicy we własnym zakresie.

5. Organizator nie zapewnia transportu uczestników ani opieki podczas podróży.

6. W przypadku uczestników małoletnich zasady udziału i zapewnienia opieki podczas wydarzenia zostaną określone odrębnie.

7. Nieobecność laureata podczas wydarzenia nie powoduje utraty prawa do przyznanej nagrody rzeczowej.

8. Nagroda rzeczowa może zostać przesłana na uzgodniony adres, po ustaleniu niezbędnych danych do doręczenia.

9. Fotografowanie i rozpowszechnianie rozpoznawalnego wizerunku uczestników będzie odbywało się wyłącznie zgodnie z obowiązującymi przepisami i po uzyskaniu wymaganych zezwoleń.

§ 17. Reklamacje

1. Uczestnik lub jego przedstawiciel ustawowy może zgłosić reklamację dotyczącą przebiegu Konkursu.

2. Reklamację należy przesłać na adres: s097260@student.wum.edu.pl.

3. Termin zgłoszenia reklamacji wynosi 7 dni od dnia ogłoszenia wyników.

4. Reklamacja powinna zawierać dane umożliwiające identyfikację zgłoszenia, opis zastrzeżeń i oczekiwany sposób ich rozpatrzenia.

5. Organizator rozpatruje reklamację w terminie 14 dni od dnia otrzymania.

6. Reklamacja może dotyczyć w szczególności błędów proceduralnych, nieprawidłowego zastosowania kryteriów lub konfliktu interesów.

7. Reklamacja nie służy zastępowaniu oceny artystycznej dokonanej prawidłowo przez Komisję nową oceną według subiektywnych preferencji zgłaszającego.

§ 18. Harmonogram

1. Realizacja ścieżki edukacyjnej – od 1 grudnia 2026 r. do 31 marca 2027 r., do godz. 23:59 (czas obowiązujący w Polsce).

2. Przyjmowanie zgłoszeń konkursowych – od 1 stycznia 2027 r. do 31 marca 2027 r., do godz. 23:59 (czas obowiązujący w Polsce).

3. Ocena prac i ogłoszenie wyników – do 30 kwietnia 2027 r.

4. Planowana realizacja muralu – do 30 czerwca 2027 r.

5. Planowana realizacja muralu – 30.06.2027 r.

6. Organizator może dokonać zmian organizacyjnych harmonogramu z ważnych przyczyn, informując o nich uczestników.

7. Zmiany nie mogą naruszać praw już nabytych przez uczestników ani prowadzić do nieuzasadnionego pogorszenia warunków udziału.

§ 19. Postanowienia końcowe

1. Przystąpienie do Konkursu wymaga zapoznania się z niniejszym Regulaminem i złożenia odpowiednich oświadczeń.

2. Regulamin jest udostępniany nieodpłatnie przed rozpoczęciem przyjmowania zgłoszeń.

3. W sprawach nieuregulowanych zastosowanie mają właściwe przepisy prawa polskiego.

4. Regulamin wchodzi w życie z dniem 06.11.2026r.

5. Integralną dokumentację Konkursu stanowią:
a) formularz zgłoszeniowy uczestnika pełnoletniego;
b) formularz zgłoszeniowy uczestnika niepełnoletniego wraz z dokumentacją rodzica/opiekuna prawnego;
c) klauzula informacyjna RODO;
d) Standardy Ochrony Małoletnich.

Organizator Konkursu
$tag_konkurs_text$)
on conflict (key) do update set value = excluded.value, updated_at = now();

insert into site_texts (key, value)
values ('klauzula_rodo.text', $tag_klauzula_rodo_text$KLAUZULA INFORMACYJNA RODO

dotycząca ogólnopolskiego konkursu edukacyjnego „Zauważ ryzyko, zanim kleszcz zauważy Ciebie – Nie odkładaj – Działaj!”

1. Administrator danych osobowych

Administratorem danych osobowych przetwarzanych w związku z organizacją i przeprowadzeniem Konkursu jest:

Olivia Moritz, osoba fizyczna, Organizator Konkursu.

Kontakt w sprawach związanych z ochroną danych osobowych:

s097260@student.wum.edu.pl

2. Zakres przetwarzanych danych

W związku z organizacją Konkursu Administrator może przetwarzać następujące dane:

a) dane uczestnika – imię, nazwisko, wiek, nazwa i miejscowość szkoły, klasa oraz dane kontaktowe;

b) dane przedstawiciela ustawowego uczestnika niepełnoletniego – imię, nazwisko, informacja o rodzaju przedstawicielstwa oraz dane kontaktowe;

c) dane związane z uczestnictwem – zgłoszona praca, identyfikator potwierdzający ukończenie ścieżki edukacyjnej, informacje niezbędne do weryfikacji spełnienia warunków konkursu;

d) dane związane z oceną i rozstrzygnięciem – numer zgłoszenia, punktacja, miejsce w Konkursie, korespondencja dotycząca zgłoszenia;

e) dane niezbędne do przekazania nagrody, pozyskiwane od laureatów wyłącznie w wymaganym zakresie;

f) dane osób współpracujących przy organizacji Konkursu, w szczególności członków Komisji oraz osób kontaktowych ze szkół.

Administrator nie wymaga od uczestników przekazywania informacji o stanie zdrowia.

3. Cele i podstawy prawne przetwarzania

Dane osobowe będą przetwarzane w następujących celach:

a) Organizacja i przeprowadzenie Konkursu

Obejmuje to przyjmowanie zgłoszeń, kontakt z uczestnikami, weryfikację warunków uczestnictwa, ocenę prac, wyłonienie laureatów, ogłoszenie wyników i przekazanie nagród.

Podstawa prawna: art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes Administratora polegający na organizacji, prawidłowym przeprowadzeniu i udokumentowaniu Konkursu, z uwzględnieniem praw i interesów małoletnich.

b) Weryfikacja udziału osoby małoletniej

Obejmuje potwierdzenie uprawnienia przedstawiciela ustawowego oraz udokumentowanie wymaganej zgody na udział i czynności związane z prawami autorskimi.

Podstawa prawna: art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes Administratora polegający na zapewnieniu zgodnego z prawem udziału uczestników.

c) Realizacja obowiązków wynikających z przepisów prawa

Obejmuje w szczególności wymagane obowiązki podatkowe, dokumentacyjne lub związane z ochroną małoletnich.

Podstawa prawna: art. 6 ust. 1 lit. c RODO – w zakresie, w jakim określony obowiązek wynika z właściwego przepisu prawa.

d) Rozpatrywanie reklamacji i ochrona praw

Obejmuje dokumentowanie przebiegu Konkursu, rozpatrywanie reklamacji oraz ustalenie, dochodzenie lub obronę przed roszczeniami.

Podstawa prawna: art. 6 ust. 1 lit. f RODO.

e) Dodatkowa publikacja danych uczestników

Imię, nazwisko i nazwa szkoły uczestnika mogą być publikowane w Serwisie oraz materiałach informacyjnych Konkursu wyłącznie po uzyskaniu odrębnej, dobrowolnej zgody (art. 6 ust. 1 lit. a RODO). W przypadku małoletnich zgodę dokumentuje właściwy przedstawiciel ustawowy, z uwzględnieniem praw i stanowiska dziecka.

Brak zgody nie wpływa na udział, ocenę ani nagrodę. Zgodę można w dowolnym momencie wycofać przez kontakt z Administratorem; wycofanie nie wpływa na zgodność z prawem przetwarzania przed wycofaniem.

4. Odbiorcy danych

Dane mogą być udostępniane:

a) członkom Komisji Konkursowej, w zakresie niezbędnym do oceny prac;

b) osobom współpracującym z Organizatorem, w zakresie koniecznym do realizacji przydzielonych zadań;

c) dostawcom usług poczty elektronicznej, przechowywania danych oraz innych narzędzi wykorzystywanych do obsługi Konkursu – zgodnie z rzeczywistym modelem świadczenia usług i właściwą podstawą prawną;

d) dostawcom usług związanych z przekazaniem nagród, w zakresie niezbędnym do doręczenia;

e) uprawnionym instytucjom i organom, jeżeli obowiązek udostępnienia danych wynika z przepisów prawa.

Dane uczestników nie będą przekazywane wszystkim szkołom uczestniczącym w Projekcie.

Dane identyfikujące uczestników, których publikacja została objęta zgodą, mogą być dostępne publicznie dla odbiorców Internetu. Jeżeli dane są publikowane w Serwisie, w ich technicznym udostępnianiu mogą uczestniczyć dostawcy hostingu i systemu zarządzania treścią.

5. Okres przechowywania danych

Dane uczestników będą przechowywane przez okres konieczny do przyjęcia zgłoszeń, przeprowadzenia Konkursu, rozstrzygnięcia wyników, przekazania nagród i rozpatrzenia reklamacji.

Po zakończeniu Konkursu dane będą przechowywane wyłącznie w zakresie i przez czas uzasadniony udokumentowanymi obowiązkami prawnymi, ewentualnymi roszczeniami lub obowiązkami dotyczącymi rozliczenia Projektu, lecz nie dłuższy niż 12 miesięcy.

Po upływie właściwego okresu dane zostaną usunięte lub poddane skutecznej anonimizacji, chyba,że dalsze przechowywanie będzie prawnie wymagane.

Publikacja danych na podstawie zgody trwa do jej wycofania albo do zakończenia określonego i zakomunikowanego okresu publikacji 12 miesięcy. Po skutecznym wycofaniu zgody Administrator usuwa dane identyfikujące z kontrolowanych przez siebie miejsc publikacji bez zbędnej zwłoki, z uwzględnieniem ograniczeń dotyczących kopii i archiwizacji przez osoby trzecie.

6. Prawa osoby, której dane dotyczą

Osobie, której dane dotyczą, przysługuje – w zakresie określonym w RODO – prawo do:

a) dostępu do danych;

b) sprostowania danych;

c) usunięcia danych, jeżeli zachodzą przesłanki określone prawem;

d) ograniczenia przetwarzania;

e) wniesienia sprzeciwu wobec przetwarzania danych opartego na prawnie uzasadnionym interesie;

f) cofnięcia zgody, jeżeli określone przetwarzanie odbywa się na podstawie zgody;

g) przenoszenia danych, wyłącznie gdy spełnione są ustawowe przesłanki tego prawa.

Żądania dotyczące danych osobowych można kierować na adres:

s097260@student.wum.edu.pl

7. Prawo do wniesienia skargi

Osoba, której dane dotyczą, ma prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych, jeżeli uzna, że jej dane są przetwarzane niezgodnie z przepisami prawa.

8. Dobrowolność podania danych

Podanie danych jest dobrowolne, jednak podanie danych wskazanych w formularzu jako niezbędne jest konieczne do prawidłowego zgłoszenia uczestnika i przeprowadzenia Konkursu.

Brak danych wymaganych do weryfikacji zgłoszenia może uniemożliwić udział w Konkursie.

Podanie numeru telefonu rodzica lub opiekuna jest dobrowolne, jeżeli możliwe jest zapewnienie kontaktu za pośrednictwem adresu e-mail.

9. Zautomatyzowane podejmowanie decyzji

Dane nie będą wykorzystywane do podejmowania wobec uczestników decyzji wywołujących skutki prawne lub podobnie istotne skutki wyłącznie na podstawie zautomatyzowanego przetwarzania, w tym profilowania.

Ocena prac konkursowych będzie dokonywana przez Komisję Konkursową.

10. Przekazywanie danych poza Europejski Obszar Gospodarczy

Jeżeli wykorzystywane rozwiązania technologiczne będą wiązały się z przekazywaniem danych do państw spoza Europejskiego Obszaru Gospodarczego, Administrator zapewni zgodność takiego przekazywania z rozdziałem V RODO i przekaże wymagane informacje.

Klauzulę należy udostępnić uczestnikom pełnoletnim i przedstawicielom ustawowym małoletnich przed otrzymaniem zgłoszenia i danych osobowych.

11. Informacja dla rodziców i uczestników małoletnich

Dane osób małoletnich są przetwarzane wyłącznie w zakresie niezbędnym do realizacji Konkursu.

Rodzic lub opiekun prawny może kontaktować się z Administratorem we wszystkich sprawach dotyczących przetwarzania danych dziecka.

Administrator dokłada szczególnej staranności do ochrony danych i prywatności małoletnich uczestników.

Informacja uzupełniająca dla osób kontaktowych ze szkół

Dane osób reprezentujących szkoły i wyznaczonych do kontaktu, w szczególności imię, nazwisko, stanowisko i służbowe dane kontaktowe, są przetwarzane przez Olivię Moritz w celu nawiązania i realizacji współpracy związanej z Projektem.

Podstawą prawną jest art. 6 ust. 1 lit. f RODO, tj. prawnie uzasadniony interes Administratora polegający na organizacji współpracy ze szkołami.

Dane mogą pochodzić bezpośrednio od osoby kontaktowej albo od szkoły, która wskazała ją jako przedstawiciela do kontaktu.

Osobom tym przysługują właściwe prawa przewidziane w RODO, w szczególności dostęp do danych, ich sprostowanie oraz sprzeciw wobec przetwarzania opartego na art. 6 ust. 1 lit. f RODO.

Pozostałe informacje o Administratorze, odbiorcach danych, okresie przechowywania, prawie skargi i ewentualnych transferach poza EOG są zawarte w niniejszej klauzuli, w zakresie mającym zastosowanie do danych osób kontaktowych.
$tag_klauzula_rodo_text$)
on conflict (key) do update set value = excluded.value, updated_at = now();

insert into site_texts (key, value)
values ('polityka.text', $tag_polityka_text$POLITYKA PRYWATNOŚCI SERWISU INTERNETOWEGO „UWAGA KLESZCZ!”

wraz z informacją o plikach cookies

§ 1. Postanowienia ogólne

1. Niniejsza Polityka prywatności określa zasady przetwarzania danych osobowych oraz wykorzystywania plików cookies i podobnych technologii w związku z korzystaniem z serwisu internetowego „Uwaga Kleszcz!”, dostępnego pod adresem https://uwagakleszcz.netlify.app/, zwanego dalej „Serwisem”.

2. Serwis ma charakter edukacyjny i informacyjny. Jego celem jest upowszechnianie wiedzy dotyczącej kleszczy, chorób odkleszczowych, w szczególności boreliozy i kleszczowego zapalenia mózgu, oraz zasad profilaktyki zdrowotnej.

3. Polityka prywatności została przygotowana z uwzględnieniem przepisów rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO), ustawy z dnia 10 maja 2018 r. o ochronie danych osobowych oraz ustawy z dnia 12 lipca 2024 r. – Prawo komunikacji elektronicznej.

4. Serwis nie wymaga zakładania kont użytkowników ani rejestracji w celu przeglądania materiałów edukacyjnych i korzystania z ogólnodostępnych funkcjonalności.

5. Korzystanie z Serwisu jest bezpłatne.

6. Dane osobowe są przetwarzane wyłącznie w określonych, zgodnych z prawem celach oraz w zakresie odpowiednim do charakteru świadczonych usług.

§ 2. Administrator danych osobowych

1. Administratorem danych osobowych przetwarzanych w związku z funkcjonowaniem Serwisu jest Olivia Moritz, osoba fizyczna prowadząca projekt edukacyjny „Uwaga Kleszcz!” w ramach programu „Uczelnie Przyszłości”, zwana dalej „Administratorem”.

2. Dane Administratora:

Imię i nazwisko: Olivia Moritz

Adres e-mail: s097260@student.wum.edu.pl

1. We wszystkich sprawach związanych z przetwarzaniem danych osobowych, w szczególności w zakresie wykonywania praw wynikających z RODO, można kontaktować się z Administratorem za pośrednictwem wskazanego adresu e-mail.

2. Administrator odpowiada za ustalenie celów i sposobów przetwarzania danych osobowych w zakresie, w jakim przetwarzanie odbywa się na jego rzecz w związku z funkcjonowaniem Serwisu.

§ 3. Zakres przetwarzanych danych osobowych

1. W związku z korzystaniem z Serwisu mogą być przetwarzane następujące kategorie danych:

1. dane techniczne związane z połączeniem z Serwisem, w szczególności adres IP, data i godzina połączenia, informacje o przeglądarce, systemie operacyjnym, żądanych zasobach oraz dane niezbędne do prawidłowego przesyłania treści;

2. dane zawarte w korespondencji kierowanej do Administratora, w szczególności imię, nazwisko, adres e-mail i treść wiadomości, jeżeli zostały dobrowolnie przekazane;

3. informacje techniczne przetwarzane przez dostawców infrastruktury hostingowej oraz systemu zarządzania treścią, w zakresie niezbędnym do świadczenia usług, zapewnienia ich bezpieczeństwa i prawidłowego funkcjonowania;

4. dane przekazywane odrębnie w związku z udziałem w konkursie edukacyjnym, zgodnie z regulaminem konkursu i właściwą klauzulą informacyjną RODO.

1. Administrator nie wymaga od osób przeglądających Serwis podawania imienia, nazwiska, adresu e-mail ani innych danych identyfikujących, chyba że Użytkownik sam podejmie kontakt lub zdecyduje się zgłosić do konkursu.

2. Serwis nie prowadzi kont użytkowników, rejestru osób korzystających z quizów ani bazy historii wygenerowanych certyfikatów.

3. Administrator nie wymaga przekazywania informacji o stanie zdrowia Użytkowników ani nie prowadzi za pośrednictwem Serwisu dokumentacji medycznej.

4. Zakres danych technicznych przetwarzanych przez dostawców usług może zależeć od rzeczywistej konfiguracji wykorzystywanych rozwiązań oraz sposobu udostępniania treści Serwisu.

§ 4. Cele i podstawy prawne przetwarzania danych

1. Dane osobowe mogą być przetwarzane w następujących celach:

a) Zapewnienie prawidłowego funkcjonowania Serwisu

Przetwarzanie danych technicznych może być niezbędne do wyświetlania strony, przesyłania materiałów edukacyjnych, obsługi żądań przeglądarki, zapewnienia dostępności treści oraz przeciwdziałania zakłóceniom technicznym.

Podstawa prawna: art. 6 ust. 1 lit. f RODO, tj. prawnie uzasadniony interes Administratora polegający na zapewnieniu prawidłowego działania Serwisu, jego bezpieczeństwa i dostępności, w zakresie, w jakim dane są przetwarzane przez Administratora w tych celach.

b) Zapewnienie bezpieczeństwa Serwisu

Dane techniczne mogą być wykorzystywane w celu identyfikowania błędów, wykrywania nadużyć, przeciwdziałania nieuprawnionemu dostępowi oraz ochrony infrastruktury informatycznej.

Podstawa prawna: art. 6 ust. 1 lit. f RODO, tj. prawnie uzasadniony interes Administratora polegający na ochronie Serwisu i jego infrastruktury.

c) Obsługa korespondencji

Dane przekazane w wiadomości skierowanej do Administratora mogą być przetwarzane w celu udzielenia odpowiedzi, wyjaśnienia zgłoszonej sprawy, obsługi zapytania lub rozpatrzenia reklamacji dotyczącej Serwisu.

Podstawa prawna: art. 6 ust. 1 lit. f RODO, tj. prawnie uzasadniony interes Administratora polegający na prowadzeniu korespondencji i obsłudze zgłoszeń, a w przypadkach, w których przetwarzanie jest niezbędne do wykonania umowy lub podjęcia działań na żądanie osoby przed jej zawarciem – art. 6 ust. 1 lit. b RODO.

d) Dochodzenie roszczeń lub obrona przed roszczeniami

Dane mogą być przetwarzane w zakresie niezbędnym do ustalenia, dochodzenia lub obrony przed roszczeniami związanymi z funkcjonowaniem Serwisu.

Podstawa prawna: art. 6 ust. 1 lit. f RODO.

e) Realizacja obowiązków prawnych

Dane mogą być przetwarzane w zakresie, w jakim obowiązek ich przetwarzania wynika z przepisów prawa.

Podstawa prawna: art. 6 ust. 1 lit. c RODO, w związku z właściwymi przepisami ustanawiającymi określony obowiązek.

1. Administrator nie wykorzystuje danych odwiedzających Serwis do profilowania reklamowego ani prowadzenia spersonalizowanych kampanii marketingowych.

2. Dane związane z udziałem w konkursie edukacyjnym są przetwarzane w celach i na podstawach prawnych określonych w odrębnej klauzuli informacyjnej RODO dotyczącej konkursu.

§ 5. Quizy edukacyjne i generowanie certyfikatów

1. Serwis udostępnia interaktywne quizy edukacyjne umożliwiające sprawdzenie wiedzy oraz, po spełnieniu odpowiednich warunków, wygenerowanie imiennego certyfikatu.

2. W celu wygenerowania certyfikatu Użytkownik może zostać poproszony o wpisanie imienia i nazwiska, które zostaną umieszczone na dokumencie.

3. Mechanizm generowania certyfikatu działa lokalnie, w przeglądarce internetowej Użytkownika.

4. Imię i nazwisko wprowadzone do generatora nie są przesyłane do bazy danych Administratora ani zapisywane w systemie zarządzania treścią Sanity CMS.

5. Wyniki quizów oraz dane wpisane do generatora są wykorzystywane wyłącznie w ramach bieżącej sesji aplikacji. Administrator nie tworzy na ich podstawie bazy uczestników, nie przechowuje historii wyników ani nie prowadzi rejestru wygenerowanych certyfikatów.

6. Serwis nie wymaga podawania adresu e-mail w celu wygenerowania certyfikatu oraz nie wysyła certyfikatów za pośrednictwem poczty elektronicznej.

7. Po zakończeniu sesji lub odświeżeniu strony dane przechowywane w tymczasowym stanie aplikacji nie są zachowywane przez mechanizm quizu.

8. W przypadku lokalnego generowania certyfikatu, bez przekazywania danych identyfikujących Administratorowi, Administrator nie otrzymuje tych danych i nie wykorzystuje ich do dalszego przetwarzania.

9. Użytkownik sam decyduje o pobraniu i zapisaniu certyfikatu na swoim urządzeniu oraz o jego ewentualnym przekazaniu innym podmiotom.

10. Jeżeli certyfikat jest przekazywany Administratorowi w ramach zgłoszenia konkursowego, dane zawarte w tym dokumencie są od tego momentu przetwarzane zgodnie z zasadami dotyczącymi udziału w konkursie.

11. Administrator nie wykorzystuje danych wpisywanych do generatora certyfikatów do tworzenia profili użytkowników, działań reklamowych ani analiz indywidualnych wyników.

§ 6. Dane uczestników konkursu edukacyjnego

1. Serwis może być wykorzystywany do udostępniania informacji i dokumentacji dotyczącej ogólnopolskiego konkursu edukacyjnego „Zauważ ryzyko, zanim kleszcz zauważy Ciebie – Nie odkładaj – Działaj!”.

2. Organizatorem konkursu oraz administratorem danych osobowych przetwarzanych na potrzeby jego przeprowadzenia jest Olivia Moritz.

3. Dane osobowe przekazywane w ramach zgłoszeń konkursowych mogą obejmować w szczególności dane identyfikacyjne uczestnika, informacje o szkole, dane kontaktowe, informacje o ukończeniu ścieżki edukacyjnej, pracę konkursową oraz – w przypadku osób niepełnoletnich – dane ich przedstawicieli ustawowych.

4. Szczegółowe informacje dotyczące celów, podstaw prawnych, zakresu i okresów przetwarzania danych uczestników konkursu znajdują się w odrębnej klauzuli informacyjnej RODO udostępnianej wraz z dokumentacją konkursową.

5. Udział w konkursie jest odrębny od korzystania z ogólnodostępnych funkcjonalności Serwisu.

6. Samo przeglądanie informacji o konkursie ani rozwiązanie quizu nie jest równoznaczne z dokonaniem zgłoszenia konkursowego.

7. Publikowanie prac konkursowych oraz danych identyfikujących uczestników odbywa się zgodnie z regulaminem konkursu, udzielonymi uprawnieniami dotyczącymi prac oraz właściwymi podstawami prawnymi przetwarzania danych osobowych.

8. Publikacja imienia, nazwiska i nazwy szkoły uczestnika, jeżeli nie jest niezbędna do realizacji konkursu, odbywa się na podstawie odrębnej, dobrowolnej zgody udzielonej zgodnie z obowiązującymi przepisami.

9. Odmowa udzielenia zgody na dodatkową publikację danych identyfikujących uczestnika nie stanowi podstawy do wykluczenia z konkursu ani pozbawienia nagrody.

§ 7. Odbiorcy danych i dostawcy usług

1. W związku z funkcjonowaniem Serwisu Administrator korzysta z usług podmiotów zapewniających infrastrukturę techniczną oraz narzędzia niezbędne do publikowania i udostępniania treści.

2. Do wykorzystywanych rozwiązań należą:

a) Netlify

Usługa hostingowa służąca do udostępniania Serwisu w Internecie oraz obsługi jego infrastruktury technicznej.

W związku z dostarczaniem strony internetowej dostawca może przetwarzać dane techniczne związane z żądaniami kierowanymi do Serwisu, w szczególności adresy IP, informacje o połączeniu oraz dane niezbędne do zapewnienia bezpieczeństwa i prawidłowego funkcjonowania usługi.

b) Sanity CMS

System zarządzania treścią wykorzystywany do przechowywania, organizowania i udostępniania materiałów publikowanych w Serwisie, w szczególności tekstów, grafik i zdjęć.

Sanity CMS nie służy do przechowywania imion, nazwisk ani wyników użytkowników rozwiązujących quizy. W związku z technicznym udostępnianiem zasobów dostawca może jednak przetwarzać dane niezbędne do realizacji żądań i ochrony infrastruktury.

1. Administrator może korzystać również z usług dostawcy poczty elektronicznej w celu odbierania i obsługi wiadomości kierowanych na adres kontaktowy Serwisu.

2. Dane mogą być udostępniane osobom współpracującym z Administratorem w zakresie niezbędnym do obsługi Serwisu, z zachowaniem odpowiednich zasad poufności i ochrony danych.

3. Dane mogą zostać udostępnione uprawnionym organom publicznym wyłącznie w przypadkach przewidzianych przepisami prawa.

4. Administrator nie sprzedaje danych osobowych użytkowników Serwisu ani nie udostępnia ich podmiotom trzecim w celu prowadzenia przez nie niezależnych kampanii reklamowych.

5. W przypadku korzystania z usług podmiotów przetwarzających dane osobowe w imieniu Administratora współpraca odbywa się na podstawie właściwych warunków umownych, w tym umowy lub postanowień dotyczących powierzenia przetwarzania danych, gdy wymagają tego przepisy RODO.

§ 8. Przekazywanie danych poza Europejski Obszar Gospodarczy

1. W związku z korzystaniem z usług Netlify, Sanity CMS oraz dostawcy poczty elektronicznej dane osobowe mogą być przekazywane poza Europejski Obszar Gospodarczy, w szczególności do Stanów Zjednoczonych, zgodnie z zakresem i sposobem działania poszczególnych usług.

2. Przekazywanie danych osobowych poza Europejski Obszar Gospodarczy odbywa się wyłącznie z zachowaniem wymogów określonych w rozdziale V RODO, w szczególności na podstawie właściwej decyzji Komisji Europejskiej stwierdzającej odpowiedni stopień ochrony danych lub z zastosowaniem odpowiednich zabezpieczeń, takich jak standardowe klauzule umowne zatwierdzone przez Komisję Europejską.

3. Informacje o stosowanych mechanizmach przekazywania danych oraz możliwości uzyskania kopii odpowiednich zabezpieczeń można uzyskać, kontaktując się z Administratorem pod adresem s097260@student.wum.edu.pl.

§ 9. Okres przechowywania danych

1. Dane osobowe są przechowywane przez okres niezbędny do realizacji celu, w którym zostały zebrane, z uwzględnieniem obowiązujących przepisów prawa.

2. Dane techniczne, w tym informacje zawarte w dziennikach serwerowych, są przechowywane przez okres 12 miesięcy, zgodnie z rzeczywistą konfiguracją infrastruktury oraz zasadami przetwarzania danych stosowanymi przez dostawców usług. Dane te są wykorzystywane w celu zapewnienia prawidłowego funkcjonowania Serwisu, jego bezpieczeństwa oraz diagnozowania problemów technicznych.

3. Dane osobowe przekazane w korespondencji elektronicznej są przechowywane przez czas niezbędny do rozpatrzenia sprawy i udzielenia odpowiedzi, a następnie przez okres 12 miesięcy, jeżeli jest to niezbędne do udokumentowania korespondencji, ustalenia, dochodzenia lub obrony przed roszczeniami.

1. Imiona, nazwiska i wyniki wprowadzone do lokalnego mechanizmu quizu oraz generatora certyfikatów nie są zapisywane w bazie danych Administratora. Informacje te są wykorzystywane wyłącznie w bieżącej sesji aplikacji i nie są zachowywane przez mechanizm quizu po jej zakończeniu.

2. Okresy przechowywania danych związanych z organizacją konkursu edukacyjnego określa odrębna klauzula informacyjna RODO dotycząca konkursu.

3. Po upływie właściwych okresów dane są usuwane lub poddawane skutecznej anonimizacji, chyba że dalsze przechowywanie wynika z obowiązku prawnego lub innej zgodnej z prawem podstawy przetwarzania.

§ 10. Prawa osób, których dane dotyczą

1. Każdej osobie, której dane osobowe są przetwarzane przez Administratora, przysługują – w przypadkach i zakresie przewidzianych przepisami RODO – następujące prawa:

1. prawo dostępu do danych osobowych oraz uzyskania ich kopii;

2. prawo do sprostowania danych nieprawidłowych lub uzupełnienia danych niekompletnych;

3. prawo do usunięcia danych, jeżeli zachodzą przesłanki określone w art. 17 RODO;

4. prawo do ograniczenia przetwarzania danych;

5. prawo do przenoszenia danych, gdy spełnione są ustawowe warunki tego prawa;

6. prawo wniesienia sprzeciwu wobec przetwarzania danych osobowych na podstawie art. 6 ust. 1 lit. f RODO;

7. prawo do cofnięcia zgody w dowolnym momencie, jeżeli określone przetwarzanie odbywa się na podstawie zgody, bez wpływu na zgodność z prawem przetwarzania dokonanego przed jej cofnięciem.

1. W celu realizacji przysługujących praw można skontaktować się z Administratorem pod adresem: s097260@student.wum.edu.pl.

2. Administrator może zwrócić się o przekazanie dodatkowych informacji niezbędnych do potwierdzenia tożsamości osoby składającej żądanie, jeżeli istnieją uzasadnione wątpliwości co do jej tożsamości.

3. Administrator udziela odpowiedzi na żądania dotyczące realizacji praw zgodnie z terminami i zasadami przewidzianymi w art. 12 RODO.

4. Jeżeli Administrator nie posiada danych identyfikujących osobę, w szczególności dlatego, że dane zostały wykorzystane wyłącznie lokalnie w przeglądarce użytkownika, nie ma obowiązku pozyskiwania dodatkowych danych wyłącznie w celu umożliwienia identyfikacji tej osoby.

§ 11. Prawo do wniesienia skargi

1. Osoba, której dane dotyczą, ma prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, jeżeli uzna, że przetwarzanie jej danych osobowych narusza przepisy RODO.

2. Organem nadzorczym właściwym w Polsce jest Prezes Urzędu Ochrony Danych Osobowych.

3. Informacje o sposobie składania skarg są dostępne na stronie internetowej: https://uodo.gov.pl/.

4. Skorzystanie z prawa wniesienia skargi nie wyłącza możliwości kontaktu z Administratorem w celu wyjaśnienia sprawy.

§ 12. Pliki cookies i podobne technologie

1. Pliki cookies są niewielkimi informacjami zapisywanymi na urządzeniu końcowym użytkownika lub odczytywanymi z tego urządzenia podczas korzystania ze strony internetowej.

2. Podobne technologie mogą obejmować również inne mechanizmy przechowywania informacji lub uzyskiwania dostępu do informacji znajdujących się na urządzeniu użytkownika.

3. Serwis został zaprojektowany jako strona edukacyjna, która nie wymaga kont użytkowników, nie prowadzi profilowania reklamowego ani nie korzysta z narzędzi takich jak Google Analytics czy Meta Pixel.

4. Na potrzeby funkcjonowania Serwisu wykorzystywane są usługi Netlify i Sanity CMS. W zależności od konfiguracji technicznej usługi te mogą wykorzystywać pliki cookies lub inne technologie niezbędne do prawidłowego działania infrastruktury, zapewnienia bezpieczeństwa i dostarczania treści.

5. Serwis nie wykorzystuje cookies marketingowych ani reklamowych w ramach potwierdzonej konfiguracji.

6. Mechanizm quizu wykorzystuje tymczasowy stan aplikacji w przeglądarce. Dane wpisane do generatora certyfikatu nie są celowo zapisywane przez mechanizm quizu w plikach cookies ani w pamięci trwałej przeglądarki.

7. Pliki cookies i podobne technologie, których użycie jest niezbędne do świadczenia usługi żądanej przez Użytkownika lub prawidłowego przekazania komunikatu za pośrednictwem sieci, mogą być stosowane w zakresie przewidzianym przez obowiązujące przepisy bez uzyskiwania odrębnej zgody.

8. Jeżeli Administrator w przyszłości wprowadzi technologie, których stosowanie wymaga zgody użytkownika, odpowiednie mechanizmy będą uruchamiane dopiero po uzyskaniu wymaganej zgody, z zapewnieniem możliwości jej odmowy i wycofania.

9. Sam fakt korzystania z Serwisu lub kontynuowania przeglądania strony nie jest traktowany jako zgoda na stosowanie technologii wymagających odrębnej zgody.

10. Użytkownik może zarządzać plikami cookies za pomocą ustawień swojej przeglądarki internetowej, w szczególności usuwać je, blokować lub ograniczać ich zapisywanie.

11. Ograniczenie stosowania niektórych technologii niezbędnych do funkcjonowania Serwisu może wpłynąć na prawidłowe działanie wybranych funkcjonalności.

12. Serwis wykorzystuje wyłącznie pliki cookies lub podobne technologie niezbędne do prawidłowego funkcjonowania strony, zapewnienia bezpieczeństwa oraz technicznego dostarczania treści, o ile są stosowane w ramach usług Netlify i Sanity CMS. Serwis nie wykorzystuje plików cookies do profilowania reklamowego ani prowadzenia działań marketingowych. Stosowanie technologii niezbędnych odbywa się zgodnie z art. 399 ustawy – Prawo komunikacji elektronicznej.

§ 13. Zabezpieczenie danych osobowych

1. Administrator stosuje środki techniczne i organizacyjne odpowiednie do charakteru, zakresu i ryzyka związanego z przetwarzaniem danych osobowych.

2. Środki te służą w szczególności ochronie danych przed nieuprawnionym dostępem, przypadkową utratą, zniszczeniem, nieuprawnioną zmianą lub ujawnieniem.

3. Serwis korzysta z infrastruktury technicznej dostawców usług hostingowych i zarządzania treścią, którzy stosują własne środki bezpieczeństwa w zakresie świadczonych usług.

4. Dostęp do narzędzi administracyjnych wykorzystywanych do zarządzania Serwisem powinien być ograniczony do osób upoważnionych.

5. Administrator zapewnia, aby zakres dostępu do danych i treści odpowiadał rzeczywistym zadaniom osób korzystających z zaplecza technicznego.

6. Żadne rozwiązanie techniczne nie gwarantuje całkowitego wyeliminowania zagrożeń związanych z korzystaniem z Internetu. Administrator podejmuje jednak działania odpowiednie do wymaganego poziomu ochrony danych.

§ 14. Dane osób niepełnoletnich

1. Serwis ma charakter edukacyjny i może być wykorzystywany również przez osoby niepełnoletnie, w szczególności uczniów szkół ponadpodstawowych.

2. Korzystanie z ogólnodostępnych materiałów edukacyjnych i quizów nie wymaga zakładania konta ani podawania danych kontaktowych.

3. Administrator stosuje rozwiązania zmierzające do ograniczenia przetwarzania danych osobowych osób niepełnoletnich do niezbędnego minimum.

4. Imię i nazwisko wpisane do generatora certyfikatu nie są zapisywane w bazie danych Administratora.

5. W przypadku uczestnictwa osoby niepełnoletniej w konkursie edukacyjnym wymagane jest spełnienie zasad dotyczących zgody przedstawiciela ustawowego oraz przekazania odpowiednich informacji o przetwarzaniu danych, określonych w dokumentacji konkursowej.

6. Informacje dotyczące ochrony danych osobowych powinny być przedstawiane osobom niepełnoletnim w sposób jasny i zrozumiały, odpowiedni do charakteru oferowanych funkcjonalności.

7. Wprowadzenie w przyszłości nowych funkcjonalności wymagających zbierania danych osobowych dzieci lub młodzieży będzie poprzedzone oceną właściwej podstawy prawnej i dodatkowych obowiązków wynikających z przepisów o ochronie danych osobowych.

§ 15. Linki do stron zewnętrznych

1. Serwis może zawierać odnośniki do stron internetowych instytucji naukowych, medycznych, edukacyjnych, partnerów projektu lub innych podmiotów.

2. Po przejściu na zewnętrzną stronę internetową zasady przetwarzania danych osobowych mogą być określane przez podmiot odpowiedzialny za tę stronę.

3. Administrator nie określa zasad przetwarzania danych przez niezależnych administratorów zewnętrznych stron internetowych.

4. Użytkownik powinien zapoznać się z odpowiednimi informacjami dotyczącymi ochrony prywatności udostępnianymi przez podmioty prowadzące strony zewnętrzne.

5. Niniejszy paragraf nie wyłącza odpowiedzialności Administratora za własne działania związane z udostępnianiem odnośników lub integrowaniem usług zewnętrznych, jeżeli taka odpowiedzialność wynika z obowiązujących przepisów.

§ 16. Zautomatyzowane podejmowanie decyzji i profilowanie

1. Administrator nie wykorzystuje danych osobowych Użytkowników Serwisu do podejmowania decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu, wywołujących wobec nich skutki prawne lub w podobny sposób istotnie na nich wpływających, w rozumieniu art. 22 RODO.

2. Administrator nie prowadzi profilowania użytkowników w celach marketingowych ani reklamowych.

3. Automatyczne sprawdzanie odpowiedzi w Quizie i obliczanie wyniku służy wyłącznie realizacji funkcji edukacyjnej i nie stanowi decyzji wywołującej skutki określone w art. 22 RODO.

4. Ocena prac konkursowych odbywa się zgodnie z odrębnym Regulaminem Konkursu.

§ 17. Zmiany Polityki prywatności

1. Administrator może aktualizować niniejszą Politykę prywatności w przypadku zmiany przepisów prawa, sposobu funkcjonowania Serwisu, zakresu przetwarzania danych osobowych lub stosowanych rozwiązań technicznych.

2. Aktualna wersja Polityki prywatności będzie udostępniana w Serwisie wraz z datą jej obowiązywania.

3. Jeżeli wprowadzone zmiany będą wymagały przekazania dodatkowych informacji osobom, których dane dotyczą, lub uzyskania zgody na określone działania, Administrator podejmie odpowiednie czynności zgodnie z obowiązującymi przepisami.

4. Zmiany Polityki prywatności nie wpływają na zgodność z prawem przetwarzania dokonanego przed ich wprowadzeniem.

§ 18. Postanowienia końcowe

1. Niniejsza Polityka prywatności stanowi dokument informacyjny dotyczący zasad ochrony danych osobowych oraz wykorzystywania cookies i podobnych technologii w Serwisie.

2. Polityka prywatności jest dostępna nieodpłatnie pod adresem internetowym Serwisu w sposób umożliwiający zapoznanie się z jej treścią.

3. W sprawach nieuregulowanych niniejszą Polityką zastosowanie znajdują właściwe przepisy prawa, w szczególności RODO oraz ustawa – Prawo komunikacji elektronicznej.

4. Niniejsza Polityka prywatności obowiązuje od dnia 06.11.2026r.

Administrator danych osobowych

Olivia Moritz
$tag_polityka_text$)
on conflict (key) do update set value = excluded.value, updated_at = now();

insert into site_texts (key, value)
values ('regulamin.text', $tag_regulamin_text$REGULAMIN KORZYSTANIA Z SERWISU INTERNETOWEGO „UWAGA KLESZCZ!”

§ 1. Postanowienia ogólne

1.  Niniejszy Regulamin określa zasady korzystania z serwisu internetowego „Uwaga Kleszcz!”, dostępnego pod adresem https://uwagakleszcz.netlify.app/, zwanego dalej „Serwisem”, w tym warunki świadczenia usług drogą elektroniczną, korzystania z materiałów edukacyjnych, quizów i certyfikatów oraz prawa i obowiązki użytkowników.

2.  Właścicielem i administratorem Serwisu oraz usługodawcą w rozumieniu przepisów o świadczeniu usług drogą elektroniczną jest Olivia Moritz, osoba fizyczna realizująca indywidualny projekt edukacyjny w ramach programu „Uczelnie Przyszłości”, zwana dalej „Administratorem”.

3.  Dane Administratora:

  Imię i nazwisko: Olivia Moritz

  Adres: Dąbrowica 5A,05-326 Poświętne

  Adres e-mail: s097260@student.wum.edu.pl

4.  Serwis ma charakter informacyjny i edukacyjny. Jego celem jest upowszechnianie wiedzy na temat kleszczy, chorób odkleszczowych, w szczególności boreliozy i kleszczowego zapalenia mózgu, oraz zasad profilaktyki i ograniczania ryzyka zakażenia.

5.  Serwis jest skierowany do szerokiego grona odbiorców, w szczególności uczniów, nauczycieli oraz osób zainteresowanych profilaktyką zdrowotną. Wybrane funkcjonalności mogą stanowić element ogólnopolskiego konkursu edukacyjnego organizowanego przez Administratora.

6.  Korzystanie z Serwisu jest dobrowolne i bezpłatne. Administrator nie pobiera opłat za przeglądanie treści, korzystanie z materiałów edukacyjnych, rozwiązywanie quizów ani generowanie certyfikatów.

7.  Regulamin jest udostępniany nieodpłatnie w Serwisie, w sposób umożliwiający jego pobranie, zapisanie i odtworzenie.

8.  Korzystanie z poszczególnych funkcjonalności Serwisu odbywa się na zasadach określonych w niniejszym Regulaminie oraz zgodnie z obowiązującymi przepisami prawa.

§ 2. Definicje

Na potrzeby niniejszego Regulaminu przyjmuje się następujące definicje:

1.  Administrator – Olivia Moritz, prowadząca Serwis i świadcząca za jego pośrednictwem usługi drogą elektroniczną.

2.  Serwis – strona internetowa „Uwaga Kleszcz!” wraz z dostępnymi w niej treściami, materiałami i funkcjonalnościami.

3.  Użytkownik – każda osoba korzystająca z Serwisu, niezależnie od wieku i celu korzystania.

4.  Materiały Edukacyjne – udostępniane w Serwisie artykuły, opracowania, prezentacje, ilustracje, grafiki, pliki PDF, PPTX oraz inne treści informacyjne i dydaktyczne.

5.  Quiz – interaktywny moduł edukacyjny umożliwiający sprawdzenie wiedzy użytkownika poprzez udzielanie odpowiedzi na pytania.

6.  Certyfikat – dokument elektroniczny generowany na podstawie danych wprowadzonych przez Użytkownika i wyniku uzyskanego w Quizie, zgodnie z zasadami określonymi dla danej ścieżki edukacyjnej.

7.  Konkurs – ogólnopolski konkurs edukacyjny „Zauważ ryzyko, zanim kleszcz zauważy Ciebie – Nie odkładaj – Działaj!”, którego szczegółowe zasady określa odrębny regulamin.

§ 3. Zakres usług świadczonych drogą elektroniczną

1.  Administrator umożliwia Użytkownikom nieodpłatne korzystanie z następujących funkcjonalności Serwisu:

    a)  przeglądania treści informacyjnych dotyczących kleszczy, chorób odkleszczowych i profilaktyki zdrowotnej;

    b)  korzystania z bazy wiedzy oraz udostępnionych materiałów edukacyjnych;

    c)  pobierania materiałów przeznaczonych do wykorzystania w procesie edukacyjnym;

    d)  rozwiązywania quizów sprawdzających wiedzę;

    e)  generowania i pobierania imiennych certyfikatów, jeżeli dana funkcjonalność przewiduje ich wydawanie;

    f)  zapoznawania się z informacjami dotyczącymi Konkursu oraz dokumentami związanymi z uczestnictwem;

    g)  korzystania z odnośników do materiałów i zasobów zewnętrznych.

2.  Dostęp do podstawowych funkcjonalności Serwisu nie wymaga zakładania konta użytkownika ani rejestracji.

3.  Usługi polegające na udostępnianiu treści są świadczone od momentu rozpoczęcia korzystania z danej funkcjonalności do momentu zakończenia korzystania z niej przez Użytkownika.

4.  Usługa polegająca na wygenerowaniu Certyfikatu jest świadczona w ramach danej sesji korzystania z Quizu i kończy się z chwilą udostępnienia możliwości pobrania dokumentu albo zakończenia sesji przez Użytkownika.

5.  Użytkownik może w dowolnym momencie zakończyć korzystanie z Serwisu poprzez opuszczenie strony internetowej. Nie wymaga to składania dodatkowych oświadczeń ani wypowiedzenia odrębnej umowy.

6.  Administrator może rozwijać, aktualizować lub modyfikować dostępne funkcjonalności, z zachowaniem obowiązków wynikających z przepisów prawa oraz zasad określonych w niniejszym Regulaminie.

§ 4. Warunki techniczne korzystania z Serwisu

1.  Do korzystania z Serwisu niezbędne są:

    a)  urządzenie umożliwiające dostęp do Internetu;

    b)  aktywne połączenie internetowe;

    c)  aktualna przeglądarka internetowa obsługująca standardowe technologie wykorzystywane przez współczesne strony internetowe, w tym JavaScript;

    d)  oprogramowanie umożliwiające otwieranie pobieranych plików, w szczególności dokumentów PDF, jeżeli Użytkownik chce korzystać z materiałów w tej formie.

2.  Niektóre funkcjonalności Serwisu, w szczególności Quiz i generowanie Certyfikatu, wymagają włączonej obsługi JavaScript.

3.  Pobieranie Certyfikatów oraz Materiałów Edukacyjnych może wymagać zapewnienia odpowiedniej ilości wolnej pamięci na urządzeniu Użytkownika.

4.  Korzystanie z Internetu wiąże się z typowymi zagrożeniami bezpieczeństwa teleinformatycznego, w szczególności ryzykiem przechwycenia danych, działania szkodliwego oprogramowania, nieuprawnionego dostępu do urządzenia lub korzystania z nieaktualnego oprogramowania.

5.  Administrator stosuje rozwiązania techniczne odpowiednie do charakteru Serwisu oraz zaleca Użytkownikom korzystanie z aktualnego oprogramowania i zachowanie podstawowych zasad bezpieczeństwa w Internecie.

6.  Administrator nie gwarantuje nieprzerwanej dostępności Serwisu w przypadku awarii infrastruktury zewnętrznej, przerw technicznych lub innych okoliczności niezależnych od Administratora. Ograniczenia te nie wyłączają odpowiedzialności Administratora przewidzianej przez bezwzględnie obowiązujące przepisy prawa.

§ 5. Zasady korzystania z Serwisu

1.  Użytkownik zobowiązany jest korzystać z Serwisu zgodnie z obowiązującymi przepisami prawa, niniejszym Regulaminem oraz z poszanowaniem praw innych osób.

2.  Zabronione jest w szczególności:

    a)  podejmowanie działań mających na celu zakłócenie funkcjonowania Serwisu lub jego infrastruktury;

    b)  podejmowanie prób uzyskania nieuprawnionego dostępu do systemów informatycznych związanych z Serwisem;

    c)  wykorzystywanie Serwisu do działań bezprawnych;

    d)  dostarczanie za pośrednictwem Serwisu treści o charakterze bezprawnym;

    e)  naruszanie praw autorskich, dóbr osobistych oraz innych praw przysługujących Administratorowi lub osobom trzecim.

3.  Użytkownik powinien korzystać z Quizu samodzielnie i zgodnie z jego przeznaczeniem, szczególnie jeżeli uzyskany Certyfikat ma służyć jako potwierdzenie ukończenia ścieżki edukacyjnej.

4.  Administrator może podejmować zgodne z prawem działania techniczne niezbędne do przeciwdziałania nadużyciom i zapewnienia prawidłowego funkcjonowania Serwisu.

§ 6. Materiały edukacyjne i zasady ich wykorzystywania

1.  Materiały Edukacyjne udostępniane w Serwisie służą przede wszystkim zwiększaniu wiedzy z zakresu profilaktyki chorób odkleszczowych i promowaniu bezpiecznych zachowań.

2.  Użytkownicy mogą nieodpłatnie przeglądać, pobierać, zapisywać i drukować materiały udostępnione w Serwisie jako materiały przeznaczone do pobrania.

3.  Materiały mogą być nieodpłatnie wykorzystywane przez uczniów, nauczycieli, szkoły i inne placówki edukacyjne do celów dydaktycznych, informacyjnych i niekomercyjnych, w szczególności podczas lekcji, warsztatów, prezentacji i zajęć profilaktycznych, z zastrzeżeniem praw osób trzecich oraz odmiennych oznaczeń zamieszczonych przy danym materiale.

4.  Przy dalszym udostępnianiu materiałów należy zachować oznaczenie autorstwa, źródła oraz informacje o licencji, jeżeli zostały wskazane.

5.  Uprawnienia określone w niniejszym paragrafie dotyczą materiałów, do których Administrator posiada odpowiednie prawa lub upoważnienie do udzielania wskazanych zezwoleń. Nie obejmują automatycznie materiałów osób trzecich udostępnionych na odrębnych warunkach.

6.  Bez odrębnego uprawnienia nie jest dozwolone wykorzystywanie materiałów w sposób naruszający prawa osób trzecich, w szczególności przypisywanie sobie cudzego autorstwa lub rozpowszechnianie zmodyfikowanych materiałów w sposób sugerujący ich zatwierdzenie przez Administratora, jeżeli takie zatwierdzenie nie nastąpiło.

7.  Administrator może zamieszczać w Serwisie materiały opracowane przy wykorzystaniu narzędzi sztucznej inteligencji. Materiały takie podlegają odpowiedniej weryfikacji przed ich udostępnieniem jako docelowe treści edukacyjne.

8.  Ochrona prawna poszczególnych materiałów, w tym elementów wygenerowanych z wykorzystaniem sztucznej inteligencji, zależy od ich charakteru oraz spełnienia przesłanek przewidzianych w obowiązujących przepisach prawa.

9.  Postanowienia niniejszego paragrafu nie ograniczają uprawnień wynikających z przepisów o dozwolonym użytku ani innych ustawowych wyjątków i ograniczeń praw autorskich.

§ 7. Informacje dotyczące zdrowia

1.  Treści publikowane w Serwisie mają charakter edukacyjny i informacyjny oraz służą upowszechnianiu wiedzy na temat profilaktyki zdrowotnej.

2.  Informacje udostępniane w Serwisie nie stanowią indywidualnej diagnozy medycznej, porady lekarskiej ani zalecenia terapeutycznego dostosowanego do sytuacji konkretnej osoby.

3.  Korzystanie z informacji znajdujących się w Serwisie nie zastępuje konsultacji z lekarzem ani innym uprawnionym pracownikiem ochrony zdrowia, w szczególności w przypadku wystąpienia objawów mogących wskazywać na chorobę odkleszczową.

4.  W przypadku podejrzenia zakażenia, wystąpienia niepokojących objawów lub pogorszenia stanu zdrowia należy skorzystać z odpowiedniej pomocy medycznej.

5.  Administrator dokłada starań, aby publikowane informacje były rzetelne, aktualne i zgodne z dostępną wiedzą naukową, w szczególności zasadami medycyny opartej na dowodach naukowych (Evidence-Based Medicine, EBM).

6.  Administrator może aktualizować lub korygować treści edukacyjne w związku z rozwojem wiedzy medycznej, zmianą zaleceń właściwych instytucji lub stwierdzeniem nieścisłości.

7.  Edukacyjny charakter Serwisu nie wyłącza odpowiedzialności Administratora w przypadkach określonych przez obowiązujące przepisy prawa.

§ 8. Quizy edukacyjne

1.  Serwis umożliwia korzystanie z interaktywnych quizów sprawdzających wiedzę zdobytą podczas korzystania z materiałów i ścieżek edukacyjnych.

2.  Quizy mają charakter edukacyjny. Ich celem jest utrwalanie wiedzy oraz umożliwienie Użytkownikowi samodzielnego sprawdzenia stopnia opanowania określonych zagadnień.

3.  Szczegółowe zasady zaliczenia Quizu, w szczególności liczba pytań, wymagany wynik i możliwość ponownego podejścia, są wskazywane przy danym Quizie lub w zasadach odpowiedniej ścieżki edukacyjnej.

4.  Jeżeli Quiz stanowi element obowiązkowej ścieżki edukacyjnej Konkursu, zastosowanie mają również wymagania wynikające z Regulaminu Konkursu.

5.  Korzystanie z Quizu nie wymaga zakładania konta ani podawania adresu e-mail.

6.  Wyniki Quizu są przetwarzane na potrzeby bieżącej sesji użytkownika. Serwis nie prowadzi bazy danych wyników ani historii ukończonych quizów.

7.  Zakończenie sesji lub odświeżenie strony może spowodować utratę bieżącego wyniku i konieczność ponownego rozwiązania Quizu.

8.  Administrator nie zapewnia możliwości odtworzenia wyniku po zakończeniu sesji, jeżeli Użytkownik nie zachował wygenerowanego potwierdzenia.

§ 9. Generowanie certyfikatów

1.  Po spełnieniu warunków określonych dla danego Quizu lub ścieżki edukacyjnej Użytkownik może otrzymać możliwość wygenerowania imiennego Certyfikatu.

2.  Wygenerowanie Certyfikatu wymaga wpisania imienia i nazwiska, które zostaną umieszczone na dokumencie.

3.  Dane wprowadzone przez Użytkownika w celu wygenerowania Certyfikatu są wykorzystywane wyłącznie lokalnie, w obrębie przeglądarki internetowej, bez przesyłania ich do bazy danych Administratora.

4.  Administrator nie zapisuje imion i nazwisk wpisanych do generatora, nie prowadzi rejestru wygenerowanych Certyfikatów i nie przechowuje historii wyników Quizu.

5.  Certyfikat jest udostępniany do samodzielnego pobrania przez Użytkownika. Serwis nie wymaga podawania adresu e-mail i nie wysyła Certyfikatów pocztą elektroniczną.

6.  Użytkownik powinien zweryfikować poprawność danych wpisanych na Certyfikacie przed jego pobraniem.

7.  Po zakończeniu sesji Administrator nie ma możliwości odtworzenia Certyfikatu na podstawie wcześniej wpisanych danych.

8.  Certyfikat potwierdza ukończenie określonego Quizu lub ścieżki edukacyjnej zgodnie z warunkami wskazanymi w Serwisie. Nie jest dokumentem potwierdzającym kwalifikacje zawodowe, uprawnienia medyczne ani ukończenie formalnego kształcenia.

9.  Jeżeli Certyfikat stanowi wymagany załącznik do zgłoszenia konkursowego, Użytkownik jest zobowiązany zachować go i przekazać Organizatorowi w sposób określony w Regulaminie Konkursu.

10. Certyfikat nie stanowi samodzielnego potwierdzenia tożsamości osoby, której dane zostały na nim wpisane. Zasady jego akceptacji i ewentualnej weryfikacji na potrzeby Konkursu określa Organizator Konkursu.

§ 10. Korzystanie z Serwisu przez osoby niepełnoletnie

1.  Serwis zawiera treści edukacyjne dostępne również dla osób niepełnoletnich.

2.  Materiały przeznaczone dla młodzieży powinny być przedstawiane w sposób dostosowany do wieku i możliwości poznawczych odbiorców.

3.  Korzystanie z ogólnodostępnych treści Serwisu i rozwiązywanie Quizów nie wymaga podawania danych kontaktowych ani zakładania konta.

4.  Administrator zaleca, aby młodsi Użytkownicy korzystali z treści dotyczących zdrowia w razie potrzeby przy wsparciu rodzica, opiekuna lub nauczyciela.

5.  Udział osób niepełnoletnich w Konkursie wymaga spełnienia warunków przewidzianych w odrębnym Regulaminie Konkursu, w tym uzyskania wymaganej zgody przedstawiciela ustawowego.

6.  Korzystanie z ogólnodostępnych funkcjonalności Serwisu nie jest równoznaczne ze zgłoszeniem udziału w Konkursie.

§ 11. Konkurs edukacyjny

1.  Serwis może być wykorzystywany do informowania o ogólnopolskim konkursie edukacyjnym „Zauważ ryzyko, zanim kleszcz zauważy Ciebie – Nie odkładaj – Działaj!”.

2.  Szczegółowe zasady Konkursu, w tym warunki udziału, wymagania dotyczące prac, harmonogram, sposób zgłoszenia, kryteria oceny, nagrody, prawa autorskie oraz przetwarzanie danych osobowych uczestników określają odrębny Regulamin Konkursu i związana z nim dokumentacja.

3.  Zapoznanie się z treścią Serwisu lub ukończenie Quizu nie oznacza automatycznego zgłoszenia do Konkursu.

4.  Uczestnictwo w Konkursie wymaga dokonania zgłoszenia zgodnie z jego regulaminem.

5.  W razie rozbieżności między ogólnymi postanowieniami niniejszego Regulaminu a szczegółowymi zasadami uczestnictwa w Konkursie, do kwestii konkursowych zastosowanie ma Regulamin Konkursu, z zastrzeżeniem przepisów bezwzględnie obowiązujących.

6.  Informacje dotyczące Konkursu powinny być udostępnione w Serwisie w sposób umożliwiający zapoznanie się z właściwą dokumentacją przed dokonaniem zgłoszenia.

§ 12. Prawa autorskie i treści osób trzecich

1.  Treści zamieszczone w Serwisie mogą podlegać ochronie na podstawie przepisów prawa autorskiego lub innych przepisów dotyczących własności intelektualnej.

2.  Prawa do poszczególnych materiałów przysługują Administratorowi lub innym uprawnionym podmiotom, stosownie do ich autorstwa i podstawy prawnej wykorzystania.

3.  Sam fakt udostępnienia materiału w Serwisie nie oznacza przeniesienia praw autorskich na Użytkownika.

4.  Korzystanie z materiałów jest dozwolone w zakresie określonym w § 6 Regulaminu, na podstawie indywidualnie wskazanych warunków licencyjnych lub w granicach przewidzianych przez obowiązujące przepisy prawa.

5.  Znaki graficzne, logotypy i oznaczenia partnerów, patronów oraz innych podmiotów pozostają objęte prawami właściwych uprawnionych, jeżeli taka ochrona im przysługuje.

6.  Publikacja logotypu w Serwisie nie oznacza udzielenia Użytkownikowi prawa do jego dalszego wykorzystywania.

7.  Prawa autorskie do prac zgłaszanych w ramach Konkursu oraz zakres uprawnień udzielanych Organizatorowi określa Regulamin Konkursu.

§ 13. Ochrona danych osobowych i technologie wykorzystywane przez Serwis

1.  Administratorem danych osobowych przetwarzanych w związku z funkcjonowaniem Serwisu jest Olivia Moritz.

2.  Szczegółowe informacje dotyczące przetwarzania danych osobowych, w tym zakresu przetwarzania, podstaw prawnych, odbiorców danych oraz praw osób, których dane dotyczą, znajdują się w Polityce prywatności Serwisu.

3.  Serwis korzysta z infrastruktury hostingowej Netlify oraz systemu zarządzania treścią Sanity CMS.

4.  Serwis nie wymaga rejestracji kont użytkowników ani nie prowadzi bazy danych osobowych uczestników Quizu.

5.  Dane wpisywane do generatora Certyfikatu są wykorzystywane wyłącznie w ramach bieżącej sesji przeglądarki, zgodnie z zasadami określonymi w § 9.

6.  Dane przekazywane w związku z udziałem w Konkursie są przetwarzane na zasadach określonych w odrębnej klauzuli informacyjnej RODO dotyczącej Konkursu.

7.  Informacje o stosowanych technologiach przechowywania informacji na urządzeniu Użytkownika, w tym ewentualnych plikach cookies, znajdują się w Polityce prywatności.

§ 14. Zgłaszanie problemów i reklamacje

1.  Użytkownik może zgłaszać Administratorowi nieprawidłowości związane z działaniem Serwisu, dostępnością materiałów edukacyjnych, funkcjonowaniem Quizu lub generowaniem Certyfikatów.

2.  Zgłoszenia i reklamacje należy kierować na adres e-mail: s097260@student.wum.edu.pl.

3.  W zgłoszeniu należy wskazać opis problemu, funkcjonalność, której dotyczy, oraz informacje umożliwiające jego wyjaśnienie. Nie należy przesyłać danych osobowych ani innych informacji wykraczających poza zakres niezbędny do rozpatrzenia sprawy.

4.  Administrator rozpatruje reklamacje dotyczące usług świadczonych drogą elektroniczną w terminie 14 dni od ich otrzymania, chyba że przepisy prawa przewidują odmienny termin lub sposób postępowania.

5.  Jeżeli do wyjaśnienia sprawy konieczne są dodatkowe informacje, Administrator może zwrócić się do Użytkownika o ich uzupełnienie.

6.  Odpowiedź zostanie przekazana na adres e-mail, z którego dokonano zgłoszenia, chyba że Użytkownik wskaże inny właściwy sposób kontaktu.

7.  Reklamacje dotyczące przebiegu Konkursu, oceny prac lub przyznawania nagród są rozpatrywane na podstawie odrębnego Regulaminu Konkursu.

8.  Postanowienia niniejszego paragrafu nie ograniczają praw Użytkownika wynikających z obowiązujących przepisów.

§ 15. Dostępność i aktualizacja Serwisu

1.  Administrator podejmuje działania zmierzające do zapewnienia prawidłowego funkcjonowania Serwisu i dostępności jego podstawowych usług.

2.  W Serwisie mogą być prowadzone prace techniczne, konserwacyjne i aktualizacyjne, powodujące czasowe ograniczenia dostępności poszczególnych funkcjonalności.

3.  Administrator może aktualizować materiały edukacyjne, korygować błędy i usuwać nieaktualne informacje.

4.  W przypadku stwierdzenia błędu merytorycznego dotyczącego profilaktyki zdrowotnej Administrator podejmuje odpowiednie działania w celu jego zweryfikowania i skorygowania.

5.  Ograniczenie dostępności funkcjonalności związanych z Konkursem nie może prowadzić do nieuzasadnionego pozbawienia uczestników możliwości realizacji obowiązków przewidzianych w Regulaminie Konkursu. W przypadku istotnej awarii Administrator powinien podjąć odpowiednie działania organizacyjne, w tym rozważyć przedłużenie właściwych terminów, jeżeli będzie to uzasadnione okolicznościami.

§ 16. Zmiany Regulaminu

1.  Administrator może zmienić Regulamin z ważnych przyczyn, w szczególności w przypadku:

    a)  zmiany przepisów prawa mających wpływ na funkcjonowanie Serwisu;

    b)  zmiany sposobu świadczenia usług elektronicznych;

    c)  wprowadzenia nowych funkcjonalności lub zakończenia udostępniania dotychczasowych;

    d)  zmiany rozwiązań technicznych wykorzystywanych przez Serwis;

    e)  konieczności usunięcia niejasności lub zapewnienia zgodności dokumentacji ze sposobem działania Serwisu.

2.  Aktualna wersja Regulaminu będzie dostępna w Serwisie wraz z informacją o dacie jej obowiązywania.

3.  Zmiany Regulaminu nie naruszają praw nabytych przez Użytkowników ani uprawnień wynikających z obowiązujących przepisów prawa.

4.  Zmiany zasad uczestnictwa w Konkursie odbywają się na zasadach określonych w Regulaminie Konkursu.

§ 17. Postanowienia końcowe

1.  Regulamin podlega prawu polskiemu.

2.  W sprawach nieuregulowanych Regulaminem zastosowanie mają właściwe przepisy obowiązującego prawa, w szczególności przepisy dotyczące świadczenia usług drogą elektroniczną, ochrony danych osobowych oraz prawa autorskiego.

3.  Żadne postanowienie Regulaminu nie wyłącza ani nie ogranicza praw Użytkowników przysługujących im na podstawie bezwzględnie obowiązujących przepisów prawa.

4.  Regulamin jest dostępny w Serwisie nieodpłatnie, w sposób umożliwiający jego zapisanie i odtworzenie.

5.  Regulamin wchodzi w życie z dniem 01.11.2026r.

Administrator Serwisu

Olivia Moritz
$tag_regulamin_text$)
on conflict (key) do update set value = excluded.value, updated_at = now();

insert into site_texts (key, value)
values ('standardy_ochrony.text', $tag_standardy_ochrony_text$STANDARDY OCHRONY MAŁOLETNICH

dla projektu edukacyjnego „Zauważ ryzyko, zanim kleszcz zauważy Ciebie – Nie odkładaj – Działaj!”

Organizator: Olivia MoritzKontakt: s097260@student.wum.edu.pl

Data przyjęcia: 06.11.2026r.

§ 1. Cel i zakres Standardów

Standardy Ochrony Małoletnich określają zasady zapewnienia bezpieczeństwa osobom niepełnoletnim uczestniczącym w Projekcie i działaniach organizowanych przez Olivię Moritz.

Standardy służą ochronie godności, prywatności, zdrowia, bezpieczeństwa i praw małoletnich.

Standardy mają zastosowanie do działań realizowanych przez Organizatora, w szczególności:a) komunikacji z uczestnikami Konkursu;b) organizacji działań edukacyjnych;c) obsługi zgłoszeń i prac konkursowych;d) działań z udziałem osób wspierających Projekt;e) ewentualnych spotkań i wydarzeń stacjonarnych;f) działań prowadzonych za pośrednictwem Internetu.

Standardy obowiązują Organizatora oraz osoby dopuszczone do działalności związanej z małoletnimi w ramach Projektu, w zakresie wynikającym z ich faktycznych zadań.

W przypadku działań odbywających się na terenie szkoły stosuje się także właściwe procedury bezpieczeństwa obowiązujące w danej placówce.

§ 2. Podstawowe zasady ochrony małoletnich

Wszelkie działania powinny być prowadzone z poszanowaniem dobra i najlepszego interesu dziecka.

Każda osoba małoletnia powinna być traktowana z szacunkiem, bez dyskryminacji, przemocy, poniżania lub wywierania niedopuszczalnej presji.

Zabronione jest wykorzystywanie relacji organizacyjnej, przewagi wieku, wiedzy lub pozycji do naruszania granic małoletniego.

Udział w Konkursie jest dobrowolny.

Małoletni ma prawo zgłaszać niepokojące sytuacje, zadawać pytania dotyczące bezpieczeństwa i uzyskać informację, do kogo może zwrócić się o pomoc.

Żadne zgłoszenie dotyczące bezpieczeństwa nie może być przyczyną karania, poniżania lub niekorzystnego traktowania dziecka.

§ 3. Bezpieczne relacje z małoletnimi

Kontakt Organizatora i osób współpracujących z małoletnimi powinien pozostawać bezpośrednio związany z realizacją Projektu.

Komunikacja musi być prowadzona w sposób profesjonalny, odpowiedni do wieku uczestnika i zrozumiały.

Preferowanymi kanałami kontaktu są:a) oficjalny adres e-mail Projektu;b) oficjalna komunikacja za pośrednictwem rodzica lub opiekuna;c) kontakt za pośrednictwem szkoły i wyznaczonego nauczyciela;d) inne wcześniej uzgodnione, bezpieczne kanały komunikacji.

Niedopuszczalne są:a) kontakty o charakterze prywatnym, niezwiązanym z Projektem;b) wysyłanie nieodpowiednich treści;c) propozycje prywatnych spotkań bez wiedzy odpowiedzialnych osób;d) naruszanie prywatności uczestnika;e) wywieranie presji na udostępnianie zdjęć, nagrań lub danych osobowych;f) komentarze o charakterze seksualnym, obraźliwym, poniżającym lub dyskryminującym;g) przyjmowanie od małoletnich korzyści w zamian za preferencyjne traktowanie.

W razie potrzeby indywidualnego kontaktu dotyczącego Konkursu Organizator powinien korzystać z oficjalnych kanałów i dokumentować ustalenia niezbędne dla realizacji Projektu.

§ 4. Bezpieczne relacje między uczestnikami

Uczestnicy powinni traktować siebie wzajemnie z szacunkiem.

Zabronione są zachowania polegające na przemocy, zastraszaniu, dyskryminacji, wyśmiewaniu, cyberprzemocy i naruszaniu prywatności innych uczestników.

Niedopuszczalne jest publikowanie bez uprawnienia cudzych danych osobowych, prywatnej korespondencji, zdjęć lub nagrań.

W przypadku wystąpienia konfliktu lub zachowania zagrażającego bezpieczeństwu Organizator podejmuje działania adekwatne do sytuacji, w szczególności ogranicza możliwość dalszego naruszania praw uczestnika i informuje właściwe osoby lub instytucje.

§ 5. Bezpieczeństwo komunikacji internetowej

Projekt wykorzystuje narzędzia internetowe w celach edukacyjnych i organizacyjnych.

Organizator nie wymaga od małoletnich publikowania prywatnych zdjęć, danych o stanie zdrowia ani innych informacji niezwiązanych z udziałem w Projekcie.

Jeżeli pojawi się możliwość komunikowania się uczestników za pośrednictwem strony, jej funkcjonalności powinny być odpowiednio zabezpieczone i moderowane.

Zabronione jest wykorzystywanie narzędzi Projektu do przesyłania treści bezprawnych, pornograficznych, przemocowych, dyskryminujących albo naruszających prawa innych osób.

Organizator powinien stosować zabezpieczenia dostosowane do rzeczywistych funkcjonalności wykorzystywanych narzędzi.

Organizator nie publikuje danych małoletnich uczestników w sposób naruszający ich prywatność.

Małoletni powinni zostać poinformowani o konieczności ochrony swoich danych dostępowych i nieudostępniania ich innym osobom.

§ 6. Zasady udziału w wydarzeniach stacjonarnych

Ewentualne wydarzenia stacjonarne, w szczególności oficjalne otwarcie muralu, organizowane są z uwzględnieniem wieku i bezpieczeństwa uczestników.

Informacja o wydarzeniu powinna określać miejsce, termin, program, zasady udziału oraz osoby odpowiedzialne za organizację.

Udział w wydarzeniu jest dobrowolny.

Organizator nie zapewnia samodzielnie transportu uczestników ani opieki podczas ich podróży.

W przypadku osoby małoletniej należy przed wydarzeniem ustalić, kto odpowiada za opiekę nad nią w czasie dojazdu, pobytu i powrotu. Wymagane zgody i ustalenia powinny zostać odpowiednio udokumentowane.

Niedopuszczalne jest pozostawienie małoletniego bez wymaganej opieki w sytuacji, w której została ona powierzona Organizatorowi lub osobie współpracującej.

W razie zagrożenia zdrowia lub życia należy niezwłocznie podjąć odpowiednie działania, w tym skorzystać z numeru alarmowego 112.

§ 7. Zasady postępowania w przypadku podejrzenia krzywdzenia

Każda informacja wskazująca na możliwość krzywdzenia małoletniego powinna zostać potraktowana poważnie.

Osoba, która powzięła informację o zagrożeniu, powinna:a) zadbać w pierwszej kolejności o bezpieczeństwo małoletniego;b) w sytuacji bezpośredniego zagrożenia życia lub zdrowia wezwać odpowiednie służby, dzwoniąc pod numer 112;c) poinformować osobę odpowiedzialną za przyjmowanie zgłoszeń;d) udokumentować podstawowe informacje dotyczące zdarzenia;e) nie prowadzić samodzielnego przesłuchania dziecka ani działań mogących utrudnić czynności właściwych organów.

Jeżeli istnieje podejrzenie popełnienia przestępstwa na szkodę małoletniego, Organizator podejmuje działania zmierzające do przekazania informacji właściwym organom ścigania.

Jeżeli sytuacja wskazuje na konieczność interwencji sądu opiekuńczego, Organizator zawiadamia właściwy sąd rodzinny lub przekazuje odpowiednie informacje właściwej instytucji.

Rodzic lub opiekun powinien zostać poinformowany o zdarzeniu, o ile nie zagraża to bezpieczeństwu dziecka i nie utrudnia koniecznej interwencji.

W przypadku uzasadnionych obaw dotyczących krzywdzenia przez rodzica lub opiekuna Organizator nie przekazuje mu informacji w sposób, który mógłby zwiększyć zagrożenie dla małoletniego.

§ 8. Osoba odpowiedzialna za ochronę małoletnich

Osobą odpowiedzialną za stosowanie Standardów, przyjmowanie zgłoszeń i podejmowanie działań w ramach Projektu jest Olivia Moritz.

Dane kontaktowe:s097260@student.wum.edu.pl

Zgłoszenia mogą być przekazywane bezpośrednio Organizatorowi.

Jeżeli zgłoszenie dotyczy zachowania samego Organizatora, małoletni lub jego rodzic może zwrócić się bezpośrednio do właściwych organów, w szczególności Policji, sądu opiekuńczego lub osoby odpowiedzialnej za ochronę małoletnich w szkole.

Organizator nie może utrudniać zgłaszania nieprawidłowości zewnętrznym instytucjom.

§ 9. Dokumentowanie zdarzeń i ochrona informacji

Zgłoszenia dotyczące bezpieczeństwa małoletnich dokumentowane są w sposób pozwalający ustalić przebieg zdarzenia i podjęte działania.

Dokumentacja powinna zawierać wyłącznie informacje niezbędne, w szczególności:a) datę zgłoszenia;b) ogólny opis zdarzenia;c) informacje o podjętych działaniach;d) informację o przekazaniu sprawy właściwym organom;e) informację o dalszych czynnościach, jeżeli są konieczne.

Dokumentację przechowuje się w sposób zabezpieczający przed dostępem osób nieuprawnionych.

Informacje o sytuacji małoletniego nie mogą być rozpowszechniane osobom nieupoważnionym.

Dane zawarte w dokumentacji przechowuje się wyłącznie przez okres uzasadniony obowiązkami prawnymi i celem dokumentowania interwencji.

§ 10. Plan wsparcia małoletniego

Jeżeli w związku z działalnością Projektu zostanie ujawniona sytuacja krzywdzenia małoletniego, Organizator podejmuje działania mające na celu zapewnienie mu bezpieczeństwa.

Plan wsparcia powinien być dostosowany do potrzeb dziecka i charakteru zdarzenia.

Może obejmować w szczególności:a) zapewnienie bezpiecznej komunikacji;b) ograniczenie kontaktu z osobą stwarzającą zagrożenie;c) poinformowanie właściwych osób lub instytucji;d) skierowanie do pomocy pedagogicznej, psychologicznej albo innej specjalistycznej;e) uzgodnienie dalszego udziału w Projekcie, jeżeli jest to bezpieczne.

Organizator nie prowadzi samodzielnie terapii ani specjalistycznej pomocy psychologicznej, jeżeli nie posiada odpowiednich kwalifikacji.

W razie potrzeby współpracuje z uprawnionymi instytucjami.

§ 11. Weryfikacja osób współpracujących z małoletnimi

Przed dopuszczeniem osoby do działalności związanej z małoletnimi Organizator ocenia, czy do powierzanych czynności mają zastosowanie obowiązki wynikające z art. 21 ustawy o ochronie małoletnich.

W przypadkach objętych tym przepisem Organizator przeprowadza wymaganą weryfikację, w szczególności dotyczącą właściwych rejestrów i dokumentów potwierdzających niekaralność.

Weryfikacja dotyczy osób, których faktyczne obowiązki spełniają ustawowe kryteria, niezależnie od nazwy pełnionej funkcji.

Sam udział w Komisji Konkursowej, jeżeli obejmuje wyłącznie ocenę prac bez kontaktu z małoletnimi, wymaga odrębnej oceny pod kątem zastosowania przepisów.

Organizator nie dopuszcza osoby do czynności wymagających uprzedniego sprawdzenia przed wykonaniem właściwych obowiązków ustawowych.

§ 12. Przygotowanie osób współpracujących do stosowania Standardów

Za przygotowanie osób współpracujących do stosowania Standardów odpowiada Organizator.

Przed rozpoczęciem działań z małoletnimi osoby te zostają zapoznane z zasadami bezpiecznej komunikacji, reagowania na zagrożenia i zgłaszania nieprawidłowości.

Zapoznanie się ze Standardami powinno zostać udokumentowane, np. poprzez pisemne potwierdzenie lub korespondencję elektroniczną.

Osoby współpracujące otrzymują informację o osobie odpowiedzialnej za przyjmowanie zgłoszeń oraz zasadach postępowania w sytuacjach nagłych.

§ 13. Udostępnianie Standardów

Standardy są udostępniane uczestnikom oraz ich rodzicom lub opiekunom.

Organizator zapewnia dostęp do pełnej wersji dokumentu oraz do wersji skróconej przeznaczonej dla małoletnich.

Dokumenty mogą być udostępniane elektronicznie, a po uruchomieniu strony internetowej Projektu również za jej pośrednictwem.

W przypadku wydarzeń stacjonarnych informacja o możliwości zapoznania się ze Standardami powinna być dostępna dla uczestników.

Wersja skrócona stanowi załącznik do niniejszego dokumentu.

§ 14. Przegląd i aktualizacja

Za przegląd i aktualizację Standardów odpowiada Organizator.

Standardy podlegają okresowej ocenie, nie rzadziej niż raz na dwa lata, oraz wcześniej, gdy wymaga tego zmiana przepisów, formy działalności lub pojawienie się istotnego ryzyka.

Przegląd obejmuje ocenę skuteczności stosowanych zasad, sposób reagowania na zgłoszenia oraz potrzebę wprowadzenia dodatkowych zabezpieczeń.

Z przeprowadzonego przeglądu sporządza się krótką notatkę.

Aktualna wersja Standardów zostaje udostępniona uczestnikom i osobom współpracującym.

§ 15. Postanowienia końcowe

Standardy obowiązują od dnia [data].

Każda osoba podejmująca działania w Projekcie w zakresie związanym z małoletnimi jest zobowiązana do ich przestrzegania.

W sprawach nieuregulowanych mają zastosowanie obowiązujące przepisy prawa dotyczące ochrony małoletnich.

Organizator:

Olivia Moritz

Podpis: ........................................

ZAŁĄCZNIK NR 1

STANDARDY OCHRONY MAŁOLETNICH – WERSJA SKRÓCONA DLA UCZNIÓW

„Zauważ ryzyko, zanim kleszcz zauważy Ciebie – Nie odkładaj – Działaj!”

1. Twoje bezpieczeństwo jest ważne

Biorąc udział w projekcie i konkursie, masz prawo czuć się bezpiecznie i być traktowany/-a z szacunkiem.

Nikt nie ma prawa Cię obrażać, poniżać, zastraszać, dyskryminować ani zmuszać do działań, których nie chcesz podejmować.

2. Udział w konkursie jest dobrowolny

To Ty decydujesz, czy chcesz wziąć udział w konkursie.

Jeżeli nie masz ukończonych 18 lat, potrzebna będzie także odpowiednia zgoda rodzica lub opiekuna prawnego.

Nie musisz zgadzać się na publikowanie swojego zdjęcia, żeby uczestniczyć w konkursie.

3. Kontaktujemy się tylko w sprawach projektu

Organizator może kontaktować się z Tobą w sprawach związanych z konkursem.

Oficjalny adres kontaktowy to:

s097260@student.wum.edu.pl

Nie musisz odpowiadać na prywatne wiadomości niezwiązane z projektem ani udostępniać nikomu swoich prywatnych zdjęć czy informacji.

4. Chroń swoją prywatność

Nie udostępniaj innym osobom haseł, danych logowania ani prywatnych informacji.

Nie przesyłaj przez formularze informacji o swoim stanie zdrowia, jeśli nie są one potrzebne do udziału w konkursie.

Jeżeli otrzymasz niepokojącą wiadomość, możesz pokazać ją rodzicowi, nauczycielowi lub innej zaufanej osobie dorosłej.

5. Szanuj innych uczestników

W projekcie nie ma miejsca na wyśmiewanie, hejt, obrażanie ani naruszanie prywatności innych osób.

Nie publikuj cudzych zdjęć, wiadomości ani danych bez odpowiedniej podstawy.

6. Masz prawo poprosić o pomoc

Jeżeli coś Cię zaniepokoi, poczujesz się zagrożony/-a albo ktoś przekroczy Twoje granice, możesz powiedzieć o tym:

rodzicowi lub opiekunowi;

wychowawcy, pedagogowi albo psychologowi szkolnemu;

zaufanej osobie dorosłej;

Organizatorowi, pisząc na s097260@student.wum.edu.pl, jeżeli zgłoszenie nie dotyczy samego Organizatora.

Jeżeli problem dotyczy Organizatora, możesz zwrócić się bezpośrednio do zaufanej osoby dorosłej, szkoły albo odpowiednich służb.

7. Ważne numery pomocy

112 – numer alarmowy, jeśli Tobie lub komuś innemu grozi bezpośrednie niebezpieczeństwo.

116 111 – telefon zaufania dla dzieci i młodzieży.

8. Pamiętaj

Masz prawo zadawać pytania, mówić o swoich obawach i prosić o pomoc.

Zgłoszenie niepokojącej sytuacji nie jest czymś złym i nie może być powodem wykluczenia Cię z konkursu.
$tag_standardy_ochrony_text$)
on conflict (key) do update set value = excluded.value, updated_at = now();

-- ─── 2. MODULES ─────────────────────────────────────────────
insert into modules (n, roman, title, lead, sort_order)
values (1, 'I', 'Poznaj zagrożenie', 'Biologia kleszcza, miejsca występowania, borelioza, KZM i najczęstsze mity.', 1)
on conflict (n) do update set
  roman = excluded.roman,
  title = excluded.title,
  lead = excluded.lead,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into modules (n, roman, title, lead, sort_order)
values (2, 'II', 'Chroń siebie', 'Odzież, repelenty, szczepienie, kontrola ciała i procedura bezpieczeństwa na praktykach.', 2)
on conflict (n) do update set
  roman = excluded.roman,
  title = excluded.title,
  lead = excluded.lead,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into modules (n, roman, title, lead, sort_order)
values (3, 'III', 'Reaguj właściwie', 'Usuwanie kleszcza, obserwacja objawów, badania, antybiotyki i przypadki z praktyk.', 3)
on conflict (n) do update set
  roman = excluded.roman,
  title = excluded.title,
  lead = excluded.lead,
  sort_order = excluded.sort_order,
  updated_at = now();

-- ─── 3. LESSONS (Clean Markdown) ─────────────────────────────
delete from lessons;

insert into lessons (module_id, title, content_md, sort_order)
select id, 'Kleszcz – mały pajęczak, duże znaczenie', $l_1_1$Kleszcze to pajęczaki należące do podgromady roztoczy. W odróżnieniu od owadów dorosłe kleszcze mają cztery pary odnóży. Żywią się krwią kręgowców, między innymi ssaków i ptaków.

W Polsce jednym z najważniejszych gatunków z punktu widzenia zdrowia człowieka jest kleszcz pospolity (Ixodes ricinus). Występuje w lasach, na łąkach, w parkach i ogrodach.

Cykl rozwojowy kleszcza obejmuje cztery stadia: jajo, larwę, nimfę i postać dorosłą. Larwa ma trzy pary odnóży, natomiast nimfa i osobnik dorosły – cztery.

1. Jajo
2. Larwa
3. Nimfa
4. Dorosły kleszcz

Kleszcze nie latają i nie skaczą. Najczęściej oczekują na żywiciela na roślinności, a następnie przyczepiają się podczas kontaktu ze skórą lub odzieżą.

Ich ślina zawiera substancje ułatwiające pobieranie krwi. Dlatego ukłucie często pozostaje niezauważone.

> **Zapamiętaj**
> 
> Brak bólu i swędzenia nie oznacza, że kleszcz nie przyczepił się do skóry.

_ECDC – materiały dotyczące kleszczy i ochrony przed ukłuciami; WHO/Europe – Public health advice on ticks and tick-borne diseases (2025)._$l_1_1$, 1
from modules where n = 1;

insert into lessons (module_id, title, content_md, sort_order)
select id, 'Gdzie i kiedy występują kleszcze?', $l_1_2$Kleszcze najczęściej spotykamy w miejscach zapewniających odpowiednią wilgotność i dostęp do żywicieli. Mogą to być lasy liściaste i mieszane, obrzeża lasów, zarośla, łąki oraz tereny zielone w miastach.

Wbrew popularnemu przekonaniu kleszcze nie czekają na człowieka na szczytach wysokich drzew. Zwykle znajdują się na niskiej roślinności.

W Polsce aktywność kleszczy jest zazwyczaj największa od wiosny do jesieni, ale podczas łagodnej zimy mogą pozostawać aktywne również w chłodniejszych miesiącach. Ich aktywność zależy od temperatury, wilgotności, gatunku i lokalnych warunków środowiskowych.

> **ℹ️ Co to oznacza dla przyszłego leśnika?**
> 
> Nie wystarczy chronić się przed kleszczami tylko podczas wakacji. Odpowiednie środki ochronne warto stosować zawsze, gdy warunki sprzyjają ich aktywności.$l_1_2$, 2
from modules where n = 1;

insert into lessons (module_id, title, content_md, sort_order)
select id, 'Borelioza – co musisz wiedzieć?', $l_1_3$Borelioza z Lyme jest chorobą zakaźną wywoływaną przez bakterie należące do kompleksu Borrelia burgdorferi sensu lato. Do zakażenia człowieka dochodzi przede wszystkim poprzez ukłucie zakażonego kleszcza.

Nie każdy kleszcz jest zakażony, a nawet ukłucie zakażonego osobnika nie musi prowadzić do zachorowania.

Jednym z najbardziej charakterystycznych wczesnych objawów boreliozy jest rumień wędrujący – powiększająca się zmiana skórna, która zwykle pojawia się w okresie od 3 do 30 dni po zakażeniu.

Rumień nie zawsze ma wygląd czerwonego pierścienia z jaśniejszym środkiem. Może być jednolicie zaczerwieniony. Nie każdy pacjent zauważa rumień.

Inne możliwe objawy boreliozy obejmują gorączkę, zmęczenie, bóle mięśni i stawów. W niektórych przypadkach choroba może prowadzić do zajęcia układu nerwowego, stawów lub serca.

Boreliozę leczy się odpowiednio dobranymi antybiotykami. Wczesne rozpoznanie i właściwe leczenie zmniejszają ryzyko powikłań.

> **⚠️ Ważne**
> 
> Sam dodatni wynik badania przeciwciał nie zawsze oznacza aktywną boreliozę. Wyniki należy interpretować w połączeniu z objawami i wywiadem medycznym.

_IDSA/AAN/ACR – Clinical Practice Guidelines for Lyme Disease (2020/2021); GIS – Borelioza; CDC – Signs and Symptoms of Untreated Lyme Disease._$l_1_3$, 3
from modules where n = 1;

insert into lessons (module_id, title, content_md, sort_order)
select id, 'Kleszczowe zapalenie mózgu – dlaczego szczepienie ma znaczenie?', $l_1_4$Kleszczowe zapalenie mózgu, w skrócie KZM, jest chorobą wirusową atakującą ośrodkowy układ nerwowy.

W przeciwieństwie do boreliozy, której przyczyną są bakterie, KZM wywołuje wirus. Nie istnieje swoiste leczenie przeciwwirusowe o udowodnionej skuteczności przeciw KZM. Leczenie polega przede wszystkim na łagodzeniu objawów i podtrzymywaniu funkcji organizmu.

Zakażenie może przebiegać bezobjawowo. U części osób występuje początkowo gorączka, zmęczenie, ból głowy i mięśni. U niektórych pacjentów po okresie poprawy rozwija się druga faza choroby, związana z zapaleniem opon mózgowo-rdzeniowych, mózgu lub rdzenia kręgowego.

Możliwe są poważne powikłania neurologiczne.

> **ℹ️ Dobra wiadomość**
> 
> Przeciw KZM dostępne są skuteczne szczepionki. Szczepienie jest szczególnie istotne dla osób regularnie przebywających na terenach występowania wirusa, w tym uczniów odbywających praktyki leśne.

> ⚠️ Szczepienie przeciw KZM nie zapobiega boreliozie i nie zastępuje ochrony przed ukłuciami.

_WHO – Tick-borne encephalitis vaccines: WHO position paper; GIS – Kleszczowe zapalenie mózgu; ECDC – Factsheet about tick-borne encephalitis._$l_1_4$, 4
from modules where n = 1;

insert into lessons (module_id, title, content_md, sort_order)
select id, 'Zmiany klimatu a kleszcze', $l_1_5$Zmiany temperatury i wilgotności mogą wpływać na przeżywalność, aktywność i rozmieszczenie kleszczy. Łagodniejsze zimy i dłuższe okresy odpowiednich warunków pogodowych mogą sprzyjać ich aktywności w niektórych regionach.

Nie oznacza to jednak, że liczba kleszczy rośnie wszędzie w jednakowym tempie. Znaczenie mają również zmiany użytkowania terenu, liczebność zwierząt będących żywicielami oraz zachowania ludzi.

Z perspektywy przyszłego leśnika ważne jest rozumienie, że ryzyko kontaktu z kleszczami wynika z wielu czynników środowiskowych.

_ECDC – informacje o wektorach chorób i wpływie zmian środowiskowych na choroby przenoszone przez wektory._$l_1_5$, 5
from modules where n = 1;

insert into lessons (module_id, title, content_md, sort_order)
select id, 'Mity i fakty', $l_1_6$| Przekonanie | Typ | Wyjaśnienie |
|---|:---:|---|
| Kleszcze spadają z drzew | **Mit** | Zwykle przyczepiają się z niskiej roślinności |
| Kleszcze występują tylko latem | **Mit** | Mogą być aktywne także w innych porach roku |
| Każde ukłucie oznacza boreliozę | **Mit** | Nie każdy kleszcz przenosi bakterie |
| Szczepienie przeciw KZM chroni też przed boreliozą | **Mit** | Chroni przed KZM, nie przed boreliozą |
| Po powrocie z lasu należy obejrzeć skórę | **Fakt** | Regularna kontrola ułatwia szybkie wykrycie kleszcza |
| Rumień wędrujący zawsze ma kształt pierścienia | **Mit** | Może mieć różny wygląd |$l_1_6$, 6
from modules where n = 1;

insert into lessons (module_id, title, content_md, sort_order)
select id, 'Ubierz się odpowiednio – ochrona zaczyna się przed wejściem do lasu', $l_2_1$Podczas praktyk leśnych odpowiedni ubiór jest jednym z podstawowych elementów profilaktyki ukłuć kleszczy.

Kleszcze najczęściej przyczepiają się do człowieka podczas kontaktu z roślinnością. Odzież zakrywająca skórę może ograniczyć liczbę miejsc, w których kleszcz może się wkłuć, ale nie zapewnia całkowitej ochrony.

### Jak przygotować strój na praktyki?

- Załóż długie spodnie i bluzę lub koszulę z długimi rękawami.
- Wybierz pełne obuwie zamiast sandałów.
- W miarę możliwości włóż nogawki spodni w skarpety.
- Rozważ jasną odzież, na której łatwiej zauważyć przemieszczającego się kleszcza.
- Po powrocie sprawdź również ubrania i wyposażenie terenowe.

Jasna odzież nie odstrasza kleszczy. Jej zaletą jest przede wszystkim ułatwienie ich zauważenia.

> **Zapamiętaj**
> 
> Nawet prawidłowo dobrany strój nie zwalnia z kontroli ciała po powrocie z lasu.

_WHO/Europe (2025), ECDC – Personal protective measures against tick bites, GIS – materiały profilaktyczne._$l_2_1$, 1
from modules where n = 2;

insert into lessons (module_id, title, content_md, sort_order)
select id, 'Repelenty – co naprawdę działa?', $l_2_2$Repelenty to środki, których zadaniem jest odstraszanie stawonogów, w tym kleszczy.

Do substancji stosowanych w preparatach odstraszających kleszcze należą między innymi DEET, ikarydyna (picaridin) i IR3535.

Skuteczność konkretnego produktu zależy od jego składu, stężenia, sposobu użycia i czasu, jaki upłynął od aplikacji.

### Aby bezpiecznie korzystać z repelentu:

- Wybieraj preparat z deklarowanym działaniem przeciw kleszczom.
- Sprawdź dopuszczony wiek użytkownika i instrukcję stosowania.
- Nakładaj preparat tylko na powierzchnie wskazane przez producenta.
- Nie stosuj go na uszkodzoną skórę.
- Ponawiaj aplikację zgodnie z etykietą, a nie według dowolnie ustalonego odstępu czasu.

> ⚠️ Niektóre produkty z permetryną są przeznaczone do impregnacji odzieży i sprzętu. Permetryny przeznaczonej do impregnacji tkanin nie należy stosować bezpośrednio na skórę.

### A co z naturalnymi olejkami eterycznymi?

Niektóre substancje roślinne wykazują działanie odstraszające, ale skuteczność i czas ochrony zależą od konkretnego preparatu. Nie należy zakładać, że domowa mieszanka olejków zapewnia ochronę porównywalną z przebadanym, dopuszczonym repelentem.

_IDSA/AAN/ACR (2020), zalecenia dotyczące profilaktyki ukłuć; ECDC; WHO/Europe (2025)._$l_2_2$, 2
from modules where n = 2;

insert into lessons (module_id, title, content_md, sort_order)
select id, 'Szczepienie przeciw KZM – ochrona przed groźną chorobą', $l_2_3$Kleszczowe zapalenie mózgu może prowadzić do poważnych powikłań neurologicznych. Szczepienie ochronne jest najważniejszą swoistą metodą zapobiegania tej chorobie.

Szczepionki przeciw KZM są inaktywowane, co oznacza, że nie zawierają wirusa zdolnego do wywołania zakażenia.

Podstawowy schemat szczepienia obejmuje zazwyczaj trzy dawki, a dla utrzymania ochrony potrzebne są dawki przypominające. Dokładne odstępy zależą od preparatu, wieku i zaleceń medycznych.

W przypadku uczniów techników leśnych temat szczepień jest szczególnie ważny ze względu na częsty kontakt ze środowiskiem naturalnym podczas praktyk zawodowych.

> **⚠️ Pamiętaj**
> 
> Szczepienie przeciw KZM nie chroni przed boreliozą, dlatego również osoby zaszczepione powinny stosować repelenty, odzież ochronną i kontrolować skórę.

> **ℹ️ Czy wiesz, że...?**
> 
> Wirus KZM może być przenoszony także przez spożycie niepasteryzowanego mleka lub jego przetworów pochodzących od zakażonych zwierząt. Dlatego bezpieczeństwo żywności również ma znaczenie w profilaktyce KZM.

_WHO – Vaccines against tick-borne encephalitis: WHO position paper; GIS – Kleszczowe zapalenie mózgu; ECDC – Tick-borne encephalitis._$l_2_3$, 3
from modules where n = 2;

insert into lessons (module_id, title, content_md, sort_order)
select id, 'Kontrola ciała po powrocie z lasu', $l_2_4$Kleszcze mogą przyczepić się do skóry w miejscach trudnych do zauważenia. Dlatego po zakończeniu praktyk terenowych należy dokładnie obejrzeć ciało.

### Szczególną uwagę zwróć na:

- Skórę głowy i okolice uszu
- Pachy
- Pachwiny
- Zgięcia pod kolanami
- Okolice pasa i pępka
- Plecy i inne trudno dostępne miejsca

Do obejrzenia trudno dostępnych miejsc można użyć lusterka lub poprosić zaufaną osobę o pomoc. Kontrola powinna odbywać się z poszanowaniem prywatności.

Warto również sprawdzić odzież, plecak i pozostałe wyposażenie. Kleszcz może przemieścić się z ubrania na skórę już po zakończeniu zajęć.

> **Zapamiętaj**
> 
> Kontrola ciała powinna stać się stałym elementem rutyny po praktykach terenowych, podobnie jak czyszczenie sprzętu.

_WHO/Europe (2025); ECDC – zalecenia dotyczące ochrony osobistej._$l_2_4$, 4
from modules where n = 2;

insert into lessons (module_id, title, content_md, sort_order)
select id, 'Twoja procedura bezpieczeństwa na praktykach', $l_2_5$#### Przed wyjściem
- [ ] Załóż odpowiednią odzież ochronną.
- [ ] Zastosuj repelent zgodnie z etykietą.
- [ ] Zabierz przyrząd do usuwania kleszczy.

#### Podczas praktyk
- [ ] Unikaj niepotrzebnego kontaktu z gęstą roślinnością.
- [ ] Sprawdzaj odzież podczas przerw.
- [ ] Nie ignoruj znalezionego kleszcza.

#### Po powrocie
- [ ] Obejrzyj dokładnie skórę.
- [ ] Sprawdź ubrania i wyposażenie.
- [ ] Usuń zauważone kleszcze możliwie szybko.$l_2_5$, 5
from modules where n = 2;

insert into lessons (module_id, title, content_md, sort_order)
select id, 'Znalazłeś kleszcza? Działaj prawidłowo', $l_3_1$Znalezienie kleszcza wkłutego w skórę może wywołać niepokój. Najważniejsze jest jednak spokojne i szybkie działanie.

### Jak usunąć kleszcza?

1. Przygotuj cienką pęsetę lub odpowiedni przyrząd do usuwania kleszczy.
2. Chwyć kleszcza możliwie blisko skóry, unikając ściskania odwłoka.
3. Pociągnij go równomiernie i zdecydowanie, bez gwałtownego szarpania.
4. Po usunięciu oczyść miejsce ukłucia środkiem odpowiednim do dezynfekcji skóry.
5. Umyj ręce.
6. Zanotuj datę ukłucia i obserwuj stan zdrowia.

> ⚠️ Nie należy kleszcza smarować olejem, masłem, lakierem do paznokci ani przypalać. Nie należy też zgniatać go palcami.

Jeżeli niewielki fragment aparatu gębowego pozostał w skórze i nie można go łatwo usunąć, nie należy agresywnie rozgrzebywać miejsca ukłucia. W razie wątpliwości lub nasilającego się miejscowego stanu zapalnego warto skonsultować się z pracownikiem ochrony zdrowia.

### Dlaczego czas ma znaczenie?

W przypadku boreliozy ryzyko przeniesienia bakterii zwykle zwiększa się wraz z czasem żerowania kleszcza. Nie ma jednak jednej granicy czasu, poniżej której zakażenie jest absolutnie niemożliwe.

Wirus KZM może zostać przeniesiony wcześniej, dlatego szybkie usunięcie kleszcza nie daje pełnej ochrony przed tą chorobą.

_WHO/Europe (2025); IDSA/AAN/ACR (2020); ECDC._$l_3_1$, 1
from modules where n = 3;

insert into lessons (module_id, title, content_md, sort_order)
select id, 'Co obserwować po ukłuciu?', $l_3_2$Po usunięciu kleszcza nie trzeba zakładać, że doszło do zakażenia. Warto jednak zwracać uwagę na samopoczucie i zmiany skórne przez następne tygodnie.

### Do objawów wymagających konsultacji lekarskiej należą:

- Powiększająca się zmiana skórna, szczególnie mogąca odpowiadać rumieniowi wędrującemu.
- Gorączka, dreszcze, wyraźne osłabienie.
- Uporczywe bóle głowy lub mięśni.
- Obrzęk dużego stawu.
- Porażenie nerwu twarzowego lub inne objawy neurologiczne.

Niewielkie zaczerwienienie i swędzenie bezpośrednio po ukłuciu mogą być miejscową reakcją skóry i nie muszą oznaczać boreliozy. Jeśli jednak zmiana się powiększa, należy skonsultować ją z lekarzem.

> **⚠️ Pilna pomoc**
> 
> Pilnej pomocy medycznej wymagają między innymi silny ból głowy ze sztywnością karku, zaburzenia świadomości, drgawki lub nagłe objawy neurologiczne.

_CDC – Signs and Symptoms of Untreated Lyme Disease; ECDC – Tick-borne encephalitis; IDSA/AAN/ACR._$l_3_2$, 2
from modules where n = 3;

insert into lessons (module_id, title, content_md, sort_order)
select id, 'Czy po ukłuciu trzeba wykonać badania?', $l_3_3$Nie każde ukłucie kleszcza wymaga badań laboratoryjnych.

Badania serologiczne w kierunku boreliozy wykrywają odpowiedź immunologiczną organizmu, czyli przeciwciała. We wczesnym okresie po zakażeniu mogą one jeszcze nie być obecne w ilości pozwalającej na ich wykrycie.

Dlatego wykonywanie testu bezpośrednio po ukłuciu u osoby bez objawów nie jest zalecane.

Również badanie usuniętego kleszcza na obecność bakterii Borrelia nie jest wiarygodnym sposobem ustalenia, czy człowiek został zakażony.

W przypadku typowego rumienia wędrującego rozpoznanie boreliozy jest zwykle kliniczne i nie wymaga oczekiwania na dodatni wynik przeciwciał.

Jeśli lekarz podejrzewa inne postacie boreliozy, może zlecić odpowiednią diagnostykę, uwzględniając czas od zakażenia i objawy.

> **Zapamiętaj**
> 
> Badania wykonuje się wtedy, gdy istnieją wskazania medyczne, a nie tylko dlatego, że znaleziono kleszcza.

_IDSA/AAN/ACR (2020), diagnostyka boreliozy; AOTMiT – rekomendacja nr 43/2025._$l_3_3$, 3
from modules where n = 3;

insert into lessons (module_id, title, content_md, sort_order)
select id, 'Czy po ukłuciu potrzebny jest antybiotyk?', $l_3_4$Antybiotyki są stosowane w leczeniu boreliozy, ale nie powinny być przyjmowane samodzielnie po każdym ukłuciu kleszcza.

Amerykańskie wytyczne IDSA dopuszczają profilaktykę antybiotykową po ściśle określonych ukłuciach wysokiego ryzyka. Nie oznacza to jednak, że takie postępowanie należy rutynowo stosować u wszystkich osób ukłutych przez kleszcza w Polsce.

Decyzja o ewentualnej profilaktyce lub leczeniu powinna być podejmowana przez lekarza z uwzględnieniem aktualnych zaleceń, wieku pacjenta, rodzaju ekspozycji i stanu klinicznego.

Antybiotyki nie zapobiegają kleszczowemu zapaleniu mózgu, ponieważ KZM jest chorobą wirusową.

> ⚠️ Nie przyjmuj antybiotyków „na wszelki wypadek” bez zalecenia lekarza.

_IDSA/AAN/ACR (2020); AOTMiT (2025); WHO – informacje o KZM._$l_3_4$, 4
from modules where n = 3;

insert into lessons (module_id, title, content_md, sort_order)
select id, 'Przypadki z praktyk leśnych', $l_3_5$### Przypadek 1 – Kleszcz po zajęciach terenowych

Uczeń zauważył kleszcza na łydce po powrocie z lasu. Nie ma gorączki ani innych objawów.

> **ℹ️ Prawidłowe postępowanie**
> 
> Jak najszybciej usunąć kleszcza, oczyścić skórę i obserwować ewentualne objawy. Samo ukłucie nie oznacza konieczności wykonywania badań lub przyjmowania antybiotyku.

### Przypadek 2 – Powiększająca się zmiana skórna

Dwa tygodnie po praktykach uczeń zauważył powiększające się zaczerwienienie na nodze.

> **ℹ️ Prawidłowe postępowanie**
> 
> Skontaktować się z lekarzem, który oceni zmianę i zdecyduje o leczeniu. Nie należy czekać na pojawienie się charakterystycznego pierścienia.

### Przypadek 3 – Gorączka i silny ból głowy

Kilkanaście dni po pobycie w lesie u ucznia pojawiła się gorączka, silny ból głowy i sztywność karku.

> **⚠️ Prawidłowe postępowanie**
> 
> Pilna ocena medyczna. Objawy mogą wskazywać na poważną chorobę wymagającą szybkiej diagnostyki, niekoniecznie związaną z kleszczami.$l_3_5$, 5
from modules where n = 3;

-- ─── 4. QUIZ QUESTIONS ───────────────────────────────────────
delete from quiz_questions;

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('module:1', 'Ile par odnóży ma dorosły kleszcz?', '["Trzy", "Cztery", "Dwie", "Sześć"]'::jsonb, 1, 1);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('module:1', 'Gdzie kleszcze najczęściej oczekują na żywiciela?', '["Na szczytach drzew", "Na niskiej roślinności", "W powietrzu – skaczą na ofiarę", "Wyłącznie w wodzie"]'::jsonb, 1, 2);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('module:1', 'Co wywołuje kleszczowe zapalenie mózgu (KZM)?', '["Bakteria", "Grzyb", "Wirus", "Pasożyt jelitowy"]'::jsonb, 2, 3);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('module:1', 'Rumień wędrujący zwykle pojawia się:', '["W ciągu kilku minut", "Od 3 do 30 dni po zakażeniu", "Po roku", "Tylko u dzieci"]'::jsonb, 1, 4);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('module:1', 'Czy szczepienie przeciw KZM chroni przed boreliozą?', '["Tak, całkowicie", "Tak, częściowo", "Nie", "Tylko u dorosłych"]'::jsonb, 2, 5);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('module:1', 'Kiedy w Polsce kleszcze mogą być aktywne?', '["Tylko w lipcu i sierpniu", "Głównie od wiosny do jesieni, a w łagodną zimę także wtedy", "Wyłącznie zimą", "Tylko podczas deszczu"]'::jsonb, 1, 6);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('module:2', 'Jaka jest główna zaleta jasnej odzieży?', '["Odstrasza kleszcze", "Ułatwia zauważenie kleszcza", "Zabija kleszcze", "Nie ma żadnej zalety"]'::jsonb, 1, 1);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('module:2', 'Która substancja jest stosowana w repelentach przeciw kleszczom?', '["Ikarydyna", "Paracetamol", "Chlorek sodu", "Witamina C"]'::jsonb, 0, 2);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('module:2', 'Permetrynę do impregnacji tkanin należy:', '["Nakładać na skórę", "Stosować na odzież i sprzęt, nie na skórę", "Pić rozcieńczoną", "Stosować na uszkodzoną skórę"]'::jsonb, 1, 3);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('module:2', 'Jak często ponawiać aplikację repelentu?', '["Co 10 minut", "Raz w tygodniu", "Zgodnie z etykietą produktu", "Nigdy"]'::jsonb, 2, 4);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('module:2', 'Ile dawek obejmuje zazwyczaj podstawowy schemat szczepienia przeciw KZM?', '["Jedną", "Dwie", "Trzy", "Pięć"]'::jsonb, 2, 5);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('module:2', 'Które miejsce wymaga szczególnej uwagi podczas kontroli ciała?', '["Paznokcie", "Zgięcia pod kolanami", "Zęby", "Wnętrze dłoni"]'::jsonb, 1, 6);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('module:3', 'Jak prawidłowo chwycić kleszcza?', '["Za odwłok, mocno ściskając", "Możliwie blisko skóry, bez ściskania odwłoka", "Palcami, zgniatając go", "Po posmarowaniu masłem"]'::jsonb, 1, 1);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('module:3', 'Czego NIE należy robić z wkłutym kleszczem?', '["Usuwać pęsetą", "Smarować go olejem lub przypalać", "Dezynfekować miejsca po usunięciu", "Notować daty ukłucia"]'::jsonb, 1, 2);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('module:3', 'Czy badanie przeciwciał tuż po ukłuciu u osoby bez objawów jest zalecane?', '["Tak, zawsze", "Nie", "Tylko w weekend", "Tak, jeśli kleszcz był duży"]'::jsonb, 1, 3);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('module:3', 'Czy antybiotyk zapobiega KZM?', '["Tak", "Nie, bo KZM to choroba wirusowa", "Tylko penicylina", "Tylko u dzieci"]'::jsonb, 1, 4);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('module:3', 'Dwa tygodnie po praktykach pojawia się powiększające się zaczerwienienie. Co robisz?', '["Czekam na pierścień", "Biorę antybiotyk samodzielnie", "Kontaktuję się z lekarzem", "Ignoruję"]'::jsonb, 2, 5);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('module:3', 'Silny ból głowy ze sztywnością karku wymaga:', '["Odpoczynku w domu", "Pilnej pomocy medycznej", "Wypicia herbaty", "Badania kleszcza"]'::jsonb, 1, 6);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('mini', 'Ile odnóży ma larwa kleszcza?', '["4", "6", "8"]'::jsonb, 1, 1);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('mini', 'Czy kleszcze skaczą?', '["Tak, z drzew", "Tylko dorosłe", "Nie"]'::jsonb, 2, 2);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('mini', 'Co pomaga kleszczowi wykrywać żywiciela?', '["Narząd Hallera", "Dobre oczy", "Uszy"]'::jsonb, 0, 3);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('mini', 'Jakie warunki sprzyjają Ixodes ricinus?', '["Suchy, gorący klimat", "Wilgotny mikroklimat", "Silne nasłonecznienie"]'::jsonb, 1, 4);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('mini', 'Czy KZM można zakazić się przez niepasteryzowane mleko?', '["Nie, tylko przez ukłucie", "Tak, przez dotyk", "Tak, rzadko"]'::jsonb, 2, 5);

insert into quiz_questions (scope, q, options, correct, sort_order)
values ('mini', 'Czy nimfy mogą przenosić patogeny?', '["Tak", "Nie, tylko dorosłe", "Tylko w ciepłe miesiące"]'::jsonb, 0, 6);

-- ─── 5. CIEKAWOSTKI FACTS ────────────────────────────────────
delete from facts;

insert into facts (id, category, question, answer, explanation, meaning, source_name, source_url, guess, sort_order)
values (1, 'biologia', 'Czy kleszcz jest owadem?', 'Nie. Kleszcze są pajęczakami. Dorosłe osobniki mają osiem odnóży, a larwy sześć.', 'Kleszcze należą do pajęczaków (Arachnida), razem z pająkami i roztoczami. Owady mają trzy pary odnóży, a dorosłe kleszcze — cztery pary; larwa kleszcza ma dopiero trzy pary.', 'Nie myl kleszczy z owadami — to wpływa na rozumienie ich biologii i sposobu żerowania.', 'ECDC – disease vectors', 'https://www.ecdc.europa.eu/en/disease-vectors', '{"options": ["Tak", "Nie — to pajęczak", "To mięczak"], "correct": 1}'::jsonb, 1);

insert into facts (id, category, question, answer, explanation, meaning, source_name, source_url, guess, sort_order)
values (2, 'biologia', 'Czy kleszcze skaczą z drzew?', 'Nie. Kleszcze nie skaczą i nie latają. Zwykle oczekują na żywiciela na roślinności, wykorzystując zachowanie nazywane questing.', 'Kleszcz wspięty na trawę lub krzew wyciąga przednie odnóża i czeka na kontakt z przechodzącym żywicielem (questing). Nie spada celowo z gałęzi drzew.', 'Kontakt z trawą i krzewami prowadzi do ukłucia — kleszcz czeka właśnie tam, a nie na drzewie.', 'ECDC – disease vectors', 'https://www.ecdc.europa.eu/en/disease-vectors', '{"options": ["Nie — nie skaczą ani nie latają", "Tak, czekają na gałęziach", "Skaczą tylko dorosłe"], "correct": 0}'::jsonb, 2);

insert into facts (id, category, question, answer, explanation, meaning, source_name, source_url, guess, sort_order)
values (3, 'biologia', 'Jak kleszcz wykrywa człowieka?', 'Wykorzystuje narządy zmysłowe, między innymi narząd Hallera na pierwszej parze odnóży, który pomaga odbierać bodźce środowiskowe.', 'Narząd Hallera to struktura zmysłowa na przednich odnóżach kleszcza, odbierająca bodźce chemiczne i fizyczne z otoczenia. Pomaga kleszczowi namierzyć żywiciela bez wzroku.', 'Kleszcz wykrywa żywiciela bez wzroku podobnego do ludzkiego — nie da się go „oszukać” samym cichym chodzeniem.', 'ECDC – disease vectors', 'https://www.ecdc.europa.eu/en/disease-vectors', '{"options": ["Widzi go dobrym wzrokiem", "Narządem Hallera na odnóżach", "Słyszy kroki"], "correct": 1}'::jsonb, 3);

insert into facts (id, category, question, answer, explanation, meaning, source_name, source_url, guess, sort_order)
values (4, 'biologia', 'Dlaczego małe kleszcze są trudne do zauważenia?', 'Nimfy są niewielkie, ale również mogą przenosić patogeny.', 'Nimfa kleszcza pospolitego jest wielkości znacznie mniejszej od dorosłej samicy, a mimo to może przenosić patogeny. To właśnie łatwo przeoczone nimfy odpowiadają za dużą część ukłuć.', 'Po praktykach należy dokładnie sprawdzić całe ciało — mały kleszcz jest równie groźny jak duży.', 'NIZP PZH–PIB', 'https://www.pzh.gov.pl/', '{"options": ["Są przezroczyste", "Umieją się kamuflować", "Nimfy są bardzo małe, choć mogą przenosić patogeny"], "correct": 2}'::jsonb, 4);

insert into facts (id, category, question, answer, explanation, meaning, source_name, source_url, guess, sort_order)
values (5, 'biologia', 'Czy kleszcz rośnie podczas pobierania krwi?', 'Tak. Podczas żerowania ciało kleszcza może znacznie zwiększyć objętość.', 'W trakcie żerowania kleszcz pobiera dużą ilość krwi, a jego ciało potrafi zwiększyć objętość wielokrotnie. W miarę napełniania staje się coraz bardziej widoczny.', 'Nie czekaj, aż kleszcz napęcznieje — usuń go możliwie szybko, zaraz po zauważeniu.', 'ECDC – disease vectors', 'https://www.ecdc.europa.eu/en/disease-vectors', '{"options": ["Nie, jego wielkość jest stała", "Tylko samce rosną", "Tak — może znacznie zwiększyć objętość ciała"], "correct": 2}'::jsonb, 5);

insert into facts (id, category, question, answer, explanation, meaning, source_name, source_url, guess, sort_order)
values (6, 'srodowisko', 'Dlaczego kleszcze lubią wilgotne miejsca?', 'Są podatne na utratę wody. Wilgotny mikroklimat sprzyja ich przeżyciu.', 'Kleszcze tracą wodę z organizmu łatwiej niż wiele innych stawonogów, dlatego potrzebują wilgotnego mikroklimatu. Dlatego unikają przesuszonych, nasłonecznionych miejsc.', 'Wilgotna ściółka, podszyt i zarośla mogą być odpowiednimi siedliskami kleszczy.', 'ECDC – disease vectors', 'https://www.ecdc.europa.eu/en/disease-vectors', '{"options": ["Bo wilgoć jest dla nich pokarmem", "Bo są podatne na utratę wody", "Bo unikają jasnego światła, które je oślepia"], "correct": 1}'::jsonb, 6);

insert into facts (id, category, question, answer, explanation, meaning, source_name, source_url, guess, sort_order)
values (7, 'srodowisko', 'Jak długo żyje kleszcz?', 'Cykl rozwojowy kleszcza pospolitego może trwać kilka lat, często około trzech, zależnie od warunków.', 'Kleszcz pospolity przechodzi rozwój od larwy przez nimfę do postaci dorosłej, a każdy etap wymaga posiłku krwi. Cały cykl, zależnie od warunków klimatycznych i dostępności żywicieli, trwa zwykle około trzech lat.', 'Kleszcze pozostają elementem ekosystemu przez wiele sezonów — ryzyko kontaktu nie znika po jednym roku.', 'ECDC – disease vectors', 'https://www.ecdc.europa.eu/en/disease-vectors', '{"options": ["Ponad 20 lat", "Jeden sezon", "Cykl może trwać około trzech lat"], "correct": 2}'::jsonb, 7);

insert into facts (id, category, question, answer, explanation, meaning, source_name, source_url, guess, sort_order)
values (8, 'srodowisko', 'Ile jaj może złożyć samica?', 'Samica Ixodes ricinus może złożyć około 2000 jaj.', 'Po posiłku krwi samica składa jaja, zwykle w szczelinach gruntu i ściółki. Liczba około 2000 dotyczy samicy kleszcza pospolitego (Ixodes ricinus).', 'Nie wszystkie osobniki przeżywają — nie utożsamiaj liczby jaj z liczbą dorosłych kleszczy w lesie.', 'ECDC – disease vectors', 'https://www.ecdc.europa.eu/en/disease-vectors', '{"options": ["Około 200", "Około 2000", "Około 20 000"], "correct": 1}'::jsonb, 8);

insert into facts (id, category, question, answer, explanation, meaning, source_name, source_url, guess, sort_order)
values (9, 'srodowisko', 'Czy kleszcze są aktywne tylko latem?', 'Nie. Aktywność zależy od temperatury, wilgotności i mikroklimatu. Może występować również w chłodniejszych miesiącach.', 'Aktywność kleszczy zależy od warunków pogodowych — wystarczy temperatura i wilgotność sprzyjające questingowi. W ciepłych, wilgotnych okresach bywają aktywne także wiosną, jesienią, a nawet w łagodne dni zimowe.', 'Ochrona podczas praktyk jest ważna także poza latem.', 'ECDC – tick-borne encephalitis', 'https://www.ecdc.europa.eu/en/tick-borne-encephalitis', '{"options": ["Tak, zimą zawsze zapadają w odrętwienie", "Nie — aktywność zależy od temperatury i wilgotności", "Są aktywne wyłącznie w maju"], "correct": 1}'::jsonb, 9);

insert into facts (id, category, question, answer, explanation, meaning, source_name, source_url, guess, sort_order)
values (10, 'medyczne', 'Czy KZM można zakazić się bez ukłucia?', 'Tak, rzadko — przez spożycie zakażonego niepasteryzowanego mleka lub jego produktów.', 'Dominującą drogą zakażenia KZM jest ukłucie zakażonego kleszcza, ale opisywano także zakażenia przez niepasteryzowane mleko zakażonych zwierząt hodowlanych (np. kóz) i jego produkty.', 'Pasteryzacja mleka jest istotna dla bezpieczeństwa żywności.', 'ECDC – tick-borne encephalitis', 'https://www.ecdc.europa.eu/en/tick-borne-encephalitis', '{"options": ["Tak, przez zwykły dotyk skóry", "Nie, wyłącznie przez ukłucie", "Tak, rzadko — przez niepasteryzowane mleko"], "correct": 2}'::jsonb, 10);

insert into facts (id, category, question, answer, explanation, meaning, source_name, source_url, guess, sort_order)
values (11, 'medyczne', 'Ile gatunków kleszczy stwierdzono w Polsce?', 'Publikacja NIZP PZH–PIB z 2022 roku wskazywała 19 gatunków. Najbardziej rozpowszechniony jest Ixodes ricinus.', 'Według publikacji NIZP PZH–PIB z 2022 r. w Polsce stwierdzono 19 gatunków kleszczy. Dominującym gatunkiem, o największym znaczeniu epidemiologicznym, jest kleszcz pospolity (Ixodes ricinus).', 'Nie wszystkie gatunki mają identyczne siedliska i znaczenie epidemiologiczne. Liczba gatunków może się zmieniać wraz z nowymi badaniami — dlatego podajemy rok źródła (2022).', 'NIZP PZH–PIB', 'https://www.pzh.gov.pl/', '{"options": ["5", "19", "47"], "correct": 1}'::jsonb, 11);

insert into facts (id, category, question, answer, explanation, meaning, source_name, source_url, guess, sort_order)
values (12, 'medyczne', 'Jak naukowcy badają kleszcze w terenie?', 'Stosują między innymi metodę przeciągania jasnej tkaniny po roślinności, aby pobierać próbki do badań.', 'Badacze przeciągają po roślinności jasny materiał (tzw. flagę lub chorągiew), na który wspinają się oczekujące kleszcze. Tak zbierane próbki pozwalają ocenić ich liczebność i zakażenie patogenami.', 'Badania wymagają procedur bezpieczeństwa i nie są ćwiczeniem do samodzielnego wykonywania przez uczniów.', 'ECDC – disease vectors', 'https://www.ecdc.europa.eu/en/disease-vectors', '{"options": ["Przeciągają jasną tkaninę po roślinności", "Nocą oświetlają las latarkami", "Odsysają kleszcze odkurzaczem"], "correct": 0}'::jsonb, 12);

-- ─── 6. SIMULATOR SCENARIOS ──────────────────────────────────
delete from simulator_scenarios;

insert into simulator_scenarios (stage, situation, options, sort_order)
values ('Przed wyjściem', 'Rano wychodzisz na praktyki w młodnik z wysokimi trawami. Jak się ubierasz?', '[{"text": "Krótkie spodenki i sandały – będzie ciepło.", "ok": false, "why": "Odsłonięta skóra ułatwia kleszczom dostęp do ciała."}, {"text": "Długie spodnie wpuszczone w skarpety, jasne ubranie, pełne buty i repelent.", "ok": true, "why": "Jasne ubranie ułatwia dostrzeżenie kleszcza, a repelent i zakryta skóra ograniczają ryzyko ukłucia."}, {"text": "Ciemny dres – na nim nie widać brudu.", "ok": false, "why": "Na ciemnym materiale trudno zauważyć kleszcza."}]'::jsonb, 1);

insert into simulator_scenarios (stage, situation, options, sort_order)
values ('Po powrocie', 'Wracasz z terenu do internatu. Co robisz najpierw?', '[{"text": "Dokładnie oglądam całe ciało, także pachy, pachwiny, zgięcia kolan i skórę głowy.", "ok": true, "why": "Kleszcze wybierają miejsca o cienkiej skórze; szybkie wykrycie zmniejsza ryzyko zakażenia."}, {"text": "Sprawdzę jutro rano, jeśli coś zaswędzi.", "ok": false, "why": "Ukłucie zwykle nie boli ani nie swędzi – im dłużej kleszcz jest przyssany, tym większe ryzyko."}, {"text": "Wystarczy obejrzeć ręce i nogi.", "ok": false, "why": "Kleszcze często wędrują w ukryte miejsca ciała."}]'::jsonb, 2);

insert into simulator_scenarios (stage, situation, options, sort_order)
values ('Znalezienie kleszcza', 'Znajdujesz przyssanego kleszcza pod kolanem. Jak go usuwasz?', '[{"text": "Smaruję go masłem lub tłuszczem, aż sam odpadnie.", "ok": false, "why": "To mit – opóźnia usunięcie i może drażnić kleszcza."}, {"text": "Chwytam pęsetą jak najbliżej skóry i wyciągam zdecydowanym ruchem, potem dezynfekuję miejsce.", "ok": true, "why": "Szybkie, prawidłowe usunięcie to najważniejszy krok. Zanotuj datę ukłucia."}, {"text": "Wykręcam go palcami i przypalam zapalniczką.", "ok": false, "why": "Zgniatanie i przypalanie zwiększa ryzyko przedostania się drobnoustrojów."}]'::jsonb, 3);

insert into simulator_scenarios (stage, situation, options, sort_order)
values ('Obserwacja', 'Po 10 dniach wokół miejsca ukłucia pojawia się powiększający się rumień. Co robisz?', '[{"text": "Czekam, aż pojawi się typowy pierścień.", "ok": false, "why": "Nie każdy rumień wygląda podręcznikowo – nie należy zwlekać."}, {"text": "Kontaktuję się z lekarzem i mówię o ukłuciu kleszcza.", "ok": true, "why": "Lekarz oceni zmianę i zdecyduje o leczeniu."}, {"text": "Kupuję w aptece maść i nie mówię nikomu.", "ok": false, "why": "Samoleczenie może opóźnić właściwe leczenie."}]'::jsonb, 4);

insert into simulator_scenarios (stage, situation, options, sort_order)
values ('Niepokojące objawy', 'Kilkanaście dni po pobycie w lesie masz gorączkę, silny ból głowy i sztywność karku.', '[{"text": "To pewnie przeziębienie – odpocznę.", "ok": false, "why": "Takie objawy wymagają pilnej oceny medycznej."}, {"text": "Pilnie zgłaszam się do lekarza.", "ok": true, "why": "Objawy mogą wskazywać na poważną chorobę (np. KZM) wymagającą szybkiej diagnostyki."}]'::jsonb, 5);

-- ─── SEED COMPLETE ──────────────────────────────────────────
