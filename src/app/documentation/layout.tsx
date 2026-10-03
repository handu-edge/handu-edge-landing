import { DocsShell } from "@/components/documentation/docs-shell";
import { PageMain } from "@/components/layout/page-main";
import { PageShell } from "@/components/layout/page-shell";

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageShell>
      <PageMain>
        <DocsShell>{children}</DocsShell>
      </PageMain>
    </PageShell>
  );
}
