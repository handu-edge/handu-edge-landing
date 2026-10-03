import { readFile } from "node:fs/promises";
import path from "node:path";

import { cache } from "react";

import { fetchGithubMarkdown } from "@/lib/github-markdown";

function localMarkdownPath(slug: string): string {
  return path.join(process.cwd(), "content/documentation", `${slug}.md`);
}

export const loadDocumentationMarkdown = cache(
  async (slug: string, githubPath: string): Promise<string> => {
    try {
      return await readFile(localMarkdownPath(slug), "utf8");
    } catch {
      return fetchGithubMarkdown(githubPath);
    }
  },
);
