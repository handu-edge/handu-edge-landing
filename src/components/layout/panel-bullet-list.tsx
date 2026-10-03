import { cn } from "@/lib/utils";

export function PanelBulletList({
  items,
  className,
  itemClassName,
}: {
  items: readonly string[];
  className?: string;
  itemClassName?: string;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className={cn("mt-8 space-y-4", className)}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "flex gap-3 text-base leading-relaxed text-foreground/90",
            itemClassName,
          )}
        >
          <span
            aria-hidden="true"
            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
