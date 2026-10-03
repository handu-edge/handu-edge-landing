"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { siteConfig } from "@/config/site";
import {
  homeNavSectionIds,
  homeSupplementalSectionIds,
  isHomeSectionKey,
} from "@/lib/nav-item-key";

const HEADER_SCROLL_OFFSET = 88;
function sectionFromHash(): string | null {
  const hash = window.location.hash.replace(/^#/, "");
  return hash && isHomeSectionKey(hash) ? hash : null;
}

function navKeyForSectionId(sectionId: string): string | null {
  if ((homeNavSectionIds as readonly string[]).includes(sectionId)) {
    return sectionId;
  }
  if ((homeSupplementalSectionIds as readonly string[]).includes(sectionId)) {
    return siteConfig.sections.capabilities;
  }
  return null;
}

function isInSupplementalZone(scrollLine: number): boolean {
  for (const id of homeSupplementalSectionIds) {
    const element = document.getElementById(id);
    if (element && scrollLine >= element.offsetTop - 4) {
      return true;
    }
  }
  return false;
}

function resolveSectionFromScroll(): string | null {
  const navSections = homeNavSectionIds
    .map((id) => document.getElementById(id))
    .filter((element): element is HTMLElement => element !== null);

  if (navSections.length === 0) {
    return null;
  }

  const scrollLine = window.scrollY + HEADER_SCROLL_OFFSET;

  if (isInSupplementalZone(scrollLine)) {
    return siteConfig.sections.capabilities;
  }

  let active: string | null = navSections[0]?.id ?? null;

  for (const section of navSections) {
    const sectionTop = section.offsetTop;
    if (scrollLine >= sectionTop - 4) {
      active = section.id;
    }
  }

  return active;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToHomeSectionElement(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (!element) {
    return;
  }
  element.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}

function updateHomeHash(sectionId: string): void {
  const next = `${siteConfig.homeHref}#${sectionId}`;
  if (`${window.location.pathname}${window.location.hash}` !== next) {
    window.history.pushState(null, "", next);
  }
}

export function useActiveNav() {
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const pendingHomeNavKeyRef = useRef<string | null>(null);
  const activeKeyRef = useRef<string | null>(null);

  const setActiveKeyStable = useCallback((key: string | null) => {
    if (key === activeKeyRef.current) {
      return;
    }
    activeKeyRef.current = key;
    setActiveKey(key);
  }, []);

  const releasePendingHomeNav = useCallback(() => {
    pendingHomeNavKeyRef.current = null;
    setActiveKeyStable(
      resolveSectionFromScroll() ?? homeNavSectionIds[0] ?? null,
    );
  }, [setActiveKeyStable]);

  const lockPendingHomeNav = useCallback(
    (navKey: string) => {
      pendingHomeNavKeyRef.current = navKey;
      setActiveKeyStable(navKey);

      const onScrollEnd = () => {
        releasePendingHomeNav();
      };

      if (typeof window.onscrollend !== "undefined") {
        window.addEventListener("scrollend", onScrollEnd, { once: true });
      } else {
        globalThis.setTimeout(() => {
          releasePendingHomeNav();
        }, 900);
      }
    },
    [releasePendingHomeNav, setActiveKeyStable],
  );

  const navigateToHomeSection = useCallback(
    (sectionId: string) => {
      const navKey = navKeyForSectionId(sectionId);
      if (!navKey) {
        return;
      }

      updateHomeHash(sectionId);
      lockPendingHomeNav(navKey);
      scrollToHomeSectionElement(sectionId);
    },
    [lockPendingHomeNav],
  );

  const resolveHomeActiveKey = useCallback((): string | null => {
    const pending = pendingHomeNavKeyRef.current;
    if (pending) {
      return pending;
    }
    return resolveSectionFromScroll();
  }, []);

  const syncActive = useCallback(() => {
    if (pathname === siteConfig.pricingPath) {
      pendingHomeNavKeyRef.current = null;
      setActiveKeyStable(siteConfig.pricingPath);
      return;
    }

    if (pathname.startsWith(`${siteConfig.documentationPath}/`)) {
      pendingHomeNavKeyRef.current = null;
      setActiveKeyStable(pathname);
      return;
    }

    if (pathname === siteConfig.documentationPath) {
      pendingHomeNavKeyRef.current = null;
      setActiveKeyStable(siteConfig.documentationPath);
      return;
    }

    if (pathname === siteConfig.aboutPath) {
      pendingHomeNavKeyRef.current = null;
      setActiveKeyStable(siteConfig.aboutPath);
      return;
    }

    if (pathname !== siteConfig.homeHref) {
      pendingHomeNavKeyRef.current = null;
      setActiveKeyStable(null);
      return;
    }

    if (pendingHomeNavKeyRef.current) {
      setActiveKeyStable(pendingHomeNavKeyRef.current);
      return;
    }

    const fromHash = sectionFromHash();
    if (fromHash) {
      const navKey = navKeyForSectionId(fromHash);
      if (navKey) {
        setActiveKeyStable(navKey);
        return;
      }
    }

    setActiveKeyStable(resolveHomeActiveKey() ?? homeNavSectionIds[0] ?? null);
  }, [pathname, resolveHomeActiveKey, setActiveKeyStable]);

  useEffect(() => {
    syncActive();

    const onScroll = () => {
      if (pathname !== siteConfig.homeHref) {
        return;
      }

      const pending = pendingHomeNavKeyRef.current;
      if (pending) {
        setActiveKeyStable(pending);
        return;
      }

      setActiveKeyStable(
        resolveSectionFromScroll() ?? homeNavSectionIds[0] ?? null,
      );
    };

    const onHashChange = () => {
      const fromHash = sectionFromHash();
      if (!fromHash || pathname !== siteConfig.homeHref) {
        syncActive();
        return;
      }

      const navKey = navKeyForSectionId(fromHash);
      if (!navKey) {
        syncActive();
        return;
      }

      lockPendingHomeNav(navKey);
      scrollToHomeSectionElement(fromHash);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [pathname, syncActive, setActiveKeyStable, lockPendingHomeNav]);

  const setActiveFromNavClick = useCallback(
    (key: string) => {
      if ((homeNavSectionIds as readonly string[]).includes(key)) {
        pendingHomeNavKeyRef.current = key;
        setActiveKeyStable(key);
        return;
      }
      pendingHomeNavKeyRef.current = null;
      setActiveKeyStable(key);
    },
    [setActiveKeyStable],
  );

  return { activeKey, setActiveFromNavClick, navigateToHomeSection };
}
