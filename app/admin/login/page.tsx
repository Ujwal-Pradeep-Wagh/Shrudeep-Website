import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { site } from "@/lib/config";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: `Admin Login | ${site.name}`,
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-lg font-bold text-white">
              {site.name.charAt(0)}
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">{site.name}</p>
              <p className="text-xs text-slate-500">Admin Dashboard</p>
            </div>
          </div>
          <h1 className="text-xl font-bold text-slate-900">Sign in</h1>
          <p className="mt-1 text-sm text-slate-500">
            Authorized access only.
          </p>
          <LoginForm />
        </div>
        <p className="mt-4 text-center text-xs text-slate-400">
          <Link href="/" className="hover:text-slate-600">
            ← Back to website
          </Link>
        </p>
      </div>
    </main>
  );
}
