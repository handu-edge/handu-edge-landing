import type { PlatformConfig } from "@/types/config";

import { brandConfig } from "@/config/brand";

export const platformConfig = {
  model: {
    eyebrow: "Platform",
    lead:
      "Large datasets arrive from unlimited sources and every domain plays by different rules. The platform makes that scale legible: one gateway, many listings, compliance declared per dataset.",
    title: "You consume. We operate.",
    consume: {
      label: "You consume",
      description:
        "Your teams pull entitled datasets into the systems they already run—data warehouses, analytics platforms, and custom apps—via APIs, downloads, and workspace delivery.",
      points: [
        "Integrate production pipelines without rebuilding compliance logic per vendor",
        "Choose datasets knowing their GDPR, HIPAA, or sector requirements up front",
        "Keep analysts and engineers focused on models and products, not source wrangling",
      ],
    },
    operate: {
      label: "We operate",
      description: `${brandConfig.name} ingests from countless sources, applies domain-specific standards at the edge, and keeps each listing documented, refreshed, and audit-ready before it reaches your environment.`,
      points: [
        "Onboard and normalize feeds across domains without multiplying internal platform teams",
        "Enforce dataset-level compliance, lineage, and entitlements at the gateway",
        "Run warehouses, refreshes, quality control, and topology changes behind one edge",
        "Monitor failures and schema drift so downstream consumers stay stable",
      ],
    },
    visual: "hero-split",
    visualLabel: "Many compliant sources in; your systems consume out.",
  },
  belief: {
    eyebrow: "Why we exist",
    title: "Consumption should feel inevitable.",
    body: `Most organizations already know how to use data. What breaks them is everything before use: negotiating with sources, rebuilding pipelines after schema drift, paging on failed refreshes, and explaining why yesterday's extract differs from today's. ${brandConfig.name} concentrates that work at the gateway so consumers inherit reliability instead of inheriting operations.`,
    detail:
      "We are not selling another dashboard or ETL IDE—we are taking responsibility for the path data travels before it reaches your people. That is a different contract, and it is the one enterprises need when consumption scales faster than platform teams can hire.",
    visual: "pipeline",
    visualLabel: "Raw inputs refined into dependable outputs.",
  },
  audiences: {
    eyebrow: "Who we serve",
    title: "Programs that outgrew ad hoc data plumbing.",
    body: `Regulated and data-intensive domains—healthcare, finance, research, demographics, public sector, retail, logistics, and adjacent fields—where stakeholders need ready data but should not each run their own ingestion program.`,
    detail:
      "If your analysts spend more time requesting extracts than analyzing, or your engineers maintain brittle one-off syncs, you are who we built for. We standardize the edge so domain teams meet the same gateway experience even when sources behind it differ wildly.",
    domainsLabel: "Example domains",
    domains: [
      "Healthcare",
      "Finance",
      "Research",
      "Demographics",
      "Public Sector",
      "Retail",
      "Logistics",
    ],
    visual: "domains",
    visualLabel: "Many domains connected through one gateway.",
  },
} satisfies PlatformConfig;
