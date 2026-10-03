import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocsArticle } from "@/components/documentation/docs-article";
import {
  getDocumentationPage,
  getDocumentationSlugs,
} from "@/lib/documentation";
import { createDocumentationPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getDocumentationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getDocumentationPage(slug);
  if (!page) {
    return {};
  }
  return createDocumentationPageMetadata(page);
}

export default async function DocumentationSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getDocumentationPage(slug);

  if (!page) {
    notFound();
  }

  return <DocsArticle page={page} />;
}
