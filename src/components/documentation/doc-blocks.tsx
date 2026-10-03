import type { DocContentBlock } from "@/types/config";

export function DocBlocks({ blocks }: { blocks: readonly DocContentBlock[] }) {
  return (
    <div className="docs-prose space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {block.text}
              </p>
            );
          case "heading":
            if (block.level === 2) {
              return (
                <h2
                  key={index}
                  className="type-headline mt-10 text-xl font-semibold text-foreground first:mt-0 sm:text-2xl"
                >
                  {block.text}
                </h2>
              );
            }
            return (
              <h3
                key={index}
                className="mt-8 text-lg font-medium text-foreground first:mt-0"
              >
                {block.text}
              </h3>
            );
          case "list":
            return (
              <ul
                key={index}
                className="list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground sm:text-lg"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre
                key={index}
                className="overflow-x-auto border border-border bg-muted/50 p-4 text-sm leading-relaxed text-foreground"
              >
                <code>{block.text}</code>
              </pre>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
