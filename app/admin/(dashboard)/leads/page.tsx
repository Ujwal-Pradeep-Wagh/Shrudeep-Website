import Link from "next/link";
import { prisma } from "@/lib/db";
import { LEAD_STATUSES, LEAD_STATUS_LABELS } from "@/lib/config";
import { StatusBadge } from "@/components/admin/StatusBadge";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 15;

type PageProps = {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminLeadsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const status = params.status ?? "";
  const page = Math.max(1, Number(params.page) || 1);

  const where: Prisma.LeadWhereInput = {
    ...(status && (LEAD_STATUSES as readonly string[]).includes(status)
      ? { status }
      : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q } },
            { businessName: { contains: q } },
            { phone: { contains: q } },
            { email: { contains: q } },
            { city: { contains: q } },
          ],
        }
      : {}),
  };

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.lead.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function pageUrl(targetPage: number): string {
    const search = new URLSearchParams();
    if (q) search.set("q", q);
    if (status) search.set("status", status);
    search.set("page", String(targetPage));
    return `/admin/leads?${search.toString()}`;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="mt-1 text-sm text-slate-500">
            {total} {total === 1 ? "enquiry" : "enquiries"}
            {status ? ` · filtered by ${LEAD_STATUS_LABELS[status as keyof typeof LEAD_STATUS_LABELS] ?? status}` : ""}
            {q ? ` · matching “${q}”` : ""}
          </p>
        </div>
      </div>

      {/* Filters */}
      <form
        method="GET"
        action="/admin/leads"
        className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
      >
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search name, business, phone, email, city…"
          className="min-w-56 flex-1 rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
        />
        <select
          name="status"
          defaultValue={status}
          className="rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-brand-600 focus:outline-none"
        >
          <option value="">All statuses</option>
          {LEAD_STATUSES.map((value) => (
            <option key={value} value={value}>
              {LEAD_STATUS_LABELS[value]}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Apply
        </button>
        {(q || status) && (
          <Link
            href="/admin/leads"
            className="text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            Clear
          </Link>
        )}
      </form>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        {leads.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-slate-500">
            No leads match these filters.
          </p>
        ) : (
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Business</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3" aria-label="Actions" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    <Link href={`/admin/leads/${lead.id}`} className="hover:text-brand-700">
                      {lead.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{lead.businessName ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-600">{lead.service}</td>
                  <td className="px-4 py-3 text-slate-600">{lead.phone}</td>
                  <td className="px-4 py-3 text-slate-600">{lead.city ?? "—"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-500">{formatDate(lead.createdAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="font-semibold text-brand-700 hover:text-brand-800"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="flex items-center justify-between" aria-label="Pagination">
          <p className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={pageUrl(page - 1)}
                className="rounded-lg border border-slate-300 px-3.5 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                ← Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={pageUrl(page + 1)}
                className="rounded-lg border border-slate-300 px-3.5 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Next →
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
