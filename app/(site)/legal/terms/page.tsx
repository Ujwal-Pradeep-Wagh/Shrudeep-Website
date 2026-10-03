import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Terms & Conditions | ${site.name}`,
  description: `Terms governing the use of the ${site.name} website and the engagement of our software services.`,
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updatedOn="[DATE — SET BEFORE LAUNCH]"
      intro={[
        `These terms govern your use of the ${site.name} website and, where applicable, the engagement of our services. By using this website, you accept these terms.`,
      ]}
      sections={[
        {
          heading: "About this website",
          paragraphs: [
            "This website provides information about our software services and a means to contact us. Content on the website is general information, not professional advice, and does not by itself create any business relationship.",
          ],
        },
        {
          heading: "Enquiries and proposals",
          paragraphs: [
            "Submitting an enquiry does not oblige either party to proceed. Any engagement begins only after a written proposal is issued by us and accepted by you. The proposal — its scope, deliverables, timeline, and payment terms — then governs that engagement, together with these terms.",
          ],
        },
        {
          heading: "Quotes and pricing",
          paragraphs: [
            "Prices are quoted in writing for a defined scope. Changes to scope are discussed and confirmed in writing before additional work is undertaken. Published descriptions of services on this website are indicative and do not constitute a binding offer.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "Unless a written agreement states otherwise, full ownership of custom software deliverables transfers to the client on receipt of final payment. We retain the right to reuse general knowledge, techniques, and non-client-specific components developed during an engagement.",
          ],
        },
        {
          heading: "Acceptable use",
          paragraphs: [
            "You agree not to misuse this website — including attempting unauthorized access, submitting false or malicious information through forms, or interfering with its operation.",
          ],
        },
        {
          heading: "Limitation of liability",
          paragraphs: [
            "The website is provided 'as is'. To the extent permitted by law, we are not liable for indirect or consequential losses arising from use of this website. Liability under any service engagement is limited as stated in the applicable written proposal or agreement.",
          ],
        },
        {
          heading: "Governing law",
          paragraphs: [
            `These terms are governed by the laws of India. Courts at ${site.city}, ${site.region} shall have jurisdiction over disputes arising from these terms, subject to any written agreement stating otherwise.`,
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "Questions about these terms can be sent through the contact details listed on this website.",
          ],
        },
      ]}
    />
  );
}
