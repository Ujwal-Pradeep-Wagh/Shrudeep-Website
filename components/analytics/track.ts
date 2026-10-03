"use client";

export type TrackEventName =
  | "contact_form_started"
  | "contact_form_submitted"
  | "whatsapp_clicked"
  | "phone_clicked"
  | "email_clicked"
  | "consultation_cta_clicked"
  | "service_viewed";

export function track(
  event: TrackEventName,
  meta?: Record<string, string>
): void {
  try {
    const payload = JSON.stringify({
      event,
      path: window.location.pathname,
      meta,
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/track",
        new Blob([payload], { type: "application/json" })
      );
    } else {
      void fetch("/api/track", {
        method: "POST",
        body: payload,
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      });
    }
  } catch {
    // Analytics must never break the page.
  }
}
