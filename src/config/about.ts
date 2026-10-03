import type { AboutConfig } from "@/types/config";

import { brandConfig } from "@/config/brand";
import { siteConfig } from "@/config/site";

export const aboutConfig = {
  path: siteConfig.aboutPath,
  seo: {
    title: "About",
    description: `${brandConfig.name} is an enterprise data gateway and exchange. Teams consume data; we run warehouses, refreshes, load topologies, and the wrangling in between.`,
  },
  eyebrow: "About",
  title: brandConfig.name,
  body: `${brandConfig.name} is built for organizations that need ready-to-use data without standing up another internal pipeline. The full story—how we split consumption from operations, who we serve, and what we deliver—is on the home page.`,
  cta: {
    label: "Explore capabilities",
    href: `${siteConfig.homeHref}#${siteConfig.sections.platform}`,
  },
} satisfies AboutConfig;
