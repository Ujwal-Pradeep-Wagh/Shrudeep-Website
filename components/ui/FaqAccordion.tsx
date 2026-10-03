import type { Faq } from "@/lib/content/faqs";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
      {faqs.map((faq) => (
        <details key={faq.question} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
            {faq.question}
            <span className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition-transform group-open:rotate-45">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
