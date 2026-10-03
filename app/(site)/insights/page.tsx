import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { CtaSection } from "@/components/cta/CtaSection";
import { ArrowRightIcon } from "@/components/ui/icons";
import { insights } from "@/lib/content/insights";
import { site } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Insights — Plain-Language Guides for Business Software | ${site.name}`,
  description:
    "Practical, plain-language articles on modernizing old software, choosing custom vs off-the-shelf, and knowing when your systems need attention.",
  path: "/insights",
});

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function InsightsPage() {
  const sorted = [...insights].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <section className="border-b border-slate-100 bg-gradient-to-b from-brand-50/60 to-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Insights</h1>
            <p className="mt-5 text-lg text-slate-600">
              Plain-language guides about business software — written for
              owners, not developers.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((post) => (
            <Card key={post.slug} className="flex flex-col">
              <p className="text-xs text-slate-500">
                {formatDate(post.date)} · {post.readTimeMinutes} min read
              </p>
              <h2 className="mt-2 text-lg font-bold text-slate-900">{post.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {post.excerpt}
              </p>
              <Link
                href={`/insights/${post.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Read article <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <CtaSection
        title="Reading about a problem you have right now?"
        lead="Send us a message — we'll tell you honestly what it would take to fix it."
        primaryLabel="Describe Your Situation"
        primaryHref="/contact"
      />
    </>
  );
}
