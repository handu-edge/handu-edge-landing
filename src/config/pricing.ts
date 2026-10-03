import type { PricingConfig } from "@/types/config";

import { brandConfig } from "@/config/brand";
import { siteConfig } from "@/config/site";

export const pricingConfig = {
  path: siteConfig.pricingPath,
  seo: {
    title: "Pricing",
    description: `Plans for ${brandConfig.name}: free, starter, and premium tiers plus custom EDGE Data Services.`,
  },
  eyebrow: "Pricing",
  title: "Choose how you consume—and how much we operate.",
  description:
    "Start in the workspace for free, scale through starter and premium as consumption grows, or engage EDGE Data Services for custom pipelines, topologies, and managed operations beyond the standard gateway.",
  tiers: [
    {
      id: "free",
      name: "Free",
      description: "Explore the gateway and consume from public listings.",
      price: "$0",
      priceNote: "per month",
      features: [
        "Workspace access for evaluation",
        "Browse published datasets and APIs",
        "Direct downloads within fair-use limits",
        "Community documentation and support",
      ],
      cta: {
        label: "Open workspace",
        href: siteConfig.workspaceUrl,
        external: true,
      },
    },
    {
      id: "starter",
      name: "Starter",
      description: "Small teams with a focused set of domains and consumers.",
      price: "$499",
      priceNote: "per month",
      features: [
        "Everything in Free",
        "Entitled access to selected domains",
        "API keys and scheduled refresh SLAs",
        "Email support with next-business-day response",
      ],
      cta: {
        label: "Get started",
        href: siteConfig.workspaceUrl,
        external: true,
      },
    },
    {
      id: "premium",
      name: "Premium",
      description: "Growing programs that need more capacity and control.",
      price: "$1,999",
      priceNote: "per month",
      highlighted: true,
      features: [
        "Everything in Starter",
        "Additional domains and higher API throughput",
        "Unified workspace collaboration for multiple teams",
        "Priority support and operational visibility",
      ],
      cta: {
        label: "Start Premium",
        href: siteConfig.workspaceUrl,
        external: true,
      },
    },
  ],
  customTier: {
    id: "edge-data-services",
    name: "EDGE Data Services",
    subtitle: "Custom plan for clients",
    description:
      "Partner with handuEDGE on bespoke pipelines, warehouse operations, topology design, and ongoing data services when your program needs more than a standard tier.",
    price: "Custom",
    priceNote: "scoped to your program",
    features: [
      "Custom ingress, cleaning, and quality-control pipelines",
      "Managed refreshes, backfills, and incident response",
      "Load topology design and continuous optimization",
      "Co-managed operations alongside your platform team",
    ],
    cta: {
      label: "Discuss EDGE Data Services",
      href: siteConfig.supportUrl,
      external: false,
    },
  },
} satisfies PricingConfig;
