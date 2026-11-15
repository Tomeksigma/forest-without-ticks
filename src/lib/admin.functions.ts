import { createServerFn } from "@tanstack/react-start";
import { modules as fallbackModules } from "@/lib/content";
import { facts as fallbackFacts, miniQuiz as fallbackMiniQuiz } from "@/lib/facts";
import { scenarios as fallbackScenarios } from "@/lib/simulator";

const norm = (s: string) => s.trim().replace(/\s+/g, " ");

function verifyAdmin(password: string): boolean {
  const expected = process.env["ADMIN_PASSWORD"] ?? "";
  return expected.length > 0 && password.trim() === expected.trim();
}

/** Check admin password */
export const checkAdminPassword = createServerFn({ method: "POST" })
  .validator((d: { password: string }) => ({ password: String(d?.password ?? "").slice(0, 200) }))
  .handler(async ({ data }) => {
    return { ok: verifyAdmin(data.password) };
  });

/** Get all site texts (with fallback) */
export const getSiteTexts = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data, error } = await supabaseAdmin
        .from("site_texts")
        .select("key, value");

      if (error || !data) {
        return { texts: {} as Record<string, string> };
      }
      const texts: Record<string, string> = {};
      for (const row of data) {
        texts[row.key] = row.value;
      }
      return { texts };
    } catch (e) {
      console.error("[getSiteTexts error]", e);
      return { texts: {} as Record<string, string> };
    }
  });

/** Save a site text blob */
export const saveSiteText = createServerFn({ method: "POST" })
  .validator((d: { key: string; value: string; adminPassword: string }) => d)
  .handler(async ({ data }) => {
    if (!verifyAdmin(data.adminPassword)) {
      throw new Error("Unauthorized");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("site_texts")
      .upsert({ key: data.key, value: data.value, updated_at: new Date().toISOString() });

    if (error) throw new Error(error.message);
    return { ok: true };
  });

export type DbModule = {
  id: number;
  n: number;
  roman: string;
  title: string;
  lead: string;
  sort_order: number;
  lessons: {
    id: number;
    title: string;
    content_md: string;
    sort_order: number;
  }[];
  quiz: {
    id: number;
    q: string;
    options: string[];
    correct: number;
    sort_order: number;
  }[];
};

/** Get modules with their lessons and quizzes */
export const getModulesData = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: dbMods, error: mErr } = await supabaseAdmin
        .from("modules")
        .select("id, n, roman, title, lead, sort_order")
        .order("sort_order", { ascending: true });

      if (mErr || !dbMods || dbMods.length === 0) {
        return { modules: [] as DbModule[], usingFallback: true };
      }

      const { data: dbLessons } = await supabaseAdmin
        .from("lessons")
        .select("id, module_id, title, content_md, sort_order")
        .order("sort_order", { ascending: true });

      const { data: dbQuestions } = await supabaseAdmin
        .from("quiz_questions")
        .select("id, scope, q, options, correct, sort_order")
        .order("sort_order", { ascending: true });

      const result: DbModule[] = dbMods.map((m) => {
        const modLessons = (dbLessons ?? [])
          .filter((l) => l.module_id === m.id)
          .map((l) => ({
            id: l.id,
            title: l.title,
            content_md: l.content_md,
            sort_order: l.sort_order,
          }));

        const modQuiz = (dbQuestions ?? [])
          .filter((q) => q.scope === `module:${m.n}`)
          .map((q) => ({
            id: q.id,
            q: q.q,
            options: (Array.isArray(q.options) ? q.options : []) as string[],
            correct: q.correct,
            sort_order: q.sort_order,
          }));

        return {
          id: m.id,
          n: m.n,
          roman: m.roman,
          title: m.title,
          lead: m.lead,
          sort_order: m.sort_order,
          lessons: modLessons,
          quiz: modQuiz,
        };
      });

      return { modules: result, usingFallback: false };
    } catch (e) {
      console.error("[getModulesData error]", e);
      return { modules: [] as DbModule[], usingFallback: true };
    }
  });

/** Save a lesson (create or update) */
export const saveLesson = createServerFn({ method: "POST" })
  .validator((d: {
    id?: number;
    moduleId: number;
    title: string;
    content_md: string;
    sort_order?: number;
    adminPassword: string;
  }) => d)
  .handler(async ({ data }) => {
    if (!verifyAdmin(data.adminPassword)) throw new Error("Unauthorized");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    if (data.id) {
      const { error } = await supabaseAdmin
        .from("lessons")
        .update({
          title: data.title,
          content_md: data.content_md,
          sort_order: data.sort_order ?? 0,
          updated_at: new Date().toISOString(),
        })
        .eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin
        .from("lessons")
        .insert({
          module_id: data.moduleId,
          title: data.title,
          content_md: data.content_md,
          sort_order: data.sort_order ?? 0,
        });
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

/** Delete a lesson */
export const deleteLesson = createServerFn({ method: "POST" })
  .validator((d: { id: number; adminPassword: string }) => d)
  .handler(async ({ data }) => {
    if (!verifyAdmin(data.adminPassword)) throw new Error("Unauthorized");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("lessons").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Save a module */
export const saveModule = createServerFn({ method: "POST" })
  .validator((d: {
    id: number;
    title: string;
    lead: string;
    adminPassword: string;
  }) => d)
  .handler(async ({ data }) => {
    if (!verifyAdmin(data.adminPassword)) throw new Error("Unauthorized");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("modules")
      .update({
        title: data.title,
        lead: data.lead,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Save a quiz question */
export const saveQuizQuestion = createServerFn({ method: "POST" })
  .validator((d: {
    id?: number;
    scope: string;
    q: string;
    options: string[];
    correct: number;
    sort_order?: number;
    adminPassword: string;
  }) => d)
  .handler(async ({ data }) => {
    if (!verifyAdmin(data.adminPassword)) throw new Error("Unauthorized");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    if (data.id) {
      const { error } = await supabaseAdmin
        .from("quiz_questions")
        .update({
          scope: data.scope,
          q: data.q,
          options: data.options,
          correct: data.correct,
          sort_order: data.sort_order ?? 0,
          updated_at: new Date().toISOString(),
        })
        .eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin
        .from("quiz_questions")
        .insert({
          scope: data.scope,
          q: data.q,
          options: data.options,
          correct: data.correct,
          sort_order: data.sort_order ?? 0,
        });
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

/** Delete a quiz question */
export const deleteQuizQuestion = createServerFn({ method: "POST" })
  .validator((d: { id: number; adminPassword: string }) => d)
  .handler(async ({ data }) => {
    if (!verifyAdmin(data.adminPassword)) throw new Error("Unauthorized");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("quiz_questions").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Get facts & mini quiz questions */
export const getFactsData = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: dbFacts, error: fErr } = await supabaseAdmin
        .from("facts")
        .select("*")
        .order("sort_order", { ascending: true });

      const { data: dbMiniQuiz } = await supabaseAdmin
        .from("quiz_questions")
        .select("*")
        .eq("scope", "mini")
        .order("sort_order", { ascending: true });

      const mappedFacts = dbFacts && dbFacts.length > 0
        ? dbFacts.map((f: any) => ({
            id: f.id,
            category: f.category as "biologia" | "srodowisko" | "medyczne",
            question: f.question,
            answer: f.answer,
            explanation: f.explanation,
            meaning: f.meaning,
            sourceName: f.source_name || f.sourceName || "",
            sourceUrl: f.source_url || f.sourceUrl || "",
            guess: (f.guess && typeof f.guess === "object" && "options" in f.guess)
              ? (f.guess as { options: string[]; correct: number })
              : { options: [], correct: 0 },
          }))
        : fallbackFacts;

      return {
        facts: mappedFacts,
        miniQuiz: dbMiniQuiz && dbMiniQuiz.length > 0
          ? dbMiniQuiz.map((q) => ({
              question: q.q,
              options: (Array.isArray(q.options) ? q.options : []) as string[],
              correct: q.correct,
              why: "",
            }))
          : fallbackMiniQuiz,
      };
    } catch (e) {
      console.error("[getFactsData error]", e);
      return { facts: fallbackFacts, miniQuiz: fallbackMiniQuiz };
    }
  });

/** Save a fact */
export const saveFact = createServerFn({ method: "POST" })
  .validator((d: {
    id?: number;
    category: string;
    question: string;
    answer: string;
    explanation: string;
    meaning: string;
    sourceName: string;
    sourceUrl: string;
    guess: { options: string[]; correct: number };
    sort_order?: number;
    adminPassword: string;
  }) => d)
  .handler(async ({ data }) => {
    if (!verifyAdmin(data.adminPassword)) throw new Error("Unauthorized");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const payload = {
      category: data.category,
      question: data.question,
      answer: data.answer,
      explanation: data.explanation,
      meaning: data.meaning,
      source_name: data.sourceName,
      source_url: data.sourceUrl,
      guess: data.guess,
      sort_order: data.sort_order ?? 0,
      updated_at: new Date().toISOString(),
    };

    if (data.id) {
      const { error } = await supabaseAdmin.from("facts").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin.from("facts").insert(payload);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

/** Delete a fact */
export const deleteFact = createServerFn({ method: "POST" })
  .validator((d: { id: number; adminPassword: string }) => d)
  .handler(async ({ data }) => {
    if (!verifyAdmin(data.adminPassword)) throw new Error("Unauthorized");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("facts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Get simulator scenarios */
export const getSimulatorData = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data, error } = await supabaseAdmin
        .from("simulator_scenarios")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error || !data || data.length === 0) {
        return { scenarios: fallbackScenarios };
      }
      return {
        scenarios: data.map((s) => ({
          id: s.id,
          stage: s.stage,
          situation: s.situation,
          options: (Array.isArray(s.options) ? s.options : []) as { text: string; ok: boolean; why: string }[],
        })),
      };
    } catch (e) {
      console.error("[getSimulatorData error]", e);
      return { scenarios: fallbackScenarios };
    }
  });

/** Save a simulator scenario */
export const saveSimulatorScenario = createServerFn({ method: "POST" })
  .validator((d: {
    id?: number;
    stage: string;
    situation: string;
    options: { text: string; ok: boolean; why: string }[];
    sort_order?: number;
    adminPassword: string;
  }) => d)
  .handler(async ({ data }) => {
    if (!verifyAdmin(data.adminPassword)) throw new Error("Unauthorized");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const payload = {
      stage: data.stage,
      situation: data.situation,
      options: data.options,
      sort_order: data.sort_order ?? 0,
      updated_at: new Date().toISOString(),
    };

    if (data.id) {
      const { error } = await supabaseAdmin.from("simulator_scenarios").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin.from("simulator_scenarios").insert(payload);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

/** Delete a simulator scenario */
export const deleteSimulatorScenario = createServerFn({ method: "POST" })
  .validator((d: { id: number; adminPassword: string }) => d)
  .handler(async ({ data }) => {
    if (!verifyAdmin(data.adminPassword)) throw new Error("Unauthorized");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("simulator_scenarios").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Upload an image file directly to Supabase Storage `site-assets` bucket */
export const uploadImageToStorage = createServerFn({ method: "POST" })
  .validator((d: {
    base64: string;
    filename: string;
    contentType: string;
    folder?: string;
    adminPassword: string;
  }) => d)
  .handler(async ({ data }) => {
    if (!verifyAdmin(data.adminPassword)) throw new Error("Unauthorized");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Clean folder and file names
    const folder = (data.folder ?? "uploads").replace(/^\/+|\/+$/g, "");
    const safeName = data.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filePath = `${folder}/${Date.now()}-${safeName}`;

    // Decode base64 buffer
    const buffer = Buffer.from(data.base64, "base64");

    const { error: uploadError } = await supabaseAdmin.storage
      .from("site-assets")
      .upload(filePath, buffer, {
        contentType: data.contentType,
        upsert: true,
      });

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data: urlData } = supabaseAdmin.storage
      .from("site-assets")
      .getPublicUrl(filePath);

    return {
      filePath,
      publicUrl: urlData.publicUrl,
    };
  });

/** Get gallery photos */
export const getGalleryPhotos = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data, error } = await supabaseAdmin
        .from("gallery_photos")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error || !data) return { photos: [] };
      return { photos: data };
    } catch (e) {
      console.error("[getGalleryPhotos error]", e);
      return { photos: [] };
    }
  });

/** Save or update a gallery photo */
export const saveGalleryPhoto = createServerFn({ method: "POST" })
  .validator((d: {
    id?: number;
    storagePath: string;
    caption?: string;
    author?: string;
    school?: string;
    approved?: boolean;
    sort_order?: number;
    adminPassword: string;
  }) => d)
  .handler(async ({ data }) => {
    if (!verifyAdmin(data.adminPassword)) throw new Error("Unauthorized");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const payload = {
      storage_path: data.storagePath,
      caption: data.caption ?? null,
      author: data.author ?? null,
      school: data.school ?? null,
      approved: data.approved ?? true,
      sort_order: data.sort_order ?? 0,
    };

    if (data.id) {
      const { error } = await supabaseAdmin.from("gallery_photos").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin.from("gallery_photos").insert(payload);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

/** Delete a gallery photo */
export const deleteGalleryPhoto = createServerFn({ method: "POST" })
  .validator((d: { id: number; adminPassword: string }) => d)
  .handler(async ({ data }) => {
    if (!verifyAdmin(data.adminPassword)) throw new Error("Unauthorized");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("gallery_photos").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
