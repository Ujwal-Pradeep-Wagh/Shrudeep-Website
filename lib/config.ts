// ─────────────────────────────────────────────────────────────────────────────
// CENTRAL BUSINESS CONFIGURATION
// Edit this file (and .env) to update business information across the ENTIRE
// website — no need to touch individual pages or components.
// Values marked [PLACEHOLDER — REPLACE BEFORE LAUNCH] must be set before go-live.
// ─────────────────────────────────────────────────────────────────────────────

const env = (key: string): string => process.env[key]?.trim() ?? "";

export const site = {
  // TEMPORARY TEXT-BASED BRAND IDENTITY [PLACEHOLDER — REPLACE BEFORE LAUNCH]
  // Replace with your registered business / proprietorship name. Used everywhere.
  name: "Vertex Digital",
  tagline: "Modernize. Build. Maintain.",
  positioning: "Practical software solutions for growing businesses.",

  description:
    "Vertex Digital helps businesses in Pune and across India modernize old software, build custom business software, and keep systems running reliably with ongoing maintenance and support.",

  // Contact details — pulled from environment so they can differ per deployment.
  // [PLACEHOLDER — REPLACE BEFORE LAUNCH] set in .env / hosting env vars.
  email: env("NEXT_PUBLIC_BUSINESS_EMAIL"),
  phone: env("NEXT_PUBLIC_BUSINESS_PHONE"),
  whatsappNumber: env("NEXT_PUBLIC_WHATSAPP_NUMBER"), // digits only, intl format

  // Location. Locality only — do not add a street address unless a real office exists.
  city: "Pune",
  region: "Maharashtra",
  country: "India",
  serviceArea:
    "Serving businesses in Pune and working with clients remotely across India.",

  url: env("NEXT_PUBLIC_SITE_URL") || "http://localhost:3000",

  // Social profiles [PLACEHOLDER — REPLACE BEFORE LAUNCH] leave empty until real.
  social: {
    linkedin: "",
    instagram: "",
    facebook: "",
    youtube: "",
    googleBusiness: "",
  },

  analyticsEnabled: env("NEXT_PUBLIC_ANALYTICS_ENABLED") !== "false",
} as const;

export function hasPhone(): boolean {
  return site.phone.length > 0;
}
export function hasEmail(): boolean {
  return site.email.length > 0;
}
export function hasWhatsApp(): boolean {
  return site.whatsappNumber.length > 0;
}

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function phoneHref(): string {
  return `tel:${site.phone.replace(/[^+\d]/g, "")}`;
}

export function emailHref(subject?: string): string {
  const base = `mailto:${site.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}

export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "proposal-sent",
  "negotiation",
  "won",
  "lost",
  "follow-up",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  "proposal-sent": "Proposal Sent",
  negotiation: "Negotiation",
  won: "Won",
  lost: "Lost",
  "follow-up": "Follow-up",
};

export const SERVICE_OPTIONS = [
  "Website",
  "Custom Software",
  "ERP",
  "Billing Software",
  "Software Modernization",
  "Software Maintenance",
  "Automation",
  "Other",
] as const;

export const PRIMARY_CTA = {
  label: "Book a Free Consultation",
  href: "/contact?intent=consultation",
} as const;

export const SECONDARY_CTA = {
  label: "Tell Us About Your Project",
  href: "/contact",
} as const;
