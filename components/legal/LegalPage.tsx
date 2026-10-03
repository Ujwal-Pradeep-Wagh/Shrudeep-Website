import { Container } from "@/components/ui/Container";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export function LegalPage({
  title,
  updatedOn,
  intro,
  sections,
}: {
  title: string;
  updatedOn: string;
  intro: string[];
  sections: LegalSection[];
}) {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-slate-900">{title}</h1>
          <p className="mt-3 text-sm text-slate-500">Last updated: {updatedOn}</p>

          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            This is a template and should be reviewed by an appropriate legal
            professional before publication.
          </div>

          <div className="mt-8 space-y-8">
            {intro.map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-slate-600">
                {paragraph}
              </p>
            ))}
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="mb-3 text-xl font-bold text-slate-900">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index} className="mb-3 leading-relaxed text-slate-600 last:mb-0">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="list-disc space-y-1.5 pl-6 text-slate-600">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
