import type { Metadata } from "next";

import { AboutContent } from "@/components/about/about-content";
import { PageShell } from "@/components/layout/page-shell";
import { createAboutMetadata } from "@/lib/seo";

export const metadata: Metadata = createAboutMetadata();

export default function AboutPage() {
  return (
    <PageShell>
      <AboutContent />
    </PageShell>
  );
}
