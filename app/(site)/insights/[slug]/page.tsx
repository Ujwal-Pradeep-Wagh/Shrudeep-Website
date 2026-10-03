import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CtaSection } from "@/components/cta/CtaSection";
import { insights, getInsight } from "@/lib/content/insights";
import { buildMetadata, breadcrumbJsonLd, JsonLd } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${post.slug}`,
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  const others = insights.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: post.title, path: `/insights/${post.slug}` },
        ])}
      />
      <article className="py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
              <Link href="/insights" className="hover:text-brand-700">
                ← All insights
              </Link>
            </nav>
            <p className="text-sm text-slate-500">
              {formatDate(post.date)} · {post.readTimeMinutes} min read
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              {post.title}
            </h1>

            <div className="mt-8 space-y-8">
              {post.sections.map((section, index) => (
                <section key={index}>
                  {section.heading && (
                    <h2 className="mb-3 text-xl font-bold text-slate-900">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="mb-4 leading-relaxed text-slate-600 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="list-disc space-y-2 pl-6 text-slate-600">
                      {section.list.map((item) => (
                        <li key={item} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {others.length > 0 && (
              <div className="mt-14 border-t border-slate-200 pt-8">
                <h2 className="text-lg font-bold text-slate-900">Keep reading</h2>
                <ul className="mt-4 space-y-3">
                  {others.map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/insights/${other.slug}`}
                        className="font-medium text-brand-700 hover:text-brand-800"
                      >
                        {other.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Container>
      </article>

      <CtaSection
        title={`Facing this in your business?`}
        lead="Tell us what's happening with your software — we'll give you an honest read on your options."
        primaryLabel="Talk to Us"
        primaryHref="/contact"
      />
    </>
  );
}
