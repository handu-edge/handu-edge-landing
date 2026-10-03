import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { PanelBulletList } from "@/components/layout/panel-bullet-list";
import { SectionIntro } from "@/components/layout/section-intro";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/navigation/cta-link";
import { landingConfig } from "@/config";

export function FinalCta() {
  const section = landingConfig.finalCta;
  const titleId = "closing-title";

  return (
    <PageSection id={section.id} aria-labelledby={titleId}>
      <Container className="w-full py-12 sm:py-16">
        <Reveal>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 sm:p-10 lg:p-12">
            <SectionIntro
              eyebrow={section.eyebrow}
              title={section.title}
              description={section.description}
              titleId={titleId}
              className="max-w-3xl"
            />
            <PanelBulletList items={section.points} className="max-w-2xl" />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaLink cta={section.button} />
            </div>
          </div>
        </Reveal>
      </Container>
    </PageSection>
  );
}
