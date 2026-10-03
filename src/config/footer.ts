import type { FooterConfig, SocialLinkConfig } from "@/types/config";

import { brandConfig } from "@/config/brand";
import { sectionHref } from "@/lib/section-href";
import { siteConfig } from "@/config/site";

const social: SocialLinkConfig[] = [];

export const footerConfig = {
  primaryCta: siteConfig.workspace,
  secondaryCta: siteConfig.signIn,
  getStartedNote:
    "Open the workspace to consume data, or sign in to your organization.",
  statement:
    `You consume. We operate—cleaning, warehouses, refreshes, and topologies behind one ${brandConfig.name} gateway.`,
  columns: [
    {
      title: "Explore",
      links: [
        { label: "Overview", href: sectionHref("overview") },
        { label: "Platform", href: sectionHref("platform") },
        { label: "Capabilities", href: sectionHref("capabilities") },
        { label: "Audiences", href: sectionHref("audiences") },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Pricing", href: siteConfig.pricingPath },
        { label: "About", href: siteConfig.aboutPath },
        { label: "Documentation", href: siteConfig.documentationPath },
        { label: "API Reference", href: "#" },
        { label: "Support", href: siteConfig.supportUrl },
      ],
    },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
  social,
} satisfies FooterConfig;
