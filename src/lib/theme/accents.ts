import { themeConfig, type AccentId } from "@/config/theme";
import type { AccentDefinition } from "@/types/theme";

export function listAccents(): { id: AccentId; accent: AccentDefinition }[] {
  return Object.entries(themeConfig.accents).map(([id, accent]) => ({
    id: id as AccentId,
    accent,
  }));
}

export function isAccentId(value: string | null): value is AccentId {
  return value !== null && value in themeConfig.accents;
}

export function getAccent(id: AccentId): AccentDefinition {
  return themeConfig.accents[id];
}
