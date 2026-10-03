import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { CtaSection } from "@/components/cta/CtaSection";
import { CheckIcon } from "@/components/ui/icons";
import { industries } from "@/lib/content/industries";
import { site } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Industries We Serve | Software Services in ${site.city}`,
  description:
    "Examples of businesses we can help: retail, manufacturing, distribution, healthcare, education, hospitality, logistics, real estate, professional services, and startups.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <section className="border-b border-slate-100 bg-gradient-to-b from-brand-50/60 to-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
              Businesses We Can Help
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              We work with small and medium businesses across many industries.
              These are examples, not limits — what matters is whether your
              business has a software problem worth solving.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Card key={industry.slug}>
              <h2 className="text-xl font-bold text-slate-900">{industry.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{industry.examples}</p>
              <p className="mt-4 text-xs font-semibold tracking-wide text-slate-400 uppercase">
                Typical needs
              </p>
              <ul className="mt-2 space-y-2">
                {industry.typicalNeeds.map((need) => (
                  <li key={need} className="flex items-start gap-2.5">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    <span className="text-sm text-slate-600">{need}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-2xl text-center">
          <SectionHeading
            title="Don't see your industry?"
            lead="If your business runs on software, spreadsheets, or paper — and something about that isn't working — the conversation is worth having."
          />
        </div>
      </Section>

      <CtaSection
        title="Tell us how your business works today."
        lead="A short conversation about your current process is enough for us to say honestly whether and how we can help."
        primaryLabel="Describe Your Business Problem"
        primaryHref="/contact"
      />
    </>
  );
}
