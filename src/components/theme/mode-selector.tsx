"use client";

import { themeConfig } from "@/config";
import { resolveIcon } from "@/lib/icons";
import { useTheme } from "@/components/theme/theme-provider";
import { ThemeChoiceGroup } from "@/components/theme/theme-choice";

export function ModeSelector() {
  const { mode, setMode } = useTheme();

  return (
    <ThemeChoiceGroup
      label={themeConfig.settings.groups.mode}
      value={mode}
      onChange={(id) => {
        const next = themeConfig.modes.find((item) => item.id === id);
        if (next) {
          setMode(next.id);
        }
      }}
      options={themeConfig.modes.map((item) => {
        const Icon = resolveIcon(item.icon);
        return {
          id: item.id,
          label: item.label,
          leading: <Icon aria-hidden="true" className="size-4" />,
        };
      })}
    />
  );
}
