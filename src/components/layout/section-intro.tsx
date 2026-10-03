import { cn } from "@/lib/utils";

export function SectionIntro({
  eyebrow,
  title,
  description,
  detail,
  titleId,
  align = "start",
  className,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  detail?: string;
  titleId?: string;
  align?: "start" | "center";
  className?: string;
}) {
  if (!eyebrow && !title && !description && !detail) {
    return null;
  }

  return (
    <header
      className={cn(
        "apple-section-copy-wide",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="type-eyebrow text-muted-foreground">{eyebrow}</p>
      ) : null}
      {title ? (
        <h2
          id={titleId}
          className={cn(
            "type-headline font-semibold text-foreground",
            eyebrow ? "mt-4" : undefined,
          )}
        >
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className="type-body mt-5 text-muted-foreground">{description}</p>
      ) : null}
      {detail ? (
        <p className="type-body mt-5 text-foreground/85">{detail}</p>
      ) : null}
    </header>
  );
}
