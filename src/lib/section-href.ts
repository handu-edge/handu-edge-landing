import { siteConfig } from "@/config/site";
import type { SiteSectionId } from "@/types/config";

export function sectionHref(sectionId: SiteSectionId): string {
  return `${siteConfig.homeHref}#${siteConfig.sections[sectionId]}`;
}
