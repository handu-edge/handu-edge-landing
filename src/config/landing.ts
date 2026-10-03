import type { LandingConfig } from "@/types/config";

import { brandConfig } from "@/config/brand";
import { siteConfig } from "@/config/site";

export const landingConfig = {
  hero: {
    enabled: true,
    eyebrow: brandConfig.tagline,
    title: "Data you can use. Operations you do not run.",
    description:
      `${brandConfig.name} connects you to large datasets from unlimited sources and across domains—healthcare, finance, research, public sector, and more. Every listing carries its own compliance requirements (GDPR, HIPAA, and sector-specific rules), made visible before you connect. Your teams consume entitled data straight into warehouses, applications, and analytics—we run the gateway operations behind that edge.`,
    highlights: [
      "Browse high-volume, domain-rich catalogs without standing up a separate integration per source.",
      "See compliance and usage terms per dataset—GDPR, HIPAA, and other standards—so legal and security can sign off early.",
      "Deliver into your systems via APIs, downloads, and workspace exports built for production pipelines, not one-off extracts.",
    ],
    primaryCta: {
      label: `Learn how ${brandConfig.name} works`,
      href: `${siteConfig.homeHref}#${siteConfig.sections.platform}`,
    },
    secondaryCta: siteConfig.signIn,
  },
  edgeVisual: {
    enabled: true,
    accessibleName:
      "Many domain sources feed the gateway; compliant datasets flow out to the consumer's systems.",
    stages: ["Sources", brandConfig.name, "Consume"],
    pipelineSteps: [
      "Cleaning",
      "Refresh",
      "Quality Control",
      "Error Control",
      "Standard Topology",
    ],
    consumerLabel: "YOU",
  },
  platform: {
    split: { enabled: true },
    belief: { enabled: false },
    audiences: { enabled: true },
  },
  capabilities: {
    enabled: true,
    id: siteConfig.sections.capabilities,
    title: "From unlimited sources to systems you already run.",
    description:
      "Capabilities below are how large, multi-domain catalogs stay consumable: each dataset keeps its own compliance story, while you plug the same gateway into warehouses, apps, and models—without multiplying operational teams.",
    items: [
      {
        title: "Unlimited sources & domains",
        description:
          "Healthcare, finance, demographics, logistics, public sector, and more—large datasets from many origins, unified in one exchange instead of a new vendor project every quarter.",
        icon: "globe",
      },
      {
        title: "Compliance per dataset",
        description:
          "GDPR, HIPAA, and domain-specific controls are attached to each listing—entitlements, retention, and permitted use surfaced before data lands in your environment.",
        icon: "shield",
      },
      {
        title: "Consume into your stack",
        description:
          "APIs, bulk downloads, and workspace delivery designed to feed your warehouses, BI tools, and applications on a schedule your platform teams can depend on.",
        icon: "plug",
      },
      {
        title: "Unified Workspaces",
        description:
          "Discover what is available, who is entitled, and what changed—across sources and compliance regimes—in one place instead of email chains and ad hoc file drops.",
        icon: "layout-grid",
      },
      {
        title: "Warehouses, refreshes & topologies",
        description:
          "We operate cleaning, warehousing, refreshes, and load topologies behind the gateway so your systems receive data that is already aligned to each source's rules.",
        icon: "server",
      },
      {
        title: "Enterprise Data Services",
        description:
          "Custom domains, compliance workflows, and co-managed pipelines when your program needs dedicated engineering beyond the standard catalog.",
        icon: "handshake",
      },
    ],
  },
  finalCta: {
    enabled: false,
    id: "contact",
    eyebrow: "Contact",
    title: "Your data shouldn't stop at the edge.",
    description:
      "Whether you are evaluating the gateway or ready to onboard a domain, start in the workspace. Browse what is ready to consume, invite your team, and leave the wrangling to us.",
    points: [
      "See current listings, APIs, and download packages in one place.",
      "Sign in with your organization to access entitled datasets.",
      "Talk to us about domains, topologies, or managed operations beyond the standard gateway.",
    ],
    button: siteConfig.workspace,
  },
} satisfies LandingConfig;
