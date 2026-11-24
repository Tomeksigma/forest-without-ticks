import { createFileRoute, Link } from "@tanstack/react-router";
import defaultText from "@/content/konkurs.txt?raw";
import defaultPrivacyText from "@/content/klauzula-rodo.txt?raw";
import defaultProtectionText from "@/content/standardy-ochrony.txt?raw";
import { DocText, PageHero } from "@/components/site-layout";
import { Notice } from "@/components/notices";
import { getSiteTexts } from "@/lib/admin.functions";

const SUPABASE_STORAGE = "https://adyhoqvmkrinjsyczmuc.supabase.co/storage/v1/object/public/site-assets";

const DEFAULT_DOC_URL            = `${SUPABASE_STORAGE}/konkurs/regulamin-konkursu.pdf`;
const DEFAULT_ADULT_FORM_URL     = `${SUPABASE_STORAGE}/konkurs/formularz-pelnoletni.docx`;
const DEFAULT_MINOR_FORM_URL     = `${SUPABASE_STORAGE}/konkurs/formularz-niepelnoletni.docx`;
const DEFAULT_PRIVACY_CLAUSE_URL = `${SUPABASE_STORAGE}/konkurs/klauzula-rodo.pdf`;
const DEFAULT_CHILD_PROT_URL     = `${SUPABASE_STORAGE}/konkurs/standardy-ochrony.pdf`;

export const Route = createFileRoute("/konkurs")({
  loader: async () => {
    try {
      const res = await getSiteTexts();
      return { texts: res.texts || {} };
    } catch {
      return { texts: {} };
    }
  },
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
  component: KonkursPage,
});

function KonkursPage() {
  const { texts } = Route.useLoaderData();
  const text = texts["konkurs.text"] || defaultText;
  const privacyText = texts["klauzula_rodo.text"] || defaultPrivacyText;
  const protectionText = texts["standardy_ochrony.text"] || defaultProtectionText;

  // Linki do pobrania – z panelu admina (nadpisanie) lub domyślne pliki z Supabase Storage
  const docUrl = (texts["konkurs.doc_url"] && texts["konkurs.doc_url"].trim()) || DEFAULT_DOC_URL;
  const adultFormUrl = (texts["konkurs.adult_form_url"] && texts["konkurs.adult_form_url"].trim()) || DEFAULT_ADULT_FORM_URL;
  const minorFormUrl = (texts["konkurs.minor_form_url"] && texts["konkurs.minor_form_url"].trim()) || DEFAULT_MINOR_FORM_URL;
  const privacyClauseUrl = (texts["konkurs.privacy_clause_url"] && texts["konkurs.privacy_clause_url"].trim()) || DEFAULT_PRIVACY_CLAUSE_URL;
  const childProtectionUrl = (texts["konkurs.child_protection_url"] && texts["konkurs.child_protection_url"].trim()) || DEFAULT_CHILD_PROT_URL;

  return (
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
          <ul className="space-y-2">
            <li><a href={docUrl} download target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">Regulamin Konkursu (PDF)</a></li>
            <li><a href={adultFormUrl} download target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">Formularz zgłoszeniowy – uczestnik pełnoletni (DOCX)</a></li>
            <li><a href={minorFormUrl} download target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">Formularz zgłoszeniowy – uczestnik niepełnoletni (ze zgodą przedstawiciela ustawowego) (DOCX)</a></li>
            <li><a href={privacyClauseUrl} download target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">Klauzula informacyjna RODO (PDF)</a></li>
            <li><a href={childProtectionUrl} download target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">Standardy Ochrony Małoletnich – z wersją skróconą dla uczniów (PDF)</a></li>
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
  );
}
