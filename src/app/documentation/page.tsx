import { redirect } from "next/navigation";

import { documentationConfig } from "@/config";
import { documentationPagePath } from "@/lib/documentation";

export default function DocumentationIndexPage() {
  redirect(documentationPagePath(documentationConfig.defaultSlug));
}
