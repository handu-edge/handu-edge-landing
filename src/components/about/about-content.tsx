import { Container } from "@/components/layout/container";
import { PageMain } from "@/components/layout/page-main";
import { CtaLink } from "@/components/navigation/cta-link";
import { aboutConfig, brandConfig } from "@/config";

export function AboutContent() {
  return (
    <PageMain>
      <Container className="w-full py-16 sm:py-24">
        <article className="w-full">
          <p className="type-label text-muted-foreground">{aboutConfig.eyebrow}</p>
          <h1 className="type-headline mt-4 font-medium text-foreground">
            {aboutConfig.title}
          </h1>
          <p className="type-body mt-4 text-muted-foreground">{brandConfig.tagline}</p>
          <p className="type-body mt-6 text-muted-foreground">{aboutConfig.body}</p>
          <div className="mt-10">
            <CtaLink cta={aboutConfig.cta} />
          </div>
        </article>
      </Container>
    </PageMain>
  );
}
