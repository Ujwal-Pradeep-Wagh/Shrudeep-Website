import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { site, hasEmail, hasPhone, emailHref, phoneHref } from "@/lib/config";
import { services } from "@/lib/content/services";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Work & Demos", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms & Conditions", href: "/legal/terms" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-lg font-bold text-white">
                {site.name.charAt(0)}
              </span>
              <span className="text-lg font-bold text-slate-900">{site.name}</span>
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-800">{site.tagline}</p>
            <p className="mt-2 text-sm text-slate-600">{site.positioning}</p>
            <p className="mt-3 text-sm text-slate-600">{site.serviceArea}</p>
          </div>

          <nav aria-label="Services">
            <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-slate-600 hover:text-brand-700"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/work" className="text-sm text-slate-600 hover:text-brand-700">
                  Sample Solutions
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">
              Company
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-1">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-brand-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <span>
                  {site.city}, {site.region}, {site.country}
                </span>
              </li>
              {hasEmail() && (
                <li className="flex items-start gap-2">
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  <a href={emailHref()} className="hover:text-brand-700">
                    {site.email}
                  </a>
                </li>
              )}
              {hasPhone() && (
                <li className="flex items-start gap-2">
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  <a href={phoneHref()} className="hover:text-brand-700">
                    {site.phone}
                  </a>
                </li>
              )}
              {!hasEmail() && !hasPhone() && (
                <li className="text-slate-500">
                  Reach us through the{" "}
                  <Link href="/contact" className="text-brand-700 hover:underline">
                    contact form
                  </Link>
                  .
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-500">
            © {year} {site.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-brand-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
