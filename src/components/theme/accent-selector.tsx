"use client";

import { themeConfig } from "@/config";
import { isAccentId } from "@/lib/theme/accents";
import { useTheme } from "@/components/theme/theme-provider";
import { ThemeChoiceGroup } from "@/components/theme/theme-choice";

export function AccentSelector() {
  const { accent, setAccent } = useTheme();

  return (
    <ThemeChoiceGroup
      label={themeConfig.settings.groups.accent}
      value={accent}
      onChange={(id) => {
        if (isAccentId(id)) {
          setAccent(id);
        }
      }}
      options={Object.entries(themeConfig.accents).map(([id, item]) => ({
        id,
        label: item.label,
        leading: (
          <span
            aria-hidden="true"
            className="size-2.5 rounded-full border border-border"
            style={{ backgroundColor: item.light.primary }}
          />
        ),
      }))}
    />
  );
}
