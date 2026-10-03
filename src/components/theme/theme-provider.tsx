"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

import { themeConfig, type AccentId, type ThemeModeId } from "@/config/theme";
import { typographyConfig, type FontId } from "@/config/typography";
import {
  applyTheme,
  clearStoredPreferences,
  persistPreference,
  readStoredPreferences,
  type ThemePreference,
} from "@/lib/theme/utils";

type ThemeContextValue = ThemePreference & {
  setMode: (mode: ThemeModeId) => void;
  setAccent: (accent: AccentId) => void;
  setFont: (font: FontId) => void;
  reset: () => void;
};

const serverPreference: ThemePreference = {
  mode: themeConfig.defaultMode,
  accent: themeConfig.defaultAccent,
  font: typographyConfig.defaultFont,
};

let currentPreference = serverPreference;
let hasReadStorage = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getServerSnapshot(): ThemePreference {
  return serverPreference;
}

function getClientSnapshot(): ThemePreference {
  if (!hasReadStorage) {
    hasReadStorage = true;
    currentPreference = readStoredPreferences();
  }
  return currentPreference;
}

function publish(next: ThemePreference) {
  currentPreference = next;
  hasReadStorage = true;
  listeners.forEach((listener) => listener());
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const preference = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  useLayoutEffect(() => {
    applyTheme(preference);
  }, [preference]);

  useEffect(() => {
    if (preference.mode !== "system") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme(preference);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [preference]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      ...preference,
      setMode: (mode) => {
        persistPreference("mode", mode);
        publish({ ...currentPreference, mode });
      },
      setAccent: (accent) => {
        persistPreference("accent", accent);
        publish({ ...currentPreference, accent });
      },
      setFont: (font) => {
        persistPreference("font", font);
        publish({ ...currentPreference, font });
      },
      reset: () => {
        clearStoredPreferences();
        publish(serverPreference);
      },
    }),
    [preference],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
