"use client";

import { useRef } from "react";

import { resolveIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type ThemeChoice = {
  id: string;
  label: string;
  leading?: React.ReactNode;
  style?: React.CSSProperties;
};

type ThemeChoiceGroupProps = {
  label: string;
  value: string;
  options: readonly ThemeChoice[];
  onChange: (id: string) => void;
};

export function ThemeChoiceGroup({
  label,
  value,
  options,
  onChange,
}: ThemeChoiceGroupProps) {
  const labelId = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const Check = resolveIcon("check");

  function select(index: number) {
    const option = options[index];
    if (!option) {
      return;
    }
    onChange(option.id);
    buttons.current[index]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const current = options.findIndex((option) => option.id === value);
    if (current < 0) {
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      select((current + 1) % options.length);
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      select((current - 1 + options.length) % options.length);
    }
  }

  return (
    <div className="grid gap-1">
      <p id={labelId} className="px-2 text-xs font-medium text-muted-foreground">
        {label}
      </p>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        onKeyDown={onKeyDown}
        className="grid gap-0.5"
      >
        {options.map((option, index) => {
          const selected = option.id === value;
          return (
            <button
              key={option.id}
              ref={(node) => {
                buttons.current[index] = node;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              style={option.style}
              onClick={() => onChange(option.id)}
              className={cn(
                "focus-ring flex min-h-11 items-center gap-3 rounded-md px-2 text-left text-sm transition-colors",
                selected
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
              )}
            >
              {option.leading}
              <span className="min-w-0 flex-1">{option.label}</span>
              {selected ? (
                <Check aria-hidden="true" className="size-3.5 text-primary" />
              ) : (
                <span aria-hidden="true" className="size-3.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
