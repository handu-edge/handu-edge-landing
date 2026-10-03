import { themeConfig } from "@/config/theme";
import { typographyConfig } from "@/config/typography";
import type { TypeScaleStep } from "@/types/config";
import type { AccentDefinition } from "@/types/theme";

function assertTokenId(value: string): string {
  if (!/^[a-z0-9-]+$/.test(value)) {
    throw new Error(`Unsupported theme token id: ${value}`);
  }
  return value;
}

function accentRule(
  id: string,
  scheme: "light" | "dark",
  tokens: AccentDefinition["light"],
): string {
  const selector =
    scheme === "dark"
      ? `.dark[data-accent="${id}"]`
      : `[data-accent="${id}"]`;

  return `${selector}{--primary:${tokens.primary};--primary-foreground:${tokens.primaryForeground};--ring:${tokens.ring};}`;
}

function scaleVariables(name: string, step: TypeScaleStep): string {
  return `--type-${name}-size:${step.size};--type-${name}-leading:${step.leading};--type-${name}-tracking:${step.tracking};`;
}

export function buildDesignTokenStyles(): string {
  const accentRules = Object.entries(themeConfig.accents).flatMap(
    ([id, definition]) => {
      const token = assertTokenId(id);
      return [
        accentRule(token, "light", definition.light),
        accentRule(token, "dark", definition.dark),
      ];
    },
  );

  const radiusRules = Object.entries(themeConfig.radii).map(([id, value]) => {
    return `[data-radius="${assertTokenId(id)}"]{--radius:${value};}`;
  });

  const fontRules = Object.entries(typographyConfig.fonts).map(
    ([id, font]) => {
      return `[data-font="${assertTokenId(id)}"]{--font-active:var(${font.cssVariable});}`;
    },
  );

  const scale = `:root{${scaleVariables("display", typographyConfig.scale.display)}${scaleVariables("headline", typographyConfig.scale.headline)}${scaleVariables("body", typographyConfig.scale.body)}${scaleVariables("label", typographyConfig.scale.label)}}`;

  return [...accentRules, ...radiusRules, ...fontRules, scale].join("");
}
