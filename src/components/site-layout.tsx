import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { VisitCounter } from "@/components/visit-counter";
import fe from "@/assets/logo-fe.png.asset.json";
import up from "@/assets/logo-up.png.asset.json";
import wum from "@/assets/logo-wum.png.asset.json";
import honoraryForest from "@/assets/patronat-lasy-panstwowe-hq.png.asset.json";
import honoraryHealth from "@/assets/patronat-inspekcja-sanitarna-wyrazny.png.asset.json";

const nav = [
  { to: "/", label: "Start" },
  { to: "/strefa-edukacji", label: "Strefa Edukacji" },
  { to: "/ciekawostki", label: "Ciekawostki" },
  { to: "/mapa", label: "Mapa kleszczy" },
  { to: "/materialy-wideo", label: "Materiały wideo" },
  { to: "/symulator", label: "Symulator" },
  { to: "/konkurs", label: "Konkurs" },
  { to: "/galeria", label: "Galeria prac" },
  { to: "/dla-nauczycieli", label: "Dla nauczycieli" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
    <section aria-label="Patronaty honorowe" className="no-print border-b bg-patronage">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <p className="mb-3 text-center text-sm font-semibold text-primary">Patronaty honorowe</p>
        <div className="mx-auto grid max-w-4xl grid-cols-2 items-center justify-center gap-5 sm:gap-10">
          <img src={honoraryForest.url} alt="Lasy Państwowe — patronat honorowy Dyrektora Generalnego Lasów Państwowych" width={2400} height={600} className="aspect-[4/1] w-full object-contain" />
          <img src={honoraryHealth.url} alt="Główny Inspektorat Sanitarny — patronat honorowy" width={2400} height={648} className="aspect-[4/1] w-full object-contain" />
        </div>
      </div>
    </section>
    <header className="no-print sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link to="/" className="text-xl font-semibold text-primary" style={{ fontFamily: "var(--font-display)" }}>Uwaga Kleszcz!</Link>
        <button className="ml-auto rounded-md border px-3 py-1 text-sm xl:hidden" onClick={() => setOpen(!open)} aria-expanded={open}>Menu</button>
        <nav className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col border-b bg-background p-4 xl:static xl:ml-auto xl:flex xl:flex-row xl:border-0 xl:bg-transparent xl:p-0`}>
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: n.to === "/" }}
              className="rounded-md px-3 py-2 text-sm hover:bg-muted xl:px-2" activeProps={{ className: "bg-secondary font-medium text-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="no-print mt-16 border-t bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-row flex-nowrap items-center justify-center" style={{ containerType: "inline-size", gap: "2.5cqw" }}>
          <img src={fe.url} alt="Fundusze Europejskie dla Rozwoju Społecznego, Rzeczpospolita Polska, Dofinansowane przez Unię Europejską, NCBR" className="w-auto" style={{ height: "4cqw" }} loading="lazy" />
                    <img src={up.url} alt="Uczelnie Przyszłości" className="w-auto" style={{ height: "6cqw", transform: "translateY(-0.9cqw)" }} loading="lazy" />
          <img src={wum.url} alt="Warszawski Uniwersytet Medyczny" className="w-auto" style={{ height: "5.6cqw" }} loading="lazy" />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <Link to="/regulamin" className="hover:text-primary">Regulamin serwisu</Link>
          <Link to="/polityka-prywatnosci" className="hover:text-primary">Polityka prywatności i cookies</Link>
          <Link to="/konkurs" className="hover:text-primary">Regulamin konkursu</Link>
          <Link to="/konkurs" hash="dokumenty" className="hover:text-primary">Dokumentacja konkursowa</Link>
          <Link to="/admin" className="hover:text-primary opacity-60 hover:opacity-100">Panel administratora</Link>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">Administrator strony: Olivia Moritz · E-mail: <a href="mailto:s097260@student.wum.edu.pl" className="underline hover:text-primary">s097260@student.wum.edu.pl</a> · Pozostałe dane usługodawcy: <Link to="/regulamin" className="underline hover:text-primary">Regulamin serwisu</Link></p>
        <VisitCounter />
        <p className="mt-4 text-center text-xs text-muted-foreground">Materiały mają charakter informacyjny i nie zastępują konsultacji medycznej.</p>
      </div>
    </footer>
  );
}

/** Renders a plain-text document: blank-line separated paragraphs, short lines as headings. */
export function DocText({ text }: { text: string }) {
  const parts = text.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
  return (
    <div className="space-y-4 text-base leading-relaxed">
      {parts.map((p, i) => {
        const heading = /^(§|ROZDZIAŁ|[IVX]+\.|\d+\.\s+[A-ZĄĆĘŁŃÓŚŹŻ][^.]{0,60}$)/.test(p) && p.length < 90 && !p.includes("\n");
        const upper = p === p.toUpperCase() && p.length < 120 && /[A-ZĄ-Ż]/.test(p);
        if (heading || upper) return <h3 key={i} className="pt-4 text-xl font-semibold text-primary">{p}</h3>;
        if (/^[-•]\s/.test(p)) return <ul key={i} className="list-disc space-y-1 pl-6">{p.split("\n").map((l, j) => <li key={j}>{l.replace(/^[-•]\s*/, "")}</li>)}</ul>;
        return <p key={i} className="whitespace-pre-line">{p}</p>;
      })}
    </div>
  );
}

export function PageHero({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="bg-forest text-forest-foreground">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-accent">{kicker}</p>
        <h1 className="text-4xl font-semibold md:text-5xl">{title}</h1>
        {children && <div className="mt-4 max-w-3xl text-lg opacity-90">{children}</div>}
      </div>
    </section>
  );
}
