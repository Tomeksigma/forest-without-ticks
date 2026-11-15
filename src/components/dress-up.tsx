import { useState } from "react";

type Slot = "glowa" | "gora" | "dol" | "nogi" | "buty";
type Item = { id: string; slot: Slot; label: string; good: boolean; why: string };

export const items: Item[] = [
  { id: "kapelusz", slot: "glowa", label: "Kapelusz", good: true, why: "Osłania głowę i ułatwia zauważenie kleszcza na jasnym materiale." },
  { id: "dlugi", slot: "gora", label: "Jasna bluza z długim rękawem", good: true, why: "Zakrywa ręce; na jasnym materiale łatwiej zauważyć kleszcza." },
  { id: "koszulka", slot: "gora", label: "Koszulka na ramiączkach", good: false, why: "Odsłania ramiona i pachy — miejsca, w które kleszcz chętnie się wkłuwa." },
  { id: "spodnie", slot: "dol", label: "Długie spodnie", good: true, why: "Chronią nogi przed kontaktem z niską roślinnością." },
  { id: "szorty", slot: "dol", label: "Krótkie spodenki", good: false, why: "Kleszcze najczęściej czekają na niskiej roślinności — odsłonięte nogi to łatwy cel." },
  { id: "skarpety", slot: "nogi", label: "Nogawki w skarpetach", good: true, why: "Utrudnia kleszczowi dostanie się pod nogawkę." },
  { id: "buty", slot: "buty", label: "Pełne buty terenowe", good: true, why: "Zakrywają stopy i kostki." },
  { id: "sandaly", slot: "buty", label: "Sandały", good: false, why: "Odsłonięte stopy i kostki nie chronią przed ukłuciem." },
];

const slotName: Record<Slot, string> = { glowa: "Głowa", gora: "Tułów", dol: "Nogi", nogi: "Kostki", buty: "Stopy" };

export type Worn = Partial<Record<Slot, string>>;
export function Figure({ worn }: { worn: Partial<Record<Slot, string>> }) {
  const skin = "var(--scale-2)";
  const has = (id: string) => Object.values(worn).includes(id);
  const top = worn.gora, bottom = worn.dol;
  return (
    <svg viewBox="0 0 200 420" className="mx-auto h-[420px] w-auto" role="img" aria-label="Postać leśnika">
      {/* body */}
      <circle cx="100" cy="52" r="26" fill={skin} />
      <rect x="70" y="84" width="60" height="110" rx="14" fill={skin} />
      <rect x="44" y="90" width="22" height="100" rx="10" fill={skin} />
      <rect x="134" y="90" width="22" height="100" rx="10" fill={skin} />
      <rect x="74" y="190" width="24" height="190" rx="10" fill={skin} />
      <rect x="102" y="190" width="24" height="190" rx="10" fill={skin} />
      <circle cx="90" cy="50" r="3" fill="var(--foreground)" /><circle cx="110" cy="50" r="3" fill="var(--foreground)" />
      <path d="M90 62 Q100 70 110 62" stroke="var(--foreground)" strokeWidth="2" fill="none" />
      {/* bottoms */}
      {bottom === "spodnie" && <g fill="var(--primary)"><rect x="70" y="180" width="60" height="30" rx="6" /><rect x="72" y="200" width="28" height="172" rx="8" /><rect x="100" y="200" width="28" height="172" rx="8" /></g>}
      {bottom === "szorty" && <g fill="var(--accent)"><rect x="70" y="180" width="60" height="30" rx="6" /><rect x="72" y="200" width="28" height="45" rx="6" /><rect x="100" y="200" width="28" height="45" rx="6" /></g>}
      {has("skarpety") && <g fill="var(--muted)" stroke="var(--border)"><rect x="71" y="340" width="30" height="32" rx="6" /><rect x="99" y="340" width="30" height="32" rx="6" /></g>}
      {/* tops */}
      {top === "dlugi" && <g fill="var(--secondary)" stroke="var(--border)"><rect x="66" y="82" width="68" height="112" rx="14" /><rect x="40" y="88" width="30" height="100" rx="12" /><rect x="130" y="88" width="30" height="100" rx="12" /></g>}
      {top === "koszulka" && <g fill="var(--destructive)"><rect x="72" y="96" width="56" height="96" rx="10" /></g>}
      {/* shoes */}
      {worn.buty === "buty" && <g fill="var(--forest)"><path d="M68 362h34v26H60q-4-14 8-26z" /><path d="M98 362h34q12 12 8 26H98z" /></g>}
      {worn.buty === "sandaly" && <g stroke="var(--accent-foreground)" strokeWidth="4" fill="none"><path d="M64 386h36M100 386h36M76 372l12 14M112 372l12 14" /></g>}
      {has("kapelusz") && <g fill="var(--forest)"><ellipse cx="100" cy="32" rx="44" ry="8" /><rect x="76" y="8" width="48" height="26" rx="8" /></g>}
    </svg>
  );
}

export function DressUp() {
  const [worn, setWorn] = useState<Partial<Record<Slot, string>>>({});
  const [picked, setPicked] = useState<string | null>(null);
  const [msg, setMsg] = useState<Item | null>(null);
  const wear = (id: string) => {
    const it = items.find((i) => i.id === id)!;
    setWorn((w) => ({ ...w, [it.slot]: it.id }));
    setMsg(it); setPicked(null);
  };
  const goodCount = items.filter((i) => i.good && worn[i.slot] === i.id).length;
  const goodTotal = items.filter((i) => i.good).length;
  const allGood = goodCount === goodTotal;

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <h2 className="text-3xl font-semibold">Ubierz leśnika na praktyki</h2>
      <p className="mt-2 text-muted-foreground">Przeciągnij ubranie na postać (na telefonie: dotknij ubrania, a potem postaci).</p>
      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1.2fr]">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const id = e.dataTransfer.getData("text/plain"); if (id) wear(id); }}
          onClick={() => picked && wear(picked)}
          className={`rounded-xl border-2 border-dashed bg-card p-4 ${picked ? "border-primary" : ""}`}>
          <Figure worn={worn} />
          <p className="mt-2 text-center text-sm font-medium">Dobrze dobrane elementy: {goodCount}/{goodTotal}</p>
        </div>
        <div>
          <ul className="grid grid-cols-2 gap-3">
            {items.map((it) => {
              const on = worn[it.slot] === it.id;
              return (
                <li key={it.id}>
                  <button draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", it.id)}
                    onClick={() => setPicked(picked === it.id ? null : it.id)}
                    aria-pressed={picked === it.id}
                    className={`w-full cursor-grab rounded-lg border p-3 text-left text-sm ${picked === it.id ? "border-primary bg-secondary" : on ? "bg-muted" : "bg-card hover:bg-muted"}`}>
                    <span className="block text-xs text-muted-foreground">{slotName[it.slot]}</span>
                    {it.label}{on && " ✓ założone"}
                  </button>
                </li>
              );
            })}
          </ul>
          <div aria-live="polite" className="mt-4">
            {msg && (
              <div className={`rounded-lg border-l-4 p-4 text-sm ${msg.good ? "border-success bg-success/10" : "border-destructive bg-destructive/10"}`}>
                <strong>{msg.good ? "Dobry wybór: " : "Zły wybór: "}{msg.label}.</strong> {msg.why}
              </div>
            )}
            {allGood && <div className="mt-3 rounded-lg bg-secondary p-4 text-sm"><strong>Leśnik gotowy!</strong> Pamiętaj też o repelencie zgodnie z etykietą i o kontroli skóry po powrocie — strój nie daje pełnej ochrony.</div>}
          </div>
          <button onClick={() => { setWorn({}); setMsg(null); setPicked(null); }} className="mt-4 rounded-full border px-4 py-2 text-sm hover:bg-muted">Zacznij od nowa</button>
        </div>
      </div>
    </section>
  );
}
