import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { site } from "@/lib/config";
import { localBusinessJsonLd, JsonLd } from "@/lib/seo";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline} | Software Development in ${site.city}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    `software development company in ${site.city}`,
    `custom software development ${site.city}`,
    `website development ${site.city}`,
    `billing software ${site.city}`,
    `software modernization ${site.city}`,
    `software maintenance ${site.city}`,
    "ERP software for small business",
    "business automation",
  ],
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={localBusinessJsonLd()} />
        <PageViewTracker />
        {children}
      </body>
    </html>
  );
}
