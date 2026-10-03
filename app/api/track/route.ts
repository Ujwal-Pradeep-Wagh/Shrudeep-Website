import { NextRequest, NextResponse } from "next/server";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const ALLOWED_EVENTS = new Set<AnalyticsEventName>([
  "page_view",
  "contact_form_started",
  "contact_form_submitted",
  "whatsapp_clicked",
  "phone_clicked",
  "email_clicked",
  "consultation_cta_clicked",
  "service_viewed",
]);

export async function POST(request: NextRequest) {
  const ip = clientIp(request.headers);
  const limit = rateLimit(`track:${ip}`, 120, 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  try {
    const body = (await request.json()) as {
      event?: string;
      path?: string;
      meta?: Record<string, string>;
    };

    if (!body.event || !ALLOWED_EVENTS.has(body.event as AnalyticsEventName)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    await trackEvent(
      body.event as AnalyticsEventName,
      typeof body.path === "string" ? body.path.slice(0, 200) : undefined,
      body.meta && typeof body.meta === "object" ? body.meta : undefined
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
