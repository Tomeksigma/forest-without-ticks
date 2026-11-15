import { createServerFn } from "@tanstack/react-start";

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

/** Sprawdza hasło nauczyciela po stronie serwera (hasło nie trafia do przeglądarki). */
export const checkTeacherPassword = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string }) => ({ password: String(d?.password ?? "").slice(0, 200) }))
  .handler(async ({ data }) => {
    const expected = process.env["TEACHER_PASSWORD"] ?? "";
    return { ok: expected.length > 0 && norm(data.password) === norm(expected) };
  });
