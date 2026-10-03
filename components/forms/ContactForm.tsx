"use client";

import { useRef, useState } from "react";
import { SERVICE_OPTIONS, hasWhatsApp, whatsappLink } from "@/lib/config";
import { track } from "@/components/analytics/track";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<string, string>>;

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; id: string }
  | { status: "error"; message: string };

const inputClasses =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20";

const labelClasses = "mb-1.5 block text-sm font-medium text-slate-800";

export function ContactForm({
  defaultService,
  source = "website-contact",
}: {
  defaultService?: string;
  source?: string;
}) {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [service, setService] = useState(
    defaultService && (SERVICE_OPTIONS as readonly string[]).includes(defaultService)
      ? defaultService
      : ""
  );
  const startedRef = useRef(false);

  function markStarted() {
    if (!startedRef.current) {
      startedRef.current = true;
      track("contact_form_started");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "submitting" });
    setFieldErrors({});

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await response.json()) as {
        ok: boolean;
        id?: string;
        error?: string;
        fieldErrors?: FieldErrors;
      };

      if (response.ok && body.ok) {
        track("contact_form_submitted", { service: service || "unspecified" });
        setState({ status: "success", id: body.id ?? "" });
        return;
      }

      if (body.fieldErrors) setFieldErrors(body.fieldErrors);
      setState({
        status: "error",
        message:
          body.error ??
          "We couldn't submit your enquiry right now. Please try again or contact us directly on WhatsApp.",
      });
    } catch {
      setState({
        status: "error",
        message:
          "We couldn't submit your enquiry right now. Please check your connection and try again, or contact us directly on WhatsApp.",
      });
    }
  }

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-green-700" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-bold text-slate-900">
          Thank you — your enquiry has been received.
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
          We typically respond within 1–2 business days. If your matter is
          urgent, reach us directly
          {hasWhatsApp() && (
            <>
              {" "}
              on{" "}
              <a
                href={whatsappLink("Hi, I just submitted an enquiry on your website.")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-whatsapp hover:underline"
              >
                WhatsApp
              </a>
            </>
          )}
          .
        </p>
        {state.id && (
          <p className="mt-4 text-xs text-slate-500">
            Reference: <span className="font-mono">{state.id.slice(0, 8)}</span>
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="space-y-5">
      {state.status === "error" && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {state.message}
        </div>
      )}

      {/* Honeypot — invisible to humans, catnip for bots */}
      <div style={{ position: 'absolute', left: '-9999px', width: '0', height: '0', overflow: 'hidden' }} aria-hidden="true">
        <label htmlFor="website_url" style={{ display: 'none' }}>Leave this blank</label>
        <input
          type="text"
          id="website_url"
          name="website_url"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <input type="hidden" name="source" value={source} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Your Name <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClasses}
            onFocus={markStarted}
            placeholder="Full name"
          />
          {fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="businessName" className={labelClasses}>
            Business Name
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            autoComplete="organization"
            className={inputClasses}
            onFocus={markStarted}
            placeholder="Your company or shop name"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone / WhatsApp Number <span className="text-red-600">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={inputClasses}
            onFocus={markStarted}
            placeholder="+91 98XXXXXXXX"
          />
          {fieldErrors.phone && <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputClasses}
            onFocus={markStarted}
            placeholder="you@business.com"
          />
          {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className={labelClasses}>
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            className={inputClasses}
            onFocus={markStarted}
            placeholder="e.g. Pune"
          />
        </div>
        <div>
          <label htmlFor="service" className={labelClasses}>
            What do you need? <span className="text-red-600">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            className={inputClasses}
            value={service}
            onChange={(e) => {
              markStarted();
              setService(e.target.value);
            }}
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {fieldErrors.service && <p className="mt-1 text-xs text-red-600">{fieldErrors.service}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="currentSystem" className={labelClasses}>
            Current Software / System
          </label>
          <input
            id="currentSystem"
            name="currentSystem"
            type="text"
            className={inputClasses}
            onFocus={markStarted}
            placeholder="e.g. Tally, Excel, old billing software"
          />
        </div>
        <div>
          <label htmlFor="requirement" className={labelClasses}>
            Approximate Requirement
          </label>
          <input
            id="requirement"
            name="requirement"
            type="text"
            className={inputClasses}
            onFocus={markStarted}
            placeholder="e.g. billing for 2 counters, 15 staff"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Describe Your Requirement <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClasses}
          onFocus={markStarted}
          placeholder="What problem are you trying to solve? How is this work done today?"
        />
        {fieldErrors.message && <p className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>}
      </div>

      <fieldset>
        <legend className={labelClasses}>Preferred way to reach you</legend>
        <div className="flex flex-wrap gap-4">
          {[
            { value: "whatsapp", label: "WhatsApp" },
            { value: "phone", label: "Phone call" },
            { value: "email", label: "Email" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="preferredContact"
                value={option.value}
                className="h-4 w-4 border-slate-300 text-brand-700 focus:ring-brand-600"
                onChange={markStarted}
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={state.status === "submitting"}
        className={cn(buttonClasses({ size: "lg" }), "w-full")}
      >
        {state.status === "submitting" ? "Sending…" : "Send Enquiry"}
      </button>

      <p className="text-center text-xs text-slate-500">
        By submitting, you agree to be contacted about your enquiry. We never
        share your details. See our privacy policy for details.
      </p>
    </form>
  );
}
