import { documentationConfig } from "@/config/documentation";
import { siteConfig } from "@/config/site";

export function documentationPagePath(slug: string): string {
  return `${siteConfig.documentationPath}/${slug}`;
}

export function getDocumentationPage(slug: string) {
  return documentationConfig.pages.find((page) => page.slug === slug);
}

export function getDocumentationSlugs(): string[] {
  return documentationConfig.pages.map((page) => page.slug);
}

export function isDocumentationSlug(slug: string): boolean {
  return getDocumentationSlugs().includes(slug);
}
