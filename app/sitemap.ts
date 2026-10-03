import type { MetadataRoute } from "next";
import { site } from "@/lib/config";
import { services } from "@/lib/content/services";
import { insights } from "@/lib/content/insights";

type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  lastModified?: string;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: SitemapEntry[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { path: "/industries", priority: 0.7, changeFrequency: "monthly" },
    { path: "/how-it-works", priority: 0.7, changeFrequency: "monthly" },
    { path: "/work", priority: 0.7, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/insights", priority: 0.6, changeFrequency: "weekly" },
    { path: "/legal/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/legal/terms", priority: 0.2, changeFrequency: "yearly" },
    { path: "/legal/disclaimer", priority: 0.2, changeFrequency: "yearly" },
    ...services.map((service) => ({
      path: `/services/${service.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    ...insights.map((post) => ({
      path: `/insights/${post.slug}`,
      priority: 0.5,
      changeFrequency: "monthly" as const,
      lastModified: post.date,
    })),
  ];

  return entries.map((entry) => ({
    url: `${site.url}${entry.path}`,
    lastModified: entry.lastModified ?? new Date().toISOString(),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
