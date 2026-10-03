// Simple in-memory fixed-window rate limiter.
// NOTE: suitable for a single-instance deployment (Vercel/Railway single dyno).
// For multi-instance deployments, replace with a shared store (e.g. Upstash Redis).

type Bucket = { count: number; resetAt: number };

const globalStore = globalThis as unknown as { __rateBuckets?: Map<string, Bucket> };
const buckets = (globalStore.__rateBuckets ??= new Map<string, Bucket>());

export type RateResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfterSeconds: number };

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateResult {
  const now = Date.now();

  // Lazy cleanup to prevent unbounded growth.
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) {
      if (b.resetAt < now) buckets.delete(k);
    }
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (bucket.count >= limit) {
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { ok: true, remaining: limit - bucket.count };
}

export function clientIp(headers: { get(name: string): string | null }): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return headers.get("x-real-ip")?.trim() ?? "unknown";
}
