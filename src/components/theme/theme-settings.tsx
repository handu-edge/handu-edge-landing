"use client";

import { Settings2 } from "lucide-react";

import { AccentSelector } from "@/components/theme/accent-selector";
import { FontSelector } from "@/components/theme/font-selector";
import { ModeSelector } from "@/components/theme/mode-selector";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme/theme-provider";
import { themeConfig, typographyConfig } from "@/config";

export function ThemeSettings() {
  const { settings } = themeConfig;
  const { mode, accent, font, reset } = useTheme();
  const isDefault =
    mode === themeConfig.defaultMode &&
    accent === themeConfig.defaultAccent &&
    font === typographyConfig.defaultFont;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-11"
          aria-label={settings.triggerLabel}
        >
          <Settings2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[min(18.5rem,calc(100vw-1.5rem))] gap-3 p-3"
      >
        <PopoverHeader className="px-2">
          <PopoverTitle>{settings.title}</PopoverTitle>
          <PopoverDescription>{settings.description}</PopoverDescription>
        </PopoverHeader>
        <ModeSelector />
        <Separator />
        <AccentSelector />
        <Separator />
        <FontSelector />
        <Separator />
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full"
          onClick={reset}
          disabled={isDefault}
        >
          {settings.resetLabel}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
