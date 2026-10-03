import "server-only";
import nodemailer from "nodemailer";
import type { Lead } from "@prisma/client";
import { site } from "@/lib/config";

function smtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER);
}

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function fromAddress(): string {
  return (
    process.env.EMAIL_FROM ||
    `${site.name} Website <${process.env.SMTP_USER ?? "no-reply@localhost"}>`
  );
}

export async function sendLeadNotification(lead: Lead): Promise<void> {
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!smtpConfigured() || !to) {
    console.info(
      `[email] SMTP not configured — lead notification skipped. Lead ${lead.id} from ${lead.name} (${lead.phone})`
    );
    return;
  }

  const rows: Array<[string, string]> = [
    ["Name", lead.name],
    ["Business", lead.businessName ?? "—"],
    ["Phone", lead.phone],
    ["Email", lead.email ?? "—"],
    ["City", lead.city ?? "—"],
    ["Service", lead.service],
    ["Current system", lead.currentSystem ?? "—"],
    ["Preferred contact", lead.preferredContact ?? "—"],
    ["Source", lead.source],
  ];

  const html = `
    <h2>New enquiry from the website</h2>
    <table cellpadding="6" cellspacing="0" border="0">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="color:#666">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`
        )
        .join("")}
    </table>
    <h3>Message</h3>
    <p>${escapeHtml(lead.message).replace(/\n/g, "<br/>")}</p>
    <p style="color:#666;font-size:12px">View this lead in the admin dashboard: ${site.url}/admin/leads/${lead.id}</p>
  `;

  await createTransport().sendMail({
    from: fromAddress(),
    to,
    subject: `New enquiry: ${lead.service} — ${lead.name}`,
    html,
  });
}

export async function sendLeadConfirmation(lead: Lead): Promise<void> {
  if (!smtpConfigured() || !lead.email) return;

  const html = `
    <p>Hi ${escapeHtml(lead.name)},</p>
    <p>Thank you for reaching out to ${escapeHtml(site.name)}. We have received your enquiry about <strong>${escapeHtml(lead.service)}</strong> and will get back to you within 1–2 business days.</p>
    <p>If your requirement is urgent, you can also reach us directly${site.phone ? ` on ${escapeHtml(site.phone)}` : " by replying to this email"}.</p>
    <p>Regards,<br/>${escapeHtml(site.name)}<br/>${escapeHtml(site.city)}, ${escapeHtml(site.region)}</p>
  `;

  await createTransport().sendMail({
    from: fromAddress(),
    to: lead.email,
    subject: `We received your enquiry — ${site.name}`,
    html,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
