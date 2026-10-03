import { Container } from "@/components/layout/container";
import { PanelBulletList } from "@/components/layout/panel-bullet-list";
import { PageSection } from "@/components/layout/page-section";
import { SectionIntro } from "@/components/layout/section-intro";
import { Reveal, RevealStaggerItem } from "@/components/motion/reveal";
import { PlatformVisual } from "@/components/visuals/platform-visuals";
import { landingConfig, platformConfig, siteConfig } from "@/config";
import type { PlatformVisualId } from "@/types/config";
import { cn } from "@/lib/utils";

function SplitSection() {
  const { model } = platformConfig;
  const titleId = "platform-split-title";

  return (
    <PageSection
      id={siteConfig.sections.platform}
      aria-labelledby={titleId}
    >
      <Container className="w-full py-16 sm:py-20 lg:py-28">
        <Reveal className="mb-14 lg:mb-20">
          <SectionIntro
            align="center"
            eyebrow={model.eyebrow}
            title={model.title}
            description={model.lead}
            titleId={titleId}
          />
        </Reveal>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal
            stagger
            className="grid gap-5 sm:grid-cols-2 sm:gap-6"
          >
            <RevealStaggerItem
              as="article"
              index={0}
              className="apple-card p-7 sm:p-8"
            >
              <p className="text-lg font-medium tracking-tight text-foreground">
                {model.consume.label}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {model.consume.description}
              </p>
              <PanelBulletList
                items={model.consume.points}
                className="mt-5 space-y-3"
                itemClassName="text-sm text-foreground sm:text-base"
              />
            </RevealStaggerItem>
            <RevealStaggerItem
              as="article"
              index={1}
              className="apple-card border-primary/20 bg-primary/5 p-7 sm:p-8"
            >
              <p className="text-lg font-medium tracking-tight text-foreground">
                {model.operate.label}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {model.operate.description}
              </p>
              <PanelBulletList
                items={model.operate.points}
                className="mt-5 space-y-3"
                itemClassName="text-sm text-foreground sm:text-base"
              />
            </RevealStaggerItem>
          </Reveal>
          <Reveal delay={120} fade className="min-w-0">
            <PlatformVisual
              id={model.visual}
              label={model.visualLabel}
              className="min-w-0"
            />
          </Reveal>
        </div>
      </Container>
    </PageSection>
  );
}

function NarrativeSection({
  sectionId,
  eyebrow,
  title,
  body,
  detail,
  visual,
  visualLabel,
  reverse,
  tone,
  children,
}: {
  sectionId: string;
  eyebrow: string;
  title: string;
  body: string;
  detail?: string;
  visual: PlatformVisualId;
  visualLabel: string;
  reverse?: boolean;
  tone?: "default" | "muted";
  children?: React.ReactNode;
}) {
  const titleId = sectionId;

  return (
    <PageSection id={sectionId} tone={tone} aria-labelledby={titleId}>
      <Container
        className={cn(
          "grid w-full items-center gap-12 py-16 sm:gap-14 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:py-28",
          reverse && "lg:[&>*:first-child]:order-2",
        )}
      >
        <Reveal>
          <SectionIntro
            eyebrow={eyebrow}
            title={title}
            description={body}
            detail={detail}
            titleId={titleId}
          />
          {children}
        </Reveal>
        <Reveal delay={140} fade className="min-w-0">
          <PlatformVisual
            id={visual}
            label={visualLabel}
            className="min-w-0"
          />
        </Reveal>
      </Container>
    </PageSection>
  );
}

export function PlatformSection() {
  const { platform } = landingConfig;
  if (!platform.split.enabled) {
    return null;
  }
  return <SplitSection />;
}

export function SupplementalPlatformSections() {
  const { platform } = landingConfig;
  const { belief, audiences } = platformConfig;

  return (
    <>
      {platform.belief.enabled ? (
        <NarrativeSection
          sectionId={siteConfig.sections.belief}
          eyebrow={belief.eyebrow}
          title={belief.title}
          body={belief.body}
          detail={belief.detail}
          visual={belief.visual}
          visualLabel={belief.visualLabel}
          tone="muted"
        />
      ) : null}
      {platform.audiences.enabled ? (
        <NarrativeSection
          sectionId={siteConfig.sections.audiences}
          eyebrow={audiences.eyebrow}
          title={audiences.title}
          body={audiences.body}
          detail={audiences.detail}
          visual={audiences.visual}
          visualLabel={audiences.visualLabel}
          reverse
        >
          <p className="type-eyebrow mt-10 text-muted-foreground">
            {audiences.domainsLabel}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {audiences.domains.map((domain) => (
              <li key={domain}>
                <span
                  className="inline-flex min-h-10 items-center rounded-none border border-border bg-background px-4 text-sm text-foreground"
                >
                  {domain}
                </span>
              </li>
            ))}
          </ul>
        </NarrativeSection>
      ) : null}
    </>
  );
}
