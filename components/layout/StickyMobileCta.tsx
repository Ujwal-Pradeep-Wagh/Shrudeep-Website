"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/icons";
import { hasWhatsApp, whatsappLink } from "@/lib/config";
import { track } from "@/components/analytics/track";
import { cn } from "@/lib/utils";

export function StickyMobileCta() {
  const pathname = usePathname();

  // Don't cover the contact page's own submit button on mobile.
  if (pathname === "/contact") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="flex gap-3">
        {hasWhatsApp() && (
          <a
            href={whatsappLink("Hi, I'd like to discuss a software requirement.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_clicked", { location: "sticky-mobile" })}
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-whatsapp px-4 py-3 text-sm font-semibold text-white"
            )}
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </a>
        )}
        <Link
          href="/contact"
          onClick={() =>
            track("consultation_cta_clicked", { location: "sticky-mobile" })
          }
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-brand-700 px-4 py-3 text-sm font-semibold text-white"
        >
          Enquire Now
        </Link>
      </div>
    </div>
  );
}
