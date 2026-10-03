import Link from "next/link";
import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card, Badge } from "@/components/ui/Card";
import { TrackedCta } from "@/components/ui/TrackedCta";
import { CtaSection } from "@/components/cta/CtaSection";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import {
  ArrowRightIcon,
  CheckIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import {
  site,
  PRIMARY_CTA,
  SECONDARY_CTA,
  hasWhatsApp,
  whatsappLink,
} from "@/lib/config";
import { services } from "@/lib/content/services";
import { industries } from "@/lib/content/industries";
import { sampleProjects } from "@/lib/content/samples";
import { faqs } from "@/lib/content/faqs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${site.tagline} — Software Services for Businesses in ${site.city}`,
  description: site.description,
  path: "/",
});

const trustMarkers = [
  "You talk directly with the person building your software",
  "Written scope, timeline, and price before any work begins",
  "Full source code handed over to you — no lock-in",
];

const painPoints = [
  {
    pain: "“Our software is too old, and the developer is gone.”",
    fix: "We take over, document, and modernize existing systems — even ones we didn't build.",
  },
  {
    pain: "“Half our work still happens in Excel and on paper.”",
    fix: "We build connected systems that replace scattered spreadsheets and registers.",
  },
  {
    pain: "“Ready-made software doesn't match how we work.”",
    fix: "We build software around your workflow, invoice format, and reports — not the other way around.",
  },
  {
    pain: "“When something breaks, there's nobody to call.”",
    fix: "Our maintenance plans give you one accountable contact with defined response times.",
  },
];

const workSteps = [
  {
    step: "1",
    title: "Tell us your problem",
    text: "A short form or WhatsApp message is enough to start.",
  },
  {
    step: "2",
    title: "Discovery call",
    text: "We understand your requirement and current systems.",
  },
  {
    step: "3",
    title: "Written proposal",
    text: "Scope, timeline, deliverables, and price — in plain language.",
  },
  {
    step: "4",
    title: "Build & review",
    text: "You see working progress in stages and give feedback.",
  },
  {
    step: "5",
    title: "Launch & support",
    text: "Deployment, training, and ongoing maintenance.",
  },
];

const whyUs = [
  {
    title: "Business language, not tech jargon",
    text: "We explain everything in terms of your operations, cost, and time — not frameworks and buzzwords.",
  },
  {
    title: "Transparent process",
    text: "Written proposals, staged delivery, and regular updates. You always know what's happening and what it costs.",
  },
  {
    title: "Built for the long term",
    text: "We structure every engagement so we can maintain what we build. Our business model is long-term support, not one-time projects.",
  },
  {
    title: "No lock-in",
    text: "Source code, documentation, and credentials are handed over to you. You own your software outright.",
  },
];

export default function HomePage() {
  const demos = sampleProjects.slice(0, 3);
  const homeFaqs = faqs.slice(0, 5);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-brand-50/60 to-white">
        <Container className="py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-block rounded-full border border-brand-200 bg-white px-4 py-1.5 text-sm font-medium text-brand-800">
              Software services for businesses in {site.city} & across India
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Modernize. Build. Maintain.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl">
              We improve old business software, build new systems around the way
              you actually work, and keep everything running reliably — so
              technology stops being a problem and starts being an advantage.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <TrackedCta
                href={PRIMARY_CTA.href}
                event="consultation_cta_clicked"
                meta={{ location: "hero" }}
                size="lg"
              >
                {PRIMARY_CTA.label}
              </TrackedCta>
              <TrackedCta
                href={SECONDARY_CTA.href}
                event="consultation_cta_clicked"
                meta={{ location: "hero-secondary" }}
                variant="secondary"
                size="lg"
              >
                {SECONDARY_CTA.label}
              </TrackedCta>
              {hasWhatsApp() && (
                <TrackedCta
                  href={whatsappLink("Hi, I'd like to discuss a software requirement.")}
                  event="whatsapp_clicked"
                  meta={{ location: "hero" }}
                  variant="whatsapp"
                  size="lg"
                  external
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp
                </TrackedCta>
              )}
            </div>
            <ul className="mx-auto mt-10 flex max-w-2xl flex-col items-start gap-2.5 text-left sm:items-center">
              {trustMarkers.map((marker) => (
                <li key={marker} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  {marker}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Three core services */}
      <Section>
        <SectionHeading
          eyebrow="What we do"
          title="Three ways we help your business"
          lead="Every engagement falls into one of three areas — often a combination, starting wherever your problem is today."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.slug} className="flex flex-col">
              <p className="text-sm font-semibold tracking-wide text-brand-700 uppercase">
                {service.shortName}
              </p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">
                {service.name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {service.summary.split(".")[0]}.
              </p>
              <Link
                href={`/services/${service.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Learn more <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* Common problems */}
      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="Does this sound familiar?"
          title="Problems we solve every day"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {painPoints.map((item) => (
            <Card key={item.pain}>
              <p className="text-base font-semibold text-slate-900">{item.pain}</p>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{item.fix}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Who we help */}
      <Section>
        <SectionHeading
          eyebrow="Who we work with"
          title="Built for small and medium businesses"
          lead="Examples of businesses we can help — if your work runs on software (or should), we can probably help you too."
        />
        <div className="flex flex-wrap justify-center gap-3">
          {industries.map((industry) => (
            <span
              key={industry.slug}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
            >
              {industry.name}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-slate-600">
          Retail shops, distributors, manufacturers, clinics, coaching classes,
          service businesses — anyone modernizing old software, replacing manual
          work, or needing systems that fit their process.
        </p>
        <div className="mt-6 text-center">
          <Link
            href="/industries"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            See industries we serve <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* How we work */}
      <Section className="bg-brand-950">
        <SectionHeading
          eyebrow={<span className="text-brand-300">How we work</span>}
          title="A clear, predictable process"
          lead="No vague estimates, no disappearing acts. Here's what working with us looks like."
          className="[&>h2]:text-white [&>p:last-child]:text-slate-300"
        />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {workSteps.map((step) => (
            <li key={step.step} className="rounded-xl bg-white/5 p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                {step.step}
              </span>
              <h3 className="mt-4 text-base font-semibold text-white">{step.title}</h3>
              <p className="mt-1.5 text-sm text-slate-300">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 hover:text-brand-200"
          >
            See the full process <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* Sample solutions */}
      <Section>
        <SectionHeading
          eyebrow="Sample solutions"
          title="See what we can build for you"
          lead="Working concept demos that show the kind of systems we design and build."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {demos.map((demo) => (
            <Card key={demo.slug} className="flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <Badge tone="brand">{demo.industry}</Badge>
                <Badge tone="amber">Demo concept</Badge>
              </div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">{demo.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {demo.solution}
              </p>
              <Link
                href={`/work#${demo.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                View details <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            View all sample solutions <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* Why us */}
      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="Why work with us"
          title="Starting small. Building long-term technology partnerships."
          lead="We're a new business — so we earn trust the honest way: clear communication, transparent pricing, and work that speaks for itself."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ preview */}
      <Section>
        <SectionHeading
          eyebrow="Common questions"
          title="Answers, before you even ask"
        />
        <div className="mx-auto max-w-3xl">
          <FaqAccordion faqs={homeFaqs} />
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Read all FAQs <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
