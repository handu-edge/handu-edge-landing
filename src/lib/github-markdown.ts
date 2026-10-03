import { cache } from "react";

import { documentationConfig } from "@/config/documentation";

function rawGitHubUrl(filePath: string): string {
  const { owner, repo, branch } = documentationConfig.github;
  const normalized = filePath.replace(/^\//, "");
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${normalized}`;
}

export const fetchGithubMarkdown = cache(async (filePath: string): Promise<string> => {
  const response = await fetch(rawGitHubUrl(filePath), {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to load markdown from GitHub (${response.status}): ${filePath}`,
    );
  }

  return response.text();
});
