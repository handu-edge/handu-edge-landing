import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { linkOpensNewTab } from "@/lib/theme/utils";
import { cn } from "@/lib/utils";
import type { LinkConfig } from "@/types/config";

type CtaLinkProps = {
  cta: LinkConfig;
  variant?: "default" | "outline";
  className?: string;
};

export function CtaLink({
  cta,
  variant = "default",
  className,
}: CtaLinkProps) {
  const external = linkOpensNewTab(cta);

  return (
    <Button
      asChild
      variant={variant}
      className={cn("apple-cta rounded-none", className)}
    >
      <a
        href={cta.href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {cta.label}
        {external ? (
          <>
            <ArrowUpRight aria-hidden="true" data-icon="inline-end" />
            <span className="sr-only"> (opens in a new tab)</span>
          </>
        ) : null}
      </a>
    </Button>
  );
}
