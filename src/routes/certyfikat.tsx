import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { modules } from "@/lib/content";
import { useProgress } from "@/lib/progress";
import { Notice, ProgressNotice } from "@/components/notices";
import certBg from "@/assets/certyfikat-aktualny.png.asset.json";
import certTemplate from "@/assets/certyfikat-wzor.pdf.asset.json";

export const Route = createFileRoute("/certyfikat")({
  head: () => ({
    meta: [
      { title: "Certyfikat – Strefa Edukacji o kleszczach" },
      { name: "description", content: "Odbierz certyfikat ukończenia kursu i weź udział w konkursie na projekt muralu." },
      { property: "og:title", content: "Certyfikat – Strefa Edukacji o kleszczach" },
      { property: "og:description", content: "Certyfikat ukończenia trzech modułów o bezpiecznych praktykach leśnych." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Cert,
});

function Cert() {
  const { progress } = useProgress();
  const [name, setName] = useState("");
  const all = progress.finalPassed;
  if (!all)
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold">Certyfikat jeszcze niedostępny</h1>
        <p className="mt-3 text-muted-foreground">Przejdź trzy moduły i zalicz quiz końcowy (min. 70% w każdej z trzech części).</p>
        <div className="mt-6 text-left"><ProgressNotice /></div>
        <Link to="/strefa-edukacji" className="mt-6 inline-block text-primary underline">Wróć do modułów</Link>
      </div>
    );
  const date = new Date().toLocaleDateString("pl-PL");
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="no-print mb-4">
        <Notice>
          <strong>Gratulacje! Udało Ci się ukończyć całą ścieżkę edukacyjną — quiz końcowy został zaliczony, a wyniki z trzech części widzisz na certyfikacie.</strong> Możesz teraz wygenerować i pobrać swój certyfikat. Jeżeli bierzesz udział w konkursie edukacyjnym, zachowaj certyfikat, ponieważ będzie potrzebny przy zgłoszeniu.
        </Notice>
      </div>
      <div className="no-print mb-6 flex flex-wrap items-center gap-3">
        <Link to="/strefa-edukacji" className="text-sm text-primary">← Strefa Edukacji</Link>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Wpisz imię i nazwisko" aria-label="Imię i nazwisko na certyfikacie" className="ml-auto rounded-md border bg-card px-3 py-2" />
        <button onClick={() => window.print()} className="rounded-full bg-primary px-5 py-2 text-primary-foreground">Drukuj / zapisz PDF</button>
        <a href={certTemplate.url} download className="text-sm text-primary underline">Pusty wzór (PDF)</a>
      </div>
      <div className="no-print mb-6">
        <Notice tone="warn">
          Podane imię i nazwisko zostaną wykorzystane wyłącznie do wygenerowania imiennego certyfikatu w Twojej przeglądarce. Dane nie są zapisywane w bazie ani przesyłane do administratora strony. Certyfikat możesz samodzielnie pobrać na swoje urządzenie.
          <br /><strong>Pamiętaj o zapisaniu certyfikatu</strong> – po zakończeniu sesji jego ponowne pobranie może wymagać ponownego rozwiązania quizu.
        </Notice>
      </div>
      <div className="relative w-full overflow-hidden rounded-lg shadow-lg" style={{ aspectRatio: "3 / 2", containerType: "inline-size" }}>
        <img src={certBg.url} alt="Certyfikat ukończenia ścieżki edukacyjnej o kleszczach" className="absolute inset-0 h-full w-full" />
        <div className="absolute left-[19%] right-[19%] top-[55.8%] text-center italic" style={{ fontFamily: "var(--font-display)", fontSize: "3.2cqw", color: "#5a3416" }}>
          {name}
        </div>
        {modules.map((m, i) => {
          const tops = ["68.5%", "71.1%", "73.7%"];
          return (
            <div
              key={m.n}
              className="absolute left-[25.5%] w-[6%] text-center font-medium"
              style={{ top: tops[i], fontSize: "1.5cqw", color: "#5a3416" }}
            >
              {progress.scores[m.n]}%
            </div>
          );
        })}
        <div className="absolute left-[43%] w-[9.5%] text-center font-medium" style={{ top: "71.5%", fontSize: "1.5cqw", color: "#5a3416" }}>
          {date}
        </div>
      </div>
      <section className="no-print mt-10 rounded-xl bg-secondary p-6">
        <h2 className="text-2xl font-semibold">Konkurs edukacyjny na projekt muralu</h2>
        <p className="mt-2 text-secondary-foreground">Jako absolwent kursu możesz zgłosić projekt muralu promującego bezpieczeństwo w lesie. Zasady i termin znajdziesz w zakładce Konkurs.</p>
      </section>
    </main>
  );
}
