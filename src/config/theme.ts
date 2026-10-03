import { defineThemeConfig } from "@/types/theme";

const accent = (
  label: string,
  hue: number,
): {
  label: string;
  light: { primary: string; primaryForeground: string; ring: string };
  dark: { primary: string; primaryForeground: string; ring: string };
} => ({
  label,
  light: {
    primary: `oklch(0.45 0.16 ${hue})`,
    primaryForeground: "oklch(0.985 0.01 264)",
    ring: `oklch(0.45 0.16 ${hue})`,
  },
  dark: {
    primary: `oklch(0.78 0.13 ${hue})`,
    primaryForeground: `oklch(0.22 0.04 ${hue})`,
    ring: `oklch(0.78 0.13 ${hue})`,
  },
});

export const themeConfig = defineThemeConfig({
  defaultMode: "system",
  modes: [
    { id: "light", label: "Light", icon: "sun" },
    { id: "dark", label: "Dark", icon: "moon" },
    { id: "system", label: "System", icon: "monitor" },
  ],
  defaultAccent: "emerald",
  accents: {
    blue: accent("Blue", 264),
    violet: accent("Violet", 300),
    emerald: accent("Emerald", 163),
    orange: accent("Orange", 55),
    rose: accent("Rose", 18),
  },
  radius: "none",
  radii: {
    none: "0rem",
    small: "0.375rem",
    medium: "0.625rem",
    large: "1rem",
  },
  storageKeys: {
    mode: "handuedge.theme.mode",
    accent: "handuedge.theme.accent",
    font: "handuedge.theme.font",
  },
  settings: {
    triggerLabel: "Appearance settings",
    title: "Appearance",
    description: "Mode, accent, and type for this browser.",
    groups: {
      mode: "Appearance",
      accent: "Accent",
      font: "Font",
    },
    resetLabel: "Reset to default",
  },
});

export type ThemeModeId = (typeof themeConfig.modes)[number]["id"];
export type AccentId = keyof typeof themeConfig.accents;
export type RadiusId = keyof typeof themeConfig.radii;
