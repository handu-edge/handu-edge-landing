import type { DocumentationConfig } from "@/types/config";

import { brandConfig } from "@/config/brand";
import { siteConfig } from "@/config/site";

const name = brandConfig.name;

export const documentationConfig = {
  path: siteConfig.documentationPath,
  defaultSlug: "introduction",
  seo: {
    title: "Documentation",
    description: `Guides and references for consuming data through ${name}—workspaces, APIs, authentication, and operations.`,
  },
  sidebarLabel: "Documentation",
  mobileMenuLabel: "Documentation menu",
  sidebar: [
    {
      title: "Getting started",
      items: [
        { slug: "introduction", label: "Introduction" },
        { slug: "quickstart", label: "Quickstart" },
        { slug: "workspace", label: "Workspace" },
      ],
    },
    {
      title: "Consume",
      items: [
        { slug: "authentication", label: "Authentication" },
        { slug: "apis", label: "APIs" },
        { slug: "downloads", label: "Downloads" },
      ],
    },
    {
      title: "Operate",
      items: [
        { slug: "gateway", label: "Gateway model" },
        { slug: "refreshes", label: "Refreshes & topology" },
      ],
    },
  ],
  pages: [
    {
      slug: "introduction",
      title: "Introduction",
      description: `What ${name} is and how consumption differs from operations.`,
      blocks: [
        {
          type: "paragraph",
          text: `${name} is an enterprise data gateway and exchange. Your teams consume curated datasets through workspaces, APIs, and downloads. We operate cleaning, warehousing, refreshes, quality control, and load topologies behind the gateway.`,
        },
        {
          type: "heading",
          level: 2,
          text: "The split",
        },
        {
          type: "list",
          items: [
            "You consume: discover listings, call APIs, download packages, collaborate in the workspace.",
            "We operate: ingress, wrangling, warehouse health, scheduled refreshes, and error recovery.",
          ],
        },
      ],
    },
    {
      slug: "quickstart",
      title: "Quickstart",
      description: "Sign in, open the workspace, and consume your first dataset.",
      blocks: [
        {
          type: "paragraph",
          text: "Create or join an organization in the workspace, browse entitled domains, and choose an API or download package. Credentials are issued per environment.",
        },
        {
          type: "heading",
          level: 2,
          text: "Steps",
        },
        {
          type: "list",
          items: [
            "Open the workspace and sign in with your organization identity.",
            "Navigate to Catalog and filter by domain or freshness.",
            "Open a listing to view schema, refresh schedule, and access methods.",
            "Generate an API key or download the latest package.",
          ],
        },
        {
          type: "code",
          language: "bash",
          text: `curl -H "Authorization: Bearer $HANDUEDGE_TOKEN" \\
  "$HANDUEDGE_API_URL/v1/datasets/example/listings"`,
        },
      ],
    },
    {
      slug: "workspace",
      title: "Workspace",
      description: "Unified environment for discovery, collaboration, and access.",
      blocks: [
        {
          type: "paragraph",
          text: "The workspace is where consumers discover what is ready to use. Listings show lineage summaries, refresh windows, and entitlement requirements without exposing operational pipelines.",
        },
        {
          type: "heading",
          level: 3,
          text: "Roles",
        },
        {
          type: "list",
          items: [
            "Viewer — browse catalog and documentation.",
            "Consumer — access entitled APIs and downloads.",
            "Admin — manage keys, members, and access requests.",
          ],
        },
      ],
    },
    {
      slug: "authentication",
      title: "Authentication",
      description: "API keys, tokens, and organization entitlements.",
      blocks: [
        {
          type: "paragraph",
          text: "All API requests require a bearer token scoped to your organization and environment. Keys are rotated from the workspace; never embed long-lived secrets in client-side code.",
        },
        {
          type: "code",
          language: "http",
          text: "Authorization: Bearer <token>",
        },
        {
          type: "heading",
          level: 2,
          text: "Environments",
        },
        {
          type: "list",
          items: [
            "sandbox — evaluation and integration testing.",
            "production — entitled consumption with SLA-backed refreshes.",
          ],
        },
      ],
    },
    {
      slug: "apis",
      title: "APIs",
      description: "REST surfaces for programmatic consumption.",
      blocks: [
        {
          type: "paragraph",
          text: "Each published listing exposes versioned REST endpoints. OpenAPI descriptions ship with the listing. Breaking changes increment the major version; additive fields are backward compatible.",
        },
        {
          type: "heading",
          level: 2,
          text: "Conventions",
        },
        {
          type: "list",
          items: [
            "Base URL is provided per listing in the workspace.",
            "Use Accept: application/json unless downloading binary payloads.",
            "Respect rate limits returned in response headers.",
          ],
        },
      ],
    },
    {
      slug: "downloads",
      title: "Downloads",
      description: "File packages when batch consumption fits better than APIs.",
      blocks: [
        {
          type: "paragraph",
          text: "Direct downloads are generated on the same refresh cadence as API datasets. Packages are checksum-verified and documented in the listing detail page.",
        },
      ],
    },
    {
      slug: "gateway",
      title: "Gateway model",
      description: "How sources become consumable listings.",
      blocks: [
        {
          type: "paragraph",
          text: "Sources connect to the gateway; we run cleaning, quality control, error handling, and topology steps before publishing a listing. Consumers only see the published edge—not upstream variance.",
        },
        {
          type: "list",
          items: [
            "Cleaning and schema alignment at ingress.",
            "Quality control and error quarantine.",
            "Standard topology with optional custom paths via EDGE Data Services.",
          ],
        },
      ],
    },
    {
      slug: "refreshes",
      title: "Refreshes & topology",
      description: "Schedules, backfills, and load patterns we operate.",
      blocks: [
        {
          type: "paragraph",
          text: "Refreshes are scheduled per listing and surfaced in the catalog. Topology defines how data moves from sources through the gateway into warehouses and out to APIs and files. Changes are applied by the operations team—you consume the updated listing when the refresh completes.",
        },
      ],
    },
  ],
} satisfies DocumentationConfig;
