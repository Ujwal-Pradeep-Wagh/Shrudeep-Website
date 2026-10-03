"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/Button";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { site, PRIMARY_CTA } from "@/lib/config";
import { services } from "@/lib/content/services";
import { track } from "@/components/analytics/track";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Industries", href: "/industries", hasDropdown: false },
  { label: "How It Works", href: "/how-it-works", hasDropdown: false },
  { label: "Work", href: "/work", hasDropdown: false },
  { label: "About", href: "/about", hasDropdown: false },
  { label: "Insights", href: "/insights", hasDropdown: false },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label={`${site.name} — home`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-lg font-bold text-white">
              {site.name.charAt(0)}
            </span>
            <span className="text-lg font-bold text-slate-900">{site.name}</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive(pathname, item.href)
                        ? "text-brand-700"
                        : "text-slate-700 hover:text-brand-700"
                    )}
                  >
                    {item.label}
                    <ChevronDownIcon className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-0 top-full w-72 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="block rounded-lg px-3 py-2.5 hover:bg-brand-50"
                        >
                          <span className="block text-sm font-semibold text-slate-900">
                            {service.name}
                          </span>
                          <span className="mt-0.5 block text-xs text-slate-500">
                            {service.headline}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive(pathname, item.href)
                      ? "text-brand-700"
                      : "text-slate-700 hover:text-brand-700"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:block">
            <Link
              href={PRIMARY_CTA.href}
              className={buttonClasses({ size: "sm" })}
              onClick={() =>
                track("consultation_cta_clicked", { location: "header" })
              }
            >
              {PRIMARY_CTA.label}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="rounded-md p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile navigation */}
      {mobileOpen && (
        <nav
          className="border-t border-slate-200 bg-white lg:hidden"
          aria-label="Mobile"
        >
          <Container className="py-4">
            <div className="flex flex-col gap-1">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-base font-medium text-slate-800 hover:bg-slate-50"
                onClick={() => setMobileServicesOpen((open) => !open)}
                aria-expanded={mobileServicesOpen}
              >
                Services
                <ChevronDownIcon
                  className={cn(
                    "h-5 w-5 transition-transform",
                    mobileServicesOpen && "rotate-180"
                  )}
                />
              </button>
              {mobileServicesOpen && (
                <div className="ml-3 flex flex-col gap-1 border-l-2 border-brand-100 pl-3">
                  <Link
                    href="/services"
                    className="rounded-md px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    All Services
                  </Link>
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setMobileOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
              {navItems
                .filter((item) => !item.hasDropdown)
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-base font-medium hover:bg-slate-50",
                      isActive(pathname, item.href)
                        ? "text-brand-700"
                        : "text-slate-800"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              <Link
                href="/contact"
                className="rounded-md px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-50"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>
              <Link
                href={PRIMARY_CTA.href}
                className={cn(buttonClasses({}), "mt-3")}
                onClick={() => {
                  track("consultation_cta_clicked", { location: "mobile-menu" });
                  setMobileOpen(false);
                }}
              >
                {PRIMARY_CTA.label}
              </Link>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
