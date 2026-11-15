import { createFileRoute, Link } from "@tanstack/react-router";
import text from "@/content/konkurs.txt?raw";
import privacyText from "@/content/klauzula-rodo.txt?raw";
import protectionText from "@/content/standardy-ochrony.txt?raw";
import doc from "@/assets/regulamin-konkursu-aktualny.docx.asset.json";
import adultForm from "@/assets/formularz-pelnoletni.docx.asset.json";
import minorForm from "@/assets/formularz-niepelnoletni.docx.asset.json";
import privacyClause from "@/assets/klauzula-rodo-konkurs.docx.asset.json";
import childProtection from "@/assets/standardy-ochrony-maloletnich.docx.asset.json";
import { DocText, PageHero } from "@/components/site-layout";
import { Notice } from "@/components/notices";

export const Route = createFileRoute("/konkurs")({
  head: () => ({
    meta: [
      { title: "Konkurs na mural – Uwaga Kleszcz!" },
      { name: "description", content: "Ogólnopolski konkurs dla uczniów technik leśnik na edukacyjny projekt muralu o profilaktyce chorób odkleszczowych. Pełny regulamin." },
      { property: "og:title", content: "Konkurs na mural – Uwaga Kleszcz!" },
      { property: "og:description", content: "Regulamin ogólnopolskiego konkursu edukacyjnego „Zauważ ryzyko, zanim kleszcz zauważy Ciebie”." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <main>
      <PageHero kicker="Ogólnopolski konkurs edukacyjny" title="Konkurs na projekt muralu">
        Dla uczniów kształcących się w zawodzie technik leśnik. Pytania: <a className="underline" href="mailto:s097260@student.wum.edu.pl">s097260@student.wum.edu.pl</a>
      </PageHero>
      <div className="mx-auto max-w-3xl px-6 py-10">
        <section id="dokumenty" className="mb-10 space-y-4">
          <Notice>
            Udział w konkursie jest dobrowolny i bezpłatny. Przed zgłoszeniem zapoznaj się z Regulaminem Konkursu oraz Klauzulą informacyjną RODO.
            <br />Uczestnicy niepełnoletni zobowiązani są do dołączenia zgody przedstawiciela ustawowego.
            <br />Zgłoszenie należy przesłać wraz z wymaganymi dokumentami na adres <a className="underline" href="mailto:s097260@student.wum.edu.pl">s097260@student.wum.edu.pl</a>, w terminie określonym w Regulaminie Konkursu.
          </Notice>
          <h2 className="text-2xl font-semibold">Dokumenty do pobrania</h2>
          <p className="text-sm text-muted-foreground">Regulamin zaktualizowany — obowiązuje od 6 listopada 2026 r.</p>
          <Notice tone="warn">Najnowszy regulamin podaje ogólny próg 70% w quizie końcowym. Na stronie nadal wymagane jest minimum 70% w każdej z trzech części; formularz dla niepełnoletnich mówi o „każdym quizie”. Zapisy wymagają ujednolicenia przez organizatorkę. Standardy Ochrony Małoletnich zawierają nieuzupełnioną datę obowiązywania w § 15. Oryginalne pliki i ich treści zachowano bez zmian.</Notice>
          <ul className="space-y-2">
            <li><a href={doc.url} download className="font-medium text-primary underline">Regulamin Konkursu (DOCX)</a></li>
            <li><a href={adultForm.url} download className="font-medium text-primary underline">Formularz zgłoszeniowy – uczestnik pełnoletni (DOCX)</a></li>
            <li><a href={minorForm.url} download className="font-medium text-primary underline">Formularz zgłoszeniowy – uczestnik niepełnoletni (ze zgodą przedstawiciela ustawowego) (DOCX)</a></li>
            <li><a href={privacyClause.url} download className="font-medium text-primary underline">Klauzula informacyjna RODO (DOCX)</a></li>
            <li><a href={childProtection.url} download className="font-medium text-primary underline">Standardy Ochrony Małoletnich – z wersją skróconą dla uczniów (DOCX)</a></li>
            <li><Link to="/polityka-prywatnosci" className="font-medium text-primary underline">Aktualna polityka prywatności serwisu i pliki cookies</Link></li>
          </ul>
          <Link to="/strefa-edukacji" className="inline-block rounded-full border px-5 py-2">Przejdź do Strefy Edukacji</Link>
        </section>
        <DocText text={text} />
        <section id="klauzula-rodo" className="mt-12 border-t pt-8">
          <details>
            <summary className="cursor-pointer text-2xl font-semibold text-primary">Klauzula informacyjna RODO – pełna treść</summary>
            <div className="mt-6"><DocText text={privacyText} /></div>
          </details>
        </section>
        <section id="standardy-ochrony" className="mt-8 border-t pt-8">
          <details>
            <summary className="cursor-pointer text-2xl font-semibold text-primary">Standardy Ochrony Małoletnich – pełna treść i wersja dla uczniów</summary>
            <div className="mt-6"><DocText text={protectionText} /></div>
          </details>
        </section>
      </div>
    </main>
  ),
});
