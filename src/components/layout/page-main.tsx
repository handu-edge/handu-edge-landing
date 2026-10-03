import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Fills the main column below the header on single-panel routes. */
export function PageMain({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col",
        siteConfig.layout.sectionMinHeight,
        className,
      )}
    >
      {children}
    </div>
  );
}
