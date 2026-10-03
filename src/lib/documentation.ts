import { documentationConfig } from "@/config/documentation";
import { siteConfig } from "@/config/site";
import type { DocumentationRemotePage } from "@/types/config";

export function documentationPagePath(slug: string): string {
  if (slug === documentationConfig.defaultSlug) {
    return siteConfig.documentationPath;
  }
  return `${siteConfig.documentationPath}/${slug}`;
}

export function getDocumentationPage(
  slug: string,
): DocumentationRemotePage | undefined {
  return documentationConfig.remotePages.find((page) => page.slug === slug);
}

export function getDocumentationSlugs(): string[] {
  return documentationConfig.remotePages.map((page) => page.slug);
}

export function isDocumentationSlug(slug: string): boolean {
  return getDocumentationSlugs().includes(slug);
}

export function getDefaultDocumentationSlug(): string {
  return documentationConfig.defaultSlug;
}
