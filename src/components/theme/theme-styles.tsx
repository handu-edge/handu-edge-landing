import { buildDesignTokenStyles } from "@/lib/theme/styles";

export function ThemeStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{ __html: buildDesignTokenStyles() }}
    />
  );
}
