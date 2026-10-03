import type { NavigationConfig } from "@/types/config";

import { sectionHref } from "@/lib/section-href";
import { siteConfig } from "@/config/site";

export const navigationConfig = {
  explore: [
    { label: "Overview", href: sectionHref("overview") },
    { label: "Platform", href: sectionHref("platform") },
    { label: "Capabilities", href: sectionHref("capabilities") },
  ],
  engage: [
    {
      label: "From $0",
      href: siteConfig.pricingPath,
    },
    {
      label: "Documentation",
      href: siteConfig.documentationPath,
    },
  ],
  engageMenuLabel: "Get started",
  actions: {
    workspace: siteConfig.workspace,
  },
  menuLabel: "Primary",
  openMenuLabel: "Open menu",
  closeMenuLabel: "Close menu",
} satisfies NavigationConfig;
