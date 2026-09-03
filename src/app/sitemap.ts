import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/desktopItems";
import { SITE_URL } from "./layout";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...caseStudies.map((a) => ({
      url: `${SITE_URL}/projects/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
