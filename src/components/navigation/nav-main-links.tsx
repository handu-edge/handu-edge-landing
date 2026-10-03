"use client";

import { usePathname } from "next/navigation";

import { useActiveNavContext } from "@/components/navigation/active-nav-provider";
import { SheetClose } from "@/components/ui/sheet";
import { navigationConfig, siteConfig } from "@/config";
import { documentationPagePath } from "@/lib/documentation";
import { isHomeSectionKey, navItemKey } from "@/lib/nav-item-key";
import { cn } from "@/lib/utils";
import type { LinkConfig } from "@/types/config";

const desktopExploreClass =
  "apple-nav-link focus-ring inline-flex min-h-12 items-center rounded-none px-2 transition-colors xl:px-3";

const desktopEngageClass =
  "nav-engage-link focus-ring inline-flex min-h-12 items-center rounded-none border border-transparent px-2 transition-colors xl:px-3";

const mobileExploreClass =
  "focus-ring flex min-h-12 items-center rounded-none border border-transparent px-4 py-3 text-xl font-medium text-foreground transition-colors hover:border-border hover:bg-muted/60";

const mobileEngageClass =
  "nav-engage-link focus-ring flex min-h-12 items-center rounded-none border px-4 py-3 text-xl font-medium transition-colors";

type NavMainLinksProps = {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

const quickstartDocPath = documentationPagePath("quickstart");

function isNavItemActive(activeKey: string | null, href: string): boolean {
  const key = navItemKey(href);
  if (activeKey === key) {
    return true;
  }
  if (
    href === quickstartDocPath &&
    activeKey !== null &&
    (activeKey === siteConfig.documentationPath ||
      activeKey.startsWith(`${siteConfig.documentationPath}/`))
  ) {
    return true;
  }
  return false;
}

function NavSeparator({ variant }: { variant: "desktop" | "mobile" }) {
  if (variant === "desktop") {
    return (
      <span
        aria-hidden="true"
        className="mx-0.5 hidden h-7 w-px shrink-0 self-center bg-border lg:block"
      />
    );
  }

  return (
    <div className="px-2 pt-4">
      <p className="type-label mb-2 px-2 text-muted-foreground">
        {navigationConfig.engageMenuLabel}
      </p>
      <div
        role="separator"
        className="h-px w-full bg-border"
        aria-hidden="true"
      />
    </div>
  );
}

function NavLinkItem({
  item,
  variant,
  engage,
  isActive,
  onClick,
}: {
  item: LinkConfig;
  variant: "desktop" | "mobile";
  engage: boolean;
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const className = cn(
    engage
      ? variant === "desktop"
        ? desktopEngageClass
        : mobileEngageClass
      : variant === "desktop"
        ? desktopExploreClass
        : mobileExploreClass,
    engage &&
      (isActive
        ? "nav-engage-link-active border-primary bg-primary/10"
        : "hover:border-primary/35 hover:bg-primary/5"),
    !engage &&
      variant === "mobile" &&
      (isActive
        ? "nav-main-link-active border-primary bg-primary/5 text-foreground"
        : undefined),
    !engage && variant === "desktop" && isActive && "nav-main-link-active",
  );

  const link = (
    <a
      href={item.href}
      className={className}
      aria-current={isActive ? "location" : undefined}
      onClick={onClick}
    >
      {item.label}
    </a>
  );

  if (variant === "mobile") {
    return <SheetClose asChild>{link}</SheetClose>;
  }

  return link;
}

export function NavMainLinks({ variant, onNavigate }: NavMainLinksProps) {
  const pathname = usePathname();
  const { activeKey, setActiveFromNavClick, navigateToHomeSection } =
    useActiveNavContext();

  const renderItem = (item: LinkConfig, engage: boolean) => {
    const key = navItemKey(item.href);
    const isActive = isNavItemActive(activeKey, item.href);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (
        pathname === siteConfig.homeHref &&
        isHomeSectionKey(key) &&
        !engage
      ) {
        event.preventDefault();
        navigateToHomeSection(key);
        onNavigate?.();
        return;
      }

      setActiveFromNavClick(key);
      onNavigate?.();
    };

    return (
      <NavLinkItem
        key={item.href}
        item={item}
        variant={variant}
        engage={engage}
        isActive={isActive}
        onClick={handleClick}
      />
    );
  };

  if (variant === "desktop") {
    return (
      <>
        {navigationConfig.explore.map((item) => renderItem(item, false))}
        <NavSeparator variant="desktop" />
        {navigationConfig.engage.map((item) => renderItem(item, true))}
      </>
    );
  }

  return (
    <>
      {navigationConfig.explore.map((item) => renderItem(item, false))}
      <NavSeparator variant="mobile" />
      {navigationConfig.engage.map((item) => renderItem(item, true))}
    </>
  );
}
