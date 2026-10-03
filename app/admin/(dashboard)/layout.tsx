import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "../actions";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: `Admin | ${site.name}`,
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold text-white">
                {site.name.charAt(0)}
              </span>
              <span className="text-sm font-bold text-slate-900">Admin</span>
            </Link>
            <nav className="flex items-center gap-1" aria-label="Admin">
              <Link
                href="/admin"
                className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/leads"
                className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Leads
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-xs text-slate-500 hover:text-brand-700 sm:block"
            >
              View website ↗
            </a>
            <span className="hidden text-sm text-slate-600 sm:block">
              {session.name}
            </span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
