import { createFileRoute, Link } from "@tanstack/react-router";
import defaultText from "@/content/polityka.txt?raw";
import { DocText, PageHero } from "@/components/site-layout";
import { Notice } from "@/components/notices";
import { getSiteTexts } from "@/lib/admin.functions";

const POLITYKA_URL      = "https://adyhoqvmkrinjsyczmuc.supabase.co/storage/v1/object/public/site-assets/konkurs/polityka-prywatnosci.pdf";
const KLAUZULA_RODO_URL = "https://adyhoqvmkrinjsyczmuc.supabase.co/storage/v1/object/public/site-assets/konkurs/klauzula-rodo.pdf";

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
  const docUrl = (texts["polityka.doc_url"] && texts["polityka.doc_url"].trim()) || POLITYKA_URL;
  const privacyClauseUrl = (texts["konkurs.privacy_clause_url"] && texts["konkurs.privacy_clause_url"].trim()) || KLAUZULA_RODO_URL;

  return (
    <main>
      <PageHero kicker="Dokumenty" title="Polityka prywatności" />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <p className="mb-4 text-sm text-muted-foreground">Aktualizacja dokumentu — obowiązuje od 6 listopada 2026 r.</p>
        <a href={docUrl} download target="_blank" rel="noopener noreferrer" className="mb-8 inline-block rounded-full bg-primary px-5 py-2 text-primary-foreground">Pobierz (PDF)</a>
        <section className="mb-8 space-y-3 border-b pb-6">
          <h2 className="text-xl font-semibold">Dane uczestników konkursu</h2>
          <p><a href={privacyClauseUrl} download target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">Pobierz klauzulę informacyjną RODO dotyczącą konkursu (PDF)</a></p>
          <p><Link to="/konkurs" hash="klauzula-rodo" className="text-primary underline">Przeczytaj pełną klauzulę informacyjną RODO</Link></p>
        </section>
        <DocText text={content} />
      </div>
    </main>
  );
}
