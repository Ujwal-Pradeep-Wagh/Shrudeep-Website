import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { CtaSection } from "@/components/cta/CtaSection";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { faqs } from "@/lib/content/faqs";
import { site } from "@/lib/config";
import { buildMetadata, faqJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Frequently Asked Questions | ${site.name}`,
  description:
    "Answers about cost, timelines, modernizing existing software, maintenance, working remotely, and how to start a project with us.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <section className="border-b border-slate-100 bg-gradient-to-b from-brand-50/60 to-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              Straight answers to the questions business owners ask us most.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <FaqAccordion faqs={faqs} />
        </div>
        <div className="mx-auto mt-14 max-w-2xl">
          <SectionHeading
            title="Have a question that's not listed?"
            lead="Ask us directly — a short message is enough, and you'll get a straight answer."
          />
        </div>
      </Section>

      <CtaSection
        title="Ask your question directly."
        primaryLabel="Contact Us"
        primaryHref="/contact"
      />
    </>
  );
}
