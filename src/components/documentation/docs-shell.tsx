"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

import { DocsSidebarNav } from "@/components/documentation/docs-sidebar-nav";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { documentationConfig, siteConfig } from "@/config";
import { cn } from "@/lib/utils";

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex w-full flex-1 flex-col border-t border-border/50">
      <div
        className={cn(
          "mx-auto flex w-full flex-1 flex-col lg:flex-row",
          siteConfig.layout.containerMaxWidth,
          siteConfig.layout.sectionMinHeight,
        )}
      >
        <aside
          className={cn(
            "hidden shrink-0 border-border lg:block lg:w-72 lg:border-r",
            "lg:sticky lg:top-20 lg:max-h-[calc(100dvh-5rem)] lg:overflow-y-auto",
          )}
        >
          <div className="px-6 py-10 lg:px-8">
            <p className="type-label text-primary">
              {documentationConfig.sidebarLabel}
            </p>
            <div className="mt-6">
              <DocsSidebarNav />
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="mb-8 flex items-center gap-3 border-b border-border pb-6 lg:hidden">
            <Button
              type="button"
              variant="outline"
              className="apple-cta h-11 gap-2 rounded-none px-4"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-4" aria-hidden="true" />
              {documentationConfig.mobileMenuLabel}
            </Button>
          </div>
          {children}
        </main>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-full gap-0 p-0 sm:max-w-xs">
          <SheetHeader className="border-b border-border px-6 py-5 text-left">
            <SheetTitle>{documentationConfig.sidebarLabel}</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto px-4 py-6">
            <DocsSidebarNav onNavigate={() => setMobileOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
