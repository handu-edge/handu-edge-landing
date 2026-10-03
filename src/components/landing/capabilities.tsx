import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { SectionIntro } from "@/components/layout/section-intro";
import { Reveal, RevealStaggerItem } from "@/components/motion/reveal";
import { landingConfig } from "@/config";
import { resolveIcon } from "@/lib/icons";

export function Capabilities() {
  const section = landingConfig.capabilities;
  const titleId = `${section.id}-title`;

  return (
    <PageSection
      id={section.id}
      tone="muted"
      aria-labelledby={titleId}
    >
      <Container className="w-full py-16 sm:py-20 lg:py-28">
        <Reveal className="mb-14 lg:mb-20">
          <SectionIntro
            align="center"
            eyebrow="Capabilities"
            title={section.title}
            description={section.description}
            titleId={titleId}
          />
        </Reveal>
        <Reveal
          as="ul"
          stagger
          className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
        >
          {section.items.map((item, index) => {
            const Icon = resolveIcon(item.icon);
            return (
              <RevealStaggerItem
                key={item.title}
                as="li"
                index={index}
                className="apple-card flex flex-col p-7 sm:p-8"
              >
                <Icon
                  aria-hidden="true"
                  className="size-6 text-primary"
                  strokeWidth={1.5}
                />
                <h3 className="mt-6 text-lg font-medium tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.description}
                </p>
              </RevealStaggerItem>
            );
          })}
        </Reveal>
      </Container>
    </PageSection>
  );
}
