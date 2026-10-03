import { Logo } from "@/components/branding/logo";
import { Container } from "@/components/layout/container";
import { ActiveNavProvider } from "@/components/navigation/active-nav-provider";
import { CtaLink } from "@/components/navigation/cta-link";
import { MobileNavigation } from "@/components/navigation/mobile-navigation";
import { NavMainLinks } from "@/components/navigation/nav-main-links";
import { ThemeSettings } from "@/components/theme/theme-settings";
import { navigationConfig, siteConfig } from "@/config";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/72 backdrop-blur-2xl">
      <ActiveNavProvider>
        <Container
          className={cn(
            "flex items-center gap-3",
            siteConfig.layout.headerBarHeightClass,
          )}
        >
          <div className="flex min-h-0 min-w-0 flex-1 items-center gap-4 lg:gap-6">
            <a
              href={siteConfig.homeHref}
              className="focus-ring flex shrink-0 items-center self-stretch rounded-none py-2"
            >
              <Logo variant="header" />
            </a>
            <nav
              aria-label={navigationConfig.menuLabel}
              className="hidden min-w-0 flex-1 items-center gap-0.5 self-stretch overflow-hidden lg:flex"
            >
              <NavMainLinks variant="desktop" />
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <ThemeSettings />
            <CtaLink
              cta={navigationConfig.actions.workspace}
              className="hidden lg:inline-flex"
            />
            <MobileNavigation />
          </div>
        </Container>
      </ActiveNavProvider>
    </header>
  );
}
