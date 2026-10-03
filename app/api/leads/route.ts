import { NextRequest, NextResponse, after } from "next/server";
import { prisma } from "@/lib/db";
import { leadSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { sendLeadNotification, sendLeadConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  console.log("[leads] POST request received");
  const ip = clientIp(request.headers);
  const limit = rateLimit(`leads:${ip}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Too many submissions from this network. Please wait a few minutes and try again, or reach us directly on WhatsApp.",
      },
      { status: 429 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
    console.log("[leads] Raw payload:", JSON.stringify(payload));
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request. Please reload the page and try again." },
      { status: 400 }
    );
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    // Honeypot filled → pretend success, store nothing.
    if (
      typeof payload === "object" &&
      payload !== null &&
      "website_url" in payload &&
      (payload as Record<string, unknown>).website_url
    ) {
      return NextResponse.json({ ok: true, id: "" }, { status: 201 });
    }
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return NextResponse.json(
      {
        ok: false,
        error: "Please correct the highlighted fields and try again.",
        fieldErrors,
      },
      { status: 422 }
    );
  }

  const data = parsed.data;
  console.log("[leads] Parsed data:", JSON.stringify(data));
  console.log("[leads] Honeypot field value:", data.website_url);
  if (data.website_url) {
    console.log("[leads] Honeypot triggered, skipping save");
    return NextResponse.json({ ok: true, id: "" }, { status: 201 });
  }

  try {
    console.log("[leads] Creating lead with data:", data);
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        businessName: data.businessName || null,
        email: data.email || null,
        phone: data.phone,
        city: data.city || null,
        service: data.service,
        currentSystem: data.currentSystem || null,
        message: data.message,
        budget: data.requirement || null,
        preferredContact: data.preferredContact || null,
        source: data.source || "website-contact",
        status: "new",
      },
    });
    console.log("[leads] Lead created successfully:", lead.id);

    // Send emails after the response is delivered; failures never affect the user.
    after(async () => {
      const [notification, confirmation] = await Promise.allSettled([
        sendLeadNotification(lead),
        sendLeadConfirmation(lead),
      ]);
      if (notification.status === "rejected")
        console.error("[email] lead notification failed", notification.reason);
      if (confirmation.status === "rejected")
        console.error("[email] lead confirmation failed", confirmation.reason);
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("[leads] failed to save lead", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't submit your enquiry right now. Please try again or contact us directly on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
