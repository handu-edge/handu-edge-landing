import type { Metadata } from "next";

import { PricingContent } from "@/components/pricing/pricing-content";
import { PageShell } from "@/components/layout/page-shell";
import { createPricingMetadata } from "@/lib/seo";

export const metadata: Metadata = createPricingMetadata();

export default function PricingPage() {
  return (
    <PageShell>
      <PricingContent />
    </PageShell>
  );
}
