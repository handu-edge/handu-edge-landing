import { Logo } from "@/components/branding/logo";
import { Container } from "@/components/layout/container";
import { CtaLink } from "@/components/navigation/cta-link";
import { brandConfig, footerConfig, siteConfig } from "@/config";
import { resolveIcon } from "@/lib/icons";
import { linkOpensNewTab } from "@/lib/theme/utils";
import type { LinkConfig } from "@/types/config";

function FooterLink({ link }: { link: LinkConfig }) {
  const external = linkOpensNewTab(link);

  return (
    <a
      href={link.href}
      className="focus-ring inline-flex min-h-10 items-center text-base text-muted-foreground transition-colors hover:text-foreground"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {link.label}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

export function Footer() {
  const {
    primaryCta,
    secondaryCta,
    getStartedNote,
    statement,
    columns,
    legal,
    social,
  } = footerConfig;

  return (
    <footer className="border-t-2 border-primary/30 bg-background">
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16 lg:items-start">
          <div className="max-w-xl">
            <a
              href={siteConfig.homeHref}
              className="focus-ring inline-flex rounded-none"
            >
              <Logo variant="header" />
            </a>
            <p className="type-eyebrow mt-5 text-muted-foreground">
              {brandConfig.tagline}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {brandConfig.description}
            </p>
            {social.length > 0 ? (
              <ul className="mt-8 flex flex-wrap gap-1 border border-border p-2">
                {social.map((item) => {
                  const Icon = resolveIcon(item.icon);
                  const external = linkOpensNewTab(item);
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        aria-label={item.label}
                        className="focus-ring inline-flex size-11 items-center justify-center rounded-none text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        <Icon aria-hidden="true" className="size-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>

          <div className="apple-card flex flex-col gap-6 border-primary/20 bg-muted/40 p-6 sm:p-8">
            <div>
              <p className="type-label text-foreground">Get started</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {getStartedNote}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CtaLink cta={primaryCta} className="sm:flex-1 sm:justify-center" />
              <CtaLink
                cta={secondaryCta}
                variant="outline"
                className="sm:flex-1 sm:justify-center"
              />
            </div>
          </div>
        </div>

        <div
          className="mt-14 grid gap-10 border-t border-border pt-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8"
        >
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="type-label text-foreground">{column.title}</p>
              <ul className="mt-4 space-y-1">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="sm:col-span-2 lg:col-span-2">
            <p className="type-label text-foreground">handuEDGE</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {statement}
            </p>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            © {brandConfig.year} {brandConfig.name}. All rights reserved.
          </p>
          {legal.length > 0 ? (
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legal.map((link) => (
                <li key={link.label}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
