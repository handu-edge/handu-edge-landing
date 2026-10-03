import type { DocumentationConfig } from "@/types/config";

import { brandConfig } from "@/config/brand";
import { siteConfig } from "@/config/site";

const name = brandConfig.name;

/**
 * Markdown is loaded from `github` at build/request time.
 * Add entries to `remotePages` (repo path + slug) to publish more docs.
 */
export const documentationConfig = {
  path: siteConfig.documentationPath,
  defaultSlug: "documentation",
  github: {
    owner: "github",
    repo: "gitignore",
    branch: "main",
  },
  seo: {
    title: "Documentation",
    description: `Guides and references for consuming data through ${name}.`,
  },
  sidebarLabel: "Documentation",
  mobileMenuLabel: "Documentation menu",
  remotePages: [
    {
      slug: "documentation",
      label: "Documentation",
      title: "Documentation",
      description: `Overview and usage notes sourced from ${name} docs (example GitHub content).`,
      path: "README.md",
    },
    {
      slug: "global-gitignore",
      label: "Global gitignore",
      title: "Global gitignore",
      description: "Example second doc from the same repository.",
      path: "Global/README.md",
    },
  ],
  sidebar: [
    {
      title: "From GitHub",
      items: [
        { slug: "documentation", label: "Documentation" },
        { slug: "global-gitignore", label: "Global gitignore" },
      ],
    },
  ],
} satisfies DocumentationConfig;
