"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";

const initialState: LoginState = {};

const inputClasses =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      {state.error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-800"
        >
          {state.error}
        </div>
      )}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-800">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-800">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClasses}
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
