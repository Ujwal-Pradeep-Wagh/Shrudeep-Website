import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Privacy Policy | ${site.name}`,
  description: `How ${site.name} collects, uses, and protects information submitted through this website.`,
  path: "/legal/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updatedOn="[DATE — SET BEFORE LAUNCH]"
      intro={[
        `${site.name} ("we", "us", "our") operates this website. This policy explains what information we collect through the website, why we collect it, and how it is handled.`,
        `By using this website or submitting an enquiry, you agree to the practices described here.`,
      ]}
      sections={[
        {
          heading: "Information we collect",
          paragraphs: [
            "When you submit the contact or enquiry form, we collect the information you provide, which may include:",
          ],
          list: [
            "Your name and business name",
            "Contact details: phone number, email address, city",
            "The service you are interested in and details of your requirement",
            "Information about your current software or systems, if you share it",
          ],
        },
        {
          heading: "Automatically collected information",
          paragraphs: [
            "We record privacy-conscious usage events (such as page views and button clicks) to understand how the website is used and to improve it. This data is stored on our own systems, is not sold, and is not used to build advertising profiles. We do not use third-party advertising trackers.",
          ],
        },
        {
          heading: "How we use your information",
          paragraphs: [],
          list: [
            "To respond to your enquiry and communicate with you about it",
            "To prepare proposals and deliver services you request",
            "To maintain records of our business communications",
            "To improve the website and our services",
          ],
        },
        {
          heading: "What we do not do",
          paragraphs: [],
          list: [
            "We do not sell your personal information to anyone",
            "We do not share your details with third parties except as needed to deliver a service you requested (for example, email delivery providers)",
            "We do not send marketing communications without your consent",
          ],
        },
        {
          heading: "Data retention and security",
          paragraphs: [
            "Enquiry records are retained while they are relevant to an active or potential business relationship, after which they may be deleted or anonymized. We apply reasonable technical and organizational measures — including access control and encrypted connections — to protect the information we hold.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You may ask us at any time to confirm what information we hold about you, to correct it, or to delete it where there is no ongoing business need to retain it. Contact us using the details on our contact page.",
          ],
        },
        {
          heading: "Changes to this policy",
          paragraphs: [
            "We may update this policy from time to time. The current version will always be available on this page with its last-updated date.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            `For any privacy-related question, contact us through the details listed on the contact page. ${site.name} is based in ${site.city}, ${site.region}, ${site.country}.`,
          ],
        },
      ]}
    />
  );
}
