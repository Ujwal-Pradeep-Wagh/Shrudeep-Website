import "server-only";
import { prisma } from "@/lib/db";
import { site } from "@/lib/config";

export type AnalyticsEventName =
  | "page_view"
  | "contact_form_started"
  | "contact_form_submitted"
  | "whatsapp_clicked"
  | "phone_clicked"
  | "email_clicked"
  | "consultation_cta_clicked"
  | "service_viewed";

export async function trackEvent(
  event: AnalyticsEventName,
  path?: string,
  meta?: Record<string, string>
): Promise<void> {
  if (!site.analyticsEnabled) return;
  try {
    await prisma.analyticsEvent.create({
      data: {
        event,
        path: path ?? null,
        meta: meta ? JSON.stringify(meta) : null,
      },
    });
  } catch (error) {
    // Analytics must never break the user experience.
    console.warn("[analytics] failed to record event", error);
  }
}
