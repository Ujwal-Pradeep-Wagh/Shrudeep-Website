"use client";

import { useActionState, useRef, useEffect } from "react";
import { addLeadNote, type NoteState } from "../../../actions";

const initialState: NoteState = {};

export function NoteForm({ leadId }: { leadId: string }) {
  const [state, formAction, pending] = useActionState(addLeadNote, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!pending && !state.error) {
      formRef.current?.reset();
    }
  }, [pending, state.error]);

  return (
    <form ref={formRef} action={formAction} className="mt-4 space-y-3">
      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      <input type="hidden" name="leadId" value={leadId} />
      <textarea
        name="content"
        rows={3}
        required
        placeholder="Add a note — call outcome, requirement details, follow-up date…"
        className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
      >
        {pending ? "Adding…" : "Add note"}
      </button>
    </form>
  );
}
