import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { CtaSection } from "@/components/cta/CtaSection";
import { CheckIcon } from "@/components/ui/icons";
import { site } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `About | ${site.name}`,
  description: `${site.name} is a technology services business in ${site.city} helping small and medium businesses modernize, build, and maintain their software. Learn who we are and how we work.`,
  path: "/about",
});

const strengths = [
  {
    title: "Technical capability",
    text: "A B.Tech foundation combined with hands-on, modern full-stack development — web applications, databases, integrations, and cloud deployment.",
  },
  {
    title: "Business understanding",
    text: "We start with your workflow and numbers, not with technology. The software is shaped around how your business actually operates.",
  },
  {
    title: "Direct communication",
    text: "You speak directly with the person doing the work. No account managers, no broken telephone, no waiting for messages to pass through layers.",
  },
  {
    title: "Customized solutions",
    text: "Every business works differently. We don't resell templates — each system is designed for the client it's built for.",
  },
  {
    title: "Long-term support",
    text: "Our business is built around maintenance and ongoing relationships, not one-time projects. When you call next year, we'll be here.",
  },
  {
    title: "Transparent process",
    text: "Written proposals, staged delivery, clear pricing, and honest advice — including telling you when not to build something.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-slate-100 bg-gradient-to-b from-brand-50/60 to-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
              About {site.name}
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              Starting small. Building long-term technology partnerships.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-slate-600">
          <p>
            {site.name} is a technology services business based in {site.city},{" "}
            {site.region}. It is founded and run by a B.Tech graduate, operating
            as a sole proprietorship — and we'd rather be straightforward about
            that than pretend to be a large agency.
          </p>
          <p>
            What that means for you in practice: the person you discuss your
            requirement with is the same person who designs, builds, and
            supports your software. Nothing gets lost between a sales team and a
            development team, because there isn't one.
          </p>
          <p>
            The focus is deliberate and narrow: helping small and medium
            businesses with the three things that matter most in business
            software — <strong className="text-slate-900">modernizing</strong>{" "}
            what's old, <strong className="text-slate-900">building</strong>{" "}
            what's missing, and{" "}
            <strong className="text-slate-900">maintaining</strong> what you
            depend on. We work with businesses in {site.city} in person and with
            clients across India remotely.
          </p>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="What you can count on"
          title="How we work with clients"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {strengths.map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Being a new business, honestly"
            title="Why work with someone who's just starting?"
            lead="A fair question. Here's our honest answer."
          />
          <Card className="bg-brand-50/40">
            <ul className="space-y-4">
              {[
                "Your project gets full attention — it's never one of fifty tickets in a queue.",
                "Pricing reflects a new business building its reputation, not an agency's overhead.",
                "Every client matters enormously to a new business. You'll feel that in responsiveness and care.",
                "You judge us on working software and a transparent process — not on claims and logos.",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand-700" />
                  <span className="text-sm leading-relaxed text-slate-700">{point}</span>
                </li>
              ))}
            </ul>
          </Card>
          <p className="mt-6 text-sm text-slate-500">
            Note: we don't claim years of experience, a large team, or a client
            roster we don't have. What we offer is visible process, honest
            communication, and work you can evaluate at every stage.
          </p>
        </div>
      </Section>

      <CtaSection
        title="Judge us by a conversation, not a brochure."
        lead="Tell us about your requirement. The quality of the questions we ask will tell you more than any About page can."
        primaryLabel="Start a Conversation"
        primaryHref="/contact"
      />
    </>
  );
}
