import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site-layout";
import { Notice } from "@/components/notices";
import { getGalleryPhotos } from "@/lib/admin.functions";

export const Route = createFileRoute("/galeria")({
  loader: async () => {
    try {
      const res = await getGalleryPhotos();
      return { photos: (res.photos ?? []).filter((p) => p.approved) };
    } catch {
      return { photos: [] };
    }
  },
  head: () => ({
    meta: [
      { title: "Galeria prac konkursowych – Uwaga Kleszcz!" },
      { name: "description", content: "Galeria projektów muralu nadesłanych na konkurs o profilaktyce chorób odkleszczowych." },
      { property: "og:title", content: "Galeria prac konkursowych – Uwaga Kleszcz!" },
      { property: "og:description", content: "Projekty murali uczniów techników leśnych." },
    ],
  }),
  component: GalleryView,
});

function GalleryView() {
  const { photos } = Route.useLoaderData();

  return (
    <main>
      <PageHero kicker="Konkurs" title="Galeria prac konkursowych" />
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8"><Notice>
          Prezentowane prace zostały zgłoszone do ogólnopolskiego konkursu edukacyjnego „Zauważ ryzyko, zanim kleszcz zauważy Ciebie – Nie odkładaj – Działaj!”.
          <br />Prawa autorskie do prac przysługują ich twórcom lub innym uprawnionym podmiotom. Prace są publikowane na podstawie licencji udzielonych Organizatorowi Konkursu.
          <br />Dane identyfikujące autorów są publikowane wyłącznie w zakresie objętym odpowiednią podstawą prawną. Brak publicznego oznaczenia imienia, nazwiska lub szkoły nie oznacza braku autorstwa pracy.
          <br />Kopiowanie lub dalsze wykorzystywanie prac wymaga odpowiedniego uprawnienia albo podstawy wynikającej z przepisów prawa.
        </Notice></div>

        {photos.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((p) => {
              const url = p.storage_path.startsWith("http")
                ? p.storage_path
                : `https://qeuduxvviipftcaeogrk.supabase.co/storage/v1/object/public/site-assets/${p.storage_path}`;
              return (
                <article key={p.id} className="overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img src={url} alt={p.caption || "Praca konkursowa"} className="h-full w-full object-cover transition duration-300 hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-4">
                    {p.caption && <h3 className="font-semibold text-foreground">{p.caption}</h3>}
                    {(p.author || p.school) && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {p.author}
                        {p.author && p.school ? " · " : ""}
                        {p.school}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex aspect-[4/3] items-center justify-center rounded-xl border-2 border-dashed bg-muted text-muted-foreground">Miejsce na pracę</div>
            ))}
          </div>
        )}
        <p className="mt-8 text-center text-muted-foreground">Prace pojawią się tutaj po rozstrzygnięciu konkursu i uzyskaniu zgód autorów. <Link to="/konkurs" className="text-primary underline">Zobacz regulamin</Link></p>
      </div>
    </main>
  );
}
