import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function VisitCounter() {
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    const counted = sessionStorage.getItem("visit-counted");
    (async () => {
      try {
        if (!counted) {
          sessionStorage.setItem("visit-counted", "1");
          const { data } = await supabase.rpc("increment_visits");
          if (typeof data === "number") return setN(data);
        }
        const { data } = await supabase.from("site_counter").select("visits").eq("id", 1).maybeSingle();
        if (data) setN(Number(data.visits));
      } catch (err) {
        console.error("Visit counter error:", err);
      }
    })();
  }, []);
  return (
    <p className="mt-4 text-center text-sm text-muted-foreground">
      Liczba wejść na stronę: <strong className="text-foreground">{n === null ? "…" : n.toLocaleString("pl-PL")}</strong>
    </p>
  );
}
