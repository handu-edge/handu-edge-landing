import { Capabilities } from "@/components/landing/capabilities";
import { Hero } from "@/components/landing/hero";
import {
  PlatformSection,
  SupplementalPlatformSections,
} from "@/components/landing/platform-sections";
import { PageShell } from "@/components/layout/page-shell";
import { landingConfig } from "@/config";

export default function HomePage() {
  return (
    <PageShell>
      {landingConfig.hero.enabled ? <Hero /> : null}
      <PlatformSection />
      {landingConfig.capabilities.enabled ? <Capabilities /> : null}
      <SupplementalPlatformSections />
    </PageShell>
  );
}
