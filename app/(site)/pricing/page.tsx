import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { CtaSection } from "@/components/cta/CtaSection";
import { TrackedCta } from "@/components/ui/TrackedCta";
import { CheckIcon } from "@/components/ui/icons";
import { site } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

// ── PRICING PHILOSOPHY ───────────────────────────────────────────────────────
// Actual prices are deliberately not published. When you're ready to publish
// starting prices, edit the `priceHint` fields below — nothing else changes.
// ─────────────────────────────────────────────────────────────────────────────

const pricingCategories = [
  {
    name: "Starter Websites",
    priceHint: "", // e.g. "Starting ₹XX,XXX" — set when ready
    description:
      "For businesses that need a professional online presence that builds trust and brings enquiries.",
    includes: [
      "Business, service, or portfolio website",
      "Mobile-first, fast-loading design",
      "Contact/enquiry forms with WhatsApp integration",
      "Basic on-page SEO and Google Business Profile guidance",
      "Content guidance and launch support",
    ],
  },
  {
    name: "Custom Business Software",
    priceHint: "",
    description:
      "Billing systems, inventory, CRM, dashboards, and internal tools — priced by scope, defined in a written proposal before work begins.",
    includes: [
      "Requirement mapping and written proposal",
      "Staged delivery with your feedback at each stage",
      "Data import from Excel or existing software",
      "Staff training and documentation",
      "Post-launch support period included",
    ],
  },
  {
    name: "Modernization Projects",
    priceHint: "",
    description:
      "Priced after an assessment of your existing system — its technology, data, and the improvements you need.",
    includes: [
      "Fixed-fee assessment with written report",
      "Phased plan — improve, migrate, or rebuild",
      "Data migration with verification and rollback safety",
      "Performance, security, and integration upgrades",
      "Handover documentation",
    ],
  },
  {
    name: "Maintenance & Support",
    priceHint: "",
    description:
      "Predictable monthly or annual plans so software problems never become business emergencies.",
    includes: [
      "Defined monthly support hours",
      "Response-time commitment for critical issues",
      "Security updates and dependency patches",
      "Automated, tested backups",
      "Monthly summary of work and system health",
    ],
  },
];

export const metadata: Metadata = buildMetadata({
  title: `Pricing Philosophy | ${site.name}`,
  description:
    "How we price websites, custom software, modernization, and maintenance — transparent, written, and tied to scope. Request a quote for your requirement.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-slate-100 bg-gradient-to-b from-brand-50/60 to-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
              Honest, Written Pricing
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              We don't publish one-size-fits-all price lists, because software
              pricing without understanding your requirement would be a guess.
              What we do guarantee: a written scope and price before any work
              begins, and no surprise additions later.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {pricingCategories.map((category) => (
            <Card key={category.name} className="flex flex-col p-8">
              <h2 className="text-xl font-bold text-slate-900">{category.name}</h2>
              {category.priceHint && (
                <p className="mt-1 text-lg font-semibold text-brand-700">
                  {category.priceHint}
                </p>
              )}
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                {category.description}
              </p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {category.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    <span className="text-sm text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="How quoting works"
            title="Three steps to a firm price"
          />
          <ol className="space-y-6">
            {[
              {
                title: "You describe the requirement",
                text: "Through the contact form, WhatsApp, or a call — in your own words.",
              },
              {
                title: "We ask questions and (if needed) assess",
                text: "For existing systems, a fixed-fee assessment may come first — its cost is adjusted into the project if you proceed.",
              },
              {
                title: "You get a written proposal",
                text: "Scope, deliverables, timeline, payment milestones, and a firm price for the agreed scope. Take your time deciding.",
              },
            ].map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedCta
              href="/contact?intent=quote"
              event="consultation_cta_clicked"
              meta={{ location: "pricing" }}
              size="lg"
            >
              Request a Quote
            </TrackedCta>
            <TrackedCta
              href="/contact?intent=consultation"
              event="consultation_cta_clicked"
              meta={{ location: "pricing-secondary" }}
              variant="secondary"
              size="lg"
            >
              Book a Consultation
            </TrackedCta>
          </div>
        </div>
      </Section>

      <CtaSection
        title="Get a price you can actually plan around."
        lead="Describe your requirement — you'll receive a written proposal with scope, timeline, and a firm price."
        primaryLabel="Request a Quote"
        primaryHref="/contact?intent=quote"
      />
    </>
  );
}
