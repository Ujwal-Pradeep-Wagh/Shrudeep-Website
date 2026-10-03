import { Container } from "@/components/ui/Container";
import { TrackedCta } from "@/components/ui/TrackedCta";
import { WhatsAppIcon } from "@/components/ui/icons";
import { hasWhatsApp, whatsappLink, PRIMARY_CTA } from "@/lib/config";

export function CtaSection({
  title = "Tell us what you need.",
  lead = "Describe your software problem or requirement in a few lines. We'll respond within 1–2 business days with clear next steps — no obligation.",
  primaryLabel = PRIMARY_CTA.label,
  primaryHref = PRIMARY_CTA.href,
}: {
  title?: string;
  lead?: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="bg-slate-900 py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-slate-300">{lead}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <TrackedCta
              href={primaryHref}
              event="consultation_cta_clicked"
              meta={{ location: "cta-section" }}
              variant="primary"
              size="lg"
            >
              {primaryLabel}
            </TrackedCta>
            {hasWhatsApp() && (
              <TrackedCta
                href={whatsappLink("Hi, I'd like to discuss a software requirement.")}
                event="whatsapp_clicked"
                meta={{ location: "cta-section" }}
                variant="whatsapp"
                size="lg"
                external
              >
                <WhatsAppIcon className="h-5 w-5" />
                Chat on WhatsApp
              </TrackedCta>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
