import type { IconName } from "@/lib/icons";

export type ThemeMode = "light" | "dark" | "system";

export type RadiusOption = "none" | "small" | "medium" | "large";

export type AccentTokens = {
  primary: string;
  primaryForeground: string;
  ring: string;
};

export type AccentDefinition = {
  label: string;
  light: AccentTokens;
  dark: AccentTokens;
};

export type ThemeModeDefinition = {
  id: ThemeMode;
  label: string;
  icon: IconName;
};

export type ThemeSettingsCopy = {
  triggerLabel: string;
  title: string;
  description: string;
  groups: {
    mode: string;
    accent: string;
    font: string;
  };
  resetLabel: string;
};

export type ThemeConfig = {
  defaultMode: ThemeMode;
  modes: readonly ThemeModeDefinition[];
  defaultAccent: string;
  accents: Readonly<Record<string, AccentDefinition>>;
  radius: RadiusOption;
  radii: Readonly<Record<RadiusOption, string>>;
  storageKeys: {
    mode: string;
    accent: string;
    font: string;
  };
  settings: ThemeSettingsCopy;
};

export function defineThemeConfig<const T extends ThemeConfig>(
  config: T &
    (T["defaultAccent"] extends keyof T["accents"] ? unknown : never) &
    (T["defaultMode"] extends T["modes"][number]["id"] ? unknown : never) &
    (T["radius"] extends keyof T["radii"] ? unknown : never),
): T {
  return config;
}
