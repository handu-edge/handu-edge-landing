import { DocBlocks } from "@/components/documentation/doc-blocks";
import type { DocPageConfig } from "@/types/config";

export function DocsArticle({ page }: { page: DocPageConfig }) {
  return (
    <article>
      <header className="max-w-3xl border-b border-border pb-8">
        <h1 className="type-headline font-semibold text-foreground">
          {page.title}
        </h1>
        <p className="type-body mt-4 text-muted-foreground">{page.description}</p>
      </header>
      <div className="mt-10 max-w-3xl">
        <DocBlocks blocks={page.blocks} />
      </div>
    </article>
  );
}
