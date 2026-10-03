import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeStyles } from "@/components/theme/theme-styles";
import { themeConfig, typographyConfig } from "@/config";
import { createThemeBootScript } from "@/lib/theme/boot-script";
import { fontVariableClassName } from "@/lib/theme/fonts";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

import "./globals.css";

export const metadata: Metadata = createMetadata();

const themeBootScript = createThemeBootScript();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      data-accent={themeConfig.defaultAccent}
      data-font={typographyConfig.defaultFont}
      data-radius={themeConfig.radius}
      data-mode={themeConfig.defaultMode}
      className={cn(fontVariableClassName, "h-full antialiased")}
    >
      <head>
        <ThemeStyles />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="flex min-h-dvh w-full flex-col overflow-x-clip bg-background text-foreground">
        <a
          href="#main"
          className="focus-ring sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-background focus:px-4 focus:py-3 focus:text-sm focus:text-foreground"
        >
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
