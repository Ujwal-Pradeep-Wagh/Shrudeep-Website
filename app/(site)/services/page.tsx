import Link from "next/link";
import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { CtaSection } from "@/components/cta/CtaSection";
import { ArrowRightIcon } from "@/components/ui/icons";
import { services } from "@/lib/content/services";
import { site } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Software Services — Modernize, Build, Maintain | ${site.city}`,
  description: `Software modernization, custom software development, and maintenance & support for small and medium businesses in ${site.city} and across India.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-slate-100 bg-gradient-to-b from-brand-50/60 to-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
              Our Services
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              Everything we do fits into three areas: modernizing the software
              you already have, building the software you need, and maintaining
              the software you depend on.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <div className="flex flex-col gap-8">
          {services.map((service, index) => (
            <Card
              key={service.slug}
              className="grid gap-6 p-8 md:grid-cols-[1fr_2fr]"
            >
              <div>
                <p className="text-sm font-semibold tracking-wide text-brand-700 uppercase">
                  {String(index + 1).padStart(2, "0")} — {service.shortName}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {service.name}
                </h2>
                <p className="mt-2 text-base font-medium text-slate-700">
                  {service.headline}
                </p>
              </div>
              <div>
                <p className="leading-relaxed text-slate-600">{service.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.offerings.slice(0, 6).map((offering) => (
                    <li
                      key={offering.title}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {offering.title}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  Explore {service.shortName.toLowerCase()} services
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-14">
          <SectionHeading
            title="Not sure which one you need?"
            lead="Most projects start with a short conversation. Tell us the problem — we'll tell you honestly which service fits, and what it would involve."
          />
        </div>
      </Section>

      <CtaSection
        title="Describe your problem. We'll map it to the right service."
        primaryLabel="Discuss Your Requirement"
        primaryHref="/contact"
      />
    </>
  );
}
