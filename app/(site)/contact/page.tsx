import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/forms/ContactForm";
import { TrackedCta } from "@/components/ui/TrackedCta";
import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import {
  site,
  hasEmail,
  hasPhone,
  hasWhatsApp,
  whatsappLink,
  phoneHref,
  emailHref,
} from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Contact Us — Book a Free Consultation | ${site.name}`,
  description: `Tell us about your software requirement. Contact ${site.name} in ${site.city} by form, WhatsApp, phone, or email. We respond within 1–2 business days.`,
  path: "/contact",
});

type PageProps = {
  searchParams: Promise<{ service?: string; intent?: string }>;
};

export default async function ContactPage({ searchParams }: PageProps) {
  const { service, intent } = await searchParams;
  const source = intent
    ? `website-${intent}`
    : "website-contact";

  const heading =
    intent === "quote"
      ? "Request a Quote"
      : intent === "consultation"
        ? "Book a Free Consultation"
        : "Tell Us What You Need";

  return (
    <section className="bg-gradient-to-b from-brand-50/60 to-white py-14 sm:py-20">
      <Container>
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">{heading}</h1>
          <p className="mt-4 text-lg text-slate-600">
            Describe your requirement in a few lines. We typically respond
            within 1–2 business days with clear next steps.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.4fr]">
          {/* Contact channels */}
          <div className="space-y-4">
            {hasWhatsApp() && (
              <Card className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-green-50">
                  <WhatsAppIcon className="h-5 w-5 text-whatsapp" />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-slate-900">WhatsApp</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Fastest way to reach us — usually a same-day reply.
                  </p>
                  <TrackedCta
                    href={whatsappLink("Hi, I'd like to discuss a software requirement.")}
                    event="whatsapp_clicked"
                    meta={{ location: "contact-page" }}
                    variant="whatsapp"
                    size="sm"
                    className="mt-3"
                    external
                  >
                    Chat on WhatsApp
                  </TrackedCta>
                </div>
              </Card>
            )}

            {hasPhone() && (
              <Card className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                  <PhoneIcon className="h-5 w-5 text-brand-700" />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Phone</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Prefer to talk it through? Call us during business hours.
                  </p>
                  <TrackedCta
                    href={phoneHref()}
                    event="phone_clicked"
                    meta={{ location: "contact-page" }}
                    variant="ghost"
                    size="sm"
                    className="mt-2 px-0"
                  >
                    {site.phone}
                  </TrackedCta>
                </div>
              </Card>
            )}

            {hasEmail() && (
              <Card className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                  <MailIcon className="h-5 w-5 text-brand-700" />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Email</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Send details, documents, or RFPs.
                  </p>
                  <TrackedCta
                    href={emailHref("Software enquiry")}
                    event="email_clicked"
                    meta={{ location: "contact-page" }}
                    variant="ghost"
                    size="sm"
                    className="mt-2 px-0"
                  >
                    {site.email}
                  </TrackedCta>
                </div>
              </Card>
            )}

            <Card className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                <MapPinIcon className="h-5 w-5 text-brand-700" />
              </span>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Location</h2>
                <p className="mt-1 text-sm text-slate-600">
                  {site.city}, {site.region}, {site.country}
                </p>
                <p className="mt-1 text-sm text-slate-500">{site.serviceArea}</p>
              </div>
            </Card>

            {!hasWhatsApp() && !hasPhone() && !hasEmail() && (
              <Card className="border-amber-200 bg-amber-50">
                <p className="text-sm text-amber-900">
                  <strong>Setup note:</strong> direct contact channels (WhatsApp,
                  phone, email) are configured via environment variables. The
                  form on this page works regardless.
                </p>
              </Card>
            )}
          </div>

          {/* Enquiry form */}
          <Card className="p-6 sm:p-8">
            <ContactForm defaultService={service} source={source} />
          </Card>
        </div>
      </Container>
    </section>
  );
}
