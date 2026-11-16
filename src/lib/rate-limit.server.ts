import { getRequest } from "@tanstack/react-start/server";

export interface RateLimitResult {
  allowed: boolean;
  attemptsUsed: number;
  maxAttempts: number;
  remainingAttempts: number;
  retryAfterMinutes?: number;
}

const MAX_ATTEMPTS = 5;
const WINDOW_MINUTES = 15;

/** Extract client IP from request headers (works on Netlify, standard proxies, local) */
export function getClientIp(): string {
  try {
    const req = getRequest();
    if (!req) return "unknown";

    const headers = req.headers;
    const xForwardedFor = headers.get("x-forwarded-for") || headers.get("x-nf-client-connection-ip");
    if (xForwardedFor) {
      // First IP in list is client IP
      return xForwardedFor.split(",")[0].trim();
    }
    const realIp = headers.get("x-real-ip") || headers.get("client-ip");
    if (realIp) return realIp.trim();
  } catch {
    // fallback if outside request context
  }
  return "unknown";
}

/**
 * Check if the given IP is currently rate limited for the given scope ('admin' | 'teacher').
 */
export async function checkRateLimit(
  scope: "admin" | "teacher",
  ip: string
): Promise<RateLimitResult> {
  if (!ip || ip === "unknown") {
    // If IP is undetectable, allow but do not strictly block
    return { allowed: true, attemptsUsed: 0, maxAttempts: MAX_ATTEMPTS, remainingAttempts: MAX_ATTEMPTS };
  }

  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const cutoff = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();

    const { data, error } = await supabaseAdmin
      .from("login_attempts" as any)
      .select("id, attempted_at")
      .eq("ip", ip)
      .eq("scope", scope)
      .gte("attempted_at", cutoff);

    if (error) {
      console.warn("[RateLimit check warning]", error.message);
      // Fail-open on DB connection glitch so valid logins aren't permanently locked out
      return { allowed: true, attemptsUsed: 0, maxAttempts: MAX_ATTEMPTS, remainingAttempts: MAX_ATTEMPTS };
    }

    const attemptsUsed = data ? data.length : 0;
    const allowed = attemptsUsed < MAX_ATTEMPTS;
    const remainingAttempts = Math.max(0, MAX_ATTEMPTS - attemptsUsed);

    return {
      allowed,
      attemptsUsed,
      maxAttempts: MAX_ATTEMPTS,
      remainingAttempts,
      retryAfterMinutes: allowed ? undefined : WINDOW_MINUTES,
    };
  } catch (e) {
    console.warn("[RateLimit check error]", e);
    return { allowed: true, attemptsUsed: 0, maxAttempts: MAX_ATTEMPTS, remainingAttempts: MAX_ATTEMPTS };
  }
}

/**
 * Record a failed login attempt for the given IP and scope.
 * Also cleans up records older than 24h to keep table light.
 */
export async function recordFailedAttempt(
  scope: "admin" | "teacher",
  ip: string
): Promise<void> {
  if (!ip || ip === "unknown") return;

  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    await supabaseAdmin
      .from("login_attempts" as any)
      .insert({
        ip,
        scope,
        attempted_at: new Date().toISOString(),
      });

    // Fire and forget cleanup of old records (> 24 hours)
    const oldCutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    supabaseAdmin
      .from("login_attempts" as any)
      .delete()
      .lt("attempted_at", oldCutoff)
      .then(() => {})
      .catch(() => {});
  } catch (e) {
    console.warn("[RateLimit record error]", e);
  }
}

/**
 * Clear failed login attempts after a successful login.
 */
export async function clearAttemptsOnSuccess(
  scope: "admin" | "teacher",
  ip: string
): Promise<void> {
  if (!ip || ip === "unknown") return;

  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin
      .from("login_attempts" as any)
      .delete()
      .eq("ip", ip)
      .eq("scope", scope);
  } catch (e) {
    console.warn("[RateLimit clear error]", e);
  }
}
