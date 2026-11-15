export type Scenario = { stage: string; situation: string; options: { text: string; ok: boolean; why: string }[] };

export const scenarios: Scenario[] = [
  { stage: "Przed wyjściem", situation: "Rano wychodzisz na praktyki w młodnik z wysokimi trawami. Jak się ubierasz?", options: [
    { text: "Krótkie spodenki i sandały – będzie ciepło.", ok: false, why: "Odsłonięta skóra ułatwia kleszczom dostęp do ciała." },
    { text: "Długie spodnie wpuszczone w skarpety, jasne ubranie, pełne buty i repelent.", ok: true, why: "Jasne ubranie ułatwia dostrzeżenie kleszcza, a repelent i zakryta skóra ograniczają ryzyko ukłucia." },
    { text: "Ciemny dres – na nim nie widać brudu.", ok: false, why: "Na ciemnym materiale trudno zauważyć kleszcza." },
  ]},
  { stage: "Po powrocie", situation: "Wracasz z terenu do internatu. Co robisz najpierw?", options: [
    { text: "Dokładnie oglądam całe ciało, także pachy, pachwiny, zgięcia kolan i skórę głowy.", ok: true, why: "Kleszcze wybierają miejsca o cienkiej skórze; szybkie wykrycie zmniejsza ryzyko zakażenia." },
    { text: "Sprawdzę jutro rano, jeśli coś zaswędzi.", ok: false, why: "Ukłucie zwykle nie boli ani nie swędzi – im dłużej kleszcz jest przyssany, tym większe ryzyko." },
    { text: "Wystarczy obejrzeć ręce i nogi.", ok: false, why: "Kleszcze często wędrują w ukryte miejsca ciała." },
  ]},
  { stage: "Znalezienie kleszcza", situation: "Znajdujesz przyssanego kleszcza pod kolanem. Jak go usuwasz?", options: [
    { text: "Smaruję go masłem lub tłuszczem, aż sam odpadnie.", ok: false, why: "To mit – opóźnia usunięcie i może drażnić kleszcza." },
    { text: "Chwytam pęsetą jak najbliżej skóry i wyciągam zdecydowanym ruchem, potem dezynfekuję miejsce.", ok: true, why: "Szybkie, prawidłowe usunięcie to najważniejszy krok. Zanotuj datę ukłucia." },
    { text: "Wykręcam go palcami i przypalam zapalniczką.", ok: false, why: "Zgniatanie i przypalanie zwiększa ryzyko przedostania się drobnoustrojów." },
  ]},
  { stage: "Obserwacja", situation: "Po 10 dniach wokół miejsca ukłucia pojawia się powiększający się rumień. Co robisz?", options: [
    { text: "Czekam, aż pojawi się typowy pierścień.", ok: false, why: "Nie każdy rumień wygląda podręcznikowo – nie należy zwlekać." },
    { text: "Kontaktuję się z lekarzem i mówię o ukłuciu kleszcza.", ok: true, why: "Lekarz oceni zmianę i zdecyduje o leczeniu." },
    { text: "Kupuję w aptece maść i nie mówię nikomu.", ok: false, why: "Samoleczenie może opóźnić właściwe leczenie." },
  ]},
  { stage: "Niepokojące objawy", situation: "Kilkanaście dni po pobycie w lesie masz gorączkę, silny ból głowy i sztywność karku.", options: [
    { text: "To pewnie przeziębienie – odpocznę.", ok: false, why: "Takie objawy wymagają pilnej oceny medycznej." },
    { text: "Pilnie zgłaszam się do lekarza.", ok: true, why: "Objawy mogą wskazywać na poważną chorobę (np. KZM) wymagającą szybkiej diagnostyki." },
  ]},
];
