"use client";

import { Menu } from "lucide-react";

import { CtaLink } from "@/components/navigation/cta-link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavMainLinks } from "@/components/navigation/nav-main-links";
import { brandConfig, navigationConfig } from "@/config";

export function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-12 lg:hidden"
          aria-label={navigationConfig.openMenuLabel}
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-sm"
      >
        <SheetHeader className="space-y-1 border-b border-border px-6 py-5 text-left">
          <SheetTitle>{brandConfig.name}</SheetTitle>
          <SheetDescription>{brandConfig.tagline}</SheetDescription>
        </SheetHeader>

        <div className="border-b border-border px-6 py-5">
          <CtaLink
            cta={navigationConfig.actions.workspace}
            className="w-full justify-center"
          />
        </div>

        <nav
          aria-label={navigationConfig.menuLabel}
          className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-5"
        >
          <NavMainLinks variant="mobile" />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
