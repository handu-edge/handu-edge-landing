import { DocsMarkdown } from "@/components/documentation/docs-markdown";
import type { DocumentationRemotePage } from "@/types/config";

export function DocsArticle({
  page,
  markdown,
}: {
  page: DocumentationRemotePage;
  markdown: string;
}) {
  return (
    <article className="w-full max-w-3xl">
      <header className="border-b border-border pb-8">
        <h1 className="type-headline font-semibold text-foreground">
          {page.title}
        </h1>
        <p className="type-body mt-4 text-muted-foreground">
          {page.description}
        </p>
      </header>
      <DocsMarkdown content={markdown} />
    </article>
  );
}
