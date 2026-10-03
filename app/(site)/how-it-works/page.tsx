import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { CtaSection } from "@/components/cta/CtaSection";
import { site } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `How It Works — Our Process | ${site.name}`,
  description:
    "From your first enquiry to long-term maintenance: a clear, transparent process for software projects. Discovery, proposal, staged delivery, and ongoing support.",
  path: "/how-it-works",
});

const steps = [
  {
    title: "Tell us your problem",
    text: "Use the contact form or WhatsApp. Describe the business problem in your own words — no technical language needed. What's slow, manual, broken, or missing?",
  },
  {
    title: "Discovery call",
    text: "A 30–45 minute conversation (or a visit, for Pune businesses) to understand your requirement, your current systems, and how your team actually works.",
  },
  {
    title: "Assessment",
    text: "For modernization and maintenance work, we review your existing software, database, and hosting. For new builds, we map your workflow. Either way, you get an honest picture — including when the right answer is 'don't build this'.",
  },
  {
    title: "Written proposal",
    text: "A plain-language proposal covering scope, deliverables, timeline, payment structure, and what's explicitly out of scope. No vague estimates, no surprise additions later.",
  },
  {
    title: "Development / modernization",
    text: "Work happens in stages. You see working software early, give feedback, and approve each stage before we continue. Daily business is never interrupted.",
  },
  {
    title: "Testing & deployment",
    text: "We test with real scenarios and — where possible — your actual data before go-live. Deployment is planned around your business hours, with a rollback plan.",
  },
  {
    title: "Support & maintenance",
    text: "Every project includes a post-launch support period. Most clients continue with a monthly or annual plan covering fixes, updates, backups, and improvements.",
  },
];

const journeyPoints = [
  "Enquiry",
  "Discovery call",
  "Requirement gathering",
  "Technical assessment",
  "Proposal",
  "Agreement & advance",
  "Development",
  "Testing",
  "Deployment",
  "Handover",
  "Maintenance",
  "Long-term partnership",
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="border-b border-slate-100 bg-gradient-to-b from-brand-50/60 to-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
              How It Works
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              A clear process from first message to long-term support. You
              always know what's happening, what it costs, and what comes next.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <ol className="mx-auto max-w-3xl space-y-0">
          {steps.map((step, index) => (
            <li key={step.title} className="relative flex gap-6 pb-10 last:pb-0">
              {index < steps.length - 1 && (
                <span
                  className="absolute top-12 left-5 h-[calc(100%-3rem)] w-px bg-brand-200"
                  aria-hidden="true"
                />
              )}
              <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
                {index + 1}
              </span>
              <div className="pt-1.5">
                <h2 className="text-lg font-bold text-slate-900">{step.title}</h2>
                <p className="mt-2 leading-relaxed text-slate-600">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="The full journey"
          title="From enquiry to long-term partnership"
          lead="Software is a relationship, not a transaction. Here's the complete path a typical engagement follows."
        />
        <Card className="mx-auto max-w-4xl">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
            {journeyPoints.map((point, index) => (
              <li key={point} className="flex items-center gap-2">
                <span
                  className={
                    index === journeyPoints.length - 1
                      ? "rounded-full bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white"
                      : "rounded-full bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-900"
                  }
                >
                  {point}
                </span>
                {index < journeyPoints.length - 1 && (
                  <span className="text-slate-300" aria-hidden="true">→</span>
                )}
              </li>
            ))}
          </ol>
        </Card>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="What we promise"
            title="Working agreements you can hold us to"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                title: "Written everything",
                text: "Scope, pricing, timeline, and changes are always in writing. If it's not written, it doesn't exist.",
              },
              {
                title: "Staged payments",
                text: "Payments are tied to milestones you can see and approve — never one large advance.",
              },
              {
                title: "You own the code",
                text: "Full source code, documentation, and credentials are handed over on completion. No lock-in.",
              },
              {
                title: "Honest advice",
                text: "If buying an existing product serves you better than custom software, we'll say so — even though it costs us a project.",
              },
            ].map((item) => (
              <Card key={item.title}>
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <CtaSection
        title="Start with step one — it takes two minutes."
        primaryLabel="Tell Us Your Problem"
        primaryHref="/contact"
      />
    </>
  );
}
