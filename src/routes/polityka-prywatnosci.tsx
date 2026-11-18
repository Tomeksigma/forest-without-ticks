import { createFileRoute, Link } from "@tanstack/react-router";
import defaultText from "@/content/polityka.txt?raw";
import doc from "@/assets/polityka-prywatnosci-aktualna.docx.asset.json";
import { DocText, PageHero } from "@/components/site-layout";
import { Notice } from "@/components/notices";
import privacyClause from "@/assets/klauzula-rodo-konkurs.docx.asset.json";
import { getSiteTexts } from "@/lib/admin.functions";

export const Route = createFileRoute("/polityka-prywatnosci")({
  loader: async () => {
    try {
      const res = await getSiteTexts();
      return { texts: res.texts };
    } catch {
      return { texts: {} };
    }
  },
  head: () => ({
    meta: [
      { title: "Polityka prywatności – Uwaga Kleszcz!" },
      { name: "description", content: "Zasady przetwarzania danych osobowych w serwisie edukacyjnym Uwaga Kleszcz!." },
      { property: "og:title", content: "Polityka prywatności – Uwaga Kleszcz!" },
      { property: "og:description", content: "Polityka prywatności serwisu internetowego Uwaga Kleszcz!." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PolitykaPage,
});

function PolitykaPage() {
  const { texts } = Route.useLoaderData();
  const content = texts["polityka.text"] || defaultText;

  return (
    <main>
      <PageHero kicker="Dokumenty" title="Polityka prywatności" />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <p className="mb-4 text-sm text-muted-foreground">Aktualizacja dokumentu — obowiązuje od 6 listopada 2026 r.</p>
        <div className="mb-6"><Notice tone="warn">Najnowszy plik przesłany jako „Klauzula informacyjna RODO” zawiera politykę prywatności serwisu. Dokument nadal wskazuje adres w Netlify oraz usługi Netlify i Sanity CMS, których ta strona nie używa, i zawiera miejsca do uzupełnienia dotyczące transferów danych oraz cookies. Wymaga uzgodnienia z rzeczywistymi usługami przed publikacją. Oryginał zachowano bez zmian. Odrębna klauzula konkursowa pozostaje dostępna poniżej.</Notice></div>
        <a href={doc.url} download className="mb-8 inline-block rounded-full bg-primary px-5 py-2 text-primary-foreground">Pobierz (DOCX)</a>
        <section className="mb-8 space-y-3 border-b pb-6">
          <h2 className="text-xl font-semibold">Dane uczestników konkursu</h2>
          <p><a href={privacyClause.url} download className="font-medium text-primary underline">Pobierz klauzulę informacyjną RODO dotyczącą konkursu (DOCX)</a></p>
          <p><Link to="/konkurs" hash="klauzula-rodo" className="text-primary underline">Przeczytaj pełną klauzulę informacyjną RODO</Link></p>
        </section>
        <DocText text={content} />
      </div>
    </main>
  );
}
