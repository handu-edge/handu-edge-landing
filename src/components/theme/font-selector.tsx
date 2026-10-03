"use client";

import { themeConfig, typographyConfig } from "@/config";
import { isFontId } from "@/lib/theme/utils";
import { useTheme } from "@/components/theme/theme-provider";
import { ThemeChoiceGroup } from "@/components/theme/theme-choice";

export function FontSelector() {
  const { font, setFont } = useTheme();

  return (
    <ThemeChoiceGroup
      label={themeConfig.settings.groups.font}
      value={font}
      onChange={(id) => {
        if (isFontId(id)) {
          setFont(id);
        }
      }}
      options={Object.entries(typographyConfig.fonts).map(([id, item]) => ({
        id,
        label: item.label,
        style: { fontFamily: `var(${item.cssVariable}), sans-serif` },
      }))}
    />
  );
}
