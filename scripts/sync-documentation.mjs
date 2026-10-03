import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Keep in sync with src/config/documentation.ts */
const github = {
  owner: "github",
  repo: "gitignore",
  branch: "main",
};

const pages = [
  { slug: "documentation", path: "README.md" },
  { slug: "global-gitignore", path: "Global/README.md" },
];

function rawUrl(filePath) {
  const normalized = filePath.replace(/^\//, "");
  return `https://raw.githubusercontent.com/${github.owner}/${github.repo}/${github.branch}/${normalized}`;
}

async function main() {
  const outDir = path.join(root, "content/documentation");
  await mkdir(outDir, { recursive: true });

  for (const page of pages) {
    const response = await fetch(rawUrl(page.path));
    if (!response.ok) {
      throw new Error(`Failed to fetch ${page.path}: ${response.status}`);
    }
    const markdown = await response.text();
    const outFile = path.join(outDir, `${page.slug}.md`);
    await writeFile(outFile, markdown, "utf8");
    console.log(`Wrote ${outFile}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
