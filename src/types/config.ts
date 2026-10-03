import type { IconName } from "@/lib/icons";

import type { ThemeConfig } from "@/types/theme";

export type { ThemeConfig } from "@/types/theme";

export type LinkConfig = {
  label: string;
  href: string;
  external?: boolean;
};

export type BrandConfig = {
  name: string;
  shortName: string;
  tagline: string;
  logo: {
    type: "wordmark";
    showMark: boolean;
    showWordmark: boolean;
  };
  description: string;
  year: number;
};

export type SiteSectionId =
  | "overview"
  | "platform"
  | "belief"
  | "audiences"
  | "capabilities";

export type SiteConfig = {
  layout: {
    /** Tailwind max-width utility for page content (centered, not full-bleed). */
    containerMaxWidth: string;
    /** Tailwind min-height utility for stacked page panels (e.g. min-h-dvh). */
    sectionMinHeight: string;
    /** Tailwind height utility for the sticky header bar. */
    headerBarHeightClass: string;
    /** Tailwind scroll-margin utility for in-page section anchors. */
    scrollMarginTopClass: string;
    /** Min height for the page shell (header + main + footer). */
    pageShellMinHeightClass: string;
  };
  url: string;
  homeHref: string;
  aboutPath: string;
  pricingPath: string;
  documentationPath: string;
  workspaceUrl: string;
  apiUrl: string;
  documentationUrl: string;
  supportUrl: string;
  workspace: LinkConfig;
  signIn: LinkConfig;
  sections: Readonly<Record<SiteSectionId, string>>;
};

export type PlatformVisualId = "hero-split" | "pipeline" | "domains";

export type PlatformModelConfig = {
  eyebrow: string;
  lead: string;
  title: string;
  consume: {
    label: string;
    description: string;
    points: readonly string[];
  };
  operate: {
    label: string;
    description: string;
    points: readonly string[];
  };
  visual: PlatformVisualId;
  visualLabel: string;
};

export type PlatformConfig = {
  model: PlatformModelConfig;
  belief: {
    eyebrow: string;
    title: string;
    body: string;
    detail: string;
    visual: PlatformVisualId;
    visualLabel: string;
  };
  audiences: {
    eyebrow: string;
    title: string;
    body: string;
    detail: string;
    domainsLabel: string;
    domains: readonly string[];
    visual: PlatformVisualId;
    visualLabel: string;
  };
};

export type AboutConfig = {
  path: string;
  seo: {
    title: string;
    description: string;
  };
  eyebrow: string;
  title: string;
  body: string;
  cta: LinkConfig;
};

export type PricingTierConfig = {
  id: string;
  name: string;
  description: string;
  price: string;
  priceNote?: string;
  features: readonly string[];
  cta: LinkConfig;
  highlighted?: boolean;
};

export type DocSidebarGroupConfig = {
  title: string;
  items: readonly {
    slug: string;
    label: string;
  }[];
};

export type DocumentationGitHubSource = {
  owner: string;
  repo: string;
  branch: string;
};

export type DocumentationRemotePage = {
  slug: string;
  label: string;
  title: string;
  description: string;
  /** Path to the `.md` file in the configured GitHub repo. */
  path: string;
};

export type DocPageConfig = DocumentationRemotePage;

export type DocumentationConfig = {
  path: string;
  defaultSlug: string;
  github: DocumentationGitHubSource;
  seo: {
    title: string;
    description: string;
  };
  sidebarLabel: string;
  mobileMenuLabel: string;
  sidebar: readonly DocSidebarGroupConfig[];
  remotePages: readonly DocumentationRemotePage[];
};

export type PricingConfig = {
  path: string;
  seo: {
    title: string;
    description: string;
  };
  eyebrow: string;
  title: string;
  description: string;
  tiers: readonly PricingTierConfig[];
  customTier: PricingTierConfig & { subtitle: string };
};

export type NavigationConfig = {
  explore: readonly LinkConfig[];
  engage: readonly LinkConfig[];
  engageMenuLabel: string;
  actions: {
    workspace: LinkConfig;
  };
  menuLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
};

export type SocialLinkConfig = LinkConfig & {
  icon: IconName;
};

export type FooterConfig = {
  primaryCta: LinkConfig;
  secondaryCta: LinkConfig;
  statement: string;
  getStartedNote: string;
  columns: readonly {
    title: string;
    links: readonly LinkConfig[];
  }[];
  legal: readonly LinkConfig[];
  social: readonly SocialLinkConfig[];
};

export type TypeScaleStep = {
  size: string;
  leading: string;
  tracking: string;
};

export type FontDefinition = {
  label: string;
  cssVariable: string;
};

export type TypographyConfig = {
  defaultFont: string;
  fonts: Readonly<Record<string, FontDefinition>>;
  scale: {
    display: TypeScaleStep;
    headline: TypeScaleStep;
    body: TypeScaleStep;
    label: TypeScaleStep;
  };
};

export function defineTypographyConfig<const T extends TypographyConfig>(
  config: T & (T["defaultFont"] extends keyof T["fonts"] ? unknown : never),
): T {
  return config;
}

export type LandingSectionConfig = {
  enabled: boolean;
};

export type CapabilityConfig = {
  title: string;
  description: string;
  icon: IconName;
};

export type LandingConfig = {
  hero: LandingSectionConfig & {
    eyebrow: string;
    title: string;
    description: string;
    highlights: readonly string[];
    primaryCta: LinkConfig;
    secondaryCta: LinkConfig;
  };
  edgeVisual: LandingSectionConfig & {
    accessibleName: string;
    stages: readonly [string, string, string];
    pipelineSteps: readonly string[];
    consumerLabel: string;
  };
  platform: {
    split: LandingSectionConfig;
    belief: LandingSectionConfig;
    audiences: LandingSectionConfig;
  };
  capabilities: LandingSectionConfig & {
    id: string;
    title: string;
    description?: string;
    items: readonly CapabilityConfig[];
  };
  finalCta: LandingSectionConfig & {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    points: readonly string[];
    button: LinkConfig;
  };
};

export type SEOConfig = {
  title: string;
  titleTemplate: string;
  description: string;
  keywords: readonly string[];
  locale: string;
  openGraph: {
    title: string;
    description: string;
    type: "website";
  };
  twitter: {
    card: "summary_large_image";
    title: string;
    description: string;
  };
  robots: {
    index: boolean;
    follow: boolean;
  };
};

export type SiteConfiguration = {
  brand: BrandConfig;
  site: SiteConfig;
  theme: ThemeConfig;
  typography: TypographyConfig;
  navigation: NavigationConfig;
  footer: FooterConfig;
  landing: LandingConfig;
  seo: SEOConfig;
};
