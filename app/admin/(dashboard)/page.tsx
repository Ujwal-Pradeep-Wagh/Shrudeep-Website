import Link from "next/link";
import { prisma } from "@/lib/db";
import { LEAD_STATUSES, LEAD_STATUS_LABELS } from "@/lib/config";
import { StatusBadge } from "@/components/admin/StatusBadge";

export const dynamic = "force-dynamic";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminDashboardPage() {
  const [totalLeads, grouped, recentLeads, weekCount] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
    prisma.lead.count({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    }),
  ]);

  const countByStatus = Object.fromEntries(
    grouped.map((row) => [row.status, row._count._all])
  );
  const maxCount = Math.max(1, ...grouped.map((row) => row._count._all));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          {weekCount} new {weekCount === 1 ? "enquiry" : "enquiries"} in the last 7 days
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">Total leads</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{totalLeads}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">New</p>
          <p className="mt-1 text-3xl font-bold text-blue-700">
            {countByStatus["new"] ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">Won</p>
          <p className="mt-1 text-3xl font-bold text-green-700">
            {countByStatus["won"] ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">In pipeline</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">
            {(countByStatus["contacted"] ?? 0) +
              (countByStatus["qualified"] ?? 0) +
              (countByStatus["proposal-sent"] ?? 0) +
              (countByStatus["negotiation"] ?? 0) +
              (countByStatus["follow-up"] ?? 0)}
          </p>
        </div>
      </div>

      {/* Pipeline by status */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-base font-semibold text-slate-900">Pipeline by status</h2>
        <div className="mt-4 space-y-3">
          {LEAD_STATUSES.map((status) => {
            const count = countByStatus[status] ?? 0;
            return (
              <div key={status} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm text-slate-600">
                  {LEAD_STATUS_LABELS[status]}
                </span>
                <div className="h-2.5 flex-1 rounded-full bg-slate-100">
                  <div
                    className="h-2.5 rounded-full bg-brand-600"
                    style={{ width: `${Math.round((count / maxCount) * 100)}%` }}
                  />
                </div>
                <span className="w-8 text-right text-sm font-semibold text-slate-900">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent leads */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900">Recent enquiries</h2>
          <Link
            href="/admin/leads"
            className="text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            View all →
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-slate-500">
            No enquiries yet. When someone submits the contact form, they'll
            appear here.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recentLeads.map((lead) => (
              <li key={lead.id}>
                <Link
                  href={`/admin/leads/${lead.id}`}
                  className="flex flex-wrap items-center gap-x-4 gap-y-1 px-6 py-3.5 hover:bg-slate-50"
                >
                  <span className="min-w-36 font-medium text-slate-900">{lead.name}</span>
                  <span className="text-sm text-slate-500">{lead.service}</span>
                  <span className="ml-auto flex items-center gap-3">
                    <StatusBadge status={lead.status} />
                    <span className="text-xs text-slate-400">
                      {formatDate(lead.createdAt)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
