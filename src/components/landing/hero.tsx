import { EdgeVisual } from "@/components/landing/edge-visual";
import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { PanelBulletList } from "@/components/layout/panel-bullet-list";
import { CtaLink } from "@/components/navigation/cta-link";
import { landingConfig, siteConfig } from "@/config";
import { cn } from "@/lib/utils";

export function Hero() {
  const { hero, edgeVisual } = landingConfig;
  const showVisual = edgeVisual.enabled;

  return (
    <PageSection
      id={siteConfig.sections.overview}
      tone="muted"
      aria-labelledby="hero-title"
    >
      <Container
        className={cn(
          "grid w-full items-center gap-14 py-16 sm:gap-16 sm:py-20 lg:py-24",
          showVisual &&
            "lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:gap-20",
        )}
      >
        <div className="apple-section-copy-wide max-w-3xl">
          <p className="type-eyebrow text-muted-foreground">{hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="type-display mt-5 font-semibold text-foreground"
          >
            {hero.title}
          </h1>
          <p className="type-body mt-6 text-muted-foreground">
            {hero.description}
          </p>
          <PanelBulletList items={hero.highlights} />
          <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaLink cta={hero.primaryCta} />
            <CtaLink cta={hero.secondaryCta} variant="outline" />
          </div>
        </div>
        {showVisual ? (
          <div className="min-w-0 w-full lg:max-w-none">
            <EdgeVisual />
          </div>
        ) : null}
      </Container>
    </PageSection>
  );
}
