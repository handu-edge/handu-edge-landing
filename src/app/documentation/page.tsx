import type { Metadata } from "next";

import {
  DocumentationPageView,
  documentationPageMetadata,
} from "@/lib/documentation-page";
import { getDefaultDocumentationSlug } from "@/lib/documentation";
import { createDocumentationMetadata } from "@/lib/seo";

export const dynamic = "force-static";

const defaultSlug = getDefaultDocumentationSlug();

export const metadata: Metadata = {
  ...createDocumentationMetadata(),
  ...documentationPageMetadata(defaultSlug),
};

export default async function DocumentationIndexPage() {
  return <DocumentationPageView slug={defaultSlug} />;
}
