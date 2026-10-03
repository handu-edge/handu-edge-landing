import { Container } from "@/components/layout/container";
import { PageMain } from "@/components/layout/page-main";
import { SectionIntro } from "@/components/layout/section-intro";
import { CtaLink } from "@/components/navigation/cta-link";
import { pricingConfig } from "@/config";
import { cn } from "@/lib/utils";

function PricingTierCard({
  tier,
  className,
}: {
  tier: (typeof pricingConfig.tiers)[number];
  className?: string;
}) {
  return (
    <li
      className={cn(
        "apple-card flex flex-col p-7 sm:p-8",
        tier.highlighted && "border-primary ring-1 ring-primary/25",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-medium tracking-tight text-foreground">
          {tier.name}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {tier.description}
        </p>
      </div>
      <p className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-3xl font-semibold tracking-tight text-foreground">
          {tier.price}
        </span>
        {tier.priceNote ? (
          <span className="text-sm text-muted-foreground">{tier.priceNote}</span>
        ) : null}
      </p>
      <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className="text-sm leading-relaxed text-foreground sm:text-base"
          >
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <CtaLink
          cta={tier.cta}
          variant={tier.highlighted ? "default" : "outline"}
          className="w-full justify-center"
        />
      </div>
    </li>
  );
}

export function PricingContent() {
  const { eyebrow, title, description, tiers, customTier } = pricingConfig;

  return (
    <PageMain>
      <Container className="w-full py-16 sm:py-24">
      <SectionIntro
        eyebrow={eyebrow}
        title={title}
        description={description}
        titleId="pricing-title"
        className="mb-12 lg:mb-16"
      />

      <ul className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <PricingTierCard key={tier.id} tier={tier} />
        ))}
      </ul>

      <section
        className="apple-card mt-8 grid gap-8 border-primary/25 bg-primary/5 p-8 sm:p-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-12"
        aria-labelledby="pricing-custom-title"
      >
        <div>
          <p className="type-eyebrow text-muted-foreground">
            {customTier.subtitle}
          </p>
          <h2
            id="pricing-custom-title"
            className="type-headline mt-3 font-semibold text-foreground"
          >
            {customTier.name}
          </h2>
          <p className="type-body mt-4 text-muted-foreground">
            {customTier.description}
          </p>
          <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
            <span className="text-3xl font-semibold tracking-tight text-foreground">
              {customTier.price}
            </span>
            {customTier.priceNote ? (
              <span className="text-sm text-muted-foreground">
                {customTier.priceNote}
              </span>
            ) : null}
          </p>
        </div>
        <div>
          <ul className="space-y-3 border border-border bg-background p-6">
            {customTier.features.map((feature) => (
              <li
                key={feature}
                className="text-sm leading-relaxed text-foreground sm:text-base"
              >
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <CtaLink cta={customTier.cta} className="w-full justify-center" />
          </div>
        </div>
      </section>
      </Container>
    </PageMain>
  );
}
