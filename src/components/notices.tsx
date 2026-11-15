export function Notice({ children, tone = "info" }: { children: React.ReactNode; tone?: "info" | "warn" }) {
  return (
    <div role="note" className={`rounded-lg border-l-4 p-4 text-sm leading-relaxed ${tone === "warn" ? "border-accent bg-accent/15" : "border-primary bg-secondary"}`}>
      {children}
    </div>
  );
}

export function ProgressNotice() {
  return (
    <Notice tone="warn">
      <strong>Twoje postępy nie są zapisywane.</strong> Strona nie zapisuje żadnych danych — wyniki modułów i quizów są przechowywane wyłącznie w Twojej przeglądarce do momentu odświeżenia lub zamknięcia strony. Po odświeżeniu trzeba zacząć od nowa, dlatego przejdź wszystkie moduły i pobierz certyfikat podczas jednej wizyty.
    </Notice>
  );
}

export function HealthNotice() {
  return (
    <Notice>
      Materiały udostępnione w serwisie „Uwaga Kleszcz!” mają charakter edukacyjny i informacyjny. Nie stanowią indywidualnej porady medycznej, diagnozy ani zaleceń terapeutycznych.
      <br />W przypadku wystąpienia niepokojących objawów lub podejrzenia choroby odkleszczowej skontaktuj się z lekarzem. Nie opieraj decyzji dotyczących diagnostyki i leczenia wyłącznie na informacjach zamieszczonych na stronie.
    </Notice>
  );
}

export function DemoBanner() {
  return (
    <div className="no-print bg-accent/20 px-4 py-2 text-center text-xs text-accent-foreground">
      Strona znajduje się w fazie przygotowania. Część prezentowanych materiałów ma charakter demonstracyjny i nie stanowi jeszcze ostatecznej, zweryfikowanej wersji treści edukacyjnych projektu.
    </div>
  );
}
