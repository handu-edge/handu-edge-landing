"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { documentationConfig } from "@/config";
import { documentationPagePath } from "@/lib/documentation";
import { cn } from "@/lib/utils";

export function DocsSidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label={documentationConfig.sidebarLabel} className="space-y-8">
      {documentationConfig.sidebar.map((group) => (
        <div key={group.title}>
          <p className="type-label text-foreground">{group.title}</p>
          <ul className="mt-3 space-y-0.5">
            {group.items.map((item) => {
              const href = documentationPagePath(item.slug);
              const isActive = pathname === href;

              return (
                <li key={item.slug}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    className={cn(
                      "focus-ring flex min-h-10 items-center border-l-2 py-2 pl-3 pr-2 text-base transition-colors",
                      isActive
                        ? "border-primary bg-primary/5 font-medium text-foreground"
                        : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/50 hover:text-foreground",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
