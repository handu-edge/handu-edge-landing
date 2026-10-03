import type { SiteConfig } from "@/types/config";

const workspaceUrl = "https://workspace.handuedge.com";

export const aboutPath = "/about";
export const pricingPath = "/pricing";
export const documentationPath = "/documentation";

export const siteConfig = {
  layout: {
    containerMaxWidth: "max-w-screen-2xl",
    sectionMinHeight: "min-h-dvh",
    headerBarHeightClass: "h-20",
    scrollMarginTopClass: "scroll-mt-20",
    pageShellMinHeightClass: "min-h-dvh",
  },
  url: "https://handuedge.com",
  homeHref: "/",
  aboutPath,
  pricingPath,
  documentationPath,
  workspaceUrl,
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  documentationUrl: documentationPath,
  supportUrl: "#",
  workspace: {
    label: "Open Workspace",
    href: workspaceUrl,
    external: true,
  },
  signIn: {
    label: "Sign in",
    href: workspaceUrl,
    external: true,
  },
  sections: {
    overview: "overview",
    platform: "platform",
    capabilities: "capabilities",
    belief: "belief",
    audiences: "audiences",
  },
} satisfies SiteConfig;
