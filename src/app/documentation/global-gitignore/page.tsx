import type { Metadata } from "next";

import {
  DocumentationPageView,
  documentationPageMetadata,
} from "@/lib/documentation-page";

const slug = "global-gitignore";

export const dynamic = "force-static";

export const metadata: Metadata = documentationPageMetadata(slug);

export default async function DocumentationGlobalGitignorePage() {
  return <DocumentationPageView slug={slug} />;
}
