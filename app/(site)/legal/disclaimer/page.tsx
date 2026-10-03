import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Disclaimer | ${site.name}`,
  description: `Disclaimer regarding the information presented on the ${site.name} website.`,
  path: "/legal/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      updatedOn="[DATE — SET BEFORE LAUNCH]"
      intro={[
        `The information on this website is published by ${site.name} in good faith and for general informational purposes.`,
      ]}
      sections={[
        {
          heading: "No professional advice",
          paragraphs: [
            "Content on this website — including articles and service descriptions — is general information about software and business technology. It is not legal, financial, or professional advice, and should not be relied on as such.",
          ],
        },
        {
          heading: "Sample and demonstration projects",
          paragraphs: [
            "Items shown under 'Sample Solutions' or similar sections are concept demonstrations of the kind of systems we design and build. They are clearly labelled as demo concepts and are not client projects, case studies, or claims of past delivery.",
          ],
        },
        {
          heading: "No guarantees of outcomes",
          paragraphs: [
            "We do not guarantee specific business outcomes — such as revenue growth, cost savings, or efficiency gains — from the use of our services or from information on this website. Results depend on factors outside our control, including how systems are adopted and used.",
          ],
        },
        {
          heading: "Accuracy of information",
          paragraphs: [
            "We work to keep website content accurate and current, but make no representation that all content is complete or error-free. Service details, processes, and availability may change without notice.",
          ],
        },
        {
          heading: "External links",
          paragraphs: [
            "If this website links to external sites, those sites are not under our control and we are not responsible for their content or practices.",
          ],
        },
      ]}
    />
  );
}
