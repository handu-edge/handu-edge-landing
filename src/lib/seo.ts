import type { Metadata } from "next";

import {
  aboutConfig,
  brandConfig,
  documentationConfig,
  pricingConfig,
  seoConfig,
  siteConfig,
} from "@/config";
import { documentationPagePath } from "@/lib/documentation";
import type { DocPageConfig } from "@/types/config";

export function createMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: seoConfig.title,
      template: seoConfig.titleTemplate,
    },
    description: seoConfig.description,
    keywords: [...seoConfig.keywords],
    applicationName: brandConfig.name,
    authors: [{ name: brandConfig.name }],
    alternates: {
      canonical: siteConfig.url,
    },
    robots: seoConfig.robots,
    openGraph: {
      title: seoConfig.openGraph.title,
      description: seoConfig.openGraph.description,
      type: seoConfig.openGraph.type,
      url: siteConfig.url,
      siteName: brandConfig.name,
      locale: seoConfig.locale,
    },
    twitter: {
      card: seoConfig.twitter.card,
      title: seoConfig.twitter.title,
      description: seoConfig.twitter.description,
    },
  };
}

export function createDocumentationMetadata(): Metadata {
  const pageUrl = new URL(
    siteConfig.documentationPath,
    siteConfig.url,
  ).toString();

  return {
    title: documentationConfig.seo.title,
    description: documentationConfig.seo.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${documentationConfig.seo.title} — ${brandConfig.name}`,
      description: documentationConfig.seo.description,
      type: "website",
      url: pageUrl,
      siteName: brandConfig.name,
      locale: seoConfig.locale,
    },
    twitter: {
      card: seoConfig.twitter.card,
      title: `${documentationConfig.seo.title} — ${brandConfig.name}`,
      description: documentationConfig.seo.description,
    },
  };
}

export function createDocumentationPageMetadata(
  page: DocPageConfig,
): Metadata {
  const pageUrl = new URL(documentationPagePath(page.slug), siteConfig.url).toString();

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${page.title} — ${brandConfig.name} Docs`,
      description: page.description,
      type: "website",
      url: pageUrl,
      siteName: brandConfig.name,
      locale: seoConfig.locale,
    },
    twitter: {
      card: seoConfig.twitter.card,
      title: `${page.title} — ${brandConfig.name} Docs`,
      description: page.description,
    },
  };
}

export function createPricingMetadata(): Metadata {
  const pageUrl = new URL(siteConfig.pricingPath, siteConfig.url).toString();

  return {
    title: pricingConfig.seo.title,
    description: pricingConfig.seo.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${pricingConfig.seo.title} — ${brandConfig.name}`,
      description: pricingConfig.seo.description,
      type: "website",
      url: pageUrl,
      siteName: brandConfig.name,
      locale: seoConfig.locale,
    },
    twitter: {
      card: seoConfig.twitter.card,
      title: `${pricingConfig.seo.title} — ${brandConfig.name}`,
      description: pricingConfig.seo.description,
    },
  };
}

export function createAboutMetadata(): Metadata {
  const pageUrl = new URL(siteConfig.aboutPath, siteConfig.url).toString();

  return {
    title: aboutConfig.seo.title,
    description: aboutConfig.seo.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${aboutConfig.seo.title} — ${brandConfig.name}`,
      description: aboutConfig.seo.description,
      type: "website",
      url: pageUrl,
      siteName: brandConfig.name,
      locale: seoConfig.locale,
    },
    twitter: {
      card: seoConfig.twitter.card,
      title: `${aboutConfig.seo.title} — ${brandConfig.name}`,
      description: aboutConfig.seo.description,
    },
  };
}
