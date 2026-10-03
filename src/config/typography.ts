import { fontVariables } from "@/lib/theme/font-variables";
import { defineTypographyConfig } from "@/types/config";

/**
 * Keys listed here appear in the font selector.
 * Each key must also be loaded in src/lib/theme/fonts.ts — next/font
 * requires a static import, so a new family cannot be resolved from
 * this file alone.
 */
export const typographyConfig = defineTypographyConfig({
  defaultFont: "mono",
  fonts: {
    mono: {
      label: "Monospace",
      cssVariable: fontVariables.mono,
    },
    geist: {
      label: "Geist",
      cssVariable: fontVariables.geist,
    },
    inter: {
      label: "Inter",
      cssVariable: fontVariables.inter,
    },
    manrope: {
      label: "Manrope",
      cssVariable: fontVariables.manrope,
    },
  },
  scale: {
    display: {
      size: "clamp(2.875rem, 6.8vw, 5.25rem)",
      leading: "1.04",
      tracking: "-0.04em",
    },
    headline: {
      size: "clamp(2.125rem, 3.8vw, 3.25rem)",
      leading: "1.08",
      tracking: "-0.032em",
    },
    body: {
      size: "1.1875rem",
      leading: "1.65",
      tracking: "-0.011em",
    },
    label: {
      size: "0.8125rem",
      leading: "1.45",
      tracking: "0.08em",
    },
  },
});

export type FontId = keyof typeof typographyConfig.fonts;
