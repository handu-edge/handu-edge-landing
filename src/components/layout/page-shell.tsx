import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/navigation/header";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function PageShell({
  children,
  mainId = "main",
}: {
  children: React.ReactNode;
  mainId?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col",
        siteConfig.layout.pageShellMinHeightClass,
      )}
    >
      <Header />
      <main
        id={mainId}
        className="flex w-full flex-1 flex-col"
      >
        <div className="flex w-full flex-1 flex-col">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
