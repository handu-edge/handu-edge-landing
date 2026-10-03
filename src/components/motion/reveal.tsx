"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type RevealProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  delay?: number;
  fade?: boolean;
  stagger?: boolean;
  style?: CSSProperties;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Reveal<T extends ElementType = "div">({
  as,
  children,
  className,
  delay = 0,
  fade = false,
  stagger = false,
  style,
}: RevealProps<T>) {
  const Component = as ?? "div";
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return createElement(
    Component,
    {
      ref,
      className: cn(
        !stagger && "landing-reveal",
        !stagger && fade && "landing-reveal-fade",
        !stagger && visible && "landing-reveal-visible",
        stagger && visible && "landing-stagger-visible",
        className,
      ),
      style: {
        ...style,
        ...(!stagger
          ? ({ "--landing-reveal-delay": `${delay}ms` } as CSSProperties)
          : undefined),
      },
    },
    children,
  );
}

export function RevealStaggerItem({
  index,
  className,
  children,
  as = "div",
}: {
  index: number;
  className?: string;
  children: ReactNode;
  as?: ElementType;
}) {
  return createElement(
    as,
    {
      className: cn("landing-stagger-item", className),
      style: { "--landing-stagger-index": index } as CSSProperties,
    },
    children,
  );
}
