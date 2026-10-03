import { Geist, Inter, JetBrains_Mono, Manrope } from "next/font/google";

import type { FontId } from "@/config/typography";
import { fontVariables } from "@/lib/theme/font-variables";

// next/font requires these `variable` values to be string literals.
// They must stay identical to src/lib/theme/font-variables.ts.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  preload: false,
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const loadedVariableNames = {
  geist: "--font-geist",
  inter: "--font-inter",
  manrope: "--font-manrope",
  mono: "--font-mono-jb",
} as const satisfies typeof fontVariables;

export const fontLoaders = {
  geist,
  inter,
  manrope,
  mono,
} satisfies Record<FontId, { variable: string }>;

export const fontVariableClassName = Object.values(fontLoaders)
  .map((font) => font.variable)
  .join(" ");
