import { brandConfig } from "@/config";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-5 shrink-0", className)}
    >
      <path
        d="M8 3.5v17"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 12h5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="16.25" cy="12" r="2.6" className="fill-primary" />
    </svg>
  );
}

export function Logo({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "header";
}) {
  const { logo, name, shortName } = brandConfig;
  const isHeader = variant === "header";

  return (
    <span
      className={cn(
        "inline-flex items-center text-foreground",
        isHeader ? "gap-2.5" : "gap-2",
        className,
      )}
    >
      {logo.showMark ? (
        <LogoMark className={isHeader ? "size-7 sm:size-8" : undefined} />
      ) : null}
      {logo.showWordmark ? (
        <>
          <span
            className={cn(
              "font-semibold tracking-tight",
              isHeader
                ? "text-lg sm:text-xl"
                : "text-[0.95rem] font-medium sm:hidden",
            )}
          >
            {isHeader ? name : shortName}
          </span>
          {!isHeader ? (
            <span className="hidden text-[0.95rem] font-medium tracking-tight sm:inline">
              {name}
            </span>
          ) : null}
        </>
      ) : (
        <span className="sr-only">{name}</span>
      )}
    </span>
  );
}
