import type { Metadata } from "next";

import {
  DocumentationPageView,
  documentationPageMetadata,
} from "@/lib/documentation-page";
import {
  getDefaultDocumentationSlug,
  getDocumentationSlugs,
} from "@/lib/documentation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const defaultSlug = getDefaultDocumentationSlug();

/** Static routes under `app/documentation/<slug>/page.tsx` take precedence. */
const STATIC_DOC_SLUGS = new Set(["global-gitignore"]);

export function generateStaticParams() {
  return getDocumentationSlugs()
    .filter((slug) => slug !== defaultSlug && !STATIC_DOC_SLUGS.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return documentationPageMetadata(slug);
}

export default async function DocumentationSlugPage({ params }: PageProps) {
  const { slug } = await params;
  return <DocumentationPageView slug={slug} />;
}
