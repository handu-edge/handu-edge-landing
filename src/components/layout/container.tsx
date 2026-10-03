import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-10",
        siteConfig.layout.containerMaxWidth,
        className,
      )}
    >
      {children}
    </div>
  );
}
