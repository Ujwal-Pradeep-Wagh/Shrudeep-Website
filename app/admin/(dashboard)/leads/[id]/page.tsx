import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, site } from "@/lib/config";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { updateLeadStatus, deleteLead } from "../../../actions";
import { NoteForm } from "./NoteForm";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

function formatDateTime(date: Date): string {
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-slate-800">{value || "—"}</dd>
    </div>
  );
}

function toWhatsAppHref(phone: string): string | null {
  let digits = phone.replace(/[^\d]/g, "");
  if (!digits) return null;
  if (digits.length === 10) digits = `91${digits}`; // default to India
  if (digits.length < 11) return null;
  return `https://wa.me/${digits}`;
}

export default async function AdminLeadDetailPage({ params }: PageProps) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      notes: {
        orderBy: { createdAt: "desc" },
        include: { author: { select: { name: true } } },
      },
    },
  });

  if (!lead) notFound();

  const whatsappHref = toWhatsAppHref(lead.phone);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href="/admin/leads"
            className="text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            ← All leads
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">{lead.name}</h1>
          <p className="mt-1 text-sm text-slate-500">
            Received {formatDateTime(lead.createdAt)} · Source: {lead.source}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-whatsapp px-4 py-2 text-sm font-semibold text-white hover:bg-whatsapp-dark"
            >
              WhatsApp {lead.name.split(" ")[0]}
            </a>
          )}
          <form action={deleteLead}>
            <input type="hidden" name="leadId" value={lead.id} />
            <button
              type="submit"
              className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
            >
              Delete
            </button>
          </form>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Details + notes */}
        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">Enquiry details</h2>
            <dl className="mt-4 grid gap-5 sm:grid-cols-2">
              <Field label="Name" value={lead.name} />
              <Field label="Business" value={lead.businessName} />
              <Field label="Phone" value={lead.phone} />
              <Field label="Email" value={lead.email} />
              <Field label="City" value={lead.city} />
              <Field label="Service required" value={lead.service} />
              <Field label="Current software / system" value={lead.currentSystem} />
              <Field label="Approximate requirement" value={lead.budget} />
              <Field label="Preferred contact" value={lead.preferredContact} />
            </dl>
            <div className="mt-5">
              <h3 className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                Message
              </h3>
              <p className="mt-2 rounded-lg bg-slate-50 p-4 text-sm leading-relaxed whitespace-pre-wrap text-slate-800">
                {lead.message}
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">
              Notes ({lead.notes.length})
            </h2>
            <NoteForm leadId={lead.id} />
            <ul className="mt-5 space-y-4">
              {lead.notes.map((note) => (
                <li key={note.id} className="rounded-lg bg-slate-50 p-4">
                  <p className="text-sm whitespace-pre-wrap text-slate-800">
                    {note.content}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    {note.author?.name ?? "Admin"} · {formatDateTime(note.createdAt)}
                  </p>
                </li>
              ))}
              {lead.notes.length === 0 && (
                <li className="text-sm text-slate-500">
                  No notes yet — record call outcomes, requirements, and follow-ups here.
                </li>
              )}
            </ul>
          </section>
        </div>

        {/* Status */}
        <aside className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">Lead status</h2>
            <div className="mt-3">
              <StatusBadge status={lead.status} />
            </div>
            <form action={updateLeadStatus} className="mt-4 space-y-3">
              <input type="hidden" name="leadId" value={lead.id} />
              <label
                htmlFor="status"
                className="block text-xs font-semibold tracking-wide text-slate-400 uppercase"
              >
                Change status
              </label>
              <select
                id="status"
                name="status"
                defaultValue={lead.status}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-brand-600 focus:outline-none"
              >
                {LEAD_STATUSES.map((value) => (
                  <option key={value} value={value}>
                    {LEAD_STATUS_LABELS[value]}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
              >
                Update status
              </button>
            </form>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Suggested flow: New → Contacted → Qualified → Proposal Sent →
              Negotiation → Won/Lost. Use Follow-up when waiting on the client.
            </p>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-900">Quick actions</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {lead.email && (
                <li>
                  <a
                    href={`mailto:${lead.email}?subject=Your enquiry to ${site.name}`}
                    className="font-medium text-brand-700 hover:text-brand-800"
                  >
                    Email {lead.name.split(" ")[0]} →
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`tel:${lead.phone.replace(/[^+\d]/g, "")}`}
                  className="font-medium text-brand-700 hover:text-brand-800"
                >
                  Call {lead.phone} →
                </a>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
