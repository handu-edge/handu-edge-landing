import {
  ArrowLeftRight,
  Check,
  Globe,
  Handshake,
  LayoutGrid,
  Link,
  Monitor,
  Moon,
  Plug,
  Search,
  Server,
  Shield,
  Sun,
  type LucideIcon,
} from "lucide-react";

export const iconRegistry = {
  search: Search,
  plug: Plug,
  "arrow-left-right": ArrowLeftRight,
  sun: Sun,
  moon: Moon,
  monitor: Monitor,
  check: Check,
  link: Link,
  globe: Globe,
  "layout-grid": LayoutGrid,
  server: Server,
  shield: Shield,
  handshake: Handshake,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconRegistry;

export function resolveIcon(name: IconName): LucideIcon {
  return iconRegistry[name];
}
