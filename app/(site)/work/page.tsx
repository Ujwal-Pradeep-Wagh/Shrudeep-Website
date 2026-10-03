import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card, Badge } from "@/components/ui/Card";
import { CtaSection } from "@/components/cta/CtaSection";
import { CheckIcon } from "@/components/ui/icons";
import { sampleProjects } from "@/lib/content/samples";
import { site } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Sample Solutions & Demos | ${site.name}`,
  description:
    "Concept demonstrations of the business software we design and build: billing, inventory, clinic appointments, institute management, distributor systems, and ERP dashboards.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <section className="border-b border-slate-100 bg-gradient-to-b from-brand-50/60 to-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
              Sample Solutions
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              We're a new business, so instead of inventing client stories, we
              show you working concepts. Each demo below represents the kind of
              system we design and build — with real client case studies to be
              added as projects are completed.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <div className="space-y-10">
          {sampleProjects.map((project) => (
            <Card key={project.slug} id={project.slug} className="scroll-mt-24 p-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="brand">{project.industry}</Badge>
                {project.kind === "demo" ? (
                  <Badge tone="amber">Demo concept — not a client project</Badge>
                ) : (
                  <Badge>Client project</Badge>
                )}
              </div>
              <h2 className="mt-4 text-2xl font-bold text-slate-900">
                {project.title}
              </h2>

              <div className="mt-6 grid gap-8 lg:grid-cols-2">
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
                      The problem
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {project.problem}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
                      The solution
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {project.solution}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
                      Outcome
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {project.outcome}
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
                      Key features
                    </h3>
                    <ul className="mt-2 space-y-2">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                          <span className="text-sm text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
                      Technology approach
                    </h3>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {project.technology.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-2xl text-center">
          <SectionHeading
            title="Want to see one of these live?"
            lead="Ask for a walkthrough during your consultation — or tell us about your own requirement and we'll sketch what a system for your business would look like."
          />
        </div>
      </Section>

      <CtaSection
        title="Imagine this built around your business."
        lead="Describe your workflow and current tools. We'll show you what a purpose-built system would look like — with a written scope and price."
        primaryLabel="Discuss Your Requirement"
        primaryHref="/contact"
      />
    </>
  );
}
