import type { SEOConfig } from "@/types/config";

import { brandConfig } from "@/config/brand";

export const seoConfig = {
  title: `${brandConfig.name} — ${brandConfig.tagline}`,
  titleTemplate: `%s — ${brandConfig.name}`,
  description: brandConfig.description,
  keywords: [
    "enterprise data",
    "data exchange",
    "data gateway",
    "datasets",
  ],
  locale: "en_US",
  openGraph: {
    title: `${brandConfig.name} — ${brandConfig.tagline}`,
    description: brandConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandConfig.name} — ${brandConfig.tagline}`,
    description: brandConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
} satisfies SEOConfig;
