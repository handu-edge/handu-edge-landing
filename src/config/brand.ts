import type { BrandConfig } from "@/types/config";

const name = "handuEDGE";

export const brandConfig = {
  name,
  shortName: name,
  tagline: "Enterprise Data Gateway & Exchange",
  logo: {
    type: "wordmark",
    showMark: true,
    showWordmark: true,
  },
  description: `${name} is an enterprise data gateway and exchange. Your teams consume data through APIs and downloads—we handle massaging, wrangling, warehouse operations, refreshes, and load topologies.`,
  year: 2026,
} satisfies BrandConfig;
