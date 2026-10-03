import { isAccentId } from "@/lib/theme/accents";
import { themeConfig, type AccentId, type ThemeModeId } from "@/config/theme";
import { typographyConfig, type FontId } from "@/config/typography";
import type { LinkConfig } from "@/types/config";

export function isFontId(value: string | null): value is FontId {
  return value !== null && value in typographyConfig.fonts;
}

export type ThemePreference = {
  mode: ThemeModeId;
  accent: AccentId;
  font: FontId;
};

export function isThemeMode(value: string | null): value is ThemeModeId {
  return themeConfig.modes.some((mode) => mode.id === value);
}

export function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function linkOpensNewTab(link: LinkConfig): boolean {
  return link.external ?? isExternalHref(link.href);
}

export function readStoredPreferences(): ThemePreference {
  const fallback: ThemePreference = {
    mode: themeConfig.defaultMode,
    accent: themeConfig.defaultAccent,
    font: typographyConfig.defaultFont,
  };

  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const mode = localStorage.getItem(themeConfig.storageKeys.mode);
    const accent = localStorage.getItem(themeConfig.storageKeys.accent);
    const font = localStorage.getItem(themeConfig.storageKeys.font);

    return {
      mode: isThemeMode(mode) ? mode : fallback.mode,
      accent: isAccentId(accent) ? accent : fallback.accent,
      font: isFontId(font) ? font : fallback.font,
    };
  } catch {
    return fallback;
  }
}

export function applyTheme(preference: ThemePreference): void {
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark =
    preference.mode === "dark" ||
    (preference.mode === "system" && systemDark);

  root.classList.toggle("dark", dark);
  root.dataset.mode = preference.mode;
  root.dataset.accent = preference.accent;
  root.dataset.font = preference.font;
  root.dataset.radius = themeConfig.radius;
}

export function clearStoredPreferences(): void {
  try {
    localStorage.removeItem(themeConfig.storageKeys.mode);
    localStorage.removeItem(themeConfig.storageKeys.accent);
    localStorage.removeItem(themeConfig.storageKeys.font);
  } catch {
    // The view still returns to the configured defaults.
  }
}

export function persistPreference(
  key: keyof ThemePreference,
  value: string,
): void {
  const storageKey = themeConfig.storageKeys[key];
  try {
    localStorage.setItem(storageKey, value);
  } catch {
    // Preference still applies for this view when storage is unavailable.
  }
}
