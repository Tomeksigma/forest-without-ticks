CREATE TABLE public.site_counter (id int PRIMARY KEY DEFAULT 1 CHECK (id = 1), visits bigint NOT NULL DEFAULT 0);
INSERT INTO public.site_counter (id, visits) VALUES (1, 0);
GRANT SELECT ON public.site_counter TO anon, authenticated;
GRANT ALL ON public.site_counter TO service_role;
ALTER TABLE public.site_counter ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read counter" ON public.site_counter FOR SELECT TO anon, authenticated USING (true);
CREATE OR REPLACE FUNCTION public.increment_visits() RETURNS bigint LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.site_counter SET visits = visits + 1 WHERE id = 1 RETURNING visits;
$$;
REVOKE ALL ON FUNCTION public.increment_visits() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_visits() TO anon, authenticated;