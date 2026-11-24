import { createFileRoute, Link } from "@tanstack/react-router";
import defaultText from "@/content/regulamin.txt?raw";
import { DocText, PageHero } from "@/components/site-layout";
import { Notice } from "@/components/notices";
import { getSiteTexts } from "@/lib/admin.functions";

const REGULAMIN_URL = "https://adyhoqvmkrinjsyczmuc.supabase.co/storage/v1/object/public/site-assets/konkurs/regulamin-serwisu.pdf";

export const Route = createFileRoute("/regulamin")({
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
      { title: "Regulamin serwisu – Uwaga Kleszcz!" },
      { name: "description", content: "Regulamin korzystania z serwisu internetowego Uwaga Kleszcz!." },
      { property: "og:title", content: "Regulamin serwisu – Uwaga Kleszcz!" },
      { property: "og:description", content: "Zasady korzystania z serwisu edukacyjnego o kleszczach." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegulaminPage,
});

function RegulaminPage() {
  const { texts } = Route.useLoaderData();
  const content = texts["regulamin.text"] || defaultText;
  const docUrl = (texts["regulamin.doc_url"] && texts["regulamin.doc_url"].trim()) || REGULAMIN_URL;

  return (
    <main>
      <PageHero kicker="Dokumenty" title="Regulamin serwisu" />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-6"><Notice tone="warn">Przesłany oryginał wskazuje inny adres strony oraz Netlify i Sanity CMS. Te informacje wymagają dostosowania przed publikacją.</Notice></div>
        <a href={docUrl} download target="_blank" rel="noopener noreferrer" className="mb-8 inline-block rounded-full bg-primary px-5 py-2 text-primary-foreground">Pobierz (PDF)</a>
        <section className="mb-8 space-y-3 border-b pb-6">
          <h2 className="text-xl font-semibold">Dokumentacja konkursowa</h2>
          <p><Link to="/konkurs" hash="dokumenty" className="text-primary underline">Regulamin konkursu, formularze zgłoszeniowe i klauzula RODO</Link></p>
          <p><Link to="/konkurs" hash="standardy-ochrony" className="text-primary underline">Standardy Ochrony Małoletnich i wersja dla uczniów</Link></p>
        </section>
        <DocText text={content} />
      </div>
    </main>
  );
}
