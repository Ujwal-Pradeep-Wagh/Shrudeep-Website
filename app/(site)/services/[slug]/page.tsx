import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { CtaSection } from "@/components/cta/CtaSection";
import { TrackedCta } from "@/components/ui/TrackedCta";
import { CheckIcon, ArrowRightIcon } from "@/components/ui/icons";
import { services, getService } from "@/lib/content/services";
import { site } from "@/lib/config";
import {
  buildMetadata,
  serviceJsonLd,
  breadcrumbJsonLd,
  JsonLd,
} from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.seoTitle} | ${site.name}`,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: service.name,
          description: service.seoDescription,
          path: `/services/${service.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-brand-50/60 to-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
              <Link href="/" className="hover:text-brand-700">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/services" className="hover:text-brand-700">Services</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-700">{service.name}</span>
            </nav>
            <p className="text-sm font-semibold tracking-wide text-brand-700 uppercase">
              {service.name}
            </p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900 sm:text-5xl">
              {service.headline}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              {service.summary}
            </p>
            <div className="mt-8">
              <TrackedCta
                href={`/contact?service=${encodeURIComponent(service.name)}`}
                event="consultation_cta_clicked"
                meta={{ location: `service-${service.slug}` }}
                size="lg"
              >
                {service.cta}
              </TrackedCta>
            </div>
          </div>
        </Container>
      </section>

      {/* Problems */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Sound familiar?"
              title="Problems this solves"
              className="mb-8"
            />
            <ul className="space-y-3.5">
              {service.problems.map((problem) => (
                <li
                  key={problem}
                  className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50">
                    <CheckIcon className="h-3.5 w-3.5 text-brand-700" />
                  </span>
                  <span className="text-sm leading-relaxed text-slate-700">{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Who this is for"
              title="You probably need this if…"
              className="mb-8"
            />
            <Card className="bg-brand-50/50">
              <ul className="space-y-3">
                {service.whoNeedsIt.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand-600" />
                    <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <h3 className="mt-10 mb-4 text-lg font-bold text-slate-900">
              What you get
            </h3>
            <Card>
              <ul className="space-y-3">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand-600" />
                    <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Section>

      {/* Offerings */}
      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="What's included"
          title={`${service.name} — what we do`}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {service.offerings.map((offering) => (
            <Card key={offering.title}>
              <h3 className="text-base font-semibold text-slate-900">
                {offering.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {offering.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeading eyebrow="How it works" title="What to expect" />
        <ol className="mx-auto max-w-3xl space-y-6">
          {service.process.map((step, index) => (
            <li key={step.step} className="flex gap-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
                {index + 1}
              </span>
              <div>
                <h3 className="text-base font-semibold text-slate-900">{step.step}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Other services */}
      <Section className="bg-slate-50">
        <SectionHeading title="Explore our other services" />
        <div className="grid gap-6 md:grid-cols-2">
          {otherServices.map((other) => (
            <Card key={other.slug}>
              <p className="text-sm font-semibold tracking-wide text-brand-700 uppercase">
                {other.shortName}
              </p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">{other.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{other.headline}</p>
              <Link
                href={`/services/${other.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Learn more <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <CtaSection
        title={service.cta}
        lead="Tell us about your current system or requirement. We'll respond with honest, practical next steps."
        primaryLabel={service.cta}
        primaryHref={`/contact?service=${encodeURIComponent(service.name)}`}
      />
    </>
  );
}
