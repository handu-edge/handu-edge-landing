import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocsArticle } from "@/components/documentation/docs-article";
import {
  getDocumentationPage,
} from "@/lib/documentation";
import { loadDocumentationMarkdown } from "@/lib/documentation-markdown";
import { createDocumentationPageMetadata } from "@/lib/seo";

export function documentationPageMetadata(slug: string): Metadata {
  const page = getDocumentationPage(slug);
  if (!page) {
    return {};
  }
  return createDocumentationPageMetadata(page);
}

export async function DocumentationPageView({ slug }: { slug: string }) {
  const page = getDocumentationPage(slug);

  if (!page) {
    notFound();
  }

  const markdown = await loadDocumentationMarkdown(page.slug, page.path);

  return <DocsArticle page={page} markdown={markdown} />;
}
