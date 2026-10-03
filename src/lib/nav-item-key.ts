import { siteConfig } from "@/config/site";

/** Stable key for comparing nav hrefs to the active item. */
export function navItemKey(href: string): string {
  const [pathPart, hash] = href.split("#");
  const path = pathPart === "" ? siteConfig.homeHref : pathPart;

  if (hash) {
    return hash;
  }

  return path;
}

export function isHomeSectionKey(key: string): boolean {
  return Object.values(siteConfig.sections).includes(
    key as (typeof siteConfig.sections)[keyof typeof siteConfig.sections],
  );
}

export const homeSectionIds = Object.values(siteConfig.sections);

/** Primary home nav + scroll spy (Overview → Platform → Capabilities). */
export const homeNavSectionIds = [
  siteConfig.sections.overview,
  siteConfig.sections.platform,
  siteConfig.sections.capabilities,
] as const;

export const homeSupplementalSectionIds = [
  siteConfig.sections.audiences,
] as const;
