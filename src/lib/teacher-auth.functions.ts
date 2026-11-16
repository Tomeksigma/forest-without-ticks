import { createServerFn } from "@tanstack/react-start";

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

/** Sprawdza hasło nauczyciela po stronie serwera z ochroną przed brute-force (max 5 prób / 15 min). */
export const checkTeacherPassword = createServerFn({ method: "POST" })
  .validator((d: { password: string }) => ({ password: String(d?.password ?? "").slice(0, 200) }))
  .handler(async ({ data }) => {
    const { getClientIp, checkRateLimit, recordFailedAttempt, clearAttemptsOnSuccess } = await import("./rate-limit.server");
    const ip = getClientIp();

    // 1. Check if IP is currently blocked
    const rateCheck = await checkRateLimit("teacher", ip);
    if (!rateCheck.allowed) {
      return {
        ok: false,
        blocked: true,
        attemptsUsed: rateCheck.attemptsUsed,
        maxAttempts: rateCheck.maxAttempts,
        remainingAttempts: 0,
        message: "Zbyt wiele nieudanych prób logowania. Twoje IP zostało zablokowane na 15 minut.",
      };
    }

    const expected = process.env["TEACHER_PASSWORD"] ?? "";
    const isCorrect = expected.length > 0 && norm(data.password) === norm(expected);

    if (!isCorrect) {
      await recordFailedAttempt("teacher", ip);
      const updatedAttempts = rateCheck.attemptsUsed + 1;
      const remaining = Math.max(0, rateCheck.maxAttempts - updatedAttempts);
      const isNowBlocked = updatedAttempts >= rateCheck.maxAttempts;

      return {
        ok: false,
        blocked: isNowBlocked,
        attemptsUsed: updatedAttempts,
        maxAttempts: rateCheck.maxAttempts,
        remainingAttempts: remaining,
        message: isNowBlocked
          ? "Zbyt wiele nieudanych prób. Twoje IP zostało zablokowane na 15 minut."
          : `Nieprawidłowy kod nauczyciela (Próba ${updatedAttempts}/${rateCheck.maxAttempts}).`,
      };
    }

    await clearAttemptsOnSuccess("teacher", ip);
    return { ok: true, blocked: false, attemptsUsed: 0, maxAttempts: rateCheck.maxAttempts, remainingAttempts: rateCheck.maxAttempts };
  });
