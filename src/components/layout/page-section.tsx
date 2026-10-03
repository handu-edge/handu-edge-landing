import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export type PageSectionTone = "default" | "muted";

export function PageSection({
  className,
  tone = "default",
  children,
  ...props
}: React.ComponentProps<"section"> & {
  tone?: PageSectionTone;
}) {
  return (
    <section
      className={cn(
        "flex w-full flex-col justify-center border-b border-border/50",
        siteConfig.layout.scrollMarginTopClass,
        siteConfig.layout.sectionMinHeight,
        tone === "muted" && "apple-surface-muted",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
